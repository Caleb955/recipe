import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import db, User, Recipe
from app import app

# Source: local SQLite
basedir = os.path.abspath(os.path.dirname(__file__))
sqlite_engine = create_engine('sqlite:///' + os.path.join(basedir, 'app.db'))
SqliteSession = sessionmaker(bind=sqlite_engine)
sqlite_session = SqliteSession()

# Target: Render Postgres (uses DATABASE_URL from your app config)
with app.app_context():
    # Pull all users from SQLite
    users = sqlite_session.query(User).all()
    for user in users:
        db.session.merge(user)  # merge = insert or update, avoids duplicate PK errors

    # Pull all recipes from SQLite
    recipes = sqlite_session.query(Recipe).all()
    for recipe in recipes:
        db.session.merge(recipe)

    db.session.commit()
    print(f"Migrated {len(users)} users and {len(recipes)} recipes.")

sqlite_session.close()
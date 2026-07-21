from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    creation_date = db.Column(db.Date, default=date.today)
    color = db.Column(db.String(255))

class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # None = no owner
    title = db.Column(db.String(200))
    category = db.Column(db.String(50))
    time_string = db.Column(db.String(50))
    image_url = db.Column(db.String(500))
    ingredients = db.Column(db.JSON)
    steps = db.Column(db.JSON)
    servings = db.Column(db.String(50))
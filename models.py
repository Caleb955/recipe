from flask_sqlalchemy import SQLAlchemy
from datetime import date

# Initialize the SQLAlchemy database object
db = SQLAlchemy()

# User model representing the users table in the database
class User(db.Model):
    __tablename__ = 'users'  # Explicitly set table name (optional, defaults to class name lowercase)
    id = db.Column(db.Integer, primary_key=True)  # Identity number
    first_name = db.Column(db.String(50))  # User's first name
    last_name = db.Column(db.String(50))   # User's last name
    email = db.Column(db.String(120), unique=True, nullable=False)  # Unique email, required
    password = db.Column(db.String(255), nullable=False)  # Hashed password, required(encrypted pssword)
    creation_date = db.Column(db.Date, default=date.today)  # Date the user joined
    color = db.Column(db.String(255))  # User's preferred color (for UI customization)

# Recipe model representing the recipes table in the database
class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Foreign key to User, nullable (allows recipes without an owner)
    title = db.Column(db.String(200))  # Recipe title
    category = db.Column(db.String(50))  # Category (e.g., Breakfast, Snacks)
    time_string = db.Column(db.String(50))  # Time to prepare (e.g., "30 min")
    image = db.Column(db.LargeBinary)  # Binary data for the recipe image
    image_type = db.Column(db.String(50))  # type of the image (e.g., image/jpeg)
    ingredients = db.Column(db.JSON)  # List of ingredients stored as JSON
    steps = db.Column(db.JSON)  # List of steps stored as JSON
    servings = db.Column(db.String(50))  # Number of servings
    creation_date = db.Column(db.Date, default=date.today)  # Date the recipe was added
    
    # Relationship to User: allows accessing the user who posted the recipe via `recipe.user`
    user = db.relationship('User')
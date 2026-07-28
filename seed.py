from app import app, db
from models import Recipe

# Sample recipe data to seed the database with initial recipes.
# Each dictionary corresponds to a Recipe model instance.
# Fields must match the Recipe model columns: title, category, time_string, image,
# ingredients (list of strings), steps (list of strings), servings (string).
recipes_data = [
    {
        "title": "Skillet Margherita Pizza",
        "category": "Dinner",
        "time_string": "35 min",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        "ingredients": ["1 pizza dough ball", "1/2 cup tomato sauce", "150g fresh mozzarella", "Fresh basil leaves", "2 tbsp olive oil"],
        "steps": ["Preheat oven to 250°C with a skillet inside.", "Stretch dough to fit the skillet.", "Spread sauce, tear mozzarella over top.", "Bake 8–10 min until blistered, top with basil."],
        "servings": "Serves 4"
    },
    # ...paste your other 5 recipes here in the same shape...
]

# Create application context to interact with the database.
# This ensures that db.create_all() and session operations have access to the Flask app.
with app.app_context():
    # Create all database tables defined in models.py (if they don't already exist).
    db.create_all()
    # Insert each recipe dictionary as a Recipe model instance.
    # The **data unpacks the dictionary as keyword arguments to the Recipe constructor.
    for data in recipes_data:
        db.session.add(Recipe(**data))
    # Commit all pending changes to the database to persist the seeded recipes.
    db.session.commit()
    print("Seeded", len(recipes_data), "recipes.")
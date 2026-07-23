from app import app, db
from models import Recipe

recipes_data = [
    {"title": "Skillet Margherita Pizza", "category": "Dinner", "time_string": "35 min",
     "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
     "ingredients": ["1 pizza dough ball", "1/2 cup tomato sauce", "150g fresh mozzarella", "Fresh basil leaves", "2 tbsp olive oil"],
     "steps": ["Preheat oven to 250°C with a skillet inside.", "Stretch dough to fit the skillet.", "Spread sauce, tear mozzarella over top.", "Bake 8–10 min until blistered, top with basil."],
     "servings": "Serves 4"},
    # ...paste your other 5 recipes here in the same shape...
]

with app.app_context():
    db.create_all()
    for data in recipes_data:
        db.session.add(Recipe(**data))
    db.session.commit()
    print("Seeded", len(recipes_data), "recipes.")
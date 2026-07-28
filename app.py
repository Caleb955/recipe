import os, base64
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Response
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Recipe

# Initialize Flask application
app = Flask(__name__)
# Secret key for session management; in production, use a strong secret from environment
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-for-local-only')

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize the database with the Flask app
db.init_app(app)

@app.route('/')
def index():
    #Render the home page.
    return render_template('index.html')

@app.route('/recipes')
def recipes():
    #Render the recipes listing page.#
    return render_template('recipes.html')

@app.route('/about')
def about():
    #Render the about page.#
    return render_template('about.html')

@app.route('/get-recipes')
def get_recipes():
    #Return JSON list of all recipes with details for the frontend.#
    recipes = Recipe.query.all()

    return jsonify([
        {"id": r.id, "title": r.title, "category": r.category,
         "time_string": r.time_string, "image": f"/recipe/{r.id}/image", "ingredients": r.ingredients, "steps": r.steps,"servings": r.servings, "creation_date": r.creation_date,
         "uploader": f"{r.user.first_name} {r.user.last_name}" if r.user else "Unknown"}
        for r in recipes
    ])

@app.route('/recipe/<int:id>/image')
def recipe_image(id):
    #Serve the image for a given recipe ID.#
    recipe = Recipe.query.get_or_404(id)
    return Response(recipe.image, mimetype=recipe.image_type)

@app.route('/get_recipe')
def get_recipe():
    #Return JSON for a single recipe by ID (used for modal details).#
    r = Recipe.query.get(request.args.get('id'))
    if not r:
        return {"error": "Recipe not found"}, 404
    return {"id": r.id, "title": r.title, "category": r.category, "time_string": r.time_string,
            "image": f"/recipe/{r.id}/image", "servings": r.servings,
            "ingredients": r.ingredients, "steps": r.steps}
    
@app.route('/recipe-detail')
def recipe_detail_page():
    #Render the detailed view page for a recipe.#
    return render_template('recipe_detail.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    #Handle user registration via GET (show form) and POST (process form).#
    if request.method == 'POST':
        first_name = request.form.get('first_name', '').strip()
        last_name = request.form.get('last_name', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        color = request.form.get('color', '').strip()

        if not first_name or not last_name or not email or not password:
            return render_template('signup.html', error='All fields are required.')
        if User.query.filter_by(email=email).first():
            return render_template('signup.html', error='An account with this email already exists.')

        new_user = User(first_name=first_name, last_name=last_name, email=email,
                         password=generate_password_hash(password), color=color)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    #Handle user login via GET (show form) and POST (process credentials).#
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return render_template('login.html', error='Invalid email or password.')

        session['user'] = {'id': user.id,'short_name': user.first_name[:2], 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email, 'color': user.color}
        return redirect(url_for('recipes'))
    return render_template('login.html')

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/new_recipe')
def new_recipe():
    return render_template('add_recipe.html')

@app.route('/add-recipe', methods=['GET', 'POST'])
def add_recipe():
    if 'user' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        image_file = request.files.get("image")

        if not image_file or not image_file.filename:
            return render_template('add_recipe.html', error='Please choose an image to upload.')

        image_bytes = image_file.read()

        new_recipe = Recipe(
            user_id=session['user']['id'],
            title=request.form.get('title'),
            category=request.form.get('category'),
            time_string=request.form.get('time_string'),
            image=image_bytes,
            image_type=image_file.mimetype,
            servings=request.form.get('servings'),
            ingredients=[line.strip() for line in request.form.get('ingredients', '').split('\n') if line.strip()],
            steps=[line.strip() for line in request.form.get('steps', '').split('\n') if line.strip()]
        )
        db.session.add(new_recipe)
        db.session.commit()
        return redirect(url_for('recipes'))
    return render_template('add_recipe.html')

with app.app_context():
    db.create_all()  # creates app.db + tables automatically if missing

@app.route('/saved')
def saved():
    return 'This is the saved'

@app.route('/profile')
def profile():
    if 'user' not in session:
        return redirect(url_for('login'))

    user = session.get("user")
    print(user['first_name'])
    user_recipes = Recipe.query.filter_by(user_id=session['user']['id']).all() #db query to get recipes for the logged-in user
    
    return render_template('profile.html', user=user, user_recipes=user_recipes)

if __name__ == '__main__':
    app.run(host="0.0.0.0" ,port=3000, debug=True)
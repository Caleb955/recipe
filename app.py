import os
from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Recipe

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-for-local-only')

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recipes')
def recipes():
    return render_template('recipes.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/get-recipes')
def get_recipes():
    return [
        {"id": r.id, "title": r.title, "category": r.category,
         "time_string": r.time_string, "image_url": r.image_url, "servings": r.servings}
        for r in Recipe.query.all()
    ]

@app.route('/get_recipe')
def get_recipe():
    r = Recipe.query.get(request.args.get('id'))
    if not r:
        return {"error": "Recipe not found"}, 404
    return {"id": r.id, "title": r.title, "category": r.category, "time_string": r.time_string,
            "image_url": r.image_url, "servings": r.servings,
            "ingredients": r.ingredients, "steps": r.steps}

@app.route('/recipe-detail')
def recipe_detail_page():
    return render_template('recipe_detail.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
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
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return render_template('login.html', error='Invalid email or password.')

        shortName = user.first_name[:2]
        print(shortName)
        session['user'] = {'id': user.id, 'first_name': shortName, 'email': user.email, 'color': user.color}
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
        new_recipe = Recipe(
            user_id=session['user']['id'],
            title=request.form.get('title'),
            category=request.form.get('category'),
            time_string=request.form.get('time_string'),
            image_url=request.form.get('image_url'),
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


if __name__ == '__main__':
    app.run(port=3000, debug=True)
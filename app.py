from flask import Flask, render_template, request, redirect, url_for
from models import get_all_recipes, login_user, get_recipe
from dotenv import load_dotenv

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/recipes')
def recipes():
    return render_template('recipes.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '')

        response = login_user(email)
        print(response)
        # email = request.form.get('email', '').strip()
        # password = request.form.get('password', '')
        # if email != 'admin@group10.com' or password != 'admin123':
        #     return render_template('login.html', error='Invalid email or password.')
        # elif email == 'admin@group10.com' and password == 'admin123':
        #     return redirect(url_for('recipes'))
    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form.get('first_name', '').strip()
        last_name = request.form.get('last_name', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        if not first_name or not last_name or not email or not password:
            return render_template('signup.html', error='All fields are required.')
        else:
            return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/get-recipes')
def allRecipes():
    recipes = get_all_recipes()
    return recipes

@app.route('/recipe-detail')
def recipeDetailPage():
    return render_template('recipe_detail.html')

@app.route('/recipe_detail')
def recipeInfo():
    recipe_id = request.args.get("id", type=int)

    recipe = get_recipe(recipe_id)
    print(recipe)
    return recipe

if __name__ == '__main__':
    app.run(debug=True)

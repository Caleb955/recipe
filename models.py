from db import get_connection
from flask import jsonify

def get_all_recipes():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute('SELECT * FROM recipes')

    recipes = cur.fetchall()

    cur.close()
    conn.close()

    return recipes

def get_recipe(id):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute('SELECT * FROM recipes WHERE id = %s', (id, ))

    recipe = cur.fetchone()

    cur.close()
    conn.close()

    return recipe

def login_user(email):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute('SELECT * FROM users WHERE email = %s', (email,))

    user = cur.fetchone()

    cur.close()
    conn.close()

    if user is None:
        return jsonify({
            "success": False,
            "message": "Email not found try signing up"
        })

    if user:
        return user


# def signup_user():
#     conn = get_connection()
#     cur = conn.

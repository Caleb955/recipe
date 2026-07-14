from db import get_connection

def get_all_recipes():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute('SELECT * FROM recipes')

    recipes = cur.fetchall()

    cur.close()
    conn.close()

    return recipes
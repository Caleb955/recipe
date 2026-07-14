from psycopg import connect


def get_connection():
    return connect(
        host='localhost',
        dbname='recipe',
        user='postgres',
        password='morethanlife@27'
    )
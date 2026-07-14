from psycopg import connect
import os

def get_connection():
    return connect(
        host=os.getenv('PG_HOST'),
        dbname=os.getenv('PG_DBNAME'),
        user=os.getenv('PG_USER'),
        password=os.getenv('PG_PASSWORD')
    )
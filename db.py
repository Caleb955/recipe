from psycopg import connect
import os
from psycopg.rows import dict_row

def get_connection():
    return connect(
        host=os.getenv('PG_HOST'),
        dbname=os.getenv('PG_DBNAME'),
        user=os.getenv('PG_USER'),
        password=os.getenv('PG_PASSWORD'),
        row_factory=dict_row
    )
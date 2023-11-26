import os
import sqlalchemy
from yaml import load, loader
import yaml
from flask import Flask


app = Flask(__name__)


def init_connect_engine():
    # if os.environ.get("GAE_ENV") == "standard":
    with open("app.yaml", 'r') as file:
        variables = yaml.load(file, Loader=yaml.FullLoader)
    env_variables = variables["environment_variables"]
    for var in env_variables:
        os.environ[var] = env_variables[var]
    pool = sqlalchemy.create_engine(
            sqlalchemy.engine.url.URL(
                drivername="mysql+pymysql",
                username=os.environ.get('MYSQL_USER'),
                password=os.environ.get('MYSQL_PASSWORD'),
                database=os.environ.get('MYSQL_DATABASE'),
                host=os.environ.get('MYSQL_HOST')
            )
        )
    return pool
db = init_connect_engine()

conn = db.connect()
result = conn.execute("select * from Nation;").fetchall()
print([x for x in result])
conn.close()

from . import routes



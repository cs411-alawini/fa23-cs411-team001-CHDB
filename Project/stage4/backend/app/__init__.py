import os
import sqlalchemy
from flask import Flask
import yaml
from flask_cors import CORS



def init_connect_engine():
    # local test
    if os.environ.get("GAE_ENV") != "standard":
        try:
            variables = yaml.load(open("app.yaml"), Loader=yaml.FullLoader)
        except OSError:
            print("Make sure you have the app.yaml file setup")
            exit()
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

app = Flask(__name__)
CORS(app)
db = init_connect_engine()

# To prevent from using a blueprint, we use a cyclic import
# This also means that we need to place this import here
# pylint: disable=cyclic-import, wrong-import-position
from . import routes




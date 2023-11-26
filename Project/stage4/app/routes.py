from . import app
from flask import render_template
from . import database as db_helper


@app.route("/")
def homepage():
    return render_template("index.html", name=db_helper.get_name())
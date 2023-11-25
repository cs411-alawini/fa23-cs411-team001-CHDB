from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def homepage():
    return jsonify(("status", "OK"))



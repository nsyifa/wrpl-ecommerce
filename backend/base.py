from flask import Flask, jsonify
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    # response_body.headers.add('Access-Control-Allow-Origin', '*')
    return response_body

@api.route('/users')
def get_users():
    users = [{'name': 'John', 'age': 28}, {'name': 'Alice', 'age': 25}]
    users = jsonify(users)
    # users.headers.add('Access-Control-Allow-Origin', '*')
    return users
    

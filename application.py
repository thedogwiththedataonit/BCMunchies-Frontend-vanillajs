from flask import Flask, render_template, redirect, request, url_for, jsonify
import pymongo
from pymongo import MongoClient
import certifi
import re
from flask_cors import CORS, cross_origin

application = Flask(__name__)
#CORS(application)

#All this does is serve api requests for data and handle payment processes
@application.route('/', methods=["POST", "GET"])
def main():
    return render_template('index.html')

@application.route('/order')
def order():
    return render_template('test.html')

    
if __name__ == "__main__":
    application.run(debug=True)

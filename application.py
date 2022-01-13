from flask import Flask, render_template, redirect, request, url_for, jsonify
import pymongo
from pymongo import MongoClient
import certifi
import re
from flask_cors import CORS, cross_origin
from items_mongo import *




application = Flask(__name__)
#CORS(application)

#All this does is serve api requests for data and handle payment processes
@application.route('/', methods=["POST", "GET"])
def main():
    return render_template('index.html')

#take the username login info from index.html to the order page
#js fetch post check at order html the uid


@application.route('/terms')
def terms():
    return render_template('terms.html')

@application.route('/order', methods=["GET", "POST"])
def order():
   return render_template('order.html')

# ==================================| API |================================= #

@application.route('/api/menu', methods=["GET"])
def menu():
    list_of_menu = get_items()
    return jsonify(list_of_menu)



if __name__ == "__main__":
    application.run(debug=True, host='0.0.0.0', port=3000)

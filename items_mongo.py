import pymongo
from pymongo import MongoClient
from mongodb_connectionstring import connection_string
import certifi



def init_items():
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["menu_items"]
    collection = db["items"]
    collection.insert_many([
        {
            "id": "testfood1",
            "name": "testfood1",
            "price": "10.00",
            "img": "testfood1.png",
            "description": "testfood1",
        },
        {
            "id": "testfood2",
            "name": "testfood2",
            "price": "10.00",
            "img": "testfood2.png",
            "description": "testfood2",
        },
        {
            "id": "testfood3",
            "name": "testfood3",
            "price": "10.00",
            "img": "testfood3.png",
            "description": "testfood3",
        },
        {
            "id": "testfood4",
            "name": "testfood4",
            "price": "10.00",
            "img": "testfood4.png",
            "description": "testfood4",
        },
        {
            "id": "testfood5",
            "name": "testfood5",
            "price": "10.00",
            "img": "testfood5.png",
            "description": "testfood5",
        }])
    cluster.close()


def get_items():
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["menu_items"]
    collection = db["items"]
    items = list(collection.find())
    #remove "_id" from each item
    for item in items:
        del item["_id"]
        
    cluster.close()
    return items


#print(init_items())
#print(get_items())
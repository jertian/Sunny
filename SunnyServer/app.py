import os
from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask app
app = Flask(__name__)
api = Api(app)

# Enable CORS
CORS(app)

# Initialize Firestore DB
appPath = os.path.dirname(os.path.abspath(__file__))
fireBaseAuthFile = os.path.join(appPath, 'Firebase/comp3004-fa42f-firebase-adminsdk-sp3m8-c07f478f95.json')
cred = credentials.Certificate(fireBaseAuthFile)
default_app = initialize_app(cred)
db = firestore.client()
usersCollection = db.collection('users')

#Database routes ----------------------------------------

@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    print("hi")
    try:
        print(request)

        print(f"Request JSON: {request.json}")
        userRef = usersCollection.document().set(request.json["user"])
        userId = userRef.id
        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"An Error Occured: {e}")
        return f"An Error Occured: {e}"

@app.route('/getAllUsers', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        user : Return document that matches query ID.
        allUsers : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        userID = request.args.get('id')  #If you want to implement read you need an id system
        if userID:
            user = usersCollection.document(userID).get()
            return jsonify(user.to_dict()), 200
        else:
            allUsers = [doc.to_dict() for doc in usersCollection.stream()]
            return jsonify(allUsers), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id'] #If you want to implement update you need an id system
        usersCollection.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/deleteAllUsers', methods=['GET', 'DELETE'])
def deleteAllUsers():
    """
        deleteAllUsers() : Delete all users from Firestore collection.
    """
    try:
        docs = usersCollection.limit(100).stream()
        deleted = 0

        for doc in docs:
            print(f'Deleting doc {doc.id} => {doc.to_dict()}')
            doc.reference.delete()
            deleted = deleted + 1

        print("Success")
        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"An Error Occured: {e}")
        return f"An Error Occured: {e}"















#Other routes ----------------------------------------
class ScannedCode(Resource):
    def post(self):
        req_json= request.get_json()
        req_json= request.json
        codeType = req_json.get('codeType')
        code = req_json.get('code')
        print("the code type is: " + codeType+ " the code is: "+code)
        message = json.dumps({'msg': 'received'})
        return Response(message, status=201, mimetype='application/json')

api.add_resource(ScannedCode, '/ScannedCode')





if __name__ == '__main__':
    ip = '192.168.1.2'  # change ip to individual ip. found using ipconfig.
    app.run(host=ip, port=5000, debug=True, threaded=True)
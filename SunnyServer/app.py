from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api
from flask_cors import CORS
import requests

app = Flask(__name__)
api = Api(app)
CORS(app)

class ScannedCode(Resource):
    def post(self):
        req_json= request.get_json()
        req_json= request.json
        codeType = req_json.get('codeType')
        code = req_json.get('code')
        print("the code type is: " + codeType+ " the code is: "+code)
        
        url = "https://api.barcodelookup.com/v2/products?"
        payload = {'barcode': code,
                    'formatted': 'y',
                    'key': '22n44r2hfyrqzrbm2qgp61a0w7o3n1'}

        response = requests.get(url, params=payload)
        message = response.text
        return Response(message, status=201, mimetype='application/json')

api.add_resource(ScannedCode, '/ScannedCode')

if __name__ == '__main__':
    #app.run(debug=True)  
    app.run(host='0.0.0.0')
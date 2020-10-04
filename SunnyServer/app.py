from flask import Flask, request, jsonify, json, Response
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class ScannedCode(Resource):
    def post(self):
        req_json= request.get_json()
        req_json= request.json
        codeType = req_json.get('codeType')
        code = req_json.get('code')
        message = json.dumps({'msg': 'received'})
        return Response(message, status=201, mimetype='application/json')

api.add_resource(ScannedCode, '/ScannedCode')

if __name__ == '__main__':
    app.run(debug=True)  #app.run(host='0.0.0.0')
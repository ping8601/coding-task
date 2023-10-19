from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify('Hello world!')

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/submit', methods=['POST'])
def receive_data():
    data = request.get_json() 
    print("Received data from the frontend:", data)
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(debug=True)

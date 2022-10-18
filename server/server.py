from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({

    })
    return responsse



if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction")
    app.run()
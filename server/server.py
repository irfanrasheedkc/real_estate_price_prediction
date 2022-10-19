from flask import Flask, request, jsonify
import util
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations' : util.get_location_names()
    })
    return response

@app.route('/predict_home_price' , methods=['GET' , 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location , total_sqft , bhk , bath)
    })

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction")
    util.load_saved_artifacts()
    app.run()
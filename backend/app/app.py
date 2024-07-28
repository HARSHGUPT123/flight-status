from flask import Flask, jsonify

app = Flask(__name__)

# Mock data
flights = [
    {
        "flight_id": "AB123",
        "status": "on-time",
        "gate": "A5",
        "departure_time": "2024-07-25T15:30:00Z",
        "arrival_time": "2024-07-25T18:45:00Z"
    },
    {
        "flight_id": "CD456",
        "status": "delayed",
        "gate": "B3",
        "departure_time": "2024-07-25T16:00:00Z",
        "arrival_time": "2024-07-25T19:15:00Z"
    }
]

@app.route('/api/flights', methods=['GET'])
def get_flights():
    return jsonify(flights)

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify
from gpiozero import DigitalInputDevice

app = Flask(__name__)
pin = 25
device = DigitalInputDevice(pin, pull_up=False)

@app.route('/status')
def status():
    value = device.value
    if value == 1:
        return jsonify({"status": 1})
    return jsonify({"status": 0})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

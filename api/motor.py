import sys
import json
from gpiozero import PWMOutputDevice
from time import sleep
from gpiozero import Motor

buzzer = PWMOutputDevice(21)  

C3 = 130.81
D3 = 146.83
E3 = 164.81
F3 = 174.61
G3 = 196.00
A3 = 220.00
B3 = 246.94
C4 = 261.63
D4 = 293.66
E4 = 329.63
F4 = 349.23
G4 = 392.00
A4 = 440.00
B4 = 493.88
C5 = 523.25
E5 = 659.26
G5 = 783.99

mario_melody = [
    (E4, 0.15), (E4, 0.15), (E4, 0.15), (C4, 0.1), (E4, 0.15), (G4, 0.2), (G3, 0.2),
    (C4, 0.15), (G3, 0.15), (E3, 0.15), (A3, 0.15), (B3, 0.15), (A3, 0.15), (G3, 0.15),
    (E4, 0.15), (G4, 0.15), (A4, 0.15), (F4, 0.15), (G4, 0.15), (E4, 0.15), (C4, 0.15),
    (D4, 0.15), (B3, 0.15)
]

json_data = sys.argv[1]

data_list = json.loads(json_data)

print("Data received:")
print(data_list)  

def play_tone(frequency, duration):
    buzzer.frequency = frequency
    buzzer.value = 1.0  
    sleep(duration)
    buzzer.off()  
    sleep(0.05)  

# Play the melody
for note, duration in mario_melody:
    play_tone(note, duration)


json_data = sys.argv[1]

data_list = json.loads(json_data)

print("Data received:")
print(data_list) 

def control_motor(motorid, numberrounds, pwm_speed=0.5):
    motor_pins = {
        1: Motor(forward=6, backward=12, pwm=True), 
        2: Motor(forward=19, backward=16, pwm=True),
        3: Motor(forward=26, backward=20, pwm=True),
    }

    motor = motor_pins.get(motorid)
    if motor:
        time_per_round = 1  
        for _ in range(numberrounds):
            motor.forward(speed=pwm_speed)  
            sleep(time_per_round)
            motor.stop() 
            sleep(1)  

        print(f"Motor ID: {motorid}, Number of Rounds: {numberrounds}, PWM Speed: {pwm_speed}")
    else:
        print(f"Motor ID {motorid} not recognized.")

for data in data_list:
    if isinstance(data, dict):
        motorid = data.get('motorid')
        numberrounds = data.get('numberrounds')
        pwm_speed = data.get('pwm_speed', 1.0) 

        if motorid is not None and numberrounds is not None:
            motorid = int(motorid)
            numberrounds = int(numberrounds)
            pwm_speed = float(pwm_speed) 
            control_motor(motorid, numberrounds, pwm_speed)
        else:
            print("Invalid data format:", data)
    else:
        print("Unexpected data format:", data)

sys.stdout.flush()
buzzer.off()

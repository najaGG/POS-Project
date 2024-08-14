import sys
import json

# รับ JSON string จาก argument
json_data = sys.argv[1]

# แปลง JSON string เป็น list ของ dictionaries
data_list = json.loads(json_data)

# ตรวจสอบข้อมูลที่ได้รับ
print("Data received:")
print(data_list)  # แสดงข้อมูลที่ได้รับ

# ฟังก์ชันสำหรับควบคุมมอเตอร์
def control_motor(motorid, numberrounds):
    # กำหนดพิน GPIO สำหรับมอเตอร์แต่ละตัว (ปรับตามการเชื่อมต่อของคุณ)
    from gpiozero import Motor
    from time import sleep

    motor_pins = {
        1: Motor(forward=17, backward=18),
        2: Motor(forward=22, backward=23),
        3: Motor(forward=24, backward=25),
    }

    motor = motor_pins.get(motorid)
    if motor:
        time_per_round = 1  # เวลาหมุนต่อรอบ (ปรับตามความเร็วของมอเตอร์)
        for _ in range(numberrounds):
            motor.forward()  # หมุนไปข้างหน้า
            sleep(time_per_round)
            motor.stop()  # หยุดมอเตอร์
            sleep(0.5)  # เวลาหยุดระหว่างรอบ (ปรับตามความเหมาะสม)

        # แสดงผลลัพธ์ใน console
        print(f"Motor ID: {motorid}, Number of Rounds: {numberrounds}")
    else:
        print(f"Motor ID {motorid} not recognized.")

# วนลูปผ่านแต่ละรายการใน data_list
for data in data_list:
    if isinstance(data, dict):
        motorid = data.get('motorid')
        numberrounds = data.get('numberrounds')
        if motorid is not None and numberrounds is not None:
            control_motor(motorid, numberrounds)
        else:
            print("Invalid data format:", data)
    else:
        print("Unexpected data format:", data)

# ส่งผลลัพธ์กลับไปยัง Node.js
sys.stdout.flush()

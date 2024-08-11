import sys
from gpiozero import DigitalInputDevice
from time import sleep

coin = int(sys.argv[1])
pin = 25
device = DigitalInputDevice(pin, pull_up=False)

count = 0
while count < coin:
    value = device.value
    if value == 1:
        count += 10
        print(1)  # พิมพ์ค่า 1 ทุกครั้งที่ค่าของ `value` เป็น 1
    else:
        print(0)
    sleep(0.5)

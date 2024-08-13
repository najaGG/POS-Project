from gpiozero import Motor
from time import sleep

motor1 = Motor(17, 18)
motor2 = Motor(23, 24)
motor3 = Motor(19 ,26)
for x in range(4):

    motor1.forward()
    sleep(1)

    motor2.forward() 
    sleep(1)
    
    motor3.forward()
    sleep(1)
motor1.stop()
motor2.stop()
motor3.stop()
quit()

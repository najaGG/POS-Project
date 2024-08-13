import sys
from gpiozero import DigitalInputDevice


relay = OutputDevice(21)
coin = int(sys.argv[1])
pin = 25
device = DigitalInputDevice(pin, pull_up=False)
print (coin)
count = 0
relay.on()
while count < coin:
    value = device.value
    if value == 1:
        count += 10
        print(1)
        while device.value == 1:
            pass
if(count >= coin):
    relay.off()

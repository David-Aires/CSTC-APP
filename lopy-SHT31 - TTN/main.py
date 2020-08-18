from network import LoRa

####################
# Disabling WIFI
###################

from network import WLAN
wlan = WLAN()
wlan.deinit()

from network import Bluetooth
bluetooth = Bluetooth()
bluetooth.deinit()

###########################

import machine

from cbor import cbor


import socket
import ubinascii
import time
import pycom
from pycom import nvs_set, nvs_get

import struct
import binascii
import sys
import ustruct 
import json


from machine import PWM

from machine import UART
from machine import I2C
from adafruit_bus_device.i2c_device import I2CDevice
import drivers.adafruit_sht31d
import uhashlib

# Retrieve the dev_eui from the LoRa chip (Only needed for OTAA to retrieve once)
lora = LoRa(mode=LoRa.LORAWAN, adr=True, region=LoRa.EU868)
dev_eui = binascii.hexlify(lora.mac()).upper().decode('utf-8') 
uart = UART(0, 115200)
uart.init(115200, bits=8, parity=None, stop=1)



try:
    f = open("preset", "r")
    exists = True
    f.close()
except:
    exists = False

if not exists:
    while True:
        value = uart.read()
        if value!=None:
            if str(value,'utf-8') =="dev":
                print(dev_eui)
                f = open("preset", "x")
                f.close()
                break
    
    
# this uses the UART_1 default pins for TXD and RXD (``P3`` and ``P4``)


app_key = uhashlib.md5(dev_eui)
app_key = app_key.digest()
app_key = binascii.hexlify(app_key)
app_key = app_key.decode("utf-8")
print("================================================Pycom Lopy 4 - CSTC  ===============================================")
print("")
print("")
print("                      DevEui : "+ dev_eui)
print("                      AppKey : "+ app_key)
print("")
print("")
print("=====================================================================================================================")
try:
    ttn_joined = nvs_get('ttn_joined')
except:
    ttn_joined = False

# Disable the heartbeat LED
pycom.heartbeat(False)

# Make the LED light up in black
pycom.rgbled(0x000000)

# Initialize LoRa in LORAWAN mode.
lora = LoRa(mode=LoRa.LORAWAN, adr=True, region=LoRa.EU868)
OTAA = True



if (machine.reset_cause() == machine.DEEPSLEEP_RESET) and ttn_joined :
    print('Wake up from a Deep Sleep')
    #lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)
    print('restore nvram')
    lora.nvram_restore()
    s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
    s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)
    print('Socket created')
    s.setblocking(False)

    #set port number
    #s.bind(1)
    # Show that LoRa OTAA has been succesfull by blinking blue
    print('Blinking on')
    pycom.rgbled(0x0000ff)
    time.sleep(0.5)
    pycom.rgbled(0x000000)
    time.sleep(0.1)
    pycom.rgbled(0x0000ff)
    time.sleep(0.5)
    pycom.rgbled(0x000000)
    print('Blinking off')
else:

    # Join a network using OTAA (Over the Air Activation)

    if OTAA :
        print('LoRa OTAA joining')
        lora.join(activation=LoRa.OTAA, auth=( ubinascii.unhexlify('0000000000000000'),  ubinascii.unhexlify(app_key)), timeout=0)
    else:
        print('LoRA ABP join')
        dev_addr = struct.unpack(">l", ubinascii.unhexlify('26011781'))[0]
        nwk_swkey = ubinascii.unhexlify('639ADE94503EBB08BE719852F68ABB38')
        app_swkey = ubinascii.unhexlify('755D72B0E87F6477F01EF8857E078246')

        # join a network using ABP (Activation By Personalization)
        lora.join(activation=LoRa.ABP, auth=(dev_addr, nwk_swkey, app_swkey))

    # Wait until the module has joined the network
    max_count = 50
    count = 0
    print('Waiting to join')
    while not lora.has_joined()  :
        pycom.rgbled(0xffa500) # Make the LED light up in orange
        time.sleep(0.2)
        pycom.rgbled(0x000000) # Make the LED light up in black
        time.sleep(5)
        print("retry join count is: %d/%d" %  (count, max_count))
        count = count + 1
        if count > max_count :
            print('max count reached')
            print("enter sleep")

            ttn_joined = False
            nvs_set('ttn_joined', ttn_joined)
            machine.deepsleep(1000*60*60)
            break

    print("join procedure succesfull")


    ttn_joined = True
    # Show that LoRa OTAA has been succesfull by blinking blue
    pycom.rgbled(0x0000ff)
    time.sleep(0.5)
    pycom.rgbled(0x000000)
    time.sleep(0.1)
    pycom.rgbled(0x0000ff)
    time.sleep(0.5)
    pycom.rgbled(0x000000)

    # Create a raw LoRa socket
    s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
    # Set the LoRaWAN data rate
    #s.setsockopt(socket.SOL_LORA, socket.SO_CONFIRMED, True)
    s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)
    # Make the socket non-blocking
    s.setblocking(False)


def lora_callback(lora):
    #print('A LoRa event occured: ', end='')
    events = lora.events()
    if events & LoRa.RX_PACKET_EVENT:
        print('LoRa packet received')
        received = s.recv(64)
        received_object = cbor.loads(received)
        led_color_value = received_object.get('led-color', None)
        led_value = received_object.get('led', None)

        if led_color_value:
            pycom.rgbled(int(led_color_value))

        if led_value:
            if led_value == False:
                pycom.rgbled(0x000000)

    elif events & LoRa.TX_PACKET_EVENT:
        print('LoRa packet sent')


lora.callback(LoRa.RX_PACKET_EVENT | LoRa.TX_PACKET_EVENT, lora_callback)


print('creating the i2c component')



pwm = PWM(0, frequency=5000)  # use PWM timer 0, with a frequency of 5KHz
# create pwm channel on pin P12 with a duty cycle of 50%
pwm_c = pwm.channel(0, pin='P22', duty_cycle=1.0)




i2c = I2C(0, I2C.MASTER)             # create and init as a master
sensor0 = drivers.adafruit_sht31d.SHT31D(i2c, address=drivers.adafruit_sht31d._SHT31_ADDRESSES[0])
#sensor1 = drivers.adafruit_sht31d.SHT31D(i2c, address=drivers.adafruit_sht31d._SHT31_ADDRESSES[1])
print('i2c component created')
while True:
    print('i2c component reading')
    t0 = sensor0.temperature
    RH0 = sensor0.relative_humidity
    #t1 = sensor1.temperature
    #RH1 = sensor1.relative_humidity

    value_object =  {
        'temperature':"{0:.2f}".format(t0),
        'humidite': "{0:.2f}".format(RH0)}

      
    json_payload = json.dumps(value_object)
    print('LoRa sending info')
    # send the data over LPWAN network
    s.send(json_payload)
    print('LoRa info sent')
    s.setblocking(False)

    print('Blinking on')
    pycom.rgbled(0x007f00) # Make the LED light up in green
    time.sleep(0.2)
    pycom.rgbled(0x000000)
    pwm_c.duty_cycle(0.0) # change the duty cycle to 30%
    print('Blinking off')
    lora.nvram_save()
    print('nvram saved')
    nvs_set('ttn_joined', int(ttn_joined))
    print('nvs ttn')
    print('entering in deepsleep')
    machine.deepsleep(1000*20)






    # Wait for 60 seconds before moving to the next iteration
    #time.sleep(60)

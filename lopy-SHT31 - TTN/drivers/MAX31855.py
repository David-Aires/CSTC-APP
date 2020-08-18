from machine import SPI, Pin
import machine
try:
    import struct
except ImportError:
    import ustruct as struct

# configure the SPI master @ 2MHz
# this uses the SPI non-default pins for CLK, MOSI and MISO (``P19``, ``P20`` and ``P21``)

import time







#spi.write(bytes([0x01, 0x02, 0x03, 0x04, 0x05])) # send 5 bytes on the bus
#spi.read(5) # receive 5 bytes on the bus
#rbuf = bytearray(5)
#spi.write_readinto(bytes([0x01, 0x02, 0x03, 0x04, 0x05]), rbuf) # send a receive 5 bytes


class MAX31855:
    """
    Driver for the MAX31855 thermocouple amplifier.
    """

    def __init__(self, CLK, CS, DO):
        self.spi = SPI(0, mode=SPI.MASTER, baudrate=2000000, polarity=0, phase=0, pins=(CLK,CS,DO))
        self.data = bytearray(4)
        self.cs = Pin(CS, mode=Pin.OUT)

    def _read(self, internal=False):

        self.cs.value(0)
        time.sleep(0.001)
        self.data = bytearray(4)
        self.spi.readinto(self.data)  #pylint: disable=no-member
        self.cs.value(1)



        if self.data[3] & 0x01:
            raise RuntimeError("thermocouple not connected")
        if self.data[3] & 0x02:
            raise RuntimeError("short circuit to ground")
        if self.data[3] & 0x04:
            raise RuntimeError("short circuit to power")
        if self.data[1] & 0x01:
            raise RuntimeError("faulty reading")
        temp, refer = struct.unpack('>hh', self.data)
        refer >>= 4
        temp >>= 2
        if internal:
            return refer
        return temp

    @property
    def temperature(self):
        """Thermocouple temperature in degrees Celsius."""
        return self._read() / 4.0

    @property
    def reference_temperature(self):
        """Internal reference temperature in degrees Celsius."""
        return self._read(True) * 0.625

# turntable
3D scanning turntable

This repository contains hardware designs and firmware to enable a 3D scanning turntable to be constructed.

The turntable operates with either a mains AC motor with feedback or a DC motor.  In both cases a rotary optical encoder is employed to give accurate feedback of current position to upper software layers.

In the ** repository yo can find my modifications to the bqlabs/horus scanning software which allow either a pair of laser line emitters and RGB camera or a Microsoft Kinect V2 aka Kinect One which contains an IR depth sensor and RGB camera, allowing full colour but lower resolution scans under Linux or Mac OS X.

The turntable electronics are designed to interface to an Arduino Uno as a pair of expansion shields.

opto-interface:
![alt text](https://github.com/jsr38/turntable/raw/master/opto-interface-arduino/hardware/opto-interface.png "Opto Encoder Interface")


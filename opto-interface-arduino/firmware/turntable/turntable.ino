
/*                                                                      
 *
 * @(#)turntable.ino
 *
 * Copyright (c) 2016 Argusat Limited
 * 10 Underwood Road,  Southampton.  UK
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Argusat Limited. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Argusat Limited.
 *
 
  ReadAnalogVoltage
  Reads an analog input on pin 0, converts it to voltage, and prints the result to the serial monitor.
  Graphical representation is available using serial plotter (Tools > Serial Plotter menu)
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

  This example code is in the public domain.
*/

#include <Servo.h>
#include "Turntable.h"
#include "serial.h"
#include "gcode.h"
#include "protocol.h"


// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication 
  serial_init();
  serial_reset_read_buffer(); // Clear serial read buffer
  gc_init();
}

// the loop routine runs over and over again forever:
void loop() {
  protocol_main_loop();
}

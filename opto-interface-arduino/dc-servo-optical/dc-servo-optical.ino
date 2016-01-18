/*
 * @(#)dc-servo-optical.ino
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
 */
int analogPin = 3;     // potentiometer wiper (middle terminal) connected to analog pin 3

                       // outside leads to ground and +5V

int val = 0;           // variable to store the value read


void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);          //  setup serial

}

void loop() {
  // put your main code here, to run repeatedly:
  val = analogRead(analogPin);    // read the input pin

  Serial.println(val);             // debug value
  
}

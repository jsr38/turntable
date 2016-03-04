/*                                                                      
 *
 * @(#)Turntable.h
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

class Turntable
{

  public:
    Turntable();
    ~Turntable();


  private:

    bool _direction;   // TRUE clockwise, FALSE counterclockwise
    int  _current_angle;
    int  _target_angle;

    int _output_drive;

}


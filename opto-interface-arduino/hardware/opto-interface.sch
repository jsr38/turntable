EESchema Schematic File Version 2
LIBS:opto-interface-rescue
LIBS:power
LIBS:device
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:arduino_shieldsNCL
LIBS:max889
LIBS:opto-interface-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "3D Scanning Turntable"
Date ""
Rev "0.1"
Comp "Argusat Limited"
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L ARDUINO_SHIELD SHIELD1
U 1 1 56A61ABF
P 4950 2600
F 0 "SHIELD1" H 4950 3687 60  0000 C CNN
F 1 "ARDUINO_SHIELD" H 4950 3581 60  0000 C CNN
F 2 "arduino_shields:ARDUINO SHIELD" H 4950 2600 60  0001 C CNN
F 3 "" H 4950 2600 60  0000 C CNN
	1    4950 2600
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR01
U 1 1 56A61C8B
P 3300 4250
F 0 "#PWR01" H 3300 4000 50  0001 C CNN
F 1 "GND" H 3308 4076 50  0000 C CNN
F 2 "" H 3300 4250 50  0000 C CNN
F 3 "" H 3300 4250 50  0000 C CNN
	1    3300 4250
	1    0    0    -1  
$EndComp
$Comp
L -5V #PWR2
U 1 1 56A61CAF
P 600 1800
F 0 "#PWR2" H 600 1900 50  0001 C CNN
F 1 "-5V" H 618 1974 50  0000 C CNN
F 2 "" H 600 1800 50  0000 C CNN
F 3 "" H 600 1800 50  0000 C CNN
	1    600  1800
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR02
U 1 1 56A61CC6
P 6600 2750
F 0 "#PWR02" H 6600 2600 50  0001 C CNN
F 1 "+5V" H 6618 2924 50  0000 C CNN
F 2 "" H 6600 2750 50  0000 C CNN
F 3 "" H 6600 2750 50  0000 C CNN
	1    6600 2750
	1    0    0    -1  
$EndComp
$Comp
L R-RESCUE-opto-interface R4
U 1 1 56A61D1F
P 6600 3150
F 0 "R4" H 6670 3196 50  0000 L CNN
F 1 "390R" H 6670 3104 50  0000 L CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 6530 3150 50  0001 C CNN
F 3 "" H 6600 3150 50  0000 C CNN
	1    6600 3150
	1    0    0    -1  
$EndComp
$Comp
L R-RESCUE-opto-interface R2
U 1 1 56A61E09
P 3300 3850
F 0 "R2" H 3370 3896 50  0000 L CNN
F 1 "100kR" H 3370 3804 50  0000 L CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 3230 3850 50  0001 C CNN
F 3 "" H 3300 3850 50  0000 C CNN
	1    3300 3850
	1    0    0    -1  
$EndComp
$Comp
L R-RESCUE-opto-interface R1
U 1 1 56A61E93
P 2800 3850
F 0 "R1" H 2870 3896 50  0000 L CNN
F 1 "100kR" H 2870 3804 50  0000 L CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 2730 3850 50  0001 C CNN
F 3 "" H 2800 3850 50  0000 C CNN
	1    2800 3850
	1    0    0    -1  
$EndComp
Wire Wire Line
	6600 2750 6600 3000
Wire Wire Line
	5900 3400 6600 3400
Wire Wire Line
	6600 3400 6600 3300
Wire Wire Line
	2800 4000 3300 4000
Wire Wire Line
	3300 4000 3300 4250
Wire Wire Line
	3300 3000 3300 3700
Wire Wire Line
	2800 3000 2800 3700
$Comp
L CONN_02X06 P1
U 1 1 56A61FC0
P 1650 1650
F 0 "P1" H 1650 2116 50  0000 C CNN
F 1 "CONN_02X06" H 1650 2024 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x06" H 1650 450 50  0001 C CNN
F 3 "" H 1650 450 50  0000 C CNN
	1    1650 1650
	1    0    0    -1  
$EndComp
Wire Wire Line
	1100 1400 1400 1400
Wire Wire Line
	1200 1500 1400 1500
Wire Wire Line
	1200 1500 1200 3400
Connection ~ 3300 3400
Connection ~ 1900 1500
Connection ~ 1900 1600
Connection ~ 1900 1700
Connection ~ 1900 1800
Connection ~ 1900 1900
Wire Wire Line
	1000 1600 1400 1600
Wire Wire Line
	1000 1600 1000 3550
Wire Wire Line
	1000 3550 6050 3550
Wire Wire Line
	6050 3550 6050 3400
Connection ~ 6050 3400
$Comp
L +5V #PWR03
U 1 1 56A6320E
P 600 1700
F 0 "#PWR03" H 600 1550 50  0001 C CNN
F 1 "+5V" V 618 1827 50  0000 L CNN
F 2 "" H 600 1700 50  0000 C CNN
F 3 "" H 600 1700 50  0000 C CNN
	1    600  1700
	0    -1   -1   0   
$EndComp
Wire Wire Line
	650  1700 1400 1700
Wire Wire Line
	1400 1800 650  1800
$Comp
L +5V #PWR04
U 1 1 56A632A5
P 3500 2300
F 0 "#PWR04" H 3500 2150 50  0001 C CNN
F 1 "+5V" H 3518 2474 50  0000 C CNN
F 2 "" H 3500 2300 50  0000 C CNN
F 3 "" H 3500 2300 50  0000 C CNN
	1    3500 2300
	1    0    0    -1  
$EndComp
Wire Wire Line
	4000 2400 3500 2400
Wire Wire Line
	3500 2400 3500 2300
$Comp
L GND #PWR05
U 1 1 56A632F3
P 3500 2650
F 0 "#PWR05" H 3500 2400 50  0001 C CNN
F 1 "GND" H 3508 2476 50  0000 C CNN
F 2 "" H 3500 2650 50  0000 C CNN
F 3 "" H 3500 2650 50  0000 C CNN
	1    3500 2650
	1    0    0    -1  
$EndComp
Wire Wire Line
	4000 2500 3500 2500
Wire Wire Line
	3500 2500 3500 2650
$Comp
L +12V #PWR06
U 1 1 56A635BF
P 8300 1250
F 0 "#PWR06" H 8300 1100 50  0001 C CNN
F 1 "+12V" H 8318 1424 50  0000 C CNN
F 2 "" H 8300 1250 50  0000 C CNN
F 3 "" H 8300 1250 50  0000 C CNN
	1    8300 1250
	1    0    0    -1  
$EndComp
$Comp
L LM7805 U1
U 1 1 56A63641
P 9300 1650
F 0 "U1" H 9300 1966 50  0000 C CNN
F 1 "LM7805" H 9300 1874 50  0000 C CNN
F 2 "TO_SOT_Packages_THT:TO-220_Neutral123_Horizontal_LargePads" H 9300 1650 50  0001 C CNN
F 3 "" H 9300 1650 50  0000 C CNN
	1    9300 1650
	1    0    0    -1  
$EndComp
Wire Wire Line
	8300 1250 8300 1600
Wire Wire Line
	8300 1600 8900 1600
$Comp
L GND #PWR07
U 1 1 56A636DF
P 9700 2200
F 0 "#PWR07" H 9700 1950 50  0001 C CNN
F 1 "GND" H 9708 2026 50  0000 C CNN
F 2 "" H 9700 2200 50  0000 C CNN
F 3 "" H 9700 2200 50  0000 C CNN
	1    9700 2200
	1    0    0    -1  
$EndComp
Wire Wire Line
	9300 1900 9300 2700
Wire Wire Line
	8600 2100 9900 2100
Wire Wire Line
	9700 2100 9700 2200
$Comp
L +5V #PWR08
U 1 1 56A63749
P 10100 1600
F 0 "#PWR08" H 10100 1450 50  0001 C CNN
F 1 "+5V" H 10118 1774 50  0000 C CNN
F 2 "" H 10100 1600 50  0000 C CNN
F 3 "" H 10100 1600 50  0000 C CNN
	1    10100 1600
	1    0    0    -1  
$EndComp
Wire Wire Line
	9700 1600 10100 1600
$Comp
L C-RESCUE-opto-interface C1
U 1 1 56A63A9E
P 8600 1950
F 0 "C1" H 8715 1996 50  0000 L CNN
F 1 "0u1F" H 8715 1904 50  0000 L CNN
F 2 "Capacitors_ThroughHole:C_Disc_D6_P5" H 8638 1800 50  0001 C CNN
F 3 "" H 8600 1950 50  0000 C CNN
	1    8600 1950
	1    0    0    -1  
$EndComp
Wire Wire Line
	8600 1800 8600 1600
Connection ~ 8600 1600
Connection ~ 9300 2100
$Comp
L CP-RESCUE-opto-interface C3
U 1 1 56A63B52
P 9900 1850
F 0 "C3" H 10018 1896 50  0000 L CNN
F 1 "2u2F" H 10018 1804 50  0000 L CNN
F 2 "Discret:CP5" H 9938 1700 50  0001 C CNN
F 3 "" H 9900 1850 50  0000 C CNN
	1    9900 1850
	1    0    0    -1  
$EndComp
Wire Wire Line
	9900 1700 9900 1600
Connection ~ 9900 1600
Wire Wire Line
	9900 2000 9900 2500
Connection ~ 9700 2100
$Comp
L LM7905 U2
U 1 1 56A63CED
P 9300 2950
F 0 "U2" H 9300 3173 50  0000 C CNN
F 1 "LM7905" H 9300 3265 50  0000 C CNN
F 2 "TO_SOT_Packages_THT:TO-220_Neutral123_Horizontal_LargePads" H 9300 2950 50  0001 C CNN
F 3 "" H 9300 2950 50  0000 C CNN
	1    9300 2950
	-1   0    0    1   
$EndComp
$Comp
L C-RESCUE-opto-interface C2
U 1 1 56A63DBB
P 8600 2650
F 0 "C2" H 8715 2696 50  0000 L CNN
F 1 "0u1F" H 8715 2604 50  0000 L CNN
F 2 "Capacitors_ThroughHole:C_Disc_D6_P5" H 8638 2500 50  0001 C CNN
F 3 "" H 8600 2650 50  0000 C CNN
	1    8600 2650
	1    0    0    -1  
$EndComp
$Comp
L CP-RESCUE-opto-interface C4
U 1 1 56A63E65
P 9900 2650
F 0 "C4" H 10018 2696 50  0000 L CNN
F 1 "2u2F" H 10018 2604 50  0000 L CNN
F 2 "Discret:CP5" H 9938 2500 50  0001 C CNN
F 3 "" H 9900 2650 50  0000 C CNN
	1    9900 2650
	1    0    0    -1  
$EndComp
$Comp
L -12V #PWR15
U 1 1 56A63F07
P 8200 3000
F 0 "#PWR15" H 8200 3100 50  0001 C CNN
F 1 "-12V" V 8218 3127 50  0000 L CNN
F 2 "" H 8200 3000 50  0000 C CNN
F 3 "" H 8200 3000 50  0000 C CNN
	1    8200 3000
	0    -1   -1   0   
$EndComp
Wire Wire Line
	8200 3000 8900 3000
Wire Wire Line
	8600 2500 8600 2100
Wire Wire Line
	8600 2800 8600 3000
Connection ~ 8600 3000
Wire Wire Line
	9700 3000 10300 3000
Wire Wire Line
	9900 3000 9900 2800
Connection ~ 9900 2100
$Comp
L -5V #PWR19
U 1 1 56A640D9
P 10300 3000
F 0 "#PWR19" H 10300 3100 50  0001 C CNN
F 1 "-5V" V 10318 3128 50  0000 L CNN
F 2 "" H 10300 3000 50  0000 C CNN
F 3 "" H 10300 3000 50  0000 C CNN
	1    10300 3000
	0    1    1    0   
$EndComp
Connection ~ 9900 3000
$Comp
L ZENER-RESCUE-opto-interface D1
U 1 1 56A89EF2
P 6400 1700
F 0 "D1" V 6354 1779 50  0000 L CNN
F 1 "ZENER" V 6446 1779 50  0000 L CNN
F 2 "TO_SOT_Packages_SMD:SOT-23" H 6400 1700 50  0001 C CNN
F 3 "" H 6400 1700 50  0000 C CNN
	1    6400 1700
	0    1    1    0   
$EndComp
$Comp
L GND #PWR09
U 1 1 56A8A09D
P 6400 2200
F 0 "#PWR09" H 6400 1950 50  0001 C CNN
F 1 "GND" H 6408 2026 50  0000 C CNN
F 2 "" H 6400 2200 50  0000 C CNN
F 3 "" H 6400 2200 50  0000 C CNN
	1    6400 2200
	1    0    0    -1  
$EndComp
Wire Wire Line
	6400 1500 6400 1200
Wire Wire Line
	6400 2200 6400 1900
Wire Wire Line
	5900 1800 6100 1800
Wire Wire Line
	6100 1800 6100 1400
Wire Wire Line
	6100 1400 6400 1400
Connection ~ 6400 1400
$Comp
L R-RESCUE-opto-interface R3
U 1 1 56A8A23F
P 6400 1050
F 0 "R3" H 6470 1096 50  0000 L CNN
F 1 "1k3R" H 6470 1004 50  0000 L CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 6330 1050 50  0001 C CNN
F 3 "" H 6400 1050 50  0000 C CNN
	1    6400 1050
	1    0    0    -1  
$EndComp
$Comp
L +3V3 #PWR010
U 1 1 56A8A5AE
P 3800 2000
F 0 "#PWR010" H 3800 1850 50  0001 C CNN
F 1 "+3V3" H 3818 2174 50  0000 C CNN
F 2 "" H 3800 2000 50  0000 C CNN
F 3 "" H 3800 2000 50  0000 C CNN
	1    3800 2000
	1    0    0    -1  
$EndComp
Wire Wire Line
	3800 2000 3800 2300
Wire Wire Line
	3800 2300 4000 2300
$Comp
L +3V3 #PWR011
U 1 1 56A8A646
P 6400 700
F 0 "#PWR011" H 6400 550 50  0001 C CNN
F 1 "+3V3" H 6418 874 50  0000 C CNN
F 2 "" H 6400 700 50  0000 C CNN
F 3 "" H 6400 700 50  0000 C CNN
	1    6400 700 
	1    0    0    -1  
$EndComp
Wire Wire Line
	6400 700  6400 900 
$Comp
L CONN_01X06 P2
U 1 1 56B5E697
P 7250 3700
F 0 "P2" V 7215 3356 50  0000 R CNN
F 1 "CONN_01X06" V 7123 3356 50  0000 R CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x06" H 7250 3700 60  0001 C CNN
F 3 "" H 7250 3700 60  0000 C CNN
	1    7250 3700
	0    -1   -1   0   
$EndComp
$Comp
L +12V #PWR012
U 1 1 56B5E738
P 7000 4300
F 0 "#PWR012" H 7000 4150 60  0001 C CNN
F 1 "+12V" H 7018 4481 60  0000 C CNN
F 2 "" H 7000 4300 60  0000 C CNN
F 3 "" H 7000 4300 60  0000 C CNN
	1    7000 4300
	-1   0    0    1   
$EndComp
$Comp
L +5V #PWR013
U 1 1 56B5E792
P 7200 4300
F 0 "#PWR013" H 7200 4150 60  0001 C CNN
F 1 "+5V" H 7218 4481 60  0000 C CNN
F 2 "" H 7200 4300 60  0000 C CNN
F 3 "" H 7200 4300 60  0000 C CNN
	1    7200 4300
	-1   0    0    1   
$EndComp
$Comp
L -12V #PWR11
U 1 1 56B5E808
P 7100 4300
F 0 "#PWR11" H 7100 4400 20  0001 C CNN
F 1 "-12V" H 7102 4480 60  0000 C CNN
F 2 "" H 7100 4300 60  0000 C CNN
F 3 "" H 7100 4300 60  0000 C CNN
	1    7100 4300
	-1   0    0    1   
$EndComp
$Comp
L -5V #PWR13
U 1 1 56B5E862
P 7300 4300
F 0 "#PWR13" H 7300 4400 20  0001 C CNN
F 1 "-5V" H 7302 4480 60  0000 C CNN
F 2 "" H 7300 4300 60  0000 C CNN
F 3 "" H 7300 4300 60  0000 C CNN
	1    7300 4300
	-1   0    0    1   
$EndComp
$Comp
L GND #PWR014
U 1 1 56B5E8BC
P 7500 4300
F 0 "#PWR014" H 7500 4050 60  0001 C CNN
F 1 "GND" H 7508 4119 60  0000 C CNN
F 2 "" H 7500 4300 60  0000 C CNN
F 3 "" H 7500 4300 60  0000 C CNN
	1    7500 4300
	1    0    0    -1  
$EndComp
Wire Wire Line
	7000 3900 7000 4300
Wire Wire Line
	7100 3900 7100 4300
Wire Wire Line
	7200 3900 7200 4300
Wire Wire Line
	7300 3900 7300 4300
Wire Wire Line
	7400 3900 7400 4300
Wire Wire Line
	7400 4300 7500 4300
Wire Wire Line
	7500 4300 7500 3900
$Comp
L max889 U?
U 1 1 56D83630
P 3700 6000
F 0 "U?" H 3700 6000 60  0000 C CNN
F 1 "max889" H 3700 6000 60  0000 C CNN
F 2 "" H 3700 6000 60  0000 C CNN
F 3 "" H 3700 6000 60  0000 C CNN
	1    3700 6000
	1    0    0    -1  
$EndComp
$Comp
L +12V #PWR?
U 1 1 56D96E3B
P 2450 5000
F 0 "#PWR?" H 2450 4850 50  0001 C CNN
F 1 "+12V" H 2450 5140 50  0000 C CNN
F 2 "" H 2450 5000 50  0000 C CNN
F 3 "" H 2450 5000 50  0000 C CNN
	1    2450 5000
	0    -1   -1   0   
$EndComp
$Comp
L CP C?
U 1 1 56D96E9A
P 2750 5250
F 0 "C?" H 2775 5350 50  0000 L CNN
F 1 "CP" H 2775 5150 50  0000 L CNN
F 2 "" H 2788 5100 50  0000 C CNN
F 3 "" H 2750 5250 50  0000 C CNN
	1    2750 5250
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 56D96EFB
P 2750 5500
F 0 "#PWR?" H 2750 5250 50  0001 C CNN
F 1 "GND" H 2750 5350 50  0000 C CNN
F 2 "" H 2750 5500 50  0000 C CNN
F 3 "" H 2750 5500 50  0000 C CNN
	1    2750 5500
	1    0    0    -1  
$EndComp
Wire Wire Line
	2450 5000 3700 5000
Wire Wire Line
	3700 5000 3700 5400
Wire Wire Line
	2750 5100 2750 5000
Connection ~ 2750 5000
Wire Wire Line
	2750 5400 2750 5500
$Comp
L R R?
U 1 1 56D97041
P 4450 5900
F 0 "R?" V 4530 5900 50  0000 C CNN
F 1 "R" V 4450 5900 50  0000 C CNN
F 2 "" V 4380 5900 50  0000 C CNN
F 3 "" H 4450 5900 50  0000 C CNN
	1    4450 5900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 56D97092
P 3850 6900
F 0 "#PWR?" H 3850 6650 50  0001 C CNN
F 1 "GND" H 3850 6750 50  0000 C CNN
F 2 "" H 3850 6900 50  0000 C CNN
F 3 "" H 3850 6900 50  0000 C CNN
	1    3850 6900
	1    0    0    -1  
$EndComp
Wire Wire Line
	3600 6700 3850 6700
Wire Wire Line
	3850 6700 3850 6900
$Comp
L CP C?
U 1 1 56D971F2
P 2950 6200
F 0 "C?" H 2975 6300 50  0000 L CNN
F 1 "CP" H 2975 6100 50  0000 L CNN
F 2 "" H 2988 6050 50  0000 C CNN
F 3 "" H 2950 6200 50  0000 C CNN
	1    2950 6200
	1    0    0    -1  
$EndComp
Wire Wire Line
	2950 6050 3150 6050
Wire Wire Line
	2950 6350 2950 6400
Wire Wire Line
	2950 6400 3150 6400
Wire Wire Line
	4250 5750 4450 5750
Wire Wire Line
	4250 6050 4450 6050
Wire Wire Line
	3150 5750 3150 5400
Wire Wire Line
	3150 5400 3700 5400
$Comp
L R R?
U 1 1 56D97445
P 4450 5500
F 0 "R?" V 4530 5500 50  0000 C CNN
F 1 "R" V 4450 5500 50  0000 C CNN
F 2 "" V 4380 5500 50  0000 C CNN
F 3 "" H 4450 5500 50  0000 C CNN
	1    4450 5500
	1    0    0    -1  
$EndComp
$Comp
L CP C?
U 1 1 56D974A2
P 4450 6400
F 0 "C?" H 4475 6500 50  0000 L CNN
F 1 "CP" H 4475 6300 50  0000 L CNN
F 2 "" H 4488 6250 50  0000 C CNN
F 3 "" H 4450 6400 50  0000 C CNN
	1    4450 6400
	1    0    0    -1  
$EndComp
Wire Wire Line
	4450 6050 4450 6250
Wire Wire Line
	4450 5750 4450 5650
$Comp
L GND #PWR?
U 1 1 56D975F0
P 4450 6900
F 0 "#PWR?" H 4450 6650 50  0001 C CNN
F 1 "GND" H 4450 6750 50  0000 C CNN
F 2 "" H 4450 6900 50  0000 C CNN
F 3 "" H 4450 6900 50  0000 C CNN
	1    4450 6900
	1    0    0    -1  
$EndComp
Wire Wire Line
	4450 6550 4450 6900
$Comp
L +5V #PWR?
U 1 1 56D9A3A4
P 4450 5100
F 0 "#PWR?" H 4450 4950 50  0001 C CNN
F 1 "+5V" H 4450 5240 50  0000 C CNN
F 2 "" H 4450 5100 50  0000 C CNN
F 3 "" H 4450 5100 50  0000 C CNN
	1    4450 5100
	1    0    0    -1  
$EndComp
Wire Wire Line
	4450 5100 4450 5350
$Comp
L GND #PWR?
U 1 1 56D9BC76
P 1900 2200
F 0 "#PWR?" H 1900 1950 50  0001 C CNN
F 1 "GND" H 1900 2050 50  0000 C CNN
F 2 "" H 1900 2200 50  0000 C CNN
F 3 "" H 1900 2200 50  0000 C CNN
	1    1900 2200
	1    0    0    -1  
$EndComp
Wire Wire Line
	1900 1500 1900 1850
Wire Wire Line
	1900 1800 1900 2200
$Comp
L R R?
U 1 1 56D9C093
P 2800 2850
F 0 "R?" V 2880 2850 50  0000 C CNN
F 1 "R" V 2800 2850 50  0000 C CNN
F 2 "" V 2730 2850 50  0000 C CNN
F 3 "" H 2800 2850 50  0000 C CNN
	1    2800 2850
	1    0    0    -1  
$EndComp
$Comp
L R R?
U 1 1 56D9C122
P 3300 2850
F 0 "R?" V 3380 2850 50  0000 C CNN
F 1 "R" V 3300 2850 50  0000 C CNN
F 2 "" V 3230 2850 50  0000 C CNN
F 3 "" H 3300 2850 50  0000 C CNN
	1    3300 2850
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR?
U 1 1 56D9C2D5
P 3000 2400
F 0 "#PWR?" H 3000 2250 50  0001 C CNN
F 1 "+5V" H 3000 2540 50  0000 C CNN
F 2 "" H 3000 2400 50  0000 C CNN
F 3 "" H 3000 2400 50  0000 C CNN
	1    3000 2400
	1    0    0    -1  
$EndComp
Wire Wire Line
	2800 2700 2800 2400
Wire Wire Line
	2800 2400 3300 2400
Wire Wire Line
	3300 2400 3300 2700
Connection ~ 3000 2400
$Comp
L CP C?
U 1 1 56D9C415
P 2400 3100
F 0 "C?" H 2425 3200 50  0000 L CNN
F 1 "CP" H 2425 3000 50  0000 L CNN
F 2 "" H 2438 2950 50  0000 C CNN
F 3 "" H 2400 3100 50  0000 C CNN
	1    2400 3100
	0    1    1    0   
$EndComp
$Comp
L CP C?
U 1 1 56D9C4C2
P 3050 3400
F 0 "C?" H 3075 3500 50  0000 L CNN
F 1 "CP" H 3075 3300 50  0000 L CNN
F 2 "" H 3088 3250 50  0000 C CNN
F 3 "" H 3050 3400 50  0000 C CNN
	1    3050 3400
	0    1    1    0   
$EndComp
Wire Wire Line
	2550 3100 4000 3100
Connection ~ 2800 3100
Wire Wire Line
	1100 1400 1100 3100
Wire Wire Line
	1100 3100 2250 3100
Wire Wire Line
	3200 3400 4000 3400
Wire Wire Line
	1200 3400 2900 3400
$EndSCHEMATC

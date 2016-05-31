#!/bin/sh


gnetlist -o analogue_filter_adc_frontend.ngspice.cir -g spice-sdb analogue_filter_adc_frontend.sch


ngspice -b analogue_filter_adc_frontend.ngspice.ckt -r analogue_filter_adc_frontend.ngspice.raw>spice.out


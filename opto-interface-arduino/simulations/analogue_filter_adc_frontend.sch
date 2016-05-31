v 20130925 2
C 40000 40000 0 0 0 title-B.sym
C 42700 45300 1 0 0 vac-1.sym
{
T 43400 45950 5 10 1 1 0 0 1
refdes=V1
T 43400 46150 5 10 0 0 0 0 1
device=vac
T 43400 46350 5 10 0 0 0 0 1
footprint=none
T 43400 45750 5 10 1 1 0 0 1
value=dc 0 ac 1
}
C 44900 47500 1 270 0 resistor-2.sym
{
T 45250 47100 5 10 0 0 270 0 1
device=RESISTOR
T 45200 47300 5 10 1 1 270 0 1
refdes=R1
T 44900 47500 5 10 1 1 0 0 1
value=750K
}
C 44900 45500 1 270 0 resistor-2.sym
{
T 45250 45100 5 10 0 0 270 0 1
device=RESISTOR
T 45200 45300 5 10 1 1 270 0 1
refdes=R2
T 44900 45500 5 10 1 1 0 0 1
value=100K
}
C 44500 46700 1 180 0 capacitor-2.sym
{
T 44300 46000 5 10 0 0 180 0 1
device=POLARIZED_CAPACITOR
T 44300 46200 5 10 1 1 180 0 1
refdes=C1
T 44300 45800 5 10 0 0 180 0 1
symversion=0.1
T 44500 46700 5 10 1 1 0 0 1
value=1u
}
C 44900 43700 1 0 0 gnd-1.sym
N 43000 46500 43600 46500 4
N 45000 46600 45000 45500 4
N 44500 46500 45000 46500 4
N 45000 44600 45000 44000 4
N 43000 45300 43000 44500 4
N 43000 44500 45000 44500 4
C 46000 46400 1 0 0 resistor-2.sym
{
T 46400 46750 5 10 0 0 0 0 1
device=RESISTOR
T 46200 46700 5 10 1 1 0 0 1
refdes=R3
T 46000 46400 5 10 1 1 0 0 1
value=100K
}
C 47700 45100 1 90 0 capacitor-1.sym
{
T 47000 45300 5 10 0 0 90 0 1
device=CAPACITOR
T 47200 45300 5 10 1 1 90 0 1
refdes=C2
T 46800 45300 5 10 0 0 90 0 1
symversion=0.1
T 47700 45100 5 10 1 1 0 0 1
value=14p
}
N 45000 46500 46000 46500 4
N 46900 46500 47500 46500 4
N 47500 46500 47500 46000 4
C 47200 43300 1 0 0 vdc-1.sym
{
T 47900 43950 5 10 1 1 0 0 1
refdes=V2
T 47900 44150 5 10 0 0 0 0 1
device=VOLTAGE_SOURCE
T 47900 44350 5 10 0 0 0 0 1
footprint=none
T 47900 43750 5 10 1 1 0 0 1
value=DC 1V65
}
N 47500 45100 47500 44500 4
C 45700 47800 1 0 0 vdc-1.sym
{
T 46400 48450 5 10 1 1 0 0 1
refdes=V3
T 46400 48650 5 10 0 0 0 0 1
device=VOLTAGE_SOURCE
T 46400 48850 5 10 0 0 0 0 1
footprint=none
T 46400 48250 5 10 1 1 0 0 1
value=DC 3V3
}
C 45900 47200 1 0 0 gnd-1.sym
N 45000 47500 45000 49000 4
N 45000 49000 46000 49000 4
N 46000 47800 46000 47500 4
C 47400 42700 1 0 0 gnd-1.sym
N 47500 43300 47500 43000 4

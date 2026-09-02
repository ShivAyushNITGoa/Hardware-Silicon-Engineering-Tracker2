# MOSFET Equations

## Overview

MOSFET equations describe the relationship between gate voltage, channel formation, and drain current.

## Important Parameters

- Mobility (μ)
- Oxide capacitance (Cox)
- Channel width (W)
- Channel length (L)
- Threshold voltage (VTH)

## Cutoff Region

Condition:

VGS < VTH

The transistor is OFF and only leakage current flows.

## Linear Region

Condition:

VGS > VTH and small VDS

Drain current:

ID = μCox(W/L)[(VGS-VTH)VDS - VDS²/2]

## Saturation Region

Condition:

VDS >= VGS-VTH

Drain current:

ID = 1/2 μCox(W/L)(VGS-VTH)²

## Advanced Models

- Channel length modulation
- Velocity saturation
- Subthreshold conduction
- BSIM models
- SPICE transistor models

## Industry Importance

Used in:

- CMOS design
- Analog IC design
- SRAM
- CPU/GPU transistor modelling

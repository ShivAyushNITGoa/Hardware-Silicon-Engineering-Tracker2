# SRAM Cell

## Overview

Static Random Access Memory (SRAM) is a memory circuit built using MOSFETs. It stores binary information using bistable transistor states.

## Prerequisites

- MOS capacitor
- NMOS and PMOS operation
- CMOS inverter
- Threshold voltage

## Basic 6T SRAM Structure

A conventional SRAM cell contains:

- Two cross-coupled CMOS inverters
- Two access NMOS transistors

Structure:

```
        VDD
         |
      CMOS Inverter
       |      |
       Q------Qbar
       |      |
     Access Transistors
       |      |
      Bit Lines
```

## Operation

### Hold

- Word line OFF
- Data is retained
- No refresh required

### Read

- Bit lines precharged
- Access transistors connect internal nodes
- Sense amplifier detects stored value

### Write

- Bit lines forced to new value
- Internal latch changes state

## Important Parameters

- Static Noise Margin (SNM)
- Read stability
- Write ability
- Cell area
- Leakage power

## Applications

- CPU cache
- GPU cache
- SoC memory
- Register files

## Advanced Topics

- FinFET SRAM
- GAAFET SRAM
- Low-power SRAM design
- SRAM scaling challenges

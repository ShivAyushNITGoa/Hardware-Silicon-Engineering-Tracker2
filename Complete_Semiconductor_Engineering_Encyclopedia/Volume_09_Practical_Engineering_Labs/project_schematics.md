# Semiconductor Project Schematics and Block Diagrams

## Purpose

This document defines the schematic and block diagram requirements for semiconductor engineering projects.

## Analog Projects

### CMOS Inverter

Blocks:
- PMOS pull-up network
- NMOS pull-down network
- Input node
- Output node
- Power supply

### Differential Amplifier

Blocks:
- Current source
- Differential pair
- Active load
- Output stage

## Digital RTL Projects

### UART Controller

Blocks:
- Baud rate generator
- Transmitter FSM
- Receiver FSM
- Shift registers
- Control logic

### RISC-V Processor

Blocks:
- Program counter
- Instruction decoder
- Register file
- ALU
- Memory interface
- Control unit

## ASIC Physical Design Diagrams

Flow diagrams included:

RTL → Synthesis → Floorplan → Placement → CTS → Routing → Signoff → GDSII

## Documentation Standard

Every project should include:
- Architecture diagram
- Circuit schematic
- RTL block diagram
- Simulation results
- Hardware results

# Synopsys EDA Tools

## Overview
Synopsys is one of the major semiconductor EDA companies used for ASIC design, verification, synthesis, timing analysis and physical implementation.

## Major Tools

### Design Compiler
Purpose:
- RTL synthesis
- Logic optimization
- Technology mapping

Flow:
RTL → Gate Netlist

### IC Compiler II (ICC2)
Used for:
- Floorplanning
- Placement
- Clock Tree Synthesis
- Routing
- Physical optimization

### PrimeTime
Industry standard Static Timing Analysis tool.

Used for:
- Setup analysis
- Hold analysis
- Timing closure
- Signoff timing

### VCS
Used for:
- Verilog simulation
- SystemVerilog simulation
- UVM verification

### Verdi
Used for:
- Debugging RTL simulations
- Waveform analysis
- Design exploration

## Typical ASIC Flow

RTL → VCS Verification → Design Compiler → ICC2 → PrimeTime → Tapeout

## Skills Required
- Linux
- Tcl scripting
- Verilog/SystemVerilog
- Timing concepts
- ASIC flow understanding

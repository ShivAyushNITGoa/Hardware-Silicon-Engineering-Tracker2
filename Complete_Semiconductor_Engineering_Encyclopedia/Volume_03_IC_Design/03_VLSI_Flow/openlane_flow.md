# OpenLane ASIC Flow

## Overview

OpenLane is an open-source RTL-to-GDSII ASIC flow.

## Main Stages

```text
RTL
 ↓
Yosys Synthesis
 ↓
Floorplan
 ↓
Placement
 ↓
CTS
 ↓
Routing
 ↓
Magic DRC/LVS
 ↓
GDSII
```

## Main Tools

- Yosys
- OpenROAD
- OpenSTA
- Magic
- Netgen
- KLayout

## Learning Projects

- Simple counter ASIC
- RISC-V core tapeout
- Basic SoC implementation


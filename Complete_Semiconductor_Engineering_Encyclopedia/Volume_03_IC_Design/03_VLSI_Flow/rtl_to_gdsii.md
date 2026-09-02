# RTL to GDSII Flow

## Overview

Complete ASIC implementation flow from design description to manufacturing database.

```text
Specification
 ↓
Architecture
 ↓
RTL Design
 ↓
RTL Verification
 ↓
Logic Synthesis
 ↓
Gate Level Netlist
 ↓
Floorplanning
 ↓
Placement
 ↓
Clock Tree Synthesis
 ↓
Routing
 ↓
Physical Verification
 ↓
GDSII
 ↓
Tapeout
```

## Main Stages

### Front End
- Architecture
- RTL coding
- Functional verification
- Logic synthesis

### Back End
- Physical design
- Timing closure
- Physical verification
- Manufacturing preparation

## Industry Tools

Simulation:
- VCS
- Questa
- Xcelium

Synthesis:
- Design Compiler
- Genus

Physical Design:
- Innovus
- ICC2

Verification:
- Calibre
- Pegasus

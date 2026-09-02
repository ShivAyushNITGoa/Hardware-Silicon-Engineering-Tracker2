# ASIC Tapeout

## Overview

Tapeout is the final stage where the verified physical design database is sent to the semiconductor foundry for manufacturing.

## Flow

```text
RTL
 ↓
Synthesis
 ↓
Physical Design
 ↓
Signoff
 ↓
GDSII
 ↓
Tapeout
 ↓
Fabrication
 ↓
Packaging
 ↓
Testing
```

## Tapeout Requirements

- DRC clean layout
- LVS clean layout
- Timing closure
- Power closure
- Signal integrity checks
- Manufacturing checks

## Final Deliverables

- GDSII/OASIS file
- Netlist
- Timing libraries
- Manufacturing data

## Industry Foundries

- TSMC
- Samsung Foundry
- Intel Foundry
- GlobalFoundries


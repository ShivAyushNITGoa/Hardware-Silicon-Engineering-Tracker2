# PDK and Design File Formats

## Process Design Kit (PDK)

A PDK contains technology information required for IC design.

Includes:
- Design rules
- Device models
- Standard cell libraries
- Technology files
- Extraction rules

## Important Formats

### Liberty (.lib)
- Timing models
- Power models
- Cell characteristics

### LEF
- Physical abstract information
- Cell dimensions
- Routing information

### DEF
- Design placement and routing information

### GDSII
- Final physical layout database
- Used for tapeout

## Typical Flow

RTL → Synthesis → Netlist → Floorplan → Placement → Routing → GDSII

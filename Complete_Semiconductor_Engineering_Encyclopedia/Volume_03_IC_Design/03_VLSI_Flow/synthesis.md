# Logic Synthesis

## Definition

Conversion of RTL code into an optimized gate-level netlist using standard cells.

## Inputs

- RTL code
- Technology library
- Design constraints

## Outputs

- Gate-level netlist
- Timing reports
- Area reports
- Power estimates

## Flow

```text
RTL
 ↓
Elaboration
 ↓
Optimization
 ↓
Technology Mapping
 ↓
Netlist
```

## Optimization Goals

- Reduce area
- Improve timing
- Reduce power

## Important Concepts

- Constraints
- Clock definition
- False paths
- Multi-cycle paths
- Standard cell libraries

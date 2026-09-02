# Static Timing Analysis (STA)

## Overview

STA verifies whether a digital design meets timing requirements without simulation vectors.

## Timing Checks

### Setup Time
Data must arrive before the active clock edge.

### Hold Time
Data must remain stable after the clock edge.

## Important Terms

- Clock skew
- Clock latency
- Jitter
- Slack
- Critical path

## Timing Equation

Slack = Required Time - Arrival Time

## Applications

- ASIC signoff
- FPGA timing closure
- High performance processors

## Tools

- Synopsys PrimeTime
- Cadence Tempus

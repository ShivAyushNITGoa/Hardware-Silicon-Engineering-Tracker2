// Auto-generated Encyclopedia Catalog & Search Index
export interface EncyclopediaFileItem {
  type: "file" | "directory";
  name: string;
  path: string;
  title?: string;
  children?: EncyclopediaFileItem[];
}

export interface EncyclopediaVolume {
  id: string;
  name: string;
  folder: string;
  isFile?: boolean;
  path?: string;
  items: EncyclopediaFileItem[];
}

export interface EncyclopediaFlatDoc {
  title: string;
  fileName: string;
  path: string;
  volumeId: string;
  volumeName: string;
}

export const encyclopediaVolumes: EncyclopediaVolume[] = [
  {
    "id": "README.md",
    "name": "README",
    "folder": "",
    "isFile": true,
    "path": "README.md",
    "items": []
  },
  {
    "id": "ROADMAP.md",
    "name": "ROADMAP",
    "folder": "",
    "isFile": true,
    "path": "ROADMAP.md",
    "items": []
  },
  {
    "id": "Volume_01_Fundamentals",
    "name": "Volume 01 Fundamentals",
    "folder": "Volume_01_Fundamentals",
    "items": [
      {
        "type": "directory",
        "name": "01_Mathematics",
        "path": "Volume_01_Fundamentals/01_Mathematics",
        "children": [
          {
            "type": "file",
            "name": "README.md",
            "path": "Volume_01_Fundamentals/01_Mathematics/README.md",
            "title": "README"
          }
        ]
      },
      {
        "type": "directory",
        "name": "02_Physics",
        "path": "Volume_01_Fundamentals/02_Physics",
        "children": [
          {
            "type": "file",
            "name": "README.md",
            "path": "Volume_01_Fundamentals/02_Physics/README.md",
            "title": "README"
          }
        ]
      },
      {
        "type": "directory",
        "name": "03_Semiconductor_Materials",
        "path": "Volume_01_Fundamentals/03_Semiconductor_Materials",
        "children": [
          {
            "type": "file",
            "name": "README.md",
            "path": "Volume_01_Fundamentals/03_Semiconductor_Materials/README.md",
            "title": "README"
          }
        ]
      },
      {
        "type": "directory",
        "name": "04_Semiconductor_Physics",
        "path": "Volume_01_Fundamentals/04_Semiconductor_Physics",
        "children": [
          {
            "type": "file",
            "name": "carrier_concentration.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/carrier_concentration.md",
            "title": "carrier concentration"
          },
          {
            "type": "file",
            "name": "carrier_transport.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/carrier_transport.md",
            "title": "carrier transport"
          },
          {
            "type": "file",
            "name": "crystal_structure.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/crystal_structure.md",
            "title": "crystal structure"
          },
          {
            "type": "file",
            "name": "doping.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/doping.md",
            "title": "doping"
          },
          {
            "type": "file",
            "name": "electrons_and_holes.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/electrons_and_holes.md",
            "title": "electrons and holes"
          },
          {
            "type": "file",
            "name": "energy_bands.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/energy_bands.md",
            "title": "energy bands"
          },
          {
            "type": "file",
            "name": "fermi_level.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/fermi_level.md",
            "title": "fermi level"
          },
          {
            "type": "file",
            "name": "mobility.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/mobility.md",
            "title": "mobility"
          },
          {
            "type": "file",
            "name": "pn_junction.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/pn_junction.md",
            "title": "pn junction"
          },
          {
            "type": "file",
            "name": "recombination_generation.md",
            "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/recombination_generation.md",
            "title": "recombination generation"
          }
        ]
      },
      {
        "type": "directory",
        "name": "05_Equations",
        "path": "Volume_01_Fundamentals/05_Equations",
        "children": [
          {
            "type": "file",
            "name": "diode_equations.md",
            "path": "Volume_01_Fundamentals/05_Equations/diode_equations.md",
            "title": "diode equations"
          },
          {
            "type": "file",
            "name": "mosfet_equations.md",
            "path": "Volume_01_Fundamentals/05_Equations/mosfet_equations.md",
            "title": "mosfet equations"
          },
          {
            "type": "file",
            "name": "semiconductor_equations.md",
            "path": "Volume_01_Fundamentals/05_Equations/semiconductor_equations.md",
            "title": "semiconductor equations"
          }
        ]
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_01_Fundamentals/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "engineering_mathematics_for_semiconductors.md",
        "path": "Volume_01_Fundamentals/engineering_mathematics_for_semiconductors.md",
        "title": "engineering mathematics for semiconductors"
      },
      {
        "type": "file",
        "name": "interview_questions.md",
        "path": "Volume_01_Fundamentals/interview_questions.md",
        "title": "interview questions"
      },
      {
        "type": "file",
        "name": "projects.md",
        "path": "Volume_01_Fundamentals/projects.md",
        "title": "projects"
      },
      {
        "type": "file",
        "name": "resources.md",
        "path": "Volume_01_Fundamentals/resources.md",
        "title": "resources"
      },
      {
        "type": "file",
        "name": "semiconductor_engineering_problem_solving_framework.md",
        "path": "Volume_01_Fundamentals/semiconductor_engineering_problem_solving_framework.md",
        "title": "semiconductor engineering problem solving framework"
      },
      {
        "type": "file",
        "name": "signals_and_systems_for_semiconductors.md",
        "path": "Volume_01_Fundamentals/signals_and_systems_for_semiconductors.md",
        "title": "signals and systems for semiconductors"
      }
    ]
  },
  {
    "id": "Volume_02_Semiconductor_Devices",
    "name": "Volume 02 Semiconductor Devices",
    "folder": "Volume_02_Semiconductor_Devices",
    "items": [
      {
        "type": "directory",
        "name": "01_Diodes",
        "path": "Volume_02_Semiconductor_Devices/01_Diodes",
        "children": [
          {
            "type": "file",
            "name": "led.md",
            "path": "Volume_02_Semiconductor_Devices/01_Diodes/led.md",
            "title": "led"
          },
          {
            "type": "file",
            "name": "photodiode.md",
            "path": "Volume_02_Semiconductor_Devices/01_Diodes/photodiode.md",
            "title": "photodiode"
          },
          {
            "type": "file",
            "name": "pn_diode.md",
            "path": "Volume_02_Semiconductor_Devices/01_Diodes/pn_diode.md",
            "title": "pn diode"
          },
          {
            "type": "file",
            "name": "schottky_diode.md",
            "path": "Volume_02_Semiconductor_Devices/01_Diodes/schottky_diode.md",
            "title": "schottky diode"
          },
          {
            "type": "file",
            "name": "zener_diode.md",
            "path": "Volume_02_Semiconductor_Devices/01_Diodes/zener_diode.md",
            "title": "zener diode"
          }
        ]
      },
      {
        "type": "directory",
        "name": "02_BJT",
        "path": "Volume_02_Semiconductor_Devices/02_BJT",
        "children": [
          {
            "type": "file",
            "name": "bjt_applications.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_applications.md",
            "title": "bjt applications"
          },
          {
            "type": "file",
            "name": "bjt_biasing.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_biasing.md",
            "title": "bjt biasing"
          },
          {
            "type": "file",
            "name": "bjt_characteristics.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_characteristics.md",
            "title": "bjt characteristics"
          },
          {
            "type": "file",
            "name": "bjt_equations.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_equations.md",
            "title": "bjt equations"
          },
          {
            "type": "file",
            "name": "bjt_fundamentals.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_fundamentals.md",
            "title": "bjt fundamentals"
          },
          {
            "type": "file",
            "name": "common_emitter_amplifier.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/common_emitter_amplifier.md",
            "title": "common emitter amplifier"
          },
          {
            "type": "file",
            "name": "comparison.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/comparison.md",
            "title": "comparison"
          },
          {
            "type": "file",
            "name": "current_mirror.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/current_mirror.md",
            "title": "current mirror"
          },
          {
            "type": "file",
            "name": "interview_questions.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/interview_questions.md",
            "title": "interview questions"
          },
          {
            "type": "file",
            "name": "npn_transistor.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/npn_transistor.md",
            "title": "npn transistor"
          },
          {
            "type": "file",
            "name": "pnp_transistor.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/pnp_transistor.md",
            "title": "pnp transistor"
          },
          {
            "type": "file",
            "name": "projects.md",
            "path": "Volume_02_Semiconductor_Devices/02_BJT/projects.md",
            "title": "projects"
          }
        ]
      },
      {
        "type": "directory",
        "name": "03_MOSFET",
        "path": "Volume_02_Semiconductor_Devices/03_MOSFET",
        "children": [
          {
            "type": "file",
            "name": "advanced_cmos.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/advanced_cmos.md",
            "title": "advanced cmos"
          },
          {
            "type": "file",
            "name": "body_effect.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/body_effect.md",
            "title": "body effect"
          },
          {
            "type": "file",
            "name": "cmos_inverter.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/cmos_inverter.md",
            "title": "cmos inverter"
          },
          {
            "type": "file",
            "name": "device_comparison.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/device_comparison.md",
            "title": "device comparison"
          },
          {
            "type": "file",
            "name": "finfet.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/finfet.md",
            "title": "finfet"
          },
          {
            "type": "file",
            "name": "gaafet.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/gaafet.md",
            "title": "gaafet"
          },
          {
            "type": "file",
            "name": "interview_questions.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/interview_questions.md",
            "title": "interview questions"
          },
          {
            "type": "file",
            "name": "leakage_mechanisms.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/leakage_mechanisms.md",
            "title": "leakage mechanisms"
          },
          {
            "type": "file",
            "name": "mos_capacitor.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mos_capacitor.md",
            "title": "mos capacitor"
          },
          {
            "type": "file",
            "name": "mosfet_equations.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mosfet_equations.md",
            "title": "mosfet equations"
          },
          {
            "type": "file",
            "name": "mosfet_fundamentals.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mosfet_fundamentals.md",
            "title": "mosfet fundamentals"
          },
          {
            "type": "file",
            "name": "mosfet_projects.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mosfet_projects.md",
            "title": "mosfet projects"
          },
          {
            "type": "file",
            "name": "nanosheet_transistor.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/nanosheet_transistor.md",
            "title": "nanosheet transistor"
          },
          {
            "type": "file",
            "name": "nmos.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/nmos.md",
            "title": "nmos"
          },
          {
            "type": "file",
            "name": "operating_regions.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/operating_regions.md",
            "title": "operating regions"
          },
          {
            "type": "file",
            "name": "pmos.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/pmos.md",
            "title": "pmos"
          },
          {
            "type": "file",
            "name": "scaling.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/scaling.md",
            "title": "scaling"
          },
          {
            "type": "file",
            "name": "short_channel_effects.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/short_channel_effects.md",
            "title": "short channel effects"
          },
          {
            "type": "file",
            "name": "simulation_tools.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/simulation_tools.md",
            "title": "simulation tools"
          },
          {
            "type": "file",
            "name": "sram_cell.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/sram_cell.md",
            "title": "sram cell"
          },
          {
            "type": "file",
            "name": "threshold_voltage.md",
            "path": "Volume_02_Semiconductor_Devices/03_MOSFET/threshold_voltage.md",
            "title": "threshold voltage"
          }
        ]
      },
      {
        "type": "directory",
        "name": "04_CMOS",
        "path": "Volume_02_Semiconductor_Devices/04_CMOS",
        "children": [
          {
            "type": "file",
            "name": "README.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/README.md",
            "title": "README"
          },
          {
            "type": "file",
            "name": "clock_tree.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/clock_tree.md",
            "title": "clock tree"
          },
          {
            "type": "file",
            "name": "cmos_fundamentals.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/cmos_fundamentals.md",
            "title": "cmos fundamentals"
          },
          {
            "type": "file",
            "name": "comparison_tables.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/comparison_tables.md",
            "title": "comparison tables"
          },
          {
            "type": "file",
            "name": "flip_flop.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/flip_flop.md",
            "title": "flip flop"
          },
          {
            "type": "file",
            "name": "interview_questions.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/interview_questions.md",
            "title": "interview questions"
          },
          {
            "type": "file",
            "name": "latch.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/latch.md",
            "title": "latch"
          },
          {
            "type": "file",
            "name": "logic_gates.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/logic_gates.md",
            "title": "logic gates"
          },
          {
            "type": "file",
            "name": "low_power_cmos.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/low_power_cmos.md",
            "title": "low power cmos"
          },
          {
            "type": "file",
            "name": "memory_cells.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/memory_cells.md",
            "title": "memory cells"
          },
          {
            "type": "file",
            "name": "nand_nor_design.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/nand_nor_design.md",
            "title": "nand nor design"
          },
          {
            "type": "file",
            "name": "projects.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/projects.md",
            "title": "projects"
          },
          {
            "type": "file",
            "name": "standard_cells.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/standard_cells.md",
            "title": "standard cells"
          },
          {
            "type": "file",
            "name": "transmission_gate.md",
            "path": "Volume_02_Semiconductor_Devices/04_CMOS/transmission_gate.md",
            "title": "transmission gate"
          }
        ]
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_02_Semiconductor_Devices/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "reliability_and_characterization.md",
        "path": "Volume_02_Semiconductor_Devices/reliability_and_characterization.md",
        "title": "reliability and characterization"
      }
    ]
  },
  {
    "id": "Volume_03_IC_Design",
    "name": "Volume 03 IC Design",
    "folder": "Volume_03_IC_Design",
    "items": [
      {
        "type": "directory",
        "name": "01_Analog_IC_Design",
        "path": "Volume_03_IC_Design/01_Analog_IC_Design",
        "children": [
          {
            "type": "file",
            "name": "analog_fundamentals.md",
            "path": "Volume_03_IC_Design/01_Analog_IC_Design/analog_fundamentals.md",
            "title": "analog fundamentals"
          },
          {
            "type": "file",
            "name": "analog_layout.md",
            "path": "Volume_03_IC_Design/01_Analog_IC_Design/analog_layout.md",
            "title": "analog layout"
          },
          {
            "type": "file",
            "name": "current_mirror.md",
            "path": "Volume_03_IC_Design/01_Analog_IC_Design/current_mirror.md",
            "title": "current mirror"
          },
          {
            "type": "file",
            "name": "differential_pair.md",
            "path": "Volume_03_IC_Design/01_Analog_IC_Design/differential_pair.md",
            "title": "differential pair"
          },
          {
            "type": "file",
            "name": "opamp_design.md",
            "path": "Volume_03_IC_Design/01_Analog_IC_Design/opamp_design.md",
            "title": "opamp design"
          }
        ]
      },
      {
        "type": "directory",
        "name": "02_Digital_IC_Design",
        "path": "Volume_03_IC_Design/02_Digital_IC_Design",
        "children": [
          {
            "type": "file",
            "name": "combinational_logic.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/combinational_logic.md",
            "title": "combinational logic"
          },
          {
            "type": "file",
            "name": "datapath_design.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/datapath_design.md",
            "title": "datapath design"
          },
          {
            "type": "file",
            "name": "digital_design.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/digital_design.md",
            "title": "digital design"
          },
          {
            "type": "file",
            "name": "hdl_design_flow.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/hdl_design_flow.md",
            "title": "hdl design flow"
          },
          {
            "type": "file",
            "name": "rtl_design.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/rtl_design.md",
            "title": "rtl design"
          },
          {
            "type": "file",
            "name": "sequential_logic.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/sequential_logic.md",
            "title": "sequential logic"
          },
          {
            "type": "file",
            "name": "systemverilog.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/systemverilog.md",
            "title": "systemverilog"
          },
          {
            "type": "file",
            "name": "verilog.md",
            "path": "Volume_03_IC_Design/02_Digital_IC_Design/verilog.md",
            "title": "verilog"
          }
        ]
      },
      {
        "type": "directory",
        "name": "03_VLSI_Flow",
        "path": "Volume_03_IC_Design/03_VLSI_Flow",
        "children": [
          {
            "type": "file",
            "name": "clock_tree_synthesis.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/clock_tree_synthesis.md",
            "title": "clock tree synthesis"
          },
          {
            "type": "file",
            "name": "drc_lvs.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/drc_lvs.md",
            "title": "drc lvs"
          },
          {
            "type": "file",
            "name": "floorplanning.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/floorplanning.md",
            "title": "floorplanning"
          },
          {
            "type": "file",
            "name": "openlane_flow.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/openlane_flow.md",
            "title": "openlane flow"
          },
          {
            "type": "file",
            "name": "openroad_flow.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/openroad_flow.md",
            "title": "openroad flow"
          },
          {
            "type": "file",
            "name": "placement.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/placement.md",
            "title": "placement"
          },
          {
            "type": "file",
            "name": "routing.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/routing.md",
            "title": "routing"
          },
          {
            "type": "file",
            "name": "rtl_to_gdsii.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/rtl_to_gdsii.md",
            "title": "rtl to gdsii"
          },
          {
            "type": "file",
            "name": "signoff.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/signoff.md",
            "title": "signoff"
          },
          {
            "type": "file",
            "name": "static_timing_analysis.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/static_timing_analysis.md",
            "title": "static timing analysis"
          },
          {
            "type": "file",
            "name": "synthesis.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/synthesis.md",
            "title": "synthesis"
          },
          {
            "type": "file",
            "name": "tapeout.md",
            "path": "Volume_03_IC_Design/03_VLSI_Flow/tapeout.md",
            "title": "tapeout"
          }
        ]
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_03_IC_Design/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "mixed_signal_design.md",
        "path": "Volume_03_IC_Design/mixed_signal_design.md",
        "title": "mixed signal design"
      }
    ]
  },
  {
    "id": "Volume_04_Semiconductor_Fabrication",
    "name": "Volume 04 Semiconductor Fabrication",
    "folder": "Volume_04_Semiconductor_Fabrication",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_04_Semiconductor_Fabrication/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "advanced_packaging.md",
        "path": "Volume_04_Semiconductor_Fabrication/advanced_packaging.md",
        "title": "advanced packaging"
      },
      {
        "type": "file",
        "name": "cleanroom.md",
        "path": "Volume_04_Semiconductor_Fabrication/cleanroom.md",
        "title": "cleanroom"
      },
      {
        "type": "file",
        "name": "cmp.md",
        "path": "Volume_04_Semiconductor_Fabrication/cmp.md",
        "title": "cmp"
      },
      {
        "type": "file",
        "name": "deposition.md",
        "path": "Volume_04_Semiconductor_Fabrication/deposition.md",
        "title": "deposition"
      },
      {
        "type": "file",
        "name": "diffusion.md",
        "path": "Volume_04_Semiconductor_Fabrication/diffusion.md",
        "title": "diffusion"
      },
      {
        "type": "file",
        "name": "etching.md",
        "path": "Volume_04_Semiconductor_Fabrication/etching.md",
        "title": "etching"
      },
      {
        "type": "file",
        "name": "euv_lithography.md",
        "path": "Volume_04_Semiconductor_Fabrication/euv_lithography.md",
        "title": "euv lithography"
      },
      {
        "type": "file",
        "name": "fab_equipment.md",
        "path": "Volume_04_Semiconductor_Fabrication/fab_equipment.md",
        "title": "fab equipment"
      },
      {
        "type": "file",
        "name": "ic_packaging.md",
        "path": "Volume_04_Semiconductor_Fabrication/ic_packaging.md",
        "title": "ic packaging"
      },
      {
        "type": "file",
        "name": "ion_implantation.md",
        "path": "Volume_04_Semiconductor_Fabrication/ion_implantation.md",
        "title": "ion implantation"
      },
      {
        "type": "file",
        "name": "lithography.md",
        "path": "Volume_04_Semiconductor_Fabrication/lithography.md",
        "title": "lithography"
      },
      {
        "type": "file",
        "name": "oxidation.md",
        "path": "Volume_04_Semiconductor_Fabrication/oxidation.md",
        "title": "oxidation"
      },
      {
        "type": "file",
        "name": "process_nodes.md",
        "path": "Volume_04_Semiconductor_Fabrication/process_nodes.md",
        "title": "process nodes"
      },
      {
        "type": "file",
        "name": "semiconductor_process.md",
        "path": "Volume_04_Semiconductor_Fabrication/semiconductor_process.md",
        "title": "semiconductor process"
      },
      {
        "type": "file",
        "name": "wafer_manufacturing.md",
        "path": "Volume_04_Semiconductor_Fabrication/wafer_manufacturing.md",
        "title": "wafer manufacturing"
      },
      {
        "type": "file",
        "name": "wafer_testing.md",
        "path": "Volume_04_Semiconductor_Fabrication/wafer_testing.md",
        "title": "wafer testing"
      },
      {
        "type": "file",
        "name": "yield_and_process_control.md",
        "path": "Volume_04_Semiconductor_Fabrication/yield_and_process_control.md",
        "title": "yield and process control"
      },
      {
        "type": "file",
        "name": "yield_engineering.md",
        "path": "Volume_04_Semiconductor_Fabrication/yield_engineering.md",
        "title": "yield engineering"
      }
    ]
  },
  {
    "id": "Volume_05_EDA_Tools",
    "name": "Volume 05 EDA Tools",
    "folder": "Volume_05_EDA_Tools",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_05_EDA_Tools/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "ansys_tools.md",
        "path": "Volume_05_EDA_Tools/ansys_tools.md",
        "title": "ansys tools"
      },
      {
        "type": "file",
        "name": "cadence_tools.md",
        "path": "Volume_05_EDA_Tools/cadence_tools.md",
        "title": "cadence tools"
      },
      {
        "type": "file",
        "name": "eda_industry_best_practices.md",
        "path": "Volume_05_EDA_Tools/eda_industry_best_practices.md",
        "title": "eda industry best practices"
      },
      {
        "type": "file",
        "name": "fpga_tools.md",
        "path": "Volume_05_EDA_Tools/fpga_tools.md",
        "title": "fpga tools"
      },
      {
        "type": "file",
        "name": "linux_vlsi_setup.md",
        "path": "Volume_05_EDA_Tools/linux_vlsi_setup.md",
        "title": "linux vlsi setup"
      },
      {
        "type": "file",
        "name": "open_source_eda.md",
        "path": "Volume_05_EDA_Tools/open_source_eda.md",
        "title": "open source eda"
      },
      {
        "type": "file",
        "name": "open_source_eda_complete_flow.md",
        "path": "Volume_05_EDA_Tools/open_source_eda_complete_flow.md",
        "title": "open source eda complete flow"
      },
      {
        "type": "file",
        "name": "pdk_and_design_formats.md",
        "path": "Volume_05_EDA_Tools/pdk_and_design_formats.md",
        "title": "pdk and design formats"
      },
      {
        "type": "file",
        "name": "siemens_eda.md",
        "path": "Volume_05_EDA_Tools/siemens_eda.md",
        "title": "siemens eda"
      },
      {
        "type": "file",
        "name": "spice_simulators.md",
        "path": "Volume_05_EDA_Tools/spice_simulators.md",
        "title": "spice simulators"
      },
      {
        "type": "file",
        "name": "synopsys_tools.md",
        "path": "Volume_05_EDA_Tools/synopsys_tools.md",
        "title": "synopsys tools"
      },
      {
        "type": "file",
        "name": "tcad_tools.md",
        "path": "Volume_05_EDA_Tools/tcad_tools.md",
        "title": "tcad tools"
      },
      {
        "type": "file",
        "name": "verification_tools.md",
        "path": "Volume_05_EDA_Tools/verification_tools.md",
        "title": "verification tools"
      }
    ]
  },
  {
    "id": "Volume_06_Design_Methodologies",
    "name": "Volume 06 Design Methodologies",
    "folder": "Volume_06_Design_Methodologies",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_06_Design_Methodologies/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "advanced_cdc_rdc_examples.md",
        "path": "Volume_06_Design_Methodologies/advanced_cdc_rdc_examples.md",
        "title": "advanced cdc rdc examples"
      },
      {
        "type": "file",
        "name": "advanced_verification_methodology.md",
        "path": "Volume_06_Design_Methodologies/advanced_verification_methodology.md",
        "title": "advanced verification methodology"
      },
      {
        "type": "file",
        "name": "ai_accelerator_design.md",
        "path": "Volume_06_Design_Methodologies/ai_accelerator_design.md",
        "title": "ai accelerator design"
      },
      {
        "type": "file",
        "name": "analog_design_flow.md",
        "path": "Volume_06_Design_Methodologies/analog_design_flow.md",
        "title": "analog design flow"
      },
      {
        "type": "file",
        "name": "chiplet_design.md",
        "path": "Volume_06_Design_Methodologies/chiplet_design.md",
        "title": "chiplet design"
      },
      {
        "type": "file",
        "name": "dft_and_test.md",
        "path": "Volume_06_Design_Methodologies/dft_and_test.md",
        "title": "dft and test"
      },
      {
        "type": "file",
        "name": "digital_design_flow.md",
        "path": "Volume_06_Design_Methodologies/digital_design_flow.md",
        "title": "digital design flow"
      },
      {
        "type": "file",
        "name": "formal_verification.md",
        "path": "Volume_06_Design_Methodologies/formal_verification.md",
        "title": "formal verification"
      },
      {
        "type": "file",
        "name": "fpga_design_flow.md",
        "path": "Volume_06_Design_Methodologies/fpga_design_flow.md",
        "title": "fpga design flow"
      },
      {
        "type": "file",
        "name": "low_power_and_cdc_design.md",
        "path": "Volume_06_Design_Methodologies/low_power_and_cdc_design.md",
        "title": "low power and cdc design"
      },
      {
        "type": "file",
        "name": "low_power_design.md",
        "path": "Volume_06_Design_Methodologies/low_power_design.md",
        "title": "low power design"
      },
      {
        "type": "file",
        "name": "soc_design_flow.md",
        "path": "Volume_06_Design_Methodologies/soc_design_flow.md",
        "title": "soc design flow"
      },
      {
        "type": "file",
        "name": "systemverilog_uvm_industry_verification_examples.md",
        "path": "Volume_06_Design_Methodologies/systemverilog_uvm_industry_verification_examples.md",
        "title": "systemverilog uvm industry verification examples"
      },
      {
        "type": "file",
        "name": "uvm_methodology.md",
        "path": "Volume_06_Design_Methodologies/uvm_methodology.md",
        "title": "uvm methodology"
      },
      {
        "type": "file",
        "name": "verification_methodology.md",
        "path": "Volume_06_Design_Methodologies/verification_methodology.md",
        "title": "verification methodology"
      }
    ]
  },
  {
    "id": "Volume_07_Industry_Preparation",
    "name": "Volume 07 Industry Preparation",
    "folder": "Volume_07_Industry_Preparation",
    "items": [
      {
        "type": "file",
        "name": "365_day_learning_plan.md",
        "path": "Volume_07_Industry_Preparation/365_day_learning_plan.md",
        "title": "365 day learning plan"
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_07_Industry_Preparation/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "company_requirements.md",
        "path": "Volume_07_Industry_Preparation/company_requirements.md",
        "title": "company requirements"
      },
      {
        "type": "file",
        "name": "internship_roadmap.md",
        "path": "Volume_07_Industry_Preparation/internship_roadmap.md",
        "title": "internship roadmap"
      },
      {
        "type": "file",
        "name": "interview_questions.md",
        "path": "Volume_07_Industry_Preparation/interview_questions.md",
        "title": "interview questions"
      },
      {
        "type": "file",
        "name": "research_paper_roadmap.md",
        "path": "Volume_07_Industry_Preparation/research_paper_roadmap.md",
        "title": "research paper roadmap"
      },
      {
        "type": "file",
        "name": "resume_projects.md",
        "path": "Volume_07_Industry_Preparation/resume_projects.md",
        "title": "resume projects"
      },
      {
        "type": "file",
        "name": "semiconductor_job_roles.md",
        "path": "Volume_07_Industry_Preparation/semiconductor_job_roles.md",
        "title": "semiconductor job roles"
      },
      {
        "type": "file",
        "name": "semiconductor_resume_and_portfolio.md",
        "path": "Volume_07_Industry_Preparation/semiconductor_resume_and_portfolio.md",
        "title": "semiconductor resume and portfolio"
      },
      {
        "type": "file",
        "name": "skill_matrix.md",
        "path": "Volume_07_Industry_Preparation/skill_matrix.md",
        "title": "skill matrix"
      }
    ]
  },
  {
    "id": "Volume_08_Semiconductor_Glossary",
    "name": "Volume 08 Semiconductor Glossary",
    "folder": "Volume_08_Semiconductor_Glossary",
    "items": [
      {
        "type": "file",
        "name": "A_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/A_terms.md",
        "title": "A terms"
      },
      {
        "type": "file",
        "name": "B_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/B_terms.md",
        "title": "B terms"
      },
      {
        "type": "file",
        "name": "C_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/C_terms.md",
        "title": "C terms"
      },
      {
        "type": "file",
        "name": "D_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/D_terms.md",
        "title": "D terms"
      },
      {
        "type": "file",
        "name": "E_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/E_terms.md",
        "title": "E terms"
      },
      {
        "type": "file",
        "name": "F_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/F_terms.md",
        "title": "F terms"
      },
      {
        "type": "file",
        "name": "G_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/G_terms.md",
        "title": "G terms"
      },
      {
        "type": "file",
        "name": "H_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/H_terms.md",
        "title": "H terms"
      },
      {
        "type": "file",
        "name": "I_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/I_terms.md",
        "title": "I terms"
      },
      {
        "type": "file",
        "name": "J_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/J_terms.md",
        "title": "J terms"
      },
      {
        "type": "file",
        "name": "K_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/K_terms.md",
        "title": "K terms"
      },
      {
        "type": "file",
        "name": "L_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/L_terms.md",
        "title": "L terms"
      },
      {
        "type": "file",
        "name": "M_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/M_terms.md",
        "title": "M terms"
      },
      {
        "type": "file",
        "name": "N_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/N_terms.md",
        "title": "N terms"
      },
      {
        "type": "file",
        "name": "O_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/O_terms.md",
        "title": "O terms"
      },
      {
        "type": "file",
        "name": "P_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/P_terms.md",
        "title": "P terms"
      },
      {
        "type": "file",
        "name": "Q_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/Q_terms.md",
        "title": "Q terms"
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_08_Semiconductor_Glossary/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "R_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/R_terms.md",
        "title": "R terms"
      },
      {
        "type": "file",
        "name": "S_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/S_terms.md",
        "title": "S terms"
      },
      {
        "type": "file",
        "name": "T_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/T_terms.md",
        "title": "T terms"
      },
      {
        "type": "file",
        "name": "U_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/U_terms.md",
        "title": "U terms"
      },
      {
        "type": "file",
        "name": "V_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/V_terms.md",
        "title": "V terms"
      },
      {
        "type": "file",
        "name": "W_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/W_terms.md",
        "title": "W terms"
      },
      {
        "type": "file",
        "name": "X_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/X_terms.md",
        "title": "X terms"
      },
      {
        "type": "file",
        "name": "Y_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/Y_terms.md",
        "title": "Y terms"
      },
      {
        "type": "file",
        "name": "Z_terms.md",
        "path": "Volume_08_Semiconductor_Glossary/Z_terms.md",
        "title": "Z terms"
      },
      {
        "type": "file",
        "name": "ai_accelerator_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/ai_accelerator_dictionary.md",
        "title": "ai accelerator dictionary"
      },
      {
        "type": "file",
        "name": "eda_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/eda_dictionary.md",
        "title": "eda dictionary"
      },
      {
        "type": "file",
        "name": "materials_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/materials_dictionary.md",
        "title": "materials dictionary"
      },
      {
        "type": "file",
        "name": "memory_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/memory_dictionary.md",
        "title": "memory dictionary"
      },
      {
        "type": "file",
        "name": "packaging_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/packaging_dictionary.md",
        "title": "packaging dictionary"
      },
      {
        "type": "file",
        "name": "power_semiconductor_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/power_semiconductor_dictionary.md",
        "title": "power semiconductor dictionary"
      },
      {
        "type": "file",
        "name": "reliability_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/reliability_dictionary.md",
        "title": "reliability dictionary"
      },
      {
        "type": "file",
        "name": "semiconductor_abbreviations.md",
        "path": "Volume_08_Semiconductor_Glossary/semiconductor_abbreviations.md",
        "title": "semiconductor abbreviations"
      },
      {
        "type": "file",
        "name": "semiconductor_equations.md",
        "path": "Volume_08_Semiconductor_Glossary/semiconductor_equations.md",
        "title": "semiconductor equations"
      },
      {
        "type": "file",
        "name": "soc_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/soc_dictionary.md",
        "title": "soc dictionary"
      },
      {
        "type": "file",
        "name": "verification_dictionary.md",
        "path": "Volume_08_Semiconductor_Glossary/verification_dictionary.md",
        "title": "verification dictionary"
      }
    ]
  },
  {
    "id": "Volume_09_Practical_Engineering_Labs",
    "name": "Volume 09 Practical Engineering Labs",
    "folder": "Volume_09_Practical_Engineering_Labs",
    "items": [
      {
        "type": "file",
        "name": "ASIC_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/ASIC_projects.md",
        "title": "ASIC projects"
      },
      {
        "type": "file",
        "name": "FPGA_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/FPGA_projects.md",
        "title": "FPGA projects"
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_09_Practical_Engineering_Labs/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "RTL_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/RTL_projects.md",
        "title": "RTL projects"
      },
      {
        "type": "file",
        "name": "electronics_foundation_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/electronics_foundation_projects.md",
        "title": "electronics foundation projects"
      },
      {
        "type": "file",
        "name": "hardware_debugging_lab.md",
        "path": "Volume_09_Practical_Engineering_Labs/hardware_debugging_lab.md",
        "title": "hardware debugging lab"
      },
      {
        "type": "file",
        "name": "hardware_lab_setup.md",
        "path": "Volume_09_Practical_Engineering_Labs/hardware_lab_setup.md",
        "title": "hardware lab setup"
      },
      {
        "type": "file",
        "name": "industry_capstone_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/industry_capstone_projects.md",
        "title": "industry capstone projects"
      },
      {
        "type": "file",
        "name": "open_source_tapeout_flow.md",
        "path": "Volume_09_Practical_Engineering_Labs/open_source_tapeout_flow.md",
        "title": "open source tapeout flow"
      },
      {
        "type": "file",
        "name": "project_database_100_plus.md",
        "path": "Volume_09_Practical_Engineering_Labs/project_database_100_plus.md",
        "title": "project database 100 plus"
      },
      {
        "type": "file",
        "name": "project_schematics.md",
        "path": "Volume_09_Practical_Engineering_Labs/project_schematics.md",
        "title": "project schematics"
      },
      {
        "type": "file",
        "name": "semiconductor_simulation_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/semiconductor_simulation_projects.md",
        "title": "semiconductor simulation projects"
      },
      {
        "type": "file",
        "name": "verification_projects.md",
        "path": "Volume_09_Practical_Engineering_Labs/verification_projects.md",
        "title": "verification projects"
      }
    ]
  },
  {
    "id": "Volume_10_Semiconductor_Resources",
    "name": "Volume 10 Semiconductor Resources",
    "folder": "Volume_10_Semiconductor_Resources",
    "items": [
      {
        "type": "file",
        "name": "EDA_tools_database.md",
        "path": "Volume_10_Semiconductor_Resources/EDA_tools_database.md",
        "title": "EDA tools database"
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_10_Semiconductor_Resources/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "books_database.md",
        "path": "Volume_10_Semiconductor_Resources/books_database.md",
        "title": "books database"
      },
      {
        "type": "file",
        "name": "documentation_links.md",
        "path": "Volume_10_Semiconductor_Resources/documentation_links.md",
        "title": "documentation links"
      },
      {
        "type": "file",
        "name": "free_courses.md",
        "path": "Volume_10_Semiconductor_Resources/free_courses.md",
        "title": "free courses"
      },
      {
        "type": "file",
        "name": "free_pdk_database.md",
        "path": "Volume_10_Semiconductor_Resources/free_pdk_database.md",
        "title": "free pdk database"
      },
      {
        "type": "file",
        "name": "installation_guides.md",
        "path": "Volume_10_Semiconductor_Resources/installation_guides.md",
        "title": "installation guides"
      },
      {
        "type": "file",
        "name": "internship_job_resources.md",
        "path": "Volume_10_Semiconductor_Resources/internship_job_resources.md",
        "title": "internship job resources"
      },
      {
        "type": "file",
        "name": "linux_vlsi_setup.md",
        "path": "Volume_10_Semiconductor_Resources/linux_vlsi_setup.md",
        "title": "linux vlsi setup"
      },
      {
        "type": "file",
        "name": "master_index.md",
        "path": "Volume_10_Semiconductor_Resources/master_index.md",
        "title": "master index"
      },
      {
        "type": "file",
        "name": "open_source_asic_tutorial.md",
        "path": "Volume_10_Semiconductor_Resources/open_source_asic_tutorial.md",
        "title": "open source asic tutorial"
      },
      {
        "type": "file",
        "name": "qualcomm_soc_case_study.md",
        "path": "Volume_10_Semiconductor_Resources/qualcomm_soc_case_study.md",
        "title": "qualcomm soc case study"
      },
      {
        "type": "file",
        "name": "research_papers.md",
        "path": "Volume_10_Semiconductor_Resources/research_papers.md",
        "title": "research papers"
      },
      {
        "type": "file",
        "name": "semiconductor_communities.md",
        "path": "Volume_10_Semiconductor_Resources/semiconductor_communities.md",
        "title": "semiconductor communities"
      },
      {
        "type": "file",
        "name": "simulation_tools.md",
        "path": "Volume_10_Semiconductor_Resources/simulation_tools.md",
        "title": "simulation tools"
      },
      {
        "type": "file",
        "name": "youtube_channels.md",
        "path": "Volume_10_Semiconductor_Resources/youtube_channels.md",
        "title": "youtube channels"
      }
    ]
  },
  {
    "id": "Volume_11_Industry_Deep_Dive",
    "name": "Volume 11 Industry Deep Dive",
    "folder": "Volume_11_Industry_Deep_Dive",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_11_Industry_Deep_Dive/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "advanced_packaging_industry.md",
        "path": "Volume_11_Industry_Deep_Dive/advanced_packaging_industry.md",
        "title": "advanced packaging industry"
      },
      {
        "type": "file",
        "name": "apple_silicon_architecture_case_study.md",
        "path": "Volume_11_Industry_Deep_Dive/apple_silicon_architecture_case_study.md",
        "title": "apple silicon architecture case study"
      },
      {
        "type": "file",
        "name": "company_interview_preparation.md",
        "path": "Volume_11_Industry_Deep_Dive/company_interview_preparation.md",
        "title": "company interview preparation"
      },
      {
        "type": "file",
        "name": "company_skill_matrix.md",
        "path": "Volume_11_Industry_Deep_Dive/company_skill_matrix.md",
        "title": "company skill matrix"
      },
      {
        "type": "file",
        "name": "eda_companies.md",
        "path": "Volume_11_Industry_Deep_Dive/eda_companies.md",
        "title": "eda companies"
      },
      {
        "type": "file",
        "name": "equipment_companies.md",
        "path": "Volume_11_Industry_Deep_Dive/equipment_companies.md",
        "title": "equipment companies"
      },
      {
        "type": "file",
        "name": "fabless_companies.md",
        "path": "Volume_11_Industry_Deep_Dive/fabless_companies.md",
        "title": "fabless companies"
      },
      {
        "type": "file",
        "name": "foundries.md",
        "path": "Volume_11_Industry_Deep_Dive/foundries.md",
        "title": "foundries"
      },
      {
        "type": "file",
        "name": "india_semiconductor_ecosystem.md",
        "path": "Volume_11_Industry_Deep_Dive/india_semiconductor_ecosystem.md",
        "title": "india semiconductor ecosystem"
      },
      {
        "type": "file",
        "name": "intel_amd_arm_architecture_case_study.md",
        "path": "Volume_11_Industry_Deep_Dive/intel_amd_arm_architecture_case_study.md",
        "title": "intel amd arm architecture case study"
      },
      {
        "type": "file",
        "name": "salary_and_career_path.md",
        "path": "Volume_11_Industry_Deep_Dive/salary_and_career_path.md",
        "title": "salary and career path"
      },
      {
        "type": "file",
        "name": "semiconductor_future_trends.md",
        "path": "Volume_11_Industry_Deep_Dive/semiconductor_future_trends.md",
        "title": "semiconductor future trends"
      },
      {
        "type": "file",
        "name": "semiconductor_job_roles.md",
        "path": "Volume_11_Industry_Deep_Dive/semiconductor_job_roles.md",
        "title": "semiconductor job roles"
      },
      {
        "type": "file",
        "name": "semiconductor_supply_chain.md",
        "path": "Volume_11_Industry_Deep_Dive/semiconductor_supply_chain.md",
        "title": "semiconductor supply chain"
      }
    ]
  },
  {
    "id": "Volume_12_365_Day_Roadmap",
    "name": "Volume 12 365 Day Roadmap",
    "folder": "Volume_12_365_Day_Roadmap",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_12_365_Day_Roadmap/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "month_01_foundations.md",
        "path": "Volume_12_365_Day_Roadmap/month_01_foundations.md",
        "title": "month 01 foundations"
      },
      {
        "type": "file",
        "name": "month_02_electronics.md",
        "path": "Volume_12_365_Day_Roadmap/month_02_electronics.md",
        "title": "month 02 electronics"
      },
      {
        "type": "file",
        "name": "month_03_semiconductor_physics.md",
        "path": "Volume_12_365_Day_Roadmap/month_03_semiconductor_physics.md",
        "title": "month 03 semiconductor physics"
      },
      {
        "type": "file",
        "name": "month_04_vlsi_design.md",
        "path": "Volume_12_365_Day_Roadmap/month_04_vlsi_design.md",
        "title": "month 04 vlsi design"
      },
      {
        "type": "file",
        "name": "month_05_verification.md",
        "path": "Volume_12_365_Day_Roadmap/month_05_verification.md",
        "title": "month 05 verification"
      },
      {
        "type": "file",
        "name": "month_06_fpga.md",
        "path": "Volume_12_365_Day_Roadmap/month_06_fpga.md",
        "title": "month 06 fpga"
      },
      {
        "type": "file",
        "name": "month_07_asic_flow.md",
        "path": "Volume_12_365_Day_Roadmap/month_07_asic_flow.md",
        "title": "month 07 asic flow"
      },
      {
        "type": "file",
        "name": "month_08_fabrication.md",
        "path": "Volume_12_365_Day_Roadmap/month_08_fabrication.md",
        "title": "month 08 fabrication"
      },
      {
        "type": "file",
        "name": "month_09_advanced_semiconductor.md",
        "path": "Volume_12_365_Day_Roadmap/month_09_advanced_semiconductor.md",
        "title": "month 09 advanced semiconductor"
      },
      {
        "type": "file",
        "name": "month_10_industry_projects.md",
        "path": "Volume_12_365_Day_Roadmap/month_10_industry_projects.md",
        "title": "month 10 industry projects"
      },
      {
        "type": "file",
        "name": "month_11_interview_preparation.md",
        "path": "Volume_12_365_Day_Roadmap/month_11_interview_preparation.md",
        "title": "month 11 interview preparation"
      },
      {
        "type": "file",
        "name": "month_12_research_path.md",
        "path": "Volume_12_365_Day_Roadmap/month_12_research_path.md",
        "title": "month 12 research path"
      }
    ]
  },
  {
    "id": "Volume_12_Advanced_Semiconductor_Technologies",
    "name": "Volume 12 Advanced Semiconductor Technologies",
    "folder": "Volume_12_Advanced_Semiconductor_Technologies",
    "items": [
      {
        "type": "file",
        "name": "memory_architecture_case_studies.md",
        "path": "Volume_12_Advanced_Semiconductor_Technologies/memory_architecture_case_studies.md",
        "title": "memory architecture case studies"
      },
      {
        "type": "file",
        "name": "nvidia_gpu_architecture_case_study.md",
        "path": "Volume_12_Advanced_Semiconductor_Technologies/nvidia_gpu_architecture_case_study.md",
        "title": "nvidia gpu architecture case study"
      },
      {
        "type": "file",
        "name": "samsung_semiconductor_ecosystem_case_study.md",
        "path": "Volume_12_Advanced_Semiconductor_Technologies/samsung_semiconductor_ecosystem_case_study.md",
        "title": "samsung semiconductor ecosystem case study"
      },
      {
        "type": "file",
        "name": "tsmc_process_technology_case_study.md",
        "path": "Volume_12_Advanced_Semiconductor_Technologies/tsmc_process_technology_case_study.md",
        "title": "tsmc process technology case study"
      }
    ]
  },
  {
    "id": "Volume_13_Interview_Master",
    "name": "Volume 13 Interview Master",
    "folder": "Volume_13_Interview_Master",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_13_Interview_Master/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "analog_ic_questions.md",
        "path": "Volume_13_Interview_Master/analog_ic_questions.md",
        "title": "analog ic questions"
      },
      {
        "type": "file",
        "name": "asic_flow_questions.md",
        "path": "Volume_13_Interview_Master/asic_flow_questions.md",
        "title": "asic flow questions"
      },
      {
        "type": "file",
        "name": "coding_problems.md",
        "path": "Volume_13_Interview_Master/coding_problems.md",
        "title": "coding problems"
      },
      {
        "type": "file",
        "name": "company_specific_questions.md",
        "path": "Volume_13_Interview_Master/company_specific_questions.md",
        "title": "company specific questions"
      },
      {
        "type": "file",
        "name": "device_engineering_questions.md",
        "path": "Volume_13_Interview_Master/device_engineering_questions.md",
        "title": "device engineering questions"
      },
      {
        "type": "file",
        "name": "digital_design_questions.md",
        "path": "Volume_13_Interview_Master/digital_design_questions.md",
        "title": "digital design questions"
      },
      {
        "type": "file",
        "name": "electronics_questions.md",
        "path": "Volume_13_Interview_Master/electronics_questions.md",
        "title": "electronics questions"
      },
      {
        "type": "file",
        "name": "interview_roadmap.md",
        "path": "Volume_13_Interview_Master/interview_roadmap.md",
        "title": "interview roadmap"
      },
      {
        "type": "file",
        "name": "physical_design_questions.md",
        "path": "Volume_13_Interview_Master/physical_design_questions.md",
        "title": "physical design questions"
      },
      {
        "type": "file",
        "name": "semiconductor_physics_questions.md",
        "path": "Volume_13_Interview_Master/semiconductor_physics_questions.md",
        "title": "semiconductor physics questions"
      },
      {
        "type": "file",
        "name": "systemverilog_questions.md",
        "path": "Volume_13_Interview_Master/systemverilog_questions.md",
        "title": "systemverilog questions"
      },
      {
        "type": "file",
        "name": "uvm_questions.md",
        "path": "Volume_13_Interview_Master/uvm_questions.md",
        "title": "uvm questions"
      },
      {
        "type": "file",
        "name": "verilog_questions.md",
        "path": "Volume_13_Interview_Master/verilog_questions.md",
        "title": "verilog questions"
      }
    ]
  },
  {
    "id": "Volume_14_Project_Portfolio",
    "name": "Volume 14 Project Portfolio",
    "folder": "Volume_14_Project_Portfolio",
    "items": [
      {
        "type": "file",
        "name": "AI_hardware_projects.md",
        "path": "Volume_14_Project_Portfolio/AI_hardware_projects.md",
        "title": "AI hardware projects"
      },
      {
        "type": "file",
        "name": "ASIC_tapeout_projects.md",
        "path": "Volume_14_Project_Portfolio/ASIC_tapeout_projects.md",
        "title": "ASIC tapeout projects"
      },
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_14_Project_Portfolio/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "RTL_projects.md",
        "path": "Volume_14_Project_Portfolio/RTL_projects.md",
        "title": "RTL projects"
      },
      {
        "type": "file",
        "name": "advanced_projects.md",
        "path": "Volume_14_Project_Portfolio/advanced_projects.md",
        "title": "advanced projects"
      },
      {
        "type": "file",
        "name": "analog_IC_projects.md",
        "path": "Volume_14_Project_Portfolio/analog_IC_projects.md",
        "title": "analog IC projects"
      },
      {
        "type": "file",
        "name": "beginner_projects.md",
        "path": "Volume_14_Project_Portfolio/beginner_projects.md",
        "title": "beginner projects"
      },
      {
        "type": "file",
        "name": "complete_industry_project_checklist.md",
        "path": "Volume_14_Project_Portfolio/complete_industry_project_checklist.md",
        "title": "complete industry project checklist"
      },
      {
        "type": "file",
        "name": "industry_capstone_projects.md",
        "path": "Volume_14_Project_Portfolio/industry_capstone_projects.md",
        "title": "industry capstone projects"
      },
      {
        "type": "file",
        "name": "industry_project_examples.md",
        "path": "Volume_14_Project_Portfolio/industry_project_examples.md",
        "title": "industry project examples"
      },
      {
        "type": "file",
        "name": "intermediate_projects.md",
        "path": "Volume_14_Project_Portfolio/intermediate_projects.md",
        "title": "intermediate projects"
      },
      {
        "type": "file",
        "name": "portfolio_building_guide.md",
        "path": "Volume_14_Project_Portfolio/portfolio_building_guide.md",
        "title": "portfolio building guide"
      },
      {
        "type": "file",
        "name": "project_documentation_templates.md",
        "path": "Volume_14_Project_Portfolio/project_documentation_templates.md",
        "title": "project documentation templates"
      },
      {
        "type": "file",
        "name": "project_roadmap.md",
        "path": "Volume_14_Project_Portfolio/project_roadmap.md",
        "title": "project roadmap"
      },
      {
        "type": "file",
        "name": "semiconductor_engineering_capstone_projects.md",
        "path": "Volume_14_Project_Portfolio/semiconductor_engineering_capstone_projects.md",
        "title": "semiconductor engineering capstone projects"
      },
      {
        "type": "file",
        "name": "verification_projects.md",
        "path": "Volume_14_Project_Portfolio/verification_projects.md",
        "title": "verification projects"
      }
    ]
  },
  {
    "id": "Volume_15_Lab_Manual",
    "name": "Volume 15 Lab Manual",
    "folder": "Volume_15_Lab_Manual",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_15_Lab_Manual/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "cadence_synopsys_flow.md",
        "path": "Volume_15_Lab_Manual/cadence_synopsys_flow.md",
        "title": "cadence synopsys flow"
      },
      {
        "type": "file",
        "name": "eda_installation.md",
        "path": "Volume_15_Lab_Manual/eda_installation.md",
        "title": "eda installation"
      },
      {
        "type": "file",
        "name": "fpga_lab.md",
        "path": "Volume_15_Lab_Manual/fpga_lab.md",
        "title": "fpga lab"
      },
      {
        "type": "file",
        "name": "linux_environment.md",
        "path": "Volume_15_Lab_Manual/linux_environment.md",
        "title": "linux environment"
      },
      {
        "type": "file",
        "name": "openlane_asic_lab.md",
        "path": "Volume_15_Lab_Manual/openlane_asic_lab.md",
        "title": "openlane asic lab"
      },
      {
        "type": "file",
        "name": "spice_lab.md",
        "path": "Volume_15_Lab_Manual/spice_lab.md",
        "title": "spice lab"
      },
      {
        "type": "file",
        "name": "systemverilog_uvm_lab.md",
        "path": "Volume_15_Lab_Manual/systemverilog_uvm_lab.md",
        "title": "systemverilog uvm lab"
      },
      {
        "type": "file",
        "name": "troubleshooting_guide.md",
        "path": "Volume_15_Lab_Manual/troubleshooting_guide.md",
        "title": "troubleshooting guide"
      },
      {
        "type": "file",
        "name": "verilog_lab.md",
        "path": "Volume_15_Lab_Manual/verilog_lab.md",
        "title": "verilog lab"
      }
    ]
  },
  {
    "id": "Volume_16_Reference_Handbook",
    "name": "Volume 16 Reference Handbook",
    "folder": "Volume_16_Reference_Handbook",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_16_Reference_Handbook/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "analog_rf_memory_formula_sheet.md",
        "path": "Volume_16_Reference_Handbook/analog_rf_memory_formula_sheet.md",
        "title": "analog rf memory formula sheet"
      },
      {
        "type": "file",
        "name": "communication_protocols.md",
        "path": "Volume_16_Reference_Handbook/communication_protocols.md",
        "title": "communication protocols"
      },
      {
        "type": "file",
        "name": "digital_design_reference.md",
        "path": "Volume_16_Reference_Handbook/digital_design_reference.md",
        "title": "digital design reference"
      },
      {
        "type": "file",
        "name": "fabrication_reference.md",
        "path": "Volume_16_Reference_Handbook/fabrication_reference.md",
        "title": "fabrication reference"
      },
      {
        "type": "file",
        "name": "packaging_reference.md",
        "path": "Volume_16_Reference_Handbook/packaging_reference.md",
        "title": "packaging reference"
      },
      {
        "type": "file",
        "name": "quick_revision_notes.md",
        "path": "Volume_16_Reference_Handbook/quick_revision_notes.md",
        "title": "quick revision notes"
      },
      {
        "type": "file",
        "name": "semiconductor_formulas.md",
        "path": "Volume_16_Reference_Handbook/semiconductor_formulas.md",
        "title": "semiconductor formulas"
      },
      {
        "type": "file",
        "name": "timing_reference.md",
        "path": "Volume_16_Reference_Handbook/timing_reference.md",
        "title": "timing reference"
      },
      {
        "type": "file",
        "name": "transistor_reference.md",
        "path": "Volume_16_Reference_Handbook/transistor_reference.md",
        "title": "transistor reference"
      },
      {
        "type": "file",
        "name": "vlsi_formula_sheet.md",
        "path": "Volume_16_Reference_Handbook/vlsi_formula_sheet.md",
        "title": "vlsi formula sheet"
      }
    ]
  },
  {
    "id": "Volume_17_Research_Database",
    "name": "Volume 17 Research Database",
    "folder": "Volume_17_Research_Database",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_17_Research_Database/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "ai_chip_research.md",
        "path": "Volume_17_Research_Database/ai_chip_research.md",
        "title": "ai chip research"
      },
      {
        "type": "file",
        "name": "chiplet_research.md",
        "path": "Volume_17_Research_Database/chiplet_research.md",
        "title": "chiplet research"
      },
      {
        "type": "file",
        "name": "emerging_devices.md",
        "path": "Volume_17_Research_Database/emerging_devices.md",
        "title": "emerging devices"
      },
      {
        "type": "file",
        "name": "future_technology_trends.md",
        "path": "Volume_17_Research_Database/future_technology_trends.md",
        "title": "future technology trends"
      },
      {
        "type": "file",
        "name": "ieee_paper_guide.md",
        "path": "Volume_17_Research_Database/ieee_paper_guide.md",
        "title": "ieee paper guide"
      },
      {
        "type": "file",
        "name": "phd_research_paths.md",
        "path": "Volume_17_Research_Database/phd_research_paths.md",
        "title": "phd research paths"
      },
      {
        "type": "file",
        "name": "quantum_semiconductor.md",
        "path": "Volume_17_Research_Database/quantum_semiconductor.md",
        "title": "quantum semiconductor"
      },
      {
        "type": "file",
        "name": "research_topics.md",
        "path": "Volume_17_Research_Database/research_topics.md",
        "title": "research topics"
      },
      {
        "type": "file",
        "name": "semiconductor_startups.md",
        "path": "Volume_17_Research_Database/semiconductor_startups.md",
        "title": "semiconductor startups"
      }
    ]
  },
  {
    "id": "Volume_18_Career_Roadmap",
    "name": "Volume 18 Career Roadmap",
    "folder": "Volume_18_Career_Roadmap",
    "items": [
      {
        "type": "file",
        "name": "README.md",
        "path": "Volume_18_Career_Roadmap/README.md",
        "title": "README"
      },
      {
        "type": "file",
        "name": "analog_engineer_path.md",
        "path": "Volume_18_Career_Roadmap/analog_engineer_path.md",
        "title": "analog engineer path"
      },
      {
        "type": "file",
        "name": "device_engineer_path.md",
        "path": "Volume_18_Career_Roadmap/device_engineer_path.md",
        "title": "device engineer path"
      },
      {
        "type": "file",
        "name": "experienced_engineer_growth.md",
        "path": "Volume_18_Career_Roadmap/experienced_engineer_growth.md",
        "title": "experienced engineer growth"
      },
      {
        "type": "file",
        "name": "fresher_roadmap.md",
        "path": "Volume_18_Career_Roadmap/fresher_roadmap.md",
        "title": "fresher roadmap"
      },
      {
        "type": "file",
        "name": "global_company_guide.md",
        "path": "Volume_18_Career_Roadmap/global_company_guide.md",
        "title": "global company guide"
      },
      {
        "type": "file",
        "name": "physical_design_path.md",
        "path": "Volume_18_Career_Roadmap/physical_design_path.md",
        "title": "physical design path"
      },
      {
        "type": "file",
        "name": "rtl_engineer_path.md",
        "path": "Volume_18_Career_Roadmap/rtl_engineer_path.md",
        "title": "rtl engineer path"
      },
      {
        "type": "file",
        "name": "salary_and_career_progression.md",
        "path": "Volume_18_Career_Roadmap/salary_and_career_progression.md",
        "title": "salary and career progression"
      },
      {
        "type": "file",
        "name": "semiconductor_roles.md",
        "path": "Volume_18_Career_Roadmap/semiconductor_roles.md",
        "title": "semiconductor roles"
      },
      {
        "type": "file",
        "name": "verification_engineer_path.md",
        "path": "Volume_18_Career_Roadmap/verification_engineer_path.md",
        "title": "verification engineer path"
      }
    ]
  }
];

export const flatEncyclopediaDocs: EncyclopediaFlatDoc[] = [
  {
    "title": "README",
    "fileName": "README.md",
    "path": "README.md",
    "volumeId": "root",
    "volumeName": "Repository Root"
  },
  {
    "title": "ROADMAP",
    "fileName": "ROADMAP.md",
    "path": "ROADMAP.md",
    "volumeId": "root",
    "volumeName": "Repository Root"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_01_Fundamentals/01_Mathematics/README.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_01_Fundamentals/02_Physics/README.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_01_Fundamentals/03_Semiconductor_Materials/README.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "carrier concentration",
    "fileName": "carrier_concentration.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/carrier_concentration.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "carrier transport",
    "fileName": "carrier_transport.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/carrier_transport.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "crystal structure",
    "fileName": "crystal_structure.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/crystal_structure.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "doping",
    "fileName": "doping.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/doping.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "electrons and holes",
    "fileName": "electrons_and_holes.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/electrons_and_holes.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "energy bands",
    "fileName": "energy_bands.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/energy_bands.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "fermi level",
    "fileName": "fermi_level.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/fermi_level.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "mobility",
    "fileName": "mobility.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/mobility.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "pn junction",
    "fileName": "pn_junction.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/pn_junction.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "recombination generation",
    "fileName": "recombination_generation.md",
    "path": "Volume_01_Fundamentals/04_Semiconductor_Physics/recombination_generation.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "diode equations",
    "fileName": "diode_equations.md",
    "path": "Volume_01_Fundamentals/05_Equations/diode_equations.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "mosfet equations",
    "fileName": "mosfet_equations.md",
    "path": "Volume_01_Fundamentals/05_Equations/mosfet_equations.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "semiconductor equations",
    "fileName": "semiconductor_equations.md",
    "path": "Volume_01_Fundamentals/05_Equations/semiconductor_equations.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_01_Fundamentals/README.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "engineering mathematics for semiconductors",
    "fileName": "engineering_mathematics_for_semiconductors.md",
    "path": "Volume_01_Fundamentals/engineering_mathematics_for_semiconductors.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "interview questions",
    "fileName": "interview_questions.md",
    "path": "Volume_01_Fundamentals/interview_questions.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "projects",
    "fileName": "projects.md",
    "path": "Volume_01_Fundamentals/projects.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "resources",
    "fileName": "resources.md",
    "path": "Volume_01_Fundamentals/resources.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "semiconductor engineering problem solving framework",
    "fileName": "semiconductor_engineering_problem_solving_framework.md",
    "path": "Volume_01_Fundamentals/semiconductor_engineering_problem_solving_framework.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "signals and systems for semiconductors",
    "fileName": "signals_and_systems_for_semiconductors.md",
    "path": "Volume_01_Fundamentals/signals_and_systems_for_semiconductors.md",
    "volumeId": "Volume_01_Fundamentals",
    "volumeName": "Volume 01 Fundamentals"
  },
  {
    "title": "led",
    "fileName": "led.md",
    "path": "Volume_02_Semiconductor_Devices/01_Diodes/led.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "photodiode",
    "fileName": "photodiode.md",
    "path": "Volume_02_Semiconductor_Devices/01_Diodes/photodiode.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "pn diode",
    "fileName": "pn_diode.md",
    "path": "Volume_02_Semiconductor_Devices/01_Diodes/pn_diode.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "schottky diode",
    "fileName": "schottky_diode.md",
    "path": "Volume_02_Semiconductor_Devices/01_Diodes/schottky_diode.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "zener diode",
    "fileName": "zener_diode.md",
    "path": "Volume_02_Semiconductor_Devices/01_Diodes/zener_diode.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "bjt applications",
    "fileName": "bjt_applications.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_applications.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "bjt biasing",
    "fileName": "bjt_biasing.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_biasing.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "bjt characteristics",
    "fileName": "bjt_characteristics.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_characteristics.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "bjt equations",
    "fileName": "bjt_equations.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_equations.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "bjt fundamentals",
    "fileName": "bjt_fundamentals.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/bjt_fundamentals.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "common emitter amplifier",
    "fileName": "common_emitter_amplifier.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/common_emitter_amplifier.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "comparison",
    "fileName": "comparison.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/comparison.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "current mirror",
    "fileName": "current_mirror.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/current_mirror.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "interview questions",
    "fileName": "interview_questions.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/interview_questions.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "npn transistor",
    "fileName": "npn_transistor.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/npn_transistor.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "pnp transistor",
    "fileName": "pnp_transistor.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/pnp_transistor.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "projects",
    "fileName": "projects.md",
    "path": "Volume_02_Semiconductor_Devices/02_BJT/projects.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "advanced cmos",
    "fileName": "advanced_cmos.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/advanced_cmos.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "body effect",
    "fileName": "body_effect.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/body_effect.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "cmos inverter",
    "fileName": "cmos_inverter.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/cmos_inverter.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "device comparison",
    "fileName": "device_comparison.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/device_comparison.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "finfet",
    "fileName": "finfet.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/finfet.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "gaafet",
    "fileName": "gaafet.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/gaafet.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "interview questions",
    "fileName": "interview_questions.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/interview_questions.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "leakage mechanisms",
    "fileName": "leakage_mechanisms.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/leakage_mechanisms.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "mos capacitor",
    "fileName": "mos_capacitor.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mos_capacitor.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "mosfet equations",
    "fileName": "mosfet_equations.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mosfet_equations.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "mosfet fundamentals",
    "fileName": "mosfet_fundamentals.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mosfet_fundamentals.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "mosfet projects",
    "fileName": "mosfet_projects.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/mosfet_projects.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "nanosheet transistor",
    "fileName": "nanosheet_transistor.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/nanosheet_transistor.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "nmos",
    "fileName": "nmos.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/nmos.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "operating regions",
    "fileName": "operating_regions.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/operating_regions.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "pmos",
    "fileName": "pmos.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/pmos.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "scaling",
    "fileName": "scaling.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/scaling.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "short channel effects",
    "fileName": "short_channel_effects.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/short_channel_effects.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "simulation tools",
    "fileName": "simulation_tools.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/simulation_tools.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "sram cell",
    "fileName": "sram_cell.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/sram_cell.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "threshold voltage",
    "fileName": "threshold_voltage.md",
    "path": "Volume_02_Semiconductor_Devices/03_MOSFET/threshold_voltage.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/README.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "clock tree",
    "fileName": "clock_tree.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/clock_tree.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "cmos fundamentals",
    "fileName": "cmos_fundamentals.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/cmos_fundamentals.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "comparison tables",
    "fileName": "comparison_tables.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/comparison_tables.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "flip flop",
    "fileName": "flip_flop.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/flip_flop.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "interview questions",
    "fileName": "interview_questions.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/interview_questions.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "latch",
    "fileName": "latch.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/latch.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "logic gates",
    "fileName": "logic_gates.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/logic_gates.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "low power cmos",
    "fileName": "low_power_cmos.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/low_power_cmos.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "memory cells",
    "fileName": "memory_cells.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/memory_cells.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "nand nor design",
    "fileName": "nand_nor_design.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/nand_nor_design.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "projects",
    "fileName": "projects.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/projects.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "standard cells",
    "fileName": "standard_cells.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/standard_cells.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "transmission gate",
    "fileName": "transmission_gate.md",
    "path": "Volume_02_Semiconductor_Devices/04_CMOS/transmission_gate.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_02_Semiconductor_Devices/README.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "reliability and characterization",
    "fileName": "reliability_and_characterization.md",
    "path": "Volume_02_Semiconductor_Devices/reliability_and_characterization.md",
    "volumeId": "Volume_02_Semiconductor_Devices",
    "volumeName": "Volume 02 Semiconductor Devices"
  },
  {
    "title": "analog fundamentals",
    "fileName": "analog_fundamentals.md",
    "path": "Volume_03_IC_Design/01_Analog_IC_Design/analog_fundamentals.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "analog layout",
    "fileName": "analog_layout.md",
    "path": "Volume_03_IC_Design/01_Analog_IC_Design/analog_layout.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "current mirror",
    "fileName": "current_mirror.md",
    "path": "Volume_03_IC_Design/01_Analog_IC_Design/current_mirror.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "differential pair",
    "fileName": "differential_pair.md",
    "path": "Volume_03_IC_Design/01_Analog_IC_Design/differential_pair.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "opamp design",
    "fileName": "opamp_design.md",
    "path": "Volume_03_IC_Design/01_Analog_IC_Design/opamp_design.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "combinational logic",
    "fileName": "combinational_logic.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/combinational_logic.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "datapath design",
    "fileName": "datapath_design.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/datapath_design.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "digital design",
    "fileName": "digital_design.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/digital_design.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "hdl design flow",
    "fileName": "hdl_design_flow.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/hdl_design_flow.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "rtl design",
    "fileName": "rtl_design.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/rtl_design.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "sequential logic",
    "fileName": "sequential_logic.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/sequential_logic.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "systemverilog",
    "fileName": "systemverilog.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/systemverilog.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "verilog",
    "fileName": "verilog.md",
    "path": "Volume_03_IC_Design/02_Digital_IC_Design/verilog.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "clock tree synthesis",
    "fileName": "clock_tree_synthesis.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/clock_tree_synthesis.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "drc lvs",
    "fileName": "drc_lvs.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/drc_lvs.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "floorplanning",
    "fileName": "floorplanning.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/floorplanning.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "openlane flow",
    "fileName": "openlane_flow.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/openlane_flow.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "openroad flow",
    "fileName": "openroad_flow.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/openroad_flow.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "placement",
    "fileName": "placement.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/placement.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "routing",
    "fileName": "routing.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/routing.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "rtl to gdsii",
    "fileName": "rtl_to_gdsii.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/rtl_to_gdsii.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "signoff",
    "fileName": "signoff.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/signoff.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "static timing analysis",
    "fileName": "static_timing_analysis.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/static_timing_analysis.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "synthesis",
    "fileName": "synthesis.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/synthesis.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "tapeout",
    "fileName": "tapeout.md",
    "path": "Volume_03_IC_Design/03_VLSI_Flow/tapeout.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_03_IC_Design/README.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "mixed signal design",
    "fileName": "mixed_signal_design.md",
    "path": "Volume_03_IC_Design/mixed_signal_design.md",
    "volumeId": "Volume_03_IC_Design",
    "volumeName": "Volume 03 IC Design"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_04_Semiconductor_Fabrication/README.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "advanced packaging",
    "fileName": "advanced_packaging.md",
    "path": "Volume_04_Semiconductor_Fabrication/advanced_packaging.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "cleanroom",
    "fileName": "cleanroom.md",
    "path": "Volume_04_Semiconductor_Fabrication/cleanroom.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "cmp",
    "fileName": "cmp.md",
    "path": "Volume_04_Semiconductor_Fabrication/cmp.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "deposition",
    "fileName": "deposition.md",
    "path": "Volume_04_Semiconductor_Fabrication/deposition.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "diffusion",
    "fileName": "diffusion.md",
    "path": "Volume_04_Semiconductor_Fabrication/diffusion.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "etching",
    "fileName": "etching.md",
    "path": "Volume_04_Semiconductor_Fabrication/etching.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "euv lithography",
    "fileName": "euv_lithography.md",
    "path": "Volume_04_Semiconductor_Fabrication/euv_lithography.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "fab equipment",
    "fileName": "fab_equipment.md",
    "path": "Volume_04_Semiconductor_Fabrication/fab_equipment.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "ic packaging",
    "fileName": "ic_packaging.md",
    "path": "Volume_04_Semiconductor_Fabrication/ic_packaging.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "ion implantation",
    "fileName": "ion_implantation.md",
    "path": "Volume_04_Semiconductor_Fabrication/ion_implantation.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "lithography",
    "fileName": "lithography.md",
    "path": "Volume_04_Semiconductor_Fabrication/lithography.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "oxidation",
    "fileName": "oxidation.md",
    "path": "Volume_04_Semiconductor_Fabrication/oxidation.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "process nodes",
    "fileName": "process_nodes.md",
    "path": "Volume_04_Semiconductor_Fabrication/process_nodes.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "semiconductor process",
    "fileName": "semiconductor_process.md",
    "path": "Volume_04_Semiconductor_Fabrication/semiconductor_process.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "wafer manufacturing",
    "fileName": "wafer_manufacturing.md",
    "path": "Volume_04_Semiconductor_Fabrication/wafer_manufacturing.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "wafer testing",
    "fileName": "wafer_testing.md",
    "path": "Volume_04_Semiconductor_Fabrication/wafer_testing.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "yield and process control",
    "fileName": "yield_and_process_control.md",
    "path": "Volume_04_Semiconductor_Fabrication/yield_and_process_control.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "yield engineering",
    "fileName": "yield_engineering.md",
    "path": "Volume_04_Semiconductor_Fabrication/yield_engineering.md",
    "volumeId": "Volume_04_Semiconductor_Fabrication",
    "volumeName": "Volume 04 Semiconductor Fabrication"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_05_EDA_Tools/README.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "ansys tools",
    "fileName": "ansys_tools.md",
    "path": "Volume_05_EDA_Tools/ansys_tools.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "cadence tools",
    "fileName": "cadence_tools.md",
    "path": "Volume_05_EDA_Tools/cadence_tools.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "eda industry best practices",
    "fileName": "eda_industry_best_practices.md",
    "path": "Volume_05_EDA_Tools/eda_industry_best_practices.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "fpga tools",
    "fileName": "fpga_tools.md",
    "path": "Volume_05_EDA_Tools/fpga_tools.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "linux vlsi setup",
    "fileName": "linux_vlsi_setup.md",
    "path": "Volume_05_EDA_Tools/linux_vlsi_setup.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "open source eda",
    "fileName": "open_source_eda.md",
    "path": "Volume_05_EDA_Tools/open_source_eda.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "open source eda complete flow",
    "fileName": "open_source_eda_complete_flow.md",
    "path": "Volume_05_EDA_Tools/open_source_eda_complete_flow.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "pdk and design formats",
    "fileName": "pdk_and_design_formats.md",
    "path": "Volume_05_EDA_Tools/pdk_and_design_formats.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "siemens eda",
    "fileName": "siemens_eda.md",
    "path": "Volume_05_EDA_Tools/siemens_eda.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "spice simulators",
    "fileName": "spice_simulators.md",
    "path": "Volume_05_EDA_Tools/spice_simulators.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "synopsys tools",
    "fileName": "synopsys_tools.md",
    "path": "Volume_05_EDA_Tools/synopsys_tools.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "tcad tools",
    "fileName": "tcad_tools.md",
    "path": "Volume_05_EDA_Tools/tcad_tools.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "verification tools",
    "fileName": "verification_tools.md",
    "path": "Volume_05_EDA_Tools/verification_tools.md",
    "volumeId": "Volume_05_EDA_Tools",
    "volumeName": "Volume 05 EDA Tools"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_06_Design_Methodologies/README.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "advanced cdc rdc examples",
    "fileName": "advanced_cdc_rdc_examples.md",
    "path": "Volume_06_Design_Methodologies/advanced_cdc_rdc_examples.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "advanced verification methodology",
    "fileName": "advanced_verification_methodology.md",
    "path": "Volume_06_Design_Methodologies/advanced_verification_methodology.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "ai accelerator design",
    "fileName": "ai_accelerator_design.md",
    "path": "Volume_06_Design_Methodologies/ai_accelerator_design.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "analog design flow",
    "fileName": "analog_design_flow.md",
    "path": "Volume_06_Design_Methodologies/analog_design_flow.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "chiplet design",
    "fileName": "chiplet_design.md",
    "path": "Volume_06_Design_Methodologies/chiplet_design.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "dft and test",
    "fileName": "dft_and_test.md",
    "path": "Volume_06_Design_Methodologies/dft_and_test.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "digital design flow",
    "fileName": "digital_design_flow.md",
    "path": "Volume_06_Design_Methodologies/digital_design_flow.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "formal verification",
    "fileName": "formal_verification.md",
    "path": "Volume_06_Design_Methodologies/formal_verification.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "fpga design flow",
    "fileName": "fpga_design_flow.md",
    "path": "Volume_06_Design_Methodologies/fpga_design_flow.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "low power and cdc design",
    "fileName": "low_power_and_cdc_design.md",
    "path": "Volume_06_Design_Methodologies/low_power_and_cdc_design.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "low power design",
    "fileName": "low_power_design.md",
    "path": "Volume_06_Design_Methodologies/low_power_design.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "soc design flow",
    "fileName": "soc_design_flow.md",
    "path": "Volume_06_Design_Methodologies/soc_design_flow.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "systemverilog uvm industry verification examples",
    "fileName": "systemverilog_uvm_industry_verification_examples.md",
    "path": "Volume_06_Design_Methodologies/systemverilog_uvm_industry_verification_examples.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "uvm methodology",
    "fileName": "uvm_methodology.md",
    "path": "Volume_06_Design_Methodologies/uvm_methodology.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "verification methodology",
    "fileName": "verification_methodology.md",
    "path": "Volume_06_Design_Methodologies/verification_methodology.md",
    "volumeId": "Volume_06_Design_Methodologies",
    "volumeName": "Volume 06 Design Methodologies"
  },
  {
    "title": "365 day learning plan",
    "fileName": "365_day_learning_plan.md",
    "path": "Volume_07_Industry_Preparation/365_day_learning_plan.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_07_Industry_Preparation/README.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "company requirements",
    "fileName": "company_requirements.md",
    "path": "Volume_07_Industry_Preparation/company_requirements.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "internship roadmap",
    "fileName": "internship_roadmap.md",
    "path": "Volume_07_Industry_Preparation/internship_roadmap.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "interview questions",
    "fileName": "interview_questions.md",
    "path": "Volume_07_Industry_Preparation/interview_questions.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "research paper roadmap",
    "fileName": "research_paper_roadmap.md",
    "path": "Volume_07_Industry_Preparation/research_paper_roadmap.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "resume projects",
    "fileName": "resume_projects.md",
    "path": "Volume_07_Industry_Preparation/resume_projects.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "semiconductor job roles",
    "fileName": "semiconductor_job_roles.md",
    "path": "Volume_07_Industry_Preparation/semiconductor_job_roles.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "semiconductor resume and portfolio",
    "fileName": "semiconductor_resume_and_portfolio.md",
    "path": "Volume_07_Industry_Preparation/semiconductor_resume_and_portfolio.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "skill matrix",
    "fileName": "skill_matrix.md",
    "path": "Volume_07_Industry_Preparation/skill_matrix.md",
    "volumeId": "Volume_07_Industry_Preparation",
    "volumeName": "Volume 07 Industry Preparation"
  },
  {
    "title": "A terms",
    "fileName": "A_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/A_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "B terms",
    "fileName": "B_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/B_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "C terms",
    "fileName": "C_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/C_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "D terms",
    "fileName": "D_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/D_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "E terms",
    "fileName": "E_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/E_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "F terms",
    "fileName": "F_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/F_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "G terms",
    "fileName": "G_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/G_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "H terms",
    "fileName": "H_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/H_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "I terms",
    "fileName": "I_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/I_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "J terms",
    "fileName": "J_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/J_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "K terms",
    "fileName": "K_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/K_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "L terms",
    "fileName": "L_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/L_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "M terms",
    "fileName": "M_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/M_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "N terms",
    "fileName": "N_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/N_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "O terms",
    "fileName": "O_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/O_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "P terms",
    "fileName": "P_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/P_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "Q terms",
    "fileName": "Q_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/Q_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_08_Semiconductor_Glossary/README.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "R terms",
    "fileName": "R_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/R_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "S terms",
    "fileName": "S_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/S_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "T terms",
    "fileName": "T_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/T_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "U terms",
    "fileName": "U_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/U_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "V terms",
    "fileName": "V_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/V_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "W terms",
    "fileName": "W_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/W_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "X terms",
    "fileName": "X_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/X_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "Y terms",
    "fileName": "Y_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/Y_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "Z terms",
    "fileName": "Z_terms.md",
    "path": "Volume_08_Semiconductor_Glossary/Z_terms.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "ai accelerator dictionary",
    "fileName": "ai_accelerator_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/ai_accelerator_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "eda dictionary",
    "fileName": "eda_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/eda_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "materials dictionary",
    "fileName": "materials_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/materials_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "memory dictionary",
    "fileName": "memory_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/memory_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "packaging dictionary",
    "fileName": "packaging_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/packaging_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "power semiconductor dictionary",
    "fileName": "power_semiconductor_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/power_semiconductor_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "reliability dictionary",
    "fileName": "reliability_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/reliability_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "semiconductor abbreviations",
    "fileName": "semiconductor_abbreviations.md",
    "path": "Volume_08_Semiconductor_Glossary/semiconductor_abbreviations.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "semiconductor equations",
    "fileName": "semiconductor_equations.md",
    "path": "Volume_08_Semiconductor_Glossary/semiconductor_equations.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "soc dictionary",
    "fileName": "soc_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/soc_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "verification dictionary",
    "fileName": "verification_dictionary.md",
    "path": "Volume_08_Semiconductor_Glossary/verification_dictionary.md",
    "volumeId": "Volume_08_Semiconductor_Glossary",
    "volumeName": "Volume 08 Semiconductor Glossary"
  },
  {
    "title": "ASIC projects",
    "fileName": "ASIC_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/ASIC_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "FPGA projects",
    "fileName": "FPGA_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/FPGA_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_09_Practical_Engineering_Labs/README.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "RTL projects",
    "fileName": "RTL_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/RTL_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "electronics foundation projects",
    "fileName": "electronics_foundation_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/electronics_foundation_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "hardware debugging lab",
    "fileName": "hardware_debugging_lab.md",
    "path": "Volume_09_Practical_Engineering_Labs/hardware_debugging_lab.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "hardware lab setup",
    "fileName": "hardware_lab_setup.md",
    "path": "Volume_09_Practical_Engineering_Labs/hardware_lab_setup.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "industry capstone projects",
    "fileName": "industry_capstone_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/industry_capstone_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "open source tapeout flow",
    "fileName": "open_source_tapeout_flow.md",
    "path": "Volume_09_Practical_Engineering_Labs/open_source_tapeout_flow.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "project database 100 plus",
    "fileName": "project_database_100_plus.md",
    "path": "Volume_09_Practical_Engineering_Labs/project_database_100_plus.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "project schematics",
    "fileName": "project_schematics.md",
    "path": "Volume_09_Practical_Engineering_Labs/project_schematics.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "semiconductor simulation projects",
    "fileName": "semiconductor_simulation_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/semiconductor_simulation_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "verification projects",
    "fileName": "verification_projects.md",
    "path": "Volume_09_Practical_Engineering_Labs/verification_projects.md",
    "volumeId": "Volume_09_Practical_Engineering_Labs",
    "volumeName": "Volume 09 Practical Engineering Labs"
  },
  {
    "title": "EDA tools database",
    "fileName": "EDA_tools_database.md",
    "path": "Volume_10_Semiconductor_Resources/EDA_tools_database.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_10_Semiconductor_Resources/README.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "books database",
    "fileName": "books_database.md",
    "path": "Volume_10_Semiconductor_Resources/books_database.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "documentation links",
    "fileName": "documentation_links.md",
    "path": "Volume_10_Semiconductor_Resources/documentation_links.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "free courses",
    "fileName": "free_courses.md",
    "path": "Volume_10_Semiconductor_Resources/free_courses.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "free pdk database",
    "fileName": "free_pdk_database.md",
    "path": "Volume_10_Semiconductor_Resources/free_pdk_database.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "installation guides",
    "fileName": "installation_guides.md",
    "path": "Volume_10_Semiconductor_Resources/installation_guides.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "internship job resources",
    "fileName": "internship_job_resources.md",
    "path": "Volume_10_Semiconductor_Resources/internship_job_resources.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "linux vlsi setup",
    "fileName": "linux_vlsi_setup.md",
    "path": "Volume_10_Semiconductor_Resources/linux_vlsi_setup.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "master index",
    "fileName": "master_index.md",
    "path": "Volume_10_Semiconductor_Resources/master_index.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "open source asic tutorial",
    "fileName": "open_source_asic_tutorial.md",
    "path": "Volume_10_Semiconductor_Resources/open_source_asic_tutorial.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "qualcomm soc case study",
    "fileName": "qualcomm_soc_case_study.md",
    "path": "Volume_10_Semiconductor_Resources/qualcomm_soc_case_study.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "research papers",
    "fileName": "research_papers.md",
    "path": "Volume_10_Semiconductor_Resources/research_papers.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "semiconductor communities",
    "fileName": "semiconductor_communities.md",
    "path": "Volume_10_Semiconductor_Resources/semiconductor_communities.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "simulation tools",
    "fileName": "simulation_tools.md",
    "path": "Volume_10_Semiconductor_Resources/simulation_tools.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "youtube channels",
    "fileName": "youtube_channels.md",
    "path": "Volume_10_Semiconductor_Resources/youtube_channels.md",
    "volumeId": "Volume_10_Semiconductor_Resources",
    "volumeName": "Volume 10 Semiconductor Resources"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_11_Industry_Deep_Dive/README.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "advanced packaging industry",
    "fileName": "advanced_packaging_industry.md",
    "path": "Volume_11_Industry_Deep_Dive/advanced_packaging_industry.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "apple silicon architecture case study",
    "fileName": "apple_silicon_architecture_case_study.md",
    "path": "Volume_11_Industry_Deep_Dive/apple_silicon_architecture_case_study.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "company interview preparation",
    "fileName": "company_interview_preparation.md",
    "path": "Volume_11_Industry_Deep_Dive/company_interview_preparation.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "company skill matrix",
    "fileName": "company_skill_matrix.md",
    "path": "Volume_11_Industry_Deep_Dive/company_skill_matrix.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "eda companies",
    "fileName": "eda_companies.md",
    "path": "Volume_11_Industry_Deep_Dive/eda_companies.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "equipment companies",
    "fileName": "equipment_companies.md",
    "path": "Volume_11_Industry_Deep_Dive/equipment_companies.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "fabless companies",
    "fileName": "fabless_companies.md",
    "path": "Volume_11_Industry_Deep_Dive/fabless_companies.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "foundries",
    "fileName": "foundries.md",
    "path": "Volume_11_Industry_Deep_Dive/foundries.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "india semiconductor ecosystem",
    "fileName": "india_semiconductor_ecosystem.md",
    "path": "Volume_11_Industry_Deep_Dive/india_semiconductor_ecosystem.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "intel amd arm architecture case study",
    "fileName": "intel_amd_arm_architecture_case_study.md",
    "path": "Volume_11_Industry_Deep_Dive/intel_amd_arm_architecture_case_study.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "salary and career path",
    "fileName": "salary_and_career_path.md",
    "path": "Volume_11_Industry_Deep_Dive/salary_and_career_path.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "semiconductor future trends",
    "fileName": "semiconductor_future_trends.md",
    "path": "Volume_11_Industry_Deep_Dive/semiconductor_future_trends.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "semiconductor job roles",
    "fileName": "semiconductor_job_roles.md",
    "path": "Volume_11_Industry_Deep_Dive/semiconductor_job_roles.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "semiconductor supply chain",
    "fileName": "semiconductor_supply_chain.md",
    "path": "Volume_11_Industry_Deep_Dive/semiconductor_supply_chain.md",
    "volumeId": "Volume_11_Industry_Deep_Dive",
    "volumeName": "Volume 11 Industry Deep Dive"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_12_365_Day_Roadmap/README.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 01 foundations",
    "fileName": "month_01_foundations.md",
    "path": "Volume_12_365_Day_Roadmap/month_01_foundations.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 02 electronics",
    "fileName": "month_02_electronics.md",
    "path": "Volume_12_365_Day_Roadmap/month_02_electronics.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 03 semiconductor physics",
    "fileName": "month_03_semiconductor_physics.md",
    "path": "Volume_12_365_Day_Roadmap/month_03_semiconductor_physics.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 04 vlsi design",
    "fileName": "month_04_vlsi_design.md",
    "path": "Volume_12_365_Day_Roadmap/month_04_vlsi_design.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 05 verification",
    "fileName": "month_05_verification.md",
    "path": "Volume_12_365_Day_Roadmap/month_05_verification.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 06 fpga",
    "fileName": "month_06_fpga.md",
    "path": "Volume_12_365_Day_Roadmap/month_06_fpga.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 07 asic flow",
    "fileName": "month_07_asic_flow.md",
    "path": "Volume_12_365_Day_Roadmap/month_07_asic_flow.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 08 fabrication",
    "fileName": "month_08_fabrication.md",
    "path": "Volume_12_365_Day_Roadmap/month_08_fabrication.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 09 advanced semiconductor",
    "fileName": "month_09_advanced_semiconductor.md",
    "path": "Volume_12_365_Day_Roadmap/month_09_advanced_semiconductor.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 10 industry projects",
    "fileName": "month_10_industry_projects.md",
    "path": "Volume_12_365_Day_Roadmap/month_10_industry_projects.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 11 interview preparation",
    "fileName": "month_11_interview_preparation.md",
    "path": "Volume_12_365_Day_Roadmap/month_11_interview_preparation.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "month 12 research path",
    "fileName": "month_12_research_path.md",
    "path": "Volume_12_365_Day_Roadmap/month_12_research_path.md",
    "volumeId": "Volume_12_365_Day_Roadmap",
    "volumeName": "Volume 12 365 Day Roadmap"
  },
  {
    "title": "memory architecture case studies",
    "fileName": "memory_architecture_case_studies.md",
    "path": "Volume_12_Advanced_Semiconductor_Technologies/memory_architecture_case_studies.md",
    "volumeId": "Volume_12_Advanced_Semiconductor_Technologies",
    "volumeName": "Volume 12 Advanced Semiconductor Technologies"
  },
  {
    "title": "nvidia gpu architecture case study",
    "fileName": "nvidia_gpu_architecture_case_study.md",
    "path": "Volume_12_Advanced_Semiconductor_Technologies/nvidia_gpu_architecture_case_study.md",
    "volumeId": "Volume_12_Advanced_Semiconductor_Technologies",
    "volumeName": "Volume 12 Advanced Semiconductor Technologies"
  },
  {
    "title": "samsung semiconductor ecosystem case study",
    "fileName": "samsung_semiconductor_ecosystem_case_study.md",
    "path": "Volume_12_Advanced_Semiconductor_Technologies/samsung_semiconductor_ecosystem_case_study.md",
    "volumeId": "Volume_12_Advanced_Semiconductor_Technologies",
    "volumeName": "Volume 12 Advanced Semiconductor Technologies"
  },
  {
    "title": "tsmc process technology case study",
    "fileName": "tsmc_process_technology_case_study.md",
    "path": "Volume_12_Advanced_Semiconductor_Technologies/tsmc_process_technology_case_study.md",
    "volumeId": "Volume_12_Advanced_Semiconductor_Technologies",
    "volumeName": "Volume 12 Advanced Semiconductor Technologies"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_13_Interview_Master/README.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "analog ic questions",
    "fileName": "analog_ic_questions.md",
    "path": "Volume_13_Interview_Master/analog_ic_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "asic flow questions",
    "fileName": "asic_flow_questions.md",
    "path": "Volume_13_Interview_Master/asic_flow_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "coding problems",
    "fileName": "coding_problems.md",
    "path": "Volume_13_Interview_Master/coding_problems.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "company specific questions",
    "fileName": "company_specific_questions.md",
    "path": "Volume_13_Interview_Master/company_specific_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "device engineering questions",
    "fileName": "device_engineering_questions.md",
    "path": "Volume_13_Interview_Master/device_engineering_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "digital design questions",
    "fileName": "digital_design_questions.md",
    "path": "Volume_13_Interview_Master/digital_design_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "electronics questions",
    "fileName": "electronics_questions.md",
    "path": "Volume_13_Interview_Master/electronics_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "interview roadmap",
    "fileName": "interview_roadmap.md",
    "path": "Volume_13_Interview_Master/interview_roadmap.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "physical design questions",
    "fileName": "physical_design_questions.md",
    "path": "Volume_13_Interview_Master/physical_design_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "semiconductor physics questions",
    "fileName": "semiconductor_physics_questions.md",
    "path": "Volume_13_Interview_Master/semiconductor_physics_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "systemverilog questions",
    "fileName": "systemverilog_questions.md",
    "path": "Volume_13_Interview_Master/systemverilog_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "uvm questions",
    "fileName": "uvm_questions.md",
    "path": "Volume_13_Interview_Master/uvm_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "verilog questions",
    "fileName": "verilog_questions.md",
    "path": "Volume_13_Interview_Master/verilog_questions.md",
    "volumeId": "Volume_13_Interview_Master",
    "volumeName": "Volume 13 Interview Master"
  },
  {
    "title": "AI hardware projects",
    "fileName": "AI_hardware_projects.md",
    "path": "Volume_14_Project_Portfolio/AI_hardware_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "ASIC tapeout projects",
    "fileName": "ASIC_tapeout_projects.md",
    "path": "Volume_14_Project_Portfolio/ASIC_tapeout_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_14_Project_Portfolio/README.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "RTL projects",
    "fileName": "RTL_projects.md",
    "path": "Volume_14_Project_Portfolio/RTL_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "advanced projects",
    "fileName": "advanced_projects.md",
    "path": "Volume_14_Project_Portfolio/advanced_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "analog IC projects",
    "fileName": "analog_IC_projects.md",
    "path": "Volume_14_Project_Portfolio/analog_IC_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "beginner projects",
    "fileName": "beginner_projects.md",
    "path": "Volume_14_Project_Portfolio/beginner_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "complete industry project checklist",
    "fileName": "complete_industry_project_checklist.md",
    "path": "Volume_14_Project_Portfolio/complete_industry_project_checklist.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "industry capstone projects",
    "fileName": "industry_capstone_projects.md",
    "path": "Volume_14_Project_Portfolio/industry_capstone_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "industry project examples",
    "fileName": "industry_project_examples.md",
    "path": "Volume_14_Project_Portfolio/industry_project_examples.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "intermediate projects",
    "fileName": "intermediate_projects.md",
    "path": "Volume_14_Project_Portfolio/intermediate_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "portfolio building guide",
    "fileName": "portfolio_building_guide.md",
    "path": "Volume_14_Project_Portfolio/portfolio_building_guide.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "project documentation templates",
    "fileName": "project_documentation_templates.md",
    "path": "Volume_14_Project_Portfolio/project_documentation_templates.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "project roadmap",
    "fileName": "project_roadmap.md",
    "path": "Volume_14_Project_Portfolio/project_roadmap.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "semiconductor engineering capstone projects",
    "fileName": "semiconductor_engineering_capstone_projects.md",
    "path": "Volume_14_Project_Portfolio/semiconductor_engineering_capstone_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "verification projects",
    "fileName": "verification_projects.md",
    "path": "Volume_14_Project_Portfolio/verification_projects.md",
    "volumeId": "Volume_14_Project_Portfolio",
    "volumeName": "Volume 14 Project Portfolio"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_15_Lab_Manual/README.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "cadence synopsys flow",
    "fileName": "cadence_synopsys_flow.md",
    "path": "Volume_15_Lab_Manual/cadence_synopsys_flow.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "eda installation",
    "fileName": "eda_installation.md",
    "path": "Volume_15_Lab_Manual/eda_installation.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "fpga lab",
    "fileName": "fpga_lab.md",
    "path": "Volume_15_Lab_Manual/fpga_lab.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "linux environment",
    "fileName": "linux_environment.md",
    "path": "Volume_15_Lab_Manual/linux_environment.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "openlane asic lab",
    "fileName": "openlane_asic_lab.md",
    "path": "Volume_15_Lab_Manual/openlane_asic_lab.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "spice lab",
    "fileName": "spice_lab.md",
    "path": "Volume_15_Lab_Manual/spice_lab.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "systemverilog uvm lab",
    "fileName": "systemverilog_uvm_lab.md",
    "path": "Volume_15_Lab_Manual/systemverilog_uvm_lab.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "troubleshooting guide",
    "fileName": "troubleshooting_guide.md",
    "path": "Volume_15_Lab_Manual/troubleshooting_guide.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "verilog lab",
    "fileName": "verilog_lab.md",
    "path": "Volume_15_Lab_Manual/verilog_lab.md",
    "volumeId": "Volume_15_Lab_Manual",
    "volumeName": "Volume 15 Lab Manual"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_16_Reference_Handbook/README.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "analog rf memory formula sheet",
    "fileName": "analog_rf_memory_formula_sheet.md",
    "path": "Volume_16_Reference_Handbook/analog_rf_memory_formula_sheet.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "communication protocols",
    "fileName": "communication_protocols.md",
    "path": "Volume_16_Reference_Handbook/communication_protocols.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "digital design reference",
    "fileName": "digital_design_reference.md",
    "path": "Volume_16_Reference_Handbook/digital_design_reference.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "fabrication reference",
    "fileName": "fabrication_reference.md",
    "path": "Volume_16_Reference_Handbook/fabrication_reference.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "packaging reference",
    "fileName": "packaging_reference.md",
    "path": "Volume_16_Reference_Handbook/packaging_reference.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "quick revision notes",
    "fileName": "quick_revision_notes.md",
    "path": "Volume_16_Reference_Handbook/quick_revision_notes.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "semiconductor formulas",
    "fileName": "semiconductor_formulas.md",
    "path": "Volume_16_Reference_Handbook/semiconductor_formulas.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "timing reference",
    "fileName": "timing_reference.md",
    "path": "Volume_16_Reference_Handbook/timing_reference.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "transistor reference",
    "fileName": "transistor_reference.md",
    "path": "Volume_16_Reference_Handbook/transistor_reference.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "vlsi formula sheet",
    "fileName": "vlsi_formula_sheet.md",
    "path": "Volume_16_Reference_Handbook/vlsi_formula_sheet.md",
    "volumeId": "Volume_16_Reference_Handbook",
    "volumeName": "Volume 16 Reference Handbook"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_17_Research_Database/README.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "ai chip research",
    "fileName": "ai_chip_research.md",
    "path": "Volume_17_Research_Database/ai_chip_research.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "chiplet research",
    "fileName": "chiplet_research.md",
    "path": "Volume_17_Research_Database/chiplet_research.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "emerging devices",
    "fileName": "emerging_devices.md",
    "path": "Volume_17_Research_Database/emerging_devices.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "future technology trends",
    "fileName": "future_technology_trends.md",
    "path": "Volume_17_Research_Database/future_technology_trends.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "ieee paper guide",
    "fileName": "ieee_paper_guide.md",
    "path": "Volume_17_Research_Database/ieee_paper_guide.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "phd research paths",
    "fileName": "phd_research_paths.md",
    "path": "Volume_17_Research_Database/phd_research_paths.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "quantum semiconductor",
    "fileName": "quantum_semiconductor.md",
    "path": "Volume_17_Research_Database/quantum_semiconductor.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "research topics",
    "fileName": "research_topics.md",
    "path": "Volume_17_Research_Database/research_topics.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "semiconductor startups",
    "fileName": "semiconductor_startups.md",
    "path": "Volume_17_Research_Database/semiconductor_startups.md",
    "volumeId": "Volume_17_Research_Database",
    "volumeName": "Volume 17 Research Database"
  },
  {
    "title": "README",
    "fileName": "README.md",
    "path": "Volume_18_Career_Roadmap/README.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "analog engineer path",
    "fileName": "analog_engineer_path.md",
    "path": "Volume_18_Career_Roadmap/analog_engineer_path.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "device engineer path",
    "fileName": "device_engineer_path.md",
    "path": "Volume_18_Career_Roadmap/device_engineer_path.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "experienced engineer growth",
    "fileName": "experienced_engineer_growth.md",
    "path": "Volume_18_Career_Roadmap/experienced_engineer_growth.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "fresher roadmap",
    "fileName": "fresher_roadmap.md",
    "path": "Volume_18_Career_Roadmap/fresher_roadmap.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "global company guide",
    "fileName": "global_company_guide.md",
    "path": "Volume_18_Career_Roadmap/global_company_guide.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "physical design path",
    "fileName": "physical_design_path.md",
    "path": "Volume_18_Career_Roadmap/physical_design_path.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "rtl engineer path",
    "fileName": "rtl_engineer_path.md",
    "path": "Volume_18_Career_Roadmap/rtl_engineer_path.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "salary and career progression",
    "fileName": "salary_and_career_progression.md",
    "path": "Volume_18_Career_Roadmap/salary_and_career_progression.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "semiconductor roles",
    "fileName": "semiconductor_roles.md",
    "path": "Volume_18_Career_Roadmap/semiconductor_roles.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  },
  {
    "title": "verification engineer path",
    "fileName": "verification_engineer_path.md",
    "path": "Volume_18_Career_Roadmap/verification_engineer_path.md",
    "volumeId": "Volume_18_Career_Roadmap",
    "volumeName": "Volume 18 Career Roadmap"
  }
];

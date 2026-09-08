import { InstitutionInternship } from "../types";

export const initialInstitutions: InstitutionInternship[] = [
  {
    "id": "iit-madras-sfp",
    "instituteName": "Indian Institute of Technology Madras (IIT Madras)",
    "shortName": "IIT Madras",
    "type": "IIT",
    "programName": "Summer Fellowship Programme (SFP) & Shakti RISC-V Research Lab",
    "location": "Chennai, Tamil Nadu",
    "domains": [
      "RISC-V & Processor Architecture",
      "VLSI & RTL Design",
      "Hardware Security & Cryptography",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹15,000 / month (₹30,000 total for 2 months)",
    "stipendAmountNumeric": 15000,
    "duration": "2 Months (May 18 – July 17)",
    "applicationWindow": "January – Early March (Annual Cycle)",
    "deadlineDescription": "Applications typically open in January and close by first week of March.",
    "eligibility": "Pre-final year B.Tech/B.E. (3rd year) or M.Tech students with stellar academic record from non-IIT institutions.",
    "minCgpaOrRank": "CGPA ≥ 8.0 or Top 10% of batch",
    "officialPortalUrl": "https://sfp.iitm.ac.in/",
    "overview": "IIT Madras offers India's premier academic research fellowship, hosting the groundbreaking SHAKTI RISC-V Processor Project (RISE Lab). Interns work directly on synthesizable processor cores, Bluespec SystemVerilog, FPGA emulation, and custom hardware accelerators.",
    "keyHighlights": [
      "Home to the SHAKTI open-source RISC-V processor family (E-Class, C-Class, I-Class) funded by MeitY.",
      "World-class RISE Lab specializing in microarchitecture, fault-tolerant computing, and hardware security.",
      "Access to state-of-the-art Xilinx UltraScale+ FPGAs, Cadence/Synopsys tool suites, and ChipIN EDA infrastructure.",
      "Subsidized hostel accommodation provided inside the sprawling IIT Madras green campus."
    ],
    "selectionProcess": "Departmental Faculty Screening based on Academic Transcripts, Research Statement of Purpose (SOP), GitHub proof-of-work, and Letter of Recommendation.",
    "deliverablesAndOutcomes": [
      "Tape-out quality synthesizable SystemVerilog / Bluespec RTL module or accelerator IP.",
      "Co-authored research poster or submission to IEEE VLSID / DATE / ISCA conferences.",
      "Direct pathway to MS by Research or PhD admissions at IIT Madras."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. V. Kamakoti",
        "designation": "Director & Professor (CSE)",
        "researchArea": "Computer Architecture, RISC-V Shakti, Secure Microprocessors",
        "labOrGroup": "RISE (Reconfigurable Intelligent Systems Engineering) Lab",
        "websiteOrProfile": "https://shakti.org.in/",
        "keyProjectsOrTopics": [
          "SHAKTI RISC-V Processor",
          "DIR-V Microarchitecture",
          "Hardware Trojan Detection"
        ]
      },
      {
        "name": "Prof. Nitin Chandrachoodan",
        "designation": "Professor (EE)",
        "researchArea": "VLSI Architectures, Digital Signal Processing Silicon, High-Level Synthesis",
        "labOrGroup": "VLSI Design & Architecture Lab",
        "websiteOrProfile": "https://www.ee.iitm.ac.in/~nitin/",
        "keyProjectsOrTopics": [
          "FPGA DSP Accelerators",
          "High-Speed Arithmetic Units"
        ]
      },
      {
        "name": "Prof. Chester Rebeiro",
        "designation": "Associate Professor (CSE)",
        "researchArea": "Hardware Security, Side-Channel Analysis, Microarchitectural Attacks & Defenses",
        "labOrGroup": "Hardware Security Lab (RISE)",
        "websiteOrProfile": "https://www.cse.iitm.ac.in/~chester/",
        "keyProjectsOrTopics": [
          "Spectre/Meltdown Mitigation in RISC-V",
          "Fault Injection Testing"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Demonstrate practical proficiency in SystemVerilog, Bluespec (BSV), or Verilog on GitHub.",
      "Highlight concrete experience with RISC-V ISA compliance testing (RISCOF) or custom pipeline design in your SOP.",
      "In your SOP, cite specific Shakti publications or hardware security papers from RISE lab."
    ]
  },
  {
    "id": "iit-bombay-ircc",
    "instituteName": "Indian Institute of Technology Bombay (IIT Bombay)",
    "shortName": "IIT Bombay",
    "type": "IIT",
    "programName": "IIT Bombay Research Internship Awards & Wadhwani Electronics Lab",
    "location": "Mumbai, Maharashtra",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "EDA Tools & Open-Source Silicon",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹15,000 / month (for 4 to 6 months)",
    "stipendAmountNumeric": 15000,
    "duration": "4 – 6 Months (January – June / Summer cycle)",
    "applicationWindow": "August – September (Winter Cycle) & January – March (Summer)",
    "deadlineDescription": "Official IRCC portal opens twice a year with rigid deadlines.",
    "eligibility": "Second or third-year undergraduate / First-year PG students in the top 10% of their university batch.",
    "minCgpaOrRank": "CGPA ≥ 8.5 / Branch Top 10%",
    "officialPortalUrl": "https://www.ircc.iitb.ac.in/IRCC-Web/internship/",
    "overview": "IIT Bombay is an international powerhouse in Microelectronics and VLSI Design. The Department of Electrical Engineering houses the Centre for Excellence in Nanoelectronics (CEN) and pioneering research in open-source EDA tools, memory architectures, and RRAM-based compute-in-memory.",
    "keyHighlights": [
      "Funded through the Industrial Research and Consultancy Centre (IRCC).",
      "Extensive testing infrastructure including semiconductor parameter analyzers and cryogenic probe stations.",
      "Active leadership in Indian semiconductor roadmaps and national microelectronics initiatives.",
      "Access to cutting-edge Cadence, Synopsys, Mentor Graphics, and OpenLane PDK tools."
    ],
    "selectionProcess": "Centralized IRCC screening based on student statement, academic standing, and final selection by lead principal investigators.",
    "deliverablesAndOutcomes": [
      "Hardware layout in TSMC/SkyWater PDK, SPICE macromodeling, or Verilog IP block.",
      "Comprehensive research report and formal certificate from Dean (R&D), IIT Bombay."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Maryam Shojaei Baghini",
        "designation": "Professor (EE)",
        "researchArea": "Analog/Mixed-Signal VLSI, Low-Power Sensor Interfaces, Energy Harvesting ICs",
        "labOrGroup": "Mixed-Signal & Sensor Interface Circuits Lab",
        "websiteOrProfile": "https://www.ee.iitb.ac.in/~mshojaei/",
        "keyProjectsOrTopics": [
          "Sub-Microwatt Biomedical Readout ICs",
          "Power Management ICs (PMIC)"
        ]
      },
      {
        "name": "Prof. Udayan Ganguly",
        "designation": "Professor (EE)",
        "researchArea": "Compute-in-Memory, Resistive RAM (RRAM), Neuromorphic Silicon",
        "labOrGroup": "Nanoelectronics & Emerging Memory Systems",
        "websiteOrProfile": "https://www.ee.iitb.ac.in/~udayan/",
        "keyProjectsOrTopics": [
          "Non-Volatile AI Hardware",
          "Synaptic Transistor Arrays"
        ]
      },
      {
        "name": "Prof. Sachin Patkar",
        "designation": "Professor (EE)",
        "researchArea": "FPGA Accelerators, High-Performance Computing, Open-Source EDA Frameworks",
        "labOrGroup": "Reconfigurable Computing Lab",
        "websiteOrProfile": "https://www.ee.iitb.ac.in/~patkar/",
        "keyProjectsOrTopics": [
          "FPGA Accelerated Solvers",
          "Custom Arithmetic Co-Processors"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Ensure your transcript clearly proves strong grades in Digital Design, Analog Circuits, and Signals.",
      "Attach a 1-page PDF summary highlighting any prior FPGA demos or SPICE circuit designs.",
      "Apply right when the IRCC portal opens in August/September for the Spring term."
    ]
  },
  {
    "id": "iit-delhi-srfp",
    "instituteName": "Indian Institute of Technology Delhi (IIT Delhi)",
    "shortName": "IIT Delhi",
    "type": "IIT",
    "programName": "Summer Research Fellowship Programme (SRFP) & VLSI Embedded Systems Lab",
    "location": "New Delhi, Delhi NCR",
    "domains": [
      "VLSI & RTL Design",
      "RISC-V & Processor Architecture",
      "Embedded Systems & IoT",
      "EDA Tools & Open-Source Silicon"
    ],
    "stipend": "₹2,000 / week (₹16,000 total) + Free On-Campus Hostel & Mess + Travel Allowance",
    "stipendAmountNumeric": 8000,
    "duration": "8 – 12 Weeks (May 13 – July 13)",
    "applicationWindow": "February – Early April (Annual)",
    "deadlineDescription": "SRFP portal opens in February; applications close in late March / early April.",
    "eligibility": "Undergraduate engineering students (2nd/3rd year) with top-tier academic ranking from non-IIT Delhi colleges.",
    "minCgpaOrRank": "CGPA ≥ 8.5 (or Top 5% of class)",
    "officialPortalUrl": "https://academics.iitd.ac.in/srfp/",
    "overview": "IIT Delhi's SRFP is one of the most generous and well-structured summer fellowships in India, offering free campus accommodation, mess food, travel reimbursement, and high-impact research alongside leading faculty in Embedded Systems and Computer Architecture.",
    "keyHighlights": [
      "Includes free on-campus boarding, lodging in student hostels, and train travel reimbursement.",
      "World-renowned faculty in Computer Architecture (Tejas Simulator, gem5) and Embedded Assistive Tech.",
      "Strong ties with STMicroelectronics, Intel India, and NXP Semiconductors in Delhi-NCR.",
      "Hands-on exposure to high-speed digital board design and synthesis."
    ],
    "selectionProcess": "Competitive peer-review of candidate research statement, academic transcripts, and faculty preference matching.",
    "deliverablesAndOutcomes": [
      "Architectural simulation benchmark, SystemVerilog ASIC core, or firmware driver package.",
      "IIT Delhi Summer Research Fellow Certificate and potential letter of recommendation."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Smruti R. Sarangi",
        "designation": "Professor (CSE)",
        "researchArea": "Computer Architecture, Many-Core Simulators, Optical NoC, Low-Power Microarchitectures",
        "labOrGroup": "Architecture & Systems Research Group",
        "websiteOrProfile": "https://www.cse.iitd.ac.in/~srsarangi/",
        "keyProjectsOrTopics": [
          "Tejas Architectural Simulator",
          "3D Die-Stacked NoC",
          "Hardware Security"
        ]
      },
      {
        "name": "Prof. M. Balakrishnan",
        "designation": "Emeritus Professor (CSE)",
        "researchArea": "Embedded System Design, Hardware-Software Co-Design, Assistive Technology",
        "labOrGroup": "Embedded Systems Lab",
        "websiteOrProfile": "https://www.cse.iitd.ac.in/~mbala/",
        "keyProjectsOrTopics": [
          "Smart Cane Technology",
          "System-on-Chip Emulation"
        ]
      },
      {
        "name": "Prof. Ankesh Jain",
        "designation": "Associate Professor (EE)",
        "researchArea": "Analog/RF IC Design, High-Speed SerDes, Low-Power Data Converters (ADC/DAC)",
        "labOrGroup": "Integrated Circuits & Systems Lab",
        "websiteOrProfile": "https://ee.iitd.ac.in/faculty/ankesh-jain",
        "keyProjectsOrTopics": [
          "Multi-Gigabit SerDes Transceivers",
          "Ultra-Low-Power SAR ADCs"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Mention familiarity with cycle-accurate architectural simulators (gem5, Tejas) or Verilator.",
      "Emphasize your readiness to commit 8 full weeks on campus in New Delhi.",
      "Specify 3 target faculty members whose recent papers you have critically reviewed."
    ]
  },
  {
    "id": "iit-roorkee-spark",
    "instituteName": "Indian Institute of Technology Roorkee (IIT Roorkee)",
    "shortName": "IIT Roorkee",
    "type": "IIT",
    "programName": "SPARK Summer Research Internship Programme",
    "location": "Roorkee, Uttarakhand",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹3,000 / week (₹24,000 total for 8 weeks)",
    "stipendAmountNumeric": 12000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – Late March (Annual)",
    "deadlineDescription": "SPARK portal opens in February and closes in late March.",
    "eligibility": "B.Tech/B.E./M.Sc. students having completed at least 2 semesters. Minimum CGPA criteria: 7.5 for IIT/IISc, 8.0 for NIT, 8.5 for others.",
    "minCgpaOrRank": "CGPA ≥ 8.5 for state/private universities, 8.0 for NITs",
    "officialPortalUrl": "https://spark.iitr.ac.in/",
    "overview": "IIT Roorkee SPARK provides institute-funded summer research across advanced engineering domains. The Department of Electronics & Communication Engineering (ECE) hosts top research in VLSI, FinFET device modeling, RFIC, and FPGA hardware security.",
    "keyHighlights": [
      "Generous institute stipend of ₹3,000 per week for selected external fellows.",
      "Top-tier cleanroom and CAD tool infrastructure in ECE and Physics departments.",
      "Online application portal where you select 5 preferred faculty project listings.",
      "Picturesque heritage Himalayan foothills campus with excellent research labs."
    ],
    "selectionProcess": "Faculty-driven selection based on applicant project matching, 500-word research statement, and CGPA merit list. No written exam.",
    "deliverablesAndOutcomes": [
      "Completed project presentation before departmental research committee.",
      "Published conference paper or open-source GitHub tool repository."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Anand Bulusu",
        "designation": "Professor (ECE)",
        "researchArea": "VLSI Design, SRAM Memory Architectures, Circuit Reliability & Aging in FinFETs",
        "labOrGroup": "VLSI Circuits & Systems Lab",
        "websiteOrProfile": "https://ece.iitr.ac.in/faculty/anand-bulusu/",
        "keyProjectsOrTopics": [
          "Low-Voltage SRAM Design",
          "Sub-Threshold CMOS Logic"
        ]
      },
      {
        "name": "Prof. Sanjeev Kumar Manhas",
        "designation": "Professor (ECE)",
        "researchArea": "Nanoelectronics, Semiconductor Device Modeling, High-k Dielectrics & MEMS",
        "labOrGroup": "Microelectronics & Device Research Lab",
        "websiteOrProfile": "https://ece.iitr.ac.in/faculty/sanjeev-kumar-manhas/",
        "keyProjectsOrTopics": [
          "2D FET Device Simulations",
          "Nanowire Transistor Reliability"
        ]
      },
      {
        "name": "Prof. Brajesh Kumar Kaushik",
        "designation": "Professor (ECE)",
        "researchArea": "Spintronics, Carbon Nanotube Interconnects, Optical Interconnects, Quantum Computing Devices",
        "labOrGroup": "Spintronics & Emerging Technologies Lab",
        "websiteOrProfile": "https://ece.iitr.ac.in/faculty/brajesh-kumar-kaushik/",
        "keyProjectsOrTopics": [
          "Magnetic RAM (MRAM) Logic",
          "High-Speed Interconnect Modeling"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Write a concise 500-word Statement of Purpose explicitly connecting your skills to 2 of the faculty project descriptions on SPARK.",
      "Highlight concrete circuit simulator experience (LTspice, Cadence Spectre, Verilog HDL).",
      "Submit early before the March deadline to ensure smooth faculty assignment."
    ]
  },
  {
    "id": "iit-hyderabad-sure",
    "instituteName": "Indian Institute of Technology Hyderabad (IIT Hyderabad)",
    "shortName": "IIT Hyderabad",
    "type": "IIT",
    "programName": "SURE (Summer Undergraduate Research Exposure) Internship",
    "location": "Kandi, Sangareddy, Telangana",
    "domains": [
      "VLSI & RTL Design",
      "Neuromorphic & Edge AI",
      "RISC-V & Processor Architecture",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹15,000 total for 2 months (₹7,500 / month) + Hostel Accommodation",
    "stipendAmountNumeric": 7500,
    "duration": "1 – 2 Months (May 15 – July 14)",
    "applicationWindow": "February – Mid-March (Annual)",
    "deadlineDescription": "SURE application window closes mid-March.",
    "eligibility": "Non-IIT Hyderabad students: 2nd/3rd year B.Tech or 1st year M.Sc/M.Tech among top 20% of their department batch.",
    "minCgpaOrRank": "Top 20% of branch / CGPA ≥ 8.0",
    "officialPortalUrl": "https://sure.iith.ac.in/",
    "overview": "IIT Hyderabad is celebrated for cutting-edge electronics innovation, leading India's 5G testbeds, Edge AI hardware, and advanced VLSI test chips. SURE offers immersive research exposure within state-of-the-art Japanese-designed labs.",
    "keyHighlights": [
      "Strong research synergies with Japanese universities and international semiconductor consortiums.",
      "Hosts the TiHAN Autonomous Navigation Testbed with advanced robotic embedded hardware.",
      "Subsidized hostel accommodation provided inside the radiant IIT Hyderabad campus.",
      "Direct hands-on experience with FPGA synthesis, Edge AI co-processors, and wireless ICs."
    ],
    "selectionProcess": "Departmental faculty screening based on academic record, project alignment, and technical statement.",
    "deliverablesAndOutcomes": [
      "Functional FPGA prototype or tapeout-ready silicon layout block.",
      "Poster showcase at IIT Hyderabad Annual Research Day."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Shiv Govind Singh",
        "designation": "Professor (EE)",
        "researchArea": "3D Integrated Circuits, TSV Technology, Bio-MEMS Sensors & Microfluidics",
        "labOrGroup": "3D-IC & Nano-Biotechnology Lab",
        "websiteOrProfile": "https://ee.iith.ac.in/faculty/sgsingh/",
        "keyProjectsOrTopics": [
          "Through-Silicon Via (TSV) 3D Stacking",
          "MEMS Sensor Integration"
        ]
      },
      {
        "name": "Prof. Amit Acharyya",
        "designation": "Professor (EE)",
        "researchArea": "Edge AI Silicon, Biomedical VLSI Architectures, Fault-Tolerant Multiprocessors",
        "labOrGroup": "Biomedical & Edge Computing Lab",
        "websiteOrProfile": "https://ee.iith.ac.in/faculty/amit_acharyya/",
        "keyProjectsOrTopics": [
          "On-Chip ECG Classification ASICs",
          "Low-Complexity Neural Accelerators"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Mention hands-on experience with SystemVerilog, TinyML, FreeRTOS, or PCB design tools.",
      "Show eagerness to contribute to physical on-campus testing and FPGA hardware debug.",
      "Upload a verified transcript and rank certificate confirming your top 20% batch standing."
    ]
  },
  {
    "id": "iit-gandhinagar-srip",
    "instituteName": "Indian Institute of Technology Gandhinagar (IIT Gandhinagar)",
    "shortName": "IIT Gandhinagar",
    "type": "IIT",
    "programName": "SRIP (Summer Research Internship Program) + Bhalodia-Khetan Excellence Award",
    "location": "Gandhinagar, Gujarat",
    "domains": [
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "Nanoelectronics & Device Physics",
      "Neuromorphic & Edge AI"
    ],
    "stipend": "₹2,000 / week (₹16,000 total) + ₹50,000 Bhalodia-Khetan Summer Excellence Award Prize for top interns",
    "stipendAmountNumeric": 8000,
    "duration": "8 Weeks (May 7 – July 16)",
    "applicationWindow": "February – Early March (Annual)",
    "deadlineDescription": "SRIP portal opens in February and closes in the first week of March.",
    "eligibility": "Bachelor's or Master's degree students from recognized institutions across India.",
    "minCgpaOrRank": "CGPA ≥ 8.0 / Solid project portfolio",
    "officialPortalUrl": "https://srip.iitgn.ac.in/info/",
    "overview": "IIT Gandhinagar's SRIP is one of India's most student-friendly and collaborative summer internships. It features direct mentorship, weekly interdisciplinary symposiums, and the prestigious ₹50,000 Bhalodia-Khetan Summer Research Award for standout engineering contributions.",
    "keyHighlights": [
      "Opportunity to win the ₹50,000 Bhalodia-Khetan Summer Research Excellence Award.",
      "100% on-campus residential experience along the banks of the Sabarmati river.",
      "Broad range of projects from FPGA digital signal processing to wearable biomedical electronics.",
      "Extensive fabrication equipment, 3D printing labs, and precision oscilloscopes."
    ],
    "selectionProcess": "Online project application through central portal where faculty directly evaluate student problem-solving approach and past projects.",
    "deliverablesAndOutcomes": [
      "Final research presentation and written symposium paper.",
      "Eligibility for the ₹50,000 Excellence Award and formal IITGN fellowship credentials."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Nihar Ranjan Mohapatra",
        "designation": "Professor (EE)",
        "researchArea": "Semiconductor Device Physics, FinFETs, Negative Capacitance FETs (NC-FET), Flash Memory",
        "labOrGroup": "Nano-Device & Memory Research Lab",
        "websiteOrProfile": "https://ee.iitgn.ac.in/faculty/nihar/",
        "keyProjectsOrTopics": [
          "Sub-5nm Transistor Reliability",
          "Ferroelectric Memory Devices"
        ]
      },
      {
        "name": "Prof. Uttama Lahiri",
        "designation": "Professor (EE)",
        "researchArea": "Assistive Embedded Hardware, Virtual Reality Bio-Feedback Systems, Wearable Sensors",
        "labOrGroup": "Innovative Technologies in Rehabilitation Lab",
        "websiteOrProfile": "https://ee.iitgn.ac.in/faculty/uttama/",
        "keyProjectsOrTopics": [
          "Gaze-Tracking Embedded System",
          "Robotic Rehabilitation Interfaces"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Review the specific project list published on the SRIP portal before drafting your application.",
      "In the application essay, highlight how your specific skills will solve the listed project problem.",
      "Keep your GitHub repository clean with well-documented READMEs and simulation waveforms."
    ]
  },
  {
    "id": "iit-kanpur-surge",
    "instituteName": "Indian Institute of Technology Kanpur (IIT Kanpur)",
    "shortName": "IIT Kanpur",
    "type": "IIT",
    "programName": "SURGE (Students-Undergraduate Research Graduate Excellence) Programme",
    "location": "Kanpur, Uttar Pradesh",
    "domains": [
      "VLSI & RTL Design",
      "RISC-V & Processor Architecture",
      "Nanoelectronics & Device Physics",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹12,500 – ₹16,000 total for 8 weeks + Institute research funding",
    "stipendAmountNumeric": 7500,
    "duration": "8 Weeks (May 11 – July 10)",
    "applicationWindow": "January – Mid-February (Annual)",
    "deadlineDescription": "SURGE applications typically close mid-February.",
    "eligibility": "B.Tech/BE/BS 2nd and 3rd-year students from recognized Indian and SAARC institutions with CPI ≥ 6.0 (CPI ≥ 8.5 preferred for funding).",
    "minCgpaOrRank": "CPI ≥ 8.5 for institute funded positions",
    "officialPortalUrl": "https://www.iitk.ac.in/surge/",
    "overview": "IIT Kanpur SURGE is an iconic academic internship program that has produced prominent semiconductor researchers worldwide. The ECE and CSE departments host advanced research in VLSI, National Centre for Flexible Electronics, and hardware cybersecurity (C3iHub).",
    "keyHighlights": [
      "Home to the C3iHub National Cybersecurity Innovation Hub focusing on Hardware Security and SCADA testbeds.",
      "Pioneering Samanantar flexible electronics and printed semiconductor device fabrication.",
      "Rigorous mentorship by renowned faculty with deep industry linkages.",
      "Weekly academic lectures, seminars, and networking sessions with visiting scientists."
    ],
    "selectionProcess": "Rigorous two-tier evaluation: Central academic screening followed by faculty project interviews.",
    "deliverablesAndOutcomes": [
      "Comprehensive final technical report and oral presentation before departmental jury.",
      "Certificate of Excellence for top 10% research deliverables."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Sandeep Shukla",
        "designation": "Professor (CSE)",
        "researchArea": "Hardware Security, Embedded Cryptography, SCADA Security, Formal Verification",
        "labOrGroup": "C3iHub (Cybersecurity Research Center)",
        "websiteOrProfile": "https://www.cse.iitk.ac.in/users/sandeeps/",
        "keyProjectsOrTopics": [
          "Cryptographic Hardware Accelerators",
          "Side-Channel Secure Co-Processors"
        ]
      },
      {
        "name": "Prof. Amit Verma",
        "designation": "Professor (EE)",
        "researchArea": "Semiconductor Device Physics, 2D Transition Metal Dichalcogenides, Quantum Transport",
        "labOrGroup": "Nanoelectronics Lab",
        "websiteOrProfile": "https://www.iitk.ac.in/ee/amit-verma",
        "keyProjectsOrTopics": [
          "Graphene & MoS2 Transistors",
          "Wide Bandgap Semiconductor Modeling"
        ]
      },
      {
        "name": "Prof. Shubham Sahay",
        "designation": "Assistant Professor (EE)",
        "researchArea": "Neuromorphic Computing, Spintronics, Emerging Non-Volatile Memories (FeFET, RRAM)",
        "labOrGroup": "Emerging Device & Circuit Architectures Lab",
        "websiteOrProfile": "https://www.iitk.ac.in/ee/shubham-sahay",
        "keyProjectsOrTopics": [
          "Brain-Inspired Memory Arrays",
          "In-Memory Computing Architectures"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Submit early in January; competition is fierce with thousands of national applicants.",
      "In your research proposal, demonstrate strong knowledge of Verilog, SPICE, or Python hardware simulation.",
      "Secure strong recommendation letters from professors in your home institution."
    ]
  },
  {
    "id": "iit-kharagpur-summer",
    "instituteName": "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
    "shortName": "IIT Kharagpur",
    "type": "IIT",
    "programName": "GRISHMA Summer Fellowship & Advanced VLSI Design Lab (AVDL)",
    "location": "Kharagpur, West Bengal",
    "domains": [
      "VLSI & RTL Design",
      "EDA Tools & Open-Source Silicon",
      "Embedded Systems & IoT",
      "Hardware Security & Cryptography"
    ],
    "stipend": "Up to ₹22,000 / month (GRISHMA Fellowship / Departmental Grants)",
    "stipendAmountNumeric": 15000,
    "duration": "8 – 10 Weeks (May 16 – July 10)",
    "applicationWindow": "February – Late March (Annual)",
    "deadlineDescription": "GRISHMA and departmental announcements open in February and close in late March.",
    "eligibility": "Pre-final year undergraduate or postgraduate engineering students with top academic standing across India.",
    "minCgpaOrRank": "CGPA ≥ 8.0",
    "officialPortalUrl": "http://www.iitkgp.ac.in/",
    "overview": "IIT Kharagpur pioneered VLSI education in India, setting up the nation's first specialized VLSI Design and Embedded Systems research center. The GRISHMA fellowship and Advanced VLSI Design Lab (AVDL) host advanced test chip tapeouts, hardware security (SEAL Lab), and open EDA flows.",
    "keyHighlights": [
      "Home to the Advanced VLSI Design Laboratory (AVDL) with rich history of silicon test chip tape-outs.",
      "State-of-the-art EDA licenses across Synopsys, Cadence, Mentor, and Ansys.",
      "Active research in Hardware AI accelerators, NoC architectures, and testing/DFT algorithms.",
      "Sprawling residential campus with expansive fabrication and characterization facilities."
    ],
    "selectionProcess": "Direct faculty evaluation and GRISHMA committee screening based on academic credentials, CV, and verified RTL code repositories.",
    "deliverablesAndOutcomes": [
      "Published research paper in IEEE conference / journal or verified open-source IP core.",
      "Official IIT Kharagpur summer fellowship certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Indranil Sengupta",
        "designation": "Professor (CSE)",
        "researchArea": "VLSI Testing, Cryptography, Reversible & Quantum Computing, Hardware Security",
        "labOrGroup": "Advanced VLSI Design Laboratory (AVDL)",
        "websiteOrProfile": "http://www.facweb.iitkgp.ac.in/~isg/",
        "keyProjectsOrTopics": [
          "Testing of VLSI Circuits",
          "Quantum Logic Synthesis",
          "Hardware PUFs"
        ]
      },
      {
        "name": "Prof. Debdeep Mukhopadhyay",
        "designation": "Professor (CSE)",
        "researchArea": "Hardware Security, Side-Channel Analysis, Fault Attacks, Post-Quantum Cryptography Silicon",
        "labOrGroup": "Secured Embedded Architecture Laboratory (SEAL)",
        "websiteOrProfile": "http://www.facweb.iitkgp.ac.in/~debdeep/",
        "keyProjectsOrTopics": [
          "Side-Channel Analysis of AES/ECC",
          "Hardware Trojan Detection in ASICs"
        ]
      },
      {
        "name": "Prof. Mrigank Sharad",
        "designation": "Associate Professor (ECE)",
        "researchArea": "Neuromorphic VLSI, Low-Power Biomedical Silicon, Spin-Based Computing",
        "labOrGroup": "Bio-Medical & Neuromorphic VLSI Lab",
        "websiteOrProfile": "http://www.iitkgp.ac.in/department/EC/faculty/ec-mrigank",
        "keyProjectsOrTopics": [
          "Sub-mW Neural Signal Processors",
          "Memristive Deep Learning Chips"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Contact professors directly via academic cold email with a focused research proposal.",
      "Reference SEAL lab or AVDL lab papers to show genuine interest in their specific research domain.",
      "Include links to verifiable Verilog/C++ code demonstrating your hardware design ability."
    ]
  },
  {
    "id": "iit-guwahati-eee-nano",
    "instituteName": "Indian Institute of Technology Guwahati (IIT Guwahati)",
    "shortName": "IIT Guwahati",
    "type": "IIT",
    "programName": "Summer Internship Programme & Centre for Nanotechnology (C-Nano)",
    "location": "Guwahati, Assam",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT",
      "Neuromorphic & Edge AI"
    ],
    "stipend": "Faculty Grant / Self-Funded (Hostel Provided on payment)",
    "stipendAmountNumeric": 6000,
    "duration": "8 Weeks (May 10 – July 10)",
    "applicationWindow": "February – Late March (Annual)",
    "deadlineDescription": "EEE and Centre for Nanotechnology announcements typically close late March.",
    "eligibility": "Pre-final year B.Tech/B.E. (6th semester) students in ECE, EEE, CSE, Instrumentation, or Nanotechnology.",
    "minCgpaOrRank": "CGPA ≥ 7.5 or Top 15% of class",
    "officialPortalUrl": "https://www.iitg.ac.in/eee/",
    "overview": "IIT Guwahati is a premier technical institute in Northeast India. The Department of EEE and Centre for Nanotechnology host state-of-the-art cleanroom nanofabrication facilities, semiconductor device characterization, and high-performance VLSI DSP architecture research.",
    "keyHighlights": [
      "Centre for Nanotechnology equipped with class 100/1000 cleanroom and advanced e-beam lithography.",
      "Active research in 2D material transistors, flexible sensors, and neuromorphic memristive synapses.",
      "Strong faculty expertise in high-throughput VLSI arithmetic architectures and biomedical hardware.",
      "Scenic campus on the banks of Brahmaputra with world-class hostel infrastructure."
    ],
    "selectionProcess": "Departmental faculty screening based on academic merit, statement of research purpose, and prior hardware simulation experience.",
    "deliverablesAndOutcomes": [
      "Cleanroom microfabrication run, TCAD device simulation report, or synthesized Verilog module.",
      "IIT Guwahati Summer Internship Certificate and faculty endorsement."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Roy Paily Palathinkal",
        "designation": "Professor (EEE)",
        "researchArea": "VLSI Design, Bio-MEMS, Nanoelectronics, Sensor Readout Circuits",
        "labOrGroup": "Microelectronics & MEMS Lab",
        "websiteOrProfile": "https://www.iitg.ac.in/eee/roypaily.html",
        "keyProjectsOrTopics": [
          "Bio-Potential Sensor ASICs",
          "MEMS Acoustic Sensors"
        ]
      },
      {
        "name": "Prof. Gaurav Trivedi",
        "designation": "Professor (EEE)",
        "researchArea": "EDA Algorithms, Analog VLSI Design, Hardware Security, High-Speed Interconnects",
        "labOrGroup": "Circuits and Systems Research Lab",
        "websiteOrProfile": "https://www.iitg.ac.in/eee/trivedi.html",
        "keyProjectsOrTopics": [
          "Analog Fault Diagnosis",
          "Hardware Cryptographic Engines"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Highlight specific software experience in Cadence Virtuoso, Synopsys Sentaurus TCAD, or Vivado.",
      "Reach out directly to EEE and Nanotechnology faculty members in February with a concise 1-page CV.",
      "Reference ongoing MeitY Chip-to-Startup (C2S) projects hosted at IIT Guwahati."
    ]
  },
  {
    "id": "iit-bhu-microelectronics",
    "instituteName": "Indian Institute of Technology (BHU) Varanasi",
    "shortName": "IIT BHU",
    "type": "IIT",
    "programName": "Microelectronics & VLSI Research Internship & CoEMTD Training",
    "location": "Varanasi, Uttar Pradesh",
    "domains": [
      "Nanoelectronics & Device Physics",
      "VLSI & RTL Design",
      "Silicon Photonics & MEMS",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 – ₹10,000 / month (Faculty Grants) / Self-Funded with nominal fee",
    "stipendAmountNumeric": 5000,
    "duration": "6 – 8 Weeks (May 15 – July 15)",
    "applicationWindow": "February – April (Annual)",
    "deadlineDescription": "Departmental portals and faculty project notices close in March/April.",
    "eligibility": "B.Tech/B.E. 2nd/3rd year or M.Tech students in Electronics Engineering, Electrical, or Physics.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.iitbhu.ac.in/dept/ece",
    "overview": "IIT (BHU) Varanasi holds a celebrated legacy in semiconductor physics, materials science, and microelectronics. The Department of Electronics Engineering specializes in GaN power semiconductors, tunneling FETs (TFETs), microwave integrated circuits (MMICs), and optical communication silicon.",
    "keyHighlights": [
      "Pioneering work in Wide Bandgap (GaN, SiC, Ga2O3) semiconductor device modeling.",
      "Well-equipped Microelectronics Device Characterization Lab and Microwave Simulation Suites.",
      "Active participation in national defense R&D projects for radar hardware and high-power switches.",
      "Historic academic culture with rigorous analytical and physics-centric device training."
    ],
    "selectionProcess": "Faculty review of student coursework in Semiconductor Devices, Signals, and Digital Design, along with faculty email screening.",
    "deliverablesAndOutcomes": [
      "Published research poster/paper on device physics or synthesized Verilog hardware core.",
      "Formal IIT BHU internship completion certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Satyabrata Jit",
        "designation": "Professor (ECE)",
        "researchArea": "Semiconductor Devices, Optoelectronic Devices, Nanowire FETs, Quantum Well Lasers",
        "labOrGroup": "Microelectronics & Optoelectronics Research Lab",
        "websiteOrProfile": "https://www.iitbhu.ac.in/dept/ece/people/sjitce",
        "keyProjectsOrTopics": [
          "Metal-Oxide Semiconductor Photodetectors",
          "Novel Nanoscale Transistors"
        ]
      },
      {
        "name": "Prof. M. K. Meshram",
        "designation": "Professor (ECE)",
        "researchArea": "Microwave Circuits, Metamaterials, RF MEMS, Antennas for High-Speed Wireless ICs",
        "labOrGroup": "Microwave Engineering Lab",
        "websiteOrProfile": "https://www.iitbhu.ac.in/dept/ece/people/mkmeshramce",
        "keyProjectsOrTopics": [
          "Millimeter-Wave RF Front-Ends",
          "Sub-THz Waveguides"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Email professors early (February) with concrete interest in device physics or microwave circuits.",
      "Demonstrate solid mathematical grip on Poisson and drift-diffusion equations in semiconductor physics.",
      "Attach any SPICE simulation or MATLAB modeling code you have authored."
    ]
  },
  {
    "id": "iit-indore-summer",
    "instituteName": "Indian Institute of Technology Indore (IIT Indore)",
    "shortName": "IIT Indore",
    "type": "IIT",
    "programName": "Summer Research Internship & Center for Advanced Electronics",
    "location": "Simrol, Indore, Madhya Pradesh",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT",
      "Neuromorphic & Edge AI"
    ],
    "stipend": "₹5,000 / month (Postgraduate / Funded projects) / Paid training for UG",
    "stipendAmountNumeric": 5000,
    "duration": "1 – 2 Months (May 16 – July 19)",
    "applicationWindow": "March – April 20 (Annual)",
    "deadlineDescription": "Official centralized portal closes April 20 (5:00 PM).",
    "eligibility": "UG and PG students from recognized institutions across India with prior faculty mentor consent.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.iiti.ac.in/",
    "overview": "IIT Indore has rapidly grown into one of the top research-intensive second-generation IITs. The Discipline of Electrical Engineering hosts cutting-edge labs in low-power VLSI design, nanoelectronics, Spintronics, and biomedical circuit integration.",
    "keyHighlights": [
      "State-of-the-art cleanroom, probe stations, and cryogenic measurement units.",
      "High research output with numerous IEEE transactions papers in VLSI and device physics.",
      "Structured summer program with faculty mentor consent and formal departmental onboarding.",
      "Modern, highly integrated campus with modern lab infrastructure."
    ],
    "selectionProcess": "Online application with mandatory faculty consent letter/email, followed by departmental approval.",
    "deliverablesAndOutcomes": [
      "Device simulation dataset or FPGA synthesized IP core.",
      "IIT Indore Summer Research Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Santosh Kumar Vishvakarma",
        "designation": "Professor (EE)",
        "researchArea": "SRAM Memory Design, Energy-Efficient VLSI Architectures, Edge AI Hardware, 3D-IC",
        "labOrGroup": "Nanoscale Devices, VLSI & System Design Lab (NDVSL)",
        "websiteOrProfile": "https://www.iiti.ac.in/people/~skvishvakarma/",
        "keyProjectsOrTopics": [
          "Ultra-Low Power SRAM for IoT",
          "In-Memory Computing Accelerators"
        ]
      },
      {
        "name": "Prof. Shaibal Mukherjee",
        "designation": "Professor (EE)",
        "researchArea": "Hybrid Nanodevices, Optoelectronics, RRAM, 2D Materials & Memristors",
        "labOrGroup": "Hybrid Nanodevice Research Group (HNRG)",
        "websiteOrProfile": "https://www.iiti.ac.in/people/~shaibal/",
        "keyProjectsOrTopics": [
          "Resistive Switching Memories",
          "Flexible Thin-Film Electronics"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Email potential faculty mentors at IIT Indore in February/March to secure their consent before applying on the portal.",
      "Mention your familiarity with Cadence Virtuoso, Sentaurus TCAD, or Vivado.",
      "Target the NDVSL or HNRG research groups for top-tier VLSI and memory publications."
    ]
  },
  {
    "id": "iit-bhubaneswar-summer",
    "instituteName": "Indian Institute of Technology Bhubaneswar (IIT Bhubaneswar)",
    "shortName": "IIT Bhubaneswar",
    "type": "IIT",
    "programName": "Summer Internship Programme & School of Electrical Sciences",
    "location": "Jatni, Bhubaneswar, Odisha",
    "domains": [
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS"
    ],
    "stipend": "Project funding based / Self-funded with hostel availability",
    "stipendAmountNumeric": 5000,
    "duration": "3 – 8 Weeks (May – July)",
    "applicationWindow": "March 9 – April 15 (Annual)",
    "deadlineDescription": "Online portal submissions close on April 15.",
    "eligibility": "Registered undergraduate and postgraduate students from any recognized Indian university in Electrical/Computer/Mechanical/Basic Sciences.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.iitbbs.ac.in/",
    "overview": "IIT Bhubaneswar's School of Electrical Sciences (SES) conducts advanced research in VLSI signal processing, high-speed analog IC design, power electronics, and embedded sensor systems with modern laboratory facilities.",
    "keyHighlights": [
      "Centralized web portal application with structured school-level evaluation.",
      "Modern campus with advanced instrumentation labs and CAD tools.",
      "Active research in mixed-signal circuits, wireless transceivers, and smart grid embedded hardware.",
      "Direct faculty interaction and small research cohort sizes."
    ],
    "selectionProcess": "Online application screening by School of Electrical Sciences faculty committee.",
    "deliverablesAndOutcomes": [
      "Simulation benchmark, Verilog testbench suite, or hardware prototype demo.",
      "Official Certificate of Summer Internship from IIT Bhubaneswar."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "School of Electrical Sciences (SES)",
        "designation": "Faculty in VLSI & Microelectronics",
        "researchArea": "Digital Signal Processing Silicon, Low-Power VLSI, Embedded Systems, Semiconductor Devices",
        "labOrGroup": "VLSI & Embedded Systems Laboratory",
        "websiteOrProfile": "https://www.iitbbs.ac.in/schools/school-of-electrical-sciences/"
      }
    ],
    "applicationStrategyTips": [
      "Apply strictly via the web portal before the April 15 deadline (no paper/offline forms).",
      "Choose School of Electrical and Computer Sciences as your primary preference.",
      "Prepare a concise Statement of Purpose detailing your background in hardware modeling."
    ]
  },
  {
    "id": "iit-ropar-summer",
    "instituteName": "Indian Institute of Technology Ropar (IIT Ropar)",
    "shortName": "IIT Ropar",
    "type": "IIT",
    "programName": "Summer Internship Programme & VLSI Design Lab",
    "location": "Rupnagar, Punjab",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT",
      "Hardware Security & Cryptography"
    ],
    "stipend": "Faculty grant funding / Unpaid with on-campus hostel facility",
    "stipendAmountNumeric": 5000,
    "duration": "5 – 8 Weeks (May 15 – July 15)",
    "applicationWindow": "February – Late March (Annual)",
    "deadlineDescription": "Departmental applications close in late March.",
    "eligibility": "B.Tech/B.E. (2nd/3rd year) or M.Tech students from IITs, NITs, IISERs, and other recognized institutions.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.iitrpr.ac.in/summer-internship",
    "overview": "IIT Ropar offers intensive research internships in the Department of Electrical Engineering and Department of CSE. Research domains include fault-tolerant computing, neuromorphic hardware, low-power SRAM, and physical design automation.",
    "keyHighlights": [
      "Hands-on laboratory research with direct faculty supervision.",
      "Modern campus with advanced hardware labs (FPGA development boards, Cadence tool suites).",
      "Top-tier research in on-chip interconnection networks and memory architecture.",
      "Hostel accommodation provided on a chargeable basis during summer break."
    ],
    "selectionProcess": "Faculty screening of candidate profiles based on academic background, skills, and lab requirement.",
    "deliverablesAndOutcomes": [
      "Completed project thesis or verified RTL module on GitHub.",
      "Formal IIT Ropar Summer Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of Electrical Engineering",
        "designation": "Faculty in Microelectronics & VLSI",
        "researchArea": "VLSI Architectures, Emerging Devices, Hardware Security, Low-Power ICs",
        "labOrGroup": "VLSI & Nanotechnology Lab",
        "websiteOrProfile": "https://www.iitrpr.ac.in/ee"
      },
      {
        "name": "Prof. Neeraj Goel",
        "designation": "Associate Professor (CSE)",
        "researchArea": "Computer Architecture, Embedded Systems, RISC-V, Memory Systems",
        "labOrGroup": "Embedded Systems & Architecture Lab",
        "websiteOrProfile": "https://www.iitrpr.ac.in/cse/neeraj"
      }
    ],
    "applicationStrategyTips": [
      "Reach out directly to faculty with relevant papers in IEEE TVLSI / TCAD.",
      "Highlight concrete skills in Verilog, C++, Python, and Linux toolchains.",
      "Ensure your faculty referee is ready to endorse your application."
    ]
  },
  {
    "id": "iit-patna-summer",
    "instituteName": "Indian Institute of Technology Patna (IIT Patna)",
    "shortName": "IIT Patna",
    "type": "IIT",
    "programName": "Summer Internship Programme & VLSI Design Lab",
    "location": "Bihta, Patna, Bihar",
    "domains": [
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "Hardware Security & Cryptography",
      "Nanoelectronics & Device Physics"
    ],
    "stipend": "Faculty project grant / Self-funded with hostel availability",
    "stipendAmountNumeric": 5000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "March – Mid-April (Annual)",
    "deadlineDescription": "Portal announcements typically close in mid-April.",
    "eligibility": "B.Tech/B.E. students in ECE, EEE, CSE, or related branches from recognized universities.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.iitp.ac.in/",
    "overview": "IIT Patna's Department of Electrical Engineering houses active research in VLSI signal processing, high-speed digital circuit design, and embedded IoT hardware. Its incubation center (IC IIT Patna) also supports electronics startups.",
    "keyHighlights": [
      "Dedicated VLSI and Embedded Systems laboratories with Cadence and Synopsys tool suites.",
      "Active research in digital filters, cryptographic hardware accelerators, and low-power circuits.",
      "Collaboration with national defense and electronics manufacturing initiatives.",
      "Affordable on-campus boarding in modern student hostels."
    ],
    "selectionProcess": "Screening of candidate CV, transcripts, and faculty project matching.",
    "deliverablesAndOutcomes": [
      "FPGA prototype or synthesized ASIC netlist verification report.",
      "Official Certificate of Summer Research from IIT Patna."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of Electrical Engineering, IIT Patna",
        "designation": "Professors & Associate Professors",
        "researchArea": "VLSI Signal Processing, Embedded Systems, Hardware Security, Device Modeling",
        "labOrGroup": "VLSI & Embedded Systems Laboratory",
        "websiteOrProfile": "https://www.iitp.ac.in/index.php/departments/engineering-technology/electrical-engineering"
      }
    ],
    "applicationStrategyTips": [
      "Email EE and CSE faculty in February/March referencing their specific recent IEEE papers.",
      "Attach a 1-page summary of your digital design projects and GitHub repository.",
      "Mention your ability to work on-campus throughout the 8-week summer term."
    ]
  },
  {
    "id": "iit-jodhpur-nano",
    "instituteName": "Indian Institute of Technology Jodhpur (IIT Jodhpur)",
    "shortName": "IIT Jodhpur",
    "type": "IIT",
    "programName": "Centre of Excellence in Nanoelectronics & Sensor Technologies Internship",
    "location": "Karwar, Jodhpur, Rajasthan",
    "domains": [
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS",
      "VLSI & RTL Design",
      "Neuromorphic & Edge AI"
    ],
    "stipend": "₹5,000 – ₹8,000 / month (varies by project / center funding)",
    "stipendAmountNumeric": 6500,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – April (Annual)",
    "deadlineDescription": "Center announcements and faculty notices close in April.",
    "eligibility": "B.Tech/B.E. (2nd/3rd year), M.Sc., or M.Tech students in Electrical, Electronics, Materials, or Physics.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://iitj.ac.in/",
    "overview": "IIT Jodhpur hosts a state-of-the-art Centre of Excellence in Nanoelectronics and Sensor Technologies with advanced cleanroom microfabrication, quantum materials, and edge sensor processing.",
    "keyHighlights": [
      "Modern Class 100/1000 cleanroom with wafer dicing, thermal evaporators, and mask aligners.",
      "Cutting-edge research in 2D material sensors, Spintronics, and neuromorphic memristors.",
      "Hands-on experimental device fabrication and electrical parameter testing.",
      "Eco-friendly sustainable campus with cutting-edge academic facilities."
    ],
    "selectionProcess": "Application review by Centre faculty based on physics/circuits coursework and technical statement.",
    "deliverablesAndOutcomes": [
      "Microfabricated sensor device prototype or TCAD electrical simulation study.",
      "IIT Jodhpur Summer Research Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Centre of Excellence in Nanoelectronics & Sensor Technologies",
        "designation": "Interdisciplinary Faculty Team",
        "researchArea": "Cleanroom Nanofabrication, MEMS Gas Sensors, Flexible Electronics, Spintronics",
        "labOrGroup": "Nanoelectronics Cleanroom Facility",
        "websiteOrProfile": "https://iitj.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Demonstrate foundational knowledge in semiconductor physics and thin-film deposition.",
      "State specific interest in cleanroom experimental fabrication or TCAD simulation.",
      "Apply with a formal recommendation letter from your college department."
    ]
  },
  {
    "id": "iit-tirupati-palakkad",
    "instituteName": "Indian Institutes of Technology (IIT Tirupati & IIT Palakkad)",
    "shortName": "IIT Tirupati / Palakkad",
    "type": "IIT",
    "programName": "Summer Internship Training Program (SITP) & Microelectronics Research",
    "location": "Tirupati (Andhra Pradesh) & Palakkad (Kerala)",
    "domains": [
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "Nanoelectronics & Device Physics",
      "RISC-V & Processor Architecture"
    ],
    "stipend": "₹5,000 – ₹8,000 / month (Faculty Grants / SITP Fellowship)",
    "stipendAmountNumeric": 6000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – Mid-April (Annual)",
    "deadlineDescription": "SITP portals open in February and close in late March/April.",
    "eligibility": "Undergraduate engineering students with strong fundamentals in circuits, digital design, and signal processing.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://iitpkd.ac.in/summer-internships",
    "overview": "Third-generation IITs Tirupati and Palakkad have established high-speed computing clusters, VLSI labs, and dedicated Summer Internship Training Programs (SITP) guided by passionate young faculty.",
    "keyHighlights": [
      "High faculty-to-student attention and direct one-on-one mentorship.",
      "Modern lab setups with Xilinx Vivado, Synopsys, and Cadence EDA tools.",
      "Exciting research in RISC-V accelerators, FPGA digital signal processing, and low-power analog circuits.",
      "Active participation in MeitY C2S and national semiconductor research grants."
    ],
    "selectionProcess": "Online departmental screening based on statement of interest, GPA, and programming/hardware skills.",
    "deliverablesAndOutcomes": [
      "Verified RTL design on FPGA or custom circuit simulation layout.",
      "Formal IIT Summer Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of Electrical Engineering, IIT Palakkad",
        "designation": "Faculty in VLSI & Circuits",
        "researchArea": "VLSI Signal Processing, Analog/RFIC, Embedded Systems, Device Physics",
        "labOrGroup": "Circuits & Systems Research Group",
        "websiteOrProfile": "https://iitpkd.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Highlight concrete proficiency with Verilog HDL, Python, or MATLAB in your application.",
      "Mention availability for the entire duration on-campus in Kerala or Andhra Pradesh.",
      "Cite specific ongoing research projects from the department faculty page."
    ]
  },
  {
    "id": "iisc-bangalore-ese-cense",
    "instituteName": "Indian Institute of Science (IISc Bangalore)",
    "shortName": "IISc Bangalore",
    "type": "IISc & Premier Research",
    "programName": "DESE Project Internship & CeNSE Nanoelectronics Cleanroom Research",
    "location": "Bengaluru, Karnataka",
    "domains": [
      "Nanoelectronics & Device Physics",
      "VLSI & RTL Design",
      "Neuromorphic & Edge AI",
      "Silicon Photonics & MEMS"
    ],
    "stipend": "₹10,000 – ₹15,000 / month (CeNSE / ESE fellowships)",
    "stipendAmountNumeric": 12000,
    "duration": "8 – 16 Weeks (May – August / Semester-long)",
    "applicationWindow": "January – March (Summer) & August – October (Winter)",
    "deadlineDescription": "ESE applications close in February/March; CeNSE invites applications following their Winter/Summer School.",
    "eligibility": "Pre-final and final-year B.Tech, M.Sc, or M.Tech students in ECE, EEE, Instrumentation, or Physics with exceptional academic standing.",
    "minCgpaOrRank": "CGPA ≥ 8.5 / First Class with Distinction",
    "officialPortalUrl": "https://eecs.iisc.ac.in/academics/internships/",
    "overview": "IISc Bangalore is India's pinnacle research institution. The Department of Electronic Systems Engineering (DESE) and Centre for Nano Science and Engineering (CeNSE) host India's only national university-based 200mm semiconductor cleanroom fab and top neuromorphic hardware research.",
    "keyHighlights": [
      "World-class ₹300+ Crore National Nano Fabrication Facility (NNFC) cleanroom at CeNSE.",
      "Cutting-edge neuromorphic computing, memristor crossbar arrays, and ultra-low-power Edge AI silicon.",
      "Advanced High-Voltage GaN/SiC power device characterization and TCAD device modeling.",
      "Collaborations with Applied Materials, TSMC, Texas Instruments, and Intel Labs."
    ],
    "selectionProcess": "Rigorous faculty assessment of candidate resume, statement of research, foundational math/physics/circuits strength, and technical interview/assignment.",
    "deliverablesAndOutcomes": [
      "Hands-on cleanroom fabrication or Synopsys Sentaurus TCAD device simulation.",
      "Publication in top IEEE journals (EDL, TED, TCAS, TVLSI) or patent filing.",
      "Unmatched credential for direct PhD admissions at Stanford, MIT, ETH Zurich, or IISc."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Mayank Shrivastava",
        "designation": "Professor (DESE)",
        "researchArea": "GaN Power Devices, ESD Protection in Advanced CMOS Nodes, Quantum & Neuromorphic Devices",
        "labOrGroup": "MSDLab (Advanced Nanoelectronics & Device Physics)",
        "websiteOrProfile": "https://dese.iisc.ac.in/faculty/mayank-shrivastava/",
        "keyProjectsOrTopics": [
          "3nm/2nm Gate-All-Around (GAA) FETs",
          "Kilovolt GaN High-Power Switches"
        ]
      },
      {
        "name": "Prof. Chetan Singh Thakur",
        "designation": "Associate Professor (DESE)",
        "researchArea": "Neuromorphic VLSI, Brain-Inspired Computing, Analog/Mixed-Signal AI Silicon",
        "labOrGroup": "Neuronics Lab",
        "websiteOrProfile": "https://dese.iisc.ac.in/faculty/chetan-singh-thakur/",
        "keyProjectsOrTopics": [
          "Event-Driven Neuromorphic Vision Processors",
          "Memristive Deep Learning Accelerators"
        ]
      },
      {
        "name": "Prof. Srinivasan Raghavan",
        "designation": "Chair & Professor (CeNSE)",
        "researchArea": "2D Materials, Gallium Nitride Epitaxy, Semiconductor Cleanroom Fab",
        "labOrGroup": "CeNSE Nano-Fabrication Facility",
        "websiteOrProfile": "https://cense.iisc.ac.in/",
        "keyProjectsOrTopics": [
          "Semiconductor Thin-Films",
          "GaN on Silicon Wafer Growth"
        ]
      }
    ],
    "applicationStrategyTips": [
      "Read 2-3 recent papers published by the professor before drafting your email.",
      "Highlight concrete skills in Cadence Virtuoso, Synopsys TCAD, SPICE modeling, or Verilog/C++.",
      "Keep email under 200 words: highlight your GPA, specific project alignment, and GitHub links."
    ]
  },
  {
    "id": "tifr-mumbai-vsrp",
    "instituteName": "Tata Institute of Fundamental Research (TIFR Mumbai)",
    "shortName": "TIFR Mumbai",
    "type": "IISc & Premier Research",
    "programName": "VSRP (Visiting Students' Research Programme) in Quantum Devices & Semiconductor Physics",
    "location": "Colaba, Mumbai, Maharashtra",
    "domains": [
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS",
      "Neuromorphic & Edge AI"
    ],
    "stipend": "₹7,000 / month + Free On-Campus Hostel Accommodation + Round-Trip Travel",
    "stipendAmountNumeric": 7000,
    "duration": "8 Weeks (May – July)",
    "applicationWindow": "December – January (Annual)",
    "deadlineDescription": "VSRP application portal opens in December and closes by end of January.",
    "eligibility": "Pre-final year B.Tech/B.E., M.Sc., or Integrated M.Tech students with top academic standing in physics or electrical engineering.",
    "minCgpaOrRank": "Top 5% of class / High academic percentile",
    "officialPortalUrl": "https://www.tifr.res.in/~vsrp/",
    "overview": "TIFR Mumbai is India's national institute for fundamental and applied sciences. The Department of Condensed Matter Physics & Materials Science conducts pioneering research in quantum computing hardware, superconducting qubits, and 2D semiconductor nano-devices.",
    "keyHighlights": [
      "Subsidized on-campus hostel accommodation overlooking the Arabian Sea in South Mumbai.",
      "World-class cryogenic dilution refrigerators for sub-Kelvin quantum device testing.",
      "Direct hands-on research on superconducting transmon qubits and quantum circuits.",
      "Lectures by eminent national and international physicists and silicon scientists."
    ],
    "selectionProcess": "Highly selective national screening based on academic track record, Statement of Interest, and two faculty referee ratings.",
    "deliverablesAndOutcomes": [
      "Final research project paper presented at the VSRP Research Symposium.",
      "High-credibility recommendation letter for international top PhD programs."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Quantum Measurement and Control Lab (QuMaC)",
        "designation": "Senior Scientists & Faculty",
        "researchArea": "Superconducting Quantum Processors, Quantum Circuits, Cryogenic Microwave Hardware",
        "labOrGroup": "Department of Condensed Matter Physics",
        "websiteOrProfile": "https://www.tifr.res.in/"
      }
    ],
    "applicationStrategyTips": [
      "Ensure you have two strong referee letters submitted online before the January deadline.",
      "Demonstrate genuine curiosity and solid foundation in quantum physics, electromagnetics, or semiconductor devices.",
      "Clearly articulate why TIFR's unique experimental facilities are vital for your research goals."
    ]
  },
  {
    "id": "inst-mohali-summer",
    "instituteName": "Institute of Nano Science and Technology (INST Mohali)",
    "shortName": "INST Mohali",
    "type": "IISc & Premier Research",
    "programName": "Summer Research Internship in Nano-Devices & 2D Semiconductor Materials",
    "location": "Knowledge City, Mohali, Punjab",
    "domains": [
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS",
      "Neuromorphic & Edge AI"
    ],
    "stipend": "₹5,000 – ₹7,000 / month (Faculty project grants) / Self-funded",
    "stipendAmountNumeric": 6000,
    "duration": "2 Months (May – July)",
    "applicationWindow": "January – Mid-March (Annual)",
    "deadlineDescription": "Official summer training notification released in January/February.",
    "eligibility": "M.Sc., M.Tech, and 3rd-year B.Tech students with passion for nanoscience, 2D semiconductor physics, and Spintronics.",
    "minCgpaOrRank": "First Class with minimum 70% marks",
    "officialPortalUrl": "https://www.inst.ac.in/",
    "overview": "INST Mohali is an autonomous research institute under the Department of Science & Technology (DST). Its advanced nanoelectronics laboratories pioneer 2D semiconductor transistors (MoS2, WS2), spintronic memory, and magnetic devices.",
    "keyHighlights": [
      "Ultra-modern research facility with state-of-the-art cleanroom, AFM, XRD, and XPS instrumentation.",
      "Direct focus on post-silicon nano-devices, memristors, and energy-harvesting piezoelectric materials.",
      "Mentorship by top scientists publishing in Nature Materials, Advanced Materials, and IEEE EDL.",
      "Proximity to SCL Mohali semiconductor fab and IISER Mohali."
    ],
    "selectionProcess": "Academic screening of applications followed by project allocation by scientist committees.",
    "deliverablesAndOutcomes": [
      "Characterization data analysis or nano-device fabrication report.",
      "Official INST Summer Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Nanoelectronics & Quantum Materials Group",
        "designation": "Scientists & Faculty",
        "researchArea": "2D Semiconductors, Spintronics, Memristive Devices, Quantum Transport",
        "labOrGroup": "INST Nano-Device Fabrication Lab",
        "websiteOrProfile": "https://www.inst.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Highlight concrete lab experience with materials characterization (SEM, AFM, XRD) or device simulation.",
      "Demonstrate deep enthusiasm for 2D material electronics and non-volatile memory devices.",
      "Submit the formal application form through your college Dean/HOD."
    ]
  },
  {
    "id": "snbncbs-kolkata-summer",
    "instituteName": "S. N. Bose National Centre for Basic Sciences (SNBNCBS Kolkata)",
    "shortName": "SNBNCBS Kolkata",
    "type": "IISc & Premier Research",
    "programName": "Summer Research Programme in Spintronics, Oxide Electronics & Quantum Materials",
    "location": "Salt Lake, Kolkata, West Bengal",
    "domains": [
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS"
    ],
    "stipend": "₹2,000 / week (₹16,000 total) + Free On-Campus Accommodation",
    "stipendAmountNumeric": 8000,
    "duration": "8 Weeks (May – July)",
    "applicationWindow": "January – March (Annual)",
    "deadlineDescription": "Online portal closes by end of March.",
    "eligibility": "B.Sc./B.Tech (2nd/3rd year) and M.Sc./M.Tech students with strong fundamentals in condensed matter physics or electronics.",
    "minCgpaOrRank": "First Class academic record",
    "officialPortalUrl": "https://newweb.bose.res.in/",
    "overview": "Named after the legendary physicist Satyendra Nath Bose, SNBNCBS is an autonomous institute under DST focusing on advanced physical sciences, spintronic semiconductors, magnetic memory, and quantum materials.",
    "keyHighlights": [
      "Generous summer fellowship with free on-campus hostel and living stipend.",
      "Advanced magnetic characterization facilities (PPMS, SQUID magnetometer, cryogenic probe stations).",
      "Pioneering research in magnetic RAM (MRAM), spin valves, and oxide semiconductor heterostructures.",
      "Tranquil research environment in Kolkata's Salt Lake technology zone."
    ],
    "selectionProcess": "National online application evaluation based on academic percentile and research proposal.",
    "deliverablesAndOutcomes": [
      "Experimental research paper presented at the annual summer symposium.",
      "SNBNCBS Summer Fellowship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of Condensed Matter Physics & Material Sciences",
        "designation": "Senior Professors & Scientists",
        "researchArea": "Spintronics, Magnetic Heterostructures, Oxide Semiconductors, Quantum Devices",
        "labOrGroup": "Spintronics & Nanodevices Lab",
        "websiteOrProfile": "https://newweb.bose.res.in/"
      }
    ],
    "applicationStrategyTips": [
      "Emphasize your strong understanding of solid-state physics, magnetism, and electronic band structures.",
      "Ensure your faculty recommendation letter highlights your experimental discipline and aptitude.",
      "Apply early before the March portal deadline."
    ]
  },
  {
    "id": "csir-ceeri-pilani",
    "instituteName": "CSIR - Central Electronics Engineering Research Institute (CSIR-CEERI)",
    "shortName": "CSIR-CEERI Pilani",
    "type": "National R&D Lab / CSIR",
    "programName": "Semiconductor Fabrication, MEMS & VLSI Design Project Internship",
    "location": "Pilani, Rajasthan (with centers in Chennai & Jaipur)",
    "domains": [
      "Nanoelectronics & Device Physics",
      "VLSI & RTL Design",
      "Silicon Photonics & MEMS",
      "Embedded Systems & IoT"
    ],
    "stipend": "Academic Training / Project Fellowship (Honorary / Subsidized on-campus guesthouse)",
    "stipendAmountNumeric": 5000,
    "duration": "8 Weeks to 6 Months (Summer & Semester-long)",
    "applicationWindow": "January – April (Summer) & July – October (Winter)",
    "deadlineDescription": "Rolling admissions via the CSIR-CEERI HRD project portal.",
    "eligibility": "B.Tech/B.E. (3rd/4th year), M.Sc. (Electronics), M.Tech students in ECE, VLSI, Microelectronics, Instrumentation.",
    "minCgpaOrRank": "First Class with minimum 70% / CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.ceeri.res.in/",
    "overview": "CSIR-CEERI is India's premier national laboratory dedicated solely to advanced electronics, microelectronics processing, semiconductor fabrication, microwave tubes, and cyber-physical systems. Interns gain direct exposure to wafer fab and sensor packaging.",
    "keyHighlights": [
      "Full semiconductor cleanroom facility for MEMS sensors, Silicon Carbide (SiC) devices, and packaging.",
      "Direct government R&D projects for ISRO, DRDO, and the India Semiconductor Mission (ISM).",
      "Advanced EDA suites (Cadence Virtuoso, Synopsys Sentaurus TCAD, Ansys HFSS, CoventorWare).",
      "Deep exposure to semiconductor physics, lithography, etching, and thin-film deposition."
    ],
    "selectionProcess": "HRD screening of candidate applications followed by approval by Head of Microelectronics / VLSI Division.",
    "deliverablesAndOutcomes": [
      "Hands-on experience in cleanroom protocols, MEMS fabrication, or synthesized ASIC netlists.",
      "CSIR-CEERI Project Training Certificate and technical thesis dissertation."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Dr. P. C. Panchariya",
        "designation": "Director, CSIR-CEERI",
        "researchArea": "Cyber-Physical Systems, Intelligent Sensing, Embedded Instrumentation",
        "labOrGroup": "Directorate & Cyber-Physical Systems Group",
        "websiteOrProfile": "https://www.ceeri.res.in/"
      },
      {
        "name": "Microelectronics & MEMS Division",
        "designation": "Chief Scientists & Senior Principal Scientists",
        "researchArea": "Silicon & SiC Power Devices, MEMS Pressure Sensors, Gas Sensors, Microfluidics",
        "labOrGroup": "Semiconductor Fabrication Facility (Cleanroom)",
        "websiteOrProfile": "https://www.ceeri.res.in/"
      }
    ],
    "applicationStrategyTips": [
      "Apply with a formal No Objection Certificate (NOC) signed by your college Head of Department (HOD).",
      "Mention explicit interest in microfabrication, TCAD device simulation, or MEMS design.",
      "Reach out to the HRD coordinator well in advance of summer break."
    ]
  },
  {
    "id": "cdac-vega-riscv",
    "instituteName": "Centre for Development of Advanced Computing (C-DAC)",
    "shortName": "C-DAC",
    "type": "National R&D Lab / CSIR",
    "programName": "Work-Based Learning (WBL) & VEGA RISC-V / DIR-V Hardware Security Research",
    "location": "Bengaluru, Pune, Hyderabad, Thiruvananthapuram",
    "domains": [
      "RISC-V & Processor Architecture",
      "VLSI & RTL Design",
      "Hardware Security & Cryptography",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹10,000 / month (under MeitY Work-Based Learning Scheme)",
    "stipendAmountNumeric": 10000,
    "duration": "6 Months (Jan – June / July – Dec) & 2-Month Summer Internships",
    "applicationWindow": "November – December (Spring) & April – May (Fall/Summer)",
    "deadlineDescription": "Announced on the C-DAC Career portal and AICTE WBL portal.",
    "eligibility": "B.Tech/B.E. (7th/8th semester or recent graduates within 3 years) in ECE, CSE, IT, Electrical.",
    "minCgpaOrRank": "First Class B.Tech degree (Special category focus under MeitY WBL)",
    "officialPortalUrl": "https://www.cdac.in/",
    "overview": "C-DAC is India's national supercomputing and microelectronics mission leader under MeitY. Its hardware divisions engineered the indigenous VEGA RISC-V Processor series (32-bit and 64-bit multi-core) under the Digital India RISC-V (DIR-V) program.",
    "keyHighlights": [
      "Work on the national VEGA processor family: 32-bit Microcontrollers (THEJAS32) up to 64-bit Out-of-Order Silicon.",
      "Funded by the Ministry of Electronics & Information Technology (MeitY).",
      "Hands-on FPGA emulation boards (Xilinx Artix-7, Kintex, Zynq SoC) and silicon verification.",
      "Strong direct pipeline into full-time scientist/engineer positions across C-DAC centers."
    ],
    "selectionProcess": "Online aptitude & technical test in digital design / C programming followed by technical panel interview.",
    "deliverablesAndOutcomes": [
      "Bare-metal BSP drivers, synthesizable peripheral IP core (I2C, SPI, UART, PCIe), or SoC testbench.",
      "Govt. of India certified Work-Based Learning experience certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Hardware Design & Advanced Computing Group",
        "designation": "Senior Director & Scientist Group",
        "researchArea": "DIR-V VEGA Microprocessor Architecture, SoC Integration, Quantum Accelerators",
        "labOrGroup": "C-DAC High Performance Computing & Silicon Group",
        "websiteOrProfile": "https://vegaprocessors.in/"
      }
    ],
    "applicationStrategyTips": [
      "Master the RISC-V Unprivileged and Privileged ISA specifications.",
      "Show projects where you compiled C programs using riscv-gnu-toolchain and debugged over GDB/OpenOCD.",
      "Apply through both the official C-DAC portal and the National AICTE Internship portal."
    ]
  },
  {
    "id": "scl-mohali-foundry",
    "instituteName": "Semi-Conductor Laboratory (SCL Mohali)",
    "shortName": "SCL Mohali",
    "type": "National R&D Lab / CSIR",
    "programName": "180nm Silicon Foundry Fabrication & MEMS Traineeship",
    "location": "Mohali, Punjab (near Chandigarh)",
    "domains": [
      "Nanoelectronics & Device Physics",
      "VLSI & RTL Design",
      "Silicon Photonics & MEMS"
    ],
    "stipend": "Industrial Research Traineeship (Subsidized guesthouse accommodation)",
    "stipendAmountNumeric": 5000,
    "duration": "6 to 8 Weeks / 6-Month Semester Project",
    "applicationWindow": "January – March (Summer) & July – September (Winter)",
    "deadlineDescription": "Applications submitted via academic training cell with university HOD endorsement.",
    "eligibility": "B.Tech/B.E. (3rd/4th year) and M.Tech students in Microelectronics, VLSI, ECE, Physics.",
    "minCgpaOrRank": "First Class B.Tech / M.Tech students",
    "officialPortalUrl": "https://www.scl.gov.in/",
    "overview": "SCL Mohali is India's only operational commercial 8-inch 180nm semiconductor wafer fabrication facility. It manufactures space-grade integrated circuits and MEMS sensors for ISRO and defense missions.",
    "keyHighlights": [
      "Unprecedented direct exposure to an active 180nm CMOS semiconductor fabrication cleanroom.",
      "Hands-on learning of wafer processing, photolithography, ion implantation, and chemical vapor deposition (CVD).",
      "Testing and packaging of radiation-hardened microcontrollers and space-grade ASICs.",
      "Historic center of India's indigenous semiconductor manufacturing capabilities."
    ],
    "selectionProcess": "Official institutional nomination through university Dean/HOD followed by security clearance and technical evaluation.",
    "deliverablesAndOutcomes": [
      "Foundry process flow study, silicon defect inspection analysis, or ASIC test methodology thesis.",
      "Official Training Certificate from Semi-Conductor Laboratory (MeitY)."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "SCL Technology Development & Fab Division",
        "designation": "Chief Engineers & Scientists",
        "researchArea": "180nm CMOS Process Technology, MEMS Accelerometers, Radiation Hardening",
        "labOrGroup": "SCL 8-Inch Semiconductor Fab Facility",
        "websiteOrProfile": "https://www.scl.gov.in/"
      }
    ],
    "applicationStrategyTips": [
      "Obtain an official recommendation letter from your College Principal or Registrar.",
      "Highlight coursework in Semiconductor Device Physics, VLSI Technology, and Fabrication Processes.",
      "Submit your application packet at least 2-3 months prior to your intended start date."
    ]
  },
  {
    "id": "drdo-sspl-delhi",
    "instituteName": "Solid State Physics Laboratory (DRDO - SSPL)",
    "shortName": "DRDO SSPL",
    "type": "National R&D Lab / CSIR",
    "programName": "Advanced Semiconductor Materials, GaN MMIC & Infrared Detectors Internship",
    "location": "Timarpur, Delhi NCR",
    "domains": [
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS",
      "VLSI & RTL Design"
    ],
    "stipend": "₹5,000 / month (Paid by DRDO after milestones)",
    "stipendAmountNumeric": 5000,
    "duration": "4 Weeks to 6 Months (Summer & Long-term)",
    "applicationWindow": "November – January (Summer/Spring) & Rolling",
    "deadlineDescription": "Official DRDO portal notice closes around mid-January.",
    "eligibility": "B.Tech/B.E. (3rd/4th year), M.Sc., or M.Tech students in Electronics, Physics, Material Science, Quantum Tech, or Nanotech.",
    "minCgpaOrRank": "First Class with minimum 65% aggregate",
    "officialPortalUrl": "https://www.drdo.gov.in/drdo/labs-and-establishments/solid-state-physics-laboratory-sspl",
    "overview": "DRDO SSPL is India's premier defense laboratory specializing in solid-state materials, Gallium Nitride (GaN) Monolithic Microwave Integrated Circuits (MMICs), thermal imaging sensors, and semiconductor lasers for strategic defense applications.",
    "keyHighlights": [
      "Paid government research internship under the Ministry of Defence.",
      "Cutting-edge wide-bandgap (GaN on SiC) power transistors and RF MMIC development for radar systems.",
      "Advanced molecular beam epitaxy (MBE) and cleanroom semiconductor processing facilities.",
      "Strict adherence to defense standards, testing protocols, and radiation-tolerant packaging."
    ],
    "selectionProcess": "Online DRDO SSPL application screening, academic background verification, institutional NOC, and defense lab clearance.",
    "deliverablesAndOutcomes": [
      "Semiconductor device characterization report or RF MMIC circuit simulation thesis.",
      "Official DRDO SSPL Project Experience Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "GaN & Compound Semiconductor Technology Division",
        "designation": "Scientist 'G' & Division Heads",
        "researchArea": "GaN HEMT Transistors, Microwave Integrated Circuits, Infrared Photodetectors",
        "labOrGroup": "SSPL Advanced Semiconductor Cleanroom",
        "websiteOrProfile": "https://www.drdo.gov.in/"
      }
    ],
    "applicationStrategyTips": [
      "Apply strictly online with an official recommendation letter signed by your university Dean/Principal.",
      "Highlight knowledge in Solid State Physics, High-Frequency Electromagnetics, and Device Fabrication.",
      "Complete the paperwork early to allow time for standard defense security processing."
    ]
  },
  {
    "id": "isro-sac-ursc-microelectronics",
    "instituteName": "Indian Space Research Organisation (ISRO - SAC / URSC / VSSC)",
    "shortName": "ISRO Centers",
    "type": "National R&D Lab / CSIR",
    "programName": "Space-Grade Microelectronics, ASIC Design & Satellite Payload Traineeship",
    "location": "Ahmedabad (SAC), Bengaluru (URSC), Thiruvananthapuram (VSSC)",
    "domains": [
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "Hardware Security & Cryptography",
      "Nanoelectronics & Device Physics"
    ],
    "stipend": "Student Project Traineeship Scheme (Subsidized campus facilities)",
    "stipendAmountNumeric": 5000,
    "duration": "45 Days to 6 Months (Summer / Final Year Project)",
    "applicationWindow": "January – March (Summer) & July – September (Winter)",
    "deadlineDescription": "Official applications submitted through RESPOND / ISRO Student Training portals.",
    "eligibility": "Pre-final and final-year B.Tech / M.Tech students in ECE, Electrical, Computer Science, or Aerospace.",
    "minCgpaOrRank": "First Class with minimum 65% or CGPA ≥ 7.0",
    "officialPortalUrl": "https://www.isro.gov.in/InternshipProject.html",
    "overview": "ISRO's premier centers (Space Applications Centre Ahmedabad, U R Rao Satellite Centre Bengaluru, Vikram Sarabhai Space Centre) design India's mission-critical spaceborne ASICs, radiation-hardened microcontrollers, FPGA telemetry systems, and synthetic aperture radar (SAR) payloads.",
    "keyHighlights": [
      "Work on actual space-grade flight hardware architectures for Chandrayaan, Gaganyaan, and NavIC satellites.",
      "Rigorous fault-tolerance, single-event upset (SEU) mitigation, and triple modular redundancy (TMR) design.",
      "Access to space-qualification testbenches, thermal-vacuum chambers, and radiation simulation suites.",
      "Supervision by top ISRO space scientists and payload chief engineers."
    ],
    "selectionProcess": "Official college nomination and screening based on academic merit, statement of intent, and center-specific scientist availability.",
    "deliverablesAndOutcomes": [
      "Flight-standard synthesizable RTL core, DSP radar filtering block, or satellite telemetry driver.",
      "Official ISRO Student Project Certificate signed by Division Head."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Microelectronics & Payload Processing Group",
        "designation": "Outstanding Scientists & Group Directors",
        "researchArea": "Space ASICs, Radiation-Hardened DSPs, NavIC Baseband Receivers, FPGA Telemetry",
        "labOrGroup": "SAC / URSC Digital Electronics & ASIC Division",
        "websiteOrProfile": "https://www.isro.gov.in/"
      }
    ],
    "applicationStrategyTips": [
      "Obtain an institutional sponsorship letter printed on college letterhead with official seal.",
      "Highlight expertise in Triple Modular Redundancy (TMR), FPGA synthesis, and digital signal processing.",
      "Apply at least 3-4 months prior to your proposed start date."
    ]
  },
  {
    "id": "iiit-hyderabad-cvit-vlsi",
    "instituteName": "International Institute of Information Technology Hyderabad (IIIT Hyderabad)",
    "shortName": "IIIT Hyderabad",
    "type": "IIIT",
    "programName": "iHub-Data Young Research Internship & CVEST VLSI Design Research",
    "location": "Gachibowli, Hyderabad, Telangana",
    "domains": [
      "Neuromorphic & Edge AI",
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "RISC-V & Processor Architecture"
    ],
    "stipend": "₹10,000 / month (varies by project funding / iHub-Data programs)",
    "stipendAmountNumeric": 10000,
    "duration": "2 to 6 Months (Summer & Long-term)",
    "applicationWindow": "February – April (Summer) & Year-Round Rolling",
    "deadlineDescription": "Announced on IIIT-H research portals and faculty lab websites.",
    "eligibility": "Pre-final or final-year B.Tech / M.Tech students with strong fundamentals in programming, digital design, and edge computing.",
    "minCgpaOrRank": "CGPA ≥ 8.0 / Strong GitHub evidence",
    "officialPortalUrl": "https://www.iiit.ac.in/research/",
    "overview": "IIIT Hyderabad is an elite computer science and hardware research institute. The Center for VLSI and Embedded Systems Technologies (CVEST) and iHub-Data develop high-performance edge hardware for computer vision, robotics, and deep neural network acceleration.",
    "keyHighlights": [
      "Pioneering Edge AI architectures and hardware accelerators for real-time vision processing.",
      "Close collaboration with fabless semiconductor firms in Hyderabad's tech corridor.",
      "World-class research environment with 24/7 lab access and high-performance computing clusters.",
      "Direct guidance from faculty actively publishing in top IEEE and ACM conferences."
    ],
    "selectionProcess": "Coding / hardware assignment followed by interview with lab research scientists.",
    "deliverablesAndOutcomes": [
      "Synthesized Edge AI neural network accelerator or FPGA-based computer vision hardware.",
      "Joint research publication or conference paper submission."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Center for VLSI and Embedded Systems Technologies (CVEST)",
        "designation": "Faculty & Research Scientists",
        "researchArea": "Digital VLSI, Hardware-Software Co-Design, Edge AI Acceleration, Low-Power Embedded Systems",
        "labOrGroup": "CVEST Research Lab",
        "websiteOrProfile": "https://cvest.iiit.ac.in/"
      },
      {
        "name": "iHub-Data (Technology Innovation Hub)",
        "designation": "Research Directors & Mentors",
        "researchArea": "Edge Computing, Smart Mobility Hardware, IoT Edge Devices",
        "labOrGroup": "iHub-Data Innovation Center",
        "websiteOrProfile": "https://ihub-data.ai/"
      }
    ],
    "applicationStrategyTips": [
      "Highlight concrete experience with Python, PyTorch/TensorFlow, and Verilog HDL for hardware acceleration.",
      "Demonstrate past implementations of systolic arrays, matrix multipliers, or custom DSP datapaths.",
      "Check individual faculty lab pages for open student research positions."
    ]
  },
  {
    "id": "iiit-bangalore-cvest",
    "instituteName": "International Institute of Information Technology Bangalore (IIIT Bangalore)",
    "shortName": "IIIT Bangalore",
    "type": "IIIT",
    "programName": "Open-Source Silicon, RISC-V & VLSI Summer Research Fellowships",
    "location": "Electronics City, Bengaluru, Karnataka",
    "domains": [
      "EDA Tools & Open-Source Silicon",
      "RISC-V & Processor Architecture",
      "VLSI & RTL Design",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹10,000 – ₹15,000 / month (varies by research project)",
    "stipendAmountNumeric": 12000,
    "duration": "8 – 12 Weeks (May – July)",
    "applicationWindow": "February – April (Annual)",
    "deadlineDescription": "Faculty project listings posted on IIIT-B portal between February and April.",
    "eligibility": "B.Tech/B.E./M.Tech students with passion for open-source EDA, RISC-V processor design, and physical design.",
    "minCgpaOrRank": "CGPA ≥ 8.0",
    "officialPortalUrl": "https://www.iiitb.ac.in/",
    "overview": "Located in Bengaluru's Electronics City hub, IIIT Bangalore is a national leader in open-source silicon innovation, tape-outs using Google-SkyWater 130nm PDKs, OpenLane flow, and RISC-V SoC design alongside Prof. Madhav Rao and team.",
    "keyHighlights": [
      "Pioneers of multi-project wafer (MPW) tape-outs on open-source SkyWater 130nm & GF180MCU PDKs.",
      "Hands-on expertise in open-source ASIC flows: Yosys, OpenROAD, Magic, KLayout, and Netgen.",
      "Direct proximity to Intel, Texas Instruments, Qualcomm, and Apple R&D centers in Bengaluru.",
      "Active leadership in National Semiconductor Roadmaps and Open-Source Silicon workshops."
    ],
    "selectionProcess": "Faculty review of GitHub code, past Verilog/OpenLane design runs, and short online technical interview.",
    "deliverablesAndOutcomes": [
      "GDSII layout of a custom silicon accelerator tapeout-ready for open-source MPW shuttles.",
      "GitHub repository with complete verification suite and documentation."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Prof. Madhav Rao",
        "designation": "Professor (ECE)",
        "researchArea": "VLSI Architectures, Open-Source Silicon Design, Emerging Devices & Spintronics, RRAM",
        "labOrGroup": "VLSI & Emerging Technologies Lab",
        "websiteOrProfile": "https://www.iiitb.ac.in/faculty/madhav-rao",
        "keyProjectsOrTopics": [
          "Open-Source RISC-V SoCs",
          "SkyWater 130nm ASIC Tape-Outs",
          "Compute-in-Memory"
        ]
      },
      {
        "name": "Prof. Subir Kumar Saha",
        "designation": "Professor (ECE)",
        "researchArea": "Embedded Systems, Sensors & Sensor Networks, Robotics Hardware",
        "labOrGroup": "Embedded Systems Lab",
        "websiteOrProfile": "https://www.iiitb.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Demonstrate completion of at least one OpenLane RTL-to-GDSII flow run on GitHub.",
      "Show familiarity with SkyWater 130nm or IHP 130nm open-source PDKs.",
      "Reach out directly with a clear summary of which custom IP block you want to harden."
    ]
  },
  {
    "id": "iiit-delhi-srip",
    "instituteName": "Indraprastha Institute of Information Technology Delhi (IIIT Delhi)",
    "shortName": "IIIT Delhi",
    "type": "IIIT",
    "programName": "Summer Research Internship Program (SRIP) & VLSI Embedded Systems Lab",
    "location": "Okhla Industrial Estate, New Delhi",
    "domains": [
      "VLSI & RTL Design",
      "Neuromorphic & Edge AI",
      "Embedded Systems & IoT",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹5,000 / month + On-campus hostel availability",
    "stipendAmountNumeric": 5000,
    "duration": "8 Weeks (May 11 – July 10)",
    "applicationWindow": "February 18 – March 15 (Annual)",
    "deadlineDescription": "Central online portal opens in February and closes mid-March.",
    "eligibility": "B.Tech / M.Tech students from institutions other than IIIT Delhi with strong engineering background.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.iiitd.ac.in/",
    "overview": "IIIT Delhi conducts top-tier research in VLSI, Edge AI accelerators, wireless physical layers, and cyber-physical systems. The SRIP program pairs external students with faculty on high-impact research projects.",
    "keyHighlights": [
      "Centralized SRIP portal with detailed faculty project descriptions across VLSI and Embedded Systems.",
      "Cutting-edge EDA toolchains and FPGA emulation boards in modern Okhla campus.",
      "Strong research synergies with Delhi-NCR semiconductor MNCs and research centers.",
      "Option to extend summer findings into co-authored IEEE conference publications."
    ],
    "selectionProcess": "Online project-wise application evaluated directly by project faculty mentors.",
    "deliverablesAndOutcomes": [
      "RTL implementation, TinyML model compression ASIC, or FPGA hardware demo.",
      "Official IIIT Delhi Summer Research Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of ECE, IIIT Delhi",
        "designation": "ECE & VLSI Faculty Members",
        "researchArea": "Low-Power VLSI, Embedded Systems, Edge AI, Cyber-Physical Systems",
        "labOrGroup": "ECE Research Laboratories",
        "websiteOrProfile": "https://ece.iiitd.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Select 2-3 specific project codes on the SRIP portal that match your digital or embedded skills.",
      "Tailor your statement of purpose to the specific hardware problem listed in the project call.",
      "Ensure your GitHub repository has clean Verilog/C++ code samples."
    ]
  },
  {
    "id": "iiit-allahabad-summer",
    "instituteName": "Indian Institute of Information Technology Allahabad (IIIT Allahabad)",
    "shortName": "IIIT Allahabad",
    "type": "IIIT",
    "programName": "Microelectronics, VLSI & Sensor Systems Summer Research Internship",
    "location": "Jhalwa, Prayagraj, Uttar Pradesh",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 / month (varies by faculty project grant) / Self-funded",
    "stipendAmountNumeric": 5000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "March – Mid-April (Annual)",
    "deadlineDescription": "Departmental notifications close in mid-April.",
    "eligibility": "B.Tech/B.E. (2nd/3rd year) in ECE, CSE, IT, or related fields from recognized Indian institutes.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://ece.iiita.ac.in/",
    "overview": "IIIT Allahabad's Department of Electronics and Communication Engineering has dedicated research groups in microelectronics, device modeling (FinFET, GAA-FET), VLSI architectures, and embedded IoT networks.",
    "keyHighlights": [
      "Well-equipped Microelectronics & VLSI Lab with Cadence and Synopsys tool licenses.",
      "Active research in multi-gate MOSFETs, low-power SRAM cells, and wireless sensor nodes.",
      "Close-knit research mentorship in a green residential campus.",
      "Subsidized hostel accommodation during summer months."
    ],
    "selectionProcess": "Faculty screening of candidate CV and relevant coursework.",
    "deliverablesAndOutcomes": [
      "Simulation dataset or synthesized RTL IP core module.",
      "Official IIIT Allahabad Summer Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of ECE, IIIT Allahabad",
        "designation": "Professors & Associate Professors",
        "researchArea": "Multi-Gate Transistors, SRAM Reliability, Embedded Systems, IoT Silicon",
        "labOrGroup": "Microelectronics & VLSI Research Group",
        "websiteOrProfile": "https://ece.iiita.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Reach out directly to ECE faculty members in March with your CV and project links.",
      "Mention your familiarity with digital logic synthesis or SPICE device modeling.",
      "Provide strong references from your home university."
    ]
  },
  {
    "id": "bits-pilani-microelectronics",
    "instituteName": "Birla Institute of Technology and Science (BITS Pilani - Pilani, Goa, Hyderabad)",
    "shortName": "BITS Pilani Campuses",
    "type": "BITS & Premier Universities",
    "programName": "Summer Research Fellowship & Microelectronics / MEMS Laboratories",
    "location": "Pilani (Rajasthan), Goa, Hyderabad (Telangana)",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Silicon Photonics & MEMS",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹8,000 – ₹12,000 / month (Funded research projects / Faculty grants)",
    "stipendAmountNumeric": 10000,
    "duration": "8 – 10 Weeks (May – July)",
    "applicationWindow": "February – Late March (Annual)",
    "deadlineDescription": "Individual department notices and faculty calls close in March.",
    "eligibility": "B.E./B.Tech (2nd/3rd year) and M.E./M.Tech students with passion for VLSI, MEMS, and analog circuits.",
    "minCgpaOrRank": "CGPA ≥ 8.0",
    "officialPortalUrl": "https://www.bits-pilani.ac.in/",
    "overview": "BITS Pilani across its three Indian campuses has one of the strongest alumni and research networks in global semiconductor giants (Intel, Qualcomm, Nvidia, TI, AMD). Its EEE departments host premier cleanrooms, MEMS centers, and VLSI testbenches.",
    "keyHighlights": [
      "State-of-the-art MEMS and microfluidics fabrication cleanroom at BITS Pilani and Hyderabad campuses.",
      "Deep industry linkages and joint research projects with leading multinational semiconductor companies.",
      "Active research in Analog/Mixed-Signal design, Energy-Efficient VLSI, and RF microelectronics.",
      "Extensive EDA tool access (Cadence, Synopsys, Mentor Graphics, Ansys HFSS)."
    ],
    "selectionProcess": "Direct faculty review of student research proposal, GitHub hardware portfolio, and academic record.",
    "deliverablesAndOutcomes": [
      "Synthesized FPGA design, Analog layout in Cadence Virtuoso, or MEMS simulation thesis.",
      "BITS Pilani Research Fellowship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of EEE, BITS Pilani (Pilani Campus)",
        "designation": "Faculty & Senior Professors",
        "researchArea": "VLSI Architectures, MEMS, Analog IC Design, Embedded Systems",
        "labOrGroup": "Microelectronics & MEMS Lab",
        "websiteOrProfile": "https://www.bits-pilani.ac.in/pilani/electrical-and-electronics-engineering/"
      },
      {
        "name": "Department of EEE, BITS Pilani (Hyderabad Campus)",
        "designation": "Faculty in VLSI & Microelectronics",
        "researchArea": "Nanoelectronics, RFIC Design, Spintronics, Neuromorphic Hardware",
        "labOrGroup": "Advanced VLSI Design Lab",
        "websiteOrProfile": "https://www.bits-pilani.ac.in/hyderabad/"
      }
    ],
    "applicationStrategyTips": [
      "Contact specific faculty mentors at Pilani, Goa, or Hyderabad campuses in February.",
      "Demonstrate hands-on proficiency in Cadence Virtuoso, Vivado, or LTspice.",
      "Highlight concrete circuit designs or Verilog repositories on your GitHub profile."
    ]
  },
  {
    "id": "nit-trichy-vlsi",
    "instituteName": "National Institute of Technology Tiruchirappalli (NIT Trichy)",
    "shortName": "NIT Trichy",
    "type": "NIT",
    "programName": "Summer Research Internship & VLSI Systems Laboratory",
    "location": "Tiruchirappalli, Tamil Nadu",
    "domains": [
      "VLSI & RTL Design",
      "Embedded Systems & IoT",
      "Nanoelectronics & Device Physics",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹5,000 – ₹10,000 / month (Faculty Grants / Dean R&C)",
    "stipendAmountNumeric": 7500,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – April (Annual)",
    "deadlineDescription": "Dean (Research & Consultancy) notifications posted between Feb and April.",
    "eligibility": "B.Tech/B.E. 2nd and 3rd-year students in ECE, EEE, CSE, or Instrumentation.",
    "minCgpaOrRank": "CGPA ≥ 8.0",
    "officialPortalUrl": "https://www.nitt.edu/",
    "overview": "NIT Trichy is consistently ranked as India's #1 National Institute of Technology. The Department of ECE hosts modern microelectronics and embedded systems laboratories with high-speed FPGA testbenches, Cadence EDA suites, and active research in wireless communications.",
    "keyHighlights": [
      "Ranked #1 among all NITs in India with top-tier placement and research credentials.",
      "Dedicated VLSI CAD and FPGA hardware setups with high-speed testing oscilloscopes.",
      "Hands-on research projects in IoT sensor nodes, FPGA DSP accelerators, and low-power circuits.",
      "Accessible application process through departmental Dean (Research & Consultancy) portals."
    ],
    "selectionProcess": "Departmental committee review of candidate academic performance, statement of purpose, and faculty project match.",
    "deliverablesAndOutcomes": [
      "Project implementation demo on FPGA / microcontroller boards.",
      "Official Certificate of Summer Research from Dean (Research & Consultancy)."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of ECE, NIT Trichy",
        "designation": "Professors & Associate Professors",
        "researchArea": "VLSI Architectures, Digital System Design, Wireless Sensor Networks",
        "labOrGroup": "VLSI Design & Embedded Systems Lab",
        "websiteOrProfile": "https://www.nitt.edu/home/academics/departments/ece/"
      }
    ],
    "applicationStrategyTips": [
      "Check the Dean (R&C) notifications of NIT Trichy between February and April.",
      "Contact individual professors whose research matches your specific hardware interest with your CV and project links.",
      "Highlight concrete skills in Verilog, MATLAB, Keil/STM32, or LTspice."
    ]
  },
  {
    "id": "nitk-surathkal-vlsi",
    "instituteName": "National Institute of Technology Karnataka (NITK Surathkal)",
    "shortName": "NITK Surathkal",
    "type": "NIT",
    "programName": "Summer Research Internship & Microelectronics / RFIC Lab",
    "location": "Surathkal, Mangalore, Karnataka",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 – ₹8,000 / month (varies by project funding)",
    "stipendAmountNumeric": 6500,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – Mid-April (Annual)",
    "deadlineDescription": "Dean (R&C) and departmental notices close in April.",
    "eligibility": "B.Tech/B.E. 2nd/3rd year students from recognized technical institutions.",
    "minCgpaOrRank": "CGPA ≥ 8.0",
    "officialPortalUrl": "https://ece.nitk.ac.in/",
    "overview": "NITK Surathkal has a rich heritage of microelectronics and RFIC research. The Department of E&C is equipped with full Cadence, Synopsys, and Ansys simulation clusters, FPGA prototyping systems, and high-frequency network analyzers.",
    "keyHighlights": [
      "Stunning beach-side campus with state-of-the-art academic laboratories.",
      "Top research in RFIC front-ends, low-noise amplifiers (LNA), and high-speed digital VLSI.",
      "Active student chapters in IEEE Solid-State Circuits Society (SSCS) and Circuits & Systems (CAS).",
      "Strong placements and research alumni in Texas Instruments, Qualcomm, and Nvidia."
    ],
    "selectionProcess": "Faculty screening of candidate CV, transcript, and statement of research.",
    "deliverablesAndOutcomes": [
      "RF / VLSI circuit simulation netlist or FPGA demo board validation.",
      "Official NITK Summer Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of E&C, NIT Surathkal",
        "designation": "Professors & Associate Professors",
        "researchArea": "Microelectronics, RFIC Design, Signal Processing Hardware",
        "labOrGroup": "Microelectronics & VLSI Lab",
        "websiteOrProfile": "https://ece.nitk.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Email E&C faculty members in February/March referencing their specific RF or VLSI publications.",
      "Highlight concrete skills in SPICE simulations, Cadence Virtuoso, or Verilog HDL.",
      "Demonstrate consistent academic track record in electronic circuit courses."
    ]
  },
  {
    "id": "nit-warangal-vlsi",
    "instituteName": "National Institute of Technology Warangal (NIT Warangal)",
    "shortName": "NIT Warangal",
    "type": "NIT",
    "programName": "Summer Internship & Center for VLSI and Embedded Systems",
    "location": "Warangal, Telangana",
    "domains": [
      "VLSI & RTL Design",
      "RISC-V & Processor Architecture",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 – ₹8,000 / month (Faculty Grants / Dean R&C)",
    "stipendAmountNumeric": 6500,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – April (Annual)",
    "deadlineDescription": "Announced on the NIT Warangal R&C portal in February/March.",
    "eligibility": "Undergraduate engineering students with strong background in digital design and embedded systems.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.nitw.ac.in/",
    "overview": "NIT Warangal is renowned for its high-caliber engineering training. The Department of ECE hosts the Center for VLSI and Embedded Systems with extensive FPGA hardware racks, ASIC design flows, and smart embedded sensor development.",
    "keyHighlights": [
      "Premier historic NIT with deep connections to Hyderabad's semiconductor ecosystem.",
      "Hands-on training on Xilinx Zynq UltraScale+ MPSoC and Artix-7 FPGA boards.",
      "Active research in hardware acceleration, cryptographic coprocessors, and digital DSP arithmetic.",
      "Low cost of living and on-campus hostel availability during summer."
    ],
    "selectionProcess": "Departmental review of online application, transcript, and technical skill set.",
    "deliverablesAndOutcomes": [
      "FPGA prototype or synthesized ASIC IP module with complete verification testbench.",
      "Official Certificate of Summer Research from NIT Warangal."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of ECE, NIT Warangal",
        "designation": "Faculty in VLSI & Embedded Systems",
        "researchArea": "Digital VLSI Design, Processor Architecture, Embedded IoT, Cryptographic Hardware",
        "labOrGroup": "Center for VLSI and Embedded Systems",
        "websiteOrProfile": "https://www.nitw.ac.in/department/ece"
      }
    ],
    "applicationStrategyTips": [
      "Submit your application through the official Dean (R&C) portal in February.",
      "Mention concrete experience with FPGA design tools (Vivado/Quartus) and SystemVerilog.",
      "Include links to verifiable GitHub projects in your resume."
    ]
  },
  {
    "id": "nit-calicut-vlsi",
    "instituteName": "National Institute of Technology Calicut (NIT Calicut)",
    "shortName": "NIT Calicut",
    "type": "NIT",
    "programName": "Summer Research Internship & Nanoelectronics / VLSI Research Group",
    "location": "Kozhikode (Calicut), Kerala",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 – ₹7,500 / month (varies by project funding)",
    "stipendAmountNumeric": 6000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – April (Annual)",
    "deadlineDescription": "Departmental notices released on NIT Calicut website in March.",
    "eligibility": "B.Tech/B.E. 2nd/3rd year students with strong interest in semiconductor devices and digital circuits.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://nitc.ac.in/",
    "overview": "NIT Calicut's Department of ECE conducts prominent research in nanoelectronics, multi-gate device modeling, low-power digital VLSI, and embedded IoT architectures with modern lab infrastructure.",
    "keyHighlights": [
      "Comprehensive EDA software environment (Cadence, Synopsys, Mentor, Silvaco).",
      "Active research in 2D material electronics, energy-efficient logic, and biomedical sensors.",
      "Serene campus in the foothills of the Western Ghats with strong academic culture.",
      "Hostel accommodation provided during the summer period."
    ],
    "selectionProcess": "Faculty screening of candidate profiles based on academic merit and statement of intent.",
    "deliverablesAndOutcomes": [
      "Circuit simulation dataset or functional Verilog testbench on GitHub.",
      "Official NIT Calicut Summer Internship Certificate."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of ECE, NIT Calicut",
        "designation": "Faculty in Microelectronics & VLSI",
        "researchArea": "Semiconductor Device Modeling, Low-Power VLSI, Embedded Systems, Sensor Networks",
        "labOrGroup": "Microelectronics & VLSI Research Group",
        "websiteOrProfile": "https://nitc.ac.in/department/electronics-communication-engineering"
      }
    ],
    "applicationStrategyTips": [
      "Email ECE faculty members in February/March with a concise 1-page CV.",
      "Highlight specific software experience in Cadence Virtuoso, Silvaco, or Vivado.",
      "Explain how your skills align with their ongoing publications."
    ]
  },
  {
    "id": "nit-rourkela-sip",
    "instituteName": "National Institute of Technology Rourkela (NIT Rourkela)",
    "shortName": "NIT Rourkela",
    "type": "NIT",
    "programName": "Summer Internship Programme (SIP) & VLSI Design and Nanoelectronics Lab",
    "location": "Rourkela, Odisha",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 / month (Faculty Grants) / Self-funded with hostel facility",
    "stipendAmountNumeric": 5000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "March – Mid-April (Annual)",
    "deadlineDescription": "Official SIP portal applications close in mid-April.",
    "eligibility": "B.Tech/B.E. 2nd/3rd year and M.Sc./M.Tech students from recognized Indian colleges.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.nitrkl.ac.in/",
    "overview": "NIT Rourkela is one of India's largest national institutes of technology. The Department of ECE and Department of Ceramic/Materials Engineering house advanced research in VLSI architectures, GaN/SiC device physics, and embedded wireless nodes.",
    "keyHighlights": [
      "Centralized Summer Internship Programme (SIP) with formal institute certification.",
      "Extensive fabrication equipment, thin-film sputtering, and cleanroom characterization tools.",
      "Active research in asynchronous VLSI design, fault-tolerant architectures, and low-power memories.",
      "Vast green campus with subsidized hostel and mess facilities."
    ],
    "selectionProcess": "Online application through NIT Rourkela SIP portal and faculty mentor evaluation.",
    "deliverablesAndOutcomes": [
      "Synthesized FPGA design or device parameter extraction report.",
      "Official Certificate of Summer Internship from Dean (Academic), NIT Rourkela."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Department of ECE, NIT Rourkela",
        "designation": "Professors & Associate Professors",
        "researchArea": "VLSI Signal Processing, Microelectronics, Embedded Systems, Reconfigurable Hardware",
        "labOrGroup": "VLSI Design & Nanoelectronics Lab",
        "websiteOrProfile": "https://www.nitrkl.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Apply strictly through the NIT Rourkela SIP online portal before the April deadline.",
      "Indicate your top faculty preferences in the Department of ECE.",
      "Ensure your statement of purpose highlights your digital design or device simulation skills."
    ]
  },
  {
    "id": "mnit-jaipur-vnit-nagpur",
    "instituteName": "MNIT Jaipur & VNIT Nagpur",
    "shortName": "MNIT Jaipur / VNIT Nagpur",
    "type": "NIT",
    "programName": "VLSI Design Center & Center for VLSI and Nanotechnology (CVN) Internships",
    "location": "Jaipur (Rajasthan) & Nagpur (Maharashtra)",
    "domains": [
      "VLSI & RTL Design",
      "Nanoelectronics & Device Physics",
      "Embedded Systems & IoT"
    ],
    "stipend": "₹5,000 – ₹7,500 / month (Faculty Grants / Center Fellowships)",
    "stipendAmountNumeric": 6000,
    "duration": "6 – 8 Weeks (May – July)",
    "applicationWindow": "February – Mid-April (Annual)",
    "deadlineDescription": "Departmental notifications close in April.",
    "eligibility": "B.Tech/B.E. 2nd/3rd year students in ECE, EEE, Nanotech, or Physics.",
    "minCgpaOrRank": "CGPA ≥ 7.5",
    "officialPortalUrl": "https://www.mnit.ac.in/",
    "overview": "MNIT Jaipur houses the premier Materials Research Center (MRC) and VLSI Design Center, while VNIT Nagpur hosts the specialized Center for VLSI and Nanotechnology (CVN), providing cutting-edge cleanroom fabrication and ASIC backend design.",
    "keyHighlights": [
      "Specialized Centers for VLSI and Nanotechnology with dedicated cleanroom facilities.",
      "State-of-the-art Cadence, Synopsys, and Silvaco TCAD EDA toolchains.",
      "Active research in FinFETs, 2D material photodetectors, and low-power digital signal processors.",
      "Excellent mentorship and accessible application process for non-NIT students."
    ],
    "selectionProcess": "Departmental faculty screening based on academic record and technical statement.",
    "deliverablesAndOutcomes": [
      "Device simulation study or FPGA synthesized hardware demo.",
      "Official Certificate of Summer Research from MNIT / VNIT."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Center for VLSI and Nanotechnology, VNIT Nagpur",
        "designation": "Faculty & Researchers",
        "researchArea": "Nanoelectronics, FinFET Modeling, Low-Power VLSI, Embedded Systems",
        "labOrGroup": "CVN Research Center",
        "websiteOrProfile": "https://vnit.ac.in/"
      },
      {
        "name": "VLSI Design Center, MNIT Jaipur",
        "designation": "Professors in ECE",
        "researchArea": "Digital System Design, Analog ICs, Materials Characterization, Embedded Hardware",
        "labOrGroup": "ECE VLSI Design Center",
        "websiteOrProfile": "https://www.mnit.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Contact faculty at MNIT Jaipur or VNIT Nagpur with your 1-page CV and project links in March.",
      "State explicit interest in TCAD device physics or Verilog/FPGA digital design.",
      "Attach strong recommendations from your college professors."
    ]
  },
  {
    "id": "iasc-insa-nasi-srfp",
    "instituteName": "Indian Academy of Sciences (IASc-INSA-NASI)",
    "shortName": "IASc-INSA-NASI",
    "type": "National Academy Fellowship",
    "programName": "Focus Area Summer Research Fellowship Programme (SRFP)",
    "location": "Pan-India (Host Scientists at IISc, IITs, TIFR, CSIR Labs, etc.)",
    "domains": [
      "Nanoelectronics & Device Physics",
      "VLSI & RTL Design",
      "Silicon Photonics & MEMS",
      "Hardware Security & Cryptography"
    ],
    "stipend": "₹12,000 – ₹15,000 / month + Round-trip Train Travel Reimbursement",
    "stipendAmountNumeric": 12000,
    "duration": "8 Consecutive Weeks (between May and August)",
    "applicationWindow": "September – Mid-November (Annual Pre-Year Cycle)",
    "deadlineDescription": "Opens in late September; closes strictly by November 15 for the next summer.",
    "eligibility": "Undergraduate (2nd/3rd year B.Tech, B.Sc) and Postgraduate (1st year M.Tech, M.Sc) students studying in any recognized Indian college.",
    "minCgpaOrRank": "Consistent First Class record (≥ 70% or CGPA ≥ 7.5) from 10th standard onwards",
    "officialPortalUrl": "https://web-japps.ias.ac.in/fellowship2025/",
    "overview": "The joint Summer Research Fellowship Programme of India's three national science academies (IASc Bengaluru, INSA New Delhi, NASI Prayagraj) is the most prestigious national fellowship in India. Selected fellows are matched with Academy Fellows across IISc, IITs, and CSIR laboratories.",
    "keyHighlights": [
      "Pan-India placement with prestigious Academy Fellows (top Scientists & Professors in India).",
      "Round-trip sleeper train fare reimbursement and monthly living stipend provided.",
      "One of the most respected accolades on any academic resume for higher education and R&D jobs.",
      "Mentorship by legendary scientists in physical electronics, materials, and digital design."
    ],
    "selectionProcess": "Rigorous national evaluation of applicant academic track record, 150-250 word Statement of Purpose, and Teacher recommendation.",
    "deliverablesAndOutcomes": [
      "Comprehensive research report approved by the Academy Guide.",
      "Formal Fellowship Certificate from the Indian Academy of Sciences."
    ],
    "notableFacultyAndLabs": [
      {
        "name": "Pan-India Academy Fellows",
        "designation": "Elected Fellows of IASc / INSA / NASI",
        "researchArea": "Semiconductor Physics, Microelectronics, Quantum Transport, Nanotechnology",
        "labOrGroup": "IISc, IIT Bombay, IIT Madras, TIFR, CSIR-NPL, CSIR-CEERI",
        "websiteOrProfile": "https://www.ias.ac.in/"
      }
    ],
    "applicationStrategyTips": [
      "Write an exceptional 200-word Statement of Purpose clearly detailing your research interests in semiconductor/VLSI.",
      "Select 3 Academy Guides from the official list whose recent research perfectly aligns with your skills.",
      "Ensure your faculty referee submits their letter of recommendation before the mid-November deadline."
    ]
  }
];

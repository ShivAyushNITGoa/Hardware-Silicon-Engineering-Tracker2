export interface SalaryBenchmark {
  experienceLevel: 'Entry (0-2 yrs)' | 'Mid-Level (3-6 yrs)' | 'Senior / Lead (7-11 yrs)' | 'Principal / Architect (12+ yrs)';
  indiaLpaRange: string;
  indiaMedianLpa: string;
  globalUsdRange: string;
  keyDrivers: string[];
}

export interface HardwareKit {
  partNumber: string;
  name: string;
  manufacturer: string;
  category: 'Evaluation Board' | 'Sensor / Peripheral' | 'Test & Measurement' | 'SDR / RF';
  approxPriceInr: string;
  approxPriceUsd: string;
  significance: string;
  keyProjectsSupported: string[];
}

export interface IndustryStandard {
  code: string;
  title: string;
  issuingBody: 'ISO' | 'IEEE' | 'IEC' | 'IPC' | '3GPP' | 'UL' | 'SAE' | 'CISPR';
  scope: string;
  interviewRelevance: string;
}

export interface IndianRdCenter {
  company: string;
  location: string;
  labFocus: string;
  hiringRoles: string[];
}

export interface DailyDeliverable {
  name: string;
  frequency: string;
  toolUsed: string;
  description: string;
}

export interface AcademicPathway {
  recommendedElectives: string[];
  benchmarkTextbooks: Array<{ title: string; author: string; focus: string }>;
  nptelCourseraCourses: Array<{ name: string; institutionOrProf: string; platform: string }>;
}

export interface EceEeeCareerField {
  id: string;
  number: number;
  title: string;
  tagline: string;
  departmentFocus: 'ECE' | 'EEE' | 'Both';
  engineeringFocusFull: string;
  skillPrerequisites: string[];
  marketDemand: string;
  marketDemandTier: 'Massive' | 'Very High' | 'High' | 'Stable';
  overview: string;
  coreAreas: string[];
  keyTechnologies: string[];
  majorEmployers: string[];
  industryTools: Array<{
    name: string;
    category: string;
    description: string;
  }>;
  curatedProjects: Array<{
    title: string;
    difficulty: 'Intermediate' | 'Advanced' | 'Industry-Grade';
    description: string;
    technologies: string[];
  }>;
  vlsiEmbeddedConnection: string;
  careerProgression: Array<{
    level: string;
    typicalTitles: string[];
    focus: string;
  }>;
  interviewDrills: string[];
  // Real Data Enrichments
  salaryBenchmarks: SalaryBenchmark[];
  hardwareKits: HardwareKit[];
  industryStandards: IndustryStandard[];
  indianRdCenters: IndianRdCenter[];
  dailyDeliverables: DailyDeliverable[];
  academicPathway: AcademicPathway;
}

export const ECE_EEE_CAREER_FIELDS: EceEeeCareerField[] = [
  {
    id: 'telecom-wireless',
    number: 1,
    title: 'Telecommunications and 5G/6G Wireless Networks',
    tagline: 'High-frequency wireless infrastructure, massive MIMO beamforming, mmWave propagation & SDN architectures',
    departmentFocus: 'ECE',
    engineeringFocusFull: 'ECE (Signals & Networks)',
    skillPrerequisites: ['Digital Communication', 'RF Engineering', 'C++ / Python', 'Electromagnetics'],
    marketDemand: 'High (5G/6G Expansion)',
    marketDemandTier: 'High',
    overview: 'Focuses on the infrastructure and protocols required to transfer data wirelessly over high frequencies. With the global rollout of 5G Standalone (SA) and active research into sub-THz 6G networks, this field is critical for global connectivity, ultra-reliable low-latency communications (URLLC), and massive IoT networks.',
    coreAreas: [
      'RF engineering & Microwave Circuits',
      'Network protocols (3GPP Rel 15-19, TCP/IP, O-RAN)',
      'Optical communications & DWDM transceivers',
      'Wireless system architecture & baseband processing'
    ],
    keyTechnologies: [
      'Massive MIMO (Multiple-Input Multiple-Output)',
      'Millimeter-wave (mmWave) & Sub-THz antennas',
      'Software-Defined Networking (SDN) & NFV',
      'Beamforming algorithms & phase array steering',
      'Open-RAN (O-RAN) disaggregated architectures'
    ],
    majorEmployers: [
      'Qualcomm',
      'Ericsson',
      'Nokia',
      'MediaTek',
      'Huawei',
      'Apple',
      'Samsung',
      'Broadcom',
      'Keysight Technologies'
    ],
    industryTools: [
      { name: 'MATLAB / Simulink', category: 'Simulators', description: '5G Toolbox, LTE Toolbox, Communications Toolbox for end-to-end link budget and BER simulation' },
      { name: 'Keysight ADS', category: 'RF EDA', description: 'Advanced Design System for RF/microwave circuit simulation, S-parameters, and matching networks' },
      { name: 'GNU Radio', category: 'SDR Platform', description: 'Open-source software-defined radio signal processing toolkit for real-world over-the-air capture' },
      { name: 'NS-3', category: 'Network Simulator', description: 'Discrete-event network simulator for packet flow, protocol evaluation, and cellular modeling' },
      { name: 'CST Studio Suite / Ansys HFSS', category: 'Electromagnetic EDA', description: '3D full-wave electromagnetic field simulation for antenna arrays and planar microstrip' }
    ],
    curatedProjects: [
      {
        title: '5G NR PUSCH Baseband Demodulator in C++/MATLAB',
        difficulty: 'Industry-Grade',
        description: 'Implement 3GPP Rel-16 compliant Physical Uplink Shared Channel receiver pipeline: cyclic prefix removal, FFT, channel estimation, ZF/MMSE equalization, and LDPC soft decoding.',
        technologies: ['C++', 'MATLAB', 'LDPC', '3GPP NR', 'SIMD']
      },
      {
        title: 'Software-Defined Radio (SDR) QPSK Transceiver over HackRF/RTL-SDR',
        difficulty: 'Intermediate',
        description: 'Construct an end-to-end digital communications link using GNU Radio and Python: pulse shaping (RRC), Costas loop carrier recovery, Gardner symbol timing synchronization, and Viterbi decoding.',
        technologies: ['GNU Radio', 'Python', 'RTL-SDR', 'DSP', 'RF Modulation']
      },
      {
        title: '28 GHz mmWave 4x4 Patch Antenna Array with Beamforming Matrix',
        difficulty: 'Advanced',
        description: 'Model, simulate, and optimize a 28 GHz corporate-fed microstrip patch antenna array with Butler matrix feed network in Ansys HFSS, analyzing gain, return loss (S11 < -15dB), and beam steering angles.',
        technologies: ['Ansys HFSS', 'Electromagnetics', 'Phased Arrays', 'mmWave']
      }
    ],
    vlsiEmbeddedConnection: 'Telecommunications systems rely heavily on custom high-performance mixed-signal RFICs (LNA, mixers, PA), high-speed multi-GSPS ADCs/DACs, and digital baseband ASICs/FPGAs running LDPC/Polar decoders.',
    careerProgression: [
      { level: 'Entry / Graduate Engineer', typicalTitles: ['RF Systems Engineer', 'Wireless Protocol Software Engineer', 'Baseband DSP Engineer'], focus: 'Link budget analysis, protocol stack unit testing (L1/L2), RF component bench validation.' },
      { level: 'Senior / Lead Engineer', typicalTitles: ['Senior Telecom Architect', 'mmWave System Designer', 'O-RAN Integration Specialist'], focus: 'Radio unit (O-RU) hardware design, beamforming weight matrix generation, 3GPP standardization compliance.' },
      { level: 'Principal / Fellow', typicalTitles: ['Chief Wireless Architect', 'Director of Wireless Standards', 'VP of RF Technologies'], focus: 'Next-generation (6G) research, spectrum strategy, strategic vendor partnerships, and multi-carrier deployment architecture.' }
    ],
    interviewDrills: [
      'Explain the difference between Rayleigh and Rician fading channels, and derive coherence time vs. Doppler spread.',
      'How does Massive MIMO achieve spatial multiplexing, and what are the trade-offs between Zero-Forcing (ZF) and Maximum Ratio Transmission (MRT)?',
      'Walk through the 5G NR frame structure: subcarrier spacing (SCS) numerologies, slot durations, and OFDMA resource grids.',
      'What are the primary noise figures and non-linearities (P1dB, IIP3) in an RF front-end receiver chain?'
    ],
    salaryBenchmarks: [
      {
        experienceLevel: 'Entry (0-2 yrs)',
        indiaLpaRange: '₹8.0 - 16.5 LPA',
        indiaMedianLpa: '₹11.5 LPA',
        globalUsdRange: '$90,000 - $130,000',
        keyDrivers: ['DSP & C++ proficiency', 'Experience with GNU Radio / RTL-SDR lab work', 'Strong digital comms theory']
      },
      {
        experienceLevel: 'Mid-Level (3-6 yrs)',
        indiaLpaRange: '₹18.0 - 32.0 LPA',
        indiaMedianLpa: '₹24.0 LPA',
        globalUsdRange: '$135,000 - $180,000',
        keyDrivers: ['3GPP protocol stack (L1/L2/L3)', 'RF matching & ADS/HFSS characterization', 'O-RAN fronthaul integration']
      },
      {
        experienceLevel: 'Senior / Lead (7-11 yrs)',
        indiaLpaRange: '₹32.0 - 55.0 LPA',
        indiaMedianLpa: '₹42.0 LPA',
        globalUsdRange: '$185,000 - $260,000',
        keyDrivers: ['mmWave phased-array radar/modem tapeouts', 'Multi-carrier system optimization', 'Vendor RFIC qualification']
      },
      {
        experienceLevel: 'Principal / Architect (12+ yrs)',
        indiaLpaRange: '₹55.0 - 95.0+ LPA',
        indiaMedianLpa: '₹72.0 LPA',
        globalUsdRange: '$260,000 - $380,000+',
        keyDrivers: ['3GPP delegate / standards patent holder', 'Modem PHY architecture definition', 'Cross-continental R&D leadership']
      }
    ],
    hardwareKits: [
      {
        partNumber: 'ADALM-PLUTO Rev C',
        name: 'PlutoSDR Active Learning Module',
        manufacturer: 'Analog Devices',
        category: 'SDR / RF',
        approxPriceInr: '₹22,500',
        approxPriceUsd: '$250',
        significance: 'Gold-standard academic SDR with AD9363 RF Agile Transceiver (325 MHz to 3.8 GHz, 20 MHz instantaneous bandwidth) and Zynq-7000 FPGA.',
        keyProjectsSupported: ['Over-the-air QAM transceiver', 'ADS-B aircraft tracker', 'FM stereo demodulator', 'LTE cell scanner']
      },
      {
        partNumber: 'HACKRF-ONE-H2',
        name: 'HackRF One with PortaPack H2',
        manufacturer: 'Great Scott Gadgets',
        category: 'SDR / RF',
        approxPriceInr: '₹18,500',
        approxPriceUsd: '$210',
        significance: '1 MHz to 6 GHz half-duplex transceiver with up to 20 million samples per second. Essential for RF reverse engineering and ISM band analysis.',
        keyProjectsSupported: ['ISM band spectrum analyzer', 'GPS signal spoofing detection', 'RF replay testing']
      },
      {
        partNumber: 'IWR6843AOPEVM',
        name: '60GHz mmWave Radar Sensor Evaluation Module',
        manufacturer: 'Texas Instruments',
        category: 'Evaluation Board',
        approxPriceInr: '₹28,500',
        approxPriceUsd: '$320',
        significance: 'Integrated Antenna-on-Package (AoP) mmWave sensor operating from 60 to 64 GHz with embedded DSP and ARM Cortex-R4F.',
        keyProjectsSupported: ['High-resolution human presence detection', 'Vital sign micro-Doppler monitoring', 'Gesture recognition']
      }
    ],
    industryStandards: [
      {
        code: '3GPP TS 38.211',
        title: 'NR; Physical channels and modulation',
        issuingBody: '3GPP',
        scope: 'Defines OFDM numerologies, resource grids, frame structure, uplink/downlink physical channels and modulation schemes.',
        interviewRelevance: 'Interviewers frequently test knowledge of subcarrier spacing (SCS), slot duration, and Cyclic Prefix duration.'
      },
      {
        code: '3GPP TS 38.212',
        title: 'NR; Multiplexing and channel coding',
        issuingBody: '3GPP',
        scope: 'Specifies error correction codes in 5G: Low-Density Parity-Check (LDPC) for data channels and Polar Codes for control channels.',
        interviewRelevance: 'Core test topic for Baseband PHY positions; candidates are asked why LDPC replaced Turbo codes in 5G data channels.'
      },
      {
        code: 'O-RAN.WG4.CUS.0',
        title: 'Open RAN Fronthaul Interface Specification',
        issuingBody: '3GPP',
        scope: 'Defines Control, User, and Synchronization plane protocols between O-DU (Distributed Unit) and O-RU (Radio Unit).',
        interviewRelevance: 'Crucial for telecom product companies (Nokia, Mavenir, Altiostar, Jio) adopting virtualized disaggregated base stations.'
      }
    ],
    indianRdCenters: [
      {
        company: 'Qualcomm India',
        location: 'Hyderabad (Mindspace) & Bengaluru (Outer Ring Road)',
        labFocus: 'Snapdragon 5G Modem-RF system validation, mmWave baseband DSP algorithms, and 3GPP Release standards prototyping.',
        hiringRoles: ['RF Systems Engineer', 'Modem PHY Firmware Engineer', 'O-RAN Software Developer']
      },
      {
        company: 'Samsung R&D Institute India (SRI-B)',
        location: 'Bengaluru (Bagmane Tech Park)',
        labFocus: 'Commercial 5G Core, vRAN/Cloud-RAN software stacks, massive MIMO beamforming matrix schedulers, and 6G THz exploratory research.',
        hiringRoles: ['5G Protocol Stack Engineer', 'Baseband Algorithm Specialist', 'Network Slicing Architect']
      },
      {
        company: 'Nokia Networks Global R&D',
        location: 'Bengaluru (Manyata Tech Park) & Chennai (SP Infocity)',
        labFocus: 'AirScale 5G Baseband SoC development, ReefShark chipset firmware, and O-RU RF testing chambers.',
        hiringRoles: ['Hardware Design Engineer', 'Radio Frequency Test Specialist', 'L1/L2 Embedded Developer']
      },
      {
        company: 'Reliance Jio 5G Engineering',
        location: 'Navi Mumbai (Reliance Corporate Park)',
        labFocus: 'Indigenous 5G Standalone (SA) gNodeB hardware, Open RAN small cells, and Massive MIMO active antenna units.',
        hiringRoles: ['Telecom Systems Test Engineer', 'RF Field Optimization Engineer', 'Core Network Specialist']
      }
    ],
    dailyDeliverables: [
      {
        name: 'RF Link Budget Calculation Sheet',
        frequency: 'Bi-weekly during system design',
        toolUsed: 'MATLAB / Excel',
        description: 'Comprehensive calculation of EIRP, free-space path loss, rain attenuation, receiver sensitivity, and link margin for line-of-sight mmWave backhaul.'
      },
      {
        name: 'EVM & Constellation Conformance Report',
        frequency: 'Daily during bench bring-up',
        toolUsed: 'Keysight 89600 VSA / R&S FSW',
        description: 'Error Vector Magnitude (EVM) measurements across 256-QAM and 64-QAM symbols under varying PA backoff and temperature.'
      },
      {
        name: 'Wireshark O-RAN Fronthaul PCAP Capture Analysis',
        frequency: 'Weekly during O-DU/O-RU interoperability',
        toolUsed: 'Wireshark with eCPRI dissector',
        description: 'Validation of IQ sample compression, timing synchronization (IEEE 1588 PTP), and beamforming command latency over 25GbE optical links.'
      }
    ],
    academicPathway: {
      recommendedElectives: [
        'Antennas and Wave Propagation',
        'Microwave Engineering & Radar Systems',
        'Information Theory and Coding',
        'Software Defined Radio Architecture'
      ],
      benchmarkTextbooks: [
        { title: 'Wireless Communications', author: 'Andrea Goldsmith', focus: 'MIMO channel models, capacity, and diversity techniques' },
        { title: 'Microwave Engineering (4th Ed)', author: 'David M. Pozar', focus: 'Transmission lines, S-parameters, impedance matching, and filter design' },
        { title: '5G NR: The Next Generation Wireless Access Technology', author: 'Erik Dahlman, Stefan Parkvall, Johan Skold', focus: 'Definitive engineering reference for 3GPP 5G Physical Layer' }
      ],
      nptelCourseraCourses: [
        { name: '5G Cellular Networks: Principles and System Architecture', institutionOrProf: 'Prof. Aditya K. Jagannatham (IIT Kanpur)', platform: 'NPTEL' },
        { name: 'Principles of Digital Communications', institutionOrProf: 'Prof. S.N. Merchant (IIT Bombay)', platform: 'NPTEL' }
      ]
    }
  },
  {
    id: 'signal-image-vision',
    number: 2,
    title: 'Signal, Image Processing, and Computer Vision',
    tagline: 'Bridging sensory hardware signals and intelligent software for diagnostics, radar, and machine perception',
    departmentFocus: 'ECE',
    engineeringFocusFull: 'ECE (Algorithms & Math)',
    skillPrerequisites: ['MATLAB / NumPy', 'Python / C++', 'DSP Fundamentals (Z-Transform, FFT)', 'Linear Algebra'],
    marketDemand: 'Very High (AI/MedTech)',
    marketDemandTier: 'Very High',
    overview: 'Serves as the critical bridge between physical hardware sensor signals and intelligent software algorithms. Translates raw continuous or discrete sensor inputs into structured, actionable datasets for biometric security, medical imaging diagnostics (MRI, CT, Ultrasound), defense radar/sonar, and autonomous machine intelligence.',
    coreAreas: [
      'Medical imaging technology (MRI reconstruction, CT, Ultrasound RF beamforming)',
      'Audio, speech, and acoustic echo cancellation (AEC)',
      'Radar and sonar signal processing (FMCW, Range-Doppler)',
      'Computer vision and edge machine intelligence algorithms'
    ],
    keyTechnologies: [
      'OpenCV & Real-Time Computer Vision pipelines',
      'MATLAB Signal Processing & Wavelet Toolboxes',
      'Deep Learning frameworks (PyTorch, ONNX Runtime, TensorRT)',
      'Digital filter banks (Polyphase FIR/IIR, Adaptive LMS/RLS)',
      'Spatial image transform algorithms (Radon transform, Wavelets)'
    ],
    majorEmployers: [
      'GE Healthcare',
      'Philips Healthcare',
      'Siemens Healthineers',
      'Northrop Grumman',
      'Adobe',
      'Sony',
      'Dolby Laboratories',
      'Bosch',
      'Intel Labs'
    ],
    industryTools: [
      { name: 'MATLAB Image & Signal Toolbox', category: 'Math Engine', description: 'Gold-standard algorithmic reference for filter synthesis, wavelets, and matrix decompositions' },
      { name: 'OpenCV (C++ / Python)', category: 'Computer Vision', description: 'Industry-standard high-performance computer vision library with SIMD hardware optimization' },
      { name: 'PyTorch / TensorRT', category: 'Deep Learning', description: 'Neural network training and INT8/FP16 quantized inference acceleration for edge accelerators' },
      { name: 'FFmpeg & Libav', category: 'Media Codecs', description: 'Real-time multimedia stream decoding, color space conversions, and H.264/HEVC/AV1 encoding' },
      { name: 'GNU Octave / SciPy', category: 'Open Source', description: 'Open-source scientific vector processing and numerical integration environments' }
    ],
    curatedProjects: [
      {
        title: 'Real-Time Ultrasound RF Beamforming Pipeline in C++ (CUDA)',
        difficulty: 'Industry-Grade',
        description: 'Synthesize raw channel RF ultrasound data into B-mode clinical images using Delay-and-Sum (DAS) beamforming, envelope detection (Hilbert transform), and log compression.',
        technologies: ['C++', 'CUDA', 'Hilbert Transform', 'Signal Processing']
      },
      {
        title: 'Acoustic Echo Cancellation (AEC) using Normalized LMS Filter',
        difficulty: 'Intermediate',
        description: 'Build an adaptive filtering pipeline to cancel near-end loudspeaker echo in full-duplex VoIP audio streams, measuring Echo Return Loss Enhancement (ERLE > 25 dB).',
        technologies: ['Python', 'NumPy', 'Adaptive Filters', 'DSP Audio']
      },
      {
        title: 'FMCW Radar 2D Range-Doppler Map Generation for ADAS',
        difficulty: 'Advanced',
        description: 'Process raw 77 GHz radar beat signals through Range FFT and Doppler FFT, applying CFAR (Constant False Alarm Rate) target detection to compute obstacle velocity and range.',
        technologies: ['MATLAB', 'CFAR', 'Radar DSP', 'FFT']
      }
    ],
    vlsiEmbeddedConnection: 'Vision and signal algorithms require hardware implementation on dedicated DSP cores (TI C66x, CEVA, Cadence Tensilica), vision processing units (VPUs), FPGA systolic arrays, and neural processing units (NPUs).',
    careerProgression: [
      { level: 'Entry / Junior Engineer', typicalTitles: ['DSP Engineer', 'Computer Vision Developer', 'Image Processing Analyst'], focus: 'Algorithm translation from MATLAB to C/C++, fixed-point quantization, camera sensor tuning.' },
      { level: 'Senior / Lead Specialist', typicalTitles: ['Staff Signal Processing Engineer', 'Senior Perception Scientist', 'Lead Imaging Architect'], focus: 'Custom edge neural network architecture, multi-sensor calibration (Camera-Radar-LiDAR), regulatory submission (FDA 510(k)).' },
      { level: 'Principal / Fellow', typicalTitles: ['Chief Scientist - Medical Imaging', 'VP of Computer Vision', 'Distinguished DSP Engineer'], focus: 'Patented reconstruction techniques, multi-modal generative AI diagnostics, hardware-algorithm co-design.' }
    ],
    interviewDrills: [
      'Derive the Nyquist-Shannon sampling theorem and describe the hardware impact of anti-aliasing filters.',
      'Explain how the 2D Discrete Wavelet Transform (DWT) achieves multi-resolution analysis compared to Short-Time Fourier Transform (STFT).',
      'What are the mathematical trade-offs between FIR and IIR digital filters in terms of phase linearity, stability, and computational order?',
      'How does Constant False Alarm Rate (CFAR) detection dynamically calculate radar threshold in non-homogeneous clutter environments?'
    ],
    salaryBenchmarks: [
      {
        experienceLevel: 'Entry (0-2 yrs)',
        indiaLpaRange: '₹8.0 - 15.0 LPA',
        indiaMedianLpa: '₹10.5 LPA',
        globalUsdRange: '$95,000 - $135,000',
        keyDrivers: ['C++ and Python data structures', 'Linear algebra & Fourier analysis depth', 'Experience with OpenCV / PyTorch']
      },
      {
        experienceLevel: 'Mid-Level (3-6 yrs)',
        indiaLpaRange: '₹17.0 - 30.0 LPA',
        indiaMedianLpa: '₹22.5 LPA',
        globalUsdRange: '$140,000 - $190,000',
        keyDrivers: ['Fixed-point DSP profiling (Q15/Q31)', 'CUDA GPU kernel optimization', 'Medical image segmentation / FMCW radar']
      },
      {
        experienceLevel: 'Senior / Lead (7-11 yrs)',
        indiaLpaRange: '₹30.0 - 52.0 LPA',
        indiaMedianLpa: '₹39.0 LPA',
        globalUsdRange: '$195,000 - $275,000',
        keyDrivers: ['Edge AI model quantization (INT8 TensorRT)', 'Multi-camera ISP calibration (AWB, AE, Demosaic)', 'FDA/CE medical software validation']
      },
      {
        experienceLevel: 'Principal / Architect (12+ yrs)',
        indiaLpaRange: '₹52.0 - 85.0+ LPA',
        indiaMedianLpa: '₹68.0 LPA',
        globalUsdRange: '$270,000 - $400,000+',
        keyDrivers: ['Patented algorithmic IP portfolio', 'SoC hardware accelerator definition (NPU/VPU)', 'Clinical or defense trial leadership']
      }
    ],
    hardwareKits: [
      {
        partNumber: '945-13766-0005-000',
        name: 'NVIDIA Jetson Orin Nano Developer Kit (8GB)',
        manufacturer: 'NVIDIA',
        category: 'Evaluation Board',
        approxPriceInr: '₹48,000',
        approxPriceUsd: '$499',
        significance: 'Delivers up to 40 TOPS of AI performance with 1024-core NVIDIA Ampere architecture GPU. Standard platform for edge computer vision and robotics.',
        keyProjectsSupported: ['Real-time 30 FPS multi-stream YOLOv8 object detection', 'Edge SLAM perception', 'Depth map processing']
      },
      {
        partNumber: 'TMDXLCDK6748',
        name: 'TMS320C6748 DSP Experimenter Kit',
        manufacturer: 'Texas Instruments',
        category: 'Evaluation Board',
        approxPriceInr: '₹24,000',
        approxPriceUsd: '$280',
        significance: 'Low-power 375/456 MHz C674x VLIW floating-point DSP with audio codecs, video ports, and hardware mathematical accelerators.',
        keyProjectsSupported: ['Real-time adaptive audio filtering', 'Polyphase filter banks', 'Wavelet audio compression']
      },
      {
        partNumber: 'NUCLEO-H743ZI2',
        name: 'STM32H743ZI ARM Cortex-M7 Development Board',
        manufacturer: 'STMicroelectronics',
        category: 'Evaluation Board',
        approxPriceInr: '₹3,600',
        approxPriceUsd: '$42',
        significance: 'High-performance 480 MHz MCU with double-precision FPU, Chrom-ART Accelerator, and DVP camera interface. Perfect for TinyML vision.',
        keyProjectsSupported: ['Microcontroller image classification', 'Keyword spotting DSP', 'FFT vibration analysis']
      }
    ],
    industryStandards: [
      {
        code: 'DICOM PS3.x',
        title: 'Digital Imaging and Communications in Medicine',
        issuingBody: 'ISO',
        scope: 'International standard for medical image communication, storage formats (CT, MRI, X-ray), pixel spacing metadata, and PACS networking.',
        interviewRelevance: 'Mandatory standard for medical imaging R&D roles at GE Healthcare, Philips, and Siemens Healthineers.'
      },
      {
        code: 'MIPI CSI-2 v4.0',
        title: 'Camera Serial Interface 2',
        issuingBody: 'IEEE',
        scope: 'High-speed protocol connecting camera image sensors to host processors, defining D-PHY/C-PHY physical layer and RAW8/10/12 pixel formats.',
        interviewRelevance: 'Core question topic for automotive ADAS and smartphone camera tuning engineering interviews.'
      },
      {
        code: 'ITU-T G.711 / G.722',
        title: 'Pulse Code Modulation (PCM) of Voice Frequencies',
        issuingBody: 'ISO',
        scope: 'Audio coding algorithms including A-law/μ-law companding and 7 kHz wideband audio coding for teleconferencing systems.',
        interviewRelevance: 'Frequently tested in audio DSP interviews at Dolby Laboratories, Bose, and Qualcomm Voice group.'
      }
    ],
    indianRdCenters: [
      {
        company: 'GE Healthcare John F. Welch Technology Centre',
        location: 'Bengaluru (Whitefield EPIP Zone)',
        labFocus: 'Next-generation Revolution CT scanners, Signa MRI image reconstruction algorithms, and handheld ultrasound beamforming.',
        hiringRoles: ['Image Reconstruction Engineer', 'Medical Algorithm Scientist', 'DSP Software Engineer']
      },
      {
        company: 'Philips Innovation Campus (PIC)',
        location: 'Bengaluru (Manyata Tech Park)',
        labFocus: 'Clinical decision support systems, cardiology imaging pipelines, and AI-enabled patient monitoring algorithms.',
        hiringRoles: ['Computer Vision Engineer', 'Acoustic Signal Processing Specialist', 'Embedded Algorithm Developer']
      },
      {
        company: 'Bosch Global Software Technologies (BGSW)',
        location: 'Bengaluru (Electronic City & Adugodi) & Coimbatore',
        labFocus: 'Automotive ADAS surround-view camera processing, FMCW millimeter-wave radar sensor fusion, and driver drowsiness detection.',
        hiringRoles: ['Perception Engineer', 'Radar Signal Processing Specialist', 'Embedded Vision Developer']
      },
      {
        company: 'Sony India Software Centre (SISC)',
        location: 'Bengaluru (Embassy Tech Village)',
        labFocus: 'Alpha camera series computational photography, autofocus tracking algorithms, and PlayStation 3D spatial audio processing.',
        hiringRoles: ['Image Signal Processor (ISP) Engineer', 'Audio DSP Specialist', 'Machine Learning Vision Engineer']
      }
    ],
    dailyDeliverables: [
      {
        name: 'Fixed-Point vs Floating-Point Precision Loss Report',
        frequency: 'Monthly when porting algorithms to DSP',
        toolUsed: 'MATLAB Fixed-Point Designer',
        description: 'Quantization noise analysis, signal-to-quantization-noise ratio (SQNR) validation, and overflow risk mitigation for Q15/Q31 implementations.'
      },
      {
        name: 'Algorithm Profiling & Real-Time FPS Benchmark Sheet',
        frequency: 'Weekly during sprint testing',
        toolUsed: 'NVIDIA Nsight Systems / perf',
        description: 'Measurement of kernel execution latency, GPU memory bandwidth utilization, cache miss rates, and end-to-end frame rate under 4K sensor input.'
      },
      {
        name: 'Receiver Operating Characteristic (ROC) & PR-AUC Curve Log',
        frequency: 'Bi-weekly during model validation',
        toolUsed: 'Python / Matplotlib / MLflow',
        description: 'True positive vs false positive trade-off curves for defect detection or anatomical landmark detection across clinical test cohorts.'
      }
    ],
    academicPathway: {
      recommendedElectives: [
        'Digital Image Processing',
        'Adaptive Signal Processing',
        'Computer Vision & Machine Learning',
        'Biomedical Signal & Image Processing'
      ],
      benchmarkTextbooks: [
        { title: 'Digital Signal Processing: Principles, Algorithms, and Applications', author: 'John G. Proakis & Dimitris K. Manolakis', focus: 'Definitive theoretical and practical signal processing bible' },
        { title: 'Digital Image Processing (4th Ed)', author: 'Rafael C. Gonzalez & Richard E. Woods', focus: 'Image transforms, segmentation, morphology, and frequency domain filtering' },
        { title: 'Multiple View Geometry in Computer Vision', author: 'Richard Hartley & Andrew Zisserman', focus: 'Mathematical foundations of 3D reconstruction, epipolar geometry, and camera calibration' }
      ],
      nptelCourseraCourses: [
        { name: 'Digital Image Processing', institutionOrProf: 'Prof. Prabir Kumar Biswas (IIT Kharagpur)', platform: 'NPTEL' },
        { name: 'Digital Signal Processing', institutionOrProf: 'Prof. S.C. Dutta Roy (IIT Delhi)', platform: 'NPTEL' }
      ]
    }
  },
  {
    id: 'power-electronics-ev',
    number: 3,
    title: 'Power Electronics and Electric Vehicles (EVs)',
    tagline: 'High-voltage energy conversion, wide-bandgap (SiC/GaN) semiconductor devices, BMS architectures, and traction inverters',
    departmentFocus: 'EEE',
    engineeringFocusFull: 'EEE (Hardware & Conversion)',
    skillPrerequisites: ['Analog Circuit Design', 'Power Semiconductors (SiC, GaN)', 'Thermal Management', 'Simulation (PLECS / LTspice)'],
    marketDemand: 'Massive (EV Boom & Decarbonization)',
    marketDemandTier: 'Massive',
    overview: 'Witnessing historic capital investment due to global automotive electrification and industrial decarbonization. Engineers design the high-voltage circuits and switching topologies that convert electricity between AC and DC across battery packs, onboard chargers, traction motors, and high-power fast charging stations.',
    coreAreas: [
      'EV Traction Inverters (Field Oriented Control of PMSM/BLDC motors)',
      'Battery Management Systems (BMS - State of Charge/Health estimation)',
      'DC-DC converters & Onboard Chargers (OBC - Bidirectional LLC/CLLC)',
      'High-Power Fast Charging Infrastructure (60 kW to 350 kW DC chargers)'
    ],
    keyTechnologies: [
      'Wide-Bandgap semiconductors (Silicon Carbide - SiC, Gallium Nitride - GaN)',
      'High-frequency magnetics & planar transformer design',
      'Space Vector Pulse Width Modulation (SVPWM) & Field-Oriented Control (FOC)',
      'Hardware-in-the-Loop (HIL) simulation & functional safety (ISO 26262)',
      'Advanced cooling solutions & thermal interface materials (TIM)'
    ],
    majorEmployers: [
      'Tesla',
      'Rivian',
      'Lucid Motors',
      'Tata Motors Passenger EV',
      'Ather Energy',
      'Ola Electric',
      'Texas Instruments',
      'Infineon Technologies',
      'STMicroelectronics',
      'Bosch Automotive',
      'Delta Electronics'
    ],
    industryTools: [
      { name: 'PLECS', category: 'Power EDA', description: 'Premier simulation tool for high-speed power electronic systems, thermal losses, and control loops' },
      { name: 'MATLAB / Simulink Simscape', category: 'System Modeling', description: 'Multi-domain physical modeling of motor drives, battery chemistries, and grid interactions' },
      { name: 'LTspice', category: 'Analog Simulation', description: 'Industry-standard SPICE simulator for switching transient analysis, snubber design, and gate drive ringing' },
      { name: 'Altium Designer', category: 'High-Power PCB', description: 'Heavy copper routing, creepage/clearance design, and parasitic inductance minimization' },
      { name: 'Ansys Maxwell / Q3D', category: 'FEA Magnetics', description: 'Finite element analysis for high-frequency transformer core losses and busbar parasitic extraction' }
    ],
    curatedProjects: [
      {
        title: '800V SiC Traction Inverter with Field-Oriented Control (FOC)',
        difficulty: 'Industry-Grade',
        description: 'Design and simulate an automotive traction inverter using 1200V Silicon Carbide (SiC) MOSFETs, achieving 98.5% peak efficiency with SVPWM control in PLECS.',
        technologies: ['SiC MOSFETs', 'PLECS', 'SVPWM', 'FOC Motor Control', 'Thermal FEA']
      },
      {
        title: '16-Cell Lithium-Ion BMS with Active Cell Balancing & Coulomb Counting',
        difficulty: 'Advanced',
        description: 'Fabricate an automotive battery management system: multi-cell voltage sensing via SPI (bq76PL455A), active flyback balancing, temperature monitoring, and CAN bus telemetry.',
        technologies: ['BMS', 'Altium', 'CAN Bus', 'Embedded C', 'TI C2000']
      },
      {
        title: '3.3 kW Bidirectional On-Board Charger (CLLC Resonant Converter)',
        difficulty: 'Industry-Grade',
        description: 'Model a zero-voltage-switching (ZVS) resonant DC-DC converter for Vehicle-to-Grid (V2G) applications, optimizing resonant tank components for wide battery voltage ranges (250V-450V).',
        technologies: ['Resonant Converters', 'ZVS/ZCS', 'Magnetics Design', 'LTspice']
      }
    ],
    vlsiEmbeddedConnection: 'Power electronics heavily depends on high-performance real-time microcontrollers (TI C2000, Infineon AURIX, ST Stellar) with sub-nanosecond PWM resolution and mixed-signal PMICs with galvanically isolated gate drivers.',
    careerProgression: [
      { level: 'Entry / Junior Engineer', typicalTitles: ['Power Electronics Engineer', 'BMS Firmware Engineer', 'Hardware Test Engineer'], focus: 'Schematic capture, bench prototype bring-up, thermal characterization, bench testing with high-voltage DC supplies.' },
      { level: 'Senior / Lead Engineer', typicalTitles: ['Senior Inverter Architect', 'Principal BMS Designer', 'Power Systems Lead'], focus: 'SiC gate driver circuit design, parasitic inductance mitigation, ISO 26262 ASIL-D functional safety compliance.' },
      { level: 'Principal / Chief Engineer', typicalTitles: ['VP of Powertrain Engineering', 'Chief Power Architect', 'Director of Hardware Engineering'], focus: 'Next-generation powertrain roadmap, cell chemistry integration, strategic semiconductor sourcing.' }
    ],
    interviewDrills: [
      'Compare Silicon (Si), Silicon Carbide (SiC), and Gallium Nitride (GaN) in terms of bandgap energy, breakdown electric field, electron velocity, and thermal conductivity.',
      'Derive the voltage conversion ratio and inductor ripple current for a continuous conduction mode (CCM) synchronous buck-boost converter.',
      'Explain how Space Vector PWM (SVPWM) provides 15.5% higher DC-bus voltage utilization compared to conventional Sinusoidal PWM (SPWM).',
      'What are the root causes of gate-source overvoltage spikes in SiC MOSFET bridge legs, and how do Kelvin source connections mitigate them?'
    ],
    salaryBenchmarks: [
      {
        experienceLevel: 'Entry (0-2 yrs)',
        indiaLpaRange: '₹8.5 - 16.0 LPA',
        indiaMedianLpa: '₹12.0 LPA',
        globalUsdRange: '$90,000 - $130,000',
        keyDrivers: ['Knowledge of switching topologies (Buck, Boost, LLC)', 'Hands-on LTspice / PLECS simulation', 'Soldering & lab safety with high voltage']
      },
      {
        experienceLevel: 'Mid-Level (3-6 yrs)',
        indiaLpaRange: '₹18.0 - 33.0 LPA',
        indiaMedianLpa: '₹25.0 LPA',
        globalUsdRange: '$135,000 - $185,000',
        keyDrivers: ['SiC / GaN design experience', 'TI C2000 or Infineon AURIX motor firmware', 'Thermal modeling & busbar design']
      },
      {
        experienceLevel: 'Senior / Lead (7-11 yrs)',
        indiaLpaRange: '₹33.0 - 58.0 LPA',
        indiaMedianLpa: '₹44.0 LPA',
        globalUsdRange: '$190,000 - $270,000',
        keyDrivers: ['ISO 26262 ASIL-D functional safety certification', 'Automotive traction inverter tapeout', 'Automotive Tier-1 customer qualification']
      },
      {
        experienceLevel: 'Principal / Architect (12+ yrs)',
        indiaLpaRange: '₹58.0 - 98.0+ LPA',
        indiaMedianLpa: '₹75.0 LPA',
        globalUsdRange: '$270,000 - $420,000+',
        keyDrivers: ['Full EV powertrain architecture ownership', 'Patents in high-frequency magnetics / BMS algorithms', 'Global supplier vendor steering']
      }
    ],
    hardwareKits: [
      {
        partNumber: 'LAUNCHXL-F280049C',
        name: 'C2000 Piccolo MCU F280049C LaunchPad',
        manufacturer: 'Texas Instruments',
        category: 'Evaluation Board',
        approxPriceInr: '₹4,500',
        approxPriceUsd: '$49',
        significance: 'Standard industrial MCU for digital power and motor control with 100MHz C28x core, CLA math co-processor, and high-resolution PWM (HRPWM) with 150ps step size.',
        keyProjectsSupported: ['Digital peak current mode buck converter', 'Sensorless FOC of PMSM motor', 'Active PFC rectifier']
      },
      {
        partNumber: 'STEVAL-BPS001V1',
        name: 'Automotive BMS Evaluation Board',
        manufacturer: 'STMicroelectronics',
        category: 'Evaluation Board',
        approxPriceInr: '₹38,000',
        approxPriceUsd: '$420',
        significance: 'Complete evaluation kit for multi-cell automotive battery management, featuring high-precision ADC cell voltage telemetry, balancing circuits, and isolated SPI.',
        keyProjectsSupported: ['Multi-cell Li-ion monitoring', 'Passive thermal balancing algorithm', 'Coulomb-counting state of charge']
      },
      {
        partNumber: 'KIT_ACT_BRD_SIC',
        name: 'CoolSiC 1200V Half-Bridge Gate Driver Board',
        manufacturer: 'Infineon Technologies',
        category: 'Evaluation Board',
        approxPriceInr: '₹56,000',
        approxPriceUsd: '$620',
        significance: 'High-voltage evaluation board featuring 1200V CoolSiC MOSFETs and EiceDRIVER isolated gate driver ICs with desaturation (DESAT) short-circuit protection.',
        keyProjectsSupported: ['Double-pulse testing for switching loss measurement', 'Dead-time optimization', 'Gate drive dv/dt ringing analysis']
      }
    ],
    industryStandards: [
      {
        code: 'ISO 26262 ASIL-D',
        title: 'Road vehicles - Functional safety',
        issuingBody: 'ISO',
        scope: 'Defines the highest level of automotive hazard risk integrity; governs traction inverters, steering, and braking safety-critical electronic systems.',
        interviewRelevance: 'Interviewers heavily assess knowledge of failure metrics (SPFM > 99%, LFM > 90%, PMHF < 10 FIT), hardware safety mechanisms, and diagnostic coverage.'
      },
      {
        code: 'UN 38.3',
        title: 'Transportation Testing for Lithium Metal and Lithium Ion Batteries',
        issuingBody: 'UL',
        scope: 'Mandatory certification requirements for shipping Li-ion battery packs: altitude simulation, thermal test, vibration, shock, external short circuit, impact, overcharge, and forced discharge.',
        interviewRelevance: 'Essential knowledge for Battery Pack Design and Validation positions at EV startups and OEMs.'
      },
      {
        code: 'CISPR 25 Class 5',
        title: 'Vehicles, boats and internal combustion engines - Radio disturbances',
        issuingBody: 'CISPR',
        scope: 'Strict limits on conducted and radiated electromagnetic emissions to protect onboard radio receivers from high-frequency inverter switching noise.',
        interviewRelevance: 'Key topic for hardware and PCB layout interviews; questions focus on common-mode choke selection and Y-capacitor grounding.'
      }
    ],
    indianRdCenters: [
      {
        company: 'Tata Motors Passenger Electric Vehicles',
        location: 'Pune (Chakan & Pimpri Tech Center)',
        labFocus: 'In-house traction inverter development, permanent magnet synchronous motor (PMSM) calibration, and high-voltage battery pack safety validation for Nexon.ev and Curvv.ev.',
        hiringRoles: ['Traction Inverter Hardware Engineer', 'BMS Algorithm Developer', 'High Voltage Safety Specialist']
      },
      {
        company: 'Ather Energy R&D Hub',
        location: 'Bengaluru (IBC Knowledge Park) & Hosur Mega-Plant',
        labFocus: 'Proprietary Battery Management System (BMS), Ather Grid fast charging protocol hardware, and 450X smart powertrain digital control.',
        hiringRoles: ['Power Electronics Design Engineer', 'Battery Systems Test Specialist', 'Motor Control Firmware Developer']
      },
      {
        company: 'Texas Instruments India Power Management Lab',
        location: 'Bengaluru (Wind Tunnel Road)',
        labFocus: 'Next-generation DC-DC switching regulator IC design, isolated gate drivers for SiC/GaN, and automotive battery monitor ICs.',
        hiringRoles: ['Analog IC Design Engineer', 'Applications Engineer - Power Management', 'Product Validation Engineer']
      },
      {
        company: 'Infineon Technologies Power Semis Lab',
        location: 'Bengaluru (Prestige Technostar, Whitefield)',
        labFocus: 'CoolSiC and CoolGaN module application testing, reference design boards for 22kW OBCs, and industrial motor drive test benches.',
        hiringRoles: ['Power Electronics Field Application Engineer', 'System Architect - Automotive Power', 'Validation Specialist']
      }
    ],
    dailyDeliverables: [
      {
        name: 'Worst-Case Circuit Analysis (WCCA) Document',
        frequency: 'Milestone delivery before board fabrication',
        toolUsed: 'Mathcad / Excel / LTspice',
        description: 'Rigorous calculation of component parameter drift over 15-year automotive lifetime, extreme temperatures (-40°C to +125°C), and tolerance stack-up.'
      },
      {
        name: 'Double-Pulse Test (DPT) Switching Loss Matrix',
        frequency: 'Weekly during semiconductor device characterization',
        toolUsed: 'High-voltage oscilloscope & Rogowski coil',
        description: 'Experimental extraction of Eon, Eoff, and reverse recovery charge (Qrr) across temperatures (25°C, 75°C, 150°C) and load currents.'
      },
      {
        name: 'Design Failure Mode and Effects Analysis (DFMEA)',
        frequency: 'Continuous update across design lifecycle',
        toolUsed: 'APIS IQ-RM / Excel',
        description: 'Systematic ranking of Severity, Occurrence, and Detection (RPN) for electrical failure modes such as gate short, DC bus overvoltage, and thermal runaway.'
      }
    ],
    academicPathway: {
      recommendedElectives: [
        'Advanced Power Electronics',
        'Electric Vehicle Powertrain Architecture',
        'Modeling and Control of Electric Drives',
        'Wide-Bandgap Semiconductor Devices'
      ],
      benchmarkTextbooks: [
        { title: 'Fundamentals of Power Electronics (3rd Ed)', author: 'Robert W. Erickson & Dragan Maksimovic', focus: 'The undisputed gold-standard textbook on converter modeling, state-space averaging, and magnetics' },
        { title: 'Electric Powertrain: Energy Systems, Power Electronics and Drives', author: 'John G. Hayes & G. Abas Goodarzi', focus: 'Comprehensive coverage of EV inverters, motors, batteries, and chargers' },
        { title: 'Battery Management Systems for Large Lithium-Ion Battery Packs', author: 'Davide Andrea', focus: 'Practical guide to cell balancing, state estimation, safety, and battery electronics' }
      ],
      nptelCourseraCourses: [
        { name: 'Fundamentals of Electric Vehicles: Technology & Economics', institutionOrProf: 'Prof. Ashok Jhunjhunwala (IIT Madras)', platform: 'NPTEL' },
        { name: 'Power Electronics', institutionOrProf: 'Prof. G. Bhuvaneswari (IIT Delhi)', platform: 'NPTEL' }
      ]
    }
  },
  {
    id: 'control-robotics-automation',
    number: 4,
    title: 'Control Systems, Robotics, and Industrial Automation',
    tagline: 'Precision closed-loop motion, industrial robotics, kinematics, sensor fusion, PLC automation, and real-time middleware',
    departmentFocus: 'Both',
    engineeringFocusFull: 'Both (Integration & Logic)',
    skillPrerequisites: ['Feedback Control Systems', 'ROS / ROS 2', 'PLC Programming (IEC 61131-3)', 'Microcontrollers (ARM / ESP32)'],
    marketDemand: 'High (Factory Automation & Logistics)',
    marketDemandTier: 'High',
    overview: 'Unifies electrical actuation, mechanical kinematics, and embedded computation. From automated multi-axis manufacturing lines and warehouse autonomous mobile robots (AMRs) to surgical robotics, engineers develop closed-loop feedback controllers, sensor fusion algorithms, and industrial network buses.',
    coreAreas: [
      'Industrial Automation & PLC/SCADA programming',
      'Autonomous Mobile Robots (AMR navigation, SLAM, LiDAR)',
      'Multi-axis Robotic Arm Motion Planning & Kinematics',
      'Process Control & Distributed Control Systems (DCS)'
    ],
    keyTechnologies: [
      'Robot Operating System (ROS / ROS 2 Humble/Jazzy)',
      'PLC programming (Ladder Logic, Structured Text - IEC 61131-3)',
      'Sensor Fusion algorithms (Extended Kalman Filters, Madgwick)',
      'Industrial bus protocols (EtherCAT, CANopen, Profinet, Modbus TCP)',
      'Model Predictive Control (MPC) and robust PID tuning'
    ],
    majorEmployers: [
      'ABB',
      'Siemens Digital Industries',
      'FANUC',
      'KUKA',
      'Honeywell Building Solutions',
      'Rockwell Automation',
      'Schneider Electric',
      'Addverb Technologies',
      'GreyOrange',
      'Boston Dynamics'
    ],
    industryTools: [
      { name: 'Siemens TIA Portal', category: 'Industrial Automation', description: 'Comprehensive engineering framework for SIMATIC controllers, HMI panels, and industrial drives' },
      { name: 'ROS 2 (Linux / C++ / Python)', category: 'Robotics Middleware', description: 'Industry-standard open-source robotics middleware with DDS real-time publish-subscribe transport' },
      { name: 'MATLAB / Simulink Control Toolbox', category: 'Control Simulation', description: 'Root locus, Bode plots, state-space modeling, and auto-generation of embedded C code' },
      { name: 'Gazebo & Webots', category: 'Physics Simulators', description: '3D dynamic multi-robot physics simulation environments for sensor-equipped mobile robots and manipulators' },
      { name: 'CoDeSys', category: 'PLC IDE', description: 'Manufacturer-independent hardware automation software according to IEC 61131-3 standard' }
    ],
    curatedProjects: [
      {
        title: 'Autonomous Mobile Robot (AMR) with 2D LiDAR SLAM in ROS 2',
        difficulty: 'Advanced',
        description: 'Build a differential drive robot utilizing Slamtec RPLiDAR, wheel odometry, and Nav2 navigation stack to map an indoor environment and execute waypoint goal planning.',
        technologies: ['ROS 2', 'Nav2', 'SLAM Toolbox', 'C++', 'LiDAR']
      },
      {
        title: '6-DOF Robotic Arm Kinematics & Trajectory Planner in MATLAB',
        difficulty: 'Intermediate',
        description: 'Compute forward and inverse kinematics using Denavit-Hartenberg (DH) parameters, implementing cubic polynomial trajectory generation to avoid singular configurations.',
        technologies: ['MATLAB', 'Kinematics', 'DH Parameters', 'Trajectory Planning']
      },
      {
        title: 'Automated Bottle Filling Plant with Siemens S7-1200 PLC & SCADA',
        difficulty: 'Intermediate',
        description: 'Program a production conveyor cell using Structured Text in TIA Portal: level sensor thresholding, pneumatic actuator sequencing, emergency stop safety interlocks, and WinCC HMI dashboard.',
        technologies: ['TIA Portal', 'Structured Text', 'Siemens S7-1200', 'SCADA']
      }
    ],
    vlsiEmbeddedConnection: 'Robotics relies heavily on multi-core real-time processors with lock-step Cortex-R cores, FPGA-based EtherCAT slave controllers, and multi-channel encoder pulse counters.',
    careerProgression: [
      { level: 'Entry / Automation Engineer', typicalTitles: ['Robotics Engineer', 'PLC Programmer', 'Control Systems Engineer'], focus: 'Ladder logic programming, HMI screen design, ROS 2 node debugging, servo motor drive tuning.' },
      { level: 'Senior / Robotics Specialist', typicalTitles: ['Senior Navigation Engineer', 'Lead Automation Architect', 'Motion Control Lead'], focus: 'SLAM algorithmic tuning, EtherCAT master stack integration, ISO 10218 robotic cell safety certification.' },
      { level: 'Principal / Systems Director', typicalTitles: ['Director of Robotics R&D', 'Chief Automation Officer', 'Fellow in Autonomous Systems'], focus: 'Full-facility automated guided vehicle fleet dispatch algorithms, strategic hardware platform decisions.' }
    ],
    interviewDrills: [
      'Derive the state-space representation of an inverted pendulum on a cart and explain controllability and observability matrices.',
      'Explain the mathematical formulation of an Extended Kalman Filter (EKF) and how it linearizes non-linear sensor observation models.',
      'What are the five programming languages defined in the IEC 61131-3 standard, and when is Structured Text preferred over Ladder Diagram?',
      'How does the EtherCAT protocol achieve deterministic sub-millisecond communication over standard Ethernet physical layer?'
    ],
    salaryBenchmarks: [
      {
        experienceLevel: 'Entry (0-2 yrs)',
        indiaLpaRange: '₹6.5 - 13.5 LPA',
        indiaMedianLpa: '₹9.0 LPA',
        globalUsdRange: '$80,000 - $120,000',
        keyDrivers: ['ROS / ROS 2 and Linux proficiency', 'Good understanding of PID / state space', 'Practical experience with microcontrollers & motor drivers']
      },
      {
        experienceLevel: 'Mid-Level (3-6 yrs)',
        indiaLpaRange: '₹15.0 - 27.0 LPA',
        indiaMedianLpa: '₹20.0 LPA',
        globalUsdRange: '$125,000 - $175,000',
        keyDrivers: ['SLAM & Nav2 stack deployment', 'Industrial PLC / TIA Portal certification', 'EtherCAT / CANopen network configuration']
      },
      {
        experienceLevel: 'Senior / Lead (7-11 yrs)',
        indiaLpaRange: '₹27.0 - 46.0 LPA',
        indiaMedianLpa: '₹36.0 LPA',
        globalUsdRange: '$180,000 - $250,000',
        keyDrivers: ['Multi-robot fleet coordination', 'ISO 13849-1 safety system design', 'Real-time Linux PREEMPT_RT kernel tuning']
      },
      {
        experienceLevel: 'Principal / Architect (12+ yrs)',
        indiaLpaRange: '₹46.0 - 78.0+ LPA',
        indiaMedianLpa: '₹62.0 LPA',
        globalUsdRange: '$250,000 - $360,000+',
        keyDrivers: ['Autonomous warehouse architecture patents', 'End-to-end industrial plant digital twin delivery', 'Executive technical leadership']
      }
    ],
    hardwareKits: [
      {
        partNumber: 'TURTLEBOT4-LITE',
        name: 'TurtleBot 4 Lite Mobile Robot',
        manufacturer: 'Clearpath Robotics',
        category: 'Evaluation Board',
        approxPriceInr: '₹98,000',
        approxPriceUsd: '$1,150',
        significance: 'Flagship academic and research platform for ROS 2, built on iRobot Create 3 base with Raspberry Pi 4, 2D LiDAR, and spatial AI camera.',
        keyProjectsSupported: ['Autonomous indoor SLAM mapping', 'Obstacle avoidance navigation', 'Multi-robot swarm exploration']
      },
      {
        partNumber: 'RPLIDAR-A2M12',
        name: 'Slamtec RPLIDAR A2M12 360° Laser Range Scanner',
        manufacturer: 'Slamtec',
        category: 'Sensor / Peripheral',
        approxPriceInr: '₹22,000',
        approxPriceUsd: '$240',
        significance: 'High-speed 360-degree laser range scanner with 12-meter radius, 16,000 samples per second, and brushless motor for industrial reliability.',
        keyProjectsSupported: ['Mobile robot 2D SLAM', 'Perimeter security scanning', 'Environment boundary extraction']
      },
      {
        partNumber: '6ES7212-1BD34-4YB0',
        name: 'SIMATIC S7-1200 CPU 1212C Starter Kit',
        manufacturer: 'Siemens',
        category: 'Evaluation Board',
        approxPriceInr: '₹54,000',
        approxPriceUsd: '$590',
        significance: 'Industrial micro-PLC kit complete with digital inputs/outputs, PROFINET interface, and STEP 7 Basic TIA Portal engineering software.',
        keyProjectsSupported: ['Conveyor belt sorting logic', 'Safety emergency interlock control', 'PID temperature regulation']
      }
    ],
    industryStandards: [
      {
        code: 'ISO 10218-1/2',
        title: 'Robots and robotic devices - Safety requirements for industrial robots',
        issuingBody: 'ISO',
        scope: 'Specifies safety requirements for industrial robot manufacture (Part 1) and robot system integration/installation (Part 2).',
        interviewRelevance: 'Mandatory standard for automation engineers designing manufacturing cells at automotive and aerospace plants.'
      },
      {
        code: 'ISO 13849-1',
        title: 'Safety of machinery - Safety-related parts of control systems',
        issuingBody: 'ISO',
        scope: 'Provides safety requirements and design guidance across Performance Levels (PL a to PL e) for electrical, hydraulic, and pneumatic control parts.',
        interviewRelevance: 'Heavily tested in safety PLC interviews (e.g. Siemens Safety Integrated, Beckhoff TwinSAFE).'
      },
      {
        code: 'IEC 61131-3',
        title: 'Programmable controllers - Programming languages',
        issuingBody: 'IEC',
        scope: 'Global standard defining Ladder Diagram (LD), Structured Text (ST), Function Block Diagram (FBD), Instruction List (IL), and Sequential Function Chart (SFC).',
        interviewRelevance: 'Universal benchmark tested across all industrial automation and PLC engineering assessments.'
      }
    ],
    indianRdCenters: [
      {
        company: 'Addverb Technologies (Bot-Valley)',
        location: 'Noida (Sector 156 Mega Factory)',
        labFocus: 'Autonomous mobile robots (AMRs), Automated Storage and Retrieval Systems (ASRS), and multi-agent warehouse fleet dispatchers.',
        hiringRoles: ['Robotics Navigation Engineer', 'Embedded Hardware Developer', 'Motion Control Specialist']
      },
      {
        company: 'GreyOrange Robotics Tech Campus',
        location: 'Gurgaon (Sector 32) & Bengaluru',
        labFocus: 'AI-driven warehouse automation bots (Ranger AMRs, Butler goods-to-person systems), and dynamic logistics path planning algorithms.',
        hiringRoles: ['Robotics Software Engineer (ROS 2)', 'Firmware Engineer - Motor Drives', 'Computer Vision Perception Engineer']
      },
      {
        company: 'ABB Global Technology and Innovation Center',
        location: 'Bengaluru (Peenya Industrial Area & Whitefield)',
        labFocus: 'Industrial articulated robot controllers, collaborative robot (YuMi) safety kinematics, and RobotStudio digital twin simulation.',
        hiringRoles: ['Control Systems Engineer', 'Robotics Software Architect', 'Industrial Field Service Specialist']
      },
      {
        company: 'Siemens Digital Industries',
        location: 'Pune (Kalpataru Prime) & Bengaluru',
        labFocus: 'Factory automation digital twin models, TIA Portal edge applications, and industrial Ethernet (PROFINET/TSN) communication stacks.',
        hiringRoles: ['Automation Solution Architect', 'PLC Application Developer', 'Drives & Motion Control Specialist']
      }
    ],
    dailyDeliverables: [
      {
        name: 'URDF / XACRO Kinematic Robot Model File',
        frequency: 'Bi-weekly during mechanical-electrical integration',
        toolUsed: 'VS Code / SolidWorks URDF Exporter',
        description: 'Unified Robot Description Format XML file defining link inertial tensors, visual meshes, collision geometries, and joint limits for ROS 2.'
      },
      {
        name: 'PLC Structured Text Logic Routine & Safety Interlock Package',
        frequency: 'Weekly during automation sprint cycles',
        toolUsed: 'Siemens TIA Portal / Beckhoff TwinCAT',
        description: 'IEC 61131-3 compliant Structured Text program code with deterministic cycle execution time verification and fault diagnostic alerts.'
      },
      {
        name: 'SLAM Trajectory Benchmark & Localization Drift Report',
        frequency: 'Weekly during AMR fleet testing',
        toolUsed: 'ROS 2 Bag / evo evaluation package',
        description: 'Quantitative comparison of estimated robot trajectory against ground truth motion capture, evaluating Absolute Trajectory Error (ATE < 2 cm).'
      }
    ],
    academicPathway: {
      recommendedElectives: [
        'Modern Control Engineering',
        'Robotics: Kinematics, Dynamics, and Control',
        'Industrial Instrumentation & PLC Automation',
        'Nonlinear Control Systems'
      ],
      benchmarkTextbooks: [
        { title: 'Modern Control Engineering (5th Ed)', author: 'Katsuhiko Ogata', focus: 'State-space, root locus, PID tuning, and frequency response analysis' },
        { title: 'Introduction to Autonomous Mobile Robots (2nd Ed)', author: 'Roland Siegwart & Illah Nourbakhsh', focus: 'Locomotion, mobile kinematics, perception, localization, and SLAM' },
        { title: 'Probabilistic Robotics', author: 'Sebastian Thrun, Wolfram Burgard & Dieter Fox', focus: 'The foundational reference for Kalman filters, particle filters, and robot mapping' }
      ],
      nptelCourseraCourses: [
        { name: 'Robotics', institutionOrProf: 'Prof. Dilip Kumar Pratihar (IIT Kharagpur)', platform: 'NPTEL' },
        { name: 'Industrial Automation and Control', institutionOrProf: 'Prof. S. Sen (IIT Kharagpur)', platform: 'NPTEL' }
      ]
    }
  },
  {
    id: 'renewable-energy-smart-grids',
    number: 5,
    title: 'Renewable Energy Systems and Smart Grids',
    tagline: 'Grid-tied power conversion, microgrids, solar/wind integration, HVDC systems, SCADA grid telemetry, and power quality',
    departmentFocus: 'EEE',
    engineeringFocusFull: 'EEE (Heavy Power & Systems)',
    skillPrerequisites: ['Power System Analysis', 'Switchgear & Protection', 'Grid Codes & Standards', 'SCADA / Telemetry'],
    marketDemand: 'High (Global Decarbonization Mandates)',
    marketDemandTier: 'High',
    overview: 'As renewable generation (solar PV, offshore wind) displaces traditional thermal synchronous generators, power systems are undergoing unprecedented modernization. Engineers design the digital monitoring, protection relays, microgrid controllers, and high-power grid-forming inverters necessary to keep the electrical grid resilient.',
    coreAreas: [
      'Grid-Tied Solar Photovoltaic & Wind Turbine Inverters',
      'Microgrid Control & Battery Energy Storage Systems (BESS)',
      'Substation Automation & Protection Relays (IEC 61850)',
      'Power System Stability, Load Flow & Power Quality Analysis'
    ],
    keyTechnologies: [
      'Grid-forming and grid-following inverter algorithms',
      'High Voltage Direct Current (HVDC) & FACTS controllers',
      'SCADA / EMS (Energy Management Systems) & Phasor Measurement Units (PMU)',
      'IEC 61850 Substation communication & GOOSE messaging',
      'Maximum Power Point Tracking (MPPT - Incremental Conductance, P&O)'
    ],
    majorEmployers: [
      'Schneider Electric',
      'Siemens Energy',
      'GE Vernova',
      'ABB Power Grids (Hitachi Energy)',
      'Tata Power Solar',
      'NextEra Energy',
      'Enphase Energy',
      'Suzlon Group',
      'Adani Green Energy',
      'Power Grid Corporation of India (POWERGRID)'
    ],
    industryTools: [
      { name: 'ETAP', category: 'Power Grid EDA', description: 'Enterprise solution for design, simulation, operation, and automated monitoring of generation and transmission systems' },
      { name: 'DIgSILENT PowerFactory', category: 'Grid Stability', description: 'Leading power system analysis tool for transmission, distribution, and industrial networks' },
      { name: 'PSCAD / EMTDC', category: 'Transient EDA', description: 'Electromagnetic transient simulator for power systems, lightning surges, and HVDC links' },
      { name: 'OpenDSS', category: 'Open Source Grid', description: 'EPRI open-source electric power distribution system simulator for distributed energy resources' },
      { name: 'MATLAB Simscape Power Systems', category: 'Simulation', description: 'Component-level modeling of transformers, transmission lines, and grid-connected converters' }
    ],
    curatedProjects: [
      {
        title: 'Grid-Forming Inverter with Virtual Synchronous Machine (VSM) Control',
        difficulty: 'Industry-Grade',
        description: 'Simulate an inverter capable of black-start and autonomous voltage/frequency regulation in an islanded microgrid without relying on synchronous machine inertia.',
        technologies: ['MATLAB/Simulink', 'VSM Control', 'Microgrid', 'Droop Control']
      },
      {
        title: 'Solar PV 100 kW Rooftop Design with MPPT & IEC 61850 Protection in ETAP',
        difficulty: 'Advanced',
        description: 'Perform load flow analysis, short-circuit calculations, relay coordination, and harmonic distortion assessment (IEEE 519 compliance) for a commercial solar plant.',
        technologies: ['ETAP', 'IEEE 519', 'Relay Coordination', 'Load Flow']
      },
      {
        title: '1 MWh Battery Energy Storage System (BESS) Dispatch Controller',
        difficulty: 'Intermediate',
        description: 'Develop a Python-based energy management scheduler to optimize BESS charging during peak solar hours and discharge during high-tariff evening periods.',
        technologies: ['Python', 'Optimization', 'SCADA', 'BESS', 'Modbus TCP']
      }
    ],
    vlsiEmbeddedConnection: 'Smart grid edge infrastructure relies on specialized DSPs executing fast FFTs for synchrophasor PMUs, cryptographic security hardware for grid tamper prevention, and isolated ADC sampling ICs.',
    careerProgression: [
      { level: 'Entry / Graduate Engineer', typicalTitles: ['Power Systems Engineer', 'Solar Design Engineer', 'Substation Automation Engineer'], focus: 'Load flow studies in ETAP, single-line diagram (SLD) preparation, protective relay setting configuration.' },
      { level: 'Senior / Lead Engineer', typicalTitles: ['Senior Grid Integration Architect', 'Lead Microgrid Designer', 'HVDC Systems Specialist'], focus: 'Interconnection impact studies (IEEE 1547), islanding detection, substation automation integration (IEC 61850).' },
      { level: 'Principal / Chief Consultant', typicalTitles: ['Chief Power Systems Advisor', 'Director of Transmission Planning', 'Fellow in Smart Grids'], focus: 'National grid decarbonization planning, trans-continental HVDC interconnection strategy.' }
    ],
    interviewDrills: [
      'Derive the power-angle equation (P = (V1*V2/X)*sin(δ)) and explain how reactive power relates to voltage magnitude control.',
      'What is the fundamental difference between Grid-Following (GFL) and Grid-Forming (GFM) inverters, and why are GFM inverters vital in high-renewable grids?',
      'Explain how GOOSE (Generic Object Oriented Substation Events) messaging operates in the IEC 61850 standard and why it bypasses the TCP/IP stack.',
      'How does the Incremental Conductance MPPT algorithm determine whether the operating point is to the left or right of the maximum power point (dI/dV + I/V = 0)?'
    ],
    salaryBenchmarks: [
      {
        experienceLevel: 'Entry (0-2 yrs)',
        indiaLpaRange: '₹6.0 - 12.5 LPA',
        indiaMedianLpa: '₹8.5 LPA',
        globalUsdRange: '$80,000 - $115,000',
        keyDrivers: ['ETAP / PowerFactory modeling skills', 'Solid power systems fundamentals (Per-Unit system, Symmetrical components)', 'Understanding of solar / wind conversion']
      },
      {
        experienceLevel: 'Mid-Level (3-6 yrs)',
        indiaLpaRange: '₹14.0 - 26.0 LPA',
        indiaMedianLpa: '₹19.5 LPA',
        globalUsdRange: '$120,000 - $165,000',
        keyDrivers: ['Grid interconnection studies (IEEE 1547 / CEA)', 'IEC 61850 substation relay configuration', 'BESS container system design']
      },
      {
        experienceLevel: 'Senior / Lead (7-11 yrs)',
        indiaLpaRange: '₹26.0 - 45.0 LPA',
        indiaMedianLpa: '₹34.0 LPA',
        globalUsdRange: '$170,000 - $235,000',
        keyDrivers: ['Utility-scale solar (100MW+) balance-of-plant design', 'Substation automation commissioning', 'Grid code compliance sign-off']
      },
      {
        experienceLevel: 'Principal / Architect (12+ yrs)',
        indiaLpaRange: '₹45.0 - 75.0+ LPA',
        indiaMedianLpa: '₹58.0 LPA',
        globalUsdRange: '$240,000 - $340,000+',
        keyDrivers: ['National grid interconnect advisory', 'HVDC converter station project leadership', 'Executive client advisory']
      }
    ],
    hardwareKits: [
      {
        partNumber: 'STEVAL-EDT001V1',
        name: 'Digital Power / Microinverter Evaluation Kit',
        manufacturer: 'STMicroelectronics',
        category: 'Evaluation Board',
        approxPriceInr: '₹28,000',
        approxPriceUsd: '$310',
        significance: 'Evaluation kit designed for single-phase solar grid-tie inverters with high-resolution digital control, MPPT telemetry, and anti-islanding algorithms.',
        keyProjectsSupported: ['Grid-tied inverter synchronization', 'Phase-Locked Loop (PLL) design', 'Total Harmonic Distortion (THD) minimization']
      },
      {
        partNumber: 'EM24-DIN-AV53DIS',
        name: 'Carlo Gavazzi 3-Phase Smart Energy Meter with RS-485 Modbus',
        manufacturer: 'Carlo Gavazzi',
        category: 'Test & Measurement',
        approxPriceInr: '₹18,500',
        approxPriceUsd: '$210',
        significance: 'Industrial Class 1 energy meter widely utilized in smart microgrids and commercial solar plants for bi-directional net metering and SCADA telemetry.',
        keyProjectsSupported: ['RS-485 Modbus RTU SCADA integration', 'Active/reactive energy logging', 'Peak demand tracking']
      },
      {
        partNumber: 'NUCLEO-F334R8',
        name: 'STM32F334 Digital Power MCU Board',
        manufacturer: 'STMicroelectronics',
        category: 'Evaluation Board',
        approxPriceInr: '₹2,800',
        approxPriceUsd: '$32',
        significance: 'Equipped with High-Resolution Timer (HRTIM) capable of 217 picosecond resolution, tailored for digital switch-mode power and solar MPPT converters.',
        keyProjectsSupported: ['Synchronous buck-boost MPPT controller', 'Digital resonant LLC converter', 'Power factor correction (PFC)']
      }
    ],
    industryStandards: [
      {
        code: 'IEEE 1547-2018',
        title: 'Standard for Interconnection and Interoperability of Distributed Energy Resources',
        issuingBody: 'IEEE',
        scope: 'The universal grid-code standard governing how solar, wind, and batteries connect to the grid, mandating Low-Voltage Ride-Through (LVRT) and frequency support.',
        interviewRelevance: 'The single most common interview topic for grid-tied inverter and renewable energy engineering positions globally.'
      },
      {
        code: 'IEC 61850-7/8/9',
        title: 'Communication networks and systems for power utility automation',
        issuingBody: 'IEC',
        scope: 'Defines communication between intelligent electronic devices (IEDs) in electrical substations, including GOOSE messaging and Sampled Measured Values (SMV).',
        interviewRelevance: 'Required knowledge for Substation Automation and Power System Protection interviews at ABB, Siemens, and Schneider.'
      },
      {
        code: 'IEC 62109-1/2',
        title: 'Safety of power converters for use in photovoltaic power systems',
        issuingBody: 'IEC',
        scope: 'Specific electrical safety and insulation requirements for PV inverters, addressing shock hazard, thermal fire prevention, and mechanical protection.',
        interviewRelevance: 'Mandatory standard for solar inverter hardware designers and product certification specialists.'
      }
    ],
    indianRdCenters: [
      {
        company: 'Schneider Electric Global Innovation Hub',
        location: 'Bengaluru (Bagmane World Technology Centre)',
        labFocus: 'EcoStruxure Grid architecture, smart microgrid controllers, automated distribution management systems (ADMS), and digital substation IEDs.',
        hiringRoles: ['Smart Grid Software Engineer', 'Protection Relay Specialist', 'Microgrid Solution Architect']
      },
      {
        company: 'Hitachi Energy (ABB Power Grids)',
        location: 'Bengaluru (Maneja Works & Whitefield) & Vadodara',
        labFocus: 'HVDC Light converter valve electronics, substation automation systems (MicroSCADA Pro), and transformer digital monitoring.',
        hiringRoles: ['HVDC Control Systems Specialist', 'SCADA Project Engineer', 'Power System Consultant']
      },
      {
        company: 'Siemens Energy India',
        location: 'Gurgaon (Cyber City) & Mumbai (Kalwa Works)',
        labFocus: 'Gas-insulated switchgear (GIS) digitalization, SIPROTEC digital protection relays, and hydrogen electrolyzer grid integration.',
        hiringRoles: ['Substation Automation Engineer', 'Protection & Control Designer', 'Grid Stability Analyst']
      },
      {
        company: 'Tata Power Delhi Distribution Limited (TPDDL)',
        location: 'New Delhi (Rohini Tech Campus)',
        labFocus: 'Advanced Metering Infrastructure (AMI), smart grid self-healing network deployment, and rooftop solar hosting capacity modeling.',
        hiringRoles: ['Distribution Automation Specialist', 'Power Quality Engineer', 'AMI Network Specialist']
      }
    ],
    dailyDeliverables: [
      {
        name: 'Single-Line Diagram (SLD) & Protection Coordination Study',
        frequency: 'Milestone delivery before project EPC',
        toolUsed: 'ETAP / AutoCAD Electrical',
        description: 'Complete electrical schematic detailing circuit breakers, current transformers (CT), potential transformers (PT), and protective relay time-current curves (TCC).'
      },
      {
        name: 'IEC 61850 Substation Configuration Description (.SCD) File',
        frequency: 'Weekly during automation commissioning',
        toolUsed: 'System Configurator / XML Editor',
        description: 'Formal XML file capturing all IED logical nodes, GOOSE publisher-subscriber bindings, and ethernet network architecture for an automated substation.'
      },
      {
        name: 'Grid Harmonic Distortion & Power Quality Audit Report',
        frequency: 'Monthly during operational testing',
        toolUsed: 'Fluke 435 Series II Power Quality Analyzer',
        description: 'Measurements of Total Harmonic Distortion (THD-V < 5%, THD-I < 8%), voltage unbalance factor, and flicker according to IEEE 519 standards.'
      }
    ],
    academicPathway: {
      recommendedElectives: [
        'Power System Analysis & Stability',
        'Power System Protection & Switchgear',
        'Smart Grid Architecture & Renewable Integration',
        'High Voltage DC Transmission (HVDC)'
      ],
      benchmarkTextbooks: [
        { title: 'Power System Analysis', author: 'Hadi Saadat', focus: 'The quintessential student and engineering manual on load flow, fault analysis, and stability' },
        { title: 'Grid Converters for Photovoltaic and Wind Power Systems', author: 'Remus Teodorescu, Marco Liserre, Pedro Rodriguez', focus: 'The foundational reference for PLLs, grid synchronization, and filter design' },
        { title: 'Power System Protection and Switchgear', author: 'Badri Ram & D.N. Vishwakarma', focus: 'Comprehensive coverage of numerical relays, busbar protection, and transformer differential schemes' }
      ],
      nptelCourseraCourses: [
        { name: 'Smart Grid: Basics to Advanced Technologies', institutionOrProf: 'Prof. N.P. Padhy (IIT Roorkee)', platform: 'NPTEL' },
        { name: 'Operation and Control of Power Systems', institutionOrProf: 'Prof. Ch. Venkaiah (IIT Madras)', platform: 'NPTEL' }
      ]
    }
  },
  {
    id: 'pcb-hardware-engineering',
    number: 6,
    title: 'PCB Design and Hardware Engineering',
    tagline: 'High-speed multilayer PCB layout, signal & power integrity (SI/PI), EMI/EMC compliance, and physical board bring-up',
    departmentFocus: 'Both',
    engineeringFocusFull: 'Both (Physical Hardware)',
    skillPrerequisites: ['EDA Tools (Altium / KiCad / Allegro)', 'Signal Integrity (High-Speed)', 'EMI/EMC Design Rules', 'Manufacturing (DFM/DFA)'],
    marketDemand: 'Stable & Enduring (Every Physical Device)',
    marketDemandTier: 'Stable',
    overview: 'The physical backbone of every electronic device on earth. Whether an enterprise AI server, satellite payload, or biomedical patch, a schematic must be routed onto a physical multilayer board with strict adherence to high-speed signal integrity, impedance control, power delivery networks, and thermal dissipation.',
    coreAreas: [
      'High-Speed Digital PCB Layout (DDR4/5, PCIe Gen 4/5, USB4)',
      'Signal Integrity (SI) & Power Integrity (PI) Simulation',
      'Electromagnetic Compatibility (EMI/EMC) Mitigation',
      'Design for Manufacturing & Assembly (DFM / DFA)'
    ],
    keyTechnologies: [
      'Controlled impedance routing (Microstrip, Stripline, Differential pairs)',
      'Power Delivery Networks (PDN - Decoupling capacitor optimization, target impedance)',
      'High-Density Interconnect (HDI - Blind/Buried microvias, via-in-pad)',
      'Length/delay matching for high-speed parallel buses (DDR skew budget < 5ps)',
      'Thermal vias, heat-pipe copper pours & thermal relief pads'
    ],
    majorEmployers: [
      'Cisco Systems',
      'Intel Corporation',
      'NVIDIA',
      'Apple',
      'Honeywell Aerospace',
      'Bharat Electronics Limited (BEL)',
      'VVDN Technologies',
      'Sanmina-SCI',
      'Jabil Circuits',
      'Lenovo'
    ],
    industryTools: [
      { name: 'Altium Designer', category: 'Premier EDA', description: 'Industry-standard PCB design suite unifying schematics, multi-layer routing, 3D clearance, and manufacturing output' },
      { name: 'Cadence Allegro', category: 'Enterprise EDA', description: 'Enterprise-grade layout tool favored by computing and networking giants (Intel, Cisco, NVIDIA) for complex boards' },
      { name: 'KiCad 8', category: 'Open Source EDA', description: 'Powerful, rapidly growing open-source EDA suite with active CERN backing and full schematic-to-Gerber capability' },
      { name: 'Siemens HyperLynx', category: 'SI/PI Simulation', description: 'Premier simulation tool for high-speed signal integrity, eye diagrams, crosstalk, and power delivery network impedance' },
      { name: 'Ansys SIwave', category: 'Electromagnetic FEA', description: 'Full-wave EM field solver for package and board level power integrity and radiated emissions prediction' }
    ],
    curatedProjects: [
      {
        title: '6-Layer DDR4 Memory & USB 3.2 High-Speed Board in KiCad 8',
        difficulty: 'Industry-Grade',
        description: 'Design and route an ARM Cortex-A53 computing board with length-matched DDR4 fly-by topology (skews < 2ps), 90Ω differential USB pairs, and a 4-plane impedance stackup.',
        technologies: ['KiCad 8', 'DDR4 Routing', 'High-Speed Layout', 'Signal Integrity']
      },
      {
        title: 'PDN Impedance Optimization for FPGA Core Supply Rail (1.0V @ 20A)',
        difficulty: 'Advanced',
        description: 'Model a power delivery network in HyperLynx / Ansys SIwave, placing multi-decade decoupling capacitors (0.1uF, 1uF, 10uF) to maintain target impedance below 15 mΩ up to 500 MHz.',
        technologies: ['HyperLynx', 'Power Integrity', 'PDN', 'Decoupling']
      },
      {
        title: 'Multi-Sensor IoT Sensor Hub with Isolated RS-485 & Battery Charger',
        difficulty: 'Intermediate',
        description: 'Layout a 4-layer compact board with galvanic isolation, ESD protection diodes (IEC 61000-4-2), and thermal copper pour, passing DFM audit at JLCPCB/PCBWay.',
        technologies: ['Altium Designer', 'DFM', 'EMI/EMC', 'RS-485', 'Hardware Testing']
      }
    ],
    vlsiEmbeddedConnection: 'The final bridge between silicon chips and the real world. Silicon packaging engineers and hardware board designers collaborate closely on BGA ball escape routing, pinouts, and package parasitic S-parameters.',
    careerProgression: [
      { level: 'Entry / Junior Hardware Engineer', typicalTitles: ['Hardware Design Engineer', 'PCB Layout Designer', 'Board Bring-Up Engineer'], focus: 'Schematic entry, component footprint creation (IPC-7351), 4-layer routing, lab bench multimeter and oscilloscope bring-up.' },
      { level: 'Senior / Lead Hardware Engineer', typicalTitles: ['Senior Hardware Architect', 'Signal Integrity Specialist', 'Hardware Technical Lead'], focus: '12-24 layer high-density interconnect (HDI) routing, HyperLynx SI/PI eye diagram sign-off, FCC/CE EMC chamber compliance.' },
      { level: 'Principal / Hardware Director', typicalTitles: ['Principal Hardware Engineer', 'Director of Hardware Engineering', 'Chief Hardware Architect'], focus: 'System architecture definition, multi-million dollar ASIC test board roadmaps, manufacturing partner selection.' }
    ],
    interviewDrills: [
      'Explain the return current path for a high-frequency microstrip trace and what happens when it crosses a split in the ground reference plane.',
      'How do you calculate the characteristic impedance of a single-ended microstrip trace, and what geometric parameters determine it?',
      'Why is decoupling capacitor loop inductance more critical than nominal capacitance value at frequencies above 100 MHz?',
      'What are the critical design differences between IPC Class 2 (general electronics) and IPC Class 3 (high-reliability aerospace/defense)?'
    ],
    salaryBenchmarks: [
      {
        experienceLevel: 'Entry (0-2 yrs)',
        indiaLpaRange: '₹6.5 - 13.5 LPA',
        indiaMedianLpa: '₹9.0 LPA',
        globalUsdRange: '$85,000 - $120,000',
        keyDrivers: ['Hands-on experience in Altium or KiCad', 'Knowledge of DFM rules & stack-up calculation', 'Good bench soldering and debugging skills']
      },
      {
        experienceLevel: 'Mid-Level (3-6 yrs)',
        indiaLpaRange: '₹15.0 - 28.0 LPA',
        indiaMedianLpa: '₹21.0 LPA',
        globalUsdRange: '$130,000 - $175,000',
        keyDrivers: ['High-speed DDR/PCIe routing experience', 'HyperLynx SI/PI simulation proficiency', 'FCC / CE EMC compliance track record']
      },
      {
        experienceLevel: 'Senior / Lead (7-11 yrs)',
        indiaLpaRange: '₹28.0 - 48.0 LPA',
        indiaMedianLpa: '₹37.0 LPA',
        globalUsdRange: '$180,000 - $255,000',
        keyDrivers: ['16+ layer complex server / aerospace board design', 'HDI microvia stackup sign-off', 'Manufacturing line NPI leadership']
      },
      {
        experienceLevel: 'Principal / Architect (12+ yrs)',
        indiaLpaRange: '₹48.0 - 80.0+ LPA',
        indiaMedianLpa: '₹64.0 LPA',
        globalUsdRange: '$255,000 - $370,000+',
        keyDrivers: ['Data center server motherboard architecture', 'Ultra-high-speed 112Gbps PAM4 SerDes board design', 'Patents in packaging & thermal solutions']
      }
    ],
    hardwareKits: [
      {
        partNumber: 'SDS1104X-E',
        name: 'Siglent SDS1104X-E 4-Channel 100MHz Digital Oscilloscope',
        manufacturer: 'Siglent Technologies',
        category: 'Test & Measurement',
        approxPriceInr: '₹36,000',
        approxPriceUsd: '$379',
        significance: 'The benchmark hardware workbench oscilloscope for engineering students and startups, featuring 1 GSa/s, deep 14 Mpts memory, and hardware serial decoding.',
        keyProjectsSupported: ['SPI/I2C protocol debugging', 'PWM switching waveform analysis', 'Clock jitter measurement']
      },
      {
        partNumber: 'LOGIC-PRO-8',
        name: 'Saleae Logic Pro 8 High-Speed USB Logic Analyzer',
        manufacturer: 'Saleae',
        category: 'Test & Measurement',
        approxPriceInr: '₹46,000',
        approxPriceUsd: '$499',
        significance: '8-channel 500 MS/s USB logic analyzer with support for over 25 industrial protocols, including CAN, Async Serial, SPI, and I2C.',
        keyProjectsSupported: ['Timing violation discovery', 'Firmware-to-hardware communication debugging', 'Glitch detection']
      },
      {
        partNumber: 'NANOVNA-F-V2',
        name: 'NanoVNA-F V2 Vector Network Analyzer (3 GHz)',
        manufacturer: 'Deep-Elec',
        category: 'Test & Measurement',
        approxPriceInr: '₹12,000',
        approxPriceUsd: '$135',
        significance: 'Portable 50 kHz to 3 GHz vector network analyzer for measuring S11 return loss, S21 insertion loss, antenna VSWR, and trace characteristic impedance.',
        keyProjectsSupported: ['PCB trace impedance validation', 'Antenna matching network tuning', 'RF bandpass filter characterization']
      }
    ],
    industryStandards: [
      {
        code: 'IPC-2221B',
        title: 'Generic Standard on Printed Board Design',
        issuingBody: 'IPC',
        scope: 'The fundamental design standard specifying electrical clearance, dielectric spacing, trace current carrying capacity, and mechanical thermal management.',
        interviewRelevance: 'The universal baseline standard referenced in every professional hardware engineering interview globally.'
      },
      {
        code: 'IPC-7351B',
        title: 'Generic Requirements for Surface Mount Design and Land Pattern Standard',
        issuingBody: 'IPC',
        scope: 'Defines geometric land patterns (footprints) for all surface mount component packages (QFN, BGA, SOIC, 0402) to ensure flawless soldering.',
        interviewRelevance: 'Questions focus on solder fillet formation, heel/toe clearances, and courtyard boundaries.'
      },
      {
        code: 'IPC-A-610 Class 2 & 3',
        title: 'Acceptability of Electronic Assemblies',
        issuingBody: 'IPC',
        scope: 'The global standard for electronics assembly inspection: Class 2 governs general commercial products; Class 3 governs high-reliability aerospace/medical devices.',
        interviewRelevance: 'Essential knowledge for design-for-manufacturing (DFM) and manufacturing yield engineering roles.'
      }
    ],
    indianRdCenters: [
      {
        company: 'Cisco Systems Hardware Design Group',
        location: 'Bengaluru (Cessna Business Park, Outer Ring Road)',
        labFocus: 'Core enterprise multi-terabit Ethernet switches (Catalyst series), 28-layer high-density server motherboards, and 112G SerDes signal integrity labs.',
        hiringRoles: ['Hardware Design Engineer', 'Signal Integrity Specialist', 'PCB Layout Designer']
      },
      {
        company: 'Honeywell Technology Solutions (HTS)',
        location: 'Bengaluru (Bannerghatta Road) & Madurai',
        labFocus: 'Avionics flight control electronics, cockpit display boards, and hazardous industrial zone intrinsically safe hardware (Class 3 reliability).',
        hiringRoles: ['Avionics Hardware Designer', 'EMI/EMC Validation Specialist', 'Embedded Hardware Engineer']
      },
      {
        company: 'Bharat Electronics Limited (BEL)',
        location: 'Bengaluru (Central Research Lab, Jalahalli)',
        labFocus: 'Defense tactical radios, naval electronic warfare hardware, and radar beamformer multilayer PCB assemblies.',
        hiringRoles: ['Senior Hardware Design Engineer', 'RF Board Layout Specialist', 'Quality Assurance Specialist']
      },
      {
        company: 'VVDN Technologies Global Innovation Park',
        location: 'Manesar (Gurgaon) & Kochi Infopark',
        labFocus: 'Complete Product Engineering (ODM/OEM) for 5G small cells, automotive telematics control units, and AI vision cameras.',
        hiringRoles: ['Hardware R&D Engineer', 'High-Speed Layout Designer', 'Manufacturing Test Engineer']
      }
    ],
    dailyDeliverables: [
      {
        name: 'Gerber RS-274X & ODB++ Fabrication Release Package',
        frequency: 'Milestone sign-off before fabrication',
        toolUsed: 'Altium / Allegro / CAM350',
        description: 'Complete manufacturing package comprising copper artwork layers, NC drill tables, solder mask, silkscreen, pick-and-place centroid files, and IPC netlist.'
      },
      {
        name: 'Stack-Up Calculation & Impedance Table Sheet',
        frequency: 'Initial phase of PCB layout',
        toolUsed: 'Polar SI9000 / Altium Layer Stack Manager',
        description: 'Engineering specification defining prepreg/core dielectric constants (Dk/Df), copper foil weights, and target 50Ω single-ended / 90Ω differential trace widths.'
      },
      {
        name: 'Signal Integrity Eye-Diagram & Crosstalk Simulation Report',
        frequency: 'Pre-layout and post-layout verification',
        toolUsed: 'Siemens HyperLynx / Ansys SIwave',
        description: 'Simulation of eye height, eye width, jitter, and crosstalk margins under worst-case transmitter rise times and receiver equalization (CTLE/DFE).'
      }
    ],
    academicPathway: {
      recommendedElectives: [
        'Electronic Packaging & PCB Design',
        'Electromagnetic Compatibility & Interference (EMC/EMI)',
        'High-Speed Digital System Design',
        'Microelectronic Circuit Fabrication'
      ],
      benchmarkTextbooks: [
        { title: 'High-Speed Digital Design: A Handbook of Black Magic', author: 'Howard Johnson & Martin Graham', focus: 'The legendary masterpiece on signal integrity, transmission lines, and grounding' },
        { title: 'Signal and Power Integrity - Simplified (3rd Ed)', author: 'Eric Bogatin', focus: 'The clearest physical intuition on impedance, return paths, and PDN design' },
        { title: 'Printed Circuit Board Design Techniques for EMC Compliance', author: 'Mark I. Montrose', focus: 'Practical grounding, shielding, and bypass capacitor placement to ace FCC/CE testing' }
      ],
      nptelCourseraCourses: [
        { name: 'Electronic Packaging and Manufacturing', institutionOrProf: 'Prof. N.V. Chalapathi Rao (IISc Bangalore)', platform: 'NPTEL' },
        { name: 'Design for Internet of Things', institutionOrProf: 'Prof. T.V. Prabhakar (IISc Bangalore)', platform: 'NPTEL' }
      ]
    }
  }
];

export interface ComparativeMatrixItem {
  careerField: string;
  fieldId: string;
  primaryEngineeringFocus: string;
  departmentAlignment: 'ECE' | 'EEE' | 'Both';
  skillPrerequisites: string;
  marketDemand: string;
  marketDemandTier: 'Massive' | 'Very High' | 'High' | 'Stable';
  flagshipEmployers: string[];
}

export const DIRECT_COMPARATIVE_GUIDE: ComparativeMatrixItem[] = [
  {
    careerField: 'Telecom / Wireless',
    fieldId: 'telecom-wireless',
    primaryEngineeringFocus: 'ECE (Signals & Networks)',
    departmentAlignment: 'ECE',
    skillPrerequisites: 'Digital Communication, RF, C++',
    marketDemand: 'High (5G/6G Expansion)',
    marketDemandTier: 'High',
    flagshipEmployers: ['Qualcomm', 'Ericsson', 'Nokia', 'MediaTek', 'Apple']
  },
  {
    careerField: 'Signal & Image Proc.',
    fieldId: 'signal-image-vision',
    primaryEngineeringFocus: 'ECE (Algorithms & Math)',
    departmentAlignment: 'ECE',
    skillPrerequisites: 'MATLAB, Python, DSP basics',
    marketDemand: 'Very High (AI/MedTech)',
    marketDemandTier: 'Very High',
    flagshipEmployers: ['GE Healthcare', 'Philips', 'Siemens', 'Adobe', 'Sony']
  },
  {
    careerField: 'Power Electronics & EV',
    fieldId: 'power-electronics-ev',
    primaryEngineeringFocus: 'EEE (Hardware & Conversion)',
    departmentAlignment: 'EEE',
    skillPrerequisites: 'Circuit Design, SiC/GaN, Simulation',
    marketDemand: 'Massive (EV Boom)',
    marketDemandTier: 'Massive',
    flagshipEmployers: ['Tesla', 'Rivian', 'Bosch', 'TI', 'Infineon']
  },
  {
    careerField: 'Robotics & Control',
    fieldId: 'control-robotics-automation',
    primaryEngineeringFocus: 'Both (Integration & Logic)',
    departmentAlignment: 'Both',
    skillPrerequisites: 'Feedback systems, ROS, PLCs',
    marketDemand: 'High (Factory Automation)',
    marketDemandTier: 'High',
    flagshipEmployers: ['ABB', 'Siemens', 'Fanuc', 'Honeywell', 'Boston Dynamics']
  },
  {
    careerField: 'Renewables & Grids',
    fieldId: 'renewable-energy-smart-grids',
    primaryEngineeringFocus: 'EEE (Heavy Power & Systems)',
    departmentAlignment: 'EEE',
    skillPrerequisites: 'Power analysis, Grid safety, SCADA',
    marketDemand: 'High (Sustainability mandates)',
    marketDemandTier: 'High',
    flagshipEmployers: ['NextEra Energy', 'Schneider Electric', 'GE Vernova', 'ABB', 'Siemens Energy']
  },
  {
    careerField: 'PCB / Hardware Eng.',
    fieldId: 'pcb-hardware-engineering',
    primaryEngineeringFocus: 'Both (Physical Hardware)',
    departmentAlignment: 'Both',
    skillPrerequisites: 'Altium/Allegro, Signal Integrity',
    marketDemand: 'Stable (Consumer/Industrial Tech)',
    marketDemandTier: 'Stable',
    flagshipEmployers: ['Intel', 'Cisco', 'NVIDIA', 'Garmin', 'Lenovo']
  }
];

export interface TechHubCluster {
  city: string;
  state: string;
  tagline: string;
  prominentParks: string[];
  keyFieldsStrong: string[];
  notableEmployers: string[];
}

export const INDIAN_TECH_HUBS: TechHubCluster[] = [
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley of India • The undisputed hub for Telecom RFIC, EV Powertrain, Medical Imaging, and PCB Design',
    prominentParks: ['Whitefield EPIP Zone', 'Electronic City Phases 1 & 2', 'Manyata Embassy Tech Park', 'Outer Ring Road (ORR) Corridor', 'Bagmane Tech Park'],
    keyFieldsStrong: ['Telecom & 5G/6G', 'Power Electronics & EV', 'Signal & Image Processing', 'PCB & Hardware Design', 'Smart Grids'],
    notableEmployers: ['Qualcomm', 'Texas Instruments', 'Ather Energy', 'GE Healthcare', 'Cisco Systems', 'Schneider Electric', 'Samsung R&D', 'Infineon']
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Global R&D capital for high-speed wireless modems, defense electronics, and semiconductor applications',
    prominentParks: ['Hitec City', 'Mindspace Cyberabad', 'Financial District Gachibowli', 'Hardware Park Shamshabad'],
    keyFieldsStrong: ['Telecom & 5G', 'PCB & Hardware', 'Signal Processing'],
    notableEmployers: ['Qualcomm Wireless R&D', 'Mediatek', 'AMD R&D', 'Honeywell', 'BEL', 'Collins Aerospace']
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    tagline: 'Automotive and Robotics heartland of India • Pioneer in EV traction inverters, industrial robotics, and power systems',
    prominentParks: ['Chakan Industrial Corridor', 'Pimpri-Chinchwad Automotive Belt', 'Hinjawadi Infotech Park', 'Talegaon'],
    keyFieldsStrong: ['Power Electronics & EV', 'Robotics & Automation', 'Smart Grids'],
    notableEmployers: ['Tata Motors EV Tech Center', 'KUKA Robotics', 'Siemens Digital Industries', 'Suzlon One Earth', 'Bharat Forge']
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Hardware electronics manufacturing corridor and energy systems center • Proximity to auto mega-factories and SEZs',
    prominentParks: ['Oragadam Industrial Corridor', 'Sriperumbudur High-Tech SEZ', 'Taramani Ascendas IT Park', 'Guindy Industrial Estate'],
    keyFieldsStrong: ['Power Electronics & EV', 'PCB Manufacturing & NPI', 'Renewables & Grid Tech', 'Telecom Networks'],
    notableEmployers: ['Ola Electric FutureFactory', 'Sanmina-SCI', 'Nokia Networks R&D', 'GE Vernova Grid Solutions', 'Delta Electronics']
  },
  {
    city: 'Delhi NCR (Noida & Gurgaon)',
    state: 'Delhi / UP / Haryana',
    tagline: 'Warehouse robotics innovation epicenter, industrial automation hubs, and major telecom headquarters',
    prominentParks: ['Noida Sector 156 / Expressway Tech Belt', 'Gurgaon Cyber City & Sector 32', 'Manesar IMT High-Tech Cluster'],
    keyFieldsStrong: ['Robotics & Industrial Automation', 'Smart Grids & Metering', 'Telecom Infrastructure', 'PCB & ODM'],
    notableEmployers: ['Addverb Technologies (Bot-Valley)', 'GreyOrange', 'Ericsson R&D', 'VVDN Technologies Global Innovation Park', 'Tata Power-DDL']
  }
];

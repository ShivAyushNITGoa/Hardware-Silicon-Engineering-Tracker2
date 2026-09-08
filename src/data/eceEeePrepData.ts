export interface EceEeePrepPhase {
  phaseNumber: number;
  title: string;
  durationWeeks: string;
  focusArea: string;
  keyConcepts: string[];
  handsOnMilestones: string[];
  primaryTools: string[];
  deliverable: string;
  recommendedResources: Array<{ title: string; type: 'Book' | 'Course' | 'Documentation' | 'Standard'; linkOrAuthor: string }>;
}

export interface EceEeeToolProfile {
  name: string;
  category: string;
  isFreeOrOpenSource: boolean;
  enterpriseEquivalent?: string;
  primaryUse: string;
  setupGuide: {
    osSupport: string;
    quickInstallCommand: string;
    prerequisites: string;
  };
  industryWorkflow: string[];
  handsOnLabDrill: {
    title: string;
    objective: string;
    steps: string[];
    verificationCheck: string;
  };
}

export interface EceEeeInterviewDrill {
  topic: string;
  question: string;
  difficulty: 'Medium' | 'Hard' | 'Staff/Principal';
  targetCompany: string;
  technicalAnswer: string;
  keyKeywordsToMention: string[];
}

export interface EceEeeFieldPrepTrack {
  fieldId: string;
  fieldTitle: string;
  department: 'ECE' | 'EEE' | 'Both';
  badgeColor: string;
  tagline: string;
  prerequisites: string[];
  weeklyCommitment: string;
  phases: EceEeePrepPhase[];
  toolProfiles: EceEeeToolProfile[];
  capstoneBlueprint: {
    title: string;
    hardwareCostEstimate: string;
    estimatedBuildTime: string;
    objective: string;
    hardwareBOM: string[];
    softwareStack: string[];
    gitHubStructure: string[];
    testingAndSignoff: string[];
  };
  interviewDrills: EceEeeInterviewDrill[];
  atsResumeBullets: string[];
}

export const ECE_EEE_PREP_TRACKS: EceEeeFieldPrepTrack[] = [
  {
    fieldId: 'telecom-wireless',
    fieldTitle: '5G/6G & RF Wireless Engineering',
    department: 'ECE',
    badgeColor: 'sky',
    tagline: 'Physical layer DSP, SDR basebands, beamforming arrays, Open5GS & 3GPP protocol stacks',
    prerequisites: ['Signals & Systems', 'Electromagnetic Waves', 'Digital Communication', 'C++ / Python'],
    weeklyCommitment: '12-15 hours/week for 16 weeks',
    phases: [
      {
        phaseNumber: 1,
        title: 'Wave Propagation, RF Front-Ends & Information Theory',
        durationWeeks: 'Weeks 1-4',
        focusArea: 'Electromagnetics, S-parameters, link budgets & Shannon capacity',
        keyConcepts: [
          'Smith Chart impedance matching (L-section, single stub) for 50-ohm feeds',
          'S-parameters (S11 return loss, S21 transmission gain, VSWR < 1.5)',
          'Friis transmission equation, thermal noise floor (kTB), NF (Noise Figure) cascading',
          'Digital modulations: QPSK, 16-QAM, 64-QAM, 256-QAM constellations & EVM limits',
          'Channel coding: LDPC (Low-Density Parity-Check) & Polar Codes under 3GPP TS 38.212'
        ],
        handsOnMilestones: [
          'Calculate complete link budget for 3.5 GHz n78 5G NR base station to smartphone (140 dB path loss)',
          'Simulate microstrip quarter-wave impedance transformer in Qucs-S / OpenEMS',
          'Plot theoretical BER vs Eb/N0 curves for BPSK, QPSK and 16-QAM under AWGN in Python NumPy'
        ],
        primaryTools: ['Python (NumPy, Scipy)', 'Qucs-S / OpenEMS', 'Smith Chart Software'],
        deliverable: 'Automated Python Link Budget Calculator & S-parameter visualizer repository',
        recommendedResources: [
          { title: 'Microwave Engineering', type: 'Book', linkOrAuthor: 'David M. Pozar' },
          { title: 'Principles of Digital Communication', type: 'Book', linkOrAuthor: 'Robert G. Gallager' },
          { title: 'Principles of 5G & Beyond', type: 'Course', linkOrAuthor: 'Prof. Aditya K. Jagannatham (IIT Kanpur - NPTEL)' }
        ]
      },
      {
        phaseNumber: 2,
        title: 'SDR Prototyping, GNU Radio & OFDM Physical Layer',
        durationWeeks: 'Weeks 5-8',
        focusArea: 'Baseband DSP, carrier synchronization, channel estimation & cyclic prefix',
        keyConcepts: [
          'OFDM numerologies in 5G NR (SCS: 15, 30, 60, 120 kHz) & cyclic prefix overhead',
          'Costas Loop for carrier frequency offset (CFO) and phase recovery',
          'Schmidl & Cox algorithm for frame synchronization and symbol boundary detection',
          'Zero-Forcing (ZF) and MMSE channel equalization in Rayleigh fading channels',
          'IQ imbalance and DC offset compensation in zero-IF quadrature receivers'
        ],
        handsOnMilestones: [
          'Build and execute a complete 64-subcarrier OFDM transceiver flowgraph in GNU Radio 3.10',
          'Implement Schmidl-Cox frame preamble correlation in C++ Out-Of-Tree (OOT) block',
          'Stream synthetic IQ data into an RTL-SDR / ADALM-PLUTO and capture FM/ADS-B signals'
        ],
        primaryTools: ['GNU Radio 3.10', 'ADI PlutoSDR / RTL-SDR', 'MATLAB / Octave Communications Toolbox'],
        deliverable: 'Custom GNU Radio OOT C++ module performing Schmidl-Cox timing sync with testbench',
        recommendedResources: [
          { title: 'Software Defined Radio for Engineers', type: 'Book', linkOrAuthor: 'Travis F. Collins (Analog Devices)' },
          { title: 'PySDR: A Guide to SDR and DSP using Python', type: 'Documentation', linkOrAuthor: 'Dr. Marc Lichtman (pysdr.org)' }
        ]
      },
      {
        phaseNumber: 3,
        title: '5G NR Standalone Core & RAN Protocol Stacks',
        durationWeeks: 'Weeks 9-12',
        focusArea: '3GPP L1/L2/L3 stacks, gNodeB software, Open5GS, srsRAN & Wireshark analysis',
        keyConcepts: [
          '5G NR Protocol layers: SDAP, PDCP, RLC, MAC, and PHY functions',
          '5G Service-Based Architecture (SBA): AMF, SMF, UPF, UDM over HTTP/2 REST APIs',
          'Random Access Channel (RACH) preamble transmission and MSG1/2/3/4 handshake',
          'Discontinuous Reception (DRX) and Power Saving Modes in 3GPP Release 16/17',
          'Massive MIMO beamforming weights: MRT, Zero-Forcing, and Singular Value Decomposition (SVD)'
        ],
        handsOnMilestones: [
          'Deploy full Open5GS 5G Standalone core in Docker containers on Ubuntu 22.04 LTS',
          'Configure srsRAN 5G gNodeB connected to Open5GS using ZeroMQ virtual RF bus',
          'Attach software UE (srsran 5G UE), run end-to-end iperf3 throughput tests (100 Mbps simulated), capture and dissect NGAP & NAS signaling packets in Wireshark'
        ],
        primaryTools: ['Open5GS', 'srsRAN Project', 'Wireshark', 'Docker / Linux Ubuntu'],
        deliverable: 'Fully functional private 5G SA lab emulation with Wireshark packet trace report (NGAP Setup, PDU Session Est)',
        recommendedResources: [
          { title: '3GPP TS 38.300 (NR Overall Description)', type: 'Standard', linkOrAuthor: '3GPP Standards Archive' },
          { title: '5G Core Networks: Powering Digitalization', type: 'Book', linkOrAuthor: 'Stefan Rommer et al. (Ericsson)' }
        ]
      },
      {
        phaseNumber: 4,
        title: 'Compliance, Over-The-Air RF Bench Testing & MNC Interview Polish',
        durationWeeks: 'Weeks 13-16',
        focusArea: 'Spectrum analyzer testing, phase noise, EVM measurement & Qualcomm/Ericsson drills',
        keyConcepts: [
          'Adjacent Channel Leakage Ratio (ACLR) and spectrum emission masks (SEM)',
          'Phase noise, jitter, and Error Vector Magnitude (EVM < 3.5% for 256-QAM)',
          'Beam pattern measurement in anechoic chambers & EIRP calculations',
          'System architecture interview questions: 5G Handover, Beam Management, Carrier Aggregation'
        ],
        handsOnMilestones: [
          'Execute automated SCPI Python test script controlling an RF signal generator & spectrum analyzer',
          'Measure P1dB compression point and IIP3 intercept on an RF Low-Noise Amplifier (LNA)',
          'Solve 25+ real Qualcomm, Nokia, Ericsson, and MediaTek technical interview whiteboard problems'
        ],
        primaryTools: ['SCPI / PyVISA', 'Siglent / Keysight Spectrum Analyzers', 'NanoVNA-F V2'],
        deliverable: 'Automated Python RF Characterization Test Suite (S-parameter extraction, P1dB & EVM test)',
        recommendedResources: [
          { title: 'RF and Microwave Circuit Design', type: 'Book', linkOrAuthor: 'Charles E. Free' },
          { title: 'Keysight RF Test & Measurement Application Notes', type: 'Documentation', linkOrAuthor: 'Keysight Technologies' }
        ]
      }
    ],
    toolProfiles: [
      {
        name: 'GNU Radio 3.10',
        category: 'SDR Signal Processing Framework',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'MATLAB Simulink Communications Toolbox',
        primaryUse: 'Rapid prototyping of modulation schemes, channel filters, OFDM, and software-defined radio pipelines',
        setupGuide: {
          osSupport: 'Linux (Ubuntu 22.04/24.04), macOS, Windows 10/11',
          quickInstallCommand: 'sudo apt update && sudo apt install -y gnuradio gr-osmosdr uhd-host rtl-sdr',
          prerequisites: 'Python 3.10+, CMake, GCC 11+, C++17 support'
        },
        industryWorkflow: [
          'Design block diagram in GNU Radio Companion (GRC) with Signal Source, Throttle, Filter, Modulator, and Sink',
          'Write custom high-throughput C++ OOT (Out-Of-Tree) block using `gr_modtool newmod` and implement `general_work()`',
          'Compile using CMake, run Python unit tests with synthetic Gaussian noise',
          'Connect to hardware SDR (PlutoSDR / USRP B210) via UHD / IIO sink blocks and stream live RF'
        ],
        handsOnLabDrill: {
          title: 'OFDM Baseband Transceiver with Rayleigh Fading',
          objective: 'Generate a 64-carrier OFDM signal, inject additive noise and multipath delay, perform pilot subcarrier channel estimation and recover raw ASCII text.',
          steps: [
            'Create GRC flowgraph: Packet Header Generator -> Chunks to Symbols (QPSK) -> OFDM Carrier Allocator -> IFFT (64-pt) -> Cyclic Prefix Insert',
            'Route output through Channel Model block (Epsilon = 1.0001 frequency offset, SNR = 18 dB)',
            'Build receiver: Schmidl-Cox sync -> Header Payload Demux -> FFT -> OFDM Channel Estimation -> Constellation Decoder',
            'Verify constellation scatter plot: Observe 4 distinct clusters with EVM < 8% and 0 packet drops.'
          ],
          verificationCheck: 'Text "HELLO 5G WIRELESS" transmitted into SDR sink is reconstructed error-free at receiver output sink.'
        }
      },
      {
        name: 'Open5GS & srsRAN',
        category: 'Open Source 5G SA Core & gNodeB Stack',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'Keysight 5G Network Emulation Suite / Spirent Landslide',
        primaryUse: 'Emulating complete 3GPP Release 16/17 compliant 5G Standalone network (AMF, SMF, UPF, gNB, and UE)',
        setupGuide: {
          osSupport: 'Ubuntu 22.04 LTS (x86_64 or ARM64)',
          quickInstallCommand: 'sudo add-apt-repository ppa:open5gs/latest && sudo apt install -y open5gs',
          prerequisites: 'Linux Kernel 5.15+, IP forwarding enabled, ZeroMQ 4.3+'
        },
        industryWorkflow: [
          'Deploy Open5GS core services (AMF, SMF, UPF, NRF, AUSF, UDM, PCF) and provision subscriber IMSI/K-key in MongoDB',
          'Configure `srsRAN_Project` `gnb.yml` with gNB ID, TAC, PLMN (001/01), and ZeroMQ RF binding',
          'Launch srsran UE configured with matching SIM parameters and bind `tun_srsue` interface',
          'Route Internet traffic through UPF TUN interface (`ogstun`) and monitor via Wireshark NGAP packets'
        ],
        handsOnLabDrill: {
          title: 'Full 5G SA Registration & PDU Session Flow Capture',
          objective: 'Trace the complete 3GPP registration handshake and capture all control-plane NAS messages.',
          steps: [
            'Start Open5GS daemon: `systemctl status open5gs-amfd`',
            'Launch gNodeB: `sudo gnb -c gnb_zmq.yml`',
            'Launch UE: `sudo srsue ue_zmq.conf`',
            'Inspect Wireshark on `lo` interface filter `ngap or nas-5gs`: Observe Registration Request, Authentication Request, Security Mode Command, Registration Accept, and PDU Session Establishment Accept.'
          ],
          verificationCheck: 'Ping Google DNS: `ping -I tun_srsue 8.8.8.8` returns RTT < 20 ms with 0% packet loss.'
        }
      }
    ],
    capstoneBlueprint: {
      title: 'Carrier-Grade 5G Private Network with Edge Mobile User Plane',
      hardwareCostEstimate: '₹22,000 / $260 (using ADALM-PLUTO or Free with ZeroMQ software bus)',
      estimatedBuildTime: '4 Weeks (40 Hours)',
      objective: 'Deploy a functional private 5G SA cell broadcasting over ISM band (or ZeroMQ virtual bus), support simultaneous subscriber attachment, run UDP video streaming with QoS flow monitoring, and measure throughput under varying RF SNR.',
      hardwareBOM: [
        'Analog Devices ADALM-PLUTO Rev C SDR (TX/RX 325 MHz - 3.8 GHz)',
        'Host PC running Ubuntu 22.04 LTS (8-core Intel/AMD, 16GB RAM)',
        '2x 3.5 GHz Rubber Duck Antennas (SMA Male)',
        'Commercial 5G Smartphone with unlocked Band n78 or srsran software UE'
      ],
      softwareStack: ['Open5GS 2.6+', 'srsRAN Project 23.10+', 'Wireshark 4.0+', 'Python 3.11', 'Grafana & Prometheus for telemetry'],
      gitHubStructure: [
        'configs/ (amf.yaml, upf.yaml, gnb_rf.yaml, subscriber_profile.csv)',
        'scripts/ (deploy_core.sh, start_gnb.sh, provision_sim.py, measure_throughput.py)',
        'pcap_traces/ (5g_registration.pcapng, pdu_establishment.pcapng, handover_simulation.pcapng)',
        'docs/ (Link_Budget_Sheet.xlsx, Architecture_Diagram.png, KPI_Report.pdf)'
      ],
      testingAndSignoff: [
        'Registration Latency: Verify UE completes 5G SA attachment in < 350 ms',
        'Throughput Test: Sustain > 65 Mbps downlink over 20 MHz channel bandwidth (SCS 30 kHz)',
        'Packet Loss: Zero dropped packets during 10-minute continuous iperf3 UDP stream'
      ]
    },
    interviewDrills: [
      {
        topic: '5G Physical Layer & OFDM',
        question: 'Why does 5G NR support multiple Subcarrier Spacings (SCS: 15, 30, 60, 120, 240 kHz), and how does the choice of SCS affect the Cyclic Prefix duration and Doppler spread resilience?',
        difficulty: 'Hard',
        targetCompany: 'Qualcomm, Ericsson, Samsung Networks',
        technicalAnswer: '5G NR uses scalable numerology defined as Δf = 2^μ * 15 kHz. At higher carrier frequencies (e.g., mmWave ~28 GHz), Doppler shift (f_d = v*f_c/c) and phase noise are dramatically higher; thus, wider SCS (60/120 kHz) is required to prevent inter-carrier interference (ICI). However, the OFDM symbol duration is T_s = 1/Δf. Higher SCS means shorter symbol duration and correspondingly shorter Cyclic Prefix (CP). Shorter CP limits the maximum delay spread the system can tolerate without Inter-Symbol Interference (ISI). Therefore, sub-6 GHz (FR1) typically uses 30 kHz SCS (balanced delay spread and mobility), while mmWave (FR2) uses 120 kHz SCS.',
        keyKeywordsToMention: ['Scalable Numerology 2^μ * 15 kHz', 'Phase Noise immunity', 'Doppler shift ICI', 'Delay spread vs Symbol duration', 'FR1 (30 kHz) vs FR2 (120 kHz)']
      },
      {
        topic: 'RF Link Budget & Receiver Sensitivity',
        question: 'How do you calculate the minimum receiver sensitivity of an RF front-end given a channel bandwidth of 20 MHz, Noise Figure of 6 dB, and required SNR of 12 dB for 64-QAM?',
        difficulty: 'Medium',
        targetCompany: 'MediaTek, Apple RF, Skyworks',
        technicalAnswer: 'Receiver sensitivity is calculated as P_sens = -174 dBm/Hz + 10*log10(BW) + NF + SNR_req. Here: 1) Thermal noise floor at 290K = -174 dBm/Hz. 2) 10*log10(20*10^6) ≈ 73 dB. 3) Noise Figure NF = 6 dB. 4) Required SNR = 12 dB. Therefore: P_sens = -174 + 73 + 6 + 12 = -83 dBm. Any received signal below -83 dBm will fail to meet the required BER for 64-QAM.',
        keyKeywordsToMention: ['Thermal noise density -174 dBm/Hz', 'kTB noise floor', '10*log10(BW)', 'Cascaded Noise Figure', 'Sensitivity threshold']
      }
    ],
    atsResumeBullets: [
      'Architected and deployed private 5G SA testbed utilizing Open5GS and srsRAN with ADALM-PLUTO SDR, delivering 75 Mbps UDP throughput over 20 MHz n78 channel.',
      'Designed custom C++ GNU Radio OOT signal processing block for Schmidl-Cox frame synchronization, achieving sub-sample timing lock under -3 dB SNR multipath fading.',
      'Formulated comprehensive 3.5 GHz link budget and S-parameter verification suite in Python, characterizing receiver sensitivity (-84 dBm) and NF (4.8 dB) compliant with 3GPP TS 38.104.'
    ]
  },
  {
    fieldId: 'signal-image-vision',
    fieldTitle: 'DSP, Audio, Image Processing & Edge AI Vision',
    department: 'ECE',
    badgeColor: 'indigo',
    tagline: 'Fixed-point DSP, TensorRT acceleration, OpenCV SIMD pipelines, embedded vision on Jetson & STM32',
    prerequisites: ['Linear Algebra', 'Signals & Systems', 'C++ / Python', 'Computer Vision Basics'],
    weeklyCommitment: '12-14 hours/week for 16 weeks',
    phases: [
      {
        phaseNumber: 1,
        title: 'DSP Transforms, Fixed-Point Arithmetic & Filter Synthesis',
        durationWeeks: 'Weeks 1-4',
        focusArea: 'FFT algorithms, FIR/IIR digital filters, Q15/Q31 fixed-point quantization & CMSIS-DSP',
        keyConcepts: [
          'Radix-2 / Radix-4 Cooley-Tukey Fast Fourier Transform (FFT) computational complexity',
          'FIR Parks-McClellan Remez exchange vs IIR Butterworth/Chebyshev filter stability',
          'Quantization noise, roundoff errors, limit cycles, and Q15/Q31 fixed-point formats',
          'ARM CMSIS-DSP library primitives: `arm_cfft_q15`, `arm_fir_f32`, and SIMD vectorization',
          '2D spatial convolution, Sobel kernels, Gaussian blurs, and bilateral spatial filtering'
        ],
        handsOnMilestones: [
          'Implement bit-reversal and butterfly FFT in pure ANSI C without standard libraries',
          'Design 48 kHz audio bandpass filter (FIR 64-tap) in Python Scipy and convert coefficients to Q15 format for STM32',
          'Benchmark CMSIS-DSP FFT on STM32 or ARM Cortex-M4 emulator vs naive DFT (100x speedup verification)'
        ],
        primaryTools: ['Python Scipy / NumPy', 'ARM CMSIS-DSP', 'C++ / GCC', 'Audacity for Audio test'],
        deliverable: 'Q15 Fixed-Point FIR Audio Equalizer engine in ANSI C with CMSIS-DSP integration',
        recommendedResources: [
          { title: 'Discrete-Time Signal Processing', type: 'Book', linkOrAuthor: 'Alan V. Oppenheim & Ronald W. Schafer' },
          { title: 'Digital Signal Processing: A Practical Approach', type: 'Book', linkOrAuthor: 'Emmanuel C. Ifeachor' }
        ]
      },
      {
        phaseNumber: 2,
        title: 'OpenCV Accelerated Pipelines & Feature Extraction',
        durationWeeks: 'Weeks 5-8',
        focusArea: 'Image segmentation, optical flow, camera calibration & homography',
        keyConcepts: [
          'Pinhole camera model, radial/tangential lens distortion, and Zhang\'s calibration method',
          'Perspective transform, homography matrices, and image rectification',
          'Lucas-Kanade and Farneback dense optical flow for real-time motion vector estimation',
          'Canny edge detection hysteresis and Hough Transform for lane/line tracking',
          'SIMD acceleration using NEON / SSE instructions via OpenCV UMat & OpenCL'
        ],
        handsOnMilestones: [
          'Calibrate webcam with a 9x6 checkerboard pattern to extract intrinsic matrix K and distortion coefficients in OpenCV',
          'Build real-time lane line detection and steering angle calculator for autonomous vehicle feed at 60 FPS',
          'Implement Lucas-Kanade optical flow tracking with zero-allocation ring buffer in C++'
        ],
        primaryTools: ['OpenCV 4.9+ (C++ / Python)', 'OpenCL', 'CMake', 'Eigen3 Linear Algebra'],
        deliverable: 'Real-time OpenCV C++ Lane Detection and Visual Odometry pipeline running at > 60 FPS',
        recommendedResources: [
          { title: 'Learning OpenCV 4: Computer Vision with C++', type: 'Book', linkOrAuthor: 'Gary Bradski & Adrian Kaehler' },
          { title: 'Multiple View Geometry in Computer Vision', type: 'Book', linkOrAuthor: 'Richard Hartley & Andrew Zisserman' }
        ]
      },
      {
        phaseNumber: 3,
        title: 'Deep Learning Inference Optimization & TensorRT',
        durationWeeks: 'Weeks 9-12',
        focusArea: 'Model quantization (FP16, INT8 PTQ/QAT), ONNX export, TensorRT engine compilation & Jetson',
        keyConcepts: [
          'Convolutional neural networks: Depthwise separable convolutions (MobileNetV3) vs standard Conv2D',
          'ONNX graph optimization, constant folding, and dead code elimination',
          'TensorRT engine compilation: Layer fusion (Conv+BN+ReLU), kernel autotuning, and memory pooling',
          'Post-Training Quantization (PTQ) with KL-divergence calibration vs Quantization-Aware Training (QAT)',
          'Zero-copy unified memory buffers on NVIDIA Tegra architectures (`cudaHostAllocMapped`)'
        ],
        handsOnMilestones: [
          'Train/Fine-tune YOLOv8 Nano object detector in PyTorch and export to ONNX format',
          'Compile ONNX to TensorRT 8.6+ FP16 and INT8 engine using `trtexec` with calibration cache',
          'Deploy model on NVIDIA Jetson Orin Nano / host GPU, achieving < 8 ms inference latency per frame'
        ],
        primaryTools: ['NVIDIA TensorRT', 'PyTorch 2.x', 'ONNX Runtime', 'NVIDIA Jetson Orin Nano / CUDA'],
        deliverable: 'Hardware-accelerated TensorRT C++ Inference Engine with zero-copy CUDA memory pipeline',
        recommendedResources: [
          { title: 'NVIDIA TensorRT Developer Guide', type: 'Documentation', linkOrAuthor: 'NVIDIA Docs' },
          { title: 'Deep Learning for Computer Vision', type: 'Book', linkOrAuthor: 'Dr. Adrian Rosebrock' }
        ]
      },
      {
        phaseNumber: 4,
        title: 'Embedded System Deployment & Industrial Vision Drills',
        durationWeeks: 'Weeks 13-16',
        focusArea: 'Camera Serial Interface (MIPI-CSI-2), V4L2 drivers, real-time safety & Sony/Qualcomm drills',
        keyConcepts: [
          'MIPI CSI-2 D-PHY / C-PHY protocol, packet structure, and V4L2 (Video4Linux2) driver architecture',
          'End-to-end latency budget: Sensor exposure -> ISP demosaicing -> DMA -> Inference -> Actuation',
          'Thermal throttling, dynamic voltage frequency scaling (DVFS), and wattage budget management',
          'Real-time scheduling: POSIX SCHED_FIFO, thread affinity, and memory locking (`mlockall`)'
        ],
        handsOnMilestones: [
          'Configure a Sony IMX219 / IMX477 MIPI CSI camera via V4L2 pipeline in C++ without OpenCV overhead',
          'Measure glass-to-glass latency using high-speed 240 FPS camera and LED pulse trigger (< 45 ms goal)',
          'Practice 30+ technical interview questions for Apple Camera, Sony Sensor, Qualcomm, and Samsara'
        ],
        primaryTools: ['V4L2 (v4l-utils)', 'GStreamer 1.22', 'NVIDIA DeepStream SDK', 'Perf / Valgrind'],
        deliverable: 'Ultra-low latency GStreamer + DeepStream video pipeline with on-screen inference overlay',
        recommendedResources: [
          { title: 'Embedded Vision Systems Architecture', type: 'Book', linkOrAuthor: 'Alexander Hornberg' },
          { title: 'GStreamer Application Development Manual', type: 'Documentation', linkOrAuthor: 'GStreamer Project' }
        ]
      }
    ],
    toolProfiles: [
      {
        name: 'NVIDIA TensorRT 8.6 / 10.x',
        category: 'High-Performance Deep Learning Inference SDK',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'OpenVINO / Qualcomm SNPE / TI TIDL',
        primaryUse: 'Compiling PyTorch/ONNX neural networks into hardware-tuned, INT8/FP16 CUDA execution engines',
        setupGuide: {
          osSupport: 'Linux Ubuntu (x86_64, aarch64 JetPack 5/6)',
          quickInstallCommand: 'sudo apt install -y tensorrt python3-libnvinfer-dev uff-converter-tf',
          prerequisites: 'NVIDIA GPU (Pascal or newer), CUDA 12.x, cuDNN 8.x+'
        },
        industryWorkflow: [
          'Export trained PyTorch model: `torch.onnx.export(model, dummy_input, "model.onnx", opset_version=17)`',
          'Profile and compile engine with `trtexec --onnx=model.onnx --saveEngine=model.engine --fp16 --int8 --calib=calib.cache`',
          'In C++, instantiate `nvinfer1::IRuntime`, deserialize engine, and allocate CUDA memory for bindings',
          'Enqueue asynchronous inference: `context->enqueueV3(stream)` and synchronize on CUDA stream'
        ],
        handsOnLabDrill: {
          title: 'INT8 Quantized YOLO Object Detection on Edge GPU',
          objective: 'Convert a standard float32 object detection model into an INT8 TensorRT engine using 500 calibration images, maintaining > 98% mAP retention.',
          steps: [
            'Write custom Python `IInt8EntropyCalibrator2` class loading representative validation images',
            'Run TensorRT builder with INT8 mode enabled and feed calibration batch',
            'Benchmark throughput: Compare native PyTorch (35 FPS) vs FP16 TensorRT (120 FPS) vs INT8 TensorRT (240 FPS)',
            'Profile latency percentiles (P95, P99) using `nsys nvprof` to confirm memory copy overlaps kernel execution.'
          ],
          verificationCheck: 'Inference latency strictly drops below 6.5 ms per frame with no visual bounding box degradation.'
        }
      },
      {
        name: 'OpenCV & GStreamer',
        category: 'Real-Time Computer Vision & Multimedia Pipeline',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'MATLAB Vision Toolbox / Halcon MVTec',
        primaryUse: 'Video ingest from MIPI-CSI / USB3 cameras, color space conversion (NV12->RGB), and spatial filtering',
        setupGuide: {
          osSupport: 'Cross-platform (Linux, Windows, macOS, Android)',
          quickInstallCommand: 'sudo apt install -y libopencv-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev',
          prerequisites: 'CMake, GCC, pkg-config'
        },
        industryWorkflow: [
          'Build hardware-accelerated pipeline string: `nvarguscamerasrc ! nvvidconv ! video/x-raw, format=BGRx ! videoconvert ! appsink`',
          'Open stream inside C++ OpenCV `cv::VideoCapture` with hardware DMA buffer sharing',
          'Perform multi-threaded image processing across separate ingest, worker, and rendering threads',
          'Push telemetry overlay into RTSP stream via GStreamer `appsrc` sink'
        ],
        handsOnLabDrill: {
          title: 'Sub-30ms Optical Flow Motion Vector Tracker',
          objective: 'Process live 1080p camera stream, extract corner features, track vectors with Lucas-Kanade, and flag high-acceleration movement.',
          steps: [
            'Initialize video capture with double buffering',
            'Compute `cv::goodFeaturesToTrack` on grayscale frame every 30 frames',
            'Execute `cv::calcOpticalFlowPyrLK` across pyramid levels (3 levels, 15x15 window)',
            'Vectorize calculation using OpenMP multithreading across 4 CPU cores.'
          ],
          verificationCheck: 'Frame pipeline maintains constant 60.0 FPS with average CPU usage under 35% on quad-core processor.'
        }
      }
    ],
    capstoneBlueprint: {
      title: 'Autonomous Edge Defect Inspection System with TensorRT & MIPI-CSI Camera',
      hardwareCostEstimate: '₹45,000 / $550 (with Jetson Orin Nano + IMX477 camera, or free via GPU emulation)',
      estimatedBuildTime: '4 Weeks (40 Hours)',
      objective: 'Design a factory-line industrial optical inspection system that ingests high-resolution PCB images, detects solder bridges and missing components in real time (< 15 ms), triggers GPIO reject signals, and logs defect telemetry to a web dashboard.',
      hardwareBOM: [
        'NVIDIA Jetson Orin Nano Developer Kit (8GB)',
        'Raspberry Pi High Quality Camera (Sony IMX477 12.3MP Sensor) with C-Mount 16mm Lens',
        'High-CRI LED Ring Light Illumination Source',
        '24V Industrial Relay Module for Pneumatic Ejector Simulation'
      ],
      softwareStack: ['Ubuntu 22.04 LTS (JetPack 5.1 / 6.0)', 'TensorRT 8.6', 'OpenCV 4.8 C++', 'FastAPI for Telemetry', 'SQLite'],
      gitHubStructure: [
        'src/ (camera_capture.cpp, inference_engine.cpp, gpio_trigger.cpp, main.cpp)',
        'models/ (yolov8_solder_defect.onnx, calibrate_int8.py, export_engine.sh)',
        'pipeline/ (gstreamer_pipeline.sh, test_bench.cpp)',
        'web_ui/ (fastapi_server.py, dashboard.html)'
      ],
      testingAndSignoff: [
        'Accuracy: > 99.2% Precision and Recall on 1,000 synthetic solder bridge defect images',
        'Throughput: 60 FPS continuous processing with Zero Frame Drops over 4-hour soak test',
        'Hardware GPIO Latency: Actuator signal triggered within 12 ms of defect frame capture'
      ]
    },
    interviewDrills: [
      {
        topic: 'Quantization & Dynamic Range',
        question: 'What is the mathematical difference between Symmetric and Asymmetric INT8 Quantization, and why is Symmetric quantization preferred for GPU/NPU acceleration in inference engines like TensorRT?',
        difficulty: 'Hard',
        targetCompany: 'Qualcomm, NVIDIA, Google DeepMind Hardware',
        technicalAnswer: 'Quantization maps floating point values x ∈ [x_min, x_max] to integers q ∈ [-128, 127]. In Asymmetric Quantization: x = S * (q - Z), where S is the scale factor and Z is the non-zero integer zero-point offset. In Symmetric Quantization: Z = 0, so x = S * q, where S = max(|x_min|, |x_max|) / 127. Symmetric quantization is heavily preferred on hardware accelerators because matrix multiplication between activations A and weights W becomes: A * W = (S_A * q_A) * (S_W * q_W) = (S_A * S_W) * (q_A * q_W). When Z=0, hardware systolic arrays do not need to compute extra cross-term offset compensations (such as Z_A * q_W), eliminating substantial silicon area, power, and register memory bandwidth overhead.',
        keyKeywordsToMention: ['Zero-point offset Z=0', 'Scale factor S = max(|x|)/127', 'Cross-term calculation overhead', 'Systolic array efficiency', 'Per-tensor vs Per-channel scaling']
      },
      {
        topic: 'Digital Filtering & Group Delay',
        question: 'Why do Linear Phase FIR filters guarantee constant group delay, and in what signal processing applications is non-linear phase (e.g., from an IIR filter) completely unacceptable?',
        difficulty: 'Medium',
        targetCompany: 'Texas Instruments, Cirrus Logic, Bose',
        technicalAnswer: 'An FIR filter has linear phase if its impulse response h[n] is symmetric or anti-symmetric: h[n] = ±h[N-1-n]. This ensures the frequency response phase is Θ(ω) = -ω * (N-1)/2. Group delay is defined as τ_g(ω) = -dΘ(ω)/dω = (N-1)/2, which is independent of frequency ω. A constant group delay ensures all frequency components in the signal experience identical time delay, preserving wave shape. In applications like ECG biomedical monitoring, digital audio mastering, radar pulse compression, and digital communications (eye diagram timing), non-linear phase causes phase dispersion and severe waveform distortion, making FIR mandatory despite higher computational cost than IIR.',
        keyKeywordsToMention: ['Impulse response symmetry h[n] = h[N-1-n]', 'Group delay τ_g = -dΘ/dω', 'No phase dispersion', 'Preservation of waveform shape', 'Biomedical / Radar / Audio fidelity']
      }
    ],
    atsResumeBullets: [
      'Developed real-time C++ industrial defect inspection system on NVIDIA Jetson Orin Nano, accelerating YOLOv8 via INT8 TensorRT to achieve 6.2 ms inference latency.',
      'Constructed zero-copy GStreamer V4L2 video ingestion pipeline for Sony IMX477 camera, cutting glass-to-glass visual processing latency from 85 ms down to 28 ms.',
      'Implemented Q15 fixed-point 64-tap FIR filter using ARM CMSIS-DSP vector intrinsics, reducing CPU load by 78% on Cortex-M4 compared to floating-point implementation.'
    ]
  },
  {
    fieldId: 'power-electronics-ev',
    fieldTitle: 'Power Electronics, EV Powertrains & Battery Systems',
    department: 'Both',
    badgeColor: 'amber',
    tagline: 'Wide Bandgap SiC/GaN inverters, Field-Oriented Control (FOC), active BMS, LTspice, PLECS & TI C2000',
    prerequisites: ['Electric Circuits', 'Power Electronics Fundamentals', 'Control Systems', 'C Programming'],
    weeklyCommitment: '14-16 hours/week for 16 weeks',
    phases: [
      {
        phaseNumber: 1,
        title: 'Semiconductor Physics (SiC/GaN), Magnetics & Thermal Design',
        durationWeeks: 'Weeks 1-4',
        focusArea: 'Switching losses, parasitics, high-frequency inductors & thermal heatsinking',
        keyConcepts: [
          'Wide Bandgap (WBG) Physics: Si vs SiC vs GaN breakdown electric field (3 MV/cm) and electron mobility',
          'Switching dynamics: Turn-on/turn-off loss (E_on, E_off), reverse recovery charge (Q_rr), and output capacitance (C_oss)',
          'High dv/dt (> 50 V/ns) gate driver design, Miller clamp, and parasitic inductance minimization',
          'High-frequency inductor & planar transformer design: Core loss (Steinmetz equation), skin depth, proximity effect',
          'Thermal impedance network: Junction-to-case (R_th_JC), case-to-heatsink (R_th_CH), and transient thermal impedance Z_th'
        ],
        handsOnMilestones: [
          'Simulate a Double-Pulse Test (DPT) circuit for a 1200V / 30mΩ SiC MOSFET in LTspice and extract E_on, E_off',
          'Calculate wire gauge, core geometry (Area Product AP method), and air-gap length for a 10 kW, 100 kHz boost inductor',
          'Model 3-stage thermal heatsink network in Python and predict junction temperature under 150A continuous load'
        ],
        primaryTools: ['LTspice', 'Python (Thermal/Magnetic solver)', 'Excel WCCA Calculators'],
        deliverable: 'Double-Pulse Test Characterization Report & 100 kHz High-Frequency Inductor Design Dossier',
        recommendedResources: [
          { title: 'Power Electronics: Converters, Applications, and Design', type: 'Book', linkOrAuthor: 'Ned Mohan, Tore M. Undeland' },
          { title: 'Fundamentals of Power Electronics', type: 'Book', linkOrAuthor: 'Robert W. Erickson & Dragan Maksimovic' }
        ]
      },
      {
        phaseNumber: 2,
        title: 'Converter Topologies & PLECS Closed-Loop Simulation',
        durationWeeks: 'Weeks 5-8',
        focusArea: 'Sync Buck/Boost, LLC resonant converters, Dual Active Bridge (DAB) & digital control loops',
        keyConcepts: [
          'Synchronous Buck/Boost bidirectional converter operation for battery charging/discharging',
          'LLC Resonant Converter: Zero Voltage Switching (ZVS), resonant tank gain curves, and frequency modulation',
          'Dual Active Bridge (DAB) phase-shift control for isolated EV onboard chargers (OBC)',
          'Small-signal modeling, state-space averaging, and Type-II / Type-III analog and digital compensators',
          'SVPWM (Space Vector Pulse Width Modulation) algorithm: Sector identification, dwell time calculation'
        ],
        handsOnMilestones: [
          'Build complete 3-phase 800V inverter driving a Permanent Magnet Synchronous Motor (PMSM) in PLECS Standalone',
          'Design digital PI current controller with anti-windup in discrete domain (z-plane Tustin transformation)',
          'Implement 400V to 12V 3 kW LLC converter simulation achieving ZVS across 20% to 100% load'
        ],
        primaryTools: ['PLECS Standalone / Blockset', 'MATLAB Simulink / Simscape Electrical', 'PSIM'],
        deliverable: 'Complete closed-loop PLECS model of 800V EV traction inverter with Space Vector PWM',
        recommendedResources: [
          { title: 'Control of Power Electronic Converters and Systems', type: 'Book', linkOrAuthor: 'Frede Blaabjerg' },
          { title: 'Plexim PLECS Video Tutorials & Application Examples', type: 'Documentation', linkOrAuthor: 'Plexim' }
        ]
      },
      {
        phaseNumber: 3,
        title: 'Firmware Implementation on TI C2000 DSP (FOC & State Machines)',
        durationWeeks: 'Weeks 9-12',
        focusArea: 'Clark/Park transforms, Space Vector PWM, ADC-PWM synchronization & TI C2000 LaunchPad',
        keyConcepts: [
          'Field-Oriented Control (FOC): Clarke (abc -> αβ) and Park (αβ -> dq) transforms, d-axis flux, q-axis torque',
          'Maximum Torque Per Ampere (MTPA) and Field Weakening for high-speed EV motor operation',
          'Hardware interrupts: ePWM time-base synchronization with ADC Start-of-Conversion (SOC) at PWM valley/peak',
          'Current sensing topologies: 3-shunt vs inline phase current Hall sensors, offset calibration',
          'Automotive state machine: Standby, Pre-charge, Run, Derating, Fault-latch over CAN bus'
        ],
        handsOnMilestones: [
          'Configure TI C2000 F280049C LaunchPad ePWM modules for complementary switching with 150 ns dead-band in Code Composer Studio',
          'Write C-code FOC loop executing Clarke/Park, dual PI current loops, and inverse Park in < 12 μs interrupt routine',
          'Spin a PMSM / BLDC motor with sensorless sliding mode observer (SMO) on bench dynamometer'
        ],
        primaryTools: ['Code Composer Studio (CCS)', 'TI C2000Ware / MotorControl SDK', 'TI LAUNCHXL-F280049C', 'Saleae Logic Pro'],
        deliverable: 'Production-structured C2000 Firmware repository with FOC motor controller and CAN telemetry',
        recommendedResources: [
          { title: 'TI C2000 MotorControl SDK User Guide', type: 'Documentation', linkOrAuthor: 'Texas Instruments' },
          { title: 'Electric Drives', type: 'Book', linkOrAuthor: 'Ion Boldea & Syed A. Nasar' }
        ]
      },
      {
        phaseNumber: 4,
        title: 'BMS Algorithms, Functional Safety (ISO 26262) & Testing',
        durationWeeks: 'Weeks 13-16',
        focusArea: 'State of Charge (SOC - Extended Kalman Filter), passive balancing, ASIL-D & hardware testing',
        keyConcepts: [
          'Lithium-ion equivalent circuit model (Thevenin 1-RC / 2-RC model) parameter identification',
          'SOC estimation algorithms: Coulomb counting drift vs Extended Kalman Filter (EKF)',
          'State of Health (SOH) tracking via internal resistance degradation (ΔR_0) and capacity fade',
          'ISO 26262 ASIL-D functional safety: HARA, safety goals, single-point fault metric (SPFM > 99%)',
          'Pre-charge circuit calculation, contactor welding detection, and insulation resistance monitoring (IMD)'
        ],
        handsOnMilestones: [
          'Implement Extended Kalman Filter (EKF) in ANSI C for 12S Li-ion pack and validate with drive-cycle current data',
          'Create complete DFMEA matrix for high-voltage battery disconnect unit (BDU) under ISO 26262 ASIL-D',
          'Review and solve 30+ technical questions from Tesla, Ather Energy, Ola Electric, Bosch, and Texas Instruments'
        ],
        primaryTools: ['Simulink Stateflow', 'Python (BMS EKF testbench)', 'Vector CANoe / CANalyzer'],
        deliverable: 'Embedded C BMS Algorithms Suite (SOC via EKF + Passive Cell Balancing + Fault Manager)',
        recommendedResources: [
          { title: 'Battery Management Systems, Volume I & II', type: 'Book', linkOrAuthor: 'Gregory L. Plett' },
          { title: 'ISO 26262 Road Vehicles - Functional Safety Standard', type: 'Standard', linkOrAuthor: 'International Organization for Standardization' }
        ]
      }
    ],
    toolProfiles: [
      {
        name: 'PLECS (Piecewise Linear Electrical Circuit Simulation)',
        category: 'Power Electronics System Simulation',
        isFreeOrOpenSource: false,
        enterpriseEquivalent: 'Industry Standard (Alternative: LTspice / Free PSIM demo)',
        primaryUse: 'Simulating complex power converters, motor drives, thermal switching losses, and control systems with zero numerical divergence',
        setupGuide: {
          osSupport: 'Windows, Linux, macOS',
          quickInstallCommand: 'Download Standalone trial from plexim.com or use LTspice for free alternative',
          prerequisites: 'Basic knowledge of circuit theory and control transfer functions'
        },
        industryWorkflow: [
          'Draw power stage schematic using ideal switches and thermal semiconductors from manufacturer XML library (Wolfspeed / Infineon)',
          'Implement control loop in continuous domain (s-domain) and discretize with sample-and-hold (z-domain)',
          'Attach heat sink and thermal description to monitor instantaneous junction temperature Tj',
          'Run steady-state analysis and auto-generate C-code for embedded target via PLECS Coder'
        ],
        handsOnLabDrill: {
          title: '3-Phase SiC Traction Inverter with Thermal Loss Modeling',
          objective: 'Design an 800V DC-link, 150 kW inverter driving a PMSM motor; evaluate total switching vs conduction losses at 50 kHz switching frequency.',
          steps: [
            'Create 3-phase full bridge using 1200V SiC MOSFET models',
            'Connect closed-loop Field-Oriented Control (FOC) subsystem with d-q decoupling',
            'Attach thermal heat sink with 0.1 K/W thermal resistance to ambient (40°C)',
            'Step motor load torque from 50 Nm to 250 Nm and verify Tj remains below 145°C.'
          ],
          verificationCheck: 'Inverter operates at > 98.4% efficiency with total harmonic distortion (THD) of phase currents < 3.0%.'
        }
      },
      {
        name: 'Code Composer Studio & TI C2000 DSP',
        category: 'Embedded DSP IDE for Real-Time Power Control',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'ST STM32CubeIDE (with B-G431B-ESC1) / NXP S32 Design Studio',
        primaryUse: 'Developing hard real-time C firmware for high-frequency PWM switching, ADC sampling, and motor drive loops',
        setupGuide: {
          osSupport: 'Windows 10/11, Ubuntu 22.04 LTS',
          quickInstallCommand: 'Download CCS from ti.com/tool/CCSTUDIO and install C2000Ware package',
          prerequisites: 'TI TMS320F280049C or F28379D LaunchPad board, USB-JTAG driver'
        },
        industryWorkflow: [
          'Configure clock tree (100 MHz SYSCLK) and peripheral multiplexing via SysConfig GUI',
          'Set up ePWM modules in up-down count mode with dead-band generator (RED/FED)',
          'Configure ADC channels with early interrupt trigger to sample current exactly at PWM midpoint',
          'Write deterministic ISR executing FOC control algorithm and write new compare values to CMPA/CMPB'
        ],
        handsOnLabDrill: {
          title: 'Deterministic 50 kHz Dual-Shunt Current Sense ISR',
          objective: 'Program an interrupt service routine triggered by ePWM1 that reads ADC results, calculates Clarke transform, and writes PWM duty cycles in under 8 microseconds.',
          steps: [
            'Initialize ePWM1 period to 1000 counts (50 kHz for 100 MHz clock)',
            'Enable ADC SOCA on counter equal to zero',
            'In the ADC Interrupt Service Routine: Toggle GPIO pin HIGH, read `ADC_readResult()`, run calculations, toggle GPIO pin LOW',
            'Measure GPIO pulse width on oscilloscope: Confirm pulse width is < 6.5 microseconds.'
          ],
          verificationCheck: 'Scope displays stable 50 kHz square wave with zero jitter, proving ISR never overruns PWM period.'
        }
      }
    ],
    capstoneBlueprint: {
      title: 'Bidirectional 800V-to-48V GaN DC-DC Converter with CAN Telemetry',
      hardwareCostEstimate: '₹14,000 / $170 (or full digital simulation in PLECS/LTspice for ₹0)',
      estimatedBuildTime: '4 Weeks (45 Hours)',
      objective: 'Build and characterize a 500W synchronous buck-boost converter utilizing GaN systems transistors; achieve > 97% peak efficiency, implement digital current/voltage regulation on microcontroller, and broadcast telemetry over CAN bus.',
      hardwareBOM: [
        'EPC9002C GaN Transistor Development Board or TI C2000 LaunchPad',
        'High-Frequency Magnetics Shielded Inductor (10 μH, 20A saturation)',
        'Isolated Current Sensor IC (Allegro ACS724 or TI TMCS1100)',
        'Isolated DC Power Supply (0-60V) & Electronic Load',
        'Siglent SDS1104X-E Oscilloscope with High-Voltage Differential Probe'
      ],
      softwareStack: ['Code Composer Studio C', 'PLECS Standalone', 'LTspice XVII', 'Python PySerial / PyCAN for GUI'],
      gitHubStructure: [
        'firmware/ (main.c, epwm_hal.c, adc_hal.c, pid_controller.c, can_bus.c)',
        'simulation/ (plecs_closed_loop.plecs, ltspice_switching_losses.asc)',
        'hardware/ (kicad_schematic.pdf, bill_of_materials.csv, thermal_calc.xlsx)',
        'telemetry/ (can_logger.py, dashboard.py, test_data_efficiency.csv)'
      ],
      testingAndSignoff: [
        'Efficiency curve: Plot efficiency from 10% to 100% load, proving peak > 97.2%',
        'Step Response: Step load from 2A to 10A in 100 μs, showing voltage dip < 3% and recovery within 500 μs',
        'Thermal Stability: Continuous full-load operation for 30 minutes with GaN case temp < 75°C'
      ]
    },
    interviewDrills: [
      {
        topic: 'Dead-Time Optimization in Half-Bridge Inverters',
        question: 'What is the trade-off when selecting dead-time in a high-voltage SiC/GaN half-bridge inverter, and what happens if dead-time is chosen too small versus too large?',
        difficulty: 'Hard',
        targetCompany: 'Tesla, Ather Energy, Bosch Powertrain, Wolfspeed',
        technicalAnswer: 'Dead-time is the intentional delay introduced between turning off one switch in a half-bridge and turning on the complementary switch. 1) If dead-time is TOO SMALL: Due to gate drive propagation delays, parasitic capacitances, and temperature variations, both switches can be on simultaneously, causing catastrophic "shoot-through" (direct short across the 800V DC-link) destroying the transistors instantly. 2) If dead-time is TOO LARGE: During dead-time, phase current is forced to circulate through the MOSFET body diode (or antiparallel diode). In SiC MOSFETs, the body diode has a high forward voltage drop (V_F ≈ 3.5 - 4.5 V compared to ~0.7V in Si). Prolonged body diode conduction causes massive conduction losses, rapid thermal heating, and severe output voltage distortion (loss of fundamental voltage and higher 5th/7th harmonic content). In GaN, reverse conduction has no reverse recovery charge Q_rr, but the voltage drop is still significant (V_drop = V_th + V_GS_off), requiring precise adaptive dead-time tuning (typically 50-120 ns).',
        keyKeywordsToMention: ['Shoot-through hazard', 'MOSFET body diode V_F drop (3.5-4.5V in SiC)', 'Harmonic distortion & voltage loss', 'Reverse recovery charge Q_rr', 'Adaptive dead-time (50-120 ns)']
      },
      {
        topic: 'Field-Oriented Control (FOC) Decoupling',
        question: 'In Field-Oriented Control of an Interior Permanent Magnet Synchronous Motor (IPMSM), why are the d-axis and q-axis voltage equations cross-coupled at high speeds, and how does feedforward decoupling resolve this?',
        difficulty: 'Hard',
        targetCompany: 'Ola Electric, Lucid Motors, Texas Instruments, Siemens',
        technicalAnswer: 'The stator voltage equations in the rotating dq-reference frame are: V_d = R_s * I_d + L_d * (dI_d/dt) - ω_e * L_q * I_q, and V_q = R_s * I_q + L_q * (dI_q/dt) + ω_e * (L_d * I_d + λ_m). Notice the cross-coupling terms: -ω_e * L_q * I_q in the d-axis, and +ω_e * L_d * I_d in the q-axis. At high rotor electrical speed ω_e, these speed-dependent cross-coupling terms become significantly larger than the resistive and inductive drops, causing severe coupling between the torque-producing current (I_q) and the flux-producing current (I_d). PI controllers alone cannot respond fast enough. To resolve this, feedforward decoupling is implemented: the outputs of the d- and q-axis PI controllers (V_d*, V_q*) are added with feedforward terms: V_d_applied = V_d* + (-ω_e * L_q * I_q_meas), and V_q_applied = V_q* + (+ω_e * (L_d * I_d_meas + λ_m)). This completely neutralizes the cross-coupling, allowing the d and q loops to be tuned as independent first-order linear plants.',
        keyKeywordsToMention: ['dq rotating frame voltage equations', 'Speed cross-coupling terms (ω_e * L * I)', 'Feedforward decoupling terms', 'Independent first-order plant tuning', 'Rotor electrical speed ω_e']
      }
    ],
    atsResumeBullets: [
      'Engineered closed-loop Field-Oriented Control (FOC) firmware on TI C2000 DSP running at 50 kHz ISR, driving 150 kW PMSM motor with sensorless sliding mode observer.',
      'Modeled 800V EV traction inverter in PLECS Standalone, evaluating SiC thermal losses and implementing Space Vector PWM with dead-time compensation.',
      'Developed 12S Li-ion Battery Management System firmware in C featuring Extended Kalman Filter (EKF) for State of Charge (SOC) tracking with < 2.0% estimation error.'
    ]
  },
  {
    fieldId: 'control-robotics-automation',
    fieldTitle: 'Robotics, Industrial Automation & Embedded Control',
    department: 'Both',
    badgeColor: 'emerald',
    tagline: 'ROS 2 Humble/Iron, Gazebo simulation, SLAM, Nav2, motion planning, industrial PLCs (IEC 61131-3) & EtherCAT',
    prerequisites: ['Control Systems', 'Kinematics & Dynamics', 'C++ / Python', 'Linux OS'],
    weeklyCommitment: '12-15 hours/week for 16 weeks',
    phases: [
      {
        phaseNumber: 1,
        title: 'Rigid Body Kinematics, Dynamics & Modern Control Theory',
        durationWeeks: 'Weeks 1-4',
        focusArea: 'SO(3)/SE(3) transforms, Denavit-Hartenberg, state-space control & LQR',
        keyConcepts: [
          'Rotation matrices, Euler angles, Quaternions (gimbal lock prevention), and SE(3) transformation matrices',
          'Forward and Inverse Kinematics for serial manipulators via Denavit-Hartenberg (D-H) parameter conventions',
          'Jacobian matrix: Differential kinematics, singularities, and manipulability ellipsoids',
          'State-Space Control: Controllability and Observability Gramians, Pole Placement, and Full-State Feedback',
          'Linear Quadratic Regulator (LQR) optimal control and Kalman Filter sensor fusion'
        ],
        handsOnMilestones: [
          'Derive analytical Forward Kinematics and Jacobian for a 6-DOF industrial robot arm in Python SymPy',
          'Implement LQR controller in Python for inverted pendulum on a cart, validating stability margins',
          'Write Quaternion trajectory interpolation (SLERP) in C++ with test cases'
        ],
        primaryTools: ['Python (SymPy, NumPy, Matplotlib)', 'MATLAB / Octave Control Toolbox', 'Modern Robotics Library'],
        deliverable: 'Kinematics & Dynamics Python Simulator for 6-DOF Robotic Manipulator with LQR controller',
        recommendedResources: [
          { title: 'Modern Robotics: Mechanics, Planning, and Control', type: 'Book', linkOrAuthor: 'Kevin M. Lynch & Frank C. Park' },
          { title: 'Probabilistic Robotics', type: 'Book', linkOrAuthor: 'Sebastian Thrun, Wolfram Burgard' }
        ]
      },
      {
        phaseNumber: 2,
        title: 'ROS 2 Middleware, Node Architecture & DDS Telemetry',
        durationWeeks: 'Weeks 5-8',
        focusArea: 'ROS 2 Humble, Publishers/Subscribers, Services, Actions, Lifecycle Nodes & FastDDS',
        keyConcepts: [
          'ROS 2 Architecture vs ROS 1: Absence of master node, Data Distribution Service (DDS) discovery',
          'Quality of Service (QoS) profiles: Reliability (Best Effort vs Reliable), Durability (Transient Local), History depth',
          'Managed Lifecycle Nodes (Unconfigured -> Inactive -> Active -> Finalized) for deterministic robot bringup',
          'ROS 2 Action servers for long-running preemptible tasks (goal, feedback, result)',
          'TF2 transform library: Broadcasting dynamic transforms between `map`, `odom`, `base_link`, and `laser_frame`'
        ],
        handsOnMilestones: [
          'Create ROS 2 C++ package with a Lifecycle Node publishing IMU and wheel odometry topics with custom QoS',
          'Write custom Action Server and Client for robot docking sequence with cancellation handling',
          'Visualize coordinate frame tree in RViz2 and debug transform latency using `tf2_tools view_frames`'
        ],
        primaryTools: ['ROS 2 Humble / Iron', 'colcon build system', 'RViz2', 'FastDDS'],
        deliverable: 'Production-ready ROS 2 C++ Robot Hardware Interface package with Lifecycle state machine',
        recommendedResources: [
          { title: 'ROS 2 Documentation & Tutorials', type: 'Documentation', linkOrAuthor: 'Open Robotics (docs.ros.org)' },
          { title: 'A Concise Introduction to Robot Programming with ROS2', type: 'Book', linkOrAuthor: 'Francisco Martín Rico' }
        ]
      },
      {
        phaseNumber: 3,
        title: 'Simulation in Gazebo, SLAM & Autonomous Navigation (Nav2)',
        durationWeeks: 'Weeks 9-12',
        focusArea: 'URDF/Xacro models, Gazebo physics, Cartographer SLAM, Nav2 behavior trees & costmaps',
        keyConcepts: [
          'Robot modeling with URDF and Xacro: Visual, collision, and inertia tensors (`ixx, iyy, izz`)',
          'Gazebo physics engine (ODE / DART): Friction coefficients (`mu1, mu2`), contact sensors, differential drive plugins',
          'Simultaneous Localization and Mapping (SLAM): 2D LiDAR scan matching with Google Cartographer / Slam Toolbox',
          'Nav2 Architecture: Global Planner (NavFn / Smac), Local Controller (DWB / MPPI), Costmap2D (Inflation, Obstacle layer)',
          'Behavior Trees (BT.CPP): Action nodes, Condition nodes, fallback sequences for recovery behaviors'
        ],
        handsOnMilestones: [
          'Build comprehensive URDF model of autonomous mobile robot (AMR) with 2D LiDAR and depth camera in Gazebo',
          'Map a virtual warehouse environment using `slam_toolbox` and save 2D occupancy grid map (.yaml/.pgm)',
          'Tune Nav2 MPPI (Model Predictive Path Integral) controller to navigate through narrow aisles without collisions'
        ],
        primaryTools: ['Gazebo Fortress / Garden', 'Nav2 Navigation Stack', 'Slam Toolbox', 'BehaviorTree.CPP'],
        deliverable: 'Autonomous Warehouse AMR Gazebo Simulation with Nav2 Multi-Waypoint Dispatcher',
        recommendedResources: [
          { title: 'Nav2 Documentation & Tuning Guide', type: 'Documentation', linkOrAuthor: 'Nav2 Project Team' },
          { title: 'Robotics, Vision and Control', type: 'Book', linkOrAuthor: 'Peter Corke' }
        ]
      },
      {
        phaseNumber: 4,
        title: 'Industrial Automation (PLC, SCADA, IEC 61131-3) & Interview Drills',
        durationWeeks: 'Weeks 13-16',
        focusArea: 'Ladder Logic, Structured Text, CoDeSys, Modbus/TCP, EtherCAT & ABB/Addverb drills',
        keyConcepts: [
          'IEC 61131-3 programming languages: Structured Text (ST), Ladder Diagram (LD), Function Block Diagram (FBD)',
          'Industrial Fieldbus protocols: Modbus TCP/IP, PROFINET, and deterministic EtherCAT master-slave cycles',
          'Emergency Stop (E-Stop) safety circuits: ISO 13849-1 Performance Level (PL-d / PL-e) dual-channel safety relays',
          'Hardware-in-the-Loop (HIL) testing, motion profiling (S-curve velocity profiles), and motor drive tuning'
        ],
        handsOnMilestones: [
          'Program an automated assembly line sorting station in CoDeSys v3.5 using Structured Text and state machines',
          'Establish Modbus TCP communication between a Python telemetry server and virtual PLC running on localhost',
          'Solve 25+ real interview challenges from Addverb, ABB Robotics, KUKA, Boston Dynamics, and Rockwell'
        ],
        primaryTools: ['CoDeSys v3.5', 'Siemens TIA Portal (or OpenPLC)', 'Wireshark (Modbus/EtherCAT)', 'Python PyModbus'],
        deliverable: 'Industrial Sorting Automation Project in CoDeSys Structured Text with Modbus TCP SCADA dashboard',
        recommendedResources: [
          { title: 'Automating Manufacturing Systems with PLCs', type: 'Book', linkOrAuthor: 'Hugh Jack' },
          { title: 'EtherCAT Technology Group Technical Specifications', type: 'Documentation', linkOrAuthor: 'EtherCAT.org' }
        ]
      }
    ],
    toolProfiles: [
      {
        name: 'ROS 2 (Robot Operating System) Humble / Iron',
        category: 'Robot Middleware Framework',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'Industry Standard across Global Autonomous Robotics',
        primaryUse: 'Building distributed robotic systems with real-time DDS communication, sensor drivers, and navigation stacks',
        setupGuide: {
          osSupport: 'Ubuntu 22.04 LTS (Humble) / Ubuntu 24.04 (Jazzy)',
          quickInstallCommand: 'sudo apt update && sudo apt install -y ros-humble-desktop ros-humble-navigation2 ros-humble-nav2-bringup',
          prerequisites: 'Linux terminal fluency, C++17, Python 3.10+, colcon'
        },
        industryWorkflow: [
          'Create workspace (`colcon_ws/src`) and generate package with `ros2 pkg create --build-type ament_cmake my_robot_driver`',
          'Implement nodes utilizing standard message formats (`sensor_msgs`, `nav_msgs`, `geometry_msgs`)',
          'Write composable components and dynamic parameter declarations with validation callbacks',
          'Launch multi-node systems via Python launch files with parameter overrides and namespace mapping'
        ],
        handsOnLabDrill: {
          title: 'Custom Differential Drive Odometry Publisher with TF2',
          objective: 'Calculate wheel odometry from encoder ticks in C++, integrate pose using Runge-Kutta, and broadcast `odom` to `base_link` transform at 50 Hz.',
          steps: [
            'Subscribe to `/wheel_ticks` topic (left and right integer tick counts)',
            'Calculate linear velocity v and angular velocity w using wheel radius and track separation',
            'Integrate orientation θ and positions x, y',
            'Publish `nav_msgs/msg/Odometry` and broadcast `geometry_msgs/msg/TransformStamped` via `tf2_ros::TransformBroadcaster`.'
          ],
          verificationCheck: 'Run `ros2 run tf2_ros tf2_echo odom base_link`: Transform updates at exactly 50 Hz with < 1 ms latency.'
        }
      },
      {
        name: 'CoDeSys v3.5 / OpenPLC',
        category: 'IEC 61131-3 Industrial PLC Development System',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'Siemens TIA Portal / Rockwell Studio 5000',
        primaryUse: 'Developing safety-critical control logic, industrial state machines, and motion sequences for factory automation',
        setupGuide: {
          osSupport: 'Windows 10/11 (or OpenPLC on Linux/Raspberry Pi)',
          quickInstallCommand: 'Download CoDeSys Development System V3 from codesys.com (Free download)',
          prerequisites: 'Knowledge of Boolean logic, timers, counters, and state transitions'
        },
        industryWorkflow: [
          'Create project targeting CoDeSys Control Win V3 or Raspberry Pi runtime',
          'Define Global Variable Lists (GVLs) mapping hardware digital/analog inputs and outputs (`%IX0.0`, `%QX0.0`)',
          'Write program organization units (POUs) in Structured Text (ST) utilizing `CASE state OF` architecture',
          'Simulate program execution in built-in software PLC with force variables and watch windows'
        ],
        handsOnLabDrill: {
          title: 'Conveyor Belt Sorting Station in Structured Text',
          objective: 'Implement an industrial state machine: detect product with optical sensor, measure weight, divert reject parts with pneumatic cylinder, and log cycle time.',
          steps: [
            'Define enumeration `E_StationState: (IDLE, FEEDING, MEASURING, SORTING_PASS, SORTING_REJECT, EMERGENCY_STOP)`',
            'Implement TON (Timer On-Delay) function blocks for cylinder stroke timeout verification',
            'Trigger alarm if part is not cleared within 3.0 seconds (jam detection)',
            'Expose register addresses for Modbus TCP SCADA polling.'
          ],
          verificationCheck: 'Virtual PLC executes state sequence continuously without entering error state during 50 consecutive test cycles.'
        }
      }
    ],
    capstoneBlueprint: {
      title: 'Autonomous Mobile Robot (AMR) with 2D SLAM, Dynamic Obstacle Avoidance & Web Fleet Telemetry',
      hardwareCostEstimate: '₹28,000 / $340 (TurtleBot 4 Lite or Raspberry Pi + RPLiDAR, or ₹0 in Gazebo)',
      estimatedBuildTime: '4 Weeks (40 Hours)',
      objective: 'Develop a full-stack autonomous mobile robot stack capable of mapping unknown indoor environments with LiDAR, executing goal dispatch commands from a fleet server, and dynamically avoiding moving obstacles using Nav2 MPPI controller.',
      hardwareBOM: [
        'Differential Drive Robot Base (2x 12V Geared DC Motors with Optical Encoders)',
        'Slamtec RPLiDAR A1 / A2 360-degree Laser Scanner',
        'Single Board Computer (Raspberry Pi 4 4GB or Jetson Nano)',
        'STM32F4 / ESP32 Motor Controller Board over USB Serial',
        '11.1V 3S LiPo Battery Pack with Voltage Supervisor'
      ],
      softwareStack: ['ROS 2 Humble', 'Ubuntu 22.04 Server', 'Nav2', 'Slam Toolbox', 'FastAPI & WebSockets for Dashboard'],
      gitHubStructure: [
        'amr_description/ (urdf/, meshes/, launch/view_robot.launch.py)',
        'amr_firmware/ (stm32_motor_driver.c, pid_controller.c, encoder.c)',
        'amr_navigation/ (config/nav2_params.yaml, maps/warehouse_map.yaml, launch/nav2.launch.py)',
        'fleet_server/ (server.py, static/index.html, static/app.js)'
      ],
      testingAndSignoff: [
        'Localization Precision: Robot navigates to 10 sequential waypoints with final goal error < 3 cm and < 2 degrees',
        'Obstacle Avoidance: Robot successfully halts and replans around sudden human obstruction within 200 ms',
        'Uptime: 2-hour continuous battery run with zero ROS 2 node crashes or DDS communication drops'
      ]
    },
    interviewDrills: [
      {
        topic: 'Quaternions vs Euler Angles in Robotics',
        question: 'What is Gimbal Lock in 3D rotation representations, why does it occur with Euler angles, and how do Unit Quaternions prevent it in robotic controllers?',
        difficulty: 'Medium',
        targetCompany: 'Addverb, Boston Dynamics, ABB, Waymo',
        technicalAnswer: 'Euler angles represent 3D orientation through 3 consecutive rotations around body or spatial axes (e.g., Roll-Pitch-Yaw: Z-Y-X). Gimbal Lock occurs when the middle rotation angle (Pitch) reaches ±90 degrees (π/2). At this orientation, the first and third rotation axes align with each other, resulting in the loss of one degree of rotational freedom (mathematical singularity in the Jacobian derivative matrix). The system cannot distinguish between roll and yaw changes, causing infinite angular velocities in inverse kinematics. Unit Quaternions q = [w, x, y, z] (with constraint w^2 + x^2 + y^2 + z^2 = 1) map rotations onto a 4-dimensional hypersphere (S^3). Because Quaternions do not use trigonometric pitch angles, they contain zero kinematic singularities anywhere in 3D space, permit smooth non-ambiguous spherical linear interpolation (SLERP), and require fewer floating-point operations for concatenation.',
        keyKeywordsToMention: ['Loss of one rotational degree of freedom', 'Pitch = ±90° axis alignment', 'Kinematic singularity in Jacobian', '4D Hypersphere S^3 representation', 'Spherical Linear Interpolation (SLERP)']
      },
      {
        topic: 'SLAM & Loop Closure',
        question: 'In graph-based SLAM algorithms (such as Cartographer or GTSAM), what is the difference between Frontend Scan Matching and Backend Pose Graph Optimization, and why is Loop Closure critical?',
        difficulty: 'Hard',
        targetCompany: 'Slamtec, Skydio, Tesla Autopilot, iRobot',
        technicalAnswer: 'Graph-based SLAM decouples the mapping problem into two components: 1) FRONTEND: Takes raw sensor data (LiDAR point clouds, wheel odometry, IMU) and performs scan-to-scan or scan-to-submap matching (e.g., via Iterative Closest Point - ICP or Correlative Scan Matching). The frontend estimates consecutive relative pose displacements and creates nodes (robot poses) and edges (relative constraints) in a factor graph. Because each scan has minor noise, odometry errors accumulate unboundedly over time (drift). 2) BACKEND: Solves a non-linear least squares optimization problem (using Levenberg-Marquardt or Gauss-Newton) over all poses to minimize error across all constraint edges. 3) LOOP CLOSURE: When the robot revisits a previously mapped location, the frontend detects similarity between the current scan and an old submap. A loop closure edge is added connecting the current pose node back to the historic node. The backend optimization engine distributes the accumulated drift error across the entire graph, correcting the entire trajectory and closing map misalignments.',
        keyKeywordsToMention: ['Frontend scan-to-submap matching', 'Dead-reckoning drift accumulation', 'Backend non-linear least squares optimization', 'Factor graph nodes and edges', 'Loop closure edge error distribution']
      }
    ],
    atsResumeBullets: [
      'Engineered autonomous warehouse mobile robot in ROS 2 Humble and Gazebo, tuning Nav2 MPPI controller and Slam Toolbox to navigate dynamic obstacles with < 3 cm waypoint accuracy.',
      'Constructed deterministic C++ ROS 2 Lifecycle Node streaming wheel odometry and IMU fusion via TF2 transform broadcaster at 50 Hz with zero latency jitter.',
      'Designed IEC 61131-3 industrial sorting automation program in CoDeSys Structured Text with Modbus TCP telemetry integration, achieving zero safety violations over 1,000 test cycles.'
    ]
  },
  {
    fieldId: 'renewable-energy-smart-grids',
    fieldTitle: 'Renewables, Smart Grids & Power Systems',
    department: 'EEE',
    badgeColor: 'orange',
    tagline: 'Grid-tied inverters, MPPT, IEEE 1547 compliance, OpenDSS feeder analysis, microgrids & SCADA',
    prerequisites: ['Power Systems Analysis', 'Power Electronics', 'Control Theory', 'MATLAB / Python'],
    weeklyCommitment: '12-14 hours/week for 16 weeks',
    phases: [
      {
        phaseNumber: 1,
        title: 'Power System Modeling, Load Flow & Fault Analysis',
        durationWeeks: 'Weeks 1-4',
        focusArea: 'Y-bus matrix, Newton-Raphson load flow, symmetrical components & short-circuit analysis',
        keyConcepts: [
          'Per-unit (p.u.) system normalization across multi-voltage transmission and distribution networks',
          'Nodal admittance matrix (Y_bus) formulation and sparse matrix representation',
          'Newton-Raphson and Fast Decoupled load flow algorithms for voltage magnitude and phase angle solution',
          'Symmetrical components: Positive, negative, and zero sequence networks for asymmetrical fault calculations',
          'Overcurrent protection coordination: Inverse Definite Minimum Time (IDMT) relay curves and trip grading'
        ],
        handsOnMilestones: [
          'Code Newton-Raphson load flow solver in Python NumPy for IEEE 14-bus test system from scratch',
          'Simulate 3-phase symmetrical and single-line-to-ground (SLG) faults in PowerWorld / Python Pandapower',
          'Coordinate primary and backup overcurrent relays on radial feeder ensuring 300 ms grading margin'
        ],
        primaryTools: ['Python (Pandapower, NumPy)', 'MATLAB Power Systems Toolbox', 'PowerWorld Simulator'],
        deliverable: 'Python-based Newton-Raphson Grid Load Flow Solver & Fault Calculation Package',
        recommendedResources: [
          { title: 'Power System Analysis', type: 'Book', linkOrAuthor: 'Hadi Saadat' },
          { title: 'Power System Analysis and Design', type: 'Book', linkOrAuthor: 'J. Duncan Glover' }
        ]
      },
      {
        phaseNumber: 2,
        title: 'Grid-Tied Inverter Control, MPPT & Phase-Locked Loops',
        durationWeeks: 'Weeks 5-8',
        focusArea: 'Perturb & Observe MPPT, dq-synchronous reference frame, LCL filter design & SRF-PLL',
        keyConcepts: [
          'Solar PV array modeling (single-diode model: I_sc, V_oc, fill factor, and temperature coefficients)',
          'Maximum Power Point Tracking (MPPT): Perturb & Observe (P&O) vs Incremental Conductance (IncCond)',
          'Synchronous Reference Frame Phase-Locked Loop (SRF-PLL) and Second-Order Generalized Integrator (SOGI-PLL)',
          'LCL Filter Design: Resonance frequency calculation, passive/active damping resistors to suppress grid harmonics',
          'Grid synchronization and voltage regulation: P-f (frequency droop) and Q-V (voltage droop) control'
        ],
        handsOnMilestones: [
          'Implement P&O and Incremental Conductance MPPT in MATLAB Simulink and verify tracking under rapidly shifting irradiance',
          'Design LCL filter for a 50 kW grid-tied inverter meeting IEEE 519 harmonic limits (THD < 5%)',
          'Simulate SOGI-PLL under 20% voltage sag and unbalanced grid voltage conditions in PLECS'
        ],
        primaryTools: ['MATLAB Simulink / Simscape', 'PLECS Standalone', 'LTspice'],
        deliverable: 'Complete Simulink / PLECS Model of 50 kW Grid-Tied PV Inverter with LCL Filter & SOGI-PLL',
        recommendedResources: [
          { title: 'Grid Converters for Photovoltaic and Wind Power Systems', type: 'Book', linkOrAuthor: 'Remus Teodorescu & Marco Liserre' },
          { title: 'IEEE 1547-2018 Standard for Interconnection of Distributed Energy Resources', type: 'Standard', linkOrAuthor: 'IEEE Standards Association' }
        ]
      },
      {
        phaseNumber: 3,
        title: 'Distribution Feeder Simulation & OpenDSS Hosting Capacity',
        durationWeeks: 'Weeks 9-12',
        focusArea: 'OpenDSS scripting, rooftop solar hosting capacity, voltage violation mitigation & BESS',
        keyConcepts: [
          'Distribution feeder characteristics: Unbalanced 3-phase multi-conductor modeling, high R/X ratio',
          'Solar PV hosting capacity analysis: Overvoltage limits (ANSI C84.1 Range A: 0.95 - 1.05 p.u.)',
          'Smart Inverter functions: Volt-VAR (Q(V)) and Volt-Watt (P(V)) autonomous curves under IEEE 1547-2018',
          'Battery Energy Storage System (BESS) peak shaving and time-of-use (TOU) arbitrage scheduling',
          'Automated Python scripting of OpenDSS COM / Direct interface for quasi-static time-series (QSTS) simulation'
        ],
        handsOnMilestones: [
          'Model IEEE 123-node test feeder in OpenDSS with 24-hour time-varying load and solar profiles',
          'Write Python script calculating maximum rooftop solar capacity before 1.05 p.u. voltage violations occur',
          'Implement smart inverter Volt-VAR curves in OpenDSS, boosting feeder hosting capacity by 35%'
        ],
        primaryTools: ['OpenDSS (EPRI)', 'Python py-dss-interface', 'Pandapower', 'QGIS for GIS mapping'],
        deliverable: 'Automated Solar PV Hosting Capacity Assessment Suite for Distribution Feeders in Python OpenDSS',
        recommendedResources: [
          { title: 'OpenDSS Documentation and Primer', type: 'Documentation', linkOrAuthor: 'Electric Power Research Institute (EPRI)' },
          { title: 'Smart Grid: Technology and Applications', type: 'Book', linkOrAuthor: 'Janaka Ekanayake' }
        ]
      },
      {
        phaseNumber: 4,
        title: 'Substation Automation (IEC 61850), Microgrids & Interview Drills',
        durationWeeks: 'Weeks 13-16',
        focusArea: 'IEC 61850 GOOSE messaging, islanding detection, black-start & Schneider/ABB drills',
        keyConcepts: [
          'IEC 61850 Substation Architecture: Process bus (Sampled Values - 9-2LE), Station bus (GOOSE & MMS)',
          'Substation Configuration Language (SCL): SCD, ICD, CID files and Intelligent Electronic Devices (IEDs)',
          'Anti-islanding protection: Active (Sandia Frequency Shift) vs Passive (Rate of Change of Frequency - ROCOF, Under/Over Voltage)',
          'Microgrid master control: Seamless transition between grid-connected and islanded mode with black-start sequence'
        ],
        handsOnMilestones: [
          'Capture and analyze IEC 61850 GOOSE trip message packets in Wireshark, verifying transmission within 4 ms',
          'Simulate microgrid islanding transition in Simulink and evaluate frequency stability under sudden load dump',
          'Complete 25+ interview drills from Schneider Electric, ABB Power Grids / Hitachi Energy, Siemens Energy, and Tata Power'
        ],
        primaryTools: ['Wireshark (IEC 61850 dissectors)', 'OpenPLC / CoDeSys', 'libiec61850 (C library)'],
        deliverable: 'Microgrid Controller Logic with Anti-Islanding Detection & IEC 61850 GOOSE Telemetry Log',
        recommendedResources: [
          { title: 'IEC 61850: Communication Networks and Systems for Power Utility Automation', type: 'Standard', linkOrAuthor: 'International Electrotechnical Commission' },
          { title: 'Substation Automation Systems: Design and Implementation', type: 'Book', linkOrAuthor: 'Alireza Gholami' }
        ]
      }
    ],
    toolProfiles: [
      {
        name: 'OpenDSS (Open Distribution System Simulator)',
        category: 'Distribution System Simulation Engine',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'CYME / ETAP / Synergi Electric',
        primaryUse: 'Simulating complex unbalanced distribution grids, solar PV integration, EV charging loads, and smart inverter Volt-VAR controls',
        setupGuide: {
          osSupport: 'Windows, Linux, macOS',
          quickInstallCommand: 'pip install py-dss-interface matplotlib pandas',
          prerequisites: 'Python 3.8+, basic power system knowledge'
        },
        industryWorkflow: [
          'Define circuit lines, transformers, capacitors, loads, and solar PV generators in `.dss` script files',
          'Instantiate OpenDSS COM engine via Python `dss = py_dss_interface.DSSDLL()`',
          'Solve daily load profile (96 time-steps for 15-minute intervals) using Quasi-Static Time-Series (QSTS) mode',
          'Query node voltages, line loading percentages, and losses to generate compliance heatmaps'
        ],
        handsOnLabDrill: {
          title: 'Solar PV Hosting Capacity Analysis with Volt-VAR Support',
          objective: 'Gradually scale rooftop solar generation on an IEEE 37-node feeder from 0 to 5 MW; record when voltages exceed 1.05 p.u. with and without Volt-VAR control.',
          steps: [
            'Load IEEE 37-node circuit in OpenDSS through Python interface',
            'Run baseline load flow with 0% solar to verify all voltages are within 0.95 - 1.05 p.u.',
            'Incrementally inject PV at high-impedance ends of the feeder in 200 kW steps',
            'Enable `InvControl` in `VOLTVAR` mode and demonstrate overvoltages are mitigated.'
          ],
          verificationCheck: 'Volt-VAR control successfully extends solar penetration by > 35% while keeping all bus voltages below 1.048 p.u.'
        }
      },
      {
        name: 'Simulink Simscape Electrical',
        category: 'Power Systems & Power Electronics Simulation Suite',
        isFreeOrOpenSource: false,
        enterpriseEquivalent: 'Industry Standard (Alternative: Pandapower / Free PSCAD Student Demo)',
        primaryUse: 'Simulating high-frequency power electronic switching converters interconnected with electrical utility grids',
        setupGuide: {
          osSupport: 'Windows, Linux, macOS',
          quickInstallCommand: 'Install MATLAB with Simulink, Simscape, and Simscape Electrical add-ons',
          prerequisites: 'MATLAB license'
        },
        industryWorkflow: [
          'Construct electrical circuit using specialized power systems blocks (Three-Phase Source, Transformers, IGBT Inverter)',
          'Configure solver type (Ode23tb or fixed-step discrete Tustin solver at 1 μs time step)',
          'Integrate PLL and vector current controllers in discrete domain',
          'Simulate grid disturbances (sags, frequency steps, harmonics) and measure settling response'
        ],
        handsOnLabDrill: {
          title: 'Grid Synchronization with SOGI-PLL under Unbalanced Voltage Sag',
          objective: 'Build a Second-Order Generalized Integrator (SOGI) PLL that extracts positive-sequence voltage under 30% single-phase grid fault.',
          steps: [
            'Create unbalanced three-phase AC source block (Phase A dropped to 0.70 p.u.)',
            'Implement SOGI orthogonal signal generator generating v_alpha and v_beta',
            'Feed into Clarke-to-dq transformation and tune PI loop filter to lock phase angle',
            'Plot phase angle tracking error: Verify PLL locks within 2 cycles (< 40 ms).'
          ],
          verificationCheck: 'Estimated grid frequency settles back to 50.0 Hz with zero steady-state error despite severe Phase A voltage sag.'
        }
      }
    ],
    capstoneBlueprint: {
      title: 'Smart Microgrid Controller with Solar PV MPPT, Battery Storage & Autonomous Islanding',
      hardwareCostEstimate: '₹18,000 / $220 (or 100% free virtual simulation in OpenDSS & Python)',
      estimatedBuildTime: '4 Weeks (40 Hours)',
      objective: 'Develop an automated microgrid energy management system that coordinates a 100 kW solar array, a 200 kWh battery storage unit, and critical loads; maintains grid stability during peak pricing, and seamlessly transitions to islanded operation upon utility outage.',
      hardwareBOM: [
        'STM32F4 Discovery or Raspberry Pi 4 running Microgrid Energy Management Controller',
        'Carlo Gavazzi / Eastron Modbus RS485 3-Phase Smart Energy Meter',
        'USB to RS485 Industrial Isolated Converter',
        'Relay Output Board for Load Shedding Contactor Simulation'
      ],
      softwareStack: ['Python 3.11', 'OpenDSS', 'py-dss-interface', 'PyModbus', 'FastAPI & Plotly Dash'],
      gitHubStructure: [
        'grid_model/ (feeder_123.dss, solar_profiles.csv, load_profiles.csv)',
        'controller/ (microgrid_controller.py, mppt_optimizer.py, peak_shaving.py)',
        'telemetry/ (modbus_poller.py, iec61850_logger.py, dashboard.py)',
        'docs/ (Feeder_Analysis_Report.pdf, IEEE1547_Compliance_Matrix.xlsx)'
      ],
      testingAndSignoff: [
        'Peak Shaving: Microgrid curtails utility demand by > 40% during peak tariff hours (6 PM - 10 PM)',
        'Islanding Detection: Controller detects grid loss via ROCOF trigger within 80 ms and commands islanding switch',
        'Voltage Compliance: Feeder voltage stays strictly within ANSI C84.1 Range A (0.95 - 1.05 p.u.) at all times'
      ]
    },
    interviewDrills: [
      {
        topic: 'LCL Filter Resonance and Damping',
        question: 'Why is an LCL filter preferred over a simple L filter for grid-connected inverters, what is the risk of LCL resonance, and how do active vs passive damping techniques resolve it?',
        difficulty: 'Hard',
        targetCompany: 'Schneider Electric, Hitachi Energy, Enphase Energy, SMA Solar',
        technicalAnswer: '1) L vs LCL: A simple L filter requires a massive inductor to attenuate high-frequency switching harmonics to meet IEEE 519 standards (THD < 5%), resulting in high cost, weight, and voltage drop across the inductor. An LCL filter achieves a steep -60 dB/decade attenuation above its resonant frequency (compared to -20 dB/decade for an L filter), allowing much smaller inductance values. 2) Resonance Hazard: The LCL filter introduces an inherent resonant frequency: f_res = (1 / 2π) * sqrt((L_1 + L_2) / (L_1 * L_2 * C)). If any grid harmonics or inverter switching harmonics land near f_res, the circuit will resonate with near-infinite gain, causing severe instability, overcurrent trips, or capacitor explosion. 3) Damping: PASSIVE DAMPING adds a resistor in series with the filter capacitor. While simple and unconditionally stable, the damping resistor dissipates continuous I^2*R power, degrading inverter efficiency. ACTIVE DAMPING eliminates physical resistors by modifying the digital control algorithm—specifically by feeding back the capacitor current or capacitor voltage into the PWM duty cycle generation. This acts as a virtual digital resistor at the resonant frequency, achieving damping with zero thermal power loss.',
        keyKeywordsToMention: ['-60 dB/decade roll-off vs -20 dB/decade', 'Resonance frequency f_res formula', 'Instability and harmonic amplification', 'Passive damping resistor power loss', 'Active damping virtual resistance via capacitor current feedback']
      },
      {
        topic: 'IEEE 1547 Volt-VAR Control',
        question: 'How does the Volt-VAR (Q(V)) autonomous control curve defined in IEEE 1547-2018 function to mitigate voltage rise caused by high rooftop solar PV penetration on distribution feeders?',
        difficulty: 'Medium',
        targetCompany: 'ABB Power Grids, Tata Power, SolarEdge, Tesla Energy',
        technicalAnswer: 'When high rooftop solar PV generation occurs during midday low-load hours, reverse power flow (P_inj) through the distribution feeder impedance (R + jX) causes a voltage rise approximately equal to ΔV ≈ (P * R + Q * X) / V_nom. Because distribution lines have non-negligible reactance X, injecting active power raises local bus voltage, often exceeding the 1.05 p.u. utility limit. IEEE 1547-2018 specifies an autonomous piece-wise linear Volt-VAR curve: 1) When bus voltage is within the deadband (e.g., 0.98 - 1.02 p.u.), the inverter operates at unity power factor (Q = 0). 2) When local voltage rises into the high zone (1.02 - 1.05 p.u.), the inverter autonomously absorbs inductive reactive power (Q < 0, up to 44% of rated kVA). Absorbing negative Q produces a negative voltage drop (Q * X < 0), directly canceling out the active power voltage rise (P * R). 3) Conversely, during low voltage (sags), the inverter injects capacitive reactive power (Q > 0) to boost voltage.',
        keyKeywordsToMention: ['Voltage rise formula ΔV ≈ (PR + QX)/V', 'Reverse power flow in midday', 'IEEE 1547 piece-wise linear curve', 'Reactive power absorption (Q < 0)', 'Deadband operation (0.98 - 1.02 p.u.)']
      }
    ],
    atsResumeBullets: [
      'Engineered automated Python distribution feeder simulation using OpenDSS COM interface, evaluating rooftop solar hosting capacity and boosting penetration by 35% via Volt-VAR curves.',
      'Designed LCL output filter and discrete SOGI-PLL for a 50 kW grid-tied solar inverter in Simulink, achieving < 2.8% current THD compliant with IEEE 519.',
      'Developed microgrid islanding controller with IEC 61850 GOOSE telemetry logging, detecting loss of mains in < 75 ms and sustaining critical hospital load voltage within ±2%.'
    ]
  },
  {
    fieldId: 'pcb-hardware-engineering',
    fieldTitle: 'High-Speed PCB Design & Hardware Systems Engineering',
    department: 'Both',
    badgeColor: 'rose',
    tagline: 'Multi-layer stackups, controlled impedance, PCIe Gen 4/DDR4 routing, PDN decoupling, Signal Integrity & EMI/EMC',
    prerequisites: ['Circuit Analysis', 'Electromagnetics', 'Digital Logic', 'Electronic Devices'],
    weeklyCommitment: '14-16 hours/week for 16 weeks',
    phases: [
      {
        phaseNumber: 1,
        title: 'Transmission Lines, Controlled Impedance & Stackup Architecture',
        durationWeeks: 'Weeks 1-4',
        focusArea: 'Microstrip vs stripline, characteristic impedance Z0, dielectric loss tangent & layer stackup',
        keyConcepts: [
          'Transmission line threshold: Rise time vs propagation delay (t_rise < 2 * t_prop requirement for transmission lines)',
          'Characteristic impedance: Microstrip and Stripline equations, dielectric constant (Dk), loss tangent (Df)',
          'Controlled impedance routing: 50-ohm single-ended (RF/Clock), 90-ohm differential (USB 2.0/3.0), 100-ohm differential (PCIe/Ethernet)',
          'PCB stackup design: Symmetrical layer construction, prepreg vs core, reference plane continuity, ground stitching',
          'IPC-2221B trace width and current carrying capacity formulas (internal vs external temperature rise)'
        ],
        handsOnMilestones: [
          'Calculate exact trace geometries for a 6-layer FR4 stackup (Sig-GND-Sig-PWR-GND-Sig) for 50-ohm and 90-ohm lines in Saturn PCB Toolkit',
          'Plot eye diagram degradation over 10-inch FR4 trace vs Megtron 6 low-loss dielectric at 5 Gbps in Python',
          'Review IPC-2221B clearance rules and create design constraint ruleset in KiCad 8'
        ],
        primaryTools: ['Saturn PCB Toolkit (Free)', 'KiCad 8 PCB Calculator', 'Python (Transmission line solver)'],
        deliverable: 'Industrial 6-Layer Stackup Fabrication Spec Sheet with Controlled Impedance Calculation Table',
        recommendedResources: [
          { title: 'Right the First Time: A Practical Guide to High Speed PCB Design', type: 'Book', linkOrAuthor: 'Lee W. Ritchey' },
          { title: 'Signal and Power Integrity - Simplified', type: 'Book', linkOrAuthor: 'Eric Bogatin' }
        ]
      },
      {
        phaseNumber: 2,
        title: 'Schematic Capture, Worst-Case Circuit Analysis (WCCA) & PDN',
        durationWeeks: 'Weeks 5-8',
        focusArea: 'Component selection, power distribution networks, decoupling capacitor resonance & DFMEA',
        keyConcepts: [
          'Power Distribution Network (PDN): Target impedance formula Z_target = (V_rail * Ripple%) / (I_transient)',
          'Decoupling capacitor behavior: Equivalent Series Resistance (ESR), Equivalent Series Inductance (ESL), and self-resonant frequency (SRF)',
          'Worst-Case Circuit Analysis (WCCA): Component tolerances, temperature drift, aging, Monte Carlo analysis in LTspice',
          'Component derating guidelines: IPC-9592B standard (voltage derating to 70%, temperature derating to 80%)',
          'Design for Manufacturing (DFM) and Design for Assembly (DFA): Footprints, courtyard clearance, thermal relief pads'
        ],
        handsOnMilestones: [
          'Calculate PDN target impedance for an FPGA core rail (0.85V, 10A transient, 3% ripple tolerance) = 2.55 mΩ',
          'Simulate composite decoupling network (22μF + 1μF + 0.1μF + 0.01μF) in LTspice showing impedance stays below 2.55 mΩ up to 250 MHz',
          'Execute Monte Carlo 1,000-run tolerance analysis on an analog sensor amplifier stage in LTspice'
        ],
        primaryTools: ['KiCad 8 Schematic Editor / Altium Designer', 'LTspice XVII', 'Saturn PCB Toolkit'],
        deliverable: 'Complete Schematic for Quad-Core Embedded SOM Carrier Board with WCCA Tolerance Dossier',
        recommendedResources: [
          { title: 'Power Distribution Network Design Methodologies', type: 'Book', linkOrAuthor: 'Istvan Novak' },
          { title: 'IPC-9592B: Requirements for Power Conversion Devices', type: 'Standard', linkOrAuthor: 'IPC Standards' }
        ]
      },
      {
        phaseNumber: 3,
        title: 'High-Speed Routing: DDR4, PCIe Gen 3/4 & Differential Pairs',
        durationWeeks: 'Weeks 9-12',
        focusArea: 'Length tuning, intra-pair skew, via stub backdrilling, return path slots & crosstalk',
        keyConcepts: [
          'DDR4 layout rules: Fly-by topology for Address/Command/Control lines, length matching within byte lanes (< 5 ps skew)',
          'Differential pair routing: Tightly coupled vs loosely coupled, phase matching, avoiding reference plane splits',
          'Return current paths: High-frequency return current follows path of least inductance directly beneath the trace',
          'Via impedance discontinuities: Via barrel inductance, antipad capacitance, and backdrilling to eliminate resonant stubs',
          'Crosstalk mitigation: 3W rule (trace separation ≥ 3x trace width), broadside vs edge-to-edge coupling'
        ],
        handsOnMilestones: [
          'Route high-speed DDR4 memory interface (DQ, DQS, Addr/Cmd) with trombone length tuning in KiCad 8 / Altium',
          'Route PCIe Gen 3 x4 differential lanes with AC coupling capacitors (0.1 μF 0402) and reference plane stitching vias',
          'Execute DRC (Design Rule Check) with 0 errors and zero clearance violations'
        ],
        primaryTools: ['KiCad 8 / Altium Designer', 'Gerbv (Gerber Viewer)', 'OpenEMS (Electromagnetic simulator)'],
        deliverable: 'Fully Routed 6-Layer High-Speed Carrier Board with DDR4 & PCIe Interfaces + Production Gerber/Drill Package',
        recommendedResources: [
          { title: 'High-Speed Digital Design: A Handbook of Black Magic', type: 'Book', linkOrAuthor: 'Howard Johnson & Martin Graham' },
          { title: 'JEDEC DDR4 Design Specification (JESD79-4B)', type: 'Standard', linkOrAuthor: 'JEDEC Standards Association' }
        ]
      },
      {
        phaseNumber: 4,
        title: 'Signal Integrity Simulation, EMI/EMC Compliance & Bench Testing',
        durationWeeks: 'Weeks 13-16',
        focusArea: 'IBIS models, eye diagrams, CISPR 32 / FCC Part 15, VNA testing & Apple/NVIDIA drills',
        keyConcepts: [
          'Signal Integrity (SI) simulation using IBIS (I/O Buffer Information Specification) models',
          'Eye diagram metrics: Eye height, eye width, deterministic jitter (DJ), random jitter (RJ), and bit error rate (BER)',
          'EMI/EMC Compliance: Radiated emissions (CISPR 32 / FCC Class B), conducted emissions, common-mode choke selection',
          'Lab bench validation: Time-Domain Reflectometry (TDR) for impedance discontinuities, high-bandwidth oscilloscope probing',
          'Design for Test (DFT): Test points, boundary scan (JTAG IEEE 1149.1), current measurement shunts'
        ],
        handsOnMilestones: [
          'Simulate IBIS buffer model of high-speed transmitter driving 100-ohm diff pair in Qucs-S / PyBERT and extract eye diagram',
          'Characterize PCB trace impedance and return loss (S11) on physical board using Vector Network Analyzer (NanoVNA / Keysight)',
          'Solve 25+ real hardware systems engineering interview problems from Apple, NVIDIA, Google Hardware, Cisco, and Intel'
        ],
        primaryTools: ['Qucs-S / PyBERT', 'NanoVNA / Siglent DSO', 'Altium / KiCad CAM Editor'],
        deliverable: 'Signal Integrity Simulation Report (Eye Diagram, TDR Impedance, Jitter Profile) & DFM Sign-Off Checklist',
        recommendedResources: [
          { title: 'EMC for Product Designers', type: 'Book', linkOrAuthor: 'Tim Williams' },
          { title: 'Printed Circuit Board Design Techniques for EMC Compliance', type: 'Book', linkOrAuthor: 'Mark I. Montrose' }
        ]
      }
    ],
    toolProfiles: [
      {
        name: 'KiCad 8.0 (Open Source EDA Suite)',
        category: 'Professional Schematic Capture & PCB Layout',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'Altium Designer / Cadence Allegro / Siemens Xpedition',
        primaryUse: 'Designing multi-layer high-speed printed circuit boards with differential pairs, length matching, and 3D step model export',
        setupGuide: {
          osSupport: 'Windows, Linux (Ubuntu/Fedora), macOS',
          quickInstallCommand: 'sudo add-apt-repository ppa:kicad/kicad-8.0-releases && sudo apt install -y kicad',
          prerequisites: 'OpenGL 3.3 support, 8GB+ RAM'
        },
        industryWorkflow: [
          'Capture schematic in Eeschema, assign footprints with 3D models, annotate and run ERC (Electrical Rules Check)',
          'Define Board Stackup (layer thicknesses, copper weights, core Dk/Df) and configure Net Classes in Board Setup',
          'Place components following signal flow: Power -> Processing Core -> Memory -> High-Speed IO -> Peripherals',
          'Route high-speed traces using Interactive Router with Length Tuning (`Tuning Pattern: Trombone / Accordion`)',
          'Run DRC, generate Gerber X2 files, Excellon drill files, IPC-D-356 netlist, and POS pick-and-place files'
        ],
        handsOnLabDrill: {
          title: 'Length-Tuned 100-Ohm Differential Pair with Ground Return Vias',
          objective: 'Route a PCIe Gen 3 differential pair across layers 1 and 6; maintain 100-ohm differential impedance, ensure skew is < 1.0 ps, and place ground stitching vias adjacent to layer transitions.',
          steps: [
            'Create Net Class `PCIE_DIFF`: Track width 0.15 mm, gap 0.12 mm, via drill 0.2 mm',
            'Route differential pair using `Route Differential Pair` tool (`6` shortcut)',
            'Transition from Top (Layer 1) to Bottom (Layer 6) through vias',
            'Immediately place two GND return vias within 0.5 mm of the signal vias to preserve return current continuity',
            'Use `Tune Length of a Differential Pair` tool to equalize length within 0.15 mm.'
          ],
          verificationCheck: 'DRC returns 0 errors; Length Tuning bar displays green checkmark with length difference = 0.04 mm (< 0.5 ps skew).'
        }
      },
      {
        name: 'Saturn PCB Toolkit',
        category: 'PCB Transmission Line & High-Speed Calculator',
        isFreeOrOpenSource: true,
        enterpriseEquivalent: 'Polar SI9000 (Commercial Standard)',
        primaryUse: 'Calculating exact characteristic impedance, via inductance, differential crosstalk, and trace temperature rise per IPC-2221B',
        setupGuide: {
          osSupport: 'Windows (runs seamlessly on Linux via Wine)',
          quickInstallCommand: 'Download installer from saturnpcb.com (Completely Free)',
          prerequisites: 'None'
        },
        industryWorkflow: [
          'Select transmission line model (Microstrip, Embedded Microstrip, Symmetrical Stripline, Asymmetrical Stripline)',
          'Input substrate parameters: Dielectric Constant Er (e.g., 4.2 for FR4), Dielectric Height H, Copper Thickness T',
          'Adjust trace width W to achieve target impedance (e.g., 50.0 Ω ± 1 Ω)',
          'Export calculation parameters into PCB layout constraints table'
        ],
        handsOnLabDrill: {
          title: 'Via Parasitic Capacitance & Inductance Calculation',
          objective: 'Calculate the parasitic inductance and capacitance of a through-hole via for a 1.6 mm thick 6-layer board, and determine its resonant cutoff frequency.',
          steps: [
            'Open Via Properties tab in Saturn PCB Toolkit',
            'Enter Board Thickness = 1.6 mm, Via Hole Diameter = 0.3 mm, Pad Diameter = 0.6 mm, Antipad Diameter = 0.9 mm',
            'Read results: Parasitic Inductance L_via ≈ 1.2 nH, Parasitic Capacitance C_via ≈ 0.45 pF',
            'Calculate self-resonant stub frequency: f_stub = c / (4 * h * sqrt(Er)) ≈ 23 GHz.'
          ],
          verificationCheck: 'Confirm that for signals with rise times > 150 ps (< 2.5 GHz), the via stub does not require backdrilling.'
        }
      }
    ],
    capstoneBlueprint: {
      title: 'Industrial 6-Layer IoT Edge Gateway Carrier Board with High-Speed USB 3.0, Ethernet & PCIe',
      hardwareCostEstimate: '₹6,500 / $80 (for 5 prototype PCBs manufactured via JLCPCB / PCBWay)',
      estimatedBuildTime: '4 Weeks (45 Hours)',
      objective: 'Design a complete industrial compute module carrier board in KiCad 8; features a Raspberry Pi CM4 or Rockchip SOM connector, Gigabit Ethernet PHY (RGMII 125 MHz), USB 3.0 (5 Gbps), M.2 PCIe NVMe slot, and wide-input 9-36V DC power supply with reverse-polarity protection.',
      hardwareBOM: [
        'Compute Module 4 (CM4) High-Density Board-to-Board Hirose Connectors',
        'Realtek RTL8211F Gigabit Ethernet PHY IC with Integrated Magnetics RJ45',
        'TI TPS54360B 3.5A Step-Down Buck Converter (36V input to 5V output)',
        'M.2 M-Key NVMe Connector for PCIe Gen 2/3 SSD',
        '6-Layer JLC2313 Controlled Impedance Stackup'
      ],
      softwareStack: ['KiCad 8.0', 'Saturn PCB Toolkit', 'LTspice XVII', 'Gerbv'],
      gitHubStructure: [
        'hardware/ (schematic.kicad_sch, layout.kicad_pcb, stackup_rules.kicad_dru)',
        'fabrication/ (gerbers_x2.zip, drill_files.zip, ipc_d_356.net, bom_jlc.csv, cpl_placement.csv)',
        'simulation/ (pdn_decoupling.asc, thermal_derating.xlsx, wcca_buck_regulator.asc)',
        'docs/ (High_Speed_Constraint_Table.pdf, DFM_Checklist.pdf, Test_Procedure.pdf)'
      ],
      testingAndSignoff: [
        'Power Rails: All 5 power rails (5V, 3.3V, 1.8V, 1.2V, 0.9V) start up within 10 ms with ripple < 25 mVpp under full 3A load',
        'Signal Integrity: USB 3.0 5 Gbps differential eye height > 320 mV with eye width > 0.65 UI on 4 GHz oscilloscope',
        'Ethernet Compliance: Gigabit Ethernet operates at 1000 Mbps with zero CRC packet errors over 24-hour continuous ping test'
      ]
    },
    interviewDrills: [
      {
        topic: 'Reference Plane Continuity & Split Planes',
        question: 'What happens when a high-speed digital trace (e.g., 500 MHz clock or PCIe lane) crosses a split in its reference plane, and what are the three major electrical consequences?',
        difficulty: 'Hard',
        targetCompany: 'Apple Hardware, NVIDIA, Google Pixel Hardware, Cisco Systems',
        technicalAnswer: 'At high frequencies (where f > 100 kHz), return current does not follow the path of least resistance (straight line between endpoints); it strictly follows the path of LEAST INDUCTANCE, which is the path directly underneath the signal trace on the adjacent reference plane. When a trace crosses a plane split (e.g., moving from a GND plane over to a +3.3V plane with a gap): 1) RETURN CURRENT DISRUPTION: The return current cannot jump across the gap. It is forced to divert around the split, creating a large physical loop area between the signal and return paths. 2) IMPEDANCE DISCONTINUITY: As loop inductance L skyrockets while capacitance C drops, the local characteristic impedance Z0 = sqrt(L/C) jumps from 50 Ω to > 120 Ω, causing severe signal reflections, edge ringing, and eye diagram closure. 3) MASSIVE RADIATED EMI & CROSSTALK: The large current loop acts as an efficient loop antenna, emitting radiated electromagnetic fields that fail FCC/CISPR compliance tests, and inductively couples common-mode noise into nearby adjacent traces.',
        keyKeywordsToMention: ['Path of least inductance directly under trace', 'Enlarged loop area (A increases)', 'Characteristic impedance discontinuity Z0 = sqrt(L/C)', 'Signal reflections & ringing', 'Radiated EMI loop antenna effect']
      },
      {
        topic: 'Decoupling Capacitor Placement & ESL',
        question: 'Why does a 0.1 μF 0402 capacitor provide better high-frequency decoupling than a 0.1 μF 1206 capacitor, and what is the optimal PCB layout rule for connecting decoupling capacitors to power and ground planes?',
        difficulty: 'Medium',
        targetCompany: 'Intel, Qualcomm, Texas Instruments, AMD',
        technicalAnswer: '1) Package Parasitic Inductance: The high-frequency performance of a capacitor is limited by its Equivalent Series Inductance (ESL). The resonant frequency is f_res = 1 / (2π * sqrt(C * ESL)). Above f_res, the capacitor stops acting as a capacitor and behaves as an inductor, losing its ability to suppress voltage transients. A smaller 0402 physical package has a much shorter internal current loop than a 1206 package, reducing ESL from ~1.2 nH down to ~0.4 nH, pushing the effective decoupling bandwidth significantly higher. 2) Layout Rules: Long, thin surface traces between the capacitor pad and the via add massive external loop inductance (approximately 1 nH per mm of trace length). The optimal layout rule is: Place vias immediately adjacent to the capacitor pads (or use Via-In-Pad with microvias), keep the power and ground vias closely spaced to maximize mutual inductance cancellation, and ensure the power trace travels from the plane -> through the capacitor pads -> into the IC power pin, never bypassing the capacitor.',
        keyKeywordsToMention: ['Equivalent Series Inductance (ESL)', 'Self-resonant frequency f_res', '0402 (0.4 nH) vs 1206 (1.2 nH)', '1 nH/mm trace loop inductance', 'Via placement adjacent to pads for mutual inductance cancellation']
      }
    ],
    atsResumeBullets: [
      'Designed high-speed 6-layer carrier board in KiCad 8 featuring PCIe Gen 3 differential pairs and Gigabit Ethernet, achieving zero DRC errors and passing 100-ohm impedance validation.',
      'Constructed Power Distribution Network (PDN) decoupling architecture in LTspice, maintaining target impedance < 2.5 mΩ up to 250 MHz under 10A dynamic load steps.',
      'Characterized PCB transmission line return loss (S11 < -18 dB) and high-speed eye diagram (5 Gbps) using Vector Network Analyzer and Time-Domain Reflectometry (TDR).'
    ]
  }
];

import { SubdomainDetail } from '../../types';

export const EMBEDDED_SUBDOMAINS: SubdomainDetail[] = [
  // ==========================================================================
  // 1. EMBEDDED BARE-METAL FIRMWARE & LOW-LEVEL DRIVERS
  // ==========================================================================
  {
    id: 'embedded-baremetal',
    name: 'Embedded Bare-Metal & Firmware Engineering',
    domainId: 'embedded',
    domainName: 'Embedded Systems & Software',
    tagline: 'Zero-OS direct hardware control, register manipulation, peripheral drivers & bootloaders',
    description: 'Direct programming of silicon microcontrollers (ARM Cortex-M, RISC-V RV32) without an operating system layer. Involves memory-mapped I/O, linker scripts, assembly startup, interrupt handlers, and hardware bus protocols.',
    iconName: 'Terminal',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
    relatedTrackIds: ['embedded-c-baremetal', 'computer-arch'],
    relatedEncyclopediaVolumes: ['vol-02', 'vol-03', 'vol-05', 'vol-14'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-firmware-engineer',
        title: 'Embedded Firmware / Low-Level Software Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Writes hardware-interfacing C code on ARM Cortex-M or RISC-V MCUs, implementing register-level drivers (GPIO, UART, SPI, I2C, DMA) and custom bootloaders.',
        salaryIndiaCTC: '₹8 LPA - ₹18 LPA (Tier-1 MNC), ₹4.5 LPA - ₹8.5 LPA (Mid/Services)',
        salaryUSRange: '$105,000 - $145,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['Microcontroller Flash Nodes (40nm - 180nm)', 'Embedded Non-Volatile Memory (eNVM)'],
        typicalInterviewRounds: [
          'Technical Round 1: Embedded C pointers, bit manipulation, volatile keyword, structure packing and alignment',
          'Technical Round 2: Microcontroller architecture, vector tables, interrupt latency, NVIC priority grouping',
          'Technical Round 3: Peripheral protocol timing: SPI modes (CPOL/CPHA), I2C open-drain pullups & clock stretching',
          'Debugging & Bringup: JTAG/SWD, GDB, logic analyzer capture of SPI bus communication'
        ],
        dayInTheLifeSnippet: 'Configuring STM32 or Nordic nRF52 peripherals via direct register manipulation, inspecting logic analyzer traces to debug I2C communication hangs, and optimizing DMA circular buffers.',
        keyResponsibilities: [
          'Develop hardware abstraction layers (HAL) and low-level peripheral drivers in MISRA-compliant C',
          'Configure Direct Memory Access (DMA) controllers for zero-CPU-overhead data streaming',
          'Author flash bootloaders with CRC32 integrity verification and In-Application Programming (IAP)',
          'Debug hard faults and memory alignment faults using JTAG/SWD hardware in-circuit debuggers'
        ],
        primaryDeliverables: [
          'Clean, modular register-level peripheral drivers for SPI, I2C, UART, and ADC peripherals',
          'Fail-safe dual-bank bootloader capable of over-the-air (OTA) firmware updates',
          'Unit-tested C libraries running with zero dynamic memory allocation (`malloc` banned)'
        ],
        interviewTopics: [
          'The `volatile` keyword: preventing aggressive compiler register caching on hardware I/O registers',
          'Interrupt handling: why ISRs must be kept short, non-blocking, and never call printf or mutex waits',
          'Difference between Little-Endian and Big-Endian memory architectures and byte-swapping macros',
          'Direct Memory Access (DMA): circular buffer configuration and half-transfer / transfer-complete interrupts'
        ],
        targetCompanies: ['Texas Instruments', 'Qualcomm', 'Nordic Semiconductor', 'STMicroelectronics', 'NXP', 'Microchip', 'Honeywell', 'Garmin', 'Eaton']
      },
      {
        id: 'job-bsp-engineer',
        title: 'Board Bring-Up & Diagnostics Engineer',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Brings up newly fabricated electronic prototype boards, validates power rails, burns initial bootloaders, and implements manufacturing hardware self-test diagnostic firmware.',
        salaryIndiaCTC: '₹9 LPA - ₹20 LPA',
        salaryUSRange: '$110,000 - $150,000 Base',
        industryDemandLevel: 'High',
        standardProcessNodes: ['Embedded SoCs & System-on-Modules (SoMs)'],
        typicalInterviewRounds: [
          'Technical Round 1: Power-on reset sequencing, crystal oscillator startup, brownout detection',
          'Technical Round 2: Memory testing algorithms (Walking 1s, Walking 0s, March C-) for DDR/SRAM',
          'Technical Round 3: Reading hardware schematics, PCB probing, bus contention resolution',
          'Factory test fixture design and automated production test scripting in Python'
        ],
        dayInTheLifeSnippet: 'Using a digital multimeter and oscilloscope to probe power supply ramp-up on newly assembled prototype boards, soldering JTAG rework wires, and flashing initial startup firmware.',
        keyResponsibilities: [
          'Verify board power sequencing, clock stability, and reset timing against hardware schematics',
          'Implement comprehensive power-on self-test (POST) suites to exercise all on-board ICs',
          'Diagnose cold solder joints, PCB trace shorts, and swapped communication lines',
          'Package factory production test firmware with automated pass/fail reporting'
        ],
        primaryDeliverables: [
          'Hardware bring-up checklist with oscilloscope captures of power and clock stability',
          'Diagnostic test firmware image with interactive UART shell command interface',
          'Automated Python production test scripts for end-of-line assembly flashing'
        ],
        interviewTopics: [
          'How to test an external DDR memory bus for address line shorts vs data line opens',
          'Watchdog Timer (WDT) windowed operation and why kicking the dog from a timer ISR is dangerous',
          'Brownout Reset (BOR) vs Power-On Reset (POR) circuit behavior during supply dips',
          'Interpreting ARM Cortex-M HardFault status registers (HFSR, CFSR, MMFSR, BFSR)'
        ],
        targetCompanies: ['Apple', 'Cisco', 'Qualcomm', 'Intel', 'VVDN Technologies', 'L&T Technology Services', 'Wipro', 'Tata Elxsi']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-embedded-c',
        name: 'Embedded C (MISRA C:2012) & Register-Level Bitwise Operations',
        category: 'Embedded Firmware',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['MISRA C:2012 Guidelines for the Use of the C Language in Critical Systems', 'ISO/IEC 9899:1999'],
        industrialBenchmark: 'Zero undefined behavior, zero dynamic allocations, zero static analysis violations',
        industryRelevance: 'C remains the indisputable king of low-level embedded software, controlling microcontrollers in billions of consumer, medical, and aerospace devices.',
        masteryCriteria: 'Expert use of bitwise masks, clear/set/toggle macros, volatile pointer casting, structure alignment padding rules, bit-fields vs explicit masks, and MISRA-C compliance rules.',
        tools: ['GCC ARM Embedded Toolchain', 'Clang / LLVM', 'Cppcheck', 'PC-lint'],
        practicalProjectEvidence: 'Production-ready register-level driver for an I2C temperature sensor and SPI display with zero third-party library dependencies.'
      },
      {
        id: 'skill-protocols-firmware',
        name: 'Serial Communication Protocols (SPI, I2C, UART, CAN, DMA)',
        category: 'Embedded Firmware',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['NXP I2C Bus Specification Rev 7.0', 'Motorola SPI Specification', 'ISO 11898-1'],
        industrialBenchmark: 'Sustained full-duplex SPI communication at 25 MHz with DMA and zero CPU starvation',
        industryRelevance: 'Peripherals on every embedded PCB communicate via standard serial buses. Deep timing and protocol mastery is essential.',
        masteryCriteria: 'Mastery of SPI clock polarity/phase modes (0, 1, 2, 3), I2C open-drain pullup resistor sizing, START/STOP conditions, ACK/NACK signaling, clock stretching, and CAN bit stuffing.',
        tools: ['Saleae Logic Pro 16', 'Rigol / Keysight Oscilloscopes', 'I2C/SPI Protocol Analyzers'],
        practicalProjectEvidence: 'Full-duplex SPI master driver using DMA double-buffering on an STM32 ARM Cortex-M4 MCU.'
      },
      {
        id: 'skill-linker-scripts',
        name: 'Linker Script Authoring (.ld) & Memory Map Customization',
        category: 'Embedded Firmware',
        proficiencyLevel: 'Advanced Signoff',
        standardsCompliance: ['GNU ld Linker Syntax', 'ELF-32 Specification'],
        industrialBenchmark: 'Exact zero-waste memory partitioning into Flash, SRAM, TCM, and custom bootloader sectors',
        industryRelevance: 'Firmware engineers must explicitly place code and data into specific physical memory regions (Flash, internal SRAM, external PSRAM, tight-coupled memory TCM).',
        masteryCriteria: 'Writing custom GNU linker scripts from scratch: defining MEMORY regions, placing SECTIONS (.text, .rodata, .data, .bss), calculating load-memory-address (LMA) vs virtual-memory-address (VMA), and reserving stack/heap boundaries.',
        tools: ['GNU ld', 'arm-none-eabi-objdump', 'arm-none-eabi-nm', 'arm-none-eabi-readelf'],
        practicalProjectEvidence: 'Custom GNU linker script placing interrupt vectors at Flash start, relocating time-critical DSP functions from Flash into SRAM during boot, and defining stack boundaries.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-volatile-keyword',
        concept: 'The `volatile` Keyword, Memory-Mapped I/O & Compiler Optimization Hazards',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'Modern optimizing compilers (e.g. GCC -O3) assume memory does not change unless explicitly modified by program code. Without volatile, the compiler caches hardware status registers in CPU registers, resulting in infinite loops.',
        deepAnalysisExplanation: 'When code polls a hardware register (e.g., `while (!(UART->SR & TXE));`), the compiler sees that the loop body never modifies `UART->SR`. Without `volatile`, GCC optimizes the read out of the loop, reading the register only once into a general-purpose CPU register and checking that cached value forever (an infinite loop). Marking a pointer `volatile` tells the compiler that the memory location can be modified by external hardware at any time, forcing a fresh load from physical memory on every access.',
        siliconImpact: 'Missing `volatile` qualifiers causes firmware to hang indefinitely or transmit corrupted data when compiled in release mode (-O2/-O3), while passing in debug mode (-O0).',
        mitigationTechniques: ['Always casting hardware peripheral base pointers to `volatile uint32_t *`', 'Using CMSIS predefined `__IO` / `__I` / `__O` macros'],
        keyQuestions: [
          'Why does code work perfectly under `-O0` (debug) but freeze in an infinite loop when compiled with `-O2` or `-O3` if volatile is missing?',
          'Can a variable be both `const` and `volatile` simultaneously in C? (e.g. a read-only hardware status register)?',
          'Why does `volatile` NOT guarantee atomic access or thread-safety on multi-core systems without memory barriers?'
        ],
        whiteboardFormulas: [
          '#define\\text{ }__IO\\text{ }volatile',
          '#define\\text{ }UART_SR\\text{ }(*((volatile uint32_t *) 0x40004400))'
        ],
        interviewEmphasis: 'Asked in virtually 100% of embedded C and firmware interviews worldwide.'
      },
      {
        id: 'know-nvic-interrupts',
        concept: 'Nested Vectored Interrupt Controller (NVIC) Priority Preemption & Tail-Chaining',
        theoryDepth: 'Architectural Concept',
        whyCrucial: 'Real-time embedded systems must respond to external physical events within bounded microsecond deadlines. Understanding interrupt controller hardware is vital for low-latency determinism.',
        deepAnalysisExplanation: 'The ARM Cortex-M Nested Vectored Interrupt Controller (NVIC) provides hardware-managed interrupt prioritization. Preemption priority allows a higher-priority interrupt to interrupt an ongoing lower-priority ISR. Sub-priority resolves priority when two interrupts arrive simultaneously. Crucially, the NVIC implements "Tail-Chaining": when exiting an ISR with another pending, it skips the 12-cycle register pop/push sequence, jumping to the next ISR in just 6 cycles.',
        siliconImpact: 'Improper NVIC priority configuration causes priority inversions, missed deadlines for motor control loops, and stack overflows due to uncontrolled recursive interrupt nesting.',
        mitigationTechniques: ['Proper preemption priority assignment', 'Offloading heavy processing from ISR to main thread or RTOS task via flags', 'Atomic critical sections using PRIMASK or BASEPRI'],
        keyQuestions: [
          'What is the difference between Preemption Priority and Sub-Priority in the ARM Cortex-M NVIC?',
          'What is NVIC Tail-Chaining and how does it reduce interrupt latency when multiple interrupts are pending?',
          'Why is disabling interrupts globally (`__disable_irq()`) dangerous for real-time systems, and how does `BASEPRI` provide a safer alternative?'
        ],
        whiteboardFormulas: [
          '\\text{Tail-Chaining Latency: } 6\\text{ cycles} \\ll 24\\text{ cycles (Standard Return + Entry)}',
          '\\text{Vector Table: 16 Core Exceptions + up to 240 External Hardware IRQs}'
        ],
        interviewEmphasis: 'High-frequency architectural question for ARM Cortex-M firmware roles.'
      }
    ]
  },

  // ==========================================================================
  // 2. EMBEDDED RTOS, LINUX KERNEL, BSP & EDGE COMPUTE
  // ==========================================================================
  {
    id: 'embedded-rtos-linux',
    name: 'Embedded RTOS, Linux Kernel, BSP & Edge Compute',
    domainId: 'embedded',
    domainName: 'Embedded Systems & Software',
    tagline: 'Real-time multi-threading with FreeRTOS, Linux kernel driver development & Edge AI deployment',
    description: 'Operating systems on embedded processors. Spans deterministic hard real-time systems (FreeRTOS, Zephyr OS) to full embedded Linux board support packages (BSP), Yocto builds, Linux device drivers, and TinyML edge inference.',
    iconName: 'Server',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    relatedTrackIds: ['embedded-rtos-linux', 'computer-arch'],
    relatedEncyclopediaVolumes: ['vol-02', 'vol-05', 'vol-08'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-rtos-engineer',
        title: 'Embedded RTOS & Real-Time Systems Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Architects multi-threaded embedded applications using FreeRTOS or Zephyr OS with deterministic scheduling, mutexes, semaphores, and inter-task message queues.',
        salaryIndiaCTC: '₹9 LPA - ₹20 LPA (Tier-1 MNC), ₹5 LPA - ₹10 LPA (Services)',
        salaryUSRange: '$110,000 - $150,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['ARM Cortex-M4/M7/M33', 'RISC-V 32/64-bit MCUs'],
        typicalInterviewRounds: [
          'Technical Round 1: Preemptive vs Cooperative scheduling, context switching overhead, stack allocation',
          'Technical Round 2: Mutex vs Binary Semaphore, Priority Inversion problem and Priority Inheritance solution',
          'Technical Round 3: Deadlock conditions (Coffman conditions), circular waits, lock-free ring buffers',
          'RTOS tracing with Percepio Tracealyzer / Segger SystemView and hard real-time deadline budgeting'
        ],
        dayInTheLifeSnippet: 'Creating FreeRTOS tasks with isolated stack memories, sizing message queues to prevent task blocking, using logic analyzer GPIO toggles to profile task execution latency, and configuring priority inheritance on shared I2C bus mutexes.',
        keyResponsibilities: [
          'Design modular multi-task software architectures with clear task priorities and execution deadlines',
          'Implement inter-task communication using thread-safe queues, semaphores, and direct-to-task notifications',
          'Mitigate concurrency bugs: deadlocks, race conditions, starvation, and priority inversion',
          'Measure and optimize task execution times, context switch latency, and CPU idle percentages'
        ],
        primaryDeliverables: [
          'Deterministic FreeRTOS/Zephyr application image with zero stack overflows and zero unbounded priority inversions',
          'Thread-safe device drivers accessing shared buses via mutual exclusion locks',
          'System trace logs demonstrating all real-time tasks meet their hard deadlines'
        ],
        interviewTopics: [
          'Priority Inversion: how a medium-priority task starves a high-priority task waiting on a low-priority task',
          'Why a Binary Semaphore is NOT the same as a Mutex (ownership concept and priority inheritance)',
          'Stack overflow detection in FreeRTOS (Method 1: checking stack pointer, Method 2: canary pattern checking)',
          'Context switch internals: saving CPU registers (R0-R3, R12, LR, PC, xPSR) to process stack pointer (PSP)'
        ],
        targetCompanies: ['Qualcomm', 'Intel', 'Amazon (Lab126)', 'Apple', 'Schneider Electric', 'Honeywell', 'NXP Semiconductors', 'Bosch']
      },
      {
        id: 'job-linux-bsp-engineer',
        title: 'Embedded Linux BSP & Kernel Driver Engineer',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Ports Linux bootloaders (U-Boot) and kernels to custom ARM/MIPS/RISC-V boards, authors Device Tree files (.dts), and writes character/platform kernel drivers.',
        salaryIndiaCTC: '₹14 LPA - ₹28 LPA (High-Value Specialized Domain)',
        salaryUSRange: '$120,000 - $165,000 Base + RSUs',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['ARM Cortex-A53/A55/A78 Applications Processors (7nm - 28nm)'],
        typicalInterviewRounds: [
          'Technical Round 1: Linux user space vs kernel space, system calls, virtual memory, page tables',
          'Technical Round 2: Device Tree (.dts/.dtsi) node authoring, compatible strings, interrupt bindings',
          'Technical Round 3: Linux driver architecture (file_operations: open, read, write, ioctl, copy_to_user)',
          'Kernel synchronization (Spinlocks vs Mutexes), bottom-half interrupt handling (tasklets, workqueues)'
        ],
        dayInTheLifeSnippet: 'Authoring custom Device Tree nodes for an I2C sensor on an i.MX8 board, writing a Linux platform driver with sysfs attributes, and building custom root filesystems with Yocto BitBake.',
        keyResponsibilities: [
          'Customize and build U-Boot bootloader and Linux kernel for proprietary hardware platforms',
          'Author Device Tree Source files (.dts) accurately mapping memory maps, clocks, and GPIO pins',
          'Develop character, I2C, SPI, and platform device drivers in kernel space',
          'Construct minimal, reproducible Linux distributions using the Yocto Project / Buildroot'
        ],
        primaryDeliverables: [
          'Bootable Linux Board Support Package (BSP) booting from eMMC/SD card to a user-space login prompt',
          'Production-tested kernel driver modules with `/dev` and `/sys` interfaces',
          'Custom Yocto meta-layer containing board configurations, recipes, and rootfs packages'
        ],
        interviewTopics: [
          'How does the Linux kernel match a device driver to hardware using the Device Tree `compatible` string?',
          'Why can a kernel thread NOT sleep inside an interrupt handler or while holding a spinlock?',
          'Difference between `copy_from_user` / `copy_to_user` and raw pointer dereferencing across address spaces',
          'Top-half (hard IRQ) vs Bottom-half (softirq, tasklets, workqueues) interrupt processing split'
        ],
        targetCompanies: ['Qualcomm', 'Texas Instruments', 'NVIDIA', 'Intel', 'Toradex', 'NXP Semiconductors', 'Samsung Electronics', 'VVDN']
      },
      {
        id: 'job-edge-ai-engineer',
        title: 'Embedded Edge AI & TinyML Optimization Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Deploys deep learning models on constrained microcontrollers and edge NPUs with INT8 post-training quantization, pruning, and low-latency C inference.',
        salaryIndiaCTC: '₹12 LPA - ₹25 LPA',
        salaryUSRange: '$115,000 - $160,000 Base',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['Edge AI Processors & Microcontrollers with NPU / DSP Accelerators'],
        typicalInterviewRounds: [
          'Technical Round 1: Neural network architectures (CNN, Depthwise Separable Convolutions, RNN/LSTM)',
          'Technical Round 2: Quantization physics (FP32 to INT8 scale and zero-point conversion, dynamic range loss)',
          'Technical Round 3: Memory budgeting: managing tensor arena in SRAM (<256 KB) vs Flash model storage',
          'ARM CMSIS-NN SIMD optimizations, hardware NPU offload, and accuracy-performance benchmarking'
        ],
        dayInTheLifeSnippet: 'Quantizing a TensorFlow Lite CNN model to INT8, measuring inference latency on an ARM Cortex-M55 using CMSIS-NN kernels, and verifying memory consumption inside the 128KB SRAM tensor arena.',
        keyResponsibilities: [
          'Convert and quantize PyTorch / TensorFlow models into TensorFlow Lite for Microcontrollers (TFLM)',
          'Optimize neural network operations using SIMD instructions (ARM CMSIS-NN, Helium)',
          'Profile inference latency, SRAM activation buffer usage, and energy consumption per inference',
          'Integrate edge inference pipelines with real-time sensor streams (accelerometers, microphones, cameras)'
        ],
        primaryDeliverables: [
          'Optimized INT8 model footprint fitting within target microcontroller flash and SRAM limits',
          'Real-time edge inference engine running at >30 FPS with <50mW power budget',
          'Accuracy vs performance tradeoff Pareto curve documentation'
        ],
        interviewTopics: [
          'Quantization equation: mapping real floating-point values to 8-bit integers ($q = \\text{round}(\\frac{r}{S}) + Z$)',
          'Why Depthwise Separable Convolutions (MobileNet) reduce compute operations by 8-9x compared to standard convolutions',
          'Managing the Tensor Arena: why all memory must be pre-allocated statically in TinyML systems',
          'Zero-copy sensor data pipelining using DMA into neural network input tensors'
        ],
        targetCompanies: ['Qualcomm', 'Arm', 'Apple', 'Google (Embedded AI)', 'NXP Semiconductors', 'Edge Impulse', 'Sony Semiconductor', 'STMicroelectronics']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-freertos-mastery',
        name: 'FreeRTOS Architecture, Task Scheduling & Concurrency Primitives',
        category: 'Embedded Firmware',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['FreeRTOS Coding Standard', 'POSIX PSE51 Subsets'],
        industrialBenchmark: 'Zero deadlock, zero priority inversion, context switch time < 2 microseconds',
        industryRelevance: 'The most widely deployed real-time operating system in the world, running on billions of microcontrollers.',
        masteryCriteria: 'Creating tasks, configuring priority levels, sizing stack depths, using queues for inter-task communication, binary and counting semaphores, mutexes with priority inheritance, software timers, and event groups.',
        tools: ['FreeRTOS Kernel v10+', 'Percepio Tracealyzer', 'Segger SystemView'],
        practicalProjectEvidence: 'Designed a multi-tasking data logger with 4 FreeRTOS tasks (Sensor Read, Processing, Flash Write, BLE Telemetry) communicating via queues.'
      },
      {
        id: 'skill-linux-kernel-drivers',
        name: 'Linux Kernel Platform & Character Device Driver Development',
        category: 'Embedded Firmware',
        proficiencyLevel: 'Advanced Signoff',
        standardsCompliance: ['Linux Kernel Coding Style', 'POSIX.1-2017'],
        industrialBenchmark: 'Driver handles 100k interrupts/sec without dropped packets or kernel memory leaks',
        industryRelevance: 'Essential skill for all high-end embedded systems: smartphones, automotive infotainment, robotics, routers, and IoT gateways.',
        masteryCriteria: 'Writing kernel modules (`module_init`, `module_exit`), implementing the `file_operations` struct, allocating device major/minor numbers, handling hardware interrupts with request_irq, and managing memory with kmalloc and vmalloc.',
        tools: ['Linux Kernel 6.x', 'QEMU ARM', 'GDB Kernel Debugging (KGDB)', 'Buildroot'],
        practicalProjectEvidence: 'Authored an out-of-tree Linux kernel driver for an SPI accelerometer exposing raw data via sysfs attributes and pollable character device nodes.'
      },
      {
        id: 'skill-yocto-buildroot',
        name: 'Embedded Linux System Building (Yocto Project & Buildroot)',
        category: 'EDA Scripting',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['OpenEmbedded Layer Index Standards', 'Yocto Project Reference Manual'],
        industrialBenchmark: 'Reproducible, deterministic image build from source in <45 minutes with full license compliance',
        industryRelevance: 'Commercial embedded Linux products do not use generic Ubuntu or Debian; they construct custom minimal Linux distributions using Yocto or Buildroot.',
        masteryCriteria: 'Writing BitBake recipes (.bb), configuring machine files, authoring custom meta-layers, modifying device trees in the kernel recipe, and managing package dependencies.',
        tools: ['Yocto Project (Kirkstone / Scarthgap)', 'BitBake', 'Buildroot', 'OpenEmbedded'],
        practicalProjectEvidence: 'Built a customized minimal embedded Linux distribution for a Raspberry Pi / BeagleBone using Yocto with a custom lightweight application running at startup.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-priority-inversion',
        concept: 'Priority Inversion, Deadlocks & Priority Inheritance Protocol',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'Priority inversion was the infamous bug that nearly doomed the NASA Mars Pathfinder spacecraft in 1997. It occurs when a high-priority task is indefinitely blocked by a low-priority task due to intermediate-priority preemption.',
        deepAnalysisExplanation: 'Consider 3 tasks: High (H), Medium (M), and Low (L). L acquires a shared mutex. H wakes up, preempts L, and attempts to acquire the mutex; H blocks. Now M wakes up and preempts L because M has higher priority than L. Because M does not need the mutex, M runs to completion while L cannot run to release the mutex. Result: M indefinitely delays H, even though H has higher priority than M! The solution is the Priority Inheritance Protocol: when H blocks on a mutex held by L, L temporarily inherits H\'s high priority, allowing L to run immediately, release the mutex, and hand execution back to H.',
        siliconImpact: 'Unbounded priority inversion results in hard real-time deadline misses, watchdog timer timeouts, and catastrophic system resets.',
        mitigationTechniques: ['Priority Inheritance Protocol on all shared mutexes', 'Priority Ceiling Protocol', 'Lock-free single-producer single-consumer ring buffers'],
        keyQuestions: [
          'How did the Mars Pathfinder mission recover from priority inversion using a software patch sent from Earth?',
          'Why can a Binary Semaphore NOT implement Priority Inheritance, and why MUST a Mutex be used instead?',
          'What are the 4 Coffman conditions required for a system deadlock to occur?'
        ],
        whiteboardFormulas: [
          '\\text{Inherited Priority: } Priority(L) \\leftarrow \\max(Priority(L), Priority(H))',
          '\\text{Coffman Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait}'
        ],
        interviewEmphasis: 'Asked in virtually every real-time systems and RTOS interview worldwide.'
      },
      {
        id: 'know-virtual-memory-mmu',
        concept: 'Virtual Memory, Multi-Level Page Tables & MMU Address Translation',
        theoryDepth: 'Architectural Concept',
        whyCrucial: 'Virtual memory isolates user processes from each other and protects the operating system kernel from malicious or buggy user code. It forms the security and memory architecture of modern computing.',
        deepAnalysisExplanation: 'The CPU generates Virtual Addresses (VA). The Memory Management Unit (MMU) translates the VA to a Physical Address (PA) using multi-level page tables stored in RAM. In ARM64 (48-bit VA, 4KB page size), translation traverses a 4-level table (L0 -> L1 -> L2 -> L3). Because traversing 4 levels of memory tables for every memory access would slow down the CPU by 400%, the Translation Lookaside Buffer (TLB) caches recent translations. A TLB hit resolves the translation in 1 clock cycle; a TLB miss forces a costly hardware table walk.',
        siliconImpact: 'Every process operates in its own independent 64-bit address space. A null pointer dereference in user space causes a clean segmentation fault (SIGSEGV) without crashing the kernel.',
        mitigationTechniques: ['Translation Lookaside Buffer (TLB) caching', 'Huge pages (2MB / 1GB) to reduce TLB miss rates for memory-intensive workloads'],
        keyQuestions: [
          'Walk through the cycle-by-cycle process when a virtual address lookup causes a TLB miss.',
          'What is a Page Fault and why does Linux allocate physical RAM lazily on first write (demand paging) rather than at `malloc()` time?',
          'Why does context switching between two user processes require flushing or tagging the TLB with an Address Space Identifier (ASID)?'
        ],
        whiteboardFormulas: [
          '\\text{Virtual Address: } [\\text{Page Table Index}] \\parallel [\\text{Page Offset}]',
          '\\text{Physical Address: } [\\text{Physical Frame Number (PFN)}] \\parallel [\\text{Page Offset}]',
          '\\text{Effective Memory Access Time: } EMAT = Hit_{TLB} \\cdot T_{TLB} + (1 - Hit_{TLB}) \\cdot (T_{walk} + T_{RAM})'
        ],
        interviewEmphasis: 'Universal question for Embedded Linux, SoC systems, and OS kernel interviews.'
      }
    ]
  },

  // ==========================================================================
  // 3. AUTOMOTIVE EMBEDDED, AUTOSAR & FUNCTIONAL SAFETY (ASIL-D)
  // ==========================================================================
  {
    id: 'embedded-automotive-safety',
    name: 'Automotive Systems, AUTOSAR & Functional Safety (ASIL-D)',
    domainId: 'embedded',
    domainName: 'Embedded Systems & Software',
    tagline: 'Mission-critical automotive ECUs, AUTOSAR BSW/MCAL stacks, ISO 26262 ASIL-D & CAN-FD networking',
    description: 'Mission-critical software engineering for modern connected vehicles, autonomous driving (ADAS), battery management systems (BMS), and powertrain. Enforces ISO 26262 ASIL-D safety requirements, AUTOSAR Classic/Adaptive architectures, and CAN-FD/FlexRay bus protocols.',
    iconName: 'ShieldAlert',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    relatedTrackIds: ['embedded-c-baremetal', 'embedded-rtos-linux'],
    relatedEncyclopediaVolumes: ['vol-02', 'vol-05', 'vol-14'],
    
    // --- 1. CLASSIFICATION BASED ON JOBS ---
    jobs: [
      {
        id: 'job-autosar-software-engineer',
        title: 'AUTOSAR BSW & MCAL Integration Engineer',
        experienceTier: 'Entry / Intern',
        description: 'Configures and integrates AUTOSAR Classic Base Software (BSW) stacks, Microcontroller Abstraction Layers (MCAL), and Runtime Environment (RTE) using Vector DaVinci or EB Tresos.',
        salaryIndiaCTC: '₹10 LPA - ₹22 LPA (High Demand in Automotive R&D)',
        salaryUSRange: '$115,000 - $155,000 Base',
        industryDemandLevel: 'Surging',
        standardProcessNodes: ['Automotive Grade Microcontrollers (Infineon AURIX TC3xx/TC4xx, NXP S32K/S32G, TI Jacinto)'],
        typicalInterviewRounds: [
          'Technical Round 1: AUTOSAR layered architecture (Application, RTE, BSW, MCAL, Hardware)',
          'Technical Round 2: AUTOSAR Communication Stack (Com, PduR, CanIf, CanDrv, CanSM)',
          'Technical Round 3: Diagnostic Stack (DCM, DEM, FIM) and UDS ISO 14229 diagnostic services',
          'Toolchain configuration in Vector DaVinci Developer/Configurator and ARXML modeling'
        ],
        dayInTheLifeSnippet: 'Configuring AUTOSAR Communication and Diagnostic stacks in Vector DaVinci Configurator, generating RTE contract headers, and debugging CAN-FD bus communication using Vector CANoe.',
        keyResponsibilities: [
          'Configure AUTOSAR Classic Base Software (BSW) modules: Comm stack, Memory stack (Fee/Fls), Diagnostic stack',
          'Integrate Microcontroller Abstraction Layer (MCAL) drivers for SPI, PWM, ADC, and CAN-FD',
          'Generate and debug Runtime Environment (RTE) glue-code between Software Components (SWC) and BSW',
          'Perform in-vehicle and Hardware-in-the-Loop (HIL) testing using Vector CANoe and CANalyzer'
        ],
        primaryDeliverables: [
          'Valid ARXML system description files and configured BSW stack source code',
          'RTE contract and implementation headers mapping SWC client-server and sender-receiver ports',
          'HIL test verification logs showing 100% compliance with OEM diagnostic specifications'
        ],
        interviewTopics: [
          'Explain the complete data flow of a CAN message from hardware reception through MCAL, CanIf, PduR, Com, and RTE to SWC',
          'Difference between Sender-Receiver (data) and Client-Server (function call) RTE communication interfaces',
          'AUTOSAR Memory Stack: Non-Volatile Memory Manager (NvM), Memory Abstraction Interface (MemIf), Flash EEPROM Emulation (Fee)',
          'Difference between AUTOSAR Classic (Osek OS, static allocation) and AUTOSAR Adaptive (POSIX, C++, dynamic service-oriented)'
        ],
        targetCompanies: ['Bosch', 'Continental', 'Vector Informatik', 'KPIT Technologies', 'Tata Elxsi', 'Mercedes-Benz R&D', 'ZF Group', 'NXP Semiconductors']
      },
      {
        id: 'job-functional-safety-engineer',
        title: 'Functional Safety (ISO 26262 ASIL-D) Specialist',
        experienceTier: 'Junior (1-3 Yrs)',
        description: 'Designs fail-operational and fail-safe safety architectures, executes FMEDA / HARA hazard analyses, and verifies ASIL-D safety metrics for automotive chips and software.',
        salaryIndiaCTC: '₹14 LPA - ₹28 LPA (Elite Specialized Role)',
        salaryUSRange: '$125,000 - $170,000 Base',
        industryDemandLevel: 'Very High',
        standardProcessNodes: ['Automotive Silicon (AEC-Q100 Grade 0/1, -40°C to +150°C)'],
        typicalInterviewRounds: [
          'Technical Round 1: ISO 26262 lifecycle, V-model, Hazard Analysis and Risk Assessment (HARA)',
          'Technical Round 2: ASIL determination (Severity, Exposure, Controllability) from QM to ASIL-D',
          'Technical Round 3: Hardware metrics: Single Point Fault Metric (SPFM >= 99%), Latent Fault Metric (LFM >= 90%), PMHF',
          'Safety mechanisms: Dual-Core Lockstep (DCLS), Memory BIST, Watchdog supervisors, Freedom from Interference (FFI)'
        ],
        dayInTheLifeSnippet: 'Conducting FMEDA spreadsheets to calculate failure rates in FITs (Failures In Time), verifying memory partitioning between ASIL-D and QM tasks via MPU, and designing fault injection tests.',
        keyResponsibilities: [
          'Lead Hazard Analysis and Risk Assessment (HARA) and establish Safety Goals and Functional Safety Requirements (FSR)',
          'Perform Failure Modes, Effects, and Diagnostic Analysis (FMEDA) calculating hardware safety metrics (SPFM, LFM, PMHF)',
          'Ensure Freedom from Interference (FFI) between mixed-criticality software tasks using hardware MPUs',
          'Validate safety mechanisms (ECC memory, clock monitors, voltage supervisors, lockstep cores) via fault injection'
        ],
        primaryDeliverables: [
          'ISO 26262 Safety Case documentation proving ASIL-D compliance for audit',
          'Quantified FMEDA report proving SPFM >= 99% and PMHF < 10 FITs',
          'Fault Injection Test (FIT) reports demonstrating detection and mitigation within Fault Tolerant Time Interval (FTTI)'
        ],
        interviewTopics: [
          'How is an ASIL rating derived from Severity (S0-S3), Exposure (E0-E4), and Controllability (C0-C3)?',
          'What is a Dual-Core Lockstep (DCLS) architecture and how does it detect transient single-event upsets (SEU)?',
          'What is the Fault Tolerant Time Interval (FTTI) and why must a safety mechanism act before FTTI expires?',
          'How does a Memory Protection Unit (MPU) guarantee Freedom From Interference (FFI) between ASIL-D and QM software?'
        ],
        targetCompanies: ['Infineon Technologies', 'Texas Instruments', 'NXP', 'Aptiv', 'Tesla', 'Mobileye', 'Qualcomm (Automotive)', 'DENSO']
      }
    ],

    // --- 2. CLASSIFICATION BASED ON SKILLS ---
    skills: [
      {
        id: 'skill-autosar-davinci',
        name: 'AUTOSAR Classic BSW Configuration (Vector DaVinci / EB Tresos)',
        category: 'Automotive & Safety',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['AUTOSAR Classic Release 4.4 / R20-11', 'ISO 26262-6'],
        industrialBenchmark: '100% compliant ARXML generation and zero diagnostic communication dropped frames',
        industryRelevance: 'The standardized software architecture for virtually all Tier-1 automotive ECUs across Mercedes, BMW, Volkswagen, Ford, and GM.',
        masteryCriteria: 'Configuring BSW modules (EcuM, BswM, Com, PduR, CanIf, Dem, Dcm), generating RTE interfaces, configuring Task schedules in the AUTOSAR OS, and validating ARXML descriptions.',
        tools: ['Vector DaVinci Configurator / Developer', 'Elektrobit EB Tresos', 'ETAS ISOLAR'],
        practicalProjectEvidence: 'Configured a complete AUTOSAR Classic CAN communication and diagnostic stack for an electric vehicle Body Control Module (BCM).'
      },
      {
        id: 'skill-vector-canoe-capl',
        name: 'In-Vehicle Network Simulation with Vector CANoe & CAPL',
        category: 'Automotive & Safety',
        proficiencyLevel: 'Core Industrial',
        standardsCompliance: ['ISO 11898-1/2 (CAN / CAN-FD)', 'ISO 14229 (UDS Diagnostics)'],
        industrialBenchmark: 'Full network simulation with 32 virtual ECU nodes running automated CAPL regression tests',
        industryRelevance: 'Vector CANoe is the undisputed worldwide standard tool for automotive network development, simulation, and automated ECU testing.',
        masteryCriteria: 'Creating simulated network nodes in CANoe, writing Communication Access Programming Language (CAPL) test scripts, sending diagnostic requests via UDS, and logging CAN/LIN/Ethernet traffic.',
        tools: ['Vector CANoe', 'Vector CANalyzer', 'Vector VN1630 / VN1640 Network Interfaces'],
        practicalProjectEvidence: 'Developed an automated CAPL test suite in CANoe verifying UDS diagnostic session transitions and DTC fault memory storage.'
      },
      {
        id: 'skill-iso26262-safety',
        name: 'ISO 26262 ASIL-D Safety Architecture & FMEDA Calculation',
        category: 'Automotive & Safety',
        proficiencyLevel: 'Advanced Signoff',
        standardsCompliance: ['ISO 26262:2018 Parts 1-12 (Road Vehicles - Functional Safety)'],
        industrialBenchmark: 'Hardware architectural metrics SPFM >= 99%, LFM >= 90%, PMHF < 10 FIT',
        industryRelevance: 'Automotive electronics cannot be sold without ISO 26262 compliance. Certified functional safety engineers are among the most sought-after experts.',
        masteryCriteria: 'Executing Hazard Analysis and Risk Assessment (HARA), calculating Single Point Fault Metric (SPFM) and Latent Fault Metric (LFM), designing hardware safety mechanisms, and documenting Safety Cases.',
        tools: ['Ansys medini analyze', 'FMEDA Excel Models', 'Fault Tree Analysis (FTA) Tools'],
        practicalProjectEvidence: 'Completed a full FMEDA and Safety Concept for an ASIL-D Brake-by-Wire electric vehicle actuator system.'
      }
    ],

    // --- 3. CLASSIFICATION BASED ON KNOWLEDGE ---
    knowledge: [
      {
        id: 'know-lockstep-safety',
        concept: 'Dual-Core Lockstep (DCLS) Hardware Architecture & Sphere of Replication',
        theoryDepth: 'Architectural Concept',
        whyCrucial: 'Cosmic radiation and thermal noise cause soft errors (Single-Event Upsets, SEU) that flip bits in CPU registers. In an autonomous vehicle steering or braking ECU, an undetected bit-flip could cause fatal accidents.',
        deepAnalysisExplanation: 'Dual-Core Lockstep (DCLS) runs two identical physical CPU cores executing the exact same instruction stream cycle-by-cycle. A hardware comparator monitors the outputs of both cores. If a discrepancy occurs, an unmaskable safety fault is triggered in hardware within 1 clock cycle. To prevent a common-mode clock or voltage fault from corrupting both cores identically, the checker core runs delayed by a fixed stagger delay (e.g. 2 clock cycles) with physical spatial separation and inverted logic.',
        siliconImpact: 'Achieves a Diagnostic Coverage (DC) greater than 99%, satisfying the stringent requirements of ISO 26262 ASIL-D.',
        mitigationTechniques: ['Temporal diversity (stagger delay)', 'Spatial separation of physical core layouts on silicon', 'Redundant comparators with self-test logic'],
        keyQuestions: [
          'Why does running the secondary checker core with a 2-cycle stagger delay prevent common-mode electrical noise from bypassing the comparator?',
          'What is the Sphere of Replication in a lockstep processor, and why are memories protected by ECC rather than duplicated?',
          'What is the difference between Fail-Safe (safe shutdown) and Fail-Operational (continued operation at reduced capacity)?'
        ],
        whiteboardFormulas: [
          'SPFM = 1 - \\frac{\\sum (\\lambda_{SPF} + \\lambda_{RF})}{\\sum \\lambda} \\ge 99\\% \\quad [\\text{ASIL-D Single-Point Fault Metric}]',
          'LFM = 1 - \\frac{\\sum \\lambda_{MPF,latent}}{\\sum (\\lambda - \\lambda_{SPF} - \\lambda_{RF})} \\ge 90\\% \\quad [\\text{Latent Fault Metric}]'
        ],
        interviewEmphasis: 'Cornerstone interview question for automotive safety and microprocessor hardware teams (TI, Infineon, NXP).'
      },
      {
        id: 'know-canfd-bit-timing',
        concept: 'CAN-FD Bit Timing, Dual Baud Rates & Propagation Delay Arbitration Physics',
        theoryDepth: 'Theoretical Foundation',
        whyCrucial: 'Classical CAN is limited to 1 Mbps and 8-byte payloads. CAN-FD increases payload to 64 bytes and speeds up to 5-8 Mbps during the data phase, while maintaining lossless bitwise arbitration during the nominal phase.',
        deepAnalysisExplanation: 'In CAN-FD, the arbitration phase operates at a lower nominal bitrate (typically 500 kbps) where every bit must propagate across the entire physical length of the vehicle harness and back to resolve arbitration (dominant 0 overwrites recessive 1). Once a node wins arbitration, the Bit Rate Switch (BRS) bit toggles the clock divider to the high-speed data phase (typically 2-5 Mbps). In the data phase, only the transmitter is driving, so propagation round-trip is not required, but Transmitter Delay Compensation (TDC) is needed to sample the received loopback bit accurately.',
        siliconImpact: 'Incorrect bit timing configuration causes bit stuffing errors, form errors, and bus-off state transitions where the ECU disconnects itself from the vehicle network.',
        mitigationTechniques: ['Configuring Synchronization Jump Width (SJW) to absorb oscillator drift', 'Transmitter Delay Compensation (TDC) in data phase', '120-ohm split termination resistors at bus ends'],
        keyQuestions: [
          'Why is the arbitration phase of CAN-FD physically limited in speed by the speed of light and harness length ($t_{prop}$), while the data phase is not?',
          'What is Transmitter Delay Compensation (TDC) and why is it mandatory when the data phase bit time is shorter than the transceiver loop delay?',
          'What is the Error Passive and Bus-Off state recovery algorithm in CAN controllers?'
        ],
        whiteboardFormulas: [
          't_{bit} = t_{Sync\\_Seg} + t_{Prop\\_Seg} + t_{Phase\\_Seg1} + t_{Phase\\_Seg2}',
          't_{prop\\_roundtrip} = 2 \\cdot (t_{transceiver} + t_{wire} \\cdot L) \\le t_{Prop\\_Seg}'
        ],
        interviewEmphasis: 'Primary screening topic in automotive networking, in-vehicle communications, and ECU firmware interviews.'
      }
    ]
  }
];

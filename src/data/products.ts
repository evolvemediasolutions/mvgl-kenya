import { fetchFromStrapi, getStrapiMediaUrl, extractStrapiText } from '../services/strapi'

export interface Product {
  id: string
  slug: string
  title: string
  tag: string
  category: string
  partner: string
  partnerSlug: string
  solution: string
  shortDescription: string
  detailedDescription?: string
  specs: string
  exploreUrl?: string
  image: string
  images?: string[]
  brochure?: string
  isFeatured?: boolean
}

export const fallbackProducts: Product[] = [
  {
    "id": "rockwell-automation-1",
    "slug": "programmable-controllers",
    "title": "Programmable Controllers",
    "tag": "ROCKWELL AUTOMATION",
    "category": "controllers",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "High-performance programmable automation controllers (ControlLogix & CompactLogix) engineered for mission-critical industrial logic, motion, safety, and process automation.",
    "specs": "ControlLogix & CompactLogix | Scalable PAC Architecture",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Programmable Controllers.jpg"
  },
  {
    "id": "rockwell-automation-2",
    "slug": "rtu-controllers",
    "title": "RTU Controllers",
    "tag": "ROCKWELL AUTOMATION",
    "category": "controllers",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "Modular Remote Terminal Units engineered for harsh, remote pipeline and wellhead installations with ultra-low power consumption and wide temperature tolerance.",
    "specs": "Remote Telemetry | Solar & Wide Temp Tolerant",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/RTU Controllers.png"
  },
  {
    "id": "rockwell-automation-3",
    "slug": "i-o-modules",
    "title": "(I/O) Modules",
    "tag": "ROCKWELL AUTOMATION",
    "category": "controllers",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "Comprehensive distributed and chassis-based I/O solutions providing modular flexibility, high-speed digital/analog processing, and integrated functional safety.",
    "specs": "Distributed & Chassis I/O | Hot Swappable (RIUP)",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/IO Modules.png"
  },
  {
    "id": "rockwell-automation-4",
    "slug": "variable-frequency-drives",
    "title": "Variable Frequency Drives",
    "tag": "ROCKWELL AUTOMATION",
    "category": "drives",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "World-class PowerFlex AC and DC drives designed for precision motor speed control, significant energy savings, and seamless industrial integration.",
    "specs": "PowerFlex Family | Low & Medium Voltage Control",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Variable Frequency Drives.png"
  },
  {
    "id": "rockwell-automation-5",
    "slug": "motor-controllers",
    "title": "Motor Controllers",
    "tag": "ROCKWELL AUTOMATION",
    "category": "drives",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "Intelligent solid-state soft starters, electronic overload relays, and contactors providing superior motor protection and advanced diagnostics.",
    "specs": "Solid-State Soft Starters | Smart Overload Protection",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Industrial Network Solutions.png"
  },
  {
    "id": "rockwell-automation-7",
    "slug": "condition-monitoring",
    "title": "Condition Monitoring",
    "tag": "ROCKWELL AUTOMATION",
    "category": "networking",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "Real-time vibration sensors and dynamic measurement modules safeguarding critical rotating equipment to prevent unplanned machinery failure.",
    "specs": "Dynamic Vibration Monitoring | Predictive Machinery Health",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Condition Monitoring.png"
  },
  {
    "id": "rockwell-automation-8",
    "slug": "industrial-computers-and-monitors",
    "title": "Industrial Computers and Monitors",
    "tag": "ROCKWELL AUTOMATION",
    "category": "networking",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "Ruggedized industrial PCs, sunlight-readable touch displays, and operator workstations engineered to endure heavy industrial environments.",
    "specs": "Extreme Industrial Rated | Sunlight Readable Touch",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Industrial Computers and Monitors.png"
  },
  {
    "id": "rockwell-automation-9",
    "slug": "circuit-and-load-protection",
    "title": "Circuit and Load Protection",
    "tag": "ROCKWELL AUTOMATION",
    "category": "protection",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "Modular miniature circuit breakers, electronic circuit protectors, and residual current devices preventing electrical overloads and short circuits.",
    "specs": "Modular DIN Rail Mount | High Fault Current Rating",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Circuit and Load Protection.png"
  },
  {
    "id": "rockwell-automation-10",
    "slug": "relays-and-timers",
    "title": "Relays and Timers",
    "tag": "ROCKWELL AUTOMATION",
    "category": "protection",
    "partner": "Rockwell Automation",
    "partnerSlug": "rockwell-automation",
    "solution": "Automation & Control",
    "shortDescription": "General-purpose, timing, safety, and solid-state relays built for high duty-cycle longevity and precision switching in critical industrial control circuits.",
    "specs": "General & Safety Relays | High Switching Reliability",
    "image": "/AUTOMATION CONTROL/ROCKWELL AUTOMATION/Relays and Timers.png"
  },
  {
    "id": "spp-pumps-1",
    "slug": "packaged-fire-sets",
    "title": "Packaged Fire Sets",
    "tag": "SPP PUMPS",
    "category": "packaged-sets",
    "partner": "SPP Pumps",
    "partnerSlug": "spp-pumps",
    "solution": "Fire Pump Solutions",
    "shortDescription": "Engineered skid-mounted fire pump packages integrating electric and diesel drivers, jockey pumps, and auto-transfer switchgear for rapid, fully tested site integration.",
    "specs": "Skid-Mounted | Dual Driver Redundancy | NFPA 20, UL Listed & FM Approved",
    "image": "/PRODUCTS/SPP PUMPS/PACKAGED FIRE SETS.jpg"
  },
  {
    "id": "spp-pumps-2",
    "slug": "pre-packaged-pump-houses",
    "title": "Pre-Packaged Pump Houses",
    "tag": "SPP PUMPS",
    "category": "pump-houses",
    "partner": "SPP Pumps",
    "partnerSlug": "spp-pumps",
    "solution": "Fire Pump Solutions",
    "shortDescription": "Fully enclosed, weatherproof turnkey pump houses pre-fitted with internal piping, power, ventilation, lighting, and advanced deluge control systems.",
    "specs": "Factory Assembled & Tested | Drop-In-Place Installation | ISO Container Standard",
    "image": "/PRODUCTS/SPP PUMPS/PRE-PACKAGED PUMP HOUSES.jpg"
  },
  {
    "id": "kirloskar-pneumatic-1",
    "slug": "oil-injected-electric-screw-compressor",
    "title": "Oil Injected Electric Screw Compressor",
    "tag": "KIRLOSKAR PNEUMATIC",
    "category": "screw",
    "partner": "Kirloskar Pneumatic",
    "partnerSlug": "kirloskar-pneumatic",
    "solution": "Air & Gas Solutions",
    "shortDescription": "Kirloskar Pneumatic offers a comprehensive range of oil-injected electric screw air compressors that include fixed-speed models and those powered by variable frequency drive technology. Designed to withstand hard conditions, these screw compressors deliver unparalleled performance across applications.",
    "specs": "Capacity: 22 to 1047 cfm | Pressure Range: 7.5 to 13 kg/cm²",
    "image": "/AIR & GAS SOLUTIONS/Oil Injected Electric Screw Compressor.png"
  },
  {
    "id": "kirloskar-pneumatic-2",
    "slug": "diesel-engine-driven-portable-screw-compressor",
    "title": "Diesel Engine Driven Portable Screw Compressor",
    "tag": "KIRLOSKAR PNEUMATIC",
    "category": "screw",
    "partner": "Kirloskar Pneumatic",
    "partnerSlug": "kirloskar-pneumatic",
    "solution": "Air & Gas Solutions",
    "shortDescription": "We have set a new standard with our KRAMIS-portable compressors, engineered for exceptional durability and efficiency. Built to withstand the toughest challenges of demanding work environments, these compressors offer superior performance, ensure reliability and durability as well as high-power output even in the most remote locations.",
    "specs": "Capacity: 5.1 to 17 m³/min | Pressure: 7 to 14 kg/cm²",
    "image": "/AIR & GAS SOLUTIONS/Diesel Engine Driven Portable Screw Compressor.png"
  },
  {
    "id": "kirloskar-pneumatic-3",
    "slug": "reciprocating-horizontal-balanced-opposed-air-compressor",
    "title": "Reciprocating Horizontal Balanced Opposed Air Compressor",
    "tag": "KIRLOSKAR PNEUMATIC",
    "category": "reciprocating",
    "partner": "Kirloskar Pneumatic",
    "partnerSlug": "kirloskar-pneumatic",
    "solution": "Air & Gas Solutions",
    "shortDescription": "Engineered for precision and efficiency, our reciprocating horizontal balanced opposed air compressors offer reliable performance in a variety of industrial applications. Designed to minimise power consumption and maintain low operating temperatures, these compressors ensure consistent and effective operation.",
    "specs": "Capacity: 32 to 4200 cfm | Pressure: 1 to 400 kg/cm² (g)",
    "image": "/AIR & GAS SOLUTIONS/Reciprocating Horizontal Balanced Opposed Air Compressor.png"
  },
  {
    "id": "kirloskar-pneumatic-4",
    "slug": "reciprocating-gas-compressor",
    "title": "Reciprocating Gas Compressor",
    "tag": "KIRLOSKAR PNEUMATIC",
    "category": "reciprocating",
    "partner": "Kirloskar Pneumatic",
    "partnerSlug": "kirloskar-pneumatic",
    "solution": "Air & Gas Solutions",
    "shortDescription": "Our reciprocating gas compressors are built to handle the demanding needs of gas compression with exceptional reliability. These compressors deliver stable performance while maintaining efficiency across various pressures and capacities, making them ideal for a range of gas handling applications.",
    "specs": "Capacity: Up to 11,000 m³/hr | Pressure: Up to 400 kg/cm² (g)",
    "image": "/AIR & GAS SOLUTIONS/Reciprocating Gas Compressor.png"
  },
  {
    "id": "kirloskar-pneumatic-5",
    "slug": "reciprocating-gas-compressor-packages",
    "title": "Reciprocating Gas Compressor Packages",
    "tag": "KIRLOSKAR PNEUMATIC",
    "category": "packages",
    "partner": "Kirloskar Pneumatic",
    "partnerSlug": "kirloskar-pneumatic",
    "solution": "Air & Gas Solutions",
    "shortDescription": "Our ISO 13631 reciprocating gas compression packages are designed to deliver reliable, high-performance solutions for a wide range of upstream, midstream and downstream applications. Built for durability and efficiency, these systems ensure optimal gas compression, even in challenging conditions of the Oil & gas industry.",
    "specs": "Pressure Range: 1 to 580 bar | Gas Flow: 50 to 6000 CFM",
    "image": "/AIR & GAS SOLUTIONS/Reciprocating Gas Compressor Packages.png"
  },
  {
    "id": "kirloskar-pneumatic-6",
    "slug": "screw-compressor-packages",
    "title": "Screw Compressor Packages",
    "tag": "KIRLOSKAR PNEUMATIC",
    "category": "packages",
    "partner": "Kirloskar Pneumatic",
    "partnerSlug": "kirloskar-pneumatic",
    "solution": "Air & Gas Solutions",
    "shortDescription": "Engineered high-efficiency screw compressor packages built for heavy-duty process air and gas systems in industrial refineries, chemical plants, and manufacturing sites.",
    "specs": "Custom engineered API compliant skid packages",
    "image": "/AIR & GAS SOLUTIONS/Screw Compressor Packages.png"
  },
  {
    "id": "kirloskar-chillers-1",
    "slug": "turbolev-kcm",
    "title": "TURBOLEV - KCM",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "centrifugal-chillers",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "Kirloskar TURBOLEV® series of chillers uses the principle of magnetic levitation on application of an electric field, adapted to suit the chiller application.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/TURBOLEV  - KCM.jpg"
  },
  {
    "id": "kirloskar-chillers-2",
    "slug": "turbolev-ksm-kdm",
    "title": "TURBOLEV - KSM / KDM",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "centrifugal-chillers",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "Kirloskar TURBOLEV® series of chillers uses the principle of magnetic levitation on application of an electric field, adapted to suit the chiller application.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/TURBOLEV - KSM - KDM.png"
  },
  {
    "id": "kirloskar-chillers-3",
    "slug": "water-cooled-screw-chiller",
    "title": "WATER COOLED SCREW CHILLER",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "screw-chillers",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "The PRODIGY® Series® Screw Chillers are manufactured at our state-of-the-art manufacturing facility which ensures product of world class quality. Water cooled screw chillers are certified under AHRI 500/590 certification program.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/Water Cooled Screw Chiller.jpg"
  },
  {
    "id": "kirloskar-chillers-4",
    "slug": "air-cooled-screw-chiller",
    "title": "AIR COOLED SCREW CHILLER",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "screw-chillers",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "The PRODIGY® Series® Screw Chillers are manufactured at our state-of-the-art manufacturing facility which ensures product of world class quality. Air cooled screw chillers are certified under AHRI 500/590 certification program.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/Air Cooled Screw Chiller.png"
  },
  {
    "id": "kirloskar-chillers-5",
    "slug": "data-center-chillers",
    "title": "DATA CENTER CHILLERS",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "mission-critical",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "The Kirloskar Data Centre Chiller range is engineered to provide 24x7 reliability and energy efficiency to safeguard your critical IT infrastructure and ensure maximum uptime. Specifically designed to deliver high leaving chilled water temperatures from 16 to 23 deg. C as per DC requirements, with 6 to 10 deg. C temperature difference.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/DATA CENTER CHILLERS.png"
  },
  {
    "id": "kirloskar-chillers-6",
    "slug": "air-to-water-industrial-heat-pumps",
    "title": "Air-to-Water Industrial Heat Pumps",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "heat-pumps",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "Eco-friendly heat pumps extracting ambient thermal energy to produce sanitary and process hot water up to 80°C with significant reduction in carbon footprint.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/Air to Water Heat Pumps.jpg"
  },
  {
    "id": "kirloskar-chillers-7",
    "slug": "water-to-water-heat-recovery-heat-pumps",
    "title": "Water-to-Water Heat Recovery Heat Pumps",
    "tag": "KIRLOSKAR CHILLERS",
    "category": "heat-pumps",
    "partner": "Kirloskar Chillers",
    "partnerSlug": "kirloskar-chillers",
    "solution": "Refrigeration & HVAC Solutions",
    "shortDescription": "Simultaneous heating and cooling heat pumps recovering waste heat from condenser loops to provide energy-neutral process hot water and chilled water.",
    "specs": "",
    "image": "/PRODUCTS/KIRLOSKAR CHILLERS/Water to Water Heat Pumps.jpg"
  },
  {
    "id": "hms-networks-1",
    "slug": "anybus-protocol-converters-gateways",
    "title": "Anybus Protocol Converters & Gateways",
    "tag": "ANYBUS BY HMS",
    "category": "gateways",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "Multi-network protocol converters, embedded communication interfaces, and wireless adapters connecting any device to any industrial fieldbus or Industrial Ethernet network.",
    "specs": "Protocol Conversion | Multi-Network Bridging | Wireless",
    "image": "/AUTOMATION CONTROL/HMS/Anyway By HMS.png"
  },
  {
    "id": "hms-networks-2",
    "slug": "ewon-industrial-remote-solutions-routers",
    "title": "Ewon Industrial Remote Solutions & Routers",
    "tag": "EWON BY HMS",
    "category": "remote-access",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "Secure cloud-managed industrial VPN routers and edge gateways enabling machine builders and plant engineers to remotely access, troubleshoot, and monitor equipment globally.",
    "specs": "Secure Cloud VPN | Talk2M Ecosystem | Live Telemetry",
    "image": "/AUTOMATION CONTROL/HMS/Ewon By HMS.png"
  },
  {
    "id": "hms-networks-3",
    "slug": "intesis-building-hvac-integration-gateways",
    "title": "Intesis Building & HVAC Integration Gateways",
    "tag": "INTESIS BY HMS",
    "category": "gateways",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "Specialized protocol gateways for Building Management Systems (BMS) and HVAC units, bridging BACnet, Modbus, KNX, and DALI protocols seamlessly.",
    "specs": "BMS & HVAC Gateways | BACnet, Modbus & KNX | AC Interfaces",
    "image": "/AUTOMATION CONTROL/HMS/Intesis By HMS.jpg"
  },
  {
    "id": "hms-networks-4",
    "slug": "ixxat-can-fieldbus-vehicle-networks",
    "title": "Ixxat CAN, Fieldbus & Vehicle Networks",
    "tag": "IXXAT BY HMS",
    "category": "fieldbus",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "Robust PC interfaces, gateways, repeaters, and safety solutions for CAN, CAN FD, EtherCAT, and demanding automotive test networks.",
    "specs": "CAN & CAN FD Interfaces | EtherCAT Bridges | Safety & Automotive",
    "image": "/AUTOMATION CONTROL/HMS/Ixxat by HMS.jpg"
  },
  {
    "id": "hms-networks-5",
    "slug": "n-tron-rugged-industrial-ethernet-switches",
    "title": "N-Tron Rugged Industrial Ethernet Switches",
    "tag": "N-TRON BY HMS",
    "category": "switches",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "Heavy-duty unmanaged, monitored, and managed Industrial Ethernet switches engineered to withstand high vibration, extreme temperatures, and harsh electrical noise.",
    "specs": "Managed & Unmanaged Switches | Extreme Environment Rated",
    "image": "/AUTOMATION CONTROL/HMS/Ntron By HMS.png"
  },
  {
    "id": "hms-networks-6",
    "slug": "peak-system-can-lin-bus-interfaces",
    "title": "PEAK-System CAN & LIN Bus Interfaces",
    "tag": "PEAK BY HMS",
    "category": "fieldbus",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "Advanced PC communication hardware, bus adapters, diagnostic software, and data logging modules for industrial CAN and LIN network protocols.",
    "specs": "CAN & LIN Adapters | Bus Diagnostic Hardware | Protocol Analysis",
    "image": "/AUTOMATION CONTROL/HMS/PEAK by HMS.jpg"
  },
  {
    "id": "hms-networks-7",
    "slug": "red-lion-edge-controllers-visual-hmis",
    "title": "Red Lion Edge Controllers & Visual HMIs",
    "tag": "RED LION BY HMS",
    "category": "switches",
    "partner": "HMS Networks",
    "partnerSlug": "hms-networks",
    "solution": "Automation & Control",
    "shortDescription": "High-performance operator interface panels, panel meters, and industrial edge controllers enabling real-time data visualization, protocol conversion, and plant monitoring.",
    "specs": "Industrial HMIs & Edge Control | Data Acquisition | Crimson® Software",
    "image": "/AUTOMATION CONTROL/HMS/Redlion By HMS.png"
  },
  {
    "id": "prosoft-technology-1",
    "slug": "ethernet-ip-to-modbus-serial-4-port-gateway-plx31-eip-mbs4",
    "title": "EtherNet/IP™ to Modbus® Serial 4-Port Gateway (PLX31-EIP-MBS4)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "High-density stand-alone protocol gateway featuring 4 isolated serial channels enabling high-speed communication between EtherNet/IP PACs and up to 4 separate Modbus sub-networks.",
    "specs": "4 Isolated Serial Ports | RS-232/422/485 | Modbus Master & Slave",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP to Modbus Serial 4 Port PLX31-EIP-MBS4.png"
  },
  {
    "id": "prosoft-technology-2",
    "slug": "ethernet-ip-to-modbus-serial-gateway-plx31-eip-mbs",
    "title": "EtherNet/IP™ to Modbus® Serial Gateway (PLX31-EIP-MBS)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Compact DIN-rail gateway interconnecting EtherNet/IP controllers with legacy Modbus RTU/ASCII serial devices, delivering bi-directional data flow with zero code modification.",
    "specs": "Single Serial Port | Modbus Master / Slave | High-Speed Throughput",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP to Modbus Serial PLX31-EIP-MBS.png"
  },
  {
    "id": "prosoft-technology-3",
    "slug": "ethernet-ip-to-modbus-tcp-ip-gateway-plx31-eip-mbtcp",
    "title": "EtherNet/IP™ to Modbus® TCP/IP Gateway (PLX31-EIP-MBTCP)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Dual-port Ethernet gateway providing deterministic bridging and subnet isolation between EtherNet/IP networks and Modbus TCP/IP servers and clients.",
    "specs": "Dual Isolated Ethernet Subnets | Client & Server Support | High Speed",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP to Modbus TCP-IP PLX31-EIP-MBTCP.png"
  },
  {
    "id": "prosoft-technology-4",
    "slug": "ethernet-ip-to-reliance-automax-gateway-an-x-amx",
    "title": "EtherNet/IP™ to Reliance AutoMax™ Gateway (AN-X-AMX)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Specialized migration gateway enabling ControlLogix and modern PACs to control I/O drops on legacy Reliance AutoMax DCS networks without replacing field cabling.",
    "specs": "AutoMax DCS Integration | Non-CE | Phased Plant Modernization",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP to Reliance AutoMax Gateway, non-CE AN-X-AMX.png"
  },
  {
    "id": "prosoft-technology-5",
    "slug": "ethernet-ip-to-siemens-industrial-ethernet-plx31-eip-sie",
    "title": "EtherNet/IP™ to Siemens® Industrial Ethernet (PLX31-EIP-SIE)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "High-speed protocol converter facilitating bi-directional data exchange between Rockwell ControlLogix/CompactLogix and Siemens S7-200, S7-300, S7-400, S7-1200, and S7-1500 PLCs.",
    "specs": "Direct Siemens S7 Communication | Client & Server Modes | DIN-Rail Mount",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP to Siemens Industrial Ethernet PLX31-EIP-SIE.png"
  },
  {
    "id": "prosoft-technology-6",
    "slug": "ethernet-ip-to-ti-remote-i-o-master-gateway",
    "title": "EtherNet/IP™ to TI® Remote I/O Master Gateway",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Enables modern Rockwell Automation ControlLogix PACs to act as master controllers over legacy Texas Instruments 505 / 545 / 555 Remote I/O bases.",
    "specs": "TI 505 RIO Emulation | Zero Rewiring Required | Non-CE Modernization",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP to Texas Instruments Remote I-O Master Gateway, non-CE.jpg"
  },
  {
    "id": "prosoft-technology-7",
    "slug": "ethernet-ip-to-ge-genius-i-o-gateway-an-x3-geni",
    "title": "EtherNet/IP™ to GE Genius™ I/O Gateway (AN-X3-GENI)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Enables smooth phased upgrades by allowing EtherNet/IP PACs to communicate directly with legacy GE Fanuc Series 90-70 / 90-30 Genius I/O blocks.",
    "specs": "GE Genius Bus Emulation | Phased DCS Migration | Drop-In Compatibility",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP™ to GE Genius™ I-O Gateway AN-X3-GENI.jpg"
  },
  {
    "id": "prosoft-technology-8",
    "slug": "ethernet-ip-to-remote-i-o-or-dh-gateway-an-x4-ab-dhrio",
    "title": "EtherNet/IP™ to Remote I/O or DH+™ Gateway (AN-X4-AB-DHRIO)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Modernization gateway connecting modern EtherNet/IP PACs to legacy Allen-Bradley Data Highway Plus (DH+) and Remote I/O (RIO) networks for PLC-5 and SLC 500 replacements.",
    "specs": "Allen-Bradley DH+ & RIO | PLC-5 & SLC Migration | Fast Commissioning",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNet-IP™ to Remote I-O or DH+ Gateway AN-X4-AB-DHRIO.png"
  },
  {
    "id": "prosoft-technology-9",
    "slug": "ethernet-ip-to-modicon-s908-gateway-an-x3-mod",
    "title": "EtherNet/IP™ to Modicon™ S908 Gateway (AN-X3-MOD)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Allows ControlLogix and modern PACs to control existing Modicon 800-series remote I/O on S908 coaxial networks without rewiring field terminations.",
    "specs": "Modicon S908 RIO Coax Support | Seamless Controller Modernization",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/EtherNetIP™ to Modicon™ S908 Gateway AN-X3-MOD.png"
  },
  {
    "id": "prosoft-technology-10",
    "slug": "industrial-edge-gateway-elx3",
    "title": "Industrial Edge Gateway (ELX3)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Containerized Linux edge gateway bridging OT control systems with enterprise IT, cloud platforms, and MQTT/Sparkplug architectures with enterprise cybersecurity.",
    "specs": "Linux Container Engine | MQTT & Sparkplug B | OT-to-Cloud Data Bridge",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/Industrial Edge Gateway ELX3.png"
  },
  {
    "id": "prosoft-technology-11",
    "slug": "isolated-8-channel-hart-analog-input-module-plx51-hart-8i",
    "title": "Isolated 8-Channel HART® Analog Input Module (PLX51-HART-8I)",
    "tag": "GATEWAYS",
    "category": "gateways",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "High-precision standalone input module capturing process variables and HART instrument diagnostic data directly into EtherNet/IP, Modbus TCP, and DNP3 controllers.",
    "specs": "8 Isolated Channels | HART 5, 6 & 7 | EtherNet/IP, Modbus TCP & DNP3",
    "image": "/AUTOMATION CONTROL/PROSOFT/GATEWAYS/Isolated 8-Channel HART® Input Module PLX51-HART-8I.png"
  },
  {
    "id": "prosoft-technology-12",
    "slug": "industrial-hotspot-802-11abgn-rlx2-ihnf",
    "title": "Industrial Hotspot 802.11abgn (RLX2-IHNF)",
    "tag": "INDUSTRIAL WIRELESS",
    "category": "wireless",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "High-speed industrial wireless access point and bridge designed for heavy vibration, extreme operating temperatures, and mobile crane/AGV connectivity.",
    "specs": "802.11abgn MIMO | Ultra-Fast Roaming (<10ms) | IP66 / NEMA 4X Rated",
    "image": "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prosoft-technology-13",
    "slug": "industrial-cellular-plus-gateway-icx35-hwc",
    "title": "Industrial Cellular Plus Gateway (ICX35-HWC)",
    "tag": "INDUSTRIAL WIRELESS",
    "category": "wireless",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Rugged 4G LTE cellular gateway providing secure, always-on telemetry, SMS alarming, and remote diagnostics for distributed wellheads and remote pump stations.",
    "specs": "4G LTE Multi-Carrier | Dual SIM Failover | OpenVPN & IPsec Security",
    "image": "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prosoft-technology-14",
    "slug": "prosoft-connect-cloud-remote-access-gateway-plx35-nb2",
    "title": "ProSoft Connect™ Cloud Remote Access Gateway (PLX35-NB2)",
    "tag": "REMOTE ACCESS",
    "category": "remote-access",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Zero-configuration cloud VPN bridge allowing automation engineers to remotely troubleshoot PLCs and HMIs from anywhere without maintaining complex IT firewall rules.",
    "specs": "EasyConnect Architecture | 256-Bit Encrypted Tunnel | No Software Install Required",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prosoft-technology-15",
    "slug": "controllogix-modbus-serial-in-chassis-module-mvi56e-mcm",
    "title": "ControlLogix® Modbus® Serial In-Chassis Module (MVI56E-MCM)",
    "tag": "ROCKWELL AUTOMATION IN CHASIS",
    "category": "in-chassis",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "High-performance in-chassis communication module adding dual independent Modbus master/slave serial ports directly onto the ControlLogix 1756 backplane.",
    "specs": "Direct 1756 Backplane Mount | Dual Serial Channels | CIP Routing & Diagnostics",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prosoft-technology-16",
    "slug": "compactlogix-profibus-dp-master-module-ilx34-pbm",
    "title": "CompactLogix™ PROFIBUS DP Master Module (ILX34-PBM)",
    "tag": "ROCKWELL AUTOMATION IN CHASIS",
    "category": "in-chassis",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "In-chassis module allowing Rockwell CompactLogix PACs to communicate directly with PROFIBUS DP slave drives, sensors, and remote I/O drops up to 12 Mbps.",
    "specs": "CompactLogix Point I/O Form Factor | Up to 12 Mbps | Automatic Tag Generation",
    "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prosoft-technology-17",
    "slug": "prosoft-configuration-builder-pcb",
    "title": "ProSoft Configuration Builder (PCB)",
    "tag": "PROSOFT SOFTWARES",
    "category": "software",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Comprehensive Windows-based configuration software for diagnostics, ladder logic tag generation, and firmware parameter setup across all ProSoft modules.",
    "specs": "Graphical Parameter Editor | Live Diagnostic Telemetry | Auto Ladder Generation",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prosoft-technology-18",
    "slug": "prosoft-wireless-designer-pwd",
    "title": "ProSoft Wireless Designer (PWD)",
    "tag": "PROSOFT SOFTWARES",
    "category": "software",
    "partner": "ProSoft Technology",
    "partnerSlug": "prosoft-technology",
    "solution": "Automation & Control",
    "shortDescription": "Specialized predictive RF planning software tool that calculates line-of-sight path loss, Fresnel zone clearance, and bill of materials for industrial wireless deployments.",
    "specs": "RF Link Analysis | Fresnel Zone Calculation | Complete BOM Generation",
    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "epp-composites-1",
    "slug": "grp-gre-industrial-piping-systems",
    "title": "GRP & GRE Industrial Piping Systems",
    "tag": "EPP COMPOSITES",
    "category": "piping",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "High-performance Glass Reinforced Plastic (GRP) and Glass Reinforced Epoxy (GRE) piping systems engineered for severe chemical media, high-pressure desalination, oilfield flowlines, and underground municipal utilities.",
    "specs": "Diameter: DN 25 ~ DN 4000 mm | Pressure: Up to 32 Bar | 50+ Years Service Life",
    "image": "/PRODUCTS/EPP COMPOSITE/GRP-GRE Piping System.jpg"
  },
  {
    "id": "epp-composites-2",
    "slug": "frp-chemical-process-equipment-storage-tanks",
    "title": "FRP Chemical Process Equipment & Storage Tanks",
    "tag": "EPP COMPOSITES",
    "category": "equipment",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "Custom engineered vertical and horizontal chemical storage tanks, process reaction vessels, scrubbers, chimneys, and absorption towers built with specialized vinyl ester resins for aggressive chemical containment.",
    "specs": "Volume up to 200,000 Liters | Temp up to 180°C | ASME RTP-1 & BS 4994 Compliant",
    "image": "/PRODUCTS/EPP COMPOSITE/FRP Process Equipment.jpg"
  },
  {
    "id": "epp-composites-3",
    "slug": "gfrp-composite-lighting-utility-poles",
    "title": "GFRP Composite Lighting & Utility Poles",
    "tag": "EPP COMPOSITES",
    "category": "energy-infra",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "Aesthetically designed, non-conductive, and corrosion-free Glass Fiber Reinforced Polymer (GFRP) poles engineered for coastal expressways, smart cities, commercial infrastructure, and aggressive marine atmospheres.",
    "specs": "Passive Safety Breakaway | UV Stabilized | Zero Maintenance | 100% Rust-Proof",
    "image": "/PRODUCTS/EPP COMPOSITE/GFRP Lighting Poles.jpg"
  },
  {
    "id": "epp-composites-4",
    "slug": "structural-pultruded-profiles-beams",
    "title": "Structural Pultruded Profiles & Beams",
    "tag": "EPP COMPOSITES",
    "category": "pultrusion",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "Engineered composite structural sections including I-beams, H-beams, channels, angles, rectangular tubes, and solid rods offering superior strength-to-weight ratio and electrical insulation replacing heavy structural steel.",
    "specs": "High Strength-to-Weight | ASTM D4385 Class 1 Fire Retardant | Non-Conductive",
    "image": "/PRODUCTS/EPP COMPOSITE/Pultrusion.jpg"
  },
  {
    "id": "epp-composites-5",
    "slug": "pultruded-walkway-gratings-industrial-handrails",
    "title": "Pultruded Walkway Gratings & Industrial Handrails",
    "tag": "EPP COMPOSITES",
    "category": "pultrusion",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "Heavy-duty non-slip industrial gratings, catwalk flooring, safety ladders, and handrail systems engineered for chemical process plants, offshore platforms, wastewater plants, and cooling towers.",
    "specs": "Anti-Slip Quartz Gritted Surface | High Load Capacity | OSHA & ANSI Compliant",
    "image": "/PRODUCTS/EPP COMPOSITE/Pultrusion1.jpg"
  },
  {
    "id": "epp-composites-6",
    "slug": "smc-compression-molded-products-meter-boxes",
    "title": "SMC Compression Molded Products & Meter Boxes",
    "tag": "EPP COMPOSITES",
    "category": "molding",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "High-precision Sheet Molding Compound (SMC) electrical meter enclosures, junction boxes, cable distribution cabinets, and railway components offering superior dielectric insulation and weatherproofing.",
    "specs": "IP65 / IP67 Weatherproof | UL 94 V-0 Flame Retardant | Tamper-Proof Locking",
    "image": "/PRODUCTS/EPP COMPOSITE/SMC.jpg"
  },
  {
    "id": "epp-composites-7",
    "slug": "thermoplastic-lined-dual-laminate-vessels",
    "title": "Thermoplastic Lined & Dual-Laminate Vessels",
    "tag": "EPP COMPOSITES",
    "category": "molding",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "Dual-laminate systems integrating PP, PVDF, ECTFE, PFA, and FEP thermoplastic liners with structural FRP backing for maximum chemical barrier protection against ultra-corrosive chemical solutions and hot acids.",
    "specs": "PVDF / ECTFE / PP Liners | Seamless Fusion Welding | High Chemical Inertness",
    "image": "/PRODUCTS/EPP COMPOSITE/Thermoplastic Products.jpg"
  },
  {
    "id": "epp-composites-8",
    "slug": "wind-turbine-nacelle-covers-spinner-cones",
    "title": "Wind Turbine Nacelle Covers & Spinner Cones",
    "tag": "EPP COMPOSITES",
    "category": "energy-infra",
    "partner": "EPP Composites",
    "partnerSlug": "epp-composites",
    "solution": "Non Metallic Solutions",
    "shortDescription": "Aerodynamically optimized, lightweight composite nacelle covers, rotor spinner cones, and aerodynamic fairings manufactured with advanced vacuum infusion processes for utility-scale wind energy generators.",
    "specs": "Aerodynamic Infusion Tech | High Fatigue Resistance | Extreme Weather Durability",
    "image": "/PRODUCTS/EPP COMPOSITE/Wind Turbine Components.jpg"
  }
]

export const partnerSlugMap: Record<string, string> = {
  'Rockwell Automation': 'rockwell-automation',
  'SPP Pumps': 'spp-pumps',
  'Kirloskar Pneumatic': 'kirloskar-pneumatic',
  'Kirloskar Chillers': 'kirloskar-chillers',
  'EPP Composites': 'epp-composites',
  'HMS Networks': 'hms-networks',
  'ProSoft Technology': 'prosoft-technology'
}

export async function fetchProductsFromStrapi(): Promise<Product[]> {
  try {
    const strapiData = await fetchFromStrapi<any>('products')
    if (!strapiData || strapiData.length === 0) return []

    return strapiData.map((item: any) => {
      const title = item.title || 'Untitled Product'
      const autoSlug = item.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `product-${item.id}`
      
      let imgUrl = ''
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        imgUrl = getStrapiMediaUrl(item.images[0].url)
      } else if (item.image?.url) {
        imgUrl = getStrapiMediaUrl(item.image.url)
      }

      const partnerName = item.partner || 'Rockwell Automation'
      const partnerSlug = partnerSlugMap[partnerName] || partnerName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      // Default fallback image if Strapi has no image uploaded yet
      const fallbackImg = fallbackProducts.find(p => p.slug === autoSlug || p.title.toLowerCase() === title.toLowerCase())?.image || '/NEW LOGO/logo2.png'

      return {
        id: String(item.documentId || item.id),
        slug: autoSlug,
        title,
        tag: item.tag || partnerName.toUpperCase(),
        category: (item.category || 'all').toLowerCase(),
        partner: partnerName,
        partnerSlug,
        solution: item.solution || 'Automation & Control',
        shortDescription: extractStrapiText(item.shortDescription) || '',
        detailedDescription: extractStrapiText(item.detailedDescription) || '',
        specs: item.specs || '',
        exploreUrl: item.exploreUrl || item.explore_url || '',
        image: imgUrl || fallbackImg,
        brochure: item.brochure?.url ? getStrapiMediaUrl(item.brochure.url) : undefined,
        isFeatured: Boolean(item.isFeatured)
      }
    })
  } catch (err) {
    console.warn('[Products] Error loading products from Strapi:', err)
    return []
  }
}

export function parseProductSpecs(specsInput?: string | null): string[] {
  if (!specsInput) return []
  const trimmed = specsInput.trim()
  if (!trimmed) return []

  // If newline separated
  if (trimmed.includes('\n')) {
    return trimmed.split('\n').map(s => s.replace(/^[-*•\d.]+\s*/, '').trim()).filter(Boolean)
  }
  // If pipe separated
  if (trimmed.includes('|')) {
    return trimmed.split('|').map(s => s.trim()).filter(Boolean)
  }
  return [trimmed]
}

export function getMergedProducts(strapiProducts: Product[] = [], partnerSlug?: string): Product[] {
  // If we have strapi products matching this partner, use them and merge with fallback
  if (partnerSlug) {
    const fromStrapi = strapiProducts.filter(p => p.partnerSlug === partnerSlug)
    const fromFallback = fallbackProducts.filter(p => p.partnerSlug === partnerSlug)
    if (fromStrapi.length > 0) {
      // Return Strapi products combined with any non-overlapping fallback products
      const strapiSlugs = new Set(fromStrapi.map(p => p.slug))
      return [...fromStrapi, ...fromFallback.filter(f => !strapiSlugs.has(f.slug))]
    }
    return fromFallback
  }

  if (strapiProducts.length > 0) {
    const strapiSlugs = new Set(strapiProducts.map(p => p.slug))
    return [...strapiProducts, ...fallbackProducts.filter(f => !strapiSlugs.has(f.slug))]
  }

  return fallbackProducts
}

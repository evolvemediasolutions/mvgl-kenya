export interface Solution {
  id: string
  slug: string
  category: 'automation' | 'mechanical' | 'cooling' | 'materials'
  title: {
    en: string
  }
  description: {
    en: string
  }
  features: {
    en: string[]
  }
  image: string
  partners: string[] // Partner IDs associated
}

export const solutionsData: Solution[] = [
  {
    id: 'power-generation',
    slug: 'power-generation',
    category: 'mechanical',
    title: {
      en: 'Power Generation'
    },
    description: {
      en: 'Delivering heavy-duty, fuel-efficient prime and standby electrical power generation packages. Engineered in partnership with Kirloskar Powergen, our systems support mission-critical manufacturing facilities, healthcare complexes, data centers, and regional infrastructure with 24/7 reliability across Kenya and East Africa.'
    },
    features: {
      en: [
        'Diesel & Gas Generator Packages (15 kVA to 3000+ kVA)',
        'Heavy-Duty Prime & Continuous Duty Power Sets',
        'Automatic Mains Failure (AMF) & Synchronizing Panels',
        'Sound-Attenuated Weatherproof Acoustic Enclosures'
      ]
    },
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
    partners: ['kirloskar-powergen']
  },
  {
    id: 'air-gas',
    slug: 'air-gas',
    category: 'mechanical',
    title: {
      en: 'Air & Gas'
    },
    description: {
      en: 'Delivering reliable compressed air and gas systems in partnership with Kirloskar Pneumatic, we provide complete engineering solutions that support critical industrial processes with maximum efficiency, low specific power consumption, and guaranteed uptime.'
    },
    features: {
      en: [
        'Oil-Free & Oil-Injected Rotary Screw Compressors',
        'Process Gas Compression Packages for Refineries & Chemicals',
        'Desiccant & Refrigerated Air Dryers and Line Filtration',
        'High-Pressure Reciprocating Gas Booster Systems'
      ]
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    partners: ['kirloskar-pneumatic']
  },
  {
    id: 'industrial-refrigeration',
    slug: 'industrial-refrigeration',
    category: 'cooling',
    title: {
      en: 'Industrial Refrigeration'
    },
    description: {
      en: 'Providing turnkey industrial refrigeration and cold chain preservation solutions engineered with Kirloskar Pneumatic. Designed for cold storage warehouses, slaughterhouses, horticultural export hubs, and chemical process cooling throughout East Africa.'
    },
    features: {
      en: [
        'Ammonia (NH3) & Eco-Friendly Screw Compressor Packages',
        'Industrial Reciprocating Refrigeration Compressor Systems',
        'Continuous Blast Freezing & Large-Scale Cold Rooms',
        'Evaporative Condensers & Pressure Vessel Packages'
      ]
    },
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    partners: ['kirloskar-pneumatic']
  },
  {
    id: 'hvac-process-cooling',
    slug: 'hvac-process-cooling',
    category: 'cooling',
    title: {
      en: 'HVAC & Process Cooling'
    },
    description: {
      en: 'Delivering high-efficiency chillers and process cooling systems in partnership with Kirloskar Chillers. Engineered for tropical and high-ambient ambient conditions in pharmaceutical plants, food processing, commercial real estate, and industrial utilities.'
    },
    features: {
      en: [
        'Water-Cooled & Air-Cooled Screw Chillers',
        'High-Efficiency Centrifugal Chillers (AHRI Certified)',
        'Process Fluid Heat Exchangers & Low GWP Cooling',
        'Integrated Thermal Energy Storage & Ice Bank Systems'
      ]
    },
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    partners: ['kirloskar-chillers']
  },
  {
    id: 'industrial-pumping',
    slug: 'industrial-pumping',
    category: 'mechanical',
    title: {
      en: 'Industrial Pumping'
    },
    description: {
      en: 'Delivering world-renowned life safety fire pump systems and industrial fluid handling packages from SPP Pumps. Certified to NFPA 20, UL-listed, and FM-approved to protect high-hazard manufacturing, fuel terminals, and commercial complexes.'
    },
    features: {
      en: [
        'FM-Approved / UL-Listed Horizontal Split-Case Fire Pumps',
        'Vertical Turbine Deep-Well Fire Water Pump Sets',
        'Turnkey Containerized Pre-Packaged Fire Pump Houses',
        'End-Suction & Multi-Stage Heavy Industrial Process Pumps'
      ]
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    partners: ['spp-pumps']
  },
  {
    id: 'industrial-automation',
    slug: 'industrial-automation',
    category: 'automation',
    title: {
      en: 'Industrial Automation'
    },
    description: {
      en: 'Empowering East African manufacturers with intelligent control, digital transformation, and smart operations powered by Rockwell Automation. Complete control architectures from plant-floor PLCs to enterprise telemetry.'
    },
    features: {
      en: [
        'Allen-Bradley ControlLogix & CompactLogix PLCs / PACs',
        'PowerFlex Variable Frequency Drives (VFDs) & Motor Control',
        'FactoryTalk SCADA, Analytics & Industrial Cybersecurity',
        'Stratix Managed Industrial Ethernet Switches & Remote I/O'
      ]
    },
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
    partners: ['rockwell-automation']
  },
  {
    id: 'power-electronics',
    slug: 'power-electronics',
    category: 'automation',
    title: {
      en: 'Power Electronics'
    },
    description: {
      en: 'Delivering state-of-the-art power electronics, precision drive control, and power quality conditioning systems from Fuji Electronics. Protecting sensitive industrial electronics and optimizing energy conversion efficiency.'
    },
    features: {
      en: [
        'High-Performance Industrial Inverters & Vector Drives',
        'Online Double-Conversion Uninterruptible Power Supply (UPS)',
        'Active Harmonic Filters & Dynamic Voltage Regulators',
        'Solid-State Power Semiconductors & Energy Saving Systems'
      ]
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    partners: ['fuji-electronics']
  },
  {
    id: 'warehouse-material-handling',
    slug: 'warehouse-material-handling',
    category: 'mechanical',
    title: {
      en: 'Warehouse & Material Handling'
    },
    description: {
      en: 'Pioneering smart internal logistics, automated storage, and robotic material handling in partnership with Xoog. Transforming warehouses and manufacturing dispatch centers into automated, high-throughput fulfillment environments.'
    },
    features: {
      en: [
        'Autonomous Mobile Robots (AMRs) & Automated Guided Vehicles (AGVs)',
        'Automated Storage & Retrieval Systems (ASRS)',
        'High-Speed Sortation & Intelligent Roller Conveyor Lines',
        'Warehouse Control & Fleet Management Software Integration'
      ]
    },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    partners: ['xoog']
  }
]

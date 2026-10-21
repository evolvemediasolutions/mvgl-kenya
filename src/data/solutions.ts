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
    id: 'air-gas-solutions',
    slug: 'air-gas-solutions',
    category: 'mechanical',
    title: {
      en: 'Air & Gas Solutions'
    },
    description: {
      en: 'Delivering reliable compressed air and gas systems, we provide complete solutions that support critical industrial processes with maximum efficiency and uptime. Our innovative technologies and engineering expertise help industries such as Food & Beverage, Pharmaceuticals, Chemicals, Mining, Cement, and Power Generation achieve sustainable, safe, and dependable operations across Kenya and East Africa.'
    },
    features: {
      en: [
        'Oil-Free & Oil-Injected Compressors',
        'Process Gas Compression Packages',
        'Advanced Filtration & Air Treatment Systems',
        'High-Pressure Gas Booster Systems'
      ]
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    partners: ['kirloskar-pneumatic']
  },
  {
    id: 'refrigeration-hvac-solutions',
    slug: 'refrigeration-hvac-solutions',
    category: 'cooling',
    title: {
      en: 'Refrigeration & HVAC Solutions'
    },
    description: {
      en: 'Delivering comprehensive industrial refrigeration, process cooling, and large-scale HVAC systems, we provide robust solutions engineered for high-efficiency temperature control in demanding industrial, horticultural, and commercial environments.'
    },
    features: {
      en: [
        'Water-Cooled & Air-Cooled Industrial Chillers',
        'Ammonia & Eco-Refrigerant Screw Compressor Packages',
        'Cold Chain Storage & Blast Freezing Solutions',
        'Process Gas Cooling & Heat Rejection Systems'
      ]
    },
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    partners: ['kirloskar-pneumatic', 'kirloskar-chillers']
  },
  {
    id: 'automation-control',
    slug: 'automation-control',
    category: 'automation',
    title: {
      en: 'Automation & Control Solutions'
    },
    description: {
      en: 'Delivering intelligent automation, integrated control, and resilient industrial connectivity systems, we provide complete solutions that optimize critical manufacturing and infrastructure operations with maximum uptime, cybersecurity, and productivity.'
    },
    features: {
      en: [
        'Programmable Logic Controllers (PLCs) & PACs',
        'Variable Frequency Drives (VFDs) & Soft Starters',
        'Stratix Industrial Ethernet Switches & Security',
        'Predictive Condition Monitoring & IoT Telemetry'
      ]
    },
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
    partners: ['rockwell-automation', 'hms-networks', 'prosoft-technology']
  },
  {
    id: 'non-metallic-solutions',
    slug: 'non-metallic-solutions',
    category: 'materials',
    title: {
      en: 'Non Metallic Solution'
    },
    description: {
      en: 'Delivering comprehensive non-metallic, FRP, and GRP composite systems, we provide advanced corrosion-resistant piping, chemical storage tanks, gratings, and structural solutions engineered for harsh industrial and coastal environments.'
    },
    features: {
      en: [
        'FRP & GRP Chemical Process Piping Systems',
        'Above-ground & Underground Storage Tanks',
        'Molded & Pultruded FRP Gratings & Cable Trays',
        'Custom Structural Profiles & Industrial Ladders'
      ]
    },
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
    partners: ['epp-composites']
  },
  {
    id: 'fire-pump-solutions',
    slug: 'fire-pump-solutions',
    category: 'mechanical',
    title: {
      en: 'Fire Pump Solutions'
    },
    description: {
      en: 'Delivering world-class FM-Approved and UL-Listed fire pump packages, we provide complete, certified fire protection and emergency water delivery systems engineered to safeguard lives and mission-critical assets across industrial, commercial, and high-rise facilities.'
    },
    features: {
      en: [
        'Horizontal & Vertical Split-Case Fire Pumps',
        'Vertical Turbine Fire Water Pumps',
        'Engineered Containerized Fire Pump Houses',
        'NFPA 20 Compliant Electric & Diesel Systems'
      ]
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    partners: ['spp-pumps']
  }
]

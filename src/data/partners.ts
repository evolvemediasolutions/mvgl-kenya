export interface Partner {
  id: string
  slug: string
  name: string
  logo: string
  description: {
    en: string
  }
  longDescription: {
    en: string
  }
  solutions: string[] // Solution IDs associated
}

export const partnersData: Partner[] = [
  {
    id: 'kirloskar-powergen',
    slug: 'kirloskar-powergen',
    name: 'Kirloskar Powergen',
    logo: '/PARTNERS LOGO/KIRLOSKAR POWERGEN.svg',
    description: {
      en: 'Reliable Prime & Standby Power Generation Solutions'
    },
    longDescription: {
      en: 'Kirloskar Powergen delivers heavy-duty diesel and gas generator packages engineered to guarantee continuous, fuel-efficient electrical power for industrial manufacturing, hospitals, data centers, and critical infrastructure across Kenya and East Africa.'
    },
    solutions: ['power-generation']
  },
  {
    id: 'kirloskar-pneumatic',
    slug: 'kirloskar-pneumatic',
    name: 'Kirloskar Pneumatic',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&w=300&q=80',
    description: {
      en: 'Innovation That Powers Industry & Compression'
    },
    longDescription: {
      en: 'Founded in 1958, Kirloskar Pneumatic develops heavy engineering technologies supporting diverse industrial applications including screw compressors, reciprocating packages, process gas compression, and industrial refrigeration systems.'
    },
    solutions: ['air-gas', 'air-gas-solutions', 'industrial-refrigeration', 'compressed-air', 'process-gas-compression']
  },
  {
    id: 'kirloskar-chillers',
    slug: 'kirloskar-chillers',
    name: 'Kirloskar Chillers',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&w=300&q=80',
    description: {
      en: 'Solutions for Today. Engineered for Tomorrow.'
    },
    longDescription: {
      en: 'Kirloskar Chillers brings decades of experience in HVAC&R, with a focus on reliability, operating efficiency and responsive after-sales support for process cooling, food preservation, and commercial applications.'
    },
    solutions: ['hvac-process-cooling', 'refrigeration-hvac-solutions', 'industrial-refrigeration']
  },
  {
    id: 'spp-pumps',
    slug: 'spp-pumps',
    name: 'SPP Pumps',
    logo: '/PARTNERS LOGO/SPP.jpg',
    description: {
      en: 'Fire Protection & Critical Process Pump Solutions'
    },
    longDescription: {
      en: "For nearly 150 years, SPP Pumps has stood as a premier manufacturer of centrifugal pumps and related systems. Recognized worldwide as a leader in the design, manufacture, supply and servicing of high-quality, certified and accredited pump packages, SPP Pumps provides proven life-safety and industrial fluid handling solutions."
    },
    solutions: ['industrial-pumping', 'fire-pump-solutions', 'fire-pump-solution', 'pumping']
  },
  {
    id: 'rockwell-automation',
    slug: 'rockwell-automation',
    name: 'Rockwell Automation',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&w=300&q=80',
    description: {
      en: 'Integrated Automation for the Connected Enterprise'
    },
    longDescription: {
      en: 'Rockwell Automation combines industrial automation, control, software and services to help organizations build more connected and productive operations across Kenya and East Africa.'
    },
    solutions: ['industrial-automation', 'automation-control']
  },
  {
    id: 'fuji-electronics',
    slug: 'fuji-electronics',
    name: 'Fuji Electronics',
    logo: '/PARTNERS LOGO/FUJI ELECTRONICS.svg',
    description: {
      en: 'Advanced Power Electronics, Inverters & Energy Control'
    },
    longDescription: {
      en: 'Fuji Electronics engineers world-class industrial power electronics, precision drive control systems, uninterruptible power supplies (UPS), and harmonic conditioning systems to maximize power quality and operational resilience.'
    },
    solutions: ['power-electronics']
  },
  {
    id: 'xoog',
    slug: 'xoog',
    name: 'Xoog',
    logo: '/PARTNERS LOGO/XOOG.svg',
    description: {
      en: 'Intelligent Warehouse Automation & Material Handling'
    },
    longDescription: {
      en: 'Xoog is a pioneer in smart warehouse automation, autonomous mobile robots (AMRs), automated storage and retrieval systems (ASRS), and turnkey internal logistics technologies designed for fast, error-free factory and distribution operations.'
    },
    solutions: ['warehouse-material-handling']
  },
  {
    id: 'epp-composites',
    slug: 'epp-composites',
    name: 'EPP Composites',
    logo: '/PARTNERS LOGO/EPP.jpg',
    description: {
      en: 'Pioneering FRP/GRP Innovation'
    },
    longDescription: {
      en: 'Established in 1986, EPP Composites specializes in the design, engineering and manufacturing of Fiber Reinforced Plastic and Glass Reinforced Plastic solutions. EPP serves more than 5,500 customers across 45+ countries with certified quality and unmatched composite engineering.'
    },
    solutions: ['frp-grp', 'non-metallic-solutions', 'non-metallic-solution']
  },
  {
    id: 'hms-networks',
    slug: 'hms-networks',
    name: 'HMS Networks',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&w=300&q=80',
    description: {
      en: 'We Make Industrial Equipment Communicate'
    },
    longDescription: {
      en: 'HMS stands for Hardware Meets Software™. Its technologies enable industrial hardware to communicate and exchange information with software and other systems seamlessly.'
    },
    solutions: ['industrial-communication']
  },
  {
    id: 'prosoft-technology',
    slug: 'prosoft-technology',
    name: 'ProSoft Technology',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&w=300&q=80',
    description: {
      en: 'Reliable Connections for the Industrial World'
    },
    longDescription: {
      en: "ProSoft Technology, one of Belden's connected brands, provides industrial communication technologies designed to address connectivity, optimization, modernization and migration challenges."
    },
    solutions: ['industrial-automation', 'industrial-communication']
  }
]

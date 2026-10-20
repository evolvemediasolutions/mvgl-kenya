export interface Industry {
  id: string
  name: {
    en: string
  }
  description: {
    en: string
  }
  image: string
}

export const industriesData: Industry[] = [
  {
    id: 'oil-gas',
    name: { en: 'Oil & Gas' },
    description: {
      en: 'Reliable engineering products, gas compression packages, and safe communication components for energy and fuel handling facilities.'
    },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'petrochemical',
    name: { en: 'Petrochemical' },
    description: {
      en: 'Process instrumentation, corrosion-resistant composite structures, and heavy duty process gas and cooling systems.'
    },
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'steel',
    name: { en: 'Steel & Metals' },
    description: {
      en: 'Automation systems and industrial cooling systems engineered to withstand intense temperatures and continuous manufacturing cycles.'
    },
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'power',
    name: { en: 'Power Generation' },
    description: {
      en: 'Heavy mechanical systems, communication modules, and auxiliary utilities keeping regional power generation and distribution networks stable.'
    },
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mining',
    name: { en: 'Mining & Minerals' },
    description: {
      en: 'Ruggedized industrial communications, safety automation, and heavy material transport systems designed for harsh environments.'
    },
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'construction',
    name: { en: 'Construction & Infrastructure' },
    description: {
      en: 'Advanced composites, FRP piping, and pump modules assisting core infrastructure and civil engineering works across Kenya and East Africa.'
    },
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cement',
    name: { en: 'Cement & Building Materials' },
    description: {
      en: 'Robust automation controls and heavy compressed air infrastructure built for high particulate and continuous duty environments.'
    },
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chemical',
    name: { en: 'Chemical Manufacturing' },
    description: {
      en: 'Corrosion-proof FRP/GRP tanks, GRP piping systems, and customized process fluid systems resisting aggressive chemicals.'
    },
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'food-processing',
    name: { en: 'Food Processing & Agriculture' },
    description: {
      en: 'Clean, oil-free air compression and food-grade industrial refrigeration packages maintaining stringent hygiene and temperature standards.'
    },
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dairy-beverage',
    name: { en: 'Dairy & Beverage' },
    description: {
      en: 'High-efficiency industrial chilling, hygienic pumping, and fluid handling systems ensuring continuous and reliable production loops.'
    },
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cold-rooms',
    name: { en: 'Cold Rooms & Logistics' },
    description: {
      en: 'State-of-the-art thermal isolation and commercial grade refrigeration packages for agricultural exports and cold chain storage.'
    },
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hospitals-hotels',
    name: { en: 'Commercial, Healthcare & Hospitality' },
    description: {
      en: 'Highly reliable and energy-efficient HVAC chillers, process cooling configurations, and certified life-safety fire pump houses.'
    },
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=600&q=80'
  }
]

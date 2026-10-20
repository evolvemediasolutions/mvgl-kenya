export interface EventItem {
  id: string
  title: {
    en: string
  }
  date: {
    en: string
  }
  location: {
    en: string
  }
  description: {
    en: string
  }
  image: string
}

export const eventsData: EventItem[] = [
  {
    id: 'east-africa-industrial-expo-2026',
    title: {
      en: 'East Africa Industrial & Manufacturing Expo 2026'
    },
    date: {
      en: 'March 18, 2026'
    },
    location: {
      en: 'Kenyatta International Convention Centre (KICC), Nairobi, Kenya'
    },
    description: {
      en: 'Showcasing our latest industrial automation, compressed air packages, and smart control technologies directly to engineering and plant operations teams across Kenya.'
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kenya-energy-infrastructure-summit',
    title: {
      en: 'Kenya Energy & Infrastructure Summit'
    },
    date: {
      en: 'May 20, 2026'
    },
    location: {
      en: 'Nairobi, Kenya'
    },
    description: {
      en: 'Demonstrating certified fire pump houses, energy-efficient HVAC chillers, and corrosion-resistant composite piping systems catering to industrial and utility developments.'
    },
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'east-africa-cold-chain-forum',
    title: {
      en: 'East Africa HVAC & Cold Chain Forum'
    },
    date: {
      en: 'July 14, 2026'
    },
    location: {
      en: 'Sarit Expo Centre, Nairobi, Kenya'
    },
    description: {
      en: 'Presenting state-of-the-art ammonia screw refrigeration packages, cold storage solutions, and process water chillers engineered for horticultural and food processing industries.'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  }
]

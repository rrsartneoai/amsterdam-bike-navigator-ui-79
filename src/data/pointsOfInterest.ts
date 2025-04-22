
export interface PointOfInterest {
  id: string;
  name: string;
  type: PoiType;
  category: string;
  coordinates: [number, number];
  description: string;
  address?: string;
  openingHours?: string;
  website?: string;
  phone?: string;
  image?: string;
  icon?: string;
  price?: '€' | '€€' | '€€€' | '€€€€';
  rating?: number;
  accessibility?: {
    wheelchair: boolean;
    hearingLoop: boolean;
    guideDogs: boolean;
  };
  lastUpdated: string;
  realTimeData?: {
    isOpen?: boolean;
    waitTime?: number;
    crowdLevel?: 'low' | 'moderate' | 'high' | 'very-high';
  };
}

export type PoiType = 'attraction' | 'transport' | 'dining' | 'cycling';

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'rijksmuseum',
    name: 'Rijksmuseum',
    type: 'attraction',
    category: 'Museum',
    coordinates: [4.8852, 52.3600],
    description: 'Dutch national museum dedicated to arts and history in Amsterdam.',
    address: 'Museumstraat 1, 1071 XX Amsterdam',
    openingHours: '9:00 - 17:00 daily',
    website: 'https://www.rijksmuseum.nl',
    phone: '+31 20 674 7000',
    image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?q=80&w=800',
    icon: 'museum',
    price: '€€',
    rating: 4.7,
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      guideDogs: true
    },
    lastUpdated: '2023-11-15',
    realTimeData: {
      isOpen: true,
      waitTime: 15,
      crowdLevel: 'moderate'
    }
  },
  {
    id: 'anne-frank-house',
    name: 'Anne Frank House',
    type: 'attraction',
    category: 'Museum',
    coordinates: [4.8839, 52.3752],
    description: 'Biographical museum dedicated to Jewish wartime diarist Anne Frank.',
    address: 'Prinsengracht 263-267, 1016 GV Amsterdam',
    openingHours: '9:00 - 22:00 daily (Apr-Oct), 9:00 - 19:00 (Nov-Mar)',
    website: 'https://www.annefrank.org',
    phone: '+31 20 556 7105',
    image: 'https://images.unsplash.com/photo-1584632612827-b0088ef51521?q=80&w=800',
    icon: 'museum',
    price: '€€',
    rating: 4.8,
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      guideDogs: true
    },
    lastUpdated: '2023-11-10',
    realTimeData: {
      isOpen: true,
      waitTime: 25,
      crowdLevel: 'high'
    }
  },
  {
    id: 'vondelpark',
    name: 'Vondelpark',
    type: 'attraction',
    category: 'Park',
    coordinates: [4.8726, 52.3579],
    description: 'Urban public park of 47 hectares filled with gardens, ponds, playgrounds and more.',
    address: 'Vondelpark, 1071 Amsterdam',
    openingHours: '24 hours',
    image: 'https://images.unsplash.com/photo-1576615395947-ec875c21ce94?q=80&w=800',
    icon: 'park',
    rating: 4.6,
    accessibility: {
      wheelchair: true,
      hearingLoop: false,
      guideDogs: true
    },
    lastUpdated: '2023-10-28',
    realTimeData: {
      crowdLevel: 'moderate'
    }
  },
  {
    id: 'amsterdam-centraal',
    name: 'Amsterdam Centraal',
    type: 'transport',
    category: 'Train Station',
    coordinates: [4.9003, 52.3791],
    description: 'Central railway station of Amsterdam with connections to national and international destinations.',
    address: 'Stationsplein, 1012 AB Amsterdam',
    openingHours: '24 hours',
    website: 'https://www.ns.nl',
    icon: 'train',
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      guideDogs: true
    },
    lastUpdated: '2023-11-18',
    realTimeData: {
      isOpen: true,
      crowdLevel: 'high'
    }
  },
  {
    id: 'noord-zuidlijn',
    name: 'Noord/Zuidlijn - Line 52',
    type: 'transport',
    category: 'Metro',
    coordinates: [4.9077, 52.3745],
    description: 'North-South metro line connecting Amsterdam Noord to Amsterdam Zuid.',
    icon: 'metro',
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      guideDogs: true
    },
    lastUpdated: '2023-11-14'
  },
  {
    id: 'foodhallen',
    name: 'Foodhallen',
    type: 'dining',
    category: 'Food Market',
    coordinates: [4.8678, 52.3663],
    description: 'Indoor food market with various food stalls offering international cuisine.',
    address: 'Bellamyplein 51, 1053 AT Amsterdam',
    openingHours: '12:00 - 00:00 (Sun-Thu), 12:00 - 01:00 (Fri-Sat)',
    website: 'https://www.foodhallen.nl',
    phone: '+31 20 705 1645',
    image: 'https://images.unsplash.com/photo-1582226367288-41f7a3905ad7?q=80&w=800',
    icon: 'restaurant',
    price: '€€',
    rating: 4.5,
    accessibility: {
      wheelchair: true,
      hearingLoop: false,
      guideDogs: true
    },
    lastUpdated: '2023-11-05',
    realTimeData: {
      isOpen: true,
      crowdLevel: 'high'
    }
  },
  {
    id: 'brouwerij-t-ij',
    name: 'Brouwerij \'t IJ',
    type: 'dining',
    category: 'Brewery',
    coordinates: [4.9233, 52.3668],
    description: 'Organic brewery next to the De Gooyer windmill, offering craft beers and tours.',
    address: 'Funenkade 7, 1018 AL Amsterdam',
    openingHours: '14:00 - 20:00 daily',
    website: 'https://www.brouwerijhetij.nl',
    phone: '+31 20 320 1786',
    image: 'https://images.unsplash.com/photo-1580088203218-eda4dc802977?q=80&w=800',
    icon: 'beer',
    price: '€€',
    rating: 4.4,
    accessibility: {
      wheelchair: false,
      hearingLoop: false,
      guideDogs: true
    },
    lastUpdated: '2023-11-08',
    realTimeData: {
      isOpen: true,
      crowdLevel: 'moderate'
    }
  },
  {
    id: 'albert-cuyp-market',
    name: 'Albert Cuyp Market',
    type: 'attraction',
    category: 'Market',
    coordinates: [4.8939, 52.3559],
    description: 'The largest and most popular outdoor market in the Netherlands.',
    address: 'Albert Cuypstraat, 1073 BD Amsterdam',
    openingHours: '9:00 - 17:00 (Mon-Sat), Closed (Sun)',
    image: 'https://images.unsplash.com/photo-1555448203-2d98b67e9f6e?q=80&w=800',
    icon: 'shopping',
    rating: 4.3,
    accessibility: {
      wheelchair: true,
      hearingLoop: false,
      guideDogs: true
    },
    lastUpdated: '2023-11-12',
    realTimeData: {
      isOpen: true,
      crowdLevel: 'high'
    }
  },
  {
    id: 'bike-rental-central',
    name: 'Amsterdam Bike Rental',
    type: 'cycling',
    category: 'Bike Rental',
    coordinates: [4.8927, 52.3749],
    description: 'Bike rental service offering city bikes, e-bikes, and tandems.',
    address: 'Damrak 247, 1012 ZJ Amsterdam',
    openingHours: '9:00 - 18:00 daily',
    website: 'https://www.amsterdambikerental.com',
    phone: '+31 20 123 4567',
    icon: 'bike',
    price: '€',
    accessibility: {
      wheelchair: true,
      hearingLoop: false,
      guideDogs: true
    },
    lastUpdated: '2023-11-16'
  },
  {
    id: 'ferry-amsterdam-noord',
    name: 'Amsterdam-Noord Ferry Terminal',
    type: 'transport',
    category: 'Ferry',
    coordinates: [4.9012, 52.3833],
    description: 'Free ferry service connecting Amsterdam Central Station with Amsterdam Noord.',
    icon: 'ferry',
    accessibility: {
      wheelchair: true,
      hearingLoop: false,
      guideDogs: true
    },
    lastUpdated: '2023-11-17',
    realTimeData: {
      isOpen: true
    }
  }
];

// Function to filter POIs by type
export function filterPOIsByType(type: PoiType | 'all'): PointOfInterest[] {
  if (type === 'all') return pointsOfInterest;
  return pointsOfInterest.filter(poi => poi.type === type);
}

// Function to filter POIs by search term
export function searchPOIs(term: string): PointOfInterest[] {
  const searchTerm = term.toLowerCase();
  return pointsOfInterest.filter(poi => 
    poi.name.toLowerCase().includes(searchTerm) || 
    poi.description.toLowerCase().includes(searchTerm) || 
    poi.category.toLowerCase().includes(searchTerm)
  );
}

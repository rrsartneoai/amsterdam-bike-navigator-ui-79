
export interface Brand {
  id: string;
  name: string;
  domain: string;
  logo: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  description: string;
  tagline: string;
  priceMultiplier: number;
  theme: {
    // CSS variables for complete theming
    colors: {
      primary: string;
      primaryForeground: string;
      secondary: string;
      secondaryForeground: string;
      accent: string;
      accentForeground: string;
      muted: string;
      mutedForeground: string;
      background: string;
      foreground: string;
      card: string;
      cardForeground: string;
      border: string;
      input: string;
      ring: string;
    };
    gradients: {
      primary: string;
      hero: string;
      card: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    favicon?: string;
  };
}

export const brands: Record<string, Brand> = {
  pismoodkomornika: {
    id: 'pismoodkomornika',
    name: 'Pismo od Komornika',
    domain: 'pismoodkomornika.pl',
    logo: '⚖️ Pismo od Komornika',
    primaryColor: '#dc2626',
    secondaryColor: '#991b1b',
    accentColor: '#fca5a5',
    backgroundColor: '#fef2f2',
    textColor: '#1f2937',
    description: 'Specjalistyczna pomoc przy pismach od komorników',
    tagline: 'Otrzymałeś pismo od komornika? Pomożemy Ci!',
    priceMultiplier: 0.8,
    theme: {
      colors: {
        primary: '0 84% 60%', // red-500
        primaryForeground: '0 0% 98%',
        secondary: '0 84% 35%', // red-700
        secondaryForeground: '0 0% 98%',
        accent: '0 93% 94%', // red-50
        accentForeground: '0 84% 15%',
        muted: '0 93% 94%',
        mutedForeground: '0 15% 50%',
        background: '0 0% 100%',
        foreground: '0 0% 15%',
        card: '0 0% 100%',
        cardForeground: '0 0% 15%',
        border: '0 84% 90%',
        input: '0 84% 90%',
        ring: '0 84% 60%'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        hero: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)',
        card: 'linear-gradient(145deg, rgba(220, 38, 38, 0.05) 0%, rgba(153, 27, 27, 0.1) 100%)'
      },
      fonts: {
        heading: '"Inter", "Segoe UI", sans-serif',
        body: '"Inter", "Segoe UI", sans-serif'
      }
    },
    meta: {
      title: 'Pismo od Komornika - Profesjonalna pomoc prawna',
      description: 'Otrzymałeś pismo od komornika? Uzyskaj profesjonalną analizę i pomoc. Szybko, bezpiecznie, skutecznie.',
      keywords: ['komornik', 'pismo', 'pomoc prawna', 'egzekucja', 'analiza', 'prawnik']
    }
  },
  pismzsadu: {
    id: 'pismzsadu',
    name: 'Pismo z Sądu',
    domain: 'pismzsadu.pl',
    logo: '🏛️ Pismo z Sądu',
    primaryColor: '#1d4ed8',
    secondaryColor: '#1e3a8a',
    accentColor: '#93c5fd',
    backgroundColor: '#eff6ff',
    textColor: '#1f2937',
    description: 'Profesjonalna analiza pism sądowych',
    tagline: 'Pismo z sądu? Nie zostawiaj tego przypadkowi!',
    priceMultiplier: 0.9,
    theme: {
      colors: {
        primary: '217 91% 60%', // blue-500
        primaryForeground: '0 0% 98%',
        secondary: '217 91% 35%', // blue-700
        secondaryForeground: '0 0% 98%',
        accent: '214 100% 97%', // blue-50
        accentForeground: '217 91% 15%',
        muted: '214 100% 97%',
        mutedForeground: '217 15% 50%',
        background: '0 0% 100%',
        foreground: '0 0% 15%',
        card: '0 0% 100%',
        cardForeground: '0 0% 15%',
        border: '217 91% 90%',
        input: '217 91% 90%',
        ring: '217 91% 60%'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
        hero: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
        card: 'linear-gradient(145deg, rgba(29, 78, 216, 0.05) 0%, rgba(30, 58, 138, 0.1) 100%)'
      },
      fonts: {
        heading: '"Inter", "Segoe UI", sans-serif',
        body: '"Inter", "Segoe UI", sans-serif'
      }
    },
    meta: {
      title: 'Pismo z Sądu - Analiza dokumentów sądowych',
      description: 'Otrzymałeś pismo z sądu? Profesjonalna analiza i doradztwo prawne. Reaguj szybko i skutecznie.',
      keywords: ['sąd', 'pismo sądowe', 'postępowanie', 'analiza', 'prawnik', 'pomoc prawna']
    }
  },
  prawnikpl: {
    id: 'prawnikpl',
    name: 'Prawnik.PL',
    domain: 'prawnik.pl',
    logo: '🤖 Prawnik.PL',
    primaryColor: '#0f172a',
    secondaryColor: '#1e293b',
    accentColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    textColor: '#0f172a',
    description: 'Nowoczesna kancelaria prawna AI - profesjonalne analizy i pisma',
    tagline: 'Sztuczna inteligencja w służbie prawa',
    priceMultiplier: 1.2,
    theme: {
      colors: {
        primary: '222 84% 5%', // slate-900
        primaryForeground: '210 40% 98%',
        secondary: '215 28% 17%', // slate-800
        secondaryForeground: '210 40% 98%',
        accent: '210 40% 96%', // slate-100
        accentForeground: '222 84% 5%',
        muted: '210 40% 96%',
        mutedForeground: '215 16% 47%',
        background: '0 0% 100%',
        foreground: '222 84% 5%',
        card: '0 0% 100%',
        cardForeground: '222 84% 5%',
        border: '214 32% 91%',
        input: '214 32% 91%',
        ring: '222 84% 5%'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        hero: 'linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%)',
        card: 'linear-gradient(145deg, rgba(15, 23, 42, 0.05) 0%, rgba(30, 41, 59, 0.1) 100%)'
      },
      fonts: {
        heading: '"Inter", "Segoe UI", sans-serif',
        body: '"Inter", "Segoe UI", sans-serif'
      }
    },
    meta: {
      title: 'Prawnik.PL - AI w służbie prawa',
      description: 'Nowoczesna kancelaria prawna wykorzystująca sztuczną inteligencję. Profesjonalne analizy i pisma prawne.',
      keywords: ['prawnik', 'AI', 'sztuczna inteligencja', 'kancelaria', 'analiza prawna', 'pisma']
    }
  },
  kancelaria: {
    id: 'kancelaria',
    name: 'Kancelaria Online',
    domain: 'kancelaria-online.pl',
    logo: '💼 Kancelaria Online',
    primaryColor: '#059669',
    secondaryColor: '#047857',
    accentColor: '#a7f3d0',
    backgroundColor: '#ecfdf5',
    textColor: '#1f2937',
    description: 'Internetowa kancelaria prawna nowej generacji',
    tagline: 'Szybka i fachowa pomoc prawna online',
    priceMultiplier: 1.0,
    theme: {
      colors: {
        primary: '158 64% 52%', // emerald-500
        primaryForeground: '0 0% 98%',
        secondary: '158 64% 32%', // emerald-700
        secondaryForeground: '0 0% 98%',
        accent: '152 81% 96%', // emerald-50
        accentForeground: '158 64% 15%',
        muted: '152 81% 96%',
        mutedForeground: '158 15% 50%',
        background: '0 0% 100%',
        foreground: '0 0% 15%',
        card: '0 0% 100%',
        cardForeground: '0 0% 15%',
        border: '158 64% 90%',
        input: '158 64% 90%',
        ring: '158 64% 52%'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        hero: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
        card: 'linear-gradient(145deg, rgba(5, 150, 105, 0.05) 0%, rgba(4, 120, 87, 0.1) 100%)'
      },
      fonts: {
        heading: '"Inter", "Segoe UI", sans-serif',
        body: '"Inter", "Segoe UI", sans-serif'
      }
    },
    meta: {
      title: 'Kancelaria Online - Pomoc prawna przez internet',
      description: 'Internetowa kancelaria prawna nowej generacji. Szybka i profesjonalna pomoc prawna online.',
      keywords: ['kancelaria online', 'pomoc prawna', 'internet', 'prawnik online', 'doradztwo']
    }
  }
};

// Funkcja do wykrywania marki na podstawie domeny
export const getCurrentBrand = (): Brand => {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return brands.prawnikpl;
  }

  const hostname = window.location.hostname.toLowerCase();
  
  // Dokładne dopasowanie domeny
  for (const brand of Object.values(brands)) {
    if (hostname === brand.domain.toLowerCase()) {
      return brand;
    }
  }
  
  // Dopasowanie przez ID marki w subdomenie lub nazwie hosta
  for (const brand of Object.values(brands)) {
    if (hostname.includes(brand.id)) {
      return brand;
    }
  }
  
  // Dopasowanie dla środowisk deweloperskich (localhost, preview URLs)
  if (hostname.includes('localhost') || hostname.includes('lovable')) {
    // Sprawdź czy jest parametr ?brand= w URL
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    if (brandParam && brands[brandParam]) {
      return brands[brandParam];
    }
    
    // Sprawdź czy subdomena zawiera nazwę marki
    const subdomain = hostname.split('.')[0];
    for (const brand of Object.values(brands)) {
      if (subdomain.includes(brand.id)) {
        return brand;
      }
    }
  }
  
  // Domyślny brand - Prawnik.PL
  console.log(`🔍 Hostname: ${hostname} - using default brand: prawnikpl`);
  return brands.prawnikpl;
};

// Funkcja pomocnicza do logowania informacji o marce
export const logBrandInfo = (brand: Brand) => {
  console.log(`🎨 Brand loaded: ${brand.name}`, {
    id: brand.id,
    domain: brand.domain,
    hostname: window.location.hostname,
    theme: brand.theme.colors.primary
  });
};

// Funkcja do ustawiania marki przez parametr URL (do testowania)
export const setBrandFromURL = (): Brand | null => {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get('brand');
  
  if (brandParam && brands[brandParam]) {
    console.log(`🔄 Brand set from URL parameter: ${brandParam}`);
    return brands[brandParam];
  }
  
  return null;
};

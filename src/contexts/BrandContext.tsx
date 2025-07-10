
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Brand, getCurrentBrand, logBrandInfo, setBrandFromURL, brands } from '@/config/brands';

interface BrandContextType {
  currentBrand: Brand;
  updateBrand: (brandId: string) => void;
  switchToBrand: (brandId: string) => void;
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand>(getCurrentBrand());
  const [isLoading, setIsLoading] = useState(false);

  // Funkcja do aplikowania motywu marki
  const applyBrandTheme = (brand: Brand) => {
    const root = document.documentElement;
    
    // Podstawowe kolory marki (legacy)
    root.style.setProperty('--brand-primary', brand.primaryColor);
    root.style.setProperty('--brand-secondary', brand.secondaryColor);
    root.style.setProperty('--brand-accent', brand.accentColor);
    root.style.setProperty('--brand-background', brand.backgroundColor);
    root.style.setProperty('--brand-text', brand.textColor);
    
    // Pełny system kolorów z motywu
    Object.entries(brand.theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Gradienty
    Object.entries(brand.theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });
    
    // Fonty
    root.style.setProperty('--font-heading', brand.theme.fonts.heading);
    root.style.setProperty('--font-body', brand.theme.fonts.body);
    
    // Meta dane strony
    document.title = brand.meta.title;
    
    // Aktualizuj meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', brand.meta.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = brand.meta.description;
      document.head.appendChild(meta);
    }
    
    // Aktualizuj meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', brand.meta.keywords.join(', '));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = brand.meta.keywords.join(', ');
      document.head.appendChild(meta);
    }
    
    logBrandInfo(brand);
  };

  useEffect(() => {
    // Sprawdź czy jest ustawiona marka przez parametr URL
    const urlBrand = setBrandFromURL();
    if (urlBrand) {
      setCurrentBrand(urlBrand);
    }
    
    applyBrandTheme(currentBrand);
  }, [currentBrand]);

  const updateBrand = (brandId: string) => {
    if (brands[brandId]) {
      console.log(`🔄 Updating brand to: ${brandId}`);
      setCurrentBrand(brands[brandId]);
    } else {
      console.warn(`❌ Brand not found: ${brandId}`);
    }
  };

  const switchToBrand = (brandId: string) => {
    if (brands[brandId]) {
      setIsLoading(true);
      
      // Symulacja ładowania (w rzeczywistej aplikacji byłaby logika zmiany domeny)
      setTimeout(() => {
        setCurrentBrand(brands[brandId]);
        setIsLoading(false);
        
        // Opcjonalnie: dodaj parametr do URL do testowania
        const url = new URL(window.location.href);
        url.searchParams.set('brand', brandId);
        window.history.replaceState({}, '', url.toString());
        
        console.log(`✅ Switched to brand: ${brandId}`);
      }, 300);
    }
  };

  return (
    <BrandContext.Provider value={{ 
      currentBrand, 
      updateBrand, 
      switchToBrand, 
      isLoading 
    }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

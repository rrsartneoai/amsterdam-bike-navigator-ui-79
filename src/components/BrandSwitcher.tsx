import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useBrand } from '@/contexts/BrandContext';
import { brands } from '@/config/brands';

export const BrandSwitcher = () => {
  const { currentBrand, switchToBrand, isLoading } = useBrand();

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎨 Brand Switcher
          <Badge variant="outline">{currentBrand.name}</Badge>
        </CardTitle>
        <CardDescription>
          Przetestuj różne marki. Obecny: {currentBrand.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Hostname:</span>
            <code className="bg-muted px-2 py-1 rounded">
              {typeof window !== 'undefined' ? window.location.hostname : 'server'}
            </code>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {Object.values(brands).map((brand) => (
              <Button
                key={brand.id}
                variant={currentBrand.id === brand.id ? "default" : "outline"}
                size="sm"
                onClick={() => switchToBrand(brand.id)}
                disabled={isLoading || currentBrand.id === brand.id}
                className="text-xs justify-start"
              >
                {isLoading && currentBrand.id !== brand.id ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  <span className="mr-1">{brand.logo.split(' ')[0]}</span>
                )}
                {brand.name}
              </Button>
            ))}
          </div>
          
          <div className="text-xs space-y-1">
            <p><strong>Tagline:</strong> {currentBrand.tagline}</p>
            <p><strong>Mnożnik ceny:</strong> {currentBrand.priceMultiplier}x</p>
            <p><strong>Kolory:</strong> 
              <span 
                className="inline-block w-4 h-4 rounded ml-2 mr-1" 
                style={{ backgroundColor: currentBrand.primaryColor }}
              />
              <span 
                className="inline-block w-4 h-4 rounded" 
                style={{ backgroundColor: currentBrand.secondaryColor }}
              />
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>💡 Tip: Dodaj <code>?brand=brandId</code> do URL, żeby przetestować konkretną markę</p>
            <p>Np: <code>?brand=pismoodkomornika</code></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
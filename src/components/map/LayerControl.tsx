
import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, Bus, Bike, MapPin, FerrisWheel, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActiveLayer } from './InteractiveMap';
import { cn } from '@/lib/utils';

interface LayerControlProps {
  layers: ActiveLayer[];
  onToggleLayer: (layerId: string) => void;
}

export function LayerControl({ layers, onToggleLayer }: LayerControlProps) {
  const [expanded, setExpanded] = useState(true);

  const getIcon = (layerId: string) => {
    switch (layerId) {
      case 'transport':
        return <Bus className="h-4 w-4" />;
      case 'cycling':
        return <Bike className="h-4 w-4" />;
      case 'water':
        return <FerrisWheel className="h-4 w-4" />;
      case 'accessibility':
        return <Accessibility className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getLabel = (layerId: string) => {
    switch (layerId) {
      case 'transport':
        return 'Public Transport';
      case 'cycling':
        return 'Cycling';
      case 'water':
        return 'Canals & Water';
      case 'accessibility':
        return 'Accessibility';
      default:
        return layerId;
    }
  };

  if (!expanded) {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="glass-morphism h-10 w-10"
        onClick={() => setExpanded(true)}
      >
        <Layers className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="glass-morphism p-3 rounded-lg shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Layers className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-medium">Map Layers</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setExpanded(false)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-1">
        {layers.map((layer) => (
          <Button
            key={layer.id}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start text-left font-normal",
              layer.enabled ? "bg-secondary/50" : "opacity-70"
            )}
            onClick={() => onToggleLayer(layer.id)}
          >
            <div className="flex items-center">
              {getIcon(layer.id)}
              <span className="ml-2">{getLabel(layer.id)}</span>
            </div>
            {layer.enabled ? (
              <span className="ml-auto h-4 w-4 rounded-full bg-primary/30 border-2 border-primary"></span>
            ) : (
              <span className="ml-auto h-4 w-4 rounded-full border-2 border-muted-foreground/30"></span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

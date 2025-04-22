import React from 'react';
import { X, ExternalLink, MapPin, Clock, Phone, Globe, Accessibility, Ear } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PointOfInterest } from '@/data/pointsOfInterest';
import { cn } from '@/lib/utils';

interface InfoPanelProps {
  poi: PointOfInterest;
  onClose: () => void;
}

const InfoPanel = ({ poi, onClose }: InfoPanelProps) => {
  return (
    <div className="glass-morphism rounded-lg shadow-lg overflow-hidden animate-fade-in">
      {/* Header with image if available */}
      {poi.image ? (
        <div className="relative h-40">
          <img 
            src={poi.image} 
            alt={poi.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/30 hover:bg-white/50 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="absolute bottom-3 left-3 text-white">
            <h2 className="text-xl font-bold">{poi.name}</h2>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-white/20 text-white border-none">
                {poi.category}
              </Badge>
              {poi.price && (
                <Badge variant="outline" className="ml-2 bg-white/20 text-white border-none">
                  {poi.price}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 pr-12 relative bg-primary text-primary-foreground">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 hover:bg-white/10 text-primary-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">{poi.name}</h2>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
              {poi.category}
            </Badge>
            {poi.price && (
              <Badge variant="outline" className="ml-2 border-primary-foreground/30 text-primary-foreground">
                {poi.price}
              </Badge>
            )}
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="p-4">
        {/* Description */}
        <p className="text-sm">{poi.description}</p>
        
        {/* Real-time data */}
        {poi.realTimeData && (
          <div className="mt-3 p-2 bg-secondary/50 rounded-md">
            <h3 className="text-sm font-medium mb-1">Current Status</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {poi.realTimeData.isOpen !== undefined && (
                <div className={`flex items-center ${poi.realTimeData.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${poi.realTimeData.isOpen ? 'bg-green-600' : 'bg-red-600'}`} />
                  {poi.realTimeData.isOpen ? 'Open now' : 'Closed'}
                </div>
              )}
              
              {poi.realTimeData.waitTime !== undefined && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{poi.realTimeData.waitTime} min wait</span>
                </div>
              )}
              
              {poi.realTimeData.crowdLevel && (
                <div className={cn(
                  "flex items-center col-span-2",
                  poi.realTimeData.crowdLevel === 'low' && "text-green-600",
                  poi.realTimeData.crowdLevel === 'moderate' && "text-amber-600",
                  (poi.realTimeData.crowdLevel === 'high' || poi.realTimeData.crowdLevel === 'very-high') && "text-red-600"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-1",
                    poi.realTimeData.crowdLevel === 'low' && "bg-green-600",
                    poi.realTimeData.crowdLevel === 'moderate' && "bg-amber-600",
                    (poi.realTimeData.crowdLevel === 'high' || poi.realTimeData.crowdLevel === 'very-high') && "bg-red-600"
                  )} />
                  Crowd level: {poi.realTimeData.crowdLevel.replace('-', ' ')}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Details */}
        <div className="mt-3 space-y-2 text-sm">
          {poi.address && (
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
              <span>{poi.address}</span>
            </div>
          )}
          
          {poi.openingHours && (
            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
              <span>{poi.openingHours}</span>
            </div>
          )}
          
          {poi.phone && (
            <div className="flex items-start">
              <Phone className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
              <a href={`tel:${poi.phone}`} className="text-primary hover:underline">{poi.phone}</a>
            </div>
          )}
          
          {poi.website && (
            <div className="flex items-start">
              <Globe className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
              <a 
                href={poi.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline flex items-center"
              >
                Visit website <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          )}
        </div>
        
        {/* Accessibility information */}
        {poi.accessibility && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Accessibility</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`flex items-center ${poi.accessibility.wheelchair ? 'text-green-600' : 'text-red-600'}`}>
                <Accessibility className="h-4 w-4 mr-1" />
                {poi.accessibility.wheelchair ? 'Wheelchair access' : 'No wheelchair access'}
              </div>
              
              <div className={`flex items-center ${poi.accessibility.hearingLoop ? 'text-green-600' : 'text-red-600'}`}>
                <Ear className="h-4 w-4 mr-1" />
                {poi.accessibility.hearingLoop ? 'Hearing loop' : 'No hearing loop'}
              </div>
              
              <div className={`flex items-center ${poi.accessibility.guideDogs ? 'text-green-600' : 'text-red-600'}`}>
                <span>🦮</span>
                <span className="ml-1">{poi.accessibility.guideDogs ? 'Guide dogs welcome' : 'No guide dogs'}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Last updated info */}
        <div className="mt-4 text-xs text-muted-foreground">
          Last updated: {poi.lastUpdated}
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-3 border-t flex gap-2">
        <Button variant="default" className="flex-1">Get Directions</Button>
        <Button variant="outline" className="flex-1">Share</Button>
      </div>
    </div>
  );
};

export default InfoPanel;


import React, { useRef, useEffect, useState } from 'react';
import maplibregl, { Map, Marker, Popup } from 'maplibre-gl';
import { AMSTERDAM_CENTER, createMapLayers } from '@/data/mapLayers';
import { PointOfInterest, pointsOfInterest } from '@/data/pointsOfInterest';
import { POIPopup } from './POIPopup';
import { SearchBar } from './SearchBar';
import { LayerControl } from './LayerControl';
import InfoPanel from './InfoPanel';  // Changed from { InfoPanel } to default import
import { useToast } from '@/components/ui/use-toast';

export interface ActiveLayer {
  id: string;
  enabled: boolean;
}

interface InteractiveMapProps {
  className?: string;
}

export function InteractiveMap({ className }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markersRef = useRef<{ [id: string]: Marker }>({});
  const popupRef = useRef<Popup | null>(null);
  
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  const [activeLayers, setActiveLayers] = useState<ActiveLayer[]>([
    { id: 'transport', enabled: true },
    { id: 'cycling', enabled: true },
    { id: 'water', enabled: true },
    { id: 'accessibility', enabled: false }
  ]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { toast } = useToast();

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: AMSTERDAM_CENTER,
      zoom: 13,
      minZoom: 10,
      maxZoom: 18,
      pitch: 0,
      attributionControl: false
    });

    // Add controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'top-right');
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-left');
    map.current.addControl(new maplibregl.AttributionControl({
      compact: true
    }), 'bottom-right');

    // Map load event
    map.current.on('load', () => {
      setMapLoaded(true);
      
      toast({
        title: "Map loaded successfully",
        description: "You can now explore Amsterdam's attractions, transport routes, and more.",
        duration: 5000
      });
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [toast]);

  // Add layers to map once loaded
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Add map layers
    const layers = createMapLayers();
    layers.forEach(layer => {
      if (!map.current!.getLayer(layer.id)) {
        map.current!.addLayer(layer);
      }
    });

    // Update layer visibility based on active layers
    activeLayers.forEach(layer => {
      const groupLayers = layers.filter(l => l.id.includes(layer.id));
      groupLayers.forEach(l => {
        if (map.current!.getLayer(l.id)) {
          map.current!.setLayoutProperty(
            l.id,
            'visibility',
            layer.enabled ? 'visible' : 'none'
          );
        }
      });
    });
  }, [mapLoaded, activeLayers]);

  // Add markers for points of interest
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Filter POIs by active layers
    const visiblePOIs = pointsOfInterest.filter(poi => {
      const layerId = poi.type;
      return activeLayers.find(layer => layer.id === layerId)?.enabled;
    });

    // Add markers
    visiblePOIs.forEach(poi => {
      const el = document.createElement('div');
      el.className = `marker marker-${poi.type} relative`;
      
      // Add icon if available
      if (poi.icon) {
        el.innerHTML = `<span class="text-xs font-bold">${poi.icon.charAt(0).toUpperCase()}</span>`;
      }

      // Add real-time indicator if crowded
      if (poi.realTimeData?.crowdLevel === 'high' || poi.realTimeData?.crowdLevel === 'very-high') {
        el.classList.add('pulse');
      }

      const marker = new maplibregl.Marker(el)
        .setLngLat(poi.coordinates)
        .addTo(map.current!);

      // Add click event
      marker.getElement().addEventListener('click', () => {
        setSelectedPOI(poi);
        
        if (popupRef.current) {
          popupRef.current.remove();
        }
        
        popupRef.current = new maplibregl.Popup({
          closeButton: true,
          closeOnClick: false,
          maxWidth: '300px'
        })
          .setLngLat(poi.coordinates)
          .setDOMContent(POIPopup(poi))
          .addTo(map.current!);
          
        // Center map on marker
        map.current!.flyTo({
          center: poi.coordinates,
          zoom: 15,
          speed: 1.2
        });
      });

      markersRef.current[poi.id] = marker;
    });

    // Popup close handler
    if (map.current) {
      map.current.on('click', () => {
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
          setSelectedPOI(null);
        }
      });
    }

    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, [mapLoaded, activeLayers]);

  // Toggle layer visibility
  const toggleLayer = (layerId: string) => {
    setActiveLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  // Search and go to POI
  const handleSearch = (poi: PointOfInterest) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: poi.coordinates,
      zoom: 16,
      speed: 1.5
    });

    setSelectedPOI(poi);
    
    if (popupRef.current) {
      popupRef.current.remove();
    }
    
    popupRef.current = new maplibregl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: '300px'
    })
      .setLngLat(poi.coordinates)
      .setDOMContent(POIPopup(poi))
      .addTo(map.current);
      
    // Highlight marker
    const marker = markersRef.current[poi.id];
    if (marker) {
      marker.getElement().classList.add('scale-125');
      setTimeout(() => {
        marker.getElement().classList.remove('scale-125');
      }, 1500);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapContainer} className="map-container" />
      
      {/* Search bar */}
      <div className="absolute top-4 left-0 right-0 mx-auto w-full max-w-md px-4 z-10">
        <SearchBar onSelectPOI={handleSearch} />
      </div>
      
      {/* Layer control */}
      <div className="absolute top-20 left-4 z-10">
        <LayerControl 
          layers={activeLayers}
          onToggleLayer={toggleLayer}
        />
      </div>
      
      {/* Info panel */}
      {selectedPOI && (
        <div className="absolute right-4 bottom-4 z-10 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <InfoPanel 
            poi={selectedPOI}
            onClose={() => {
              setSelectedPOI(null);
              if (popupRef.current) {
                popupRef.current.remove();
                popupRef.current = null;
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

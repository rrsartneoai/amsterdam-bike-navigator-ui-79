
import { LayerSpecification } from 'maplibre-gl';

export interface MapLayerGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  layers: MapLayer[];
  enabled: boolean;
}

export interface MapLayer {
  id: string;
  name: string;
  source: string;
  sourceLayer?: string;
  type: 'line' | 'fill' | 'symbol' | 'circle' | 'heatmap';
  paint: any;
  layout?: any;
  filter?: any[];
  minzoom?: number;
  maxzoom?: number;
}

// Amsterdam center coordinates
export const AMSTERDAM_CENTER: [number, number] = [4.9041, 52.3676];

// Layer groups for the map
export const mapLayerGroups: MapLayerGroup[] = [
  {
    id: 'transport',
    name: 'Public Transport',
    description: 'Buses, trams, metro, and ferries',
    icon: 'bus',
    enabled: true,
    layers: [
      {
        id: 'tram-routes',
        name: 'Tram Routes',
        source: 'openmaptiles',
        sourceLayer: 'transportation',
        type: 'line',
        filter: ['==', 'class', 'transit'],
        paint: {
          'line-color': '#EC0000',
          'line-width': 2,
          'line-opacity': 0.8
        },
        minzoom: 12
      },
      {
        id: 'metro-routes',
        name: 'Metro Lines',
        source: 'openmaptiles',
        sourceLayer: 'transportation',
        type: 'line',
        filter: ['==', 'class', 'subway'],
        paint: {
          'line-color': '#004699',
          'line-width': 3,
          'line-opacity': 0.8
        },
        minzoom: 11
      },
      {
        id: 'ferry-routes',
        name: 'Ferry Routes',
        source: 'openmaptiles',
        sourceLayer: 'transportation',
        type: 'line',
        filter: ['==', 'class', 'ferry'],
        paint: {
          'line-color': '#00A03C',
          'line-width': {
            'base': 1.4,
            'stops': [[8, 1], [14, 2]]
          },
          'line-dasharray': [2, 2],
          'line-opacity': 0.7
        }
      }
    ]
  },
  {
    id: 'cycling',
    name: 'Cycling',
    description: 'Bike paths, rental stations, and parking',
    icon: 'bike',
    enabled: true,
    layers: [
      {
        id: 'cycling-paths',
        name: 'Bicycle Paths',
        source: 'openmaptiles',
        sourceLayer: 'transportation',
        type: 'line',
        filter: ['==', 'class', 'path'],
        paint: {
          'line-color': '#00A03C',
          'line-width': {
            'base': 1.4,
            'stops': [[10, 1], [16, 2.5]]
          },
          'line-opacity': 0.8
        },
        minzoom: 13
      },
      {
        id: 'cycling-lanes',
        name: 'Bicycle Lanes',
        source: 'openmaptiles',
        sourceLayer: 'transportation',
        type: 'line',
        filter: ['==', 'subclass', 'cycleway'],
        paint: {
          'line-color': '#00A03C',
          'line-width': {
            'base': 1.4,
            'stops': [[10, 1.5], [16, 3]]
          },
          'line-opacity': 0.8
        },
        minzoom: 12
      }
    ]
  },
  {
    id: 'water',
    name: 'Canals & Water',
    description: 'Canals, waterways, and boat routes',
    icon: 'ferry-front',
    enabled: true,
    layers: [
      {
        id: 'canals',
        name: 'Canals',
        source: 'openmaptiles',
        sourceLayer: 'waterway',
        type: 'line',
        paint: {
          'line-color': '#004699',
          'line-width': {
            'base': 1.4,
            'stops': [[8, 1], [14, 4]]
          },
          'line-opacity': 0.8
        }
      },
      {
        id: 'water-bodies',
        name: 'Water',
        source: 'openmaptiles',
        sourceLayer: 'water',
        type: 'fill',
        paint: {
          'fill-color': 'rgba(0, 70, 153, 0.4)'
        }
      }
    ]
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Wheelchair access, hearing loops, and more',
    icon: 'wheelchair',
    enabled: false,
    layers: [] // To be populated with data from API
  }
];

// Convert layer groups to MapLibre layer specifications
export function createMapLayers(): LayerSpecification[] {
  const layers: LayerSpecification[] = [];
  
  mapLayerGroups.forEach(group => {
    if (group.enabled) {
      group.layers.forEach(layer => {
        layers.push({
          id: layer.id,
          type: layer.type,
          source: layer.source,
          'source-layer': layer.sourceLayer,
          paint: layer.paint,
          layout: layer.layout || {},
          filter: layer.filter,
          minzoom: layer.minzoom,
          maxzoom: layer.maxzoom
        } as LayerSpecification);
      });
    }
  });
  
  return layers;
}

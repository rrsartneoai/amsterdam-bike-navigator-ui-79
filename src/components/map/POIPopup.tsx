
import React from 'react';
import { PointOfInterest } from '@/data/pointsOfInterest';

export function POIPopup(poi: PointOfInterest): HTMLElement {
  const popup = document.createElement('div');
  popup.className = 'p-1';
  
  const content = document.createElement('div');
  content.className = 'flex flex-col';
  
  // POI header
  const header = document.createElement('div');
  header.className = 'mb-1 font-bold';
  header.textContent = poi.name;
  
  // POI category
  const category = document.createElement('div');
  category.className = 'text-xs text-gray-600 dark:text-gray-300 mb-1';
  category.textContent = poi.category;
  
  // Real-time data if available
  if (poi.realTimeData) {
    const realTime = document.createElement('div');
    realTime.className = 'text-xs';
    
    if (poi.realTimeData.isOpen !== undefined) {
      const openStatus = document.createElement('span');
      openStatus.className = poi.realTimeData.isOpen 
        ? 'text-green-600 dark:text-green-400' 
        : 'text-red-600 dark:text-red-400';
      openStatus.textContent = poi.realTimeData.isOpen ? 'Open now' : 'Closed';
      realTime.appendChild(openStatus);
    }
    
    if (poi.realTimeData.waitTime) {
      const waitTime = document.createElement('span');
      waitTime.className = 'ml-2 text-amber-600 dark:text-amber-400';
      waitTime.textContent = `${poi.realTimeData.waitTime} min wait`;
      realTime.appendChild(waitTime);
    }
    
    if (poi.realTimeData.crowdLevel) {
      const crowdLevel = document.createElement('div');
      crowdLevel.className = 'text-xs mt-1';
      
      let crowdClass = '';
      switch (poi.realTimeData.crowdLevel) {
        case 'low':
          crowdClass = 'text-green-600 dark:text-green-400';
          break;
        case 'moderate':
          crowdClass = 'text-amber-600 dark:text-amber-400';
          break;
        case 'high':
        case 'very-high':
          crowdClass = 'text-red-600 dark:text-red-400';
          break;
      }
      
      crowdLevel.className += ` ${crowdClass}`;
      crowdLevel.textContent = `Crowd level: ${poi.realTimeData.crowdLevel.replace('-', ' ')}`;
      realTime.appendChild(crowdLevel);
    }
    
    content.appendChild(realTime);
  }
  
  // Opening hours
  if (poi.openingHours) {
    const hours = document.createElement('div');
    hours.className = 'text-xs mt-1';
    hours.textContent = poi.openingHours;
    content.appendChild(hours);
  }
  
  // Click for more info
  const moreInfo = document.createElement('div');
  moreInfo.className = 'text-xs mt-2 text-primary font-medium';
  moreInfo.textContent = 'Click for more details →';
  
  // Assemble popup
  content.appendChild(header);
  content.appendChild(category);
  content.appendChild(moreInfo);
  popup.appendChild(content);
  
  return popup;
}

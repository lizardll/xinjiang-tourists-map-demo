import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Clock, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { itinerary } from '../data/travelData';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Attraction {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  day: number;
  type: 'city' | 'scenic' | 'lake' | 'mountain' | 'village';
  description: string;
  highlights: string[];
  image: string;
  duration: string;
}

interface InteractiveMapProps {
  attractions: Attraction[];
  selectedDay: number | null;
  onSelectDay: (day: number | null) => void;
}

// Custom marker icons with offset to avoid overlap
const createCustomIcon = (color: string, type: string, offsetX: number = 0, offsetY: number = 0): L.DivIcon => {
  const iconHtml = `
    <div style="
      background: linear-gradient(135deg, ${color}, ${color}dd);
      width: 40px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="transform: rotate(45deg); color: white; font-size: 18px; font-weight: bold;">
        ${type === 'city' ? '🏙️' : type === 'lake' ? '💧' : type === 'mountain' ? '⛰️' : type === 'village' ? '🏘️' : '📸'}
      </div>
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20 + offsetX, 40 + offsetY],
    popupAnchor: [0, -40],
  });
};

// Create arrow icon for direction
const createArrowIcon = (color: string, rotation: number): L.DivIcon => {
  const arrowHtml = `
    <div style="
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 16px solid ${color};
      transform: rotate(${rotation}deg);
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    "></div>
  `;
  
  return L.divIcon({
    html: arrowHtml,
    className: 'arrow-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Calculate distance between two points using Haversine formula (in kilometers)
const calculateDistance = (start: [number, number], end: [number, number]): number => {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = start[0] * Math.PI / 180;
  const lat2 = end[0] * Math.PI / 180;
  const dLat = (end[0] - start[0]) * Math.PI / 180;
  const dLon = (end[1] - start[1]) * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
};

// Calculate bearing between two points
const calculateBearing = (start: [number, number], end: [number, number]): number => {
  const startLat = start[0] * Math.PI / 180;
  const startLng = start[1] * Math.PI / 180;
  const endLat = end[0] * Math.PI / 180;
  const endLng = end[1] * Math.PI / 180;

  const dLng = endLng - startLng;

  const y = Math.sin(dLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) -
            Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};

// Calculate point along line at percentage
const getPointAtPercentage = (start: [number, number], end: [number, number], percentage: number): [number, number] => {
  const lat = start[0] + (end[0] - start[0]) * percentage;
  const lng = start[1] + (end[1] - start[1]) * percentage;
  return [lat, lng];
};

// Component to add route segments with day labels and arrows
const RouteSegments: React.FC<{ attractions: Attraction[]; selectedDay: number | null; onSelectDay: (day: number) => void }> = ({ attractions, selectedDay, onSelectDay }) => {
  const map = useMap();

  useEffect(() => {
    // Clear existing route layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline && (layer as unknown as Record<string, unknown>).isRouteSegment) {
        map.removeLayer(layer);
      }
      if (layer instanceof L.Marker && (((layer as unknown as Record<string, unknown>).isDayLabel) || ((layer as unknown as Record<string, unknown>).isArrow))) {
        map.removeLayer(layer);
      }
    });

    const sortedAttractions = [...attractions].sort((a, b) => a.day - b.day);
    
    // Create route segments between consecutive attractions
    for (let i = 0; i < sortedAttractions.length - 1; i++) {
      const current = sortedAttractions[i];
      const next = sortedAttractions[i + 1];
      
      // Skip if filtering by day and this segment doesn't match
      if (selectedDay !== null && current.day !== selectedDay && next.day !== selectedDay) {
        continue;
      }

      const segmentCoords: [number, number][] = [current.coordinates, next.coordinates];
      const dayNumber = next.day;
      
      // Calculate distance for this segment
      const distance = calculateDistance(current.coordinates, next.coordinates);
      
      // Color for this day
      const colors = ['#9E7FFF', '#38bdf8', '#f472b6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
      const color = colors[(dayNumber - 1) % colors.length];

      // Create polyline
      const polyline = L.polyline(segmentCoords, {
        color: color,
        weight: 4,
        opacity: 0.8,
        dashArray: selectedDay === dayNumber ? undefined : '10, 10',
      }) as unknown as L.Polyline & { isRouteSegment: boolean };
      
      (polyline as unknown as Record<string, unknown>).isRouteSegment = true;
      polyline.addTo(map);

      // Calculate bearing for arrow rotation
      const bearing = calculateBearing(current.coordinates, next.coordinates);

      // Add arrows at 50% and 75% positions
      const arrow1Pos = getPointAtPercentage(current.coordinates, next.coordinates, 0.5);
      const arrow2Pos = getPointAtPercentage(current.coordinates, next.coordinates, 0.75);

      const arrow1 = L.marker(arrow1Pos, {
        icon: createArrowIcon(color, bearing),
        interactive: false,
        zIndexOffset: 500
      }) as unknown as L.Marker & { isArrow: boolean };
      (arrow1 as unknown as Record<string, unknown>).isArrow = true;
      arrow1.addTo(map);

      const arrow2 = L.marker(arrow2Pos, {
        icon: createArrowIcon(color, bearing),
        interactive: false,
        zIndexOffset: 500
      }) as unknown as L.Marker & { isArrow: boolean };
      (arrow2 as unknown as Record<string, unknown>).isArrow = true;
      arrow2.addTo(map);

      // Calculate midpoint for day label
      const midLat = (current.coordinates[0] + next.coordinates[0]) / 2;
      const midLng = (current.coordinates[1] + next.coordinates[1]) / 2;

      // Get itinerary data for this day
      const dayItinerary = itinerary.find(item => item.day === dayNumber);

      // Create day label marker with distance
      const dayLabelIcon = L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, ${color}, ${color}dd);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid white;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          "
          onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.4)';"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)';"
          >
            <span style="font-size: 16px;">📍</span>
            <div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2;">
              <span>Day ${dayNumber}</span>
              <span style="font-size: 11px; opacity: 0.9; font-weight: normal;">约 ${distance} km</span>
            </div>
          </div>
        `,
        className: 'day-label-marker',
        iconSize: [100, 44],
        iconAnchor: [50, 22],
      });

      const dayLabel = L.marker([midLat, midLng], { 
        icon: dayLabelIcon,
        interactive: true,
        zIndexOffset: 1000
      }) as unknown as L.Marker & { isDayLabel: boolean };
      
      (dayLabel as unknown as Record<string, unknown>).isDayLabel = true;

      // Create popup content for day label
      if (dayItinerary) {
        const popupContent = `
          <div style="padding: 8px; max-width: 320px;">
            <img 
              src="${dayItinerary.image}" 
              alt="Day ${dayNumber}"
              style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;"
            />
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0;">
                ${dayItinerary.title}
              </h3>
              <span style="padding: 4px 8px; background: linear-gradient(135deg, ${color}, ${color}dd); color: white; font-size: 12px; font-weight: 600; border-radius: 12px;">
                Day ${dayNumber}
              </span>
            </div>
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 12px 0;">${dayItinerary.subtitle}</p>
            
            <div style="display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; font-size: 12px; color: #4b5563;">
                <svg style="width: 14px; height: 14px; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                ${distance} km
              </div>
              <div style="display: flex; align-items: center; font-size: 12px; color: #4b5563;">
                <svg style="width: 14px; height: 14px; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                ${dayItinerary.duration}
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <h4 style="font-size: 13px; font-weight: 600; color: #374151; margin: 0 0 8px 0; display: flex; align-items: center;">
                <svg style="width: 14px; height: 14px; margin-right: 4px; color: #9333ea;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                行程安排
              </h4>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${dayItinerary.activities.map(activity => `
                  <div style="display: flex; align-items: start; font-size: 12px; color: #4b5563;">
                    <span style="font-weight: 600; color: ${color}; min-width: 40px;">${activity.time}</span>
                    <span style="flex: 1;">${activity.activity}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <h4 style="font-size: 13px; font-weight: 600; color: #374151; margin: 0 0 8px 0; display: flex; align-items: center;">
                <svg style="width: 14px; height: 14px; margin-right: 4px; color: #9333ea;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                精彩亮点
              </h4>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                ${dayItinerary.highlights.map(highlight => `
                  <div style="display: flex; align-items: start; font-size: 12px; color: #4b5563;">
                    <span style="color: ${color}; margin-right: 6px;">✦</span>
                    <span>${highlight}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <h4 style="font-size: 13px; font-weight: 600; color: #374151; margin: 0 0 8px 0; display: flex; align-items: center;">
                <svg style="width: 14px; height: 14px; margin-right: 4px; color: #9333ea;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                美食推荐
              </h4>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${dayItinerary.meals.map(meal => `
                  <span style="padding: 4px 10px; background: #f3f4f6; color: #374151; font-size: 11px; border-radius: 12px; font-weight: 500;">
                    ${meal}
                  </span>
                `).join('')}
              </div>
            </div>

            <button
              onclick="window.selectDay(${dayNumber})"
              style="
                width: 100%;
                background: linear-gradient(135deg, ${color}, ${color}dd);
                color: white;
                padding: 10px 16px;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              "
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.25)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)';"
            >
              查看完整第${dayNumber}天行程
            </button>
          </div>
        `;

        const popup = L.popup({
          maxWidth: 340,
          className: 'custom-popup'
        }).setContent(popupContent);

        dayLabel.bindPopup(popup);
      }

      dayLabel.addTo(map);
    }

    // Add global function for button click
    (window as unknown as Record<string, (day: number) => void>).selectDay = (day: number) => {
      onSelectDay(day);
      map.closePopup();
    };
  }, [map, attractions, selectedDay, onSelectDay]);

  return null;
};

const MapController: React.FC<{ selectedDay: number | null; attractions: Attraction[] }> = ({ selectedDay, attractions }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedDay !== null) {
      const dayAttractions = attractions.filter(a => a.day === selectedDay);
      if (dayAttractions.length > 0) {
        const bounds = L.latLngBounds(dayAttractions.map(a => a.coordinates));
        map.fitBounds(bounds, { padding: [100, 100], maxZoom: 8 });
      }
    } else {
      // Show all attractions
      const bounds = L.latLngBounds(attractions.map(a => a.coordinates));
      map.fitBounds(bounds, { padding: [80, 80] });
    }
  }, [selectedDay, attractions, map]);
  
  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ attractions, selectedDay, onSelectDay }) => {
  const filteredAttractions = selectedDay 
    ? attractions.filter(a => a.day === selectedDay)
    : attractions;

  const getMarkerColor = (day: number) => {
    const colors = [
      '#9E7FFF', '#38bdf8', '#f472b6', '#10b981', 
      '#f59e0b', '#ef4444', '#8b5cf6'
    ];
    return colors[(day - 1) % colors.length];
  };

  // Define marker offsets to avoid overlap
  const markerOffsets: { [key: string]: [number, number] } = {
    'urumqi': [0, 0],
    'tianchi': [5, -5],
    'keketuohai': [0, 0],
    'burqin': [-5, 5],
    'kanas': [0, 0],
    'hemu': [8, -8],
    'karamay': [0, 0],
    'sailimu': [0, 0]
  };

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
      <MapContainer
        center={[45.5, 86.5]}
        zoom={6}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedDay={selectedDay} attractions={attractions} />
        <RouteSegments attractions={attractions} selectedDay={selectedDay} onSelectDay={onSelectDay} />
        
        {/* Markers */}
        {filteredAttractions.map((attraction) => {
          const offset = markerOffsets[attraction.id] || [0, 0];
          return (
            <Marker
              key={attraction.id}
              position={attraction.coordinates}
              icon={createCustomIcon(getMarkerColor(attraction.day), attraction.type, offset[0], offset[1])}
            >
              <Popup className="custom-popup" maxWidth={300}>
                <div className="p-2">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{attraction.name}</h3>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      Day {attraction.day}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{attraction.nameEn}</p>
                  <p className="text-sm text-gray-700 mb-3">{attraction.description}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {attraction.duration}
                  </div>
                  
                  <div className="space-y-1">
                    {attraction.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-600">
                        <span className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0 text-purple-500 flex items-center justify-center">✦</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => onSelectDay(attraction.day)}
                    className="mt-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    查看第{attraction.day}天行程
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-[1000] max-w-xs">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-purple-600" />
          图例说明
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="text-lg mr-2">🏙️</span>
            <span className="text-gray-700">城市</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">💧</span>
            <span className="text-gray-700">湖泊</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">⛰️</span>
            <span className="text-gray-700">山脉</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">🏘️</span>
            <span className="text-gray-700">村落</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">📸</span>
            <span className="text-gray-700">景点</span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-200">
            <div className="flex items-center mb-1">
              <div className="w-8 h-0.5 bg-purple-500 mr-2"></div>
              <span className="text-gray-700 text-xs">当前选中路线</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-400 mr-2"></div>
              <span className="text-gray-700 text-xs">其他路线</span>
            </div>
            <div className="flex items-center">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-purple-500 mr-2"></div>
              <span className="text-gray-700 text-xs">行进方向</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Filter Info */}
      {selectedDay && (
        <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-xl z-[1000] flex items-center space-x-3">
          <Navigation className="w-5 h-5" />
          <span className="font-bold">正在查看：第 {selectedDay} 天行程</span>
          <button
            onClick={() => onSelectDay(null)}
            className="ml-2 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1 text-sm transition-colors"
          >
            显示全部
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;

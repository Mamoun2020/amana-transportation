'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { BusLine } from '../types/bus';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const createBusIcon = (color: string = '#22c55e') => {
  return L.divIcon({
    className: 'custom-bus-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
      ">
        🚌
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Custom bus stop icon
const createBusStopIcon = (isNextStop: boolean = false) => {
  const color = isNextStop ? '#f59e0b' : '#6b7280';
  return L.divIcon({
    className: 'custom-bus-stop-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
      ">
        ●
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface BusMapProps {
  busLine: BusLine;
}

export default function BusMap({ busLine }: BusMapProps) {
  const mapRef = useRef<L.Map>(null);

  // Calculate map bounds to fit all bus stops
  const bounds = busLine.bus_stops.map(stop => [stop.latitude, stop.longitude]);
  const allPoints = [
    ...bounds,
    [busLine.current_location.latitude, busLine.current_location.longitude]
  ];

  useEffect(() => {
    if (mapRef.current && allPoints.length > 0) {
      const map = mapRef.current;
      const latLngs = allPoints.map(([lat, lng]) => L.latLng(lat, lng));
      map.fitBounds(L.latLngBounds(latLngs), { padding: [20, 20] });
    }
  }, [allPoints]);

  const getBusIconColor = () => {
    const utilization = busLine.passengers.utilization_percentage;
    if (utilization >= 80) return '#ef4444'; // red
    if (utilization >= 60) return '#f59e0b'; // yellow
    return '#22c55e'; // green
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        ref={mapRef}
        center={[busLine.current_location.latitude, busLine.current_location.longitude]}
        zoom={13}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Bus stops */}
        {busLine.bus_stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.latitude, stop.longitude]}
            icon={createBusStopIcon(stop.is_next_stop)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Arrival:</strong> {stop.estimated_arrival}
                </p>
                {stop.is_next_stop && (
                  <div className="mt-2 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                    Next Stop
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Current bus location */}
        <Marker
          position={[busLine.current_location.latitude, busLine.current_location.longitude]}
          icon={createBusIcon(getBusIconColor())}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-800">{busLine.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Route:</strong> {busLine.route_number}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Passengers:</strong> {busLine.passengers.current}/{busLine.passengers.capacity} ({busLine.passengers.utilization_percentage}%)
              </p>
              <p className="text-sm text-gray-600">
                <strong>Driver:</strong> {busLine.driver.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {busLine.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {busLine.current_location.address}
              </p>
            </div>
          </Popup>
        </Marker>
        
        {/* Route polyline */}
        <Polyline
          positions={busLine.bus_stops.map(stop => [stop.latitude, stop.longitude])}
          color="#3b82f6"
          weight={3}
          opacity={0.7}
        />
      </MapContainer>
    </div>
  );
}

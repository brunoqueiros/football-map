'use client'
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import StadiumCard from './StadiumCard';

export interface Stadium {
  id?: string;
  name: string;
  club?: string;
  latitude: number;
  longitude: number;
  capacity?: number | null;
  country: string;
  city?: string;
  stadium?: string | null;
}

interface MapProps {
  stadiums: Stadium[];
  accessToken: string;
  initialZoom?: number;
  initialCenter?: [number, number];
  selectedStadium?: Stadium | null;
  onSelectStadium?: (stadium: Stadium | null) => void;
}

export interface MapRef {
  flyToLocation: (lng: number, lat: number, zoom?: number) => void;
}

const Map = forwardRef<MapRef, MapProps>(({
  stadiums,
  accessToken,
  initialZoom = 2,
  initialCenter = [0, 20],
  selectedStadium = null,
  onSelectStadium
}, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useImperativeHandle(ref, () => ({
    flyToLocation: (lng: number, lat: number, zoom: number = 14) => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: zoom,
          duration: 4000,
          essential: true
        });
      }
    }
  }));

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: initialCenter,
      zoom: initialZoom,
      projection: { name: 'mercator' }
    });

    map.on('load', () => {
      setMapLoaded(true);

      map.setFog({
        color: 'transparent',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.0,
        'space-color': '#090909',
        'star-intensity': 0.1
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [accessToken, initialCenter, initialZoom]);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current;
    const markers: mapboxgl.Marker[] = [];

    stadiums.forEach((stadium) => {
      const el = document.createElement('div');
      el.className = 'stadium-marker';
      el.style.width = '8px';
      el.style.height = '8px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#00ff88';
      el.style.border = '2px solid #ffffff';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
      // el.style.transition = 'transform 0.2s ease';

      // el.addEventListener('mouseenter', () => {
      //   el.style.transform = 'scale(1.4)';
      // });

      // el.addEventListener('mouseleave', () => {
      //   el.style.transform = 'scale(1)';
      // });

      el.addEventListener('click', () => {
        onSelectStadium?.(stadium);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([stadium.longitude, stadium.latitude])
        .addTo(map);

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [mapLoaded, stadiums]);

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100vh'
        }}
      />
      {selectedStadium && (
        <StadiumCard
          stadium={selectedStadium}
          onClose={() => onSelectStadium?.(null)}
        />
      )}
    </>
  );
});

Map.displayName = 'Map';

export default Map;

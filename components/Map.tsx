'use client'
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import StadiumCard from './StadiumCard';

interface Stadium {
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
}

const Map: React.FC<MapProps> = ({
  stadiums,
  accessToken,
  initialZoom = 2,
  initialCenter = [0, 20]
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

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
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
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
        setSelectedStadium(stadium);
      });

      new mapboxgl.Marker(el)
        .setLngLat([stadium.longitude, stadium.latitude])
        .addTo(map);
    });
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
          onClose={() => setSelectedStadium(null)}
        />
      )}
    </>
  );
};

export default Map;

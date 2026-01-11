'use client'
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import StadiumCard from './StadiumCard';

interface Fixture {
  opponent: string;
  opponentId?: string;
  date: string;
  competition: string;
  isHome: boolean;
  venue?: string;
}

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
  crest?: string; // Logo file path reference
  nextFixture?: Fixture;
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

export const FLY_DURATION = 2000;

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
          duration: FLY_DURATION,
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
      attributionControl: false,
      dragRotate: false,
      projection: { name: 'mercator' }
    });

    map.touchZoomRotate.disableRotation();

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
    map.addSource('stadiums', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: stadiums.map(s => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [s.longitude, s.latitude] },
          properties: { ...s }
        }))
      }
    });

    map.addLayer({
      id: 'stadium-circles',
      type: 'circle',
      source: 'stadiums',
      paint: {
        // THIS SCALES THE SIZE AUTOMATICALLY BASED ON ZOOM
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          2, 1,    // At zoom 2, radius is 3px
          14, 8   // At zoom 14, radius is 15px
        ],
        'circle-color': '#fafafa',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ccc'
      }
    });

    map.on('click', 'stadium-circles', (e) => {
      const stadiumData = e.features?.at(0)?.properties as Stadium;

      onSelectStadium?.(stadiumData);
    });

    map.on('mouseenter', 'stadium-circles', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'stadium-circles', () => {
      map.getCanvas().style.cursor = '';
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
    </>
  );
});

Map.displayName = 'Map';

export default Map;

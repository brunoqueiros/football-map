'use client'
import { useRef, useState, useMemo } from "react";
import CountriesFilter from "@/components/CountriesFilter";
import SearchBar from "@/components/SearchBar";
import Map, { Stadium, MapRef, FLY_DURATION } from "@/components/Map";
import teams from "@/data/teams.json";

export default function MapContainer({
  accessToken
}: { accessToken: string; }) {
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const mapRef = useRef<MapRef>(null);
  const initialCenter = useMemo<[number, number]>(() => [5, 22], []);

  const handleSelectTeam = (team: Stadium) => {
    // Fly to the team location with closer zoom
    mapRef.current?.flyToLocation(team.longitude, team.latitude, 16);

    setTimeout(() => {
      // Show the stadium card
      setSelectedStadium(team);
    }, FLY_DURATION + 500);
  };

  return (
    <div className="App relative">
      <Map
        ref={mapRef}
        stadiums={teams as Stadium[]}
        accessToken={accessToken}
        initialZoom={2.5}
        initialCenter={initialCenter}
        selectedStadium={selectedStadium}
        onSelectStadium={setSelectedStadium}
      />
      <SearchBar onSelectTeam={handleSelectTeam} />
      <CountriesFilter />
    </div>
  );
}

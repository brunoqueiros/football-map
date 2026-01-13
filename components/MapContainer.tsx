'use client'
import { useRef, useState, useMemo } from "react";
import CountriesFilter from "@/components/CountriesFilter";
import SearchBar from "@/components/SearchBar";
import Map, { Stadium, MapRef, FLY_DURATION } from "@/components/Map";
import StadiumCard from "./StadiumCard";

export default function MapContainer({
  accessToken,
  teams
}: { accessToken: string; teams: Stadium[] }) {
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
        stadiums={teams}
        accessToken={accessToken}
        initialZoom={2.5}
        initialCenter={initialCenter}
        selectedStadium={selectedStadium}
        onSelectStadium={setSelectedStadium}
      />
      {selectedStadium && (
        <StadiumCard
          stadium={{
            ...selectedStadium,
            // nextFixture: {
            //   competition: 'World Cup',
            //   date: '01-24-2026 14:00',
            //   isHome: false,
            //   opponent: 'Corinthians',
            //   opponentId: 'brazil-corinthians',
            //   venue: 'Neo Química Arena',
            // }
          }}
          onClose={() => setSelectedStadium(null)}
        />
      )}
      <SearchBar onSelectTeam={handleSelectTeam} teams={teams} hideCard={() => setSelectedStadium(null)} />
      {/* <CountriesFilter teams={teams} /> */}
    </div>
  );
}

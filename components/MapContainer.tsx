'use client'
import { useRef, useState, useMemo, useEffect } from "react";
import CountriesFilter from "@/components/CountriesFilter";
import SearchBar from "@/components/SearchBar";
import Map, { Stadium, MapRef, FLY_DURATION } from "@/components/Map";
import StadiumCard from "./StadiumCard";

export default function MapContainer({
  accessToken,
  teams,
  venues
}: { accessToken: string; teams: Stadium[]; venues: any }) {
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const mapRef = useRef<MapRef>(null);
  const initialCenter = useMemo<[number, number]>(() => [5, 22], []);
  const allCountries = useMemo(
    () => Array.from(new Set(teams.map(t => t.country))).sort(),
    [teams]
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>(allCountries);

  const { filteredTeams, filteredVenues } = useMemo(() => {
    if (selectedCountries.length === allCountries.length) {
      return { filteredTeams: teams, filteredVenues: venues };
    }
    const selected = new Set(selectedCountries);
    const filteredTeams = teams.filter(t => selected.has(t.country));
    const allowedVenueIds = new Set(filteredTeams.map(t => (t as any).venue_id));
    const filteredVenues = venues.filter((v: any) => allowedVenueIds.has(v.id));
    return { filteredTeams, filteredVenues };
  }, [venues, teams, selectedCountries, allCountries.length]);

  const isFirstFitRef = useRef(true);
  useEffect(() => {
    if (isFirstFitRef.current) {
      isFirstFitRef.current = false;
      return;
    }
    if (selectedCountries.length === 0) return;
    mapRef.current?.fitToVenues(filteredVenues);
  }, [selectedCountries, filteredVenues]);

  const handleSelectTeam = (team: Stadium, venue: any) => {
    // Fly to the team location with closer zoom
    console.log(team, venue)
    mapRef.current?.flyToLocation(venue.longitude, venue.latitude, 16);

    setTimeout(() => {
      // Show the stadium card
      setSelectedTeam(team);
      setSelectedStadium(team);
    }, FLY_DURATION + 500);
  };

  return (
    <div className="App relative">
      <Map
        ref={mapRef}
        teams={filteredTeams}
        venues={filteredVenues}
        accessToken={accessToken}
        initialZoom={2.5}
        initialCenter={initialCenter}
        selectedStadium={selectedStadium}
        onSelectStadium={(stadium) => {
          setSelectedStadium(stadium);
          setSelectedTeam(null); // Reset selected team when clicking map marker
        }}
      />
      {console.log('selectedStadium', selectedStadium)}
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
          allTeams={teams}
          venues={venues}
          initialTeam={selectedTeam}
          onTeamSwitch={(team) => setSelectedStadium(team)}
          onClose={() => setSelectedStadium(null)}
        />
      )}
      <SearchBar onSelectTeam={handleSelectTeam} teams={filteredTeams} hideCard={() => setSelectedStadium(null)} venues={venues} />
      <CountriesFilter
        teams={teams}
        selectedCountries={selectedCountries}
        onChange={setSelectedCountries}
      />
    </div>
  );
}

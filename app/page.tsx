import CountriesFilter from "@/components/CountriesFilter";
import Map from "@/components/Map";
import teams from "@/data/teams.json";

export default function Home() {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

  return (
    <div className="App relative">
      <Map
        stadiums={teams}
        accessToken={MAPBOX_TOKEN}
        initialZoom={3}
        initialCenter={[5, 52]}
      />
      <CountriesFilter />
    </div>
  );
}

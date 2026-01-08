import MapContainer from "@/components/MapContainer";

export default function Home() {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

  return (
    <div className="App relative">
      <MapContainer accessToken={MAPBOX_TOKEN} />
    </div>
  );
}

import MapContainer from "@/components/MapContainer";
import { getAllTeams } from "./actions/teams";

export default async function Home() {
  const teams = await getAllTeams();
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

  return (
    <div className="App relative">
      <MapContainer accessToken={MAPBOX_TOKEN} teams={teams} />
    </div>
  );
}

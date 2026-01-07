import Map from "@/components/Map";
// import { exampleStadiums } from "@/data/stadiums";
import teams from "@/data/teams.json";
import { flag } from "country-emoji";

export default function Home() {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
  const countriesCount = teams.reduce<Record<string, number>>((acc, cur) => {
    if (acc.hasOwnProperty(cur.country)) {
      acc[cur.country]++;
    } else {
      acc[cur.country] = 1;
    }

    return acc;
  }, {});

  return (
    <div className="App flex">
      <div className='min-h-full w-64 z-50 overflow-x-hidden border-b border-neutral-200 bg-white p-0 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900 md:fixed md:left-0 md:h-[calc(100vh-65px)] md:border-r md:p-2 md:pb-0'>
        {Object.keys(countriesCount).sort().map(country => (
          <div key={`country-count-${country}`} className="flex items-center space-x-1 overflow-y-auto pb-1 pt-1 md:flex-col md:space-x-0 md:space-y-1 md:px-0 md:pt-0">
            <a href="/brazil/" className="flex w-full items-center justify-between space-x-3 rounded-md px-2 py-3 text-sm text-neutral-600 ring-offset-transparent hover:bg-neutral-200 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-0.5 dark:text-neutral-300 dark:hover:bg-neutral-700/40 dark:hover:text-white md:py-2">
              <div className="flex items-center gap-1.5">
                <span>{flag(country)}</span>
                <span className="whitespace-nowrap text-nowrap md:whitespace-normal md:text-wrap">{country}</span>
              </div>
              <span className="hidden rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 font-mono text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400 md:inline">{countriesCount[country]}</span>
            </a>
          </div>
        ))}
      </div>
      <div className='ml-0 md:ml-64 flex-auto'>
        <Map
          stadiums={teams}
          accessToken={MAPBOX_TOKEN}
          initialZoom={8}
          initialCenter={[5, 52]}
        />
      </div>
    </div>
  );
}

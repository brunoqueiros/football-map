'use client'
import teams from "@/data/teams.json";
import { flag } from "country-emoji";
import { useState } from "react";

export default function CountriesFilter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countriesCount = teams.reduce<Record<string, number>>((acc, cur) => {
    if (acc.hasOwnProperty(cur.country)) {
      acc[cur.country]++;
    } else {
      acc[cur.country] = 1;
    }

    return acc;
  }, {});

  const allCountries = Object.keys(countriesCount).sort();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(allCountries);

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const allSelected = selectedCountries.length === allCountries.length;

  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2 z-50'>
      <div className='relative'>
        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-80 max-h-96 overflow-y-auto scrollbar-hide'>
            <div className='flex flex-col gap-1 p-2 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl'>
              {allCountries.map(country => {
                const isSelected = selectedCountries.includes(country);
                return (
                  <button
                    key={`country-count-${country}`}
                    onClick={() => toggleCountry(country)}
                    className="flex items-center gap-4 px-4 py-2.5 rounded-lg bg-neutral-800/30 hover:bg-neutral-700/50 transition-colors whitespace-nowrap border border-neutral-700/30 hover:border-neutral-600/50 min-w-[280px]"
                  >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected
                      ? 'bg-green-500 border-green-500'
                      : 'bg-transparent border-neutral-600'
                      }`}>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Country info */}
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className="text-xl">{flag(country)}</span>
                      <span className="text-sm font-medium text-neutral-200">{country}</span>
                    </div>

                    {/* Count badge */}
                    <span className="rounded-full bg-neutral-700 px-2.5 py-0.5 font-mono text-xs text-neutral-300">{countriesCount[country]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* All Countries button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='flex items-center justify-between gap-3 px-5 py-3 rounded-xl w-80 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 shadow-2xl hover:bg-neutral-800/90 transition-colors'
        >
          {allSelected ? (
            <span className="flex gap-2 items-center">
              <span className="text-lg">🌍</span>
              <span className="text-sm font-medium text-neutral-200">All Countries</span>
            </span>
          ) : (
            <span className="flex gap-1.5 items-center overflow-hidden">
              {selectedCountries.slice(0, 3).map(country => (
                <span key={country} className="text-lg">{flag(country)}</span>
              ))}
              {selectedCountries.length > 3 && (
                <span className="text-xs font-medium text-neutral-400 ml-1">
                  +{selectedCountries.length - 3}
                </span>
              )}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-neutral-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

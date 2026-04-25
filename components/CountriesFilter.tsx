'use client'
import { useState, useMemo, useEffect, useRef } from "react";
import { flag } from "./SearchBar";
import { Stadium } from "./Map";

interface CountriesFilterProps {
  teams: Stadium[];
  selectedCountries: string[];
  onChange: (countries: string[]) => void;
}

export default function CountriesFilter({
  teams,
  selectedCountries,
  onChange,
}: CountriesFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { allCountries, countriesCount } = useMemo(() => {
    const countriesCount = teams.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.country] = (acc[cur.country] ?? 0) + 1;
      return acc;
    }, {});
    const allCountries = Object.keys(countriesCount).sort();
    return { allCountries, countriesCount };
  }, [teams]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allCountries;
    return allCountries.filter(c => c.toLowerCase().includes(q));
  }, [allCountries, searchQuery]);

  const toggleCountry = (country: string) => {
    onChange(
      selectedCountries.includes(country)
        ? selectedCountries.filter(c => c !== country)
        : [...selectedCountries, country]
    );
  };

  const allSelected = selectedCountries.length === allCountries.length;

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div ref={containerRef} className='fixed top-5 right-4 z-50'>
      <div className='relative flex flex-col items-end gap-2'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="Filter countries"
          className={`relative flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-900/90 backdrop-blur-md border shadow-xl transition-colors ${isDropdownOpen || !allSelected
            ? 'border-neutral-600 text-neutral-100'
            : 'border-neutral-800 text-neutral-300 hover:bg-neutral-800/90'
            }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18M12 3a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
          {!allSelected && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-green-500 text-[10px] font-semibold text-white">
              {selectedCountries.length}
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <div className='w-80 max-h-[70vh] flex flex-col rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl overflow-hidden'>
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="text-xs font-semibold tracking-widest text-neutral-500">COUNTRIES</span>
              <button
                onClick={() => onChange(allSelected ? [] : allCountries)}
                className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                {allSelected ? 'Clear' : 'Select all'}
              </button>
            </div>

            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800/60 border border-neutral-700/50">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search countries..."
                  className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
                />
              </div>
            </div>

            <div className='flex flex-col gap-1 px-2 pb-2 overflow-y-auto scrollbar-hide'>
              {filteredCountries.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-neutral-500">
                  No countries found
                </div>
              )}
              {filteredCountries.map(country => {
                const isSelected = selectedCountries.includes(country);
                return (
                  <button
                    key={`country-count-${country}`}
                    onClick={() => toggleCountry(country)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left"
                  >
                    <span className="text-2xl leading-none">{flag(country)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-neutral-100 truncate">{country === 'Bosnia' ? 'Bosnia and Herzegovina' : country}</div>
                      <div className="text-xs text-neutral-500">{countriesCount[country]} teams</div>
                    </div>
                    <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-green-500 border-green-500' : 'bg-transparent border-neutral-600'
                      }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

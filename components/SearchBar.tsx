'use client'
import { useState, useEffect, useRef, useMemo } from "react";
import { Stadium } from "./Map";
import { useFuzzySearchList } from '@nozbe/microfuzz/react';
import Crest from "./Crest";

interface SearchBarProps {
  onSelectTeam: (team: Stadium, venue: any) => void;
  hideCard: () => void;
  teams: Stadium[];
  venues: any[];
  allTeams: Stadium[];
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
}

const COUNTRIES: Record<string, string> = {
  'brazil': '🇧🇷',
  'england': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'netherlands': '🇳🇱',
  'wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'spain': '🇪🇸',
  'andorra': '🇦🇩',
  'germany': '🇩🇪',
  'france': '🇫🇷',
  'monaco': '🇲🇨',
  'italy': '🇮🇹',
  'portugal': '🇵🇹',
  'argentina': '🇦🇷',
  'belgium': '🇧🇪',
  'turkey': '🇹🇷',
  'canada': '🇨🇦',
  'usa': '🇺🇸',
  'scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'romania': '🇷🇴',
  'saudi-arabia': '🇸🇦',
  'mexico': '🇲🇽',
  'colombia': '🇨🇴',
  'chile': '🇨🇱',
  'japan': '🇯🇵',
  'south-korea': '🇰🇷',
  'greece': '🇬🇷',
  'peru': '🇵🇪',
  'morocco': '🇲🇦',
  'uruguay': '🇺🇾',
  'poland': '🇵🇱',
  'austria': '🇦🇹',
  'switzerland': '🇨🇭',
  'liechtenstein': '🇱🇮',
  'denmark': '🇩🇰',
  'sweden': '🇸🇪',
  'norway': '🇳🇴',
  'el-salvador': '🇸🇻',
  'nigeria': '🇳🇬',
  'finland': '🇫🇮',
  'russia': '🇷🇺',
  'china': '🇨🇳',
  'ireland': '🇮🇪',
  'hungary': '🇭🇺',
  'slovenia': '🇸🇮',
  'ukraine': '🇺🇦',
  'croatia': '🇭🇷',
  'algeria': '🇩🇿',
  'albania': '🇦🇱',
  'angola': '🇦🇴',
  'armenia': '🇦🇲',
  'azerbaijan': '🇦🇿',
  'aruba': '🇦🇼',
  'australia': '🇦🇺',
  'bahrain': '🇧🇭',
  'bangladesh': '🇧🇩',
  'barbados': '🇧🇧',
  'reunion': '🇷🇪',
  'tahiti': '🇵🇫',
  'new-zealand': '🇳🇿',
  'belarus': '🇧🇾',
  'belize': '🇧🇿',
  'benin': '🇧🇯',
  'bermuda': '🇧🇲',
  'bhutan': '🇧🇹',
  'bolivia': '🇧🇴',
  'bosnia': '🇧🇦',
  'botswana': '🇧🇼',
  'bulgaria': '🇧🇬',
  'burkina-faso': '🇧🇫',
  'burundi': '🇧🇮',
  'cambodia': '🇰🇭',
  'cameroon': '🇨🇲',
  'taiwan': '🇹🇼',
  'congo-dr': '🇨🇩',
  'congo': '🇨🇬',
  'costa-rica': '🇨🇷',
  'cuba': '🇨🇺',
  'cyprus': '🇨🇾',
  'czech-republic': '🇨🇿',
  'dominican-republic': '🇩🇴',
  'ecuador': '🇪🇨',
  'egypt': '🇪🇬',
  'estonia': '🇪🇪',
  'eswatini': '🇸🇿',
  'ethiopia': '🇪🇹',
  'faroe-islands': '🇫🇴',
  'fiji': '🇫🇯',
  'gabon': '🇬🇦',
  'gambia': '🇬🇲',
  'georgia': '🇬🇪',
  'ghana': '🇬🇭',
  'gibraltar': '🇬🇮',
  'grenada': '🇬🇩',
  'guadeloupe': '🇬🇵',
  'guatemala': '🇬🇹',
  'guinea': '🇬🇳',
  'haiti': '🇭🇹',
  'honduras': '🇭🇳',
  'hong-kong': '🇭🇰',
  'iceland': '🇮🇸',
  'india': '🇮🇳',
  'indonesia': '🇮🇩',
  'iran': '🇮🇷',
};

export const flag = (country: string) => COUNTRIES[country.replaceAll(' ', '-').toLocaleLowerCase()];

export default function SearchBar({ onSelectTeam, teams, hideCard, venues, allTeams, selectedCountries, onCountriesChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { allCountries, countriesCount } = useMemo(() => {
    const countriesCount = allTeams.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.country] = (acc[cur.country] ?? 0) + 1;
      return acc;
    }, {});
    const allCountries = Object.keys(countriesCount).sort();
    return { allCountries, countriesCount };
  }, [allTeams]);

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return allCountries;
    return allCountries.filter(c => c.toLowerCase().includes(q));
  }, [allCountries, countrySearch]);

  const allSelected = selectedCountries.length === allCountries.length;

  const toggleCountry = (country: string) => {
    onCountriesChange(
      selectedCountries.includes(country)
        ? selectedCountries.filter(c => c !== country)
        : [...selectedCountries, country]
    );
  };

  const filteredTeams = useFuzzySearchList({
    list: teams,
    queryText: searchQuery,
    strategy: 'smart',
    getText: (item) => [item.name],
    mapResultItem: ({ item, matches: [] }) => (item)
  }).sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }).slice(0, 10);

  const showResults = isFocused && filteredTeams.length > 0 && !isFilterOpen;
  const showNoResults = isFocused && searchQuery.trim() && filteredTeams.length === 0 && !isFilterOpen;

  useEffect(() => {
    if (!isFilterOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div
      className={`${isFocused && !isFilterOpen ? 'fixed inset-0 backdrop-blur-xs z-45 animate-in fade-in duration-200' : ''}`}
      onClick={(e) => {
        if (!wrapperRef.current?.contains(e.target as Node)) {
          hideCard();
        }
      }}
    >
      <div ref={wrapperRef} className='fixed top-4 left-1/2 -translate-x-1/2 z-50'>
        <div className='relative lg:w-150 w-[90vw]'>
          {/* Search bar */}
          <div className={`flex items-center gap-3 px-4 rounded-xl bg-neutral-900 border shadow-xl transition-colors ${isFocused || isFilterOpen ? 'border-neutral-600' : 'border-neutral-800'}`}>
            <svg
              className="w-5 h-5 text-neutral-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setIsFilterOpen(false);
                hideCard();
              }}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search for a team..."
              className="flex-1 bg-transparent py-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Separator + Filter button */}
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-700/60">
              <button
                onClick={() => {
                  setIsFilterOpen(v => !v);
                  setIsFocused(false);
                }}
                aria-label="Filter by country"
                className={`relative flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${isFilterOpen || !allSelected ? 'text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18M12 3a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
                {!allSelected && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 flex items-center justify-center rounded-full bg-green-500 text-[9px] font-semibold text-white">
                    {selectedCountries.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search results dropdown */}
          {showResults && (
            <div className='absolute top-full mt-2 w-full'>
              <div className='flex flex-col gap-1 p-2 rounded-xl max-h-[70vh] bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl overflow-y-auto scrollbar-hide'>
                {filteredTeams.map((team, index) => (
                  <button
                    key={`${team.name}-${index}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-left bg-neutral-800/30 hover:bg-neutral-700/50 border-neutral-700/30 hover:border-neutral-600/50 border"
                    onClick={() => {
                      // @ts-ignore
                      onSelectTeam(team, venues.find(v => v.id === team.venue_id));
                      setSearchQuery("");
                      setIsFocused(false);
                    }}
                  >
                    <div className="flex gap-3 flex-1 min-w-0">
                      {/* @ts-ignore */}
                      <Crest src={team.logo} name={team.name} />
                      <div>
                        <span className="text-sm font-medium text-neutral-200 truncate">{team.name}</span>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                          {/* @ts-ignore */}
                          <span>{venues.find(v => v.id === team.venue_id).city}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <span>{flag(team.country)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <div className='absolute top-full mt-2 w-full'>
              <div className='p-6 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl'>
                <div className="flex flex-col items-center text-center gap-3">
                  <svg className="w-12 h-12 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-neutral-200 mb-1">No teams found</p>
                    <p className="text-xs text-neutral-400">Can't find your team? Contact us to add it to the map!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Country filter panel */}
          {isFilterOpen && (
            <div className='absolute top-full mt-2 w-full flex flex-col rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl overflow-hidden max-h-[70vh]'>
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <span className="text-xs font-semibold tracking-widest text-neutral-500">COUNTRIES</span>
                <button
                  onClick={() => onCountriesChange(allSelected ? [] : allCountries)}
                  className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {allSelected ? 'Clear' : 'Select all'}
                </button>
              </div>

              <div className="px-3 pb-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800/60 border border-neutral-700/50">
                  <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search countries..."
                    className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1 px-2 pb-2 overflow-y-auto scrollbar-hide'>
                {filteredCountries.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-neutral-500">No countries found</div>
                )}
                {filteredCountries.map(country => {
                  const isSelected = selectedCountries.includes(country);
                  return (
                    <button
                      key={`country-${country}`}
                      onClick={() => toggleCountry(country)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors text-left"
                    >
                      <span className="text-2xl leading-none">{flag(country)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-neutral-100 truncate">
                          {country === 'Bosnia' ? 'Bosnia and Herzegovina' : country}
                        </div>
                        <div className="text-xs text-neutral-500">{countriesCount[country]} teams</div>
                      </div>
                      <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-green-500 border-green-500' : 'bg-transparent border-neutral-600'}`}>
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
    </div>
  );
}

'use client'
import { useState } from "react";
import teams from "@/data/teams.json";
import { Stadium } from "./Map";
import Image from "next/image";
import { useFuzzySearchList } from '@nozbe/microfuzz/react';

interface SearchBarProps {
  onSelectTeam: (team: Stadium) => void;
}

const COUNTRIES: Record<string, string> = {
  'brazil': '🇧🇷',
  'england': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'netherlands': '🇳🇱',
  'wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'spain': '🇪🇸',
  'andorra': '🇦🇩',
};

export const flag = (country: string) => COUNTRIES[country.toLocaleLowerCase()];

export default function SearchBar({ onSelectTeam }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredTeams = useFuzzySearchList({
    list: teams,
    queryText: searchQuery,
    strategy: 'smart',
    getText: (item) => [item.name, item.city, item.country],
    mapResultItem: ({ item, matches: [] }) => (item)
  }).slice(0, 10);

  const showResults = isFocused && filteredTeams.length > 0;
  const showNoResults = isFocused && searchQuery.trim() && filteredTeams.length === 0;

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50'>
      <div className='relative w-96'>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900/90 backdrop-blur-md border shadow-2xl transition-colors ${isFocused ? 'border-neutral-600' : 'border-neutral-800'
          }`}>
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input Field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for a team..."
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
          />

          {/* Clear Button */}
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
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className='absolute top-full mt-2 w-full max-h-96 overflow-y-auto scrollbar-hide'>
            <div className='flex flex-col gap-1 p-2 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl'>
              {filteredTeams.map((team, index) => (
                <button
                  key={`${team.name}-${index}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-neutral-800/30 hover:bg-neutral-700/50 transition-colors border border-neutral-700/30 hover:border-neutral-600/50 text-left"
                  onClick={() => {
                    onSelectTeam(team);
                    setSearchQuery("");
                    setIsFocused(false);
                  }}
                >
                  <div className="flex gap-3 flex-1 min-w-0">
                    <Image
                      src={`/logos/${team.id}.svg`}
                      width={25}
                      height={25}
                      alt={team.name}
                      className="object-contain"
                    />
                    <div>
                      <span className="text-sm font-medium text-neutral-200 truncate">{team.name}</span>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <span>{team.city}</span>
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

        {/* No Results Message */}
        {showNoResults && (
          <div className='absolute top-full mt-2 w-full'>
            <div className='p-6 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-2xl'>
              <div className="flex flex-col items-center text-center gap-3">
                <svg className="w-12 h-12 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-neutral-200 mb-1">No teams found</p>
                  <p className="text-xs text-neutral-400">
                    Can't find your team? Contact us to add it to the map!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

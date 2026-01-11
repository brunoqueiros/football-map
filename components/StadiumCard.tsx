import React from 'react';
import { ImageWithFallback } from './SearchBar';

interface Stadium {
  id?: string;
  name: string;
  club?: string;
  latitude: number;
  longitude: number;
  capacity?: number | null;
  country: string;
  city?: string;
  stadium?: string | null;
}

interface StadiumCardProps {
  stadium: Stadium;
  onClose: () => void;
}

const StadiumCard: React.FC<StadiumCardProps> = ({ stadium, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-neutral-900/35 backdrop-blur-xs z-45 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="fixed bg-neutral-900/95 top-20 left-1/2 -translate-x-1/2 w-96 z-50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/8 overflow-hidden animate-in slide-in-from-top-5 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/8 border border-white/12 rounded-lg text-white/70 hover:bg-white/15 hover:border-white/20 hover:text-white transition-all duration-250 z-10"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="px-5 py-5 pb-4.5 bg-white/6 border-b border-white/6 flex items-center gap-3.5">
          <div className="shrink-0 w-13.5 h-13.5 bg-white/6 rounded-xl flex items-center justify-center border border-white/8 p-1.5">
            <ImageWithFallback
              src={`/logos/${stadium.id}.svg`}
              fallbackSrc={`/logos/${stadium.id}.png`}
              width={44}
              height={44}
              alt={stadium.name}
            />
          </div>
          <h2 className="flex-1 min-w-0 text-[17px] font-semibold text-white leading-tight tracking-tight">
            {stadium.name}
          </h2>
        </div>

        <div className="px-5 py-4.5">
          {stadium.stadium && (
            <div className="flex items-center gap-3 py-2.5 border-b border-white/5">
              <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/6 rounded-lg text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Stadium</span>
                <span className="text-sm font-medium text-white/95 leading-snug">{stadium.stadium}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 py-2.5">
            <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/6 rounded-lg text-white/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Location</span>
              <span className="text-sm font-medium text-white/95 leading-snug">
                {stadium.city ? `${stadium.city}, ` : ''}{stadium.country}
              </span>
            </div>
          </div>

          {/* {stadium.capacity && (
            <div className="flex items-center gap-3 py-2.5 border-b border-white/5">
              <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/6 rounded-lg text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Capacity</span>
                <span className="text-sm font-medium text-white/95 leading-snug">{stadium.capacity.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 py-2.5">
            <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/6 rounded-lg text-white/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Coordinates</span>
              <span className="text-sm font-medium text-white/95 leading-snug">
                {stadium.latitude.toFixed(4)}, {stadium.longitude.toFixed(4)}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;

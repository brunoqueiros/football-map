import React, { useEffect, useState } from 'react';
import { Stadium } from './Map';
import Crest from './Crest';

interface StadiumCardProps {
  stadium: Stadium;
  onClose: () => void;
}

const formatMatchDate = (dateString: string) => {
  const matchDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = matchDate.toDateString() === today.toDateString();
  const isTomorrow = matchDate.toDateString() === tomorrow.toDateString();

  if (isToday) return 'Today';
  if (isTomorrow) return 'Tomorrow';

  const daysDiff = Math.ceil((matchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff >= 0 && daysDiff <= 7) {
    return `In ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
  }

  return matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatMatchTime = (dateString: string) => {
  const matchDate = new Date(dateString);
  return matchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const StadiumCard: React.FC<StadiumCardProps> = ({ stadium, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
  }, []);

  // ESC key to close the card (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, onClose]);

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs z-45 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="fixed top-18 left-1/2 -translate-x-1/2 lg:w-150 w-[90vw] z-50 rounded-xl overflow-hidden bg-neutral-900 border shadow-xl transition-colors border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-5 right-4 flex items-center gap-2 z-10">
          {!isMobile && (
            <div className="px-2 py-1 rounded bg-neutral-800/50 border border-neutral-700/50 opacity-70">
              <span className="text-xs text-neutral-400">ESC</span>
            </div>
          )}
          <button
            className="w-8 h-8 flex items-center justify-center bg-white/8 border border-white/12 rounded-lg text-white/70 hover:bg-white/15 hover:border-white/20 hover:text-white transition-all duration-250"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="px-5 py-2 bg-white/4 border-b border-white/4 flex items-center gap-3.5">
          <div className="shrink-0 w-13.5 h-13.5 flex items-center justify-center p-1.5">
            <Crest src={stadium.crest!} name={stadium.name} />
          </div>
          <h2 className="flex-1 min-w-0 text-[17px] font-semibold text-white leading-tight tracking-tight">
            {stadium.name}
          </h2>
        </div>

        <div className="px-5 py-2.5">
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

          <div className="flex items-center gap-3 py-2.5 pb-0">
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

        {/* Next Fixture Section */}
        {stadium.nextFixture && (
          <div className="mx-5 mb-3 p-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Next Match</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Home Team */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="flex items-center justify-center mb-2 p-2">
                  <Crest src={stadium.crest!} name={stadium.name} />
                </div>
                <span className="text-xs font-medium text-white/90 text-center truncate w-full">
                  {stadium.name.length > 12 ? stadium.name.substring(0, 12) + '...' : stadium.name}
                </span>
                {stadium.nextFixture.isHome && (
                  <span className="text-[10px] text-green-400 mt-0.5">HOME</span>
                )}
              </div>

              {/* VS Separator */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-white/40">VS</span>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="flex items-center justify-center mb-2 p-2">
                  {stadium.nextFixture.opponentId ? (
                    <Crest src={stadium.nextFixture.opponentId!} name={stadium.nextFixture.opponent} />
                  ) : (
                    <span className="text-xl text-white/30">?</span>
                  )}
                </div>
                <span className="text-xs font-medium text-white/90 text-center truncate w-full">
                  {stadium.nextFixture.opponent.length > 12 ? stadium.nextFixture.opponent.substring(0, 12) + '...' : stadium.nextFixture.opponent}
                </span>
                {!stadium.nextFixture.isHome && (
                  <span className="text-[10px] text-blue-400 mt-0.5">AWAY</span>
                )}
              </div>
            </div>

            {/* Match Details */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="text-xs font-medium text-white/80">
                  {formatMatchDate(stadium.nextFixture.date)} • {formatMatchTime(stadium.nextFixture.date)}
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <span className="text-xs font-medium text-white/60">{stadium.nextFixture.competition}</span>
            </div>

            {!stadium.nextFixture.isHome && stadium.nextFixture.venue && (
              <div className="mt-2 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-xs font-medium text-white/60">{stadium.nextFixture.venue}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StadiumCard;

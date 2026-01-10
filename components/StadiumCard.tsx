import React, { useEffect, useRef, useState } from 'react';
import './StadiumCard.css';
import logo from '../logos/afc-ajax.svg';
import Image from 'next/image';
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
    <div className="stadium-card-overlay" onClick={onClose}>
      <div className="stadium-card" onClick={(e) => e.stopPropagation()}>
        <button className="stadium-card-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="stadium-card-header">
          <ImageWithFallback
            src={`/logos/${stadium.id}.svg`}
            fallbackSrc={`/logos/${stadium.id}.png`}
            width={48}
            height={48}
            alt={stadium.name}
          />
          <h2 className="stadium-card-title">{stadium.name}</h2>
        </div>

        <div className="stadium-card-body">
          {stadium.stadium && (
            <div className="stadium-card-row">
              <span className="stadium-card-label">Stadium</span>
              <span className="stadium-card-value">{stadium.stadium}</span>
            </div>
          )}

          <div className="stadium-card-row">
            <span className="stadium-card-label">Location</span>
            <span className="stadium-card-value">
              {stadium.city ? `${stadium.city}, ` : ''}{stadium.country}
            </span>
          </div>

          {stadium.capacity && (
            <div className="stadium-card-row">
              <span className="stadium-card-label">Capacity</span>
              <span className="stadium-card-value">{stadium.capacity.toLocaleString()}</span>
            </div>
          )}

          <div className="stadium-card-row">
            <span className="stadium-card-label">Coordinates</span>
            <span className="stadium-card-value">
              {stadium.latitude.toFixed(4)}, {stadium.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;

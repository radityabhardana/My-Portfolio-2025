import React from 'react';
import './LightBackground.css';

export default function LightBackground({ className = '' }) {
  return (
    <div className={`home-bg-fallback ${className}`} aria-hidden="true">
      <div className="gradient-overlay" />
      <div className="texture" />
    </div>
  );
}

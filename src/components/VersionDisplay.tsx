
import React from 'react';

const VersionDisplay = () => {
  return (
    <div className="relative h-6 w-28 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center animate-version-slide">
        <span className="font-semibold">Version 1.0</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center translate-y-full animate-author-slide">
        <span className="font-semibold">by AmenFlux</span>
      </div>
    </div>
  );
};

export default VersionDisplay;

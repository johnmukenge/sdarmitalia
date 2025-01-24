import React from 'react';
import backgroundImage from '../../assets/setting-up.png';

export default function Background() {
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Contenuto aggiuntivo può essere aggiunto qui */}
    </div>
  );
}
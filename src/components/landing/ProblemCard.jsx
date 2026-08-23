import React from 'react';
import StreetLightEffect from './StreetLightEffect';
import CctvGlitchEffect from './CctvGlitchEffect';
import PotholeWaterEffect from './PotholeWaterEffect';
import WaterLeakEffect from './WaterLeakEffect';
import GarbageSmokeEffect from './GarbageSmokeEffect';
import OpenManholeEffect from './OpenManholeEffect';

export default function ProblemCard({ type, title, subtitle }) {
  const renderVisualEffect = () => {
    switch (type) {
      case 'street_lights':
        return <StreetLightEffect />;
      case 'cctv':
        return <CctvGlitchEffect />;
      case 'potholes':
        return <PotholeWaterEffect />;
      case 'water_leakage':
        return <WaterLeakEffect />;
      case 'garbage_dumps':
        return <GarbageSmokeEffect />;
      case 'open_manholes':
        return <OpenManholeEffect />;
      default:
        return <PotholeWaterEffect />;
    }
  };

  return (
    <div className="relative bg-slate-900/90 border border-red-950/80 rounded-2xl p-3 flex flex-col justify-between hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] transition-all duration-300 group cursor-pointer">
      <div className="mb-2">
        {renderVisualEffect()}
      </div>
      <div className="space-y-1 px-1">
        <h3 className="text-xs font-black tracking-wide text-red-400 font-mono group-hover:text-red-300 transition-colors">
          {title}
        </h3>
        <p className="text-[11px] text-slate-400 leading-snug">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Map,
  MapPin,
  AlertTriangle,
  Flame,
  Radio,
  Send,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Maximize2,
  Navigation,
  Activity,
  Users
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function HotspotHeatmap({
  hotspots,
  onSelectHotspot,
  onOpenDispatchModal,
}) {
  const [activeView, setActiveView] = useState('map'); // 'map' or 'list'
  const [selectedHotspotId, setSelectedHotspotId] = useState(hotspots[0]?.id || 'HS-101');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const selectedHotspot = hotspots.find((h) => h.id === selectedHotspotId) || hotspots[0];

  const filteredHotspots = hotspots.filter((h) => {
    const matchesSeverity = filterSeverity === 'all' || h.riskLevel.toLowerCase() === filterSeverity.toLowerCase();
    const matchesCat = filterCategory === 'all' || h.category.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSeverity && matchesCat;
  });

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical':
        return {
          bg: 'bg-rose-500',
          border: 'border-rose-300',
          text: 'text-rose-700',
          badgeVariant: 'danger',
          ring: 'ring-rose-400',
          glow: 'shadow-rose-500/50',
          mapBg: 'bg-rose-500/20 border-rose-500',
        };
      case 'High':
        return {
          bg: 'bg-amber-500',
          border: 'border-amber-300',
          text: 'text-amber-700',
          badgeVariant: 'warning',
          ring: 'ring-amber-400',
          glow: 'shadow-amber-500/50',
          mapBg: 'bg-amber-500/20 border-amber-500',
        };
      default:
        return {
          bg: 'bg-sky-500',
          border: 'border-sky-300',
          text: 'text-sky-700',
          badgeVariant: 'info',
          ring: 'ring-sky-400',
          glow: 'shadow-sky-500/50',
          mapBg: 'bg-sky-500/20 border-sky-500',
        };
    }
  };

  return (
    <Card
      title="Zonal Hotspot & GIS Heatmap Analytics"
      subtitle="High-density citizen complaint clusters, spatial AI vulnerability indices, and rapid team dispatch"
      headerIcon={Map}
      action={
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveView('map')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeView === 'map'
                ? 'bg-white shadow-xs text-purple-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            GIS Heatmap Grid
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeView === 'list'
                ? 'bg-white shadow-xs text-purple-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Priority Queue ({hotspots.length})
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-semibold text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-purple-600" />
              Risk Level:
            </span>
            {[
              { id: 'all', label: 'All Zones' },
              { id: 'critical', label: '🚨 Critical' },
              { id: 'high', label: '⚠️ High Risk' },
              { id: 'moderate', label: 'ℹ️ Moderate' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterSeverity(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filterSeverity === f.id
                    ? 'bg-purple-100 text-purple-900 font-bold border border-purple-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
            <span>Telemetry: <strong>Live Multi-Sensor Mesh</strong></span>
          </div>
        </div>

        {/* VIEW 1: INTERACTIVE GIS HEATMAP GRID */}
        {activeView === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Map Canvas Visual Area */}
            <div className="lg:col-span-8 relative bg-slate-950 rounded-2xl p-4 sm:p-6 overflow-hidden border border-slate-800 text-white min-h-[380px] flex flex-col justify-between shadow-inner">
              
              {/* Map Background Grid & Radar Sweeping Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
              
              {/* Top Bar inside Map Canvas */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono font-bold text-slate-200">BENGALURU MUNICIPAL GEO-GRID</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>Zoom: 14.2x</span>
                  <span>Mesh Lat: 12.9716° N</span>
                  <span>Lng: 77.5946° E</span>
                </div>
              </div>

              {/* Spatial Interactive Hotspot Nodes inside map */}
              <div className="relative z-10 my-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {filteredHotspots.map((hs) => {
                  const style = getRiskColor(hs.riskLevel);
                  const isSelected = selectedHotspot?.id === hs.id;
                  return (
                    <div
                      key={hs.id}
                      onClick={() => {
                        setSelectedHotspotId(hs.id);
                        onSelectHotspot?.(hs);
                      }}
                      className={`relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                        isSelected
                          ? `bg-slate-900/95 border-purple-400 shadow-lg ring-2 ring-purple-500/50 scale-[1.02]`
                          : `bg-slate-900/60 border-slate-800 hover:border-slate-600 hover:bg-slate-900/90`
                      }`}
                    >
                      {/* Pulse beacon for critical items */}
                      {hs.riskLevel === 'Critical' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${style.bg}`} />
                          <span className="font-mono text-[10px] text-slate-400">{hs.ward}</span>
                        </div>
                        <Badge variant={style.badgeVariant} size="sm">
                          {hs.riskLevel}
                        </Badge>
                      </div>

                      <h4 className="font-bold text-xs text-white leading-tight line-clamp-1">
                        {hs.name}
                      </h4>

                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center gap-1 font-mono">
                          <Flame className="w-3 h-3 text-rose-400" />
                          {hs.complaintCount} tickets
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {hs.resolutionRate}% res.
                        </span>
                      </div>

                      {/* Mini density bar */}
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full ${style.bg}`}
                          style={{ width: `${(hs.complaintCount / 75) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Footer status */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical (≥ 40 tickets)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> High (30 - 39)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-500" /> Moderate (&lt; 30)
                  </span>
                </div>
                <div className="text-purple-300 font-medium">
                  Click any hotspot tile to inspect & dispatch
                </div>
              </div>

            </div>

            {/* Selected Hotspot Intelligence Panel */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
              {selectedHotspot ? (
                <div className="space-y-4">
                  {/* Header of selected hotspot */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {selectedHotspot.id} • {selectedHotspot.ward}
                      </span>
                      <Badge variant={getRiskColor(selectedHotspot.riskLevel).badgeVariant} size="sm">
                        {selectedHotspot.riskLevel} Risk
                      </Badge>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {selectedHotspot.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      {selectedHotspot.location}
                    </p>
                  </div>

                  {/* Metrics grid for this hotspot */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[11px] block">Complaint Density</span>
                      <span className="text-lg font-extrabold text-slate-900 font-mono">
                        {selectedHotspot.complaintCount} <span className="text-xs font-normal text-slate-500">tickets</span>
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[11px] block">Resolution Rate</span>
                      <span className="text-lg font-extrabold text-emerald-700 font-mono">
                        {selectedHotspot.resolutionRate}%
                      </span>
                    </div>
                  </div>

                  {/* Hotspot details breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Responsible Dept:</span>
                      <strong className="text-slate-800">{selectedHotspot.category}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Assigned Lead:</span>
                      <strong className="text-slate-800">{selectedHotspot.leadOfficer}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">GPS Coordinates:</span>
                      <span className="font-mono text-purple-700 font-semibold">{selectedHotspot.coordinates}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Estimated Citizen Radius:</span>
                      <strong className="text-slate-800">{selectedHotspot.affectedRadius}</strong>
                    </div>
                  </div>

                  {/* AI Root Cause Diagnostic */}
                  <div className="p-3 bg-purple-50/90 rounded-xl border border-purple-200 text-xs space-y-1">
                    <div className="flex items-center gap-1 font-bold text-purple-900 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                      AI Diagnostic Summary
                    </div>
                    <p className="text-[11px] text-purple-800 leading-relaxed">
                      {selectedHotspot.aiDiagnostic}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Dispatch Action Button */}
              <div className="pt-2">
                <Button
                  variant="danger"
                  fullWidth
                  size="md"
                  icon={Send}
                  onClick={() => onOpenDispatchModal(selectedHotspot)}
                  className="shadow-sm font-bold"
                >
                  Dispatch Emergency Response Team
                </Button>
              </div>
            </div>

          </div>
        ) : (
          /* VIEW 2: HIGH-DENSITY QUEUE LIST */
          <div className="space-y-3">
            {filteredHotspots.map((hs) => {
              const style = getRiskColor(hs.riskLevel);
              return (
                <div
                  key={hs.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">{hs.id}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 text-xs">{hs.ward}</span>
                      <Badge variant={style.badgeVariant} size="sm">{hs.riskLevel} Priority</Badge>
                      <Badge variant="outline" size="sm">{hs.category}</Badge>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{hs.name}</h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-600" /> {hs.location}
                      </span>
                      <span>•</span>
                      <span>Lead: <strong>{hs.leadOfficer}</strong></span>
                      <span>•</span>
                      <span className="text-rose-600 font-bold font-mono">{hs.complaintCount} complaints ({hs.resolutionRate}% res.)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedHotspotId(hs.id);
                        setActiveView('map');
                      }}
                    >
                      Inspect Geo
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Send}
                      onClick={() => onOpenDispatchModal(hs)}
                    >
                      Dispatch Team
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </Card>
  );
}

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Compass,
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

// Center on Ward 14 (Indiranagar, Bangalore)
const WARD_CENTER = [12.9784, 77.6408];

export default function OfficerWardMap({
  complaints = [],
  onUpdateStatus,
  onViewDetails,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: WARD_CENTER,
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add a visual ward boundary circle
      const wardCircle = L.circle(WARD_CENTER, {
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.08,
        radius: 1400,
        weight: 2,
        dashArray: '6, 8',
      }).addTo(map);

      wardCircle.bindTooltip('Ward 14 (Indiranagar) - Zonal Jurisdiction', {
        permanent: false,
        direction: 'top',
        className: 'ward-tooltip',
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers whenever complaints list changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Helper for marker color
    const getMarkerHtml = (complaint) => {
      const isHigh = complaint.priority === 'High';
      const isResolved = complaint.status === 'Resolved';
      const isInProg = complaint.status === 'In Progress';

      let bgClass = 'bg-amber-500 text-white';
      let ringClass = 'ring-amber-200';
      let pulse = '';

      if (isResolved) {
        bgClass = 'bg-emerald-600 text-white';
        ringClass = 'ring-emerald-200';
      } else if (isHigh) {
        bgClass = 'bg-rose-600 text-white';
        ringClass = 'ring-rose-200';
        pulse = '<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>';
      } else if (isInProg) {
        bgClass = 'bg-sky-600 text-white';
        ringClass = 'ring-sky-200';
      }

      return `
        <div class="relative flex items-center justify-center cursor-pointer transform hover:scale-125 transition-transform duration-200">
          <div class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center font-bold text-xs ${bgClass} ring-4 ${ringClass}">
            <span>${complaint.urgencyScore || '!'}</span>
          </div>
          ${pulse}
        </div>
      `;
    };

    // Add marker for each complaint
    complaints.forEach((c) => {
      if (!c.coordinates || c.coordinates.length !== 2) return;

      const customIcon = L.divIcon({
        html: getMarkerHtml(c),
        className: 'custom-map-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker(c.coordinates, { icon: customIcon }).addTo(map);

      // Popup Content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans text-slate-900 min-w-[220px]';
      popupContent.innerHTML = `
        <div class="space-y-1.5">
          <div class="flex items-center justify-between gap-2">
            <span class="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">${c.id}</span>
            <span class="text-[10px] font-semibold ${c.status === 'Resolved' ? 'text-emerald-600' : c.priority === 'High' ? 'text-rose-600' : 'text-slate-600'}">${c.status}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 leading-tight">${c.title}</h4>
          <p class="text-[11px] text-slate-500">${c.location}</p>
          <div class="flex items-center justify-between text-[10px] text-slate-600 pt-1 border-t border-slate-100">
            <span>AI Urgency: <strong>${c.urgencyScore}/100</strong></span>
            <span class="font-semibold text-sky-700">${c.category}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedComplaint(c);
      });

      markersRef.current.push(marker);
    });
  }, [complaints]);

  // Fly to complaint when selected from side list
  const handleFlyTo = (c) => {
    setSelectedComplaint(c);
    if (mapInstanceRef.current && c.coordinates) {
      mapInstanceRef.current.flyTo(c.coordinates, 16, { duration: 1.2 });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Zonal GIS Ward Map</span>
              <span className="text-[11px] font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                Ward 14 (Indiranagar)
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Interactive Leaflet satellite grid showing <strong>{complaints.length}</strong> active task pins
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block ring-2 ring-rose-200 animate-pulse" />
            <span className="font-medium text-slate-700">High Priority</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block ring-2 ring-sky-200" />
            <span className="font-medium text-slate-700">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ring-2 ring-amber-200" />
            <span className="font-medium text-slate-700">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block ring-2 ring-emerald-200" />
            <span className="font-medium text-slate-700">Resolved</span>
          </div>
        </div>
      </div>

      {/* Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-[560px]">
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-8 h-full relative z-0">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Pinned Tasks List Sidebar */}
        <div className="lg:col-span-4 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/50 flex flex-col">
          <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pinned Ward Incidents ({complaints.length})
            </span>
            <span className="text-[11px] text-slate-400">Click to locate on map</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {complaints.map((item) => {
              const isSelected = selectedComplaint?.id === item.id;
              const isHigh = item.priority === 'High';
              return (
                <div
                  key={item.id}
                  onClick={() => handleFlyTo(item)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300/40 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.id}
                    </span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <h5 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                    {item.title}
                  </h5>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">
                      AI Score: <strong className={isHigh ? 'text-rose-600' : 'text-slate-900'}>{item.urgencyScore}</strong>
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(item);
                        }}
                        className="text-sky-600 hover:text-sky-800 font-medium hover:underline text-[11px]"
                      >
                        Inspect
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateStatus(item);
                        }}
                        className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline text-[11px]"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Zonal Info Footer */}
          <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-500 space-y-1">
            <div className="flex justify-between font-semibold text-slate-800 text-[11px]">
              <span>Field Officer:</span>
              <span className="text-sky-700">Kalai S. (BBMP-OFC-0842)</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Coverage:</span>
              <span>Indiranagar Ward 14 • East Zone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

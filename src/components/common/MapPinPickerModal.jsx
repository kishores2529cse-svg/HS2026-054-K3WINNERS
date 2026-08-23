import React, { useState, useEffect } from 'react';
import { MapPin, Compass, ExternalLink } from 'lucide-react';
import Modal from './Modal';

export default function MapPinPickerModal({
  isOpen,
  onClose,
  initialLat = 12.9716,
  initialLng = 77.5946,
  initialAddress = '',
  onConfirmPin,
}) {
  const [coords, setCoords] = useState({ lat: initialLat, lng: initialLng });
  const [address, setAddress] = useState(initialAddress || 'Indiranagar, Bengaluru');
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    if (initialLat && initialLng) {
      setCoords({ lat: initialLat, lng: initialLng });
    }
    if (initialAddress) {
      setAddress(initialAddress);
    }
  }, [initialLat, initialLng, initialAddress, isOpen]);

  const fetchAddress = async (lat, lng) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await res.json();
      if (data && data.display_name) {
        const addr = data.address || {};
        const road = addr.road || addr.suburb || addr.neighbourhood || addr.amenity || '';
        const city = addr.city || addr.town || addr.village || addr.county || 'Bengaluru';
        const stateStr = addr.state || 'Karnataka';
        const postcode = addr.postcode ? ` - ${addr.postcode}` : '';
        const formatted = `${road ? road + ', ' : ''}${city}, ${stateStr}${postcode} (GPS: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`;
        setAddress(formatted);
      } else {
        setAddress(`Pinned Spot: ${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`);
      }
    } catch {
      setAddress(`Pinned Spot: ${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E (Google Maps Pin)`);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleDetectCurrentGps = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });
          fetchAddress(lat, lng);
          setIsLocating(false);
        },
        (err) => {
          console.warn('Geolocation fallback:', err);
          const defaultLat = 12.9716;
          const defaultLng = 77.5946;
          setCoords({ lat: defaultLat, lng: defaultLng });
          fetchAddress(defaultLat, defaultLng);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleConfirm = () => {
    onConfirmPin({
      lat: coords.lat,
      lng: coords.lng,
      address,
      googleMapsUrl: `https://www.google.com/maps?q=${coords.lat},${coords.lng}`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📍 Google Maps Live Spot Pin Picker"
      subtitle="Pin your exact issue spot live using Google Maps reference"
      primaryAction={{
        label: isGeocoding ? 'Fetching Address...' : 'Confirm & Save Pinned Spot',
        onClick: handleConfirm,
        variant: 'primary',
        disabled: isGeocoding,
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: onClose,
      }}
    >
      <div className="space-y-4 py-1">
        
        {/* TOP ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <MapPin className="w-4 h-4 text-rose-600 animate-bounce" />
            <span>Live Google Maps Reference Pin</span>
          </div>
          <button
            type="button"
            onClick={handleDetectCurrentGps}
            disabled={isLocating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating GPS...' : 'Use My Current Live GPS'}</span>
          </button>
        </div>

        {/* INTERACTIVE MAP CONTAINER */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner h-72 bg-slate-900 group">
          <iframe
            title="Google Maps Interactive Picker"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=17&output=embed`}
            className="opacity-95"
          />

          {/* CENTER LIVE PIN MARKER OVERLAY */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="flex flex-col items-center transform -translate-y-6">
              <div className="p-2 bg-rose-600 text-white rounded-full shadow-2xl ring-4 ring-rose-500/40 animate-pulse">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="w-3 h-1.5 bg-slate-950/80 rounded-full blur-[1px] mt-0.5" />
            </div>
          </div>

          {/* SPOT COORDINATES OVERLAY */}
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-white text-xs flex items-center justify-between gap-2 shadow-lg">
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">Selected Spot Coordinates:</span>
              <span className="font-mono font-bold text-emerald-400 truncate block">
                {coords.lat.toFixed(5)}° N, {coords.lng.toFixed(5)}° E
              </span>
            </div>
            <a
              href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1 shrink-0"
            >
              <span>Full Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* CAPTURED ADDRESS DISPLAY */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            Resolved Street Address Landmark:
          </span>
          <p className="font-bold text-slate-900 leading-snug">
            {isGeocoding ? 'Reverse geocoding spot location...' : address}
          </p>
        </div>

      </div>
    </Modal>
  );
}

import React from 'react';
import { MapPin, Navigation, Shield, Building2, Hospital, Compass } from 'lucide-react';

export default function LocationMap({ location }) {
  if (!location) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-cyan-400" />
          <span>Location Intelligence & Jurisdiction Routing</span>
        </h4>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
          GPS Coordinates: {location.lat}, {location.lng}
        </span>
      </div>

      {/* Mock Graphic Map Card */}
      <div className="relative h-44 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 bg-grid-pattern">
        {/* Decorative Grid & Radar sweep */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-500/20 animate-ping"></div>

        {/* Map Pins */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-red-500/50 text-red-300 px-3 py-1.5 rounded-lg text-xs font-mono shadow-lg">
            <MapPin className="w-4 h-4 text-red-400 animate-bounce" />
            <div>
              <span className="font-bold block">Victim Signal Location</span>
              <span className="text-[10px] text-slate-300">{location.address}</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>District: {location.district}</span>
          </div>
        </div>

        {/* Routing Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Nearest Police Station</span>
            </div>
            <p className="text-[11px] text-cyan-300 font-mono">{location.nearestPoliceStation}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>SC/ST Protection Cell</span>
            </div>
            <p className="text-[11px] text-purple-300 font-mono">{location.scStProtectionCell}</p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Hospital className="w-3.5 h-3.5 text-emerald-400" />
              <span>Emergency Hospital</span>
            </div>
            <p className="text-[11px] text-emerald-300 font-mono">{location.nearestHospital}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Shield, Radio, Activity, LayoutDashboard, Presentation, AlertOctagon, HeartHandshake } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, liveCaseCount = 4, criticalCount = 1 }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                SATYA
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                SIH 2026 • PS 26093
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <span>AI-Powered Real-Time Safety & Victim Response System</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('authority')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'authority'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Authority Command Center</span>
            {criticalCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-red-500 text-white font-mono animate-pulse">
                {criticalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('victim')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'victim'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Victim Intake Portal (IVRS & Chat)</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'pitch'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>PS 26093 Pitch Deck</span>
          </button>
        </nav>

        {/* Live System Status Indicator */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono">Triage Engine: ONLINE</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 font-mono text-cyan-400">
            <Radio className="w-3.5 h-3.5" />
            <span>IVRS 14566 Live</span>
          </div>
        </div>

      </div>
    </header>
  );
}

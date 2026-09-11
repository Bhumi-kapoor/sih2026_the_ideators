import React, { useState } from 'react';
import { Shield, AlertTriangle, Radio, Activity, Filter, Search, Eye, Send, Clock, UserCheck, CheckCircle2 } from 'lucide-react';
import RiskBadge from '../RiskBadge';
import CaseDetailModal from './CaseDetailModal';

export default function CommandDashboard({ cases, onUpdateCase }) {
  const [selectedTierFilter, setSelectedTierFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesTier = selectedTierFilter === 'ALL' || c.riskTier === selectedTierFilter;
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.transcript.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location?.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const criticalCount = cases.filter(c => c.riskTier === 'CRITICAL').length;
  const highCount = cases.filter(c => c.riskTier === 'HIGH').length;

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-l-cyan-500">
          <div>
            <span className="text-xs text-slate-400 font-mono block">TOTAL TRIAGE INTAKES</span>
            <span className="text-2xl font-extrabold text-slate-100">{cases.length}</span>
            <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">Live IVRS + Web + App</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-l-red-500">
          <div>
            <span className="text-xs text-slate-400 font-mono block">CRITICAL EMERGENCY ALERTS</span>
            <span className="text-2xl font-extrabold text-red-400 animate-pulse">{criticalCount}</span>
            <span className="text-[10px] text-red-300 font-mono block mt-0.5">&lt; 15 min response target</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-l-orange-500">
          <div>
            <span className="text-xs text-slate-400 font-mono block">HIGH RISK CASES</span>
            <span className="text-2xl font-extrabold text-orange-400">{highCount}</span>
            <span className="text-[10px] text-orange-300 font-mono block mt-0.5">Cyber & Stalking Flags</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <span className="text-xs text-slate-400 font-mono block">AVG TIME TO ESCALATION</span>
            <span className="text-2xl font-extrabold text-emerald-400">1.4 m</span>
            <span className="text-[10px] text-emerald-300 font-mono block mt-0.5">Prior: 45 min manual</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tier Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTierFilter(tier)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all ${
                selectedTierFilter === tier
                  ? tier === 'CRITICAL'
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/50'
                    : tier === 'HIGH'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-900/50'
                    : tier === 'MODERATE'
                    ? 'bg-yellow-600 text-white shadow-md shadow-yellow-900/50'
                    : 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript, location, ID..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main Incident Feed Table */}
      <div className="glass-panel overflow-hidden border border-slate-800 rounded-2xl">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Active Incident Triage Dispatch Stream</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredCases.length} of {cases.length} cases
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 overflow-x-auto">
          {filteredCases.length > 0 ? (
            filteredCases.map((c) => (
              <div
                key={c.id}
                className="p-5 hover:bg-slate-900/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left: Metadata & Risk Badge */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="pt-0.5">
                    <RiskBadge tier={c.riskTier} />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-slate-100">{c.id}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {c.channel}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{c.timestamp}</span>
                      <span className="text-[11px] font-mono text-cyan-400">({c.language})</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-mono">
                      "{c.transcript}"
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] font-mono text-slate-400">Scores:</span>
                      <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        Distress: {c.distressScore}/100
                      </span>
                      <span className="text-[11px] font-mono text-orange-300 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                        Severity: {c.severityScore}/100
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono italic">
                        Location: {c.location?.district} ({c.location?.nearestPoliceStation})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-lg border font-mono ${
                    c.status === 'Pending Response'
                      ? 'bg-red-950/50 border-red-500/40 text-red-300'
                      : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                  }`}>
                    {c.status}
                  </span>

                  <button
                    onClick={() => setSelectedCaseModal(c)}
                    className="btn-cyber text-xs px-3.5 py-2 rounded-xl"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Case</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-500 font-mono text-sm">
              No triage cases match the selected filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCaseModal && (
        <CaseDetailModal
          caseItem={selectedCaseModal}
          onClose={() => setSelectedCaseModal(null)}
          onUpdateCase={(updated) => {
            onUpdateCase(updated);
            setSelectedCaseModal(updated);
          }}
        />
      )}
    </div>
  );
}

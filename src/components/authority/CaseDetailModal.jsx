import React, { useState } from 'react';
import { X, Shield, AlertTriangle, CheckCircle, MapPin, Send, MessageSquare, Activity, UserCheck, Scale, FileText, Check } from 'lucide-react';
import RiskBadge from '../RiskBadge';
import LocationMap from './LocationMap';

export default function CaseDetailModal({ caseItem, onClose, onUpdateCase }) {
  const [officerNotes, setOfficerNotes] = useState('');
  const [assignedOfficer, setAssignedOfficer] = useState(caseItem.assignedOfficer || 'Inspector V. Sharma');
  const [actionStatus, setActionStatus] = useState(caseItem.status);
  const [dispatchedActions, setDispatchedActions] = useState([]);
  const [feedbackLogged, setFeedbackLogged] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState('Accurate');

  if (!caseItem) return null;

  const handleDispatchAction = (actionId, title) => {
    setDispatchedActions(prev => [...prev, actionId]);
    
    // Add to audit trail history
    const updatedHistory = [
      ...caseItem.history,
      {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: `Officer ${assignedOfficer} dispatched action: ${title}`
      }
    ];

    onUpdateCase({
      ...caseItem,
      status: "In Progress",
      assignedOfficer: assignedOfficer,
      history: updatedHistory
    });
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    setFeedbackLogged(true);

    const updatedHistory = [
      ...caseItem.history,
      {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: `Feedback logged by ${assignedOfficer}: Score Precision evaluated as '${feedbackRating}'. Notes: ${officerNotes || 'None'}`
      }
    ];

    onUpdateCase({
      ...caseItem,
      status: "Action Taken",
      history: updatedHistory
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/30 shadow-2xl p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-slate-100">{caseItem.id}</h2>
              <RiskBadge tier={caseItem.riskTier} />
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {caseItem.channel}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Logged {caseItem.timestamp} • Language: {caseItem.language} • Victim: {caseItem.victimName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Dual Score & Explainability Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          {/* Distress Meter */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">EXPLAINABLE DISTRESS / VULNERABILITY SCORE</span>
              <span className="text-cyan-400 font-bold">{caseItem.distressScore} / 100</span>
            </div>
            <div className="meter-bg h-3 mb-3">
              <div
                className="meter-fill bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${caseItem.distressScore}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 block font-mono font-semibold mb-1">Key Psychological Rationale Drivers:</span>
            <ul className="space-y-1 text-xs text-slate-300">
              {caseItem.rationale?.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Severity Meter */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">INCIDENT SEVERITY SCORE</span>
              <span className="text-orange-400 font-bold">{caseItem.severityScore} / 100</span>
            </div>
            <div className="meter-bg h-3 mb-3">
              <div
                className="meter-fill bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                style={{ width: `${caseItem.severityScore}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 block font-mono font-semibold mb-1">Incident Threat Markers:</span>
            <ul className="space-y-1 text-xs text-slate-300">
              {caseItem.nlpMarkers?.map((m, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-orange-400">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Transcript & Voice Prosody Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Raw Victim Statement & Translation</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-sm leading-relaxed">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Original ({caseItem.language}):</span>
                <p className="text-slate-100">{caseItem.transcript}</p>
              </div>
              {caseItem.englishTranslation && caseItem.language !== 'English' && (
                <div className="pt-2 border-t border-slate-900">
                  <span className="text-[10px] text-slate-500 block uppercase">English Translation:</span>
                  <p className="text-slate-300 italic">{caseItem.englishTranslation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Voice Prosody Metrics (if IVRS audio) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Voice Prosody Analysis</span>
            </h4>
            {caseItem.voiceProsody ? (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Pitch Tremor:</span>
                  <span className="text-cyan-400 font-bold">{caseItem.voiceProsody.pitchTremorPercent}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Speech Cadence:</span>
                  <span className="text-indigo-400 font-bold">{caseItem.voiceProsody.speechPaceWpm} WPM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Acoustic Pitch:</span>
                  <span className="text-purple-400 font-bold">{caseItem.voiceProsody.pitchHz} Hz</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Vocal Arousal Index:</span>
                  <span className="text-red-400 font-bold">{((caseItem.voiceProsody.vocalArousal || 0.85) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 font-mono italic">
                Text/Chatbot Intake channel. Voice prosody not applicable.
              </div>
            )}
          </div>
        </div>

        {/* Location Intelligence Map Routing */}
        <LocationMap location={caseItem.location} />

        {/* AI Recommendation Engine & Action Hub */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>AI Recommendation & Officer Action Hub (Human-in-the-Loop)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {caseItem.recommendedActions?.map((act) => {
              const isDispatched = dispatchedActions.includes(act.id);
              return (
                <div
                  key={act.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                    isDispatched
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900/90 border-slate-800 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {act.type}
                      </span>
                      <span className="text-[10px] font-mono text-orange-400">{act.priority}</span>
                    </div>
                    <h5 className="font-semibold text-sm text-slate-100 mt-1">{act.title}</h5>
                    <p className="text-xs text-slate-400 mt-1">{act.desc}</p>
                  </div>

                  <button
                    onClick={() => handleDispatchAction(act.id, act.title)}
                    disabled={isDispatched}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isDispatched
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                        : 'btn-cyber'
                    }`}
                  >
                    {isDispatched ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Action Dispatched</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Approve & Dispatch</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Trail & Retraining Feedback Form */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audit Trail */}
          <div>
            <h5 className="text-xs font-mono uppercase text-slate-400 mb-2">Audit Trail Log:</h5>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
              {caseItem.history?.map((h, idx) => (
                <div key={idx} className="text-xs p-2 rounded bg-slate-950 border border-slate-800 flex items-start gap-2 font-mono">
                  <span className="text-cyan-400">{h.time}</span>
                  <span className="text-slate-300">{h.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback & Retraining Form */}
          <form onSubmit={handleSaveFeedback} className="space-y-3">
            <h5 className="text-xs font-mono uppercase text-slate-400">Officer Outcome & Model Feedback:</h5>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-300 font-mono">Officer ID:</label>
              <input
                type="text"
                value={assignedOfficer}
                onChange={(e) => setAssignedOfficer(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 flex-1 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-300 font-mono">AI Score Precision:</label>
              <select
                value={feedbackRating}
                onChange={(e) => setFeedbackRating(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 flex-1 focus:outline-none"
              >
                <option value="Accurate">Accurate - Correct Risk Tier</option>
                <option value="Over-estimated">Over-estimated (False Positive)</option>
                <option value="Under-estimated">Under-estimated (Requires Retraining)</option>
              </select>
            </div>

            <textarea
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="Add post-incident officer notes..."
              rows={2}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-600"
            />

            <button
              type="submit"
              className="w-full btn-cyber py-2 rounded-lg text-xs justify-center"
            >
              <UserCheck className="w-4 h-4" />
              <span>{feedbackLogged ? "Feedback Updated" : "Log Official Case Outcome & Retrain Data"}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

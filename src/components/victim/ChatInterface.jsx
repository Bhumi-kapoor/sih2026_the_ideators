import React, { useState } from 'react';
import { Send, Sparkles, AlertTriangle, ShieldCheck, Languages, RefreshCw, Paperclip } from 'lucide-react';
import { calculateDistressScore } from '../../engine/distressScorer';
import { calculateSeverityScore } from '../../engine/severityScorer';
import { deriveRiskTier } from '../../engine/recommendationEngine';
import RiskBadge from '../RiskBadge';

const BACKEND_BASE_URL = "http://127.0.0.1:8000/api/v1";

/**
 * FEATURE 1: Dispatches the recorded voice payload file straight to the FastAPI engine.
 */
async function processVoiceSignalToBackend(audioBlob) {
    const url = `${BACKEND_BASE_URL}/process_audio`;
    const formData = new FormData();
    formData.append("file", audioBlob, "distress_sample.wav");

    try {
        console.log("📡 Forwarding voice signal to SATYA offline security matrix...");
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("💥 Failed to establish connection bridge with local server:", error);
        return null;
    }
}

/**
 * FEATURE 2: Sends the victim's selected counselor choice token back to the backend.
 */
async function submitCounselorOverrideToBackend(counselorName, rawCaseText) {
    const url = `${BACKEND_BASE_URL}/assign-counselor`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chosen_counselor: counselorName, case_text: rawCaseText })
        });
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("💥 Failed to dispatch selection handshake:", error);
        return null;
    }
}


export default function ChatInterface({ onNewCaseSubmit }) {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste. I am SATYA Safety AI. How can we help you right now? You are safe here. Describe what happened or ask for help in Hindi, Punjabi, or English.',
      time: 'Just now'
    }
  ]);

  const [liveAnalysis, setLiveAnalysis] = useState(null);

  // Analyze text in real-time as user types
  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (text.trim().length > 8) {
      const d = calculateDistressScore(text);
      const s = calculateSeverityScore(text);
      const risk = deriveRiskTier(d.distressScore, s.severityScore);
      setLiveAnalysis({
        distressScore: d.distressScore,
        severityScore: s.severityScore,
        distressRationale: d.rationale,
        severityFactors: s.factors,
        riskTier: risk.tier,
        riskColor: risk.color
      });
    } else {
      setLiveAnalysis(null);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const d = calculateDistressScore(inputText);
    const s = calculateSeverityScore(inputText);
    const risk = deriveRiskTier(d.distressScore, s.severityScore);

    const botResponse = {
      sender: 'bot',
      text: `Case logged with urgency tier ${risk.tier}. Authorities and emergency counseling are alerted. Staying on line with you.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      analysis: {
        distressScore: d.distressScore,
        severityScore: s.severityScore,
        riskTier: risk.tier,
        rationale: d.rationale
      }
    };

    setChatMessages(prev => [...prev, userMsg, botResponse]);

    // Submit case to global authority dashboard feed
    if (onNewCaseSubmit) {
      onNewCaseSubmit({
        id: `SATYA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: "Just now",
        channel: "Chatbot Intake",
        language: selectedLanguage,
        victimName: "Anonymized Victim (Live Chat)",
        location: {
          address: "Sector 22-A, Helpline Contact Point, Chandigarh",
          lat: 30.7333,
          lng: 76.7794,
          district: "Chandigarh Central",
          nearestPoliceStation: "Sector 22 Police Station (0.5 km)",
          scStProtectionCell: "District Welfare & SC/ST Cell (1.8 km)",
          nearestHospital: "Civil Hospital Sector 22 (0.7 km)"
        },
        audioSample: null,
        transcript: inputText,
        englishTranslation: inputText,
        voiceProsody: null,
        nlpMarkers: d.rationale,
        distressScore: d.distressScore,
        severityScore: s.severityScore,
        riskTier: risk.tier,
        rationale: [...d.rationale, ...s.factors],
        recommendedActions: [
          { id: Date.now(), title: `${risk.tier} Protocol Alert Dispatch`, type: "police", priority: risk.tier, desc: "Immediate counselor call bridge and station dispatch alert." }
        ],
        status: "Pending Response",
        assignedOfficer: null,
        history: [
          { time: new Date().toLocaleTimeString(), note: "Chatbot intake submitted by victim" }
        ]
      });
    }

    setInputText('');
    setLiveAnalysis(null);
  };

  const applyPreset = (presetText, lang) => {
    setSelectedLanguage(lang);
    setInputText(presetText);

    const d = calculateDistressScore(presetText);
    const s = calculateSeverityScore(presetText);
    const risk = deriveRiskTier(d.distressScore, s.severityScore);
    setLiveAnalysis({
      distressScore: d.distressScore,
      severityScore: s.severityScore,
      distressRationale: d.rationale,
      severityFactors: s.factors,
      riskTier: risk.tier,
      riskColor: risk.color
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Window */}
      <div className="lg:col-span-2 glass-panel p-5 flex flex-col h-[580px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                SATYA Confidential AI Safety Assistant
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </h3>
              <p className="text-xs text-slate-400">Consent-First • End-to-End Encrypted Triage Intake</p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Languages className="w-4 h-4 text-cyan-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="Hindi" className="bg-slate-900">Hindi (हिंदी)</option>
              <option value="Punjabi" className="bg-slate-900">Punjabi (ਪੰਜਾਬੀ)</option>
              <option value="English" className="bg-slate-900">English</option>
            </select>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md shadow-cyan-900/30'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <p>{msg.text}</p>
                {msg.analysis && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4 text-xs font-mono text-cyan-300">
                    <span>AI Risk Tier:</span>
                    <RiskBadge tier={msg.analysis.riskTier} />
                  </div>
                )}
              </div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Presets */}
        <div className="pt-3 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <span>Quick Scenario Demo Templates:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyPreset("मदद कीजिए! कोई मेरा पीछा कर रहा है और दरवाजे पर हमला कर रहा है!", "Hindi")}
              className="text-xs px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-all"
            >
              🚨 Hindi Threat (Critical)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("ਮੈਨੂੰ ਪਿੰਡ ਦੇ ਕੁਝ ਲੋਕ ਜ਼ਮੀਨੀ ਵਿਵਾਦ ਕਰਕੇ ਤੰਗ ਕਰ ਰਹੇ ਹਨ ਅਤੇ ਗਾਲਾਂ ਕੱਢ ਰਹੇ ਹਨ।", "Punjabi")}
              className="text-xs px-2.5 py-1 rounded bg-yellow-950/60 hover:bg-yellow-900/60 text-yellow-300 border border-yellow-800/40 transition-all"
            >
              ⚠️ Punjabi Dispute (Moderate)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("I am facing cyber stalking and harassment online by a college senior.", "English")}
              className="text-xs px-2.5 py-1 rounded bg-orange-950/60 hover:bg-orange-900/60 text-orange-300 border border-orange-800/40 transition-all"
            >
              🔶 English Stalking (High)
            </button>
          </div>
        </div>

        {/* Text Input */}
        <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={handleTextChange}
            placeholder="Type your distress report here..."
            className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="btn-cyber px-5 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>Send Report</span>
          </button>
        </form>
      </div>

      {/* Real-time Explainable Score Card */}
      <div className="glass-panel p-5 flex flex-col justify-between h-[580px]">
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-slate-100">Live Stress & Severity Engine</h3>
          </div>

          {liveAnalysis ? (
            <div className="space-y-5 animate-fade-in">
              {/* Risk Tier Header */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono block">COMPUTED RISK TIER</span>
                  <span className="text-lg font-extrabold text-slate-100">{liveAnalysis.riskTier}</span>
                </div>
                <RiskBadge tier={liveAnalysis.riskTier} />
              </div>

              {/* Meter 1: Distress / Vulnerability Score */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span className="text-slate-300">Distress / Vulnerability Score:</span>
                  <span className="text-cyan-400 font-bold">{liveAnalysis.distressScore} / 100</span>
                </div>
                <div className="meter-bg h-3">
                  <div
                    className="meter-fill bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-sm"
                    style={{ width: `${liveAnalysis.distressScore}%` }}
                  />
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                  {liveAnalysis.distressRationale.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meter 2: Incident Severity Score */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span className="text-slate-300">Incident Severity Score:</span>
                  <span className="text-orange-400 font-bold">{liveAnalysis.severityScore} / 100</span>
                </div>
                <div className="meter-bg h-3">
                  <div
                    className="meter-fill bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                    style={{ width: `${liveAnalysis.severityScore}%` }}
                  />
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                  {liveAnalysis.severityFactors.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-orange-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
              <ShieldCheck className="w-12 h-12 text-slate-700" />
              <p className="text-sm">Start typing or select a scenario template to observe real-time explainable risk scoring.</p>
            </div>
          )}
        </div>

        {/* Guardrail Note */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">🛡️ Fail-Safe Protocol (PS 26093):</p>
          <p>Scoring defaults to higher urgency on model uncertainty to guarantee false negatives never put victims at risk.</p>
        </div>
      </div>
    </div>
  );
}

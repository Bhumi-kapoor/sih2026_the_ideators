import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneOff, Mic, Volume2, Activity, Play, Pause, Zap, CheckCircle2 } from 'lucide-react';
import { AUDIO_DEMO_PRESETS } from '../../engine/mockData';
import AudioWaveform from '../AudioWaveform';
import RiskBadge from '../RiskBadge';

export default function IVRSSimulator({ onNewCaseSubmit }) {
  const [selectedPreset, setSelectedPreset] = useState(AUDIO_DEMO_PRESETS[0]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [streamingTranscript, setStreamingTranscript] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Call timer effect
  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  // Simulate live speech-to-text transcript streaming when call starts
  const startCallSimulation = () => {
    setIsCallActive(true);
    setStreamingTranscript('');
    setIsSubmitted(false);

    const fullText = selectedPreset.transcript;
    let currentLength = 0;

    const streamInterval = setInterval(() => {
      currentLength += 3;
      if (currentLength <= fullText.length) {
        setStreamingTranscript(fullText.substring(0, currentLength));
      } else {
        setStreamingTranscript(fullText);
        clearInterval(streamInterval);
      }
    }, 120);
  };

  const endCallSimulation = () => {
    setIsCallActive(false);

    // Push call intake case to Authority Dashboard
    if (onNewCaseSubmit && streamingTranscript) {
      onNewCaseSubmit({
        id: `SATYA-IVRS-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: "Just now",
        channel: "IVRS 14566 Voice Call",
        language: selectedPreset.id.includes('punjabi') ? 'Punjabi' : selectedPreset.id.includes('hindi') ? 'Hindi' : 'English',
        victimName: `IVRS Caller #${Math.floor(100 + Math.random() * 900)}`,
        location: {
          address: "Sector 17-B Market, Chandigarh (Cell Tower Triangulation)",
          lat: 30.7398,
          lng: 76.7827,
          district: "Chandigarh Central",
          nearestPoliceStation: "Sector 17 Model Police Station (0.8 km)",
          scStProtectionCell: "District Welfare & SC/ST Cell (2.1 km)",
          nearestHospital: "PGIMER Emergency (3.4 km)"
        },
        audioSample: "sample_ivrs_recording.wav",
        transcript: streamingTranscript,
        englishTranslation: streamingTranscript,
        voiceProsody: {
          pitchHz: 310,
          pitchTremorPercent: selectedPreset.pitchTremor,
          speechPaceWpm: selectedPreset.paceWpm,
          pauseFrequency: 12,
          vocalArousal: selectedPreset.pitchTremor / 100
        },
        nlpMarkers: [
          `Voice Pitch Tremor (${selectedPreset.pitchTremor}%)`,
          `High Speech Pace (${selectedPreset.paceWpm} WPM)`,
          "Live IVRS Voice Distress Flag"
        ],
        distressScore: selectedPreset.distressScore,
        severityScore: selectedPreset.severityScore,
        riskTier: selectedPreset.riskTier,
        rationale: [
          `Speech prosody pitch tremor at ${selectedPreset.pitchTremor}%`,
          `Abnormal vocal pace at ${selectedPreset.paceWpm} WPM`,
          `Voice keyword distress match`
        ],
        recommendedActions: [
          { id: Date.now(), title: "Immediate Voice Helpline Escort Protocol", type: "police", priority: selectedPreset.riskTier, desc: "High vocal tremor alert logged via IVRS Helpline 14566." }
        ],
        status: "Pending Response",
        assignedOfficer: null,
        history: [
          { time: new Date().toLocaleTimeString(), note: "IVRS 14566 Call Completed & Multimodal Speech Score Processed" }
        ]
      });
      setIsSubmitted(true);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Phone Simulator Panel */}
      <div className="glass-panel p-6 flex flex-col items-center justify-between min-h-[580px]">
        <div className="w-full">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-slate-100">IVRS 14566 Call Simulator</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded">
              VOIP DEMO
            </span>
          </div>

          {/* Preset Selector */}
          <div className="mb-6 space-y-2">
            <label className="text-xs text-slate-400 font-mono block">SELECT AUDIO CALL SCENARIO:</label>
            <div className="space-y-2">
              {AUDIO_DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  disabled={isCallActive}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setStreamingTranscript('');
                    setIsSubmitted(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    selectedPreset.id === preset.id
                      ? 'bg-cyan-950/70 border-cyan-500 text-slate-100 shadow-md shadow-cyan-950/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-medium">{preset.name}</span>
                  <RiskBadge tier={preset.riskTier} showIcon={false} />
                </button>
              ))}
            </div>
          </div>

          {/* Call Status Box */}
          <div className="w-full p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isCallActive
                ? 'bg-red-500/20 border-2 border-red-500 animate-pulse text-red-400 shadow-lg shadow-red-500/30'
                : 'bg-slate-800 border border-slate-700 text-slate-400'
            }`}>
              <Mic className="w-8 h-8" />
            </div>

            <div className="text-center font-mono">
              <span className="text-xs text-slate-400 block">NATIONAL HELPLINE 14566</span>
              <span className="text-lg font-bold text-slate-100">
                {isCallActive ? `IN CALL — ${formatTimer(callDuration)}` : 'DISCONNECTED'}
              </span>
            </div>

            {/* Waveform */}
            <div className="w-full mt-2">
              <AudioWaveform isPlaying={isCallActive} barsCount={28} />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="w-full space-y-3 pt-6 border-t border-slate-800">
          {!isCallActive ? (
            <button
              onClick={startCallSimulation}
              className="w-full btn-cyber py-3.5 rounded-xl justify-center text-sm font-semibold shadow-lg shadow-cyan-500/20"
            >
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Simulate Victim IVRS Call</span>
            </button>
          ) : (
            <button
              onClick={endCallSimulation}
              className="w-full btn-danger py-3.5 rounded-xl justify-center text-sm font-semibold flex items-center gap-2"
            >
              <PhoneOff className="w-5 h-5" />
              <span>Hang Up & Process Incident</span>
            </button>
          )}

          {isSubmitted && (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Call intake pushed to Authority Command Feed with voice prosody breakdown!</span>
            </div>
          )}
        </div>
      </div>

      {/* Voice Prosody & Speech-to-Text Live Stream */}
      <div className="lg:col-span-2 glass-panel p-6 flex flex-col justify-between min-h-[580px]">
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-slate-100">Acoustic Prosody & Speech-to-Text Engine</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Whisper / IndicBERT Pipeline</span>
          </div>

          {/* Prosody Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">PITCH TREMOR</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-cyan-400">
                  {isCallActive ? selectedPreset.pitchTremor : 0}%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Normal &lt; 25%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">SPEECH PACE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-indigo-400">
                  {isCallActive ? selectedPreset.paceWpm : 0}
                </span>
                <span className="text-xs text-slate-400 font-mono">WPM</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Panicked &gt; 200 WPM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">DISTRESS SCORE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-red-400">
                  {isCallActive ? selectedPreset.distressScore : 0}
                </span>
                <span className="text-xs text-slate-400 font-mono">/100</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Multimodal Voice NLP</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">RISK TIER</span>
              <div className="mt-1">
                {isCallActive ? (
                  <RiskBadge tier={selectedPreset.riskTier} />
                ) : (
                  <span className="text-xs text-slate-500 font-mono">IDLE</span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Real-time Class</span>
            </div>
          </div>

          {/* Live Transcript Box */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>LIVE SPEECH-TO-TEXT STREAM (WHISPER / BHASHINI):</span>
              {isCallActive && <span className="text-cyan-400 animate-pulse font-bold">STREAMING ACTIVE...</span>}
            </label>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 min-h-[220px] font-mono text-sm leading-relaxed text-slate-200 relative">
              {streamingTranscript ? (
                <p className="whitespace-pre-wrap">{streamingTranscript}</p>
              ) : (
                <p className="text-slate-600 italic">Click "Simulate Victim IVRS Call" on the left panel to watch real-time speech prosody and transcript extraction.</p>
              )}
            </div>
          </div>
        </div>

        {/* Explainability footnote */}
        <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
          <span>Explainable Prosody Feature: OpenSMILE / Wav2Vec2 Acoustic Extractor</span>
          <span className="text-cyan-400">100% Consent-First Encryption</span>
        </div>
      </div>
    </div>
  );
}

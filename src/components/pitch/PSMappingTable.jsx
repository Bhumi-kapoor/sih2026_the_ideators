import React from 'react';
import { CheckCircle2, ShieldCheck, Cpu, ArrowRight, Lock, Activity, Users } from 'lucide-react';

export default function PSMappingTable() {
  const MAPPING_ROWS = [
    {
      psRequirement: "Assess stress/trauma/fear/anxiety of victims on NHAA 14566, portal, chatbot, IVRS",
      satyaSolution: "Multimodal Distress Analysis Module (Voice Prosody + Indic NLP)",
      techImplementation: "OpenSMILE prosody extractor (pitch tremor, speech rate, pause index) + IndicBERT fine-tuned sentiment classifier",
      evaluatorImpact: "100% covers voice & text interfaces seamlessly"
    },
    {
      psRequirement: "Standardized vulnerability assessment at first contact",
      satyaSolution: "Explainable Stress-Vulnerability Score (0–100 + rationale drivers)",
      techImplementation: "Dual Scoring Engine: Psychological Distress Score + Incident Severity Score computed independently with top 3 contributing factors",
      evaluatorImpact: "No opaque black-box AI scores; officer understands exact reasoning"
    },
    {
      psRequirement: "Works across multiple digital interfaces",
      satyaSolution: "Unified Real-Time Ingestion Pipeline",
      techImplementation: "WebSockets + REST API handling IVRS phone calls, Web Chatbot, Mobile App, and Portal intake forms in parallel",
      evaluatorImpact: "Single unified dashboard for all national helpline feeds"
    },
    {
      psRequirement: "No current mechanism exists",
      satyaSolution: "Real-Time Risk Classification (Low / Moderate / High / Critical)",
      techImplementation: "Rules + ML classification mapping risk tiers to response SLA targets (<15m for Critical)",
      evaluatorImpact: "Fills the existing structural gap in emergency triage"
    },
    {
      psRequirement: "(Extension) Faster, better-coordinated response",
      satyaSolution: "Location Intelligence + AI Recommendation + Authority Command Center",
      techImplementation: "GPS jurisdiction lookup (Police Station, SC/ST Protection Cell, Hospital) + Officer Human-in-the-Loop dispatch action hub",
      evaluatorImpact: "Closes the loop from victim call to officer action"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Slide Title */}
      <div className="glass-panel p-6 border-l-4 border-l-cyan-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              SIH 2026 EVALUATION MATRIX
            </span>
            <span className="text-xs text-slate-400 font-mono">PS 26093 Alignment</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100 mt-1">
            Direct Mapping: PS 26093 Requirement → SATYA Solution
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Proving SATYA solves Problem Statement 26093's exact problem statement without scope creep or feature bloat.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>100% PS Compliance Verified</span>
        </div>
      </div>

      {/* Main Mapping Table */}
      <div className="glass-panel overflow-hidden border border-slate-800 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase">
                <th className="p-4 w-1/4">PS 26093 Requirement</th>
                <th className="p-4 w-1/4 text-cyan-400">SATYA Feature</th>
                <th className="p-4 w-1/3">Technical Implementation</th>
                <th className="p-4 text-emerald-400">Judge / Evaluator Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs leading-relaxed">
              {MAPPING_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-all">
                  <td className="p-4 font-semibold text-slate-200">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{row.psRequirement}</span>
                    </div>
                  </td>
                  <td className="p-4 font-extrabold text-cyan-300 bg-cyan-950/20 font-mono">
                    {row.satyaSolution}
                  </td>
                  <td className="p-4 text-slate-300 font-mono">
                    {row.techImplementation}
                  </td>
                  <td className="p-4 font-semibold text-emerald-300 bg-emerald-950/20">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{row.evaluatorImpact}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Core Flow & Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Cpu className="w-5 h-5" />
            <span>1. Multimodal Intake & Signal Extraction</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            Ingests voice prosody (pitch tremor, speech rate, pauses via Whisper/OpenSMILE) and multilingual text NLP (Hindi, Punjabi, English via IndicBERT) across IVRS 14566, Chatbot, Mobile App, and Web Portal.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
            <Activity className="w-5 h-5" />
            <span>2. Dual Explainable Scoring Engine</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            Computes two separate transparent scores: Distress/Vulnerability Score (psychological state) & Incident Severity Score (physical threat). Combined into Risk Tier (Low/Moderate/High/Critical) with top rationale bullets.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <Users className="w-5 h-5" />
            <span>3. Human-in-the-Loop Action Hub</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            Recommends response package (Police dispatch, SC/ST Protection Cell, Counseling, Legal Aid). Officer reviews case context, confirms/overrides recommendation, dispatches unit, and logs feedback to retrain scoring accuracy over time.
          </p>
        </div>
      </div>

      {/* Privacy, Ethics & Fail-Safe Design Slide Card */}
      <div className="glass-panel p-6 border-t-2 border-t-purple-500 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 text-base">
            <Lock className="w-5 h-5 text-purple-400" />
            <span>Privacy, Ethics & Fail-Safe Design Principles</span>
          </h3>
          <span className="text-xs font-mono text-purple-300 bg-purple-950 px-3 py-1 rounded border border-purple-500/30">
            DEDICATED JUDGING SLIDE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300 block">Consent-First Intake</span>
            <p className="text-slate-400">Clear notice at first victim contact that AI-assisted triage is being used for urgency prioritization.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-300 block">Data Minimization & Encryption</span>
            <p className="text-slate-400">Raw voice/text stored only as long as needed for case handling; encrypted at rest and in transit.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-orange-300 block">Human-in-the-Loop Guardrail</span>
            <p className="text-slate-400">AI never autonomously dispatches police or closes a case — officer always makes final dispatch call.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-red-300 block">Fail-Safe Bias Principle</span>
            <p className="text-slate-400">On low model confidence, system defaults to a higher risk tier, never lower — ensuring false negatives never endanger victims.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-300 block">No Clinical Diagnosis Claims</span>
            <p className="text-slate-400">Explicitly prioritizes urgency without claiming medical/psychiatric diagnosis.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-yellow-300 block">Role-Based Audit Trail</span>
            <p className="text-slate-400">Every officer view, override, and dispatch action is recorded in immutable audit logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

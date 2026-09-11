import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/victim/ChatInterface';
import IVRSSimulator from './components/victim/IVRSSimulator';
import CommandDashboard from './components/authority/CommandDashboard';
import PSMappingTable from './components/pitch/PSMappingTable';
import { MOCK_CASES } from './engine/mockData';
import { Radio, MessageSquare, Shield, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('authority'); // 'authority' | 'victim' | 'pitch'
  const [victimSubTab, setVictimSubTab] = useState('ivrs'); // 'ivrs' | 'chat'
  const [cases, setCases] = useState(MOCK_CASES);
  const [notification, setNotification] = useState(null);

  // Handle new case intake from Victim Chat or IVRS Call
  const handleNewCaseSubmit = (newCase) => {
    setCases(prev => [newCase, ...prev]);

    // Show toast alert
    setNotification(`New ${newCase.riskTier} incident reported via ${newCase.channel}! Added to Command Center.`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handle case update (officer action, dispatch, feedback)
  const handleUpdateCase = (updatedCase) => {
    setCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  const criticalCount = cases.filter(c => c.riskTier === 'CRITICAL').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        liveCaseCount={cases.length}
        criticalCount={criticalCount}
      />

      {/* Dynamic Toast Alert Banner */}
      {notification && (
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 text-center text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg animate-bounce z-40">
          <AlertTriangle className="w-4 h-4 text-white" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Authority Command Center Mode */}
        {activeTab === 'authority' && (
          <CommandDashboard
            cases={cases}
            onUpdateCase={handleUpdateCase}
          />
        )}

        {/* Victim Intake Portal Mode */}
        {activeTab === 'victim' && (
          <div className="space-y-6">
            {/* Intake Channel Selector Sub-tabs */}
            <div className="flex items-center justify-between glass-panel p-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVictimSubTab('ivrs')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                    victimSubTab === 'ivrs'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span>IVRS 14566 Voice Helpline Simulator</span>
                </button>

                <button
                  onClick={() => setVictimSubTab('chat')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                    victimSubTab === 'chat'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Multilingual AI Safety Chatbot Intake</span>
                </button>
              </div>

              <span className="hidden sm:inline-block text-xs font-mono text-cyan-400">
                Live Intake Pipeline Connected
              </span>
            </div>

            {victimSubTab === 'ivrs' ? (
              <IVRSSimulator onNewCaseSubmit={handleNewCaseSubmit} />
            ) : (
              <ChatInterface onNewCaseSubmit={handleNewCaseSubmit} />
            )}
          </div>
        )}

        {/* PS 26093 Pitch Deck Mode */}
        {activeTab === 'pitch' && (
          <PSMappingTable />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SATYA — SIH 2026 Submission for Problem Statement 26093</span>
          <span className="text-cyan-400/80">Consent-First Multimodal Triage Architecture</span>
        </div>
      </footer>

    </div>
  );
}

export const MOCK_CASES = [
  {
    id: "SATYA-2026-8941",
    timestamp: "2 mins ago",
    channel: "IVRS Voice Call",
    language: "Hindi",
    victimName: "Anonymized Victim #8941",
    location: {
      address: "Sector 17-B, Near Main Market, Chandigarh",
      lat: 30.7398,
      lng: 76.7827,
      district: "Chandigarh Central",
      nearestPoliceStation: "Sector 17 Model Police Station (0.8 km)",
      scStProtectionCell: "District Welfare & SC/ST Cell, Secretariat (2.1 km)",
      nearestHospital: "PGIMER General Emergency (3.4 km)"
    },
    audioSample: "audio_sample_threat.wav",
    transcript: "मदद कीजिए! कोई मेरा पीछा कर रहा है और दरवाज़ा तोड़ने की कोशिश कर रहा है। वह बार-बार मुझे मारने की धमकी दे रहा है। मुझे बहुत डर लग रहा है!",
    englishTranslation: "Help me! Someone is following me and trying to break down the door. He is repeatedly threatening to kill me. I am terrified!",
    voiceProsody: {
      pitchHz: 310,
      pitchTremorPercent: 88,
      speechPaceWpm: 215, // frantic
      pauseFrequency: 14,
      vocalArousal: 0.92
    },
    nlpMarkers: [
      "Immediate Physical Harm Mention",
      "Repeated Death Threats",
      "Active Forced Entry",
      "High Vocal Panic & Tremor"
    ],
    distressScore: 94,
    severityScore: 92,
    riskTier: "CRITICAL",
    rationale: [
      "Vocal pitch tremor at 88% indicating extreme psychological trauma",
      "High-arousal threat keywords: 'मारने की धमकी' (death threat) & 'दरवाज़ा तोड़ने' (forced entry)",
      "Immediate physical proximity of perpetrator"
    ],
    recommendedActions: [
      { id: 1, title: "Immediate Police PCR Unit Dispatch", type: "police", priority: "URGENT_15MIN", desc: "Dispatch Sector 17 PCR Van #4 to Sector 17-B with silent beacon." },
      { id: 2, title: "Notify SC/ST Protection Cell Officer", type: "protection", priority: "HIGH", desc: "Forward case summary to Officer R. Sharma for specialized response." },
      { id: 3, title: "Trauma Emergency Counselor Callback", type: "counselor", priority: "HIGH", desc: "Connect victim line to 24/7 Helpline Counselor M. Kaur." }
    ],
    status: "Pending Response",
    assignedOfficer: null,
    history: [
      { time: "23:15", note: "Incident logged via IVRS Helpline 14566" },
      { time: "23:15", note: "Multimodal Engine computed CRITICAL risk tier (94/92)" }
    ]
  },
  {
    id: "SATYA-2026-8942",
    timestamp: "12 mins ago",
    channel: "Mobile App Chatbot",
    language: "English",
    victimName: "Anonymized Victim #8942",
    location: {
      address: "Phase 7, Industrial Area, Mohali",
      lat: 30.7046,
      lng: 76.7179,
      district: "Mohali SAS Nagar",
      nearestPoliceStation: "Phase 8 Police Station (1.4 km)",
      scStProtectionCell: "SAS Nagar District Cell (2.8 km)",
      nearestHospital: "Civil Hospital Mohali (1.9 km)"
    },
    audioSample: null,
    transcript: "I am facing severe cyber stalking and black mailing from an ex-colleague. He threatens to leak fake private photos if I don't give him money.",
    englishTranslation: "I am facing severe cyber stalking and black mailing from an ex-colleague. He threatens to leak fake private photos if I don't give him money.",
    voiceProsody: null,
    nlpMarkers: [
      "Cyber Stalking",
      "Extortion / Blackmail",
      "Non-consensual Image Threat"
    ],
    distressScore: 78,
    severityScore: 74,
    riskTier: "HIGH",
    rationale: [
      "Explicit harassment & extortion markers in text input",
      "High psychological anxiety distress markers",
      "Risk of digital reputation harm & intimidation"
    ],
    recommendedActions: [
      { id: 1, title: "Cyber Crime & SC/ST Cell Legal Aid", type: "legal", priority: "HIGH", desc: "Initiate cyber evidence preservation & legal notice support." },
      { id: 2, title: "Psychological Support Callback", type: "counselor", priority: "MEDIUM", desc: "Schedule counseling callback within 60 mins." }
    ],
    status: "In Review",
    assignedOfficer: "Inspector V. Kumar",
    history: [
      { time: "23:05", note: "Intake registered via SATYA Web Portal" },
      { time: "23:07", note: "Assigned to Inspector V. Kumar for review" }
    ]
  },
  {
    id: "SATYA-2026-8943",
    timestamp: "28 mins ago",
    channel: "IVRS Voice Call",
    language: "Punjabi",
    victimName: "Anonymized Victim #8943",
    location: {
      address: "Main Road, Kharar, Punjab",
      lat: 30.7460,
      lng: 76.6469,
      district: "Rupnagar",
      nearestPoliceStation: "Kharar City Police Station (0.6 km)",
      scStProtectionCell: "Sub-Divisional Protection Cell (1.1 km)",
      nearestHospital: "Sub-Divisional Hospital Kharar (0.9 km)"
    },
    audioSample: "audio_sample_harassment.wav",
    transcript: "ਮੈਨੂੰ ਪਿੰਡ ਦੇ ਕੁਝ ਲੋਕ ਜ਼ਮੀਨੀ ਵਿਵਾਦ ਕਰਕੇ ਤੰਗ ਕਰ ਰਹੇ ਹਨ ਅਤੇ ਜਾਤੀਵਾਦੀ ਸ਼ਬਦਾਂ ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਨ। ਮੈਂ ਬਹੁਤ ਘਬਰਾਈ ਹੋਈ ਹਾਂ।",
    englishTranslation: "Some village locals are harassing me due to a land dispute and using casteist slurs. I am very nervous.",
    voiceProsody: {
      pitchHz: 260,
      pitchTremorPercent: 62,
      speechPaceWpm: 175,
      pauseFrequency: 9,
      vocalArousal: 0.68
    },
    nlpMarkers: [
      "PoA (Prevention of Atrocities) Harassment",
      "Casteist Slurs Mention",
      "Land Conflict Intimidation"
    ],
    distressScore: 68,
    severityScore: 65,
    riskTier: "MODERATE",
    rationale: [
      "PoA (Prevention of Atrocities) relevant indicators detected in Punjabi audio",
      "Moderate vocal stress tremor (62%)",
      "Ongoing localized harassment threat without immediate physical assault"
    ],
    recommendedActions: [
      { id: 1, title: "District SC/ST Cell Protection Officer Flag", type: "protection", priority: "MEDIUM", desc: "Alert Nodal Officer for PoA compliance review." },
      { id: 2, title: "Legal Assistance & Counseling", type: "legal", priority: "MEDIUM", desc: "Provide free legal advice on land rights protection." }
    ],
    status: "Pending Response",
    assignedOfficer: null,
    history: [
      { time: "22:49", note: "Call received on IVRS 14566" }
    ]
  },
  {
    id: "SATYA-2026-8944",
    timestamp: "45 mins ago",
    channel: "Portal Form",
    language: "English",
    victimName: "Anonymized Victim #8944",
    location: {
      address: "Sector 43, Bus Stand Area, Chandigarh",
      lat: 30.7228,
      lng: 76.7456,
      district: "Chandigarh South",
      nearestPoliceStation: "Sector 36 Police Station (1.2 km)",
      scStProtectionCell: "District Protection Cell (3.0 km)",
      nearestHospital: "Government Multi Specialty Hospital Sector 16 (4.1 km)"
    },
    audioSample: null,
    transcript: "I need information regarding legal aid options for domestic maintenance dispute under government welfare schemes.",
    englishTranslation: "I need information regarding legal aid options for domestic maintenance dispute under government welfare schemes.",
    voiceProsody: null,
    nlpMarkers: [
      "Welfare Inquiry",
      "Legal Aid Information Request"
    ],
    distressScore: 22,
    severityScore: 18,
    riskTier: "LOW",
    rationale: [
      "Informational inquiry without threat or acute psychological distress markers",
      "Low vulnerability rating"
    ],
    recommendedActions: [
      { id: 1, title: "Legal Aid Information Automated Response", type: "legal", priority: "LOW", desc: "Send SMS/WhatsApp guide on DLSA legal aid clinics." }
    ],
    status: "Resolved",
    assignedOfficer: "Counselor S. Gill",
    history: [
      { time: "22:32", note: "Information query logged" },
      { time: "22:35", note: "Automated DLSA information packet sent. Marked resolved." }
    ]
  }
];

export const AUDIO_DEMO_PRESETS = [
  {
    id: "critical_sos",
    name: "Scenario 1: Critical Threat & Forced Entry (Hindi)",
    transcript: "मदद कीजिए! कोई मेरा पीछा कर रहा है और दरवाज़ा तोड़ने की कोशिश कर रहा है! मुझे मार डालेगा!",
    pitchTremor: 88,
    paceWpm: 215,
    distressScore: 94,
    severityScore: 92,
    riskTier: "CRITICAL"
  },
  {
    id: "moderate_harassment",
    name: "Scenario 2: Land Dispute & Atrocity Harassment (Punjabi)",
    transcript: "ਮੈਨੂੰ ਪਿੰਡ ਦੇ ਕੁਝ ਲੋਕ ਜ਼ਮੀਨੀ ਵਿਵਾਦ ਕਰਕੇ ਤੰਗ ਕਰ ਰਹੇ ਹਨ ਅਤੇ ਜਾਤੀਵਾਦੀ ਸ਼ਬਦਾਂ ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਨ।",
    pitchTremor: 62,
    paceWpm: 175,
    distressScore: 68,
    severityScore: 65,
    riskTier: "MODERATE"
  },
  {
    id: "high_cyber",
    name: "Scenario 3: Urgent Stalking & Blackmail (English)",
    transcript: "I am being followed after work every day and threatened online. I don't feel safe going home.",
    pitchTremor: 74,
    paceWpm: 190,
    distressScore: 82,
    severityScore: 78,
    riskTier: "HIGH"
  }
];

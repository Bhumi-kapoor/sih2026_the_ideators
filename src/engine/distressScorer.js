/**
 * SATYA Multimodal Distress & Vulnerability Scoring Engine
 * Combines voice prosody indicators and text NLP markers.
 */

const DISTRESS_KEYWORDS_HINDI = ['मदद', 'बचाओ', 'मार', 'डर', 'धमकी', 'खून', 'हमला', 'तोड़', 'पीछा', 'गाली'];
const DISTRESS_KEYWORDS_PUNJABI = ['ਮਦਦ', 'ਬਚਾਓ', 'ਮਾਰਨਾ', 'ਡਰ', 'ਧਮਕੀ', 'ਹਮਲਾ', 'ਤੰਗ', 'ਪਿੱਛੇ', 'ਗਾਲਾਂ'];
const DISTRESS_KEYWORDS_ENGLISH = ['help', 'kill', 'save', 'threat', 'scared', 'follow', 'attack', 'break', 'afraid', 'stalk', 'danger'];

export function calculateDistressScore(text, voiceProsody = null) {
  let score = 20; // baseline
  const rationale = [];
  const lowerText = text ? text.toLowerCase() : "";

  // 1. Text NLP Analysis
  let matchedKeywordsCount = 0;
  
  [...DISTRESS_KEYWORDS_HINDI, ...DISTRESS_KEYWORDS_PUNJABI, ...DISTRESS_KEYWORDS_ENGLISH].forEach(kw => {
    if (lowerText.includes(kw.toLowerCase())) {
      matchedKeywordsCount++;
    }
  });

  if (matchedKeywordsCount > 0) {
    const textDistressBoost = Math.min(35, matchedKeywordsCount * 12);
    score += textDistressBoost;
    rationale.push(`Detected ${matchedKeywordsCount} high-distress emotional markers in transcript`);
  }

  // Check for acute physical panic terms
  if (
    lowerText.includes('मारने') || lowerText.includes('kill') || 
    lowerText.includes('मदद') || lowerText.includes('help') || lowerText.includes('ਬਚਾਓ')
  ) {
    score += 15;
    rationale.push("Explicit urgent call for help or threat of lethal harm detected");
  }

  // 2. Voice Prosody Analysis (if audio call)
  if (voiceProsody) {
    const { pitchTremorPercent, speechPaceWpm, vocalArousal } = voiceProsody;

    if (pitchTremorPercent > 70) {
      score += 20;
      rationale.push(`Severe vocal pitch tremor (${pitchTremorPercent}%) indicating acute trauma/panic`);
    } else if (pitchTremorPercent > 40) {
      score += 10;
      rationale.push(`Moderate vocal instability and tremor (${pitchTremorPercent}%)`);
    }

    if (speechPaceWpm > 200 || speechPaceWpm < 100) {
      score += 10;
      rationale.push(`Abnormal speech cadence (${speechPaceWpm} WPM) reflecting extreme psychological stress`);
    }

    if (vocalArousal && vocalArousal > 0.8) {
      score += 10;
      rationale.push(`Acoustic vocal arousal index at ${(vocalArousal * 100).toFixed(0)}%`);
    }
  } else {
    // If text only, apply standard NLP sentiment boost simulation
    score += 10;
  }

  // Bound score 0 - 100
  const finalScore = Math.min(100, Math.max(10, Math.round(score)));

  // Ensure fail-safe: if key threat detected, minimum score is 70
  if (matchedKeywordsCount >= 2 && finalScore < 70) {
    return {
      distressScore: 72,
      rationale: [...rationale, "Fail-safe elevation applied due to multiple threat keywords"]
    };
  }

  return {
    distressScore: finalScore,
    rationale: rationale.length > 0 ? rationale : ["Standard inquiry tone without acute psychological distress markers"]
  };
}

/**
 * SATYA Incident Severity Scoring Engine
 * Evaluates the physical threat, act classification, weapon presence, and victim vulnerability.
 */

export function calculateSeverityScore(text, categoryHint = null) {
  let score = 15;
  const factors = [];
  const lowerText = text ? text.toLowerCase() : "";

  // Physical Violence / Assault / Weapon Check
  if (
    lowerText.includes('दरवाज़ा') || lowerText.includes('break') || 
    lowerText.includes('door') || lowerText.includes('तोड़')
  ) {
    score += 35;
    factors.push("Active forced entry / breach of physical security boundary");
  }

  if (
    lowerText.includes('मारने') || lowerText.includes('kill') || 
    lowerText.includes('attack') || lowerText.includes('हमला')
  ) {
    score += 30;
    factors.push("Direct death threat / physical assault indicator");
  }

  // PoA (Prevention of Atrocities) or Casteist Slur Flag
  if (
    lowerText.includes('ਜਾਤੀਵਾਦੀ') || lowerText.includes('caste') || 
    lowerText.includes('dispute') || lowerText.includes('ਜ਼ਮੀਨੀ')
  ) {
    score += 25;
    factors.push("SC/ST PoA Act relevant vulnerability tag detected");
  }

  // Cyber Stalking / Extortion / Image Leak Threat
  if (
    lowerText.includes('leak') || lowerText.includes('blackmail') || 
    lowerText.includes('stalk') || lowerText.includes('photos')
  ) {
    score += 30;
    factors.push("Cyber extortion / non-consensual media leak threat");
  }

  // Bound score 0-100
  const finalSeverity = Math.min(100, Math.max(10, Math.round(score)));

  return {
    severityScore: finalSeverity,
    factors: factors.length > 0 ? factors : ["General grievance or welfare assistance request"]
  };
}

/**
 * SATYA Recommendation & Risk Tier Engine
 * Maps combined (Distress Score, Severity Score) to Risk Tier and generates AI suggested action packages.
 */

export function deriveRiskTier(distressScore, severityScore) {
  const maxScore = Math.max(distressScore, severityScore);
  const avgScore = (distressScore + severityScore) / 2;

  if (maxScore >= 88 || avgScore >= 82) {
    return {
      tier: "CRITICAL",
      color: "red",
      label: "Critical Urgency (Immediate Action Required)",
      targetResponseTimeMinutes: 15
    };
  } else if (maxScore >= 70 || avgScore >= 68) {
    return {
      tier: "HIGH",
      color: "orange",
      label: "High Risk (Rapid Escalation)",
      targetResponseTimeMinutes: 30
    };
  } else if (maxScore >= 45 || avgScore >= 45) {
    return {
      tier: "MODERATE",
      color: "yellow",
      label: "Moderate Urgency",
      targetResponseTimeMinutes: 60
    };
  } else {
    return {
      tier: "LOW",
      color: "green",
      label: "Low Urgency / Informational",
      targetResponseTimeMinutes: 120
    };
  }
}

export function generateAIRecommendations(riskTier, text, location) {
  const actions = [];
  const lowerText = text ? text.toLowerCase() : "";

  if (riskTier === "CRITICAL") {
    actions.push({
      id: 101,
      title: "Immediate Police PCR Unit Emergency Dispatch",
      type: "police",
      priority: "CRITICAL_15MIN",
      desc: `Dispatch nearest police van from ${location?.nearestPoliceStation || "Jurisdictional Police Unit"} immediately.`
    });

    actions.push({
      id: 102,
      title: "Flag for SC/ST Protection Cell Nodal Officer",
      type: "protection",
      priority: "URGENT",
      desc: `Alert District SC/ST Nodal Cell at ${location?.scStProtectionCell || "District Welfare Cell"} for legal protective measures.`
    });

    actions.push({
      id: 103,
      title: "Emergency Trauma Counselor Callback",
      type: "counselor",
      priority: "HIGH",
      desc: "Initiate live counselor call bridge to stabilize victim state."
    });
  } else if (riskTier === "HIGH") {
    actions.push({
      id: 201,
      title: "Cyber / Specialized Cell Intervention",
      type: "legal",
      priority: "HIGH",
      desc: "Preserve electronic evidence & alert Cyber Crime Wing officer."
    });

    actions.push({
      id: 202,
      title: "Rapid Response Counselor Outreach",
      type: "counselor",
      priority: "HIGH",
      desc: "Schedule dedicated callback within 30 minutes."
    });
  } else if (riskTier === "MODERATE") {
    actions.push({
      id: 301,
      title: "Jurisdictional Officer Review & Follow-up",
      type: "police",
      priority: "MEDIUM",
      desc: "Forward case details to local station for inquiry."
    });

    actions.push({
      id: 302,
      title: "Legal Aid Counseling Referral",
      type: "legal",
      priority: "MEDIUM",
      desc: "Connect victim with District Legal Services Authority (DLSA) counselor."
    });
  } else {
    actions.push({
      id: 401,
      title: "Automated Legal Information & Scheme Guidance",
      type: "legal",
      priority: "LOW",
      desc: "Send self-service legal rights & scheme information packet via SMS."
    });
  }

  return actions;
}

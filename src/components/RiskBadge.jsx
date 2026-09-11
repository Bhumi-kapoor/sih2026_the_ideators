import React from 'react';
import { AlertTriangle, AlertCircle, Shield, CheckCircle } from 'lucide-react';

export default function RiskBadge({ tier, showIcon = true, className = "" }) {
  let badgeClass = "badge-low";
  let icon = <CheckCircle className="w-3.5 h-3.5" />;

  switch (tier?.toUpperCase()) {
    case "CRITICAL":
      badgeClass = "badge-critical border-glow-red animate-pulse";
      icon = <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;
      break;
    case "HIGH":
      badgeClass = "badge-high border-glow-orange";
      icon = <AlertCircle className="w-3.5 h-3.5 text-orange-400" />;
      break;
    case "MODERATE":
      badgeClass = "badge-moderate border-glow-yellow";
      icon = <Shield className="w-3.5 h-3.5 text-yellow-400" />;
      break;
    case "LOW":
      badgeClass = "badge-low border-glow-green";
      icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      break;
    default:
      badgeClass = "badge-low";
      icon = <CheckCircle className="w-3.5 h-3.5" />;
  }

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {showIcon && icon}
      {tier || "LOW"}
    </span>
  );
}

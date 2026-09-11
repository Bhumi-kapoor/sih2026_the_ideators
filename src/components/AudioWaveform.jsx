import React from 'react';

export default function AudioWaveform({ isPlaying = false, barsCount = 24 }) {
  const bars = Array.from({ length: barsCount });

  return (
    <div className="flex items-center gap-1 h-12 px-4 py-2 bg-slate-900/80 rounded-lg border border-cyan-500/30">
      {bars.map((_, i) => {
        const heightMultiplier = Math.sin(i * 0.5) * 0.4 + 0.6;
        const animationDelay = `${(i % 5) * 0.15}s`;

        return (
          <div
            key={i}
            className="wave-bar flex-1"
            style={{
              height: isPlaying ? `${Math.floor(heightMultiplier * 100)}%` : '20%',
              animationPlayState: isPlaying ? 'running' : 'paused',
              animationDelay: animationDelay,
              background: isPlaying
                ? i % 3 === 0
                  ? 'linear-gradient(180deg, #ef4444, #f97316)'
                  : 'linear-gradient(180deg, #06b6d4, #3b82f6)'
                : 'rgba(51, 65, 85, 0.5)'
            }}
          />
        );
      })}
    </div>
  );
}

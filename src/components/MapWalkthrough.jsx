import React from "react";

const INDIA_BORDER_PATH =
  "M20.1,283.4 L26.6,273.2 L41.0,270.8 L46.1,270.8 L42.6,252.7 L37.3,236.4 L34.8,211.8 L44.6,205.3 L63.5,175.5 L71.5,150.3 L73.4,147.2 L75.3,141.7 L76.6,138.8 L77.3,131.7 L76.1,125.9 L79.4,119.9 L83.4,113.1 L86.1,110.2 L90.7,110.7 L94.5,104.9 L100.5,88.1 L101.2,80.4 L98.6,74.3 L100.0,66.1 L104.2,58.6 L108.7,58.4 L113.5,49.2 L124.2,42.7 L132.4,36.3 L137.4,26.6 L143.1,25.4 L148.9,17.6 L156.8,20.1 L157.4,25.4 L162.6,29.3 L169.1,26.9 L178.5,29.3 L182.0,35.1 L188.5,35.9 L188.9,43.1 L184.0,49.2 L184.5,55.1 L191.4,58.0 L195.4,64.6 L201.6,63.9 L204.9,68.4 L204.4,75.2 L198.0,81.4 L189.5,84.4 L186.4,90.4 L192.5,95.1 L192.2,101.6 L184.9,105.2 L184.4,112.4 L189.0,116.9 L188.5,124.1 L182.4,127.6 L182.9,134.4 L189.4,138.0 L192.5,144.6 L199.4,148.1 L202.5,154.6 L209.4,158.1 L212.5,164.6 L219.4,168.1 L222.5,174.6 L228.5,177.6 L227.4,184.6 L221.5,188.0 L219.4,194.6 L212.5,198.1 L215.4,204.6 L222.4,206.0 L225.5,212.6 L232.4,214.0 L235.5,220.6 L242.4,222.0 L245.5,228.6 L238.5,232.0 L232.4,238.6 L225.5,240.0 L222.4,246.6 L215.5,248.0 L212.4,254.6 L205.5,256.0 L202.4,262.6 L195.5,264.0 L192.4,270.6 L185.5,272.0 L182.4,278.6 L175.5,280.0";

export default function MapWalkthrough({ activeLabel, x, y, speech }) {
  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox="0 0 300 340" width="100%" height="290" style={{ maxWidth: 340 }}>
        <path
          d={INDIA_BORDER_PATH}
          fill="none"
          stroke="#8FA894"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
        <text x="150" y="330" textAnchor="middle" fontSize="9" fill="#9C9585">
          India's northern border (simplified) — DataMeet, CC-BY-4.0
        </text>

        <circle cx="103.5" cy="78.1" r="4" fill="#B9AF97" opacity={x === 103.5 ? 0 : 0.5} />
        <circle cx="246.2" cy="218.1" r="4" fill="#B9AF97" opacity={x === 246.2 ? 0 : 0.5} />

        <g transform={`translate(${x},${y})`} style={{ transition: "transform 0.8s ease" }}>
          <text x="0" y="0" fontSize="34" textAnchor="middle">🚶</text>
          {speech && (
            <g>
              <rect x={-Math.max(65, speech.length * 3.4)} y="-50" width={Math.max(130, speech.length * 6.8)} height="28" rx="11" fill="#3A6B5C" />
              <text x="0" y="-31" fontSize="10.5" fill="#fff" textAnchor="middle">{speech}</text>
            </g>
          )}
        </g>
      </svg>
      <div style={{ fontSize: 14, color: "#6B6355", marginTop: 2 }}>{activeLabel}</div>
    </div>
  );
}
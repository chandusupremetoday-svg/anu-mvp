import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const TITLE = "What is a natural resource?";

const SENTENCE_CHUNKS = [
  "Nobody made any of these —",
  "nature gave them to us for free,",
  "and we call them natural resources.",
];

function fadeInUpValues(frame, startFrame) {
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(frame, [startFrame, startFrame + 20], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { opacity, y };
}

function Sun({ frame }) {
  const { opacity, y } = fadeInUpValues(frame, 10);

  const spin = interpolate(frame, [10, 150], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const transform = `translateY(${y}px) rotate(${spin}deg)`;

  return (
    <div style={{ opacity, transform }}>
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="20" fill="#F4B942" />

        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;

          const x1 = 45 + Math.cos(angle) * 28;
          const y1 = 45 + Math.sin(angle) * 28;

          const x2 = 45 + Math.cos(angle) * 40;
          const y2 = 45 + Math.sin(angle) * 40;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F4B942"
              strokeWidth="5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

function WaterDrop({ frame }) {
  const { opacity, y } = fadeInUpValues(frame, 25);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <svg width="70" height="90" viewBox="0 0 70 90">
        <path
          d="M35 5 C35 5, 65 45, 65 62 A30 30 0 1 1 5 62 C5 45, 35 5, 35 5 Z"
          fill="#5AA9D6"
        />
      </svg>
    </div>
  );
}

function Mineral({ frame }) {
  const { opacity, y } = fadeInUpValues(frame, 40);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <svg width="120" height="100" viewBox="0 0 120 100">
        {/* Rough natural mineral / ore specimen */}
        <path
          d="M12 68 L18 42 L34 25 L58 20 L82 30 L106 48 L98 72 L76 84 L48 82 L25 76 Z"
          fill="#77736A"
        />

        <path
          d="M18 42 L34 25 L49 48 L25 76 L12 68 Z"
          fill="#969087"
        />

        <path
          d="M34 25 L58 20 L49 48 Z"
          fill="#AAA59B"
        />

        <path
          d="M58 20 L82 30 L72 55 L49 48 Z"
          fill="#858179"
        />

        <path
          d="M82 30 L106 48 L98 72 L72 55 Z"
          fill="#625F58"
        />

        <path
          d="M49 48 L72 55 L76 84 L48 82 Z"
          fill="#918C82"
        />

        <path
          d="M25 76 L49 48 L48 82 Z"
          fill="#6D6961"
        />
      </svg>

      <div
        style={{
          marginTop: 4,
          fontSize: 18,
          fontWeight: 600,
          color: "#5B554A",
          textAlign: "center",
        }}
      >
        Minerals
      </div>
    </div>
  );
}

function SentenceChunk({ frame, text, startFrame }) {
  const { opacity, y } = fadeInUpValues(frame, startFrame);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 30,
        color: "#4A4438",
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  );
}

export function NaturalResourceIntro() {
  const frame = useCurrentFrame();

  const { opacity: titleOpacity, y: titleY } =
    fadeInUpValues(frame, 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FBF7F0",
        fontFamily: "system-ui, sans-serif",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#3A6B5C",
          }}
        >
          {TITLE}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "flex-end",
          marginBottom: 44,
        }}
      >
        <Sun frame={frame} />
        <WaterDrop frame={frame} />
        <Mineral frame={frame} />
      </div>

      <div
        style={{
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {SENTENCE_CHUNKS.map((chunk, i) => (
          <SentenceChunk
            key={i}
            frame={frame}
            text={chunk}
            startFrame={60 + i * 20}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}
import React, { useState } from "react";

function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new window.SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

export default function MapMatchActivity({ activity, onComplete }) {
  const [phase, setPhase] = useState("teach");
  const [placements, setPlacements] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(null);

  const remainingItems = activity.items.filter((item) => !placements[item.id]);
  const allDone = remainingItems.length === 0;

  function tryPlace(itemId, zoneId) {
    const item = activity.items.find((i) => i.id === itemId);
    if (item.correctZone === zoneId) {
      setPlacements((p) => ({ ...p, [itemId]: zoneId }));
      setSelectedItem(null);
      speak(`${item.label} — correct!`);
    } else {
      setWrongFlash({ itemId, zoneId });
      setTimeout(() => setWrongFlash(null), 700);
    }
  }

  function handleDrop(e, zoneId) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) tryPlace(itemId, zoneId);
  }

  function handleZoneTap(zoneId) {
    if (selectedItem) tryPlace(selectedItem, zoneId);
  }

  if (phase === "teach") {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 12, color: "#8A8375", marginBottom: 8 }}>The Himalayas · concept</div>
        <h3>{activity.title}</h3>
        <div style={{ background: "#F3EFE4", borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", color: "#9C9585", marginBottom: 6 }}>TEXT</div>
          <p style={{ margin: 0 }}>{activity.teachingText}</p>
          <button onClick={() => speak(activity.teachingText)} style={smallBtnStyle}>🔊 Hear this</button>
        </div>
        <button onClick={() => setPhase("activity")} style={btnStyle}>I'm ready — start the activity</button>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 12, color: "#8A8375", marginBottom: 8 }}>The Himalayas · activity</div>
      <h3>{activity.title}</h3>
      <p style={{ color: "#5A5346", fontSize: 15 }}>{activity.instructions}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {activity.zones.map((zone) => (
          <div
            key={zone.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, zone.id)}
            onClick={() => handleZoneTap(zone.id)}
            style={{
              background: zone.color,
              border: wrongFlash?.zoneId === zone.id ? "3px solid #C97A63" : "2px dashed #B9AF97",
              borderRadius: 16,
              padding: "14px 16px",
              minHeight: 56,
              cursor: selectedItem ? "pointer" : "default",
              transition: "border 0.2s",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{zone.label}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {activity.items
                .filter((i) => placements[i.id] === zone.id)
                .map((i) => (
                  <span key={i.id} style={chipPlacedStyle}>{i.label}</span>
                ))}
            </div>
          </div>
        ))}
      </div>

      {!allDone && (
        <>
          <div style={{ fontSize: 13, color: "#8A8375", marginBottom: 8 }}>
            Drag each one onto its zone above, or tap one then tap the zone:
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {remainingItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
                onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                style={{
                  ...chipStyle,
                  outline: selectedItem === item.id ? "3px solid #3A6B5C" : "none",
                  opacity: wrongFlash?.itemId === item.id ? 0.5 : 1,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </>
      )}

      {allDone && (
        <div style={{ marginTop: 6 }}>
          <p style={{ fontWeight: 700, color: "#3A6B5C" }}>🎉 All placed correctly!</p>
          <button onClick={onComplete} style={btnStyle}>Continue</button>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  maxWidth: 480,
  margin: "24px auto",
  padding: 24,
  borderRadius: 20,
  background: "#FBF7F0",
  border: "1px solid #E7E1D4",
  fontFamily: "system-ui, sans-serif",
};
const chipStyle = {
  background: "#fff",
  border: "2px solid #DDD6C7",
  borderRadius: 999,
  padding: "8px 16px",
  fontSize: 14,
  cursor: "grab",
  userSelect: "none",
};
const chipPlacedStyle = {
  background: "#E4F3E8",
  border: "1px solid #3A6B5C",
  borderRadius: 999,
  padding: "4px 12px",
  fontSize: 13,
};
const btnStyle = { background: "#3A6B5C", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer" };
const smallBtnStyle = { background: "#fff", border: "1px solid #DDD6C7", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", marginTop: 8 };
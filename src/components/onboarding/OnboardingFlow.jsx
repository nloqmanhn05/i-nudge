import { useState } from "react";

function OnboardStep2({ onBack, onDone }) {
  const [name, setName] = useState("");
  const [activated, setActivated] = useState(false);

  const handleActivate = () => {
    if (!name.trim()) return;
    setActivated(true);
    setTimeout(() => onDone(name.trim()), 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%", height: "100%", overflow: "hidden", background: "#f6f7f8" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "24px 16px 8px", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ width: 48, height: 48, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#111" }}>arrow_back</span>
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111", margin: 0, flex: 1, textAlign: "center", paddingRight: 48 }}>Identity</h2>
      </div>

      {/* Progress */}
      <div style={{ padding: "16px 24px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#136dec" }}>Register Your Name</span>
          <span style={{ fontSize: 14, color: "#64748B" }}>100%</span>
        </div>
        <div style={{ height: 4, width: "100%", background: "rgba(19,109,236,0.1)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "100%", background: "#136dec", borderRadius: 999 }} />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", gap: 32 }}>
        {/* Avatar */}
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "rgba(19,109,236,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 52, color: "#136dec", fontVariationSettings: "'FILL' 1" }}>face</span>
        </div>
        {/* Headline */}
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0F172A", margin: 0, textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
          What should your<br />Guardian Angel call you?
        </h1>
        {/* Input */}
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ position: "relative" }}>
            <label style={{ position: "absolute", top: -10, left: 16, padding: "0 4px", background: "#f6f7f8", fontSize: 12, fontWeight: 600, color: "#136dec" }}>Your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex"
              onKeyDown={e => e.key === "Enter" && handleActivate()}
              style={{
                width: "100%", height: 64, borderRadius: 26,
                border: "2px solid #136dec",
                background: "transparent", outline: "none",
                padding: "0 20px", fontSize: 18, fontWeight: 500,
                color: "#0F172A", fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>
          <p style={{ marginTop: 12, fontSize: 14, color: "#94A3B8", textAlign: "center", lineHeight: 1.6 }}>
            This is how Nudge will address you in notifications.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "16px 24px 40px" }}>
        <button
          onClick={handleActivate}
          disabled={!name.trim()}
          style={{
            width: "100%", height: 64, borderRadius: 9999,
            background: activated ? "#22C55E" : name.trim() ? "#136dec" : "#CBD5E1",
            border: "none", cursor: name.trim() ? "pointer" : "not-allowed",
            color: "#fff", fontSize: 18, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: name.trim() ? "0 8px 24px rgba(19,109,236,0.3)" : "none",
            transition: "all 0.3s",
          }}
        >
          <span>{activated ? "Welcome!" : "Activate Nudge!"}</span>
          <span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>
            {activated ? "check_circle" : "auto_awesome"}
          </span>
        </button>
        <p style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: "#CBD5E1" }}>
          By activating, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}

export default function OnboardingFlow({ onComplete }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%", height: "100%", overflow: "hidden" }}>
      <OnboardStep2 onBack={() => { }} onDone={(name) => onComplete("RM", name)} />
    </div>
  );
}

import EcgCanvas from "../components/ui/EcgCanvas";
import DebtCard from "../components/ui/DebtCard";
import { DEBT_STACK } from "../data/mockData";

export default function Home({
  dangerMode,
  onExitDangerMode,
  activeCurrency,
  remainingToday,
  coachStatusColor,
  pctToday,
  fmt,
  onNavigate,
  disabled
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "transparent" }}>
      {/* ── Header ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "52px 16px 16px",
        background: "transparent",
        flexShrink: 0,
      }}>
        <div style={{ width: 40, height: 40 }} />
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, flex: 1, textAlign: "center", letterSpacing: "-0.02em" }}>
          Home
        </h1>
        <div style={{ width: 40, height: 40 }} />
      </header>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "16px 16px 112px", overflowY: "auto" }}>

        {/* ── Balance Hero ── */}
        <div id="liquidity-card" style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          padding: "20px 16px 24px",
          background: dangerMode
            ? "linear-gradient(155deg, #fecaca 0%, #fee2e2 60%, #fff5f5 100%)"
            : "linear-gradient(155deg, #cdfaf3 0%, #e2f9f5 60%, #edfcf9 100%)",
          borderRadius: 28, marginBottom: 20,
          transition: "background 1s ease",
          position: "relative"
        }}>
          {dangerMode && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
              marginBottom: 10,
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 999,
                background: "rgba(212,17,17,0.1)", border: "1px solid rgba(212,17,17,0.2)",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#d41111",
                  display: "inline-block", animation: "safe-pulse 1s ease-in-out infinite",
                }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#d41111", letterSpacing: "0.1em", textTransform: "uppercase" }}>Critical Low</span>
              </div>

              {/* Shneiderman Rule 6: Easy Reversal of Actions */}
              {onExitDangerMode && (
                <button
                  onClick={onExitDangerMode}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: "rgba(255,255,255,0.85)", border: "1px solid rgba(212,17,17,0.2)",
                    borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 700,
                    color: "#7f1d1d", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                  }}
                  title="Revert simulation state"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>replay</span>
                  <span>Exit Test</span>
                </button>
              )}
            </div>
          )}
          <p className="font-google-text" style={{ color: dangerMode ? "rgba(150,20,20,0.6)" : "rgba(15,60,54,0.55)", fontSize: 16, fontWeight: 500, marginBottom: 4, marginTop: 0, letterSpacing: "0.01em", transition: "color 1s" }}>
            Your Balance
          </p>
          <p className="font-mono" style={{ fontSize: 48, fontWeight: 700, color: dangerMode ? "#7f1d1d" : "#0f3c36", letterSpacing: "-0.02em", lineHeight: 1, margin: 0, marginBottom: 20, transition: "color 1s" }}>
            {dangerMode ? `${activeCurrency} 85.00` : `${activeCurrency} 1,240.50`}
          </p>
          <div style={{ width: "100%", padding: "0 16px", marginBottom: 16 }}>
            <EcgCanvas color={dangerMode ? "#ba1a1a" : "#13ecc8"} />
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px",
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(8px)",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <div className="safe-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: dangerMode ? "#d41111" : "#22c55e", transition: "background 1s" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: dangerMode ? "#d41111" : "#15803d", fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", transition: "color 1s" }}>
              {dangerMode ? "Critical State" : "Safe State"}
            </span>
          </div>
        </div>

        {/* ── Budget Coach Hero ── */}
        <section style={{ marginBottom: 24 }} onClick={() => onNavigate("coach")}>
          <div style={{
            background: "#fff", borderRadius: 28, padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: disabled ? "not-allowed" : "pointer", position: "relative", overflow: "hidden"
          }}>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#F59E0B", fontVariationSettings: "'FILL' 1" }}>psychology</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Budget Coach</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="font-mono" style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em" }}>
                  {activeCurrency} {fmt(remainingToday)}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#64748B" }}>left today</span>
              </div>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: "4px 0 0" }}>Tap for breakdown &rarr;</p>
            </div>

            {/* Progress Ring */}
            <div style={{ position: "relative", width: 56, height: 56 }}>
              <svg width="56" height="56" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={coachStatusColor} strokeWidth="3" strokeDasharray={`${Math.min(100, pctToday)}, 100`} />
              </svg>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: coachStatusColor }}>{Math.round(pctToday)}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Shadow Debt Stack */}
        <section id="debt-stack" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "0 4px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: 0 }}>
              {dangerMode ? "Credit Utilization" : "Shadow Debt Stack"}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DEBT_STACK.map((item) => <DebtCard key={item.id} item={item} danger={dangerMode} currency={activeCurrency} />)}
          </div>
        </section>

        {/* Simulate CTA */}
        <button
          id="simulate-cta"
          onClick={() => onNavigate("simulation")}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 16,
            padding: "20px 20px",
            background: dangerMode
              ? "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)"
              : "linear-gradient(135deg, #ccfbf4 0%, #d9fdf8 100%)",
            border: `1.5px solid ${dangerMode ? "rgba(212,17,17,0.2)" : "rgba(19,236,200,0.25)"}`,
            borderRadius: 28, cursor: "pointer",
            boxShadow: dangerMode ? "0 2px 12px rgba(212,17,17,0.1)" : "0 2px 12px rgba(19,236,200,0.12)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div
            style={{
              width: 56, height: 56, borderRadius: "50%",
              background: dangerMode ? "#d41111" : "#13ecc8",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: dangerMode ? "0 4px 16px rgba(212,17,17,0.4)" : "0 4px 16px rgba(19,236,200,0.45)",
              transition: "background 1s, box-shadow 1s",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 30, color: "#fff", fontWeight: 700 }}>add</span>
          </div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: dangerMode ? "#7f1d1d" : "#0f3c36", margin: 0, transition: "color 1s" }}>Simulate a new purchase</p>
            <p style={{ fontSize: 13, color: dangerMode ? "rgba(150,20,20,0.55)" : "rgba(15,60,54,0.55)", margin: "2px 0 0", transition: "color 1s" }}>Check impact on your liquidity</p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: dangerMode ? "rgba(150,20,20,0.35)" : "rgba(15,60,54,0.35)", transition: "color 1s" }}>arrow_forward</span>
        </button>
      </main>
    </div>
  );
}

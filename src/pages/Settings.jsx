import { useState } from "react";

export default function Settings({ onBack, danger, currency, userName, isTab, onReplayTour, onLogout, spentTotal = 0, spentPct = 0, monthlyIncome = 3200, fmt }) {
  const [alertsOn, setAlertsOn] = useState(true);

  const P = danger ? "#d41111" : "#2bee6c";
  const Pdark = danger ? "#7f1d1d" : "#003918";
  const bgBlob = danger ? "rgba(212,17,17,0.08)" : "rgba(43,238,108,0.1)";
  const cardBorder = danger ? "rgba(212,17,17,0.15)" : "rgba(43,238,108,0.12)";
  const cardGrad = danger ? "rgba(212,17,17,0.06)" : "rgba(43,238,108,0.08)";
  const statusText = danger ? "#d41111" : "#059669";
  const statusIcon = danger ? "warning" : "shield";
  const statusLabel = danger ? "Guardian Status: Critical" : "Guardian Status: Safe";
  const badgeBg = danger ? "rgba(212,17,17,0.1)" : "rgba(43,238,108,0.1)";

  const SwitchToggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 52, height: 32, borderRadius: 999, cursor: "pointer",
        background: checked ? P : "#94A3B8",
        border: `2px solid ${checked ? P : "#94A3B8"}`,
        position: "relative", transition: "background 0.3s, border-color 0.3s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        width: checked ? 24 : 16, height: checked ? 24 : 16,
        borderRadius: "50%",
        background: checked ? Pdark : "#e0e0e0",
        top: checked ? 2 : 6, left: checked ? 22 : 6,
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill={P}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}
      </div>
    </div>
  );

  const SettingRow = ({ icon, iconBg, iconColor, title, subtitle, right, border = true, onClick }) => (
    <>
      <button style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
        transition: "background 0.15s",
      }}
        onClick={onClick}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.02)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: iconColor, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", margin: 0 }}>{title}</p>
            {subtitle && <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>{subtitle}</p>}
          </div>
        </div>
        {right}
      </button>
      {border && <div style={{ height: 1, background: "#F1F5F9", marginLeft: 76 }} />}
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "transparent", fontFamily: "Inter, sans-serif", transition: "background 0.8s" }}>
      {/* ── Header bar ── */}
      {!isTab && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "52px 16px 16px",
          background: "transparent",
          flexShrink: 0,
        }}>
          {onBack ? (
            <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#0F172A" }}>arrow_back</span>
            </button>
          ) : (
            <div style={{ width: 40, height: 40 }} />
          )}
          <h1 style={{ fontSize: 20, fontWeight: 700, color: danger ? "#7f1d1d" : "#0F172A", margin: 0, flex: 1, textAlign: "center", letterSpacing: "-0.02em", transition: "color 0.8s" }}>
            Profile
          </h1>
          <button
            onClick={onLogout}
            title="Log Out"
            style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: danger ? "rgba(212,17,17,0.08)" : "rgba(15,23,42,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "background 0.3s, transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: danger ? "#d41111" : "#0F172A", transition: "color 0.8s" }}>logout</span>
            {danger && <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: "#d41111", boxShadow: "0 0 0 2px #fff5f5", animation: "safe-pulse 1s ease-in-out infinite" }} />}
          </button>
        </div>
      )}

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 112, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: `linear-gradient(to bottom, ${bgBlob}, transparent)`, pointerEvents: "none", zIndex: 0, transition: "background 0.8s" }} />

        {danger && (
          <div style={{
            margin: "20px 16px 0", padding: "14px 16px",
            background: "rgba(212,17,17,0.08)", border: "1.5px solid rgba(212,17,17,0.2)",
            borderRadius: 22, display: "flex", alignItems: "center", gap: 12,
            animation: "fadeSlideUp 0.4s ease both", zIndex: 1, position: "relative",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(212,17,17,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#d41111", fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#d41111", margin: "0 0 2px" }}>Critical Financial State</p>
              <p style={{ fontSize: 12, color: "#7f1d1d", margin: 0, opacity: 0.8 }}>Your liquidity is critically low. Avoid new purchases.</p>
            </div>
          </div>
        )}

        {/* Avatar section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: danger ? "20px 24px 20px" : "32px 24px 20px", position: "relative", zIndex: 1 }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{
              width: 128, height: 128, borderRadius: "50%",
              border: `4px solid ${danger ? "#fca5a5" : "#fff"}`,
              boxShadow: danger ? "0 0 0 6px rgba(212,17,17,0.12), 0 4px 20px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.12)",
              overflow: "hidden",
              background: danger ? "#fee2e2" : "#e2f5ea",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.8s, background 0.8s, box-shadow 0.8s",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 80, color: P, fontVariationSettings: "'FILL' 1", transition: "color 0.8s" }}>account_circle</span>
            </div>
            <div style={{
              position: "absolute", bottom: 4, right: 4, width: 32, height: 32, borderRadius: "50%",
              background: P, border: "2px solid #fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 2px 8px ${danger ? "rgba(212,17,17,0.4)" : "rgba(43,238,108,0.4)"}`,
              transition: "background 0.8s, box-shadow 0.8s",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#fff", fontVariationSettings: "'FILL' 1" }}>
                {danger ? "warning" : "verified_user"}
              </span>
            </div>
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 600, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{userName || "Hakim"}</h1>

          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 999,
            background: badgeBg, border: `1px solid ${danger ? "rgba(212,17,17,0.2)" : "rgba(43,238,108,0.25)"}`,
            transition: "background 0.8s, border-color 0.8s",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: P, fontVariationSettings: "'FILL' 1", transition: "color 0.8s" }}>{statusIcon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: statusText, transition: "color 0.8s" }}>{statusLabel}</span>
            {danger && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d41111", animation: "safe-pulse 1s ease-in-out infinite" }} />}
          </div>
        </div>

        {/* Liquidity card */}
        <div style={{ padding: "0 16px 24px", position: "relative", zIndex: 1 }}>
          <div style={{
            background: "#fff", borderRadius: 28, padding: "20px 24px",
            boxShadow: danger ? "0 1px 4px rgba(212,17,17,0.08), 0 4px 16px rgba(212,17,17,0.06)" : "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
            border: `1px solid ${cardBorder}`,
            position: "relative", overflow: "hidden",
            transition: "border-color 0.8s, box-shadow 0.8s",
          }}>
            <div style={{ position: "absolute", right: 0, top: 0, width: "40%", height: "100%", background: `linear-gradient(to left, ${cardGrad}, transparent)`, pointerEvents: "none", transition: "background 0.8s" }} />
            <p style={{ fontSize: 13, fontWeight: 500, color: "#64748B", margin: "0 0 6px" }}>Liquidity Remaining</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="font-mono" style={{ fontSize: 28, fontWeight: 800, color: danger ? "#7f1d1d" : "#0F172A", letterSpacing: "-0.03em", transition: "color 0.8s" }}>
                  {danger ? `${currency} 85.00` : `${currency} 1,240.50`}
                </span>
                <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: P, display: "flex", alignItems: "center", gap: 2, transition: "color 0.8s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{danger ? "trending_down" : "trending_up"}</span>
                  {danger ? "-93.1%" : "+5.2%"}
                </span>
              </div>
              <svg width="80" height="36" viewBox="0 0 100 40" fill="none" style={{ flexShrink: 0 }}>
                {danger
                  ? <path d="M0,5 Q20,5 30,10 T50,30 T70,35 T100,38" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  : <path d="M0,35 Q10,35 20,25 T40,20 T60,30 T80,10 T100,5" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                }
                <circle cx="100" cy={danger ? "38" : "5"} r="3.5" fill={P} />
              </svg>
            </div>
            <p style={{ fontSize: 11, color: danger ? "#d41111" : "#94A3B8", margin: "6px 0 0", fontWeight: danger ? 600 : 400, transition: "color 0.8s" }}>
              {danger ? "⚠️ Critical — avoid new spending" : "Updated just now"}
            </p>
          </div>
        </div>

        {/* ── Monthly Quota Usage card ── */}
        <div style={{ padding: "0 16px 20px", position: "relative", zIndex: 1 }}>
          <div style={{
            background: "#fff", borderRadius: 28, padding: "20px 24px",
            boxShadow: danger ? "0 1px 4px rgba(212,17,17,0.08), 0 4px 16px rgba(212,17,17,0.06)" : "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
            border: `1px solid ${cardBorder}`,
            transition: "border-color 0.8s, box-shadow 0.8s",
          }}>
            {/* Title row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: spentPct >= 70 ? "#d41111" : spentPct >= 50 ? "#F59E0B" : "#059669", fontVariationSettings: "'FILL' 1", transition: "color 0.5s" }}>pie_chart</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B", margin: 0 }}>Monthly Quota Usage</p>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 800, padding: "2px 10px", borderRadius: 999,
                background: spentPct >= 70 ? "rgba(212,17,17,0.1)" : spentPct >= 50 ? "rgba(245,158,11,0.1)" : "rgba(5,150,105,0.1)",
                color: spentPct >= 70 ? "#d41111" : spentPct >= 50 ? "#B45309" : "#059669",
                transition: "background 0.5s, color 0.5s",
              }}>
                {spentPct >= 70 ? "⚠️ High" : spentPct >= 50 ? "Moderate" : "Healthy"}
              </span>
            </div>

            {/* Percentage big number */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span className="font-mono" style={{
                fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
                color: spentPct >= 70 ? "#d41111" : spentPct >= 50 ? "#B45309" : "#0F172A",
                transition: "color 0.5s",
              }}>
                {Math.min(spentPct, 100).toFixed(1)}
              </span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#94A3B8" }}>%</span>
              <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 4 }}>of monthly income</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: 10, background: "#F1F5F9", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
              <div style={{
                height: "100%",
                width: `${Math.min(spentPct, 100)}%`,
                borderRadius: 999,
                background: spentPct >= 70
                  ? "linear-gradient(90deg, #f87171, #d41111)"
                  : spentPct >= 50
                    ? "linear-gradient(90deg, #fcd34d, #F59E0B)"
                    : "linear-gradient(90deg, #6ee7b7, #059669)",
                transition: "width 0.6s cubic-bezier(.4,0,.2,1), background 0.5s",
                boxShadow: spentPct >= 70 ? "0 0 8px rgba(212,17,17,0.4)" : spentPct >= 50 ? "0 0 8px rgba(245,158,11,0.35)" : "0 0 8px rgba(5,150,105,0.3)",
              }} />
            </div>

            {/* Threshold markers */}
            <div style={{ position: "relative", height: 16, marginBottom: 4 }}>
              <div style={{ position: "absolute", left: "50%", top: 0, display: "flex", flexDirection: "column", alignItems: "center", transform: "translateX(-50%)" }}>
                <div style={{ width: 1, height: 6, background: "#CBD5E1" }} />
                <span style={{ fontSize: 9, color: "#94A3B8", fontWeight: 600, whiteSpace: "nowrap" }}>50%</span>
              </div>
              <div style={{ position: "absolute", left: "70%", top: 0, display: "flex", flexDirection: "column", alignItems: "center", transform: "translateX(-50%)" }}>
                <div style={{ width: 1, height: 6, background: spentPct >= 70 ? "#d41111" : "#CBD5E1", transition: "background 0.5s" }} />
                <span style={{ fontSize: 9, color: spentPct >= 70 ? "#d41111" : "#94A3B8", fontWeight: 600, whiteSpace: "nowrap", transition: "color 0.5s" }}>70% ⚠️</span>
              </div>
            </div>

            {/* Amount labels */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>
                Spent: <strong style={{ color: spentPct >= 70 ? "#d41111" : "#0F172A", transition: "color 0.5s" }}>{currency} {fmt ? fmt(spentTotal) : spentTotal.toFixed(2)}</strong>
              </span>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>
                Income: <strong style={{ color: "#0F172A" }}>{currency} {fmt ? fmt(monthlyIncome) : monthlyIncome.toFixed(2)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Section labels */}
        {["Account", "Financial Connections", "Preferences"].map((section, si) => {
          const isAccount = si === 0;
          const isFinancial = si === 1;
          const isPref = si === 2;
          return (
            <div key={section} style={{ padding: `0 16px ${isPref ? "8px" : "20px"}` }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: P, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px 4px", transition: "color 0.8s" }}>{section}</p>
              <div style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", border: `1px solid ${danger ? "rgba(212,17,17,0.08)" : "#F1F5F9"}`, transition: "border-color 0.8s" }}>
                {isAccount && <>
                  <SettingRow icon="lock" iconBg="#F5F3FF" iconColor="#7C3AED" title="Security" subtitle="Password, 2FA, FaceID" right={<span className="material-symbols-outlined" style={{ fontSize: 20, color: "#CBD5E1" }}>chevron_right</span>} border={false} />
                </>}
                {isFinancial && <>
                  <SettingRow
                    icon="account_balance" iconBg="#ECFDF5" iconColor="#059669"
                    title="Bank Sync"
                    subtitle={<span style={{ display: "flex", alignItems: "center", gap: 4, color: "#059669", fontSize: 12, fontWeight: 600 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669", display: "inline-block" }} />Active</span>}
                    right={<span className="material-symbols-outlined" style={{ fontSize: 20, color: "#CBD5E1" }}>chevron_right</span>}
                  />
                  <SettingRow
                    icon="credit_score" iconBg={danger ? "#FEF2F2" : "#FFF7ED"} iconColor={danger ? "#d41111" : "#EA580C"}
                    title="BNPL Providers"
                    subtitle={<span style={{ color: danger ? "#d41111" : "#64748B", fontSize: 12, fontWeight: danger ? 600 : 400 }}>
                      {danger ? "⚠️ High utilisation detected" : "3 connected"}
                    </span>}
                    right={
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "flex" }}>
                          {["G", "S", "+1"].map((l, i) => (
                            <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: danger ? "#fecaca" : "#E2E8F0", border: "2px solid #fff", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: danger ? "#d41111" : "#475569" }}>{l}</div>
                          ))}
                        </div>
                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#CBD5E1" }}>chevron_right</span>
                      </div>
                    }
                    border={false}
                  />
                </>}
                {isPref && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#DC2626", fontVariationSettings: "'FILL' 1" }}>notification_important</span>
                        </div>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", margin: 0 }}>High-Risk Alerts</p>
                          <p style={{ fontSize: 12, color: danger ? "#d41111" : "#64748B", margin: "2px 0 0", fontWeight: danger ? 600 : 400 }}>
                            {danger ? "Active — critical state detected" : "Notify when spending is risky"}
                          </p>
                        </div>
                      </div>
                      <SwitchToggle checked={alertsOn} onChange={setAlertsOn} />
                    </div>
                    <div style={{ height: 1, background: "#F1F5F9", marginLeft: 76 }} />
                    <SettingRow
                      icon="school" iconBg="#EFF6FF" iconColor="#2563EB"
                      title="Replay Tour"
                      subtitle="Walk through the app again"
                      right={<span className="material-symbols-outlined" style={{ fontSize: 20, color: "#CBD5E1" }}>chevron_right</span>}
                      border={false}
                      onClick={onReplayTour}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}

        <div style={{ padding: "16px 24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: danger ? "#d41111" : "#94A3B8", margin: "0 0 10px", fontWeight: danger ? 600 : 400, transition: "color 0.8s" }}>
            {danger
              ? "⚠️ Your Guardian Angel is on high alert"
              : "Your Guardian Angel has your back since Jan 2024"}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: danger ? "#fca5a5" : "#CBD5E1", transition: "background 0.8s" }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

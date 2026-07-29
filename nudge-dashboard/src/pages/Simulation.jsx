import { useState, useEffect } from "react";

function SimLoadingScreen({ progress }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", flex: 1, minHeight: 0,
      overflow: "hidden",
      background: "#f6f8f5", fontFamily: "Inter, sans-serif",
      alignItems: "center", justifyContent: "space-between",
      padding: "48px 16px 32px",
    }}>
      {/* Top bar */}
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 48 }} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0 }}>Risk Analysis</h2>
        <div style={{ width: 48 }} />
      </div>

      {/* Centre content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, flex: 1, justifyContent: "center" }}>
        {/* Glow blob */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "absolute", width: 220, height: 220, borderRadius: "50%",
            background: "rgba(89,244,37,0.18)", filter: "blur(40px)",
          }} />
          {/* Circle card */}
          <div style={{
            width: 192, height: 192, borderRadius: "50%",
            background: "#fff", boxShadow: "0 0 40px 20px rgba(89,244,37,0.15), 0 8px 40px rgba(0,0,0,0.10)",
            border: "1px solid #f1f5f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <svg width="128" height="64" viewBox="0 0 100 50" fill="none" stroke="#59f425" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path opacity="0.5" d="M0 25 L20 25 L30 10 L40 40 L50 25 L60 25 L70 5 L80 45 L90 25 L100 25" />
              <path d="M0 25 L20 25 L30 10 L40 40 L50 25">
                <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="1.5s" repeatCount="indefinite" />
              </path>
            </svg>
            {/* Badge */}
            <div style={{
              position: "absolute", bottom: 4, right: 4,
              width: 40, height: 40, borderRadius: "50%",
              background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              border: "1px solid #f1f5f1",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#59f425", fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Analyzing your finances...
          </h1>
          <p style={{ fontSize: 15, color: "#64748B", margin: 0, lineHeight: 1.6 }}>
            Your Guardian Angel is looking for potential risks.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 192, height: 6, background: "#E2E8F0", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 999,
            background: "#59f425",
            width: `${progress}%`,
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

function SimResultScreen({ isHighRisk, bufferImpact, totalImpact, monthlyPay, amount, duration, itemName, providerLabel, onBack, onRetry, onPostpone, onProceed, currency }) {
  const SAFETY_BUFFER = 1240.50;
  const projectedAfter = SAFETY_BUFFER - amount;
  const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div style={{
      display: "flex", flexDirection: "column", flex: 1, minHeight: 0,
      overflow: "hidden",
      background: isHighRisk ? "#1a1200" : "#f6f8f5",
      fontFamily: "Inter, sans-serif",
      animation: "fadeSlideUp 0.35s ease both",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "52px 16px 16px", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: isHighRisk ? "#f29e0d" : "#0F172A" }}>arrow_back_ios</span>
        </button>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isHighRisk ? "rgba(242,158,13,0.7)" : "#94A3B8", flex: 1, textAlign: "center", paddingRight: 40 }}>
          RISK ANALYSIS
        </span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 16px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Icon */}
        <div style={{ marginTop: 16, marginBottom: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: isHighRisk ? "rgba(242,158,13,0.2)" : "rgba(34,197,94,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: isHighRisk ? "#f29e0d" : "#22c55e", fontVariationSettings: "'FILL' 1" }}>
              {isHighRisk ? "warning" : "check_circle"}
            </span>
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: isHighRisk ? "#fff" : "#0F172A", margin: 0, textAlign: "center", letterSpacing: "-0.02em" }}>
            {isHighRisk ? "High Impact Detected" : "Looks Safe to Proceed"}
          </h2>

          <p style={{ fontSize: 16, color: isHighRisk ? "#94A3B8" : "#64748B", margin: 0, textAlign: "center", lineHeight: 1.6, maxWidth: 280 }}>
            {isHighRisk
              ? <>This purchase totals <strong style={{ color: "#f29e0d" }}>{totalImpact}%</strong> of your current balance.</>
              : <>This purchase is only <strong style={{ color: "#22c55e" }}>{totalImpact}%</strong> of your current balance.</>
            }
          </p>
        </div>

        {/* Before / After card */}
        <div style={{
          width: "100%",
          background: isHighRisk ? "rgba(242,158,13,0.05)" : "rgba(255,255,255,0.9)",
          border: `1px solid ${isHighRisk ? "rgba(242,158,13,0.15)" : "#E2E8F0"}`,
          borderRadius: 28, padding: "20px 20px 16px",
          marginBottom: 16,
          boxShadow: isHighRisk ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
        }}>
          {/* Current */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: isHighRisk ? "#64748B" : "#94A3B8" }}>Current Budget (Before)</span>
              <span className="font-mono" style={{ fontSize: 18, fontWeight: 800, color: "#22c55e" }}>{currency} {fmt(SAFETY_BUFFER)}</span>
            </div>
            <div style={{ height: 14, background: isHighRisk ? "rgba(255,255,255,0.08)" : "#F1F5F9", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "100%", background: "#22c55e", borderRadius: 999 }} />
            </div>
          </div>

          {/* Projected */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: isHighRisk ? "#64748B" : "#94A3B8" }}>Projected Budget (After)</span>
              <span className="font-mono" style={{ fontSize: 18, fontWeight: 800, color: isHighRisk ? "#ef4444" : "#22c55e" }}>
                {currency} {fmt(Math.max(projectedAfter, 0))}
              </span>
            </div>
            <div style={{ height: 14, background: isHighRisk ? "rgba(255,255,255,0.08)" : "#F1F5F9", borderRadius: 999, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.max(100 - totalImpact, 0)}%`,
                background: isHighRisk ? "#ef4444" : "#22c55e",
                borderRadius: 999,
                transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>
            <p className="font-mono" style={{ fontSize: 12, fontWeight: 600, fontStyle: "italic", color: isHighRisk ? "#ef4444" : "#22c55e", textAlign: "right", margin: "6px 0 0" }}>
              -{totalImpact}% Impact
            </p>
          </div>
        </div>

        {/* Guardian speech bubble */}
        <div style={{
          width: "100%",
          display: "flex", alignItems: "flex-start", gap: 14,
          padding: "16px",
          background: isHighRisk ? "rgba(242,158,13,0.08)" : "rgba(34,197,94,0.07)",
          border: `1px solid ${isHighRisk ? "rgba(242,158,13,0.2)" : "rgba(34,197,94,0.2)"}`,
          borderRadius: 24, marginBottom: 8,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            background: isHighRisk ? "#f29e0d" : "#22c55e",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 16px ${isHighRisk ? "rgba(242,158,13,0.35)" : "rgba(34,197,94,0.35)"}`,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 26, color: "#fff", fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
          </div>
          <div style={{
            flex: 1, background: isHighRisk ? "#1e1a0e" : "#fff",
            borderRadius: "0 12px 12px 12px",
            padding: "12px 14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", left: -8, top: 0,
              width: 0, height: 0,
              borderTop: `8px solid ${isHighRisk ? "#1e1a0e" : "#fff"}`,
              borderLeft: "8px solid transparent",
            }} />
            <p style={{ fontSize: 14, color: isHighRisk ? "#E2E8F0" : "#1E293B", margin: 0, lineHeight: 1.6 }}>
              {isHighRisk
                ? <>Your <strong style={{ color: "#f29e0d" }}>"{itemName}"</strong> purchase via <strong style={{ color: "#f29e0d" }}>{providerLabel}</strong> will seriously strain your cash flow. Consider postponing or splitting over more months.</>
                : <>Great news! Buying <strong style={{ color: "#22c55e" }}>"{itemName}"</strong> via <strong style={{ color: "#22c55e" }}>{providerLabel}</strong> fits comfortably within your budget.</>
              }
            </p>
          </div>
        </div>
      </div>

      {/* CTAs — no longer competing with BottomNav since it's hidden on this screen */}
      <div style={{
        flexShrink: 0, padding: "12px 16px 32px",
        background: isHighRisk ? "rgba(26,18,0,0.95)" : "rgba(246,248,245,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${isHighRisk ? "rgba(242,158,13,0.12)" : "#E2E8F0"}`,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {isHighRisk ? (
          <>
            <button onClick={onPostpone} style={{
              width: "100%", height: 56, borderRadius: 9999,
              background: "#f29e0d", border: "none", cursor: "pointer",
              color: "#1a1200", fontSize: 16, fontWeight: 800,
              boxShadow: "0 8px 24px rgba(242,158,13,0.3)",
              transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Postpone to Next Month
            </button>
            <button onClick={onProceed} style={{
              width: "100%", height: 56, borderRadius: 9999,
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.15)", cursor: "pointer",
              color: "#94A3B8", fontSize: 16, fontWeight: 600,
              transition: "border-color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
            >
              Continue to Buy
            </button>
          </>
        ) : (
          <>
            <button onClick={onRetry} style={{
              width: "100%", height: 56, borderRadius: 9999,
              background: "#22c55e", border: "none", cursor: "pointer",
              color: "#fff", fontSize: 16, fontWeight: 800,
              boxShadow: "0 8px 24px rgba(34,197,94,0.3)",
              transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Confirm Purchase
            </button>
            <button onClick={onBack} style={{
              width: "100%", height: 56, borderRadius: 9999,
              background: "transparent",
              border: "2px solid #E2E8F0", cursor: "pointer",
              color: "#64748B", fontSize: 16, fontWeight: 600,
            }}>
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ProceedAnywayScreen({ itemName, amount, duration, onDone }) {
  const [checked, setChecked] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [proceeded, setProceeded] = useState(false);

  const hoursOfWork = Math.round(amount / 15);

  const handleProceed = () => {
    if (!checked) return;
    setProceeded(true);
    setCountdown(7);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) { onDone(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, onDone]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", flex: 1, minHeight: 0,
      overflow: "hidden",
      background: "#f8f6f6", fontFamily: "Inter, sans-serif",
      animation: "fadeSlideUp 0.3s ease both",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "52px 16px 8px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>Proceed Anyway</h2>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 16px 24px" }}>

        {/* Big headline */}
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", margin: "24px 0 24px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          Choice Confirmed:<br />Financial Shackles On.
        </h1>

        {/* Work timer card */}
        <div style={{
          background: "#E2E8F0", borderRadius: 20, padding: "24px",
          borderLeft: "4px solid #d41111", marginBottom: 16,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#d41111", fontVariationSettings: "'FILL' 1" }}>schedule</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#d41111", textTransform: "uppercase", letterSpacing: "0.1em" }}>Work Timer</span>
          </div>
          <p className="font-mono" style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.02em" }}>{hoursOfWork} Hours</p>
          <p style={{ fontSize: 14, color: "#475569", margin: 0, lineHeight: 1.6 }}>
            You aren't buying a product; you are selling <strong>{hoursOfWork} hours</strong> of your life to a billionaire.
          </p>
        </div>

        {/* Lifestyle card */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "20px",
          border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 24,
          display: "flex", alignItems: "flex-start", gap: 16,
        }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#64748B" }}>restaurant_menu</span>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>Current Lifestyle: Instant Noodles Mode</p>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Welcome to the struggle.</p>
          </div>
        </div>

        {/* Shame checkbox */}
        <div
          onClick={() => !proceeded && setChecked(c => !c)}
          style={{
            background: checked ? "rgba(212,17,17,0.08)" : "rgba(212,17,17,0.05)",
            border: `1.5px solid ${checked ? "rgba(212,17,17,0.3)" : "rgba(212,17,17,0.15)"}`,
            borderRadius: 20, padding: "16px", marginBottom: 32,
            display: "flex", alignItems: "flex-start", gap: 12, cursor: proceeded ? "default" : "pointer",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          <div style={{
            width: 20, height: 20, borderRadius: 12, flexShrink: 0, marginTop: 1,
            border: `2px solid ${checked ? "#d41111" : "#CBD5E1"}`,
            background: checked ? "#d41111" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            {checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <p style={{ fontSize: 14, color: "#334155", margin: 0, lineHeight: 1.55, fontWeight: 500 }}>
            I admit I am being a slave to my impulses and I accept the stress this will cause me later.
          </p>
        </div>

        {/* Countdown message */}
        {proceeded && countdown !== null && (
          <div style={{
            textAlign: "center", padding: "16px", background: "rgba(212,17,17,0.06)",
            borderRadius: 20, border: "1px solid rgba(212,17,17,0.15)", marginBottom: 16,
            animation: "fadeSlideUp 0.3s ease both",
          }}>
            <p style={{ fontSize: 13, color: "#d41111", fontWeight: 600, margin: 0 }}>
              Returning to dashboard in <strong>{countdown}s</strong>… Your financial health is now in critical state.
            </p>
          </div>
        )}
      </div>

      {/* CTA — no longer competing with BottomNav since it's hidden on this screen */}
      <div style={{
        flexShrink: 0, padding: "12px 16px 32px",
        background: "rgba(248,246,246,0.95)", backdropFilter: "blur(12px)",
        borderTop: "1px solid #E2E8F0",
      }}>
        <button
          onClick={handleProceed}
          disabled={!checked || proceeded}
          style={{
            width: "100%", height: 56, borderRadius: 9999,
            background: checked && !proceeded ? "#0F172A" : "#94A3B8",
            border: "none", cursor: checked && !proceeded ? "pointer" : "not-allowed",
            color: "#fff", fontSize: 16, fontWeight: 700,
            opacity: checked && !proceeded ? 1 : 0.6,
            transition: "background 0.3s, opacity 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {proceeded
            ? <><span className="material-symbols-outlined" style={{ fontSize: 18, animation: "spin 0.9s linear infinite" }}>autorenew</span> Redirecting in {countdown}s…</>
            : "Proceed to Struggle"
          }
        </button>
      </div>
    </div>
  );
}

export default function Simulation({ onBack, onPostpone, onProceed, currency, onScreenChange }) {
  const [itemName, setItemName] = useState("MacBook Air M2");
  const [amount, setAmount] = useState(1200);
  const [amountDisplay, setAmountDisplay] = useState("1,200.00");
  const [provider, setProvider] = useState("grab");
  const [duration, setDuration] = useState(6);
  const [durationRaw, setDurationRaw] = useState("6");
  const [interest, setInterest] = useState(0);
  const [interestRaw, setInterestRaw] = useState("0");
  const [screen, setScreen] = useState("form");
  const [progress, setProgress] = useState(0);

  // Report the current sub-screen up to the parent so it can decide
  // whether the global BottomNav should be hidden (any screen other
  // than the initial "form" is a focused, modal-style flow).
  useEffect(() => {
    if (onScreenChange) onScreenChange(screen);
    // Reset to "form" (i.e. re-show the nav) if this component unmounts
    return () => { if (onScreenChange) onScreenChange("form"); };
  }, [screen, onScreenChange]);

  const SAFETY_BUFFER = 1240.50;
  const monthlyPay = (amount / (duration || 1)) * (1 + (interest || 0) / 100);
  const bufferImpact = Math.round((monthlyPay / SAFETY_BUFFER) * 100);
  const totalImpact = Math.round((amount / SAFETY_BUFFER) * 100);
  const isHighRisk = totalImpact >= 50;

  const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleAmountFocus = (e) => { e.target.value = String(amount); e.target.select(); };
  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setAmountDisplay(raw);
    const v = parseFloat(raw);
    if (!isNaN(v) && v > 0) setAmount(v);
  };
  const handleAmountBlur = () => { setAmountDisplay(fmt(amount)); };

  const handleAnalyze = () => {
    if (!itemName.trim()) return;
    setScreen("loading");
    setProgress(0);
    const steps = [
      { target: 30, delay: 0, dur: 300 },
      { target: 65, delay: 300, dur: 400 },
      { target: 88, delay: 700, dur: 600 },
    ];
    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay);
    });
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => setScreen("result"), 350);
    }, 1600);
  };

  const providers = [
    { id: "grab", label: "Grab" },
    { id: "shopee", label: "Shopee" },
    { id: "atome", label: "Atome" },
    { id: "lazada", label: "Lazada" },
  ];

  const providerLabel = providers.find(p => p.id === provider)?.label ?? provider;

  if (screen === "loading") {
    return <SimLoadingScreen progress={progress} />;
  }

  if (screen === "result") {
    return (
      <SimResultScreen
        isHighRisk={isHighRisk}
        bufferImpact={bufferImpact}
        totalImpact={totalImpact}
        monthlyPay={monthlyPay}
        amount={amount}
        duration={duration}
        itemName={itemName}
        providerLabel={providerLabel}
        onBack={onBack}
        onRetry={() => setScreen("form")}
        onPostpone={() => onPostpone({ name: itemName, price: amount, provider: providerLabel, duration })}
        onProceed={() => setScreen("proceed")}
        currency={currency}
      />
    );
  }

  if (screen === "proceed") {
    return (
      <ProceedAnywayScreen
        itemName={itemName}
        amount={amount}
        duration={duration}
        onDone={onProceed}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden", background: "transparent", fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", padding: "52px 16px 16px", justifyContent: "space-between", background: "transparent", flexShrink: 0 }}>
        <div style={{ width: 40, height: 40 }} />
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, flex: 1, textAlign: "center", letterSpacing: "-0.02em" }}>
          New Purchase Simulation
        </h1>
        <div style={{ width: 40, height: 40 }} />
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 16px 112px" }}>

        {/* What are you buying */}
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
            What are you buying?
          </h3>
          <div style={{ position: "relative" }}>
            <input
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              placeholder="e.g. MacBook Air M2"
              style={{
                width: "100%", height: 56, background: "#F8FAFC",
                border: "none", borderRadius: 20, padding: "0 16px",
                fontSize: 15, fontWeight: 500, color: "#0F172A",
                outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                transition: "box-shadow 0.2s",
              }}
              onFocus={e => e.target.style.boxShadow = "0 0 0 2px rgba(31,249,31,0.5)"}
              onBlur={e => e.target.style.boxShadow = "none"}
            />
          </div>
        </div>

        {/* ── Provider chips ── */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
          {providers.map(p => {
            const isActive = provider === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setProvider(p.id)}
                style={{
                  flexShrink: 0, height: 40, padding: "0 20px",
                  borderRadius: 9999, border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  background: isActive ? "#1ff91f" : "#F1F5F9",
                  color: isActive ? "#0F172A" : "#64748B",
                  boxShadow: isActive ? "0 4px 14px rgba(31,249,31,0.3)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* ── Amount + Stats ── */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Dark amount card */}
          <div style={{
            background: "#0F172A", borderRadius: 24, padding: "24px",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.45)", margin: "0 0 4px", letterSpacing: "0.01em" }}>
              Total Purchase Value
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.55)", lineHeight: 1, marginBottom: 4, letterSpacing: "0.02em" }}>{currency}</span>
              <input
                id="simulate-amount-input"
                className="font-mono"
                type="text" inputMode="decimal"
                value={amountDisplay}
                onFocus={handleAmountFocus}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontSize: 36, fontWeight: 700, color: "#fff",
                  width: 180, textAlign: "center",
                  letterSpacing: "-0.02em", caretColor: "#1ff91f",
                }}
              />
            </div>
          </div>

          {/* 3-col stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {/* Duration */}
            <div style={{ background: "#F8FAFC", borderRadius: 20, padding: "14px 8px", textAlign: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Duration</span>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 3 }}>
                <input
                  type="text" inputMode="numeric" value={durationRaw}
                  onChange={e => { const raw = e.target.value.replace(/[^0-9]/g, ""); setDurationRaw(raw); const v = parseInt(raw, 10); if (!isNaN(v) && v > 0 && v <= 60) setDuration(v); }}
                  onFocus={e => e.target.select()}
                  onBlur={() => { if (!durationRaw || parseInt(durationRaw) < 1) { setDurationRaw("1"); setDuration(1); } }}
                  style={{ width: 36, background: "transparent", border: "none", outline: "none", fontSize: 16, fontWeight: 700, color: "#0F172A", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", caretColor: "#1ff91f" }}
                />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>mo</span>
              </div>
            </div>

            {/* Monthly Pay */}
            <div style={{ background: "#F8FAFC", borderRadius: 20, padding: "14px 8px", textAlign: "center", borderBottom: "2px solid rgba(31,249,31,0.5)" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Monthly Pay</span>
              <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{`${currency} ${fmt(monthlyPay)}`}</span>
            </div>

            {/* Interest */}
            <div style={{ background: "#F8FAFC", borderRadius: 20, padding: "14px 8px", textAlign: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Interest</span>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 1 }}>
                <input
                  type="text" inputMode="decimal" value={interestRaw}
                  onChange={e => { const raw = e.target.value.replace(/[^0-9.]/g, ""); setInterestRaw(raw); const v = parseFloat(raw); if (!isNaN(v) && v >= 0 && v <= 100) setInterest(v); }}
                  onFocus={e => e.target.select()}
                  onBlur={() => { if (interestRaw === "" || isNaN(parseFloat(interestRaw))) { setInterestRaw("0"); setInterest(0); } }}
                  style={{ width: 36, background: "transparent", border: "none", outline: "none", fontSize: 16, fontWeight: 700, color: "#0F172A", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", caretColor: "#1ff91f" }}
                />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Guardian Tip ── */}
        <div style={{
          marginTop: 32,
          background: isHighRisk ? "rgba(239,68,68,0.07)" : "rgba(31,249,31,0.08)",
          border: `1px solid ${isHighRisk ? "rgba(239,68,68,0.25)" : "rgba(31,249,31,0.2)"}`,
          borderRadius: 24, padding: "20px",
          display: "flex", gap: 16,
          transition: "background 0.3s, border-color 0.3s",
        }}>
          <div style={{ paddingTop: 1, flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: isHighRisk ? "#EF4444" : "#1ff91f", fontVariationSettings: "'FILL' 1", transition: "color 0.3s" }}>
              shield_with_heart
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: 0 }}>Guardian Tip</p>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 999,
                background: isHighRisk ? "rgba(239,68,68,0.12)" : "rgba(31,249,31,0.15)",
                color: isHighRisk ? "#DC2626" : "#15803d",
                letterSpacing: "0.04em", textTransform: "capitalize",
              }}>
                {providerLabel}
              </span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>Balance impact / month</span>
                <span className="font-mono" style={{ fontSize: 13, fontWeight: 800, color: isHighRisk ? "#EF4444" : "#0F172A" }}>
                  −{currency} {fmt(monthlyPay)} <span className="font-mono" style={{ fontSize: 10, fontWeight: 500, color: "#94A3B8" }}>({bufferImpact}%)</span>
                </span>
              </div>
              <div style={{ width: "100%", height: 6, background: "rgba(0,0,0,0.06)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${Math.min(bufferImpact, 100)}%`,
                  background: isHighRisk ? "linear-gradient(90deg,#F87171,#EF4444)" : "linear-gradient(90deg,#86efac,#1ff91f)",
                  transition: "width 0.5s cubic-bezier(.4,0,.2,1), background 0.3s",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span className="font-mono" style={{ fontSize: 9, color: "#94A3B8", fontWeight: 500 }}>{currency} 0</span>
                <span className="font-mono" style={{ fontSize: 9, color: "#94A3B8", fontWeight: 500 }}>{currency} 1,240.50 balance</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#475569", margin: 0, lineHeight: 1.7 }}>
              Paying via <strong style={{ color: "#0F172A" }}>{providerLabel}</strong> over{" "}
              <strong style={{ color: "#0F172A" }}>{duration} months</strong> locks{" "}
              <strong style={{ color: isHighRisk ? "#EF4444" : "#1ff91f" }}>{bufferImpact}%</strong>{" "}
              of your balance each month.{" "}
              {isHighRisk
                ? "⚠️ Above 50% — this is a high-risk purchase."
                : "✓ This looks manageable within your current budget."}
            </p>
          </div>
        </div>

        {/* ── Analyse CTA ── */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <button
            id="simulate-proceed-btn"
            onClick={handleAnalyze}
            disabled={!itemName.trim()}
            style={{
              width: "100%", height: 56, borderRadius: 9999,
              background: "#1ff91f", border: "none",
              cursor: itemName.trim() ? "pointer" : "not-allowed",
              color: "#0a2a0a", fontSize: 16, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 8px 20px rgba(31,249,31,0.25)",
              transition: "transform 0.15s",
              letterSpacing: "-0.01em", fontFamily: "inherit",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <span>Analyse</span>
          </button>
        </div>
      </div>
    </div>
  );
}
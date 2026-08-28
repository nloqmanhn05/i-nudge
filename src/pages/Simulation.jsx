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
            background: "rgba(19,236,200,0.18)", filter: "blur(40px)",
          }} />
          {/* Circle card */}
          <div style={{
            width: 192, height: 192, borderRadius: "50%",
            background: "#fff", boxShadow: "0 0 40px 20px rgba(19,236,200,0.15), 0 8px 40px rgba(0,0,0,0.10)",
            border: "1px solid #f1f5f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <svg width="128" height="64" viewBox="0 0 100 50" fill="none" stroke="#13ecc8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#13ecc8", fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
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
            background: "var(--color-brand-primary, #13ecc8)",
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

      {/* CTAs */}
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

      {/* CTA */}
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

const DAILY_POOL_MINIMUM = 300;

function DailyPoolBlockedScreen({ currency, monthlyIncome, fixedTotal, bnplDue, savingsAmt, dailyPool, onBack }) {
  const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const deficit = DAILY_POOL_MINIMUM - dailyPool;

  const rows = [
    { label: "Monthly Income", amount: monthlyIncome, sign: "+", color: "#22c55e" },
    { label: "Fixed Bills", amount: fixedTotal, sign: "−", color: "#3B82F6" },
    { label: "BNPL Due", amount: bnplDue, sign: "−", color: "#EF4444" },
    { label: "Savings Target", amount: savingsAmt, sign: "−", color: "#8B5CF6" },
  ];

  return (
    <div style={{
      display: "flex", flexDirection: "column", flex: 1, minHeight: 0,
      overflow: "hidden",
      background: "#0f0a14", fontFamily: "Inter, sans-serif",
      animation: "fadeSlideUp 0.35s ease both",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "52px 16px 16px", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#c084fc" }}>arrow_back_ios</span>
        </button>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(192,132,252,0.7)", flex: 1, textAlign: "center", paddingRight: 40 }}>
          TRANSACTION BLOCKED
        </span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 16px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Icon */}
        <div style={{ marginTop: 16, marginBottom: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(192,132,252,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(192,132,252,0.25)",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 44, color: "#c084fc", fontVariationSettings: "'FILL' 1" }}>block</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0, textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Transaction Failed
          </h2>
          <p style={{ fontSize: 15, color: "#94A3B8", margin: 0, textAlign: "center", lineHeight: 1.6, maxWidth: 290 }}>
            You have triggered the{" "}
            <strong style={{ color: "#c084fc" }}>minimum monthly pool limit</strong>.
            Your income after all deductions is too low — proceeding would push you into <strong style={{ color: "#EF4444" }}>overspending</strong>.
          </p>
        </div>

        {/* Pool breakdown card */}
        <div style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(192,132,252,0.2)",
          borderRadius: 28, padding: "20px 20px 16px",
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(192,132,252,0.7)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>Pool Calculation</p>
          {rows.map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.color, width: 16 }}>{row.sign}</span>
                <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{row.label}</span>
              </div>
              <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0" }}>{currency} {fmt(row.amount)}</span>
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(192,132,252,0.2)", margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#EF4444", width: 16 }}>=</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Monthly Pool</span>
            </div>
            <span className="font-mono" style={{ fontSize: 18, fontWeight: 800, color: "#EF4444" }}>{currency} {fmt(dailyPool)}</span>
          </div>
        </div>

        {/* Minimum threshold card */}
        <div style={{
          width: "100%",
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 24, padding: "16px",
          marginBottom: 16,
          display: "flex", alignItems: "flex-start", gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            background: "#EF4444",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(239,68,68,0.35)",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 26, color: "#fff", fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#FCA5A5", margin: "0 0 6px" }}>⚠️ Overspending Detected</p>
            <p style={{ fontSize: 13, color: "#E2E8F0", margin: 0, lineHeight: 1.6 }}>
              Your remaining monthly pool is only{" "}
              <strong style={{ color: "#c084fc" }}>{currency} {fmt(dailyPool)}</strong>, which is below the{" "}
              <strong style={{ color: "#EF4444" }}>{currency} {fmt(DAILY_POOL_MINIMUM)} minimum</strong>.
              You need <strong style={{ color: "#c084fc" }}>{currency} {fmt(deficit)}</strong> more to unlock new transactions.
              Reduce your BNPL commitments or fixed bills to free up budget.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        flexShrink: 0, padding: "12px 16px 32px",
        background: "rgba(15,10,20,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(192,132,252,0.12)",
      }}>
        <button onClick={onBack} style={{
          width: "100%", height: 56, borderRadius: 9999,
          background: "rgba(192,132,252,0.15)",
          border: "2px solid rgba(192,132,252,0.4)", cursor: "pointer",
          color: "#c084fc", fontSize: 16, fontWeight: 700,
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,132,252,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(192,132,252,0.15)"; }}
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const DEFAULT_PROVIDERS = [
  { id: "grab", label: "Grab" },
  { id: "shopee", label: "Shopee Pay / SPayLater" },
  { id: "atome", label: "Atome" },
  { id: "lazada", label: "Lazada LazPayLater" },
];

// Helper icon getter to show e-commerce style icons like Shopee/Lazada/Atome
function getProviderIcon(label = "") {
  const name = label.toLowerCase();
  if (name.includes("shopee") || name.includes("spay")) return "shopping_bag";
  if (name.includes("atome")) return "bolt";
  if (name.includes("lazada") || name.includes("lazpay")) return "local_mall";
  if (name.includes("grab")) return "directions_car";
  if (name.includes("card") || name.includes("credit") || name.includes("debit")) return "credit_card";
  if (name.includes("bank") || name.includes("fpx")) return "account_balance";
  return "payments";
}

export default function Simulation({ onBack, onPostpone, onProceed, currency, onScreenChange, monthlyIncome = 3200, fixedBills = [], bnplDueThisCycle = 0, savingsTarget = 10, onConfirmPurchase = () => {} }) {
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

  const [providers, setProviders] = useState(() => {
    try {
      const saved = localStorage.getItem("nudge_providers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { }
    return DEFAULT_PROVIDERS;
  });
  const [isEditingProviders, setIsEditingProviders] = useState(false);
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [newProviderName, setNewProviderName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingLabel, setEditingLabel] = useState("");

  const handleDeleteProvider = (idToDelete) => {
    const updated = providers.filter(p => p.id !== idToDelete);
    setProviders(updated);
    try {
      localStorage.setItem("nudge_providers", JSON.stringify(updated));
    } catch (e) { }
    if (provider === idToDelete) {
      if (updated.length > 0) {
        setProvider(updated[0].id);
      } else {
        setProvider("");
      }
    }
  };

  const handleAddProvider = () => {
    const trimmed = newProviderName.trim();
    if (!trimmed) return;
    const newId = trimmed.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    const newProviderObj = { id: newId, label: trimmed };
    const updated = [...providers, newProviderObj];
    setProviders(updated);
    try {
      localStorage.setItem("nudge_providers", JSON.stringify(updated));
    } catch (e) { }
    setProvider(newId); // Automatically select newly added payment method
    setNewProviderName("");
    setIsAddingProvider(false);
  };

  const handleRenameProvider = (idToRename, newLabel) => {
    const trimmed = newLabel.trim();
    if (!trimmed) return;
    const updated = providers.map(p => p.id === idToRename ? { ...p, label: trimmed } : p);
    setProviders(updated);
    try {
      localStorage.setItem("nudge_providers", JSON.stringify(updated));
    } catch (e) { }
  };

  const handleResetProviders = () => {
    setProviders(DEFAULT_PROVIDERS);
    setProvider("grab");
    try {
      localStorage.setItem("nudge_providers", JSON.stringify(DEFAULT_PROVIDERS));
    } catch (e) { }
  };

  useEffect(() => {
    if (onScreenChange) onScreenChange(screen);
    return () => { if (onScreenChange) onScreenChange("form"); };
  }, [screen, onScreenChange]);

  const SAFETY_BUFFER = 1240.50;
  const monthlyPay = (amount / (duration || 1)) * (1 + (interest || 0) / 100);
  const bufferImpact = Math.round((monthlyPay / SAFETY_BUFFER) * 100);
  const totalImpact = Math.round((amount / SAFETY_BUFFER) * 100);
  const isHighRisk = totalImpact >= 50;

  // ── Daily Pool Exception Logic ────────────────────────────────────────────
  const fixedTotal = fixedBills.reduce((s, b) => s + b.amount, 0);
  const savingsAmt = (monthlyIncome * savingsTarget) / 100;
  const dailyPool = monthlyIncome - fixedTotal - bnplDueThisCycle - savingsAmt;
  const isDailyPoolBlocked = dailyPool < DAILY_POOL_MINIMUM;

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
    // Block if daily pool is below minimum requirement
    if (isDailyPoolBlocked) {
      setScreen("pool_blocked");
      return;
    }
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

  const providerLabel = providers.find(p => p.id === provider)?.label ?? provider ?? "None";

  if (screen === "loading") {
    return <SimLoadingScreen progress={progress} />;
  }

  if (screen === "result") {
    // Build transaction object to pass to confirm handlers
    const txDetails = { name: itemName, amount, monthlyPay, provider: providerLabel, duration };
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
        onRetry={() => {
          // Safe path: record purchase and go home
          onConfirmPurchase(txDetails);
        }}
        onPostpone={() => onPostpone({ name: itemName, price: amount, provider: providerLabel, duration })}
        onProceed={() => setScreen("proceed")}
        currency={currency}
      />
    );
  }

  if (screen === "proceed") {
    const txDetails = { name: itemName, amount, monthlyPay, provider: providerLabel, duration };
    return (
      <ProceedAnywayScreen
        itemName={itemName}
        amount={amount}
        duration={duration}
        onDone={() => {
          // High-risk path: record purchase AND trigger danger mode
          onProceed(txDetails);
        }}
      />
    );
  }

  if (screen === "pool_blocked") {
    return (
      <DailyPoolBlockedScreen
        currency={currency}
        monthlyIncome={monthlyIncome}
        fixedTotal={fixedTotal}
        bnplDue={bnplDueThisCycle}
        savingsAmt={savingsAmt}
        dailyPool={dailyPool}
        onBack={() => setScreen("form")}
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
              onKeyDown={e => { if (e.key === "Enter" && itemName.trim()) handleAnalyze(); }}
              placeholder="e.g. MacBook Air M2"
              style={{
                width: "100%", height: 56, background: "#F8FAFC",
                border: "none", borderRadius: 20, padding: "0 16px",
                fontSize: 15, fontWeight: 500, color: "#0F172A",
                outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                transition: "box-shadow 0.2s",
              }}
              onFocus={e => e.target.style.boxShadow = "0 0 0 2px rgba(19,236,200,0.5)"}
              onBlur={e => e.target.style.boxShadow = "none"}
            />
          </div>
        </div>

        {/* ── Category Payment Method Selector (Shopee / Atome / Lazada style) ── */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: 0 }}>
              Payment Method Provider
            </h3>
            <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
              {providers.length} available
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
            {/* Horizontal scroll wrapper with minWidth: 0 to prevent stretching */}
            <div style={{
              flex: 1, minWidth: 0, display: "flex", gap: 10,
              overflowX: "auto", paddingBottom: 6, paddingTop: 4,
              scrollbarWidth: "none", alignItems: "center",
              WebkitOverflowScrolling: "touch"
            }}>
              {providers.map(p => {
                const isActive = provider === p.id;
                const iconName = getProviderIcon(p.label);

                return (
                  <div key={p.id} style={{ position: "relative", flexShrink: 0, display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => setProvider(p.id)}
                      style={{
                        height: 44,
                        padding: isEditingProviders ? "0 34px 0 14px" : "0 18px",
                        borderRadius: 16,
                        border: isActive ? "2px solid #1ff91f" : "1.5px solid #E2E8F0",
                        cursor: "pointer",
                        fontSize: 13, fontWeight: isActive ? 700 : 600,
                        background: isActive ? "rgba(31,249,31,0.12)" : "#FFFFFF",
                        color: isActive ? "#0F172A" : "#475569",
                        boxShadow: isActive ? "0 4px 12px rgba(31,249,31,0.2)" : "0 1px 3px rgba(0,0,0,0.03)",
                        display: "flex", alignItems: "center", gap: 8,
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <span className="material-symbols-outlined" style={{
                        fontSize: 18,
                        color: isActive ? "#059669" : "#64748B"
                      }}>
                        {iconName}
                      </span>
                      <span>{p.label}</span>
                      {isActive && (
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#10B981", fontWeight: 700 }}>
                          check_circle
                        </span>
                      )}
                    </button>

                    {/* Inline Delete Button when in Edit mode */}
                    {isEditingProviders && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProvider(p.id);
                        }}
                        title={`Delete ${p.label}`}
                        style={{
                          position: "absolute",
                          right: 6,
                          width: 22, height: 22,
                          borderRadius: "50%",
                          background: "#EF4444", color: "#ffffff",
                          border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          padding: 0, boxShadow: "0 2px 6px rgba(239,68,68,0.4)",
                          transition: "transform 0.15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 13, fontWeight: 700 }}>close</span>
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Inline Add Button or Input */}
              {isAddingProvider ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 6, background: "#FFFFFF",
                  borderRadius: 16, padding: "0 8px 0 12px", height: 44, flexShrink: 0,
                  border: "2px solid #1ff91f", boxShadow: "0 0 0 3px rgba(31,249,31,0.2)"
                }}>
                  <input
                    value={newProviderName}
                    onChange={e => setNewProviderName(e.target.value)}
                    placeholder="e.g. SPayLater..."
                    autoFocus
                    style={{
                      border: "none", background: "transparent", outline: "none",
                      width: 110, fontSize: 13, fontWeight: 600, color: "#0F172A",
                      fontFamily: "inherit"
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleAddProvider();
                      if (e.key === "Escape") { setIsAddingProvider(false); setNewProviderName(""); }
                    }}
                  />
                  <button
                    onClick={handleAddProvider}
                    style={{
                      background: "#1ff91f", color: "#000", border: "none",
                      borderRadius: 10, width: 28, height: 28, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                    title="Confirm Add"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, fontWeight: 700 }}>check</span>
                  </button>
                  <button
                    onClick={() => { setIsAddingProvider(false); setNewProviderName(""); }}
                    style={{
                      background: "transparent", color: "#64748B", border: "none",
                      borderRadius: 10, width: 26, height: 26, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                    title="Cancel"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingProvider(true)}
                  style={{
                    flexShrink: 0, height: 44, padding: "0 16px", borderRadius: 16,
                    border: "2px dashed #CBD5E1", background: "rgba(248,250,252,0.8)",
                    color: "#334155", cursor: "pointer", fontSize: 13, fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#1ff91f";
                    e.currentTarget.style.background = "rgba(31,249,31,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#CBD5E1";
                    e.currentTarget.style.background = "rgba(248,250,252,0.8)";
                  }}
                  title="Add payment provider option"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                  Add Method
                </button>
              )}
            </div>

            {/* Quick Edit Modal Button */}
            <button
              onClick={() => {
                setShowEditModal(true);
                setIsEditingProviders(prev => !prev);
              }}
              title="Edit payment provider options"
              style={{
                flexShrink: 0, height: 44, width: 44, borderRadius: 16,
                border: isEditingProviders || showEditModal ? "1.5px solid #1ff91f" : "1.5px solid #CBD5E1",
                background: isEditingProviders || showEditModal ? "rgba(31,249,31,0.15)" : "#F8FAFC",
                color: isEditingProviders || showEditModal ? "#0F172A" : "#64748B",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: isEditingProviders || showEditModal ? "0 2px 8px rgba(31,249,31,0.25)" : "none",
                transition: "all 0.2s"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, fontWeight: 600 }}>
                {isEditingProviders || showEditModal ? "check" : "settings"}
              </span>
            </button>
          </div>
        </div>

        {/* ── Manage Providers Modal ── */}
        {showEditModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)",
            zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16
          }}>
            <div style={{
              background: "#ffffff", borderRadius: 24, padding: "24px",
              width: "100%", maxWidth: 400, boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              display: "flex", flexDirection: "column", gap: 20
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(31,249,31,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#0F172A" }}>edit</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>Manage Payment Options</h3>
                    <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>Add Shopee, Atome, Lazada or custom methods</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748B", padding: 4 }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>close</span>
                </button>
              </div>

              {/* Add New Option Input */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Add New Provider
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={newProviderName}
                    onChange={e => setNewProviderName(e.target.value)}
                    placeholder="e.g. SPayLater, Atome, TikTok Pay"
                    onKeyDown={e => { if (e.key === "Enter") handleAddProvider(); }}
                    style={{
                      flex: 1, height: 44, background: "#F8FAFC", border: "1.5px solid #CBD5E1",
                      borderRadius: 14, padding: "0 14px", fontSize: 14, fontWeight: 500,
                      color: "#0F172A", outline: "none", fontFamily: "inherit"
                    }}
                  />
                  <button
                    onClick={handleAddProvider}
                    disabled={!newProviderName.trim()}
                    style={{
                      height: 44, padding: "0 18px", borderRadius: 14,
                      background: newProviderName.trim() ? "#1ff91f" : "#E2E8F0",
                      color: newProviderName.trim() ? "#0F172A" : "#94A3B8",
                      border: "none", fontWeight: 700, fontSize: 14, cursor: newProviderName.trim() ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", gap: 4, transition: "all 0.15s"
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                    Add
                  </button>
                </div>
              </div>

              {/* Existing Options List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Active Options ({providers.length})
                </label>
                {providers.length === 0 ? (
                  <p style={{ fontSize: 13, color: "#94A3B8", fontStyle: "italic", textAlign: "center", margin: "12px 0" }}>
                    No options available. Type above to add one!
                  </p>
                ) : (
                  providers.map(p => (
                    <div
                      key={p.id}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 12px", background: provider === p.id ? "rgba(31,249,31,0.08)" : "#F8FAFC",
                        border: `1px solid ${provider === p.id ? "rgba(31,249,31,0.4)" : "#E2E8F0"}`,
                        borderRadius: 14, transition: "all 0.15s"
                      }}
                    >
                      {editingId === p.id ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, marginRight: 8 }}>
                          <input
                            value={editingLabel}
                            onChange={e => setEditingLabel(e.target.value)}
                            autoFocus
                            style={{
                              flex: 1, height: 32, background: "#fff", border: "1px solid #1ff91f",
                              borderRadius: 8, padding: "0 8px", fontSize: 13, fontWeight: 600, color: "#0F172A"
                            }}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                handleRenameProvider(p.id, editingLabel);
                                setEditingId(null);
                              }
                              if (e.key === "Escape") setEditingId(null);
                            }}
                          />
                          <button
                            onClick={() => {
                              handleRenameProvider(p.id, editingLabel);
                              setEditingId(null);
                            }}
                            style={{ background: "#1ff91f", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#0F172A" }}>check</span>
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#64748B" }}>
                            {getProviderIcon(p.label)}
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
                            {p.label}
                          </span>
                          {provider === p.id && (
                            <span style={{ fontSize: 10, fontWeight: 700, background: "#1ff91f", color: "#0F172A", borderRadius: 99, padding: "2px 8px" }}>
                              Selected
                            </span>
                          )}
                        </div>
                      )}

                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {editingId !== p.id && (
                          <button
                            onClick={() => {
                              setEditingId(p.id);
                              setEditingLabel(p.label);
                            }}
                            title="Rename option"
                            style={{ background: "transparent", border: "none", color: "#64748B", cursor: "pointer", padding: 4, borderRadius: 6 }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteProvider(p.id)}
                          title="Delete option"
                          style={{ background: "transparent", border: "none", color: "#EF4444", cursor: "pointer", padding: 4, borderRadius: 6 }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #E2E8F0" }}>
                <button
                  onClick={handleResetProviders}
                  style={{ background: "transparent", border: "none", color: "#64748B", fontSize: 12, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  style={{
                    height: 40, padding: "0 24px", borderRadius: 9999, background: "#0F172A",
                    color: "#ffffff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer"
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

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
                onKeyDown={e => { if (e.key === "Enter" && itemName.trim()) handleAnalyze(); }}
                onBlur={handleAmountBlur}
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontSize: 36, fontWeight: 700, color: "#fff",
                  width: 180, textAlign: "center",
                  letterSpacing: "-0.02em", caretColor: "#13ecc8",
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
                  onKeyDown={e => { if (e.key === "Enter" && itemName.trim()) handleAnalyze(); }}
                  onFocus={e => e.target.select()}
                  onBlur={() => { if (!durationRaw || parseInt(durationRaw) < 1) { setDurationRaw("1"); setDuration(1); } }}
                  style={{ width: 36, background: "transparent", border: "none", outline: "none", fontSize: 16, fontWeight: 700, color: "#0F172A", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", caretColor: "#13ecc8" }}
                />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>mo</span>
              </div>
            </div>

            {/* Monthly Pay */}
            <div style={{ background: "#F8FAFC", borderRadius: 20, padding: "14px 8px", textAlign: "center", borderBottom: "2px solid rgba(19,236,200,0.5)" }}>
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
                  onKeyDown={e => { if (e.key === "Enter" && itemName.trim()) handleAnalyze(); }}
                  onFocus={e => e.target.select()}
                  onBlur={() => { if (interestRaw === "" || isNaN(parseFloat(interestRaw))) { setInterestRaw("0"); setInterest(0); } }}
                  style={{ width: 36, background: "transparent", border: "none", outline: "none", fontSize: 16, fontWeight: 700, color: "#0F172A", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", caretColor: "#13ecc8" }}
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

        {/* ── Pool Blocked Warning Banner ── */}
        {isDailyPoolBlocked && (
          <div style={{
            marginTop: 20,
            background: "rgba(239,68,68,0.08)",
            border: "1.5px solid rgba(239,68,68,0.3)",
            borderRadius: 20, padding: "14px 16px",
            display: "flex", alignItems: "flex-start", gap: 12,
            animation: "fadeSlideUp 0.3s ease both",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#EF4444", flexShrink: 0, fontVariationSettings: "'FILL' 1", marginTop: 1 }}>warning</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", margin: "0 0 3px" }}>Daily Pool Minimum Triggered — Transaction Blocked</p>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>
                Your monthly pool ({currency} {fmt(dailyPool)}) is below the {currency} {fmt(DAILY_POOL_MINIMUM)} minimum. Proceeding would push you into overspending. Reduce BNPL or bills to unlock.
              </p>
            </div>
          </div>
        )}

        {/* ── Analyse CTA ── */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
          <button
            id="simulate-proceed-btn"
            onClick={handleAnalyze}
            disabled={!itemName.trim()}
            style={{
              width: "100%", height: 56, borderRadius: 9999,
              background: isDailyPoolBlocked ? "rgba(192,132,252,0.15)" : !itemName.trim() ? "#E2E8F0" : "#13ecc8",
              border: isDailyPoolBlocked ? "2px solid rgba(192,132,252,0.4)" : "none",
              cursor: itemName.trim() ? "pointer" : "not-allowed",
              color: isDailyPoolBlocked ? "#c084fc" : !itemName.trim() ? "#94A3B8" : "#0f3c36",
              fontSize: 16, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: isDailyPoolBlocked ? "0 4px 20px rgba(192,132,252,0.2)" : !itemName.trim() ? "none" : "0 8px 24px rgba(19,236,200,0.35)",
              transition: "transform 0.15s, background 0.3s, box-shadow 0.3s",
              letterSpacing: "-0.01em", fontFamily: "inherit",
            }}
            onMouseEnter={e => { if (itemName.trim()) e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            onMouseDown={e => { if (itemName.trim()) e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {isDailyPoolBlocked
              ? <><span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>lock</span><span>See Why Blocked</span></>
              : <span>Analyse (Enter)</span>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
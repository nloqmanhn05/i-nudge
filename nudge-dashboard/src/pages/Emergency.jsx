import { HARDSHIP_INFO } from "../data/mockData";

function calculatePaymentPriority(bnplDebts, fixedBills) {
  const allItems = [];

  (bnplDebts || []).forEach(d => {
    if (d.amount > 0) {
      allItems.push({
        id: `bnpl-${d.id}`,
        name: d.name,
        type: "BNPL",
        amount: d.amount,
        daysUntilDue: d.daysUntilDue ?? 30,
        due: d.due,
        lateFee: d.lateFee || 0,
        hardshipAvailable: !!d.hardshipAvailable,
        provider: d.provider || d.name,
        color: d.color || "#EE4D2D",
        icon: d.icon || "credit_card"
      });
    }
  });

  (fixedBills || []).forEach(b => {
    if (b.amount > 0) {
      allItems.push({
        id: `bill-${b.id}`,
        name: b.label,
        type: "Bill",
        amount: b.amount,
        daysUntilDue: b.daysUntilDue ?? 15,
        due: `Due in ${b.daysUntilDue ?? 15} days`,
        lateFee: 0,
        hardshipAvailable: false,
        isEssential: b.isEssential !== false,
        icon: b.icon || "receipt"
      });
    }
  });

  const payFirst = [];
  const canHold = [];

  allItems.forEach(item => {
    const isEssential = item.isEssential === true;
    const dueSoonNoHardship = item.daysUntilDue < 7 && !item.hardshipAvailable;
    const hasHardship = item.hardshipAvailable === true;
    const dueLaterLowFee = item.daysUntilDue > 14 && (item.lateFee <= 10);

    if (isEssential || dueSoonNoHardship) {
      payFirst.push(item);
    } else if (hasHardship || dueLaterLowFee) {
      canHold.push(item);
    } else {
      payFirst.push(item);
    }
  });

  const sortFn = (a, b) => {
    if (a.daysUntilDue !== b.daysUntilDue) {
      return a.daysUntilDue - b.daysUntilDue;
    }
    return (b.lateFee + b.amount) - (a.lateFee + a.amount);
  };

  payFirst.sort(sortFn);
  canHold.sort(sortFn);

  return { payFirst, canHold };
}

export default function Emergency({
  emergencyTriggered,
  emergencyAcknowledged,
  onAcknowledge,
  shortfall,
  survivalScoreDays,
  bnplDueThisCycle,
  availableIncome,
  currency,
  fmt,
  bnplDebts,
  fixedBills,
  dailyEssentialBurnRate,
  savingsTarget
}) {
  const { payFirst, canHold } = calculatePaymentPriority(bnplDebts, fixedBills);

  if (!emergencyTriggered) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "transparent" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "52px 16px 16px",
          background: "transparent",
          flexShrink: 0,
        }}>
          <div style={{ width: 40, height: 40 }} />
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, flex: 1, textAlign: "center", letterSpacing: "-0.02em" }}>Emergency</h1>
          <div style={{ width: 40, height: 40 }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 112 }}>
          {/* Status Banner */}
          <div style={{ margin: "0 16px 16px", padding: "16px", background: "linear-gradient(155deg, #ECFDF5 0%, #D1FAE5 100%)", borderRadius: 24, border: "1px solid #A7F3D0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: "white", fontSize: 22, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#065F46", margin: 0 }}>You're On Track!</p>
                <p style={{ fontSize: 12, color: "#047857", margin: "2px 0 0", fontWeight: 600 }}>Emergency Mode is currently idle</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#064E3B", margin: 0, lineHeight: 1.5 }}>
              Your available income covers all upcoming BNPL installments and fixed bills this month. Your liquidity situation is healthy.
            </p>
          </div>
          {/* Calm Cards */}
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "white", borderRadius: 28, padding: 20, border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="material-symbols-outlined" style={{ color: "#10B981", fontSize: 20 }}>shield</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Survival Score</span>
              </div>
              <div className="font-mono" style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>
                {Math.floor(survivalScoreDays)} Days
              </div>
              <p style={{ fontSize: 12, color: "#64748B", margin: "4px 0 0" }}>Essential reserve duration based on your current fixed bills.</p>
            </div>

            <div style={{ background: "white", borderRadius: 28, padding: 20, border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="material-symbols-outlined" style={{ color: "#3B82F6", fontSize: 20 }}>account_balance_wallet</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Available Liquidity Buffer</span>
              </div>
              <div className="font-mono" style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>
                {currency} {fmt ? fmt(availableIncome - bnplDueThisCycle) : (availableIncome - bnplDueThisCycle)}
              </div>
              <p style={{ fontSize: 12, color: "#64748B", margin: "4px 0 0" }}>Surplus remaining after all fixed bills and BNPL installments.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Triggered view
  const isShortfall = shortfall > 0;
  const reasonText = isShortfall
    ? `BNPL Due: ${currency} ${fmt ? fmt(bnplDueThisCycle) : bnplDueThisCycle} · Available: ${currency} ${fmt ? fmt(availableIncome) : availableIncome}`
    : `Survival Score critically low (${Math.floor(survivalScoreDays)} days)`;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "transparent" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "52px 16px 16px",
        background: "transparent",
        flexShrink: 0,
      }}>
        <div style={{ width: 40, height: 40 }} />
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, flex: 1, textAlign: "center", letterSpacing: "-0.02em" }}>Emergency</h1>
        <div style={{ width: 40, height: 40 }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 112 }}>
        {/* Alert Banner */}
        <div style={{ margin: "0 16px 16px", padding: "16px", background: "linear-gradient(155deg, #DC2626 0%, #B91C1C 100%)", color: "white", borderRadius: 24, boxShadow: "0 4px 16px rgba(220,38,38,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#FEE2E2", animation: "safe-pulse 2s infinite" }}>warning</span>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Shortfall Alert</p>
            </div>
            {!emergencyAcknowledged && (
              <button
                onClick={onAcknowledge}
                style={{ padding: "6px 12px", borderRadius: 999, background: "white", color: "#DC2626", border: "none", fontWeight: 700, fontSize: 11, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
              >
                Mark as Reviewed
              </button>
            )}
          </div>
          <p className="font-mono" style={{ fontSize: 12, margin: "0 0 10px", opacity: 0.95, lineHeight: 1.4 }}>{reasonText}</p>
          {emergencyAcknowledged && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: 999 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
              <span style={{ fontSize: 11, fontWeight: 700 }}>Reviewed for this cycle</span>
            </div>
          )}
        </div>
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Essentials Daily Budget */}
          <div style={{ background: "white", borderRadius: 28, padding: 20, border: "1.5px solid #FCA5A5", boxShadow: "0 2px 8px rgba(220,38,38,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span className="material-symbols-outlined" style={{ color: "#DC2626", fontSize: 18 }}>local_fire_department</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Essentials Daily Limit</span>
            </div>
            <div className="font-mono" style={{ fontSize: 30, fontWeight: 800, color: "#7F1D1D" }}>
              {currency} {fmt ? fmt(dailyEssentialBurnRate) : dailyEssentialBurnRate}
            </div>
            <p className="font-mono" style={{ fontSize: 12, color: "#991B1B", margin: "6px 0 0", fontWeight: 500 }}>
              Discretionary budgets locked at {currency} 0.00. Savings target ({savingsTarget}%) paused.
            </p>
          </div>

          {/* Payment Priority Plan */}
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 800, color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px 4px" }}>
              Payment Priority Plan
            </h2>

            {/* Pay First Section */}
            <section id="emergency-pay-first" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: "#DC2626", fontSize: 18 }}>priority_high</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#7F1D1D" }}>Pay First ({payFirst.length})</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {payFirst.length === 0 ? (
                  <div style={{ background: "white", padding: 14, borderRadius: 16, fontSize: 13, color: "#64748B" }}>No urgent items in Pay First.</div>
                ) : (
                  payFirst.map(item => (
                    <div key={item.id} style={{ background: "white", borderRadius: 20, padding: 16, border: "1px solid #FEE2E2", boxShadow: "0 2px 6px rgba(0,0,0,0.03)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{item.name}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "#FEE2E2", color: "#DC2626" }}>{item.type}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{item.due}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="font-mono" style={{ fontSize: 15, fontWeight: 800, color: "#7F1D1D" }}>{currency} {fmt ? fmt(item.amount) : item.amount}</span>
                        {item.lateFee > 0 && <p className="font-mono" style={{ fontSize: 11, color: "#DC2626", margin: "2px 0 0" }}>Late fee: {currency} {item.lateFee}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Can Hold Section */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ color: "#D97706", fontSize: 18 }}>pause_circle</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>Can Hold / Defer ({canHold.length})</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {canHold.length === 0 ? (
                  <div style={{ background: "white", padding: 14, borderRadius: 16, fontSize: 13, color: "#64748B" }}>No deferrable items.</div>
                ) : (
                  canHold.map(item => (
                    <div key={item.id} style={{ background: "white", borderRadius: 20, padding: 16, border: "1px solid #FEF3C7", boxShadow: "0 2px 6px rgba(0,0,0,0.03)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{item.name}</span>
                          {item.hardshipAvailable && (
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "#FEF3C7", color: "#B45309" }}>Hardship Eligible</span>
                          )}
                        </div>
                        <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{item.due}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="font-mono" style={{ fontSize: 15, fontWeight: 800, color: "#B45309" }}>{currency} {fmt ? fmt(item.amount) : item.amount}</span>
                        {item.hardshipAvailable && <p style={{ fontSize: 11, color: "#059669", margin: "2px 0 0" }}>Deferment ready</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Provider Hardship Support */}
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 800, color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px 4px" }}>
              Provider Hardship Options
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(HARDSHIP_INFO).map(([provider, info]) => (
                <div key={provider} style={{ background: "white", borderRadius: 20, padding: 16, border: "1px solid #FEE2E2" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#7F1D1D", margin: "0 0 4px" }}>{provider}</p>
                  <p style={{ fontSize: 12, color: "#991B1B", margin: "0 0 8px", lineHeight: 1.4 }}>{info.desc}</p>
                  <a href={info.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    Contact Deferment Program <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

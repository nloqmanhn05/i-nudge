import { useState } from "react";

export default function BudgetCoach({
  onBack, currency, monthlyIncome, fixedBills, savingsTarget,
  loggedSpending, onLogSpending, setLoggedSpending, cycleStartDay,
  dailyBudget, remainingToday, pctToday, coachStatusColor, coachStatusText,
  bnplDueThisCycle, daysLeft, fmt, isTab,
  simulatedBnplItems = [],
  showToast,
}) {
  const [newLogAmount, setNewLogAmount] = useState("");
  const [newLogLabel, setNewLogLabel] = useState("");
  const [newLogCategory, setNewLogCategory] = useState("Food");
  const [showLogForm, setShowLogForm] = useState(false);
  const [showBnplBreakdown, setShowBnplBreakdown] = useState(false);

  // Add Income FAB state
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeLabel, setIncomeLabel] = useState("");

  const CAT_OPTIONS = [
    { id: "Food", icon: "restaurant", color: "#F59E0B" },
    { id: "Transport", icon: "directions_car", color: "#3B82F6" },
    { id: "Shopping", icon: "shopping_bag", color: "#EC4899" },
    { id: "Coffee", icon: "local_cafe", color: "#8B5CF6" },
    { id: "Entertainment", icon: "movie", color: "#14B8A6" },
    { id: "Other", icon: "category", color: "#64748B" }
  ];

  const handleAddLog = () => {
    const amt = parseFloat(newLogAmount);
    if (!newLogLabel.trim() || isNaN(amt) || amt <= 0) return;
    const newEntry = {
      id: Date.now(),
      label: newLogLabel.trim(),
      amount: amt,           // Always positive
      type: "expense",       // Explicit transaction type
      category: newLogCategory,
      date: new Date().toISOString()
    };
    onLogSpending(newEntry);
    setNewLogLabel("");
    setNewLogAmount("");
    setShowLogForm(false);
    showToast?.(`Logged ${newEntry.label} (${currency} ${fmt ? fmt(amt) : amt})`, "success");
  };

  const handleDeleteLog = (logToDelete) => {
    if (setLoggedSpending) {
      setLoggedSpending(prev => prev.filter(l => l.id !== logToDelete.id));
      showToast?.(
        `Deleted ${logToDelete.label} (${currency} ${fmt ? fmt(logToDelete.amount) : logToDelete.amount})`,
        "warning",
        true,
        () => setLoggedSpending(prev => [logToDelete, ...prev])
      );
    }
  };

  const handleAddIncome = () => {
    const amt = parseFloat(incomeAmount);
    if (!incomeLabel.trim() || isNaN(amt) || amt <= 0) return;
    const newEntry = {
      id: Date.now(),
      label: incomeLabel.trim(),
      amount: amt,           // Always positive!
      type: "income",        // Explicit transaction type
      category: "Income",
      date: new Date().toISOString()
    };
    onLogSpending(newEntry);
    setIncomeLabel("");
    setIncomeAmount("");
    setShowIncomeForm(false);
    showToast?.(`Added ${newEntry.label} (+${currency} ${fmt ? fmt(amt) : amt}) to income`, "success");
  };

  const fixedTotal = fixedBills ? fixedBills.reduce((s, b) => s + b.amount, 0) : 0;
  const savingsAmt = (monthlyIncome * savingsTarget) / 100;
  const pool = monthlyIncome - fixedTotal - bnplDueThisCycle - savingsAmt;

  const getCatColor = (cat) => cat === "Income" ? "#22C55E" : (CAT_OPTIONS.find(c => c.id === cat)?.color || "#64748B");
  const getCatIcon = (cat) => cat === "Income" ? "savings" : (CAT_OPTIONS.find(c => c.id === cat)?.icon || "category");

  const today = new Date();
  const todayLogs = (loggedSpending || []).filter(log => new Date(log.date).toDateString() === today.toDateString());

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "transparent", fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "52px 16px 16px",
        background: "transparent",
        flexShrink: 0,
      }}>
        {!isTab && onBack ? (
          <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#0F172A" }}>arrow_back</span>
          </button>
        ) : (
          <div style={{ width: 40, height: 40 }} />
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, flex: 1, textAlign: "center", letterSpacing: "-0.02em" }}>
          Budget Coach
        </h1>
        <div style={{ width: 40, height: 40 }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 112px" }}>

        {/* Hero Daily Limit Card */}
        <div id="daily-limit" style={{
          background: `linear-gradient(135deg, ${coachStatusColor}11 0%, ${coachStatusColor}22 100%)`,
          borderRadius: 28, padding: 24,
          display: "flex", alignItems: "center", gap: 20,
          marginBottom: 20,
        }}>
          <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
            <svg width="90" height="90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F1F5F9" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={coachStatusColor} strokeWidth="3" strokeDasharray={`${Math.min(100, pctToday)}, 100`} />
            </svg>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="font-mono" style={{ fontSize: 20, fontWeight: 800, color: coachStatusColor }}>{Math.round(pctToday)}%</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Remaining Today</p>
            <p className="font-mono" style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.03em" }}>{currency} {fmt ? fmt(remainingToday) : remainingToday}</p>
            <p className="font-mono" style={{ fontSize: 14, color: "#64748B", margin: "4px 0 0" }}>of {currency} {fmt ? fmt(dailyBudget) : dailyBudget} daily budget</p>
          </div>
        </div>

        {/* Breakdown */}
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 16px" }}>Monthly Plan</h3>
        <div style={{ background: "white", borderRadius: 28, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.03)", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Income</span>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 800, color: "#22C55E" }}>{currency} {fmt ? fmt(monthlyIncome) : monthlyIncome}</span>
          </div>
          <div style={{ height: 1, background: "#F1F5F9", margin: "12px 0" }} />
          {[
            { label: "Fixed Bills", amount: fixedTotal, color: "#3B82F6", pct: (fixedTotal / monthlyIncome) * 100 },
            { label: "BNPL Due", amount: bnplDueThisCycle, color: "#EF4444", pct: (bnplDueThisCycle / monthlyIncome) * 100 },
            { label: "Savings Target", amount: savingsAmt, color: "#8B5CF6", pct: (savingsAmt / monthlyIncome) * 100 },
            { label: "Daily Pool", amount: pool, color: pool < 300 ? "#EF4444" : "#F59E0B", pct: (pool / monthlyIncome) * 100 }
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "#64748B", fontWeight: 500 }}>{row.label}</span>
                <span className="font-mono" style={{ color: row.label === "Daily Pool" && pool < 300 ? "#EF4444" : "#0F172A", fontWeight: 700 }}>{currency} {fmt ? fmt(row.amount) : row.amount}</span>
              </div>
              <div style={{ height: 6, background: "#F1F5F9", borderRadius: 999 }}>
                <div style={{ height: "100%", width: `${Math.min(100, row.pct)}%`, background: row.color, borderRadius: 999 }} />
              </div>

              {/* ── BNPL Breakdown: simulated purchases ── */}
              {row.label === "BNPL Due" && simulatedBnplItems.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => setShowBnplBreakdown(p => !p)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10,
                      padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700,
                      color: "#EF4444", transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>receipt_long</span>
                    {simulatedBnplItems.length} simulated purchase{simulatedBnplItems.length > 1 ? "s" : ""}
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      {showBnplBreakdown ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {showBnplBreakdown && (
                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, animation: "fadeSlideUp 0.2s ease both" }}>
                      {simulatedBnplItems.map(item => (
                        <div key={item.id} style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          background: "#FEF2F2", borderRadius: 12,
                          padding: "10px 12px", border: "1px solid rgba(239,68,68,0.15)",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: "rgba(239,68,68,0.12)",
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#EF4444", fontVariationSettings: "'FILL' 1" }}>payments</span>
                            </div>
                            <div>
                              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{item.name}</p>
                              <p style={{ margin: 0, fontSize: 11, color: "#94A3B8" }}>
                                {item.provider} · {item.duration}mo · {new Date(item.date).toLocaleDateString("en-MY", { day: "numeric", month: "short" })}
                              </p>
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p className="font-mono" style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "#EF4444" }}>−{currency} {fmt ? fmt(item.monthlyPay) : item.monthlyPay}</p>
                            <p style={{ margin: 0, fontSize: 10, color: "#94A3B8", fontWeight: 500 }}>per month</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Pool Warning: below minimum ── */}
              {row.label === "Daily Pool" && pool < 300 && (
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: "rgba(239,68,68,0.06)", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#EF4444", fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#EF4444" }}>
                    Pool below {currency} 300 minimum — new transactions are blocked
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coach Insights */}
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 16px" }}>Coach Insights</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#EEF2FF", borderRadius: 24, padding: 16, display: "flex", gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: "#4F6EF7", fontSize: 24 }}>tips_and_updates</span>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#1E3A8A" }}>BNPL Factor</p>
              <p className="font-mono" style={{ margin: 0, fontSize: 13, color: "#3B82F6", lineHeight: 1.5 }}>Your {currency} {fmt ? fmt(bnplDueThisCycle) : bnplDueThisCycle} BNPL installments are already deducted. You're safe to spend your daily pool.</p>
            </div>
          </div>
          <div style={{ background: "#FFFBEB", borderRadius: 24, padding: 16, display: "flex", gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: "#D97706", fontSize: 24 }}>insights</span>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#92400E" }}>Pacing Well</p>
              <p className="font-mono" style={{ margin: 0, fontSize: 13, color: "#D97706", lineHeight: 1.5 }}>You have {daysLeft} days left in this cycle. Keeping under {currency} {fmt ? fmt(dailyBudget) : dailyBudget}/day will meet your {savingsTarget}% savings goal.</p>
            </div>
          </div>
        </div>

        {/* Today's Log */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>Today's Spending</h3>
          <button onClick={() => setShowLogForm(!showLogForm)} style={{ display: "flex", alignItems: "center", gap: 4, background: "#F59E0B", color: "white", border: "none", padding: "6px 12px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{showLogForm ? "close" : "add"}</span>
            Log
          </button>
        </div>

        {showLogForm && (
          <div style={{ background: "white", borderRadius: 28, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 16, animation: "fadeSlideUp 0.25s ease both" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: "0 0 12px" }}>Log a Purchase</p>
            <input
              value={newLogLabel}
              onChange={e => setNewLogLabel(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleAddLog(); }}
              placeholder="What did you buy?"
              style={{ width: "100%", height: 44, border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "0 14px", fontSize: 14, outline: "none", fontFamily: "inherit", color: "#0F172A", background: "#F8FAFC", marginBottom: 10, boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <input
                value={newLogAmount}
                onChange={e => setNewLogAmount(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleAddLog(); }}
                placeholder="Amount"
                type="number"
                style={{ flex: 1, height: 44, border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "0 14px", fontSize: 14, outline: "none", fontFamily: "inherit", color: "#0F172A", background: "#F8FAFC", boxSizing: "border-box" }}
              />
              <select
                value={newLogCategory}
                onChange={e => setNewLogCategory(e.target.value)}
                style={{ flex: 1, height: 44, border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "0 14px", fontSize: 14, outline: "none", fontFamily: "inherit", color: "#0F172A", background: "#F8FAFC", boxSizing: "border-box" }}
              >
                {CAT_OPTIONS.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
              </select>
            </div>
            <button onClick={handleAddLog} style={{ width: "100%", height: 44, background: "#0F172A", color: "white", border: "none", borderRadius: 18, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Save & Recalculate (Enter)
            </button>
          </div>
        )}

        {todayLogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 20px", background: "white", borderRadius: 28, border: "1px dashed #CBD5E1" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#94A3B8", marginBottom: 8 }}>receipt_long</span>
            <p style={{ margin: 0, fontSize: 14, color: "#64748B" }}>No spending logged today.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {todayLogs.map(log => {
              const isIncome = log.type === "income" || log.category === "Income";
              return (
                <div key={log.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", padding: "14px 16px", borderRadius: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${getCatColor(log.category)}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: getCatColor(log.category), fontVariationSettings: "'FILL' 1" }}>{getCatIcon(log.category)}</span>
                    </div>
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{log.label}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{log.category}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="font-mono" style={{ fontSize: 15, fontWeight: 700, color: isIncome ? "#22C55E" : "#0F172A" }}>
                      {isIncome ? "+" : "-"}{currency} {fmt ? fmt(Math.abs(log.amount)) : Math.abs(log.amount)}
                    </span>
                    <button
                      onClick={() => handleDeleteLog(log)}
                      title="Delete log"
                      style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer", padding: "4px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Blur Backdrop + Form (single inset container) ───────────── */}
      {showIncomeForm && (
        <div
          onClick={() => setShowIncomeForm(false)}
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            background: "rgba(15,23,42,0.38)",
            zIndex: 999,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 164,
            paddingLeft: 20,
            paddingRight: 20,
            boxSizing: "border-box",
            animation: "fadeSlideUp 0.2s ease both"
          }}
        >
          {/* Form card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              background: "white",
              borderRadius: 28,
              padding: 24,
              boxShadow: "0 16px 60px rgba(0,0,0,0.22)",
              zIndex: 1000,
              animation: "fadeSlideUp 0.25s ease both"
            }}
          >
            {/* Form header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, #59f425 0%, #3dd117 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(89,244,37,0.4)"
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#0a2200", fontVariationSettings: "'FILL' 1" }}>savings</span>
                </div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Add Income</p>
              </div>
              <button
                onClick={() => setShowIncomeForm(false)}
                style={{ background: "#F1F5F9", border: "none", cursor: "pointer", padding: 6, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#64748B" }}>close</span>
              </button>
            </div>

            {/* Inputs */}
            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Income Source</p>
            <input
              value={incomeLabel}
              onChange={e => setIncomeLabel(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleAddIncome(); }}
              placeholder="e.g. Salary, Freelance..."
              style={{
                width: "100%", height: 48, border: "1.5px solid #E2E8F0",
                borderRadius: 16, padding: "0 16px", fontSize: 14,
                outline: "none", fontFamily: "inherit", color: "#0F172A",
                background: "#F8FAFC", marginBottom: 14, boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "var(--color-brand-accent, #22c55e)"}
              onBlur={e => e.target.style.borderColor = "#E2E8F0"}
            />
            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount</p>
            <input
              value={incomeAmount}
              onChange={e => setIncomeAmount(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleAddIncome(); }}
              placeholder="0.00"
              type="number"
              style={{
                width: "100%", height: 48, border: "1.5px solid #E2E8F0",
                borderRadius: 16, padding: "0 16px", fontSize: 18, fontWeight: 700,
                outline: "none", fontFamily: "inherit", color: "#0F172A",
                background: "#F8FAFC", marginBottom: 20, boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "var(--color-brand-accent, #22c55e)"}
              onBlur={e => e.target.style.borderColor = "#E2E8F0"}
            />
            <button
              onClick={handleAddIncome}
              style={{
                width: "100%", height: 50,
                background: "linear-gradient(135deg, #13ecc8 0%, #22c55e 100%)",
                color: "#0a2200", border: "none", borderRadius: 18,
                fontSize: 15, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 6px 20px rgba(19,236,200,0.35)",
                letterSpacing: "-0.01em"
              }}
            >
              Save Income (Enter)
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Action Button ─────────────────────────────────── */}
      <button
        id="fab-add-income"
        onClick={() => setShowIncomeForm(prev => !prev)}
        style={{
          position: "absolute",
          bottom: 90,
          right: 20,
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: showIncomeForm
            ? "#0F172A"
            : "linear-gradient(135deg, #59f425 0%, #3dd117 100%)",
          border: "none",
          boxShadow: showIncomeForm
            ? "0 6px 24px rgba(0,0,0,0.35)"
            : "0 6px 24px rgba(89,244,37,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1001,
          transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          transform: showIncomeForm ? "rotate(45deg) scale(1.05)" : "scale(1)"
        }}
        title="Add Income"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 26,
            color: showIncomeForm ? "white" : "#0a2200",
            fontVariationSettings: "'FILL' 1"
          }}
        >
          add
        </span>
      </button>
    </div>
  );
}
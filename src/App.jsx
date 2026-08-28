import { useState, useEffect, useRef } from "react";
// IDE Refresh
import AppShell from "./components/layout/AppShell";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import Simulation from "./pages/Simulation";
import Profile from "./pages/Profile";
import BudgetCoach from "./pages/BudgetCoach";
import { DEBT_STACK, TOUR_STEPS } from "./data/mockData";

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const activeCurrency = "RM";
  const [activeUserName, setActiveUserName] = useState("Hakim");
  const [activeTab, setActiveTab] = useState("home");
  const [dangerMode, setDangerMode] = useState(false);
  const [simScreen, setSimScreen] = useState("form");

  // Emergency Mode State
  const [liquidCash, setLiquidCash] = useState(1240.50);
  const [emergencyAcknowledged, setEmergencyAcknowledged] = useState(() => {
    try {
      return localStorage.getItem("nudge_emergency_acknowledged") === "true";
    } catch {
      return false;
    }
  });

  // Tour State
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    try { return localStorage.getItem("nudge_has_seen_tour") === "true"; }
    catch { return false; }
  });
  const [tourActive, setTourActive] = useState(false);
  const [tourMandatory, setTourMandatory] = useState(true);
  const [tourPageIndex, setTourPageIndex] = useState(0);
  const [tourElemIndex, setTourElemIndex] = useState(0);

  const handleTourNext = () => {
    const step = TOUR_STEPS[tourPageIndex];
    if (tourElemIndex < step.elements.length - 1) {
      setTourElemIndex(tourElemIndex + 1);
    } else {
      const nextPageIndex = tourPageIndex + 1;
      setTourPageIndex(nextPageIndex);
      setTourElemIndex(0);
      setActiveTab(TOUR_STEPS[nextPageIndex].route);
    }
  };

  const handleTourDone = () => {
    setHasSeenTour(true);
    localStorage.setItem("nudge_has_seen_tour", "true");
    setTourActive(false);
    setActiveTab("home");
  };

  const handleTourClose = () => {
    setTourActive(false);
    setTourPageIndex(0);
    setTourElemIndex(0);
  };

  const prevTriggeredRef = useRef(false);

  // Coach State
  const [monthlyIncome, setMonthlyIncome] = useState(3200);
  const [fixedBills, setFixedBills] = useState([
    { id: 1, label: "Rent", amount: 850, icon: "home", daysUntilDue: 3, isEssential: true },
    { id: 2, label: "Utilities", amount: 180, icon: "water_drop", daysUntilDue: 8, isEssential: true },
    { id: 3, label: "Food", amount: 600, icon: "restaurant", daysUntilDue: 1, isEssential: true },
  ]);
  const [savingsTarget, setSavingsTarget] = useState(10);
  const [loggedSpending, setLoggedSpending] = useState([]);
  const [cycleStartDay, setCycleStartDay] = useState(28);

  // Simulation BNPL tracker — purchases confirmed in Simulation Page
  const [simulatedBnplItems, setSimulatedBnplItems] = useState([]);

  // Toast / Feedback State (Shneiderman Rule 3: Feedback & Rule 6: Undo)
  const [toast, setToast] = useState(null);
  const undoActionRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = "success", canUndo = false, undoAction = null) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    undoActionRef.current = undoAction;
    setToast({ message, type, canUndo });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      undoActionRef.current = null;
    }, 4500);
  };

  const handleUndo = () => {
    if (undoActionRef.current) {
      undoActionRef.current();
      showToast("Action undone successfully", "success", false, null);
    }
  };

  const handleProceed = () => {
    setDangerMode(true);
    setActiveTab("home");
    showToast("High-risk purchase recorded. Danger mode active.", "warning");
  };

  const handleExitDangerMode = () => {
    setDangerMode(false);
    showToast("Danger mode deactivated. Returned to safe balance.", "success");
  };

  const handlePostpone = () => {
    setActiveTab("home");
    showToast("Purchase postponed. Your balance remains protected.", "success");
  };

  // Called when user confirms a BNPL purchase in Simulation
  const handleConfirmPurchase = ({ name, amount: purchaseAmt, monthlyPay, provider, duration }) => {
    const newItem = { id: Date.now(), name, amount: purchaseAmt, monthlyPay, provider, duration, date: new Date().toISOString() };
    setSimulatedBnplItems(prev => [...prev, newItem]);
    showToast(`Added ${name} (${activeCurrency} ${monthlyPay}/mo) to BNPL tracking.`, "success");
    setActiveTab("home");
  };

  // Same as above but also sets danger mode (high-risk path)
  const handleConfirmPurchaseHighRisk = (details) => {
    if (details) handleConfirmPurchase(details);
    setDangerMode(true);
    showToast("High impact purchase added. Danger mode activated.", "danger");
    setActiveTab("home");
  };

  // ── LOGICAL BUDGET & INCOME CALCULATIONS ────────────────────────────────

  // 1. Calculate dynamically logged extra income from transactions
  const totalLoggedIncome = loggedSpending
    .filter(log => log.type === "income" || log.category === "Income")
    .reduce((sum, log) => sum + log.amount, 0);

  // 2. Total active income (Base + Dynamically Added Income)
  const totalIncome = monthlyIncome + totalLoggedIncome;

  // 3. Fixed Bills & Savings Allocation based on Total Income
  const staticBnpl = DEBT_STACK.reduce((s, d) => s + d.amount, 0);
  const simulatedBnplTotal = simulatedBnplItems.reduce((s, i) => s + i.monthlyPay, 0);
  const bnplDueThisCycle = staticBnpl + simulatedBnplTotal;
  const fixedTotal = fixedBills.reduce((s, b) => s + b.amount, 0);
  const savingsAmt = (totalIncome * savingsTarget) / 100;

  // 4. Emergency Mode Trigger calculations reflecting Total Income
  const availableIncome = totalIncome - fixedTotal;
  const shortfall = bnplDueThisCycle - availableIncome;
  const dailyEssentialBurnRate = fixedTotal / 30;
  const survivalScoreDays = liquidCash / (dailyEssentialBurnRate || 1);
  const isEmergencyTriggered = (shortfall > 0 || survivalScoreDays < 30);

  useEffect(() => {
    if (isEmergencyTriggered && !prevTriggeredRef.current) {
      setEmergencyAcknowledged(false);
      try { localStorage.setItem("nudge_emergency_acknowledged", "false"); } catch { }
    }
    prevTriggeredRef.current = isEmergencyTriggered;
  }, [isEmergencyTriggered]);

  const handleAcknowledgeEmergency = () => {
    setEmergencyAcknowledged(true);
    try { localStorage.setItem("nudge_emergency_acknowledged", "true"); } catch { }
  };

  const showEmergencyBadge = isEmergencyTriggered && !emergencyAcknowledged;

  // 5. Days left in cycle
  const today = new Date();
  let nextPayday = new Date(today.getFullYear(), today.getMonth(), cycleStartDay);
  if (today.getDate() >= cycleStartDay) {
    nextPayday.setMonth(nextPayday.getMonth() + 1);
  }
  const daysLeft = Math.max(1, Math.ceil((nextPayday - today) / (1000 * 60 * 60 * 24)));

  // 6. Expense & Daily Budget Logic
  const expenseTotal = loggedSpending
    .filter(log => log.type !== "income" && log.category !== "Income")
    .reduce((s, log) => s + log.amount, 0);

  // Pool calculated using Total Income
  const dailyPoolMonthly = totalIncome - fixedTotal - bnplDueThisCycle - savingsAmt;
  const remainingPool = dailyPoolMonthly - expenseTotal;
  const dailyBudget = Math.max(0, remainingPool / daysLeft);

  const spentToday = loggedSpending
    .filter(log => new Date(log.date).toDateString() === today.toDateString())
    .filter(log => log.type !== "income" && log.category !== "Income")
    .reduce((s, log) => s + log.amount, 0);

  const remainingToday = dailyBudget - spentToday;
  const pctToday = dailyBudget > 0 ? (spentToday / dailyBudget) * 100 : (spentToday > 0 ? 100 : 0);

  let coachStatusColor = "#22C55E";
  let coachStatusText = "On Track";
  if (pctToday > 90) { coachStatusColor = "#EF4444"; coachStatusText = "Over"; }
  else if (pctToday > 60) { coachStatusColor = "#F59E0B"; coachStatusText = "Tight"; }

  const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Shared props bundles
  const coachProps = {
    currency: activeCurrency,
    monthlyIncome: totalIncome, // Pass total income to Coach for consistent UI display
    fixedBills, setFixedBills, savingsTarget,
    loggedSpending, onLogSpending: (s) => setLoggedSpending(prev => [s, ...prev]),
    setLoggedSpending,
    cycleStartDay, dailyBudget, remainingToday, pctToday,
    coachStatusColor, coachStatusText, bnplDueThisCycle, daysLeft, fmt,
    simulatedBnplItems, // tracked simulation purchases for BudgetCoach breakdown
    showToast,
  };

  // Spending % based on total available income
  const spentPct = totalIncome > 0 ? (expenseTotal / totalIncome) * 100 : 0;

  const profileProps = {
    danger: dangerMode,
    currency: activeCurrency,
    userName: activeUserName,
    monthlyIncome: totalIncome,
    spentTotal: expenseTotal,
    spentPct,
    onReplayTour: () => {
      setTourActive(true);
      setTourMandatory(false);
      setTourPageIndex(0);
      setTourElemIndex(0);
      setActiveTab(TOUR_STEPS[0].route);
    }
  };

  const renderContent = () => {
    if (!onboarded) {
      return (
        <OnboardingFlow onComplete={(_cur, name) => {
          setActiveUserName(name);
          setOnboarded(true);
          setTourActive(true);
          setTourMandatory(true);
        }} />
      );
    }

    switch (activeTab) {
      case "emergency":
        return (
          <Emergency
            emergencyTriggered={isEmergencyTriggered}
            emergencyAcknowledged={emergencyAcknowledged}
            onAcknowledge={handleAcknowledgeEmergency}
            shortfall={shortfall}
            survivalScoreDays={survivalScoreDays}
            bnplDueThisCycle={bnplDueThisCycle}
            availableIncome={availableIncome}
            currency={activeCurrency}
            fmt={fmt}
            bnplDebts={DEBT_STACK}
            fixedBills={fixedBills}
            dailyEssentialBurnRate={dailyEssentialBurnRate}
            savingsTarget={savingsTarget}
          />
        );
      case "simulation":
        return (
          <Simulation
            onBack={() => setActiveTab("home")}
            onPostpone={handlePostpone}
            onProceed={handleConfirmPurchaseHighRisk}
            currency={activeCurrency}
            onScreenChange={setSimScreen}
            monthlyIncome={totalIncome}
            fixedBills={fixedBills}
            bnplDueThisCycle={bnplDueThisCycle}
            savingsTarget={savingsTarget}
            onConfirmPurchase={handleConfirmPurchase}
          />
        );
      case "profile":
        return (
          <Profile
            coachProps={coachProps}
            profileProps={profileProps}
          />
        );
      case "coach":
        return (
          <BudgetCoach
            {...coachProps}
            isTab
          />
        );
      case "home":
      default:
        return (
          <Home
            dangerMode={dangerMode}
            onExitDangerMode={handleExitDangerMode}
            activeCurrency={activeCurrency}
            remainingToday={remainingToday}
            coachStatusColor={coachStatusColor}
            pctToday={pctToday}
            fmt={fmt}
            onNavigate={setActiveTab}
            disabled={tourActive && tourMandatory}
          />
        );
    }
  };

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showEmergencyBadge={showEmergencyBadge}
      dangerMode={dangerMode}
      onboarded={onboarded}
      hideBottomNav={activeTab === 'simulation' && simScreen !== 'form'}
      tourActive={tourActive}
      tourMandatory={tourMandatory}
      tourPageIndex={tourPageIndex}
      tourElemIndex={tourElemIndex}
      onTourNext={handleTourNext}
      onTourDone={handleTourDone}
      onTourClose={handleTourClose}
      toast={toast}
      onUndo={handleUndo}
    >
      {renderContent()}
    </AppShell>
  );
}
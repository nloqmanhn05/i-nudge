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

  const handleProceed = () => {
    setDangerMode(true);
    setActiveTab("home");
  };

  const handlePostpone = () => {
    setActiveTab("home");
  };

  // Budget Coach Calcs
  const bnplDueThisCycle = DEBT_STACK.reduce((s, d) => s + d.amount, 0);
  const fixedTotal = fixedBills.reduce((s, b) => s + b.amount, 0);
  const savingsAmt = (monthlyIncome * savingsTarget) / 100;

  // Emergency Mode Trigger
  const availableIncome = monthlyIncome - fixedTotal;
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

  const today = new Date();
  let nextPayday = new Date(today.getFullYear(), today.getMonth(), cycleStartDay);
  if (today.getDate() >= cycleStartDay) {
    nextPayday.setMonth(nextPayday.getMonth() + 1);
  }
  const daysLeft = Math.max(1, Math.ceil((nextPayday - today) / (1000 * 60 * 60 * 24)));

  const spentTotal = loggedSpending.reduce((s, log) => s + log.amount, 0);
  const dailyPoolMonthly = monthlyIncome - fixedTotal - bnplDueThisCycle - savingsAmt;
  const remainingPool = dailyPoolMonthly - spentTotal;
  const dailyBudget = Math.max(0, remainingPool / daysLeft);

  const spentToday = loggedSpending
    .filter(log => new Date(log.date).toDateString() === today.toDateString())
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
    monthlyIncome, fixedBills, savingsTarget,
    loggedSpending, onLogSpending: (s) => setLoggedSpending(prev => [s, ...prev]),
    cycleStartDay, dailyBudget, remainingToday, pctToday,
    coachStatusColor, coachStatusText, bnplDueThisCycle, daysLeft, fmt
  };

  const profileProps = {
    danger: dangerMode,
    currency: activeCurrency,
    userName: activeUserName,
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
            onProceed={handleProceed}
            currency={activeCurrency}
            onScreenChange={setSimScreen}
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
    >
      {renderContent()}
    </AppShell>
  );
}

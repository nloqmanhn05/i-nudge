export const DEBT_STACK = [
  {
    id: 1,
    name: "Grab PayLater",
    due: "Due in 5 days",
    daysUntilDue: 5,
    amount: 320.0,
    used: 45,
    limit: 1000,
    color: "#00B14F",
    bg: "#00B14F1A",
    icon: "local_shipping",
    lateFee: 10,
    hardshipAvailable: true,
    provider: "Grab",
    cycle: "Current"
  },
  {
    id: 2,
    name: "Shopee SPayLater",
    due: "Due in 12 days",
    daysUntilDue: 12,
    amount: 150.0,
    used: 15,
    limit: 1000,
    color: "#EE4D2D",
    bg: "#EE4D2D1A",
    icon: "shopping_bag",
    lateFee: 5,
    hardshipAvailable: true,
    provider: "Shopee",
    cycle: "Current"
  },
  {
    id: 3,
    name: "Atome",
    due: "No active bills",
    daysUntilDue: 30,
    amount: 0.0,
    used: 0,
    limit: 500,
    color: "#EAB308",
    bg: "#FEF08A33",
    icon: "credit_score",
    iconColor: "#854D0E",
    lateFee: 15,
    hardshipAvailable: true,
    provider: "Atome",
    cycle: "Current"
  },
];

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "coach", label: "Coach", icon: "insights" },
  { id: "simulation", label: "Simulation", icon: "play_circle" },
  { id: "emergency", label: "Emergency", icon: "emergency" },
  { id: "profile", label: "Profile", icon: "person" },
];

export const TOUR_STEPS = [
  {
    route: 'home',
    pageTitle: 'Dashboard',
    elements: [
      { target: '#liquidity-card', title: 'Liquidity Remaining', description: 'Shows your current available liquid cash to survive the month.' },
      { target: '#debt-stack', title: 'Shadow Debt Stack', description: 'All your active BNPL installments tracked in one place.' },
      { target: '#simulate-cta', title: 'Simulate a Purchase', description: 'Tap here to see the real cost before you commit to buying something.' }
    ]
  },
  {
    route: 'emergency',
    pageTitle: 'Emergency Mode',
    elements: [
      { target: '#emergency-pay-first', title: 'Payment Priority', description: 'If money gets tight, this shows what you must pay first vs what can hold.' }
    ]
  },
  {
    route: 'simulation',
    pageTitle: 'Purchase Simulation',
    elements: [
      { target: '#simulate-amount-input', title: 'Enter Price', description: 'Type the cost of an item you want to buy.' },
      { target: '#simulate-proceed-btn', title: 'Friction Check', description: 'We will show you the true cost in work-hours before you checkout.' }
    ]
  },
  {
    route: 'coach',
    pageTitle: 'Budget Coach',
    elements: [
      { target: '#daily-limit', title: 'Daily Spending Limit', description: 'Recalculates automatically based on your bills, income, and BNPL debts.' }
    ]
  }
];

export const HARDSHIP_INFO = {
  "Grab": { desc: "Request Grab PayLater installment deferment or extension.", url: "https://www.grab.com" },
  "Shopee": { desc: "Apply for SPayLater restructuring program via in-app help center.", url: "https://shopee.com" },
  "Atome": { desc: "Contact Atome customer support for flexible installment deferral.", url: "https://www.atome.my" }
};

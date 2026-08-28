# 🛡️ Nudge : Your BNPL Guardian Angel

> **SDG 1 : No Poverty | SDG 8 : Decent Work & Economic Growth**

A financial wellness app that consolidates Buy Now Pay Later (BNPL) debt across platforms, simulates purchase impact, and nudges users toward healthier spending habits — built for Southeast Asia.

---

## 👥 Team Members

| Name | Role |
|------|------|
| Hakim | Lead Developer / UI UX Designer / Quality Assurance Testing |
| Kareem | Co Lead Developer / Quality Assurance Testing |
| Nabil | Backend Developer |
| Shuhada | Report Documentation |
| Tasneem | Video Documentation |

---

## 📋 Project Summary

Millions of users in Southeast Asia juggle multiple BNPL platforms — Grab PayLater, Shopee SPayLater, Atome — simultaneously, with no single tool to track their total debt exposure. **Nudge** acts as a personal Guardian Angel that:

- 📊 Consolidates all BNPL debts into one dashboard
- ⚡ Simulates the impact of new purchases before you commit
- 🚨 Warns users with a real-time ECG-style financial health indicator
- 💱 Supports 10 ASEAN currencies (MYR, SGD, IDR, THB, PHP, VND & more)
- 🎯 Promotes savings-first behaviour through a Wishlist feature


## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + Inline Styles |
| Language | JavaScript (JSX) + Html |
| Fonts | Inter, Google Sans, Material Symbols |
| Build Tool | Vite |
| Design Tool | Stitch (Google) + Google AI Studio|

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

You must **ZOOM OUT** everytime you want to try our app and see our prototype 
```bash
# 1. Clone the repository
git clone https://github.com/nloqmanhn05/Nudge

# 2. Navigate into the project folder
cd Nudge

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The app will be available at  after running. 

---

## 📱 Key Features

### 🏠 Home Dashboard
Real-time balance display with an animated ECG health wave. Switches between **Safe State** (teal) and **Danger Mode** (red) based on your financial health. Shows your full BNPL Shadow Debt Stack.

### 💳 BNPL Debt Tracker
Tracks multiple BNPL providers (Grab PayLater, Shopee SPayLater, Atome) with progress bars, credit utilisation percentages, and due date countdowns.

### 🧪 Purchase Simulation
Enter any item and BNPL provider — Nudge calculates the monthly commitment and shows a **Guardian Tip** advising whether you can afford it. Leads into a full Risk Analysis screen.

### ⚠️ Friction Screen
If you proceed despite a high-risk warning, Nudge shows the **"Financial Shackles"** screen — including a work-hours cost calculator and an accountability checkbox — to make you think twice.

### 🌏 ASEAN Multi-Currency
Supports MYR, SGD, IDR, THB, PHP, VND, MMK, KHR, LAK, and BND. Set during onboarding and adjustable anytime in your profile.

### 🎯 Future Wishlist
Add savings goals (e.g. MacBook Air M4, Weekend Getaway) and track progress — promoting save-first behaviour instead of impulsive BNPL purchases.

### 👤 Guardian Hub (Profile)
Personalised with your name from onboarding. Manage currency, security settings, connected BNPL providers, and bank sync.

---

## 📁 Project Structure

```
nudge-dashboard/
├── src/
│   ├── Dashboard.jsx      # Main single-file React application
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Dependencies
└── README.md              # This file
```

---

## 🤖 AI Disclosure

In accordance with competition guidelines, the following AI tools were used:

| Tool | Provider | Usage |
|------|----------|-------|
| **Claude (Sonnet 4.6)** | Anthropic | Help to generated React/Vite codebase (`Dashboard.jsx`); built and refined all UI components; implemented ASEAN multi-currency system; wired onboarding identity to profile; debugging; build verification; GitHub preparation |
| **Stitch** | Google | Designed UI layout, visual components, colour system, and overall aesthetic of the Nudge dashboard |
| **Gemini 3.1 Pro** | Google | Used for debugging and troubleshooting during development |
| **Google AI Studio** | Google | Used to help generate interactive and clickable prototype |

---

## 🌍 SDG Alignment

| SDG | How Nudge Contributes |
|-----|----------------------|
| **SDG 1 : No Poverty** | Helps users avoid BNPL debt traps that push low-income earners into financial distress |
| **SDG 8 :  Decent Work & Economic Growth** | Promotes financial literacy and responsible economic behaviour among young adults in Southeast Asia |

---

## 🔒 Privacy & Security

Nudge is built with a **privacy-first** approach:

- ✅ All financial data stored **locally on device only** — never transmitted to external servers
- ✅ No third-party advertising SDKs or data brokers
- ✅ Account numbers **masked by default** (e.g. ****5678)
- ✅ Minimal data collection — only what is needed to provide the service
- ✅ Designed in compliance with Malaysia's **Personal Data Protection Act (PDPA) 2010**

---

## 📄 License

This project was built for hackathon/competition purposes.

---

*Nudge — Built for Southeast Asia. Designed for financial freedom.* 🛡️

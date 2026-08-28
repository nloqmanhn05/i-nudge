import BottomNav from "./BottomNav";
import TourCard from "../ui/TourCard";

export default function AppShell({
    children,
    activeTab,
    onTabChange,
    showEmergencyBadge,
    dangerMode,
    onboarded,
    hideBottomNav,
    tourActive,
    tourMandatory,
    tourPageIndex,
    tourElemIndex,
    onTourNext,
    onTourDone,
    onTourClose,
}) {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&family=Google+Sans+Display:wght@400;500;700&family=Google+Sans+Text:wght@400;500;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .font-google-display { font-family: 'Google Sans Display', 'Inter', sans-serif; }
        .font-google-text    { font-family: 'Google Sans Text',    'Inter', sans-serif; }
        .font-mono           { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
        * {
          box-sizing: border-box;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        body {
          font-family: 'Inter', sans-serif;
          background: #c8e8e3;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal; font-size: 24px;
          line-height: 1; letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap;
          direction: ltr; -webkit-font-smoothing: antialiased;
        }
        @keyframes safe-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
        .safe-dot { animation: safe-pulse 2s ease-in-out infinite; }
        @keyframes notif-shake {
          0%,100% { transform: rotate(0deg); }
          20%      { transform: rotate(-12deg); }
          40%      { transform: rotate(12deg); }
          60%      { transform: rotate(-8deg); }
          80%      { transform: rotate(8deg); }
        }
        .notif-icon:hover { animation: notif-shake 0.5s ease; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* Phone Shell */}
            <div
                style={{
                    width: 430,
                    minWidth: 430,
                    maxWidth: "100%",
                    height: 884,
                    minHeight: 884,
                    maxHeight: "100vh",
                    background: !onboarded ? "#f6f7f8" : dangerMode ? "#fff5f5" : "#f6f8f8",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    borderRadius: "2.5rem",
                    boxShadow: dangerMode ? "0 48px 120px rgba(212,17,17,0.25)" : "0 48px 120px rgba(0,0,0,0.22)",
                    margin: "0 auto",
                    position: "relative",
                    transition: "background 1s, box-shadow 1s",
                }}
            >
                {onboarded ? (
                    // Page Container: real flex column so each page's `flex: 1` can
                    // stretch to fill the space above BottomNav, and `position: relative`
                    // anchors the absolutely-positioned nav to the phone shell.
                    <div
                        className="page-container"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            minHeight: 0,
                            overflow: "hidden",
                            position: "relative",
                            background: dangerMode ? "#fff5f5" : "#f6f8f6",
                            transition: "background 1s ease",
                        }}
                    >
                        {/* Page Content Slot */}
                        {children}

                        {/* Bottom Nav — hidden during focused, modal-style sub-flows
                (e.g. Simulation's loading/result/proceed screens) so it
                doesn't overlap a page's own bottom CTA bar. */}
                        {!hideBottomNav && (
                            <BottomNav
                                activeTab={activeTab}
                                onTabChange={onTabChange}
                                showEmergencyBadge={showEmergencyBadge}
                                disabled={tourActive && tourMandatory}
                            />
                        )}

                        {/* Tour Click-Blocker — blocks ALL page interactions during the tour */}
                        {tourActive && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 9997,
                                    background: "transparent",
                                    cursor: "not-allowed",
                                }}
                                onClick={e => e.stopPropagation()}
                                onMouseDown={e => e.stopPropagation()}
                                onPointerDown={e => e.stopPropagation()}
                            />
                        )}

                        {/* Product Tour Overlay */}
                        {tourActive && (
                            <TourCard
                                mandatory={tourMandatory}
                                pageIndex={tourPageIndex}
                                elemIndex={tourElemIndex}
                                onNext={onTourNext}
                                onDone={onTourDone}
                                onClose={onTourClose}
                            />
                        )}
                    </div>
                ) : (
                    children
                )}
            </div>
        </>
    );
}

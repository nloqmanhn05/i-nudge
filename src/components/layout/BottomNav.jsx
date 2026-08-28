import { NAV_ITEMS } from "../../data/mockData";

export default function BottomNav({ activeTab, onTabChange, active, onSelect, showEmergencyBadge, disabled }) {
  const currentActive = activeTab || active;
  const handleSelect = onTabChange || onSelect;

  return (
    <nav className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 z-50">
      <div className="flex justify-between items-end px-4 pt-2 pb-5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === currentActive;
          const isEmergency = item.id === "emergency";
          const activeColor = isEmergency ? "#DC2626" : item.id === "simulation" ? "#16A34A" : "#0f3c36";
          const activeBg = isEmergency ? "rgba(220,38,38,0.12)" : item.id === "simulation" ? "rgba(34,197,94,0.15)" : "rgba(19,236,200,0.18)";
          const showDot = isEmergency && showEmergencyBadge;

          return (
            <button
              key={item.id}
              onClick={() => { if (!disabled && handleSelect) handleSelect(item.id); }}
              className="flex flex-col items-center gap-1 flex-1 cursor-pointer border-none bg-transparent"
            >
              <div
                className="w-16 h-8 rounded-full flex items-center justify-center transition-colors relative"
                style={{ background: isActive ? activeBg : "transparent" }}
              >
                <span
                  className="material-symbols-outlined transition-colors"
                  style={{
                    fontSize: 22,
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    color: isActive ? activeColor : (showDot ? "#DC2626" : "#9ca3af"),
                  }}
                >
                  {item.icon}
                </span>
                {showDot && (
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 18,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#DC2626",
                      boxShadow: "0 0 0 2px white",
                    }}
                    className="safe-dot"
                  />
                )}
              </div>
              <span
                className="text-xs transition-colors"
                style={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? activeColor : (showDot ? "#DC2626" : "#9ca3af"),
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
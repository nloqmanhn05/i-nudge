export default function DebtCard({ item, danger, currency }) {
  const barColor = danger ? "#d41111" : item.color;
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
      style={{ borderColor: danger && item.used > 50 ? "rgba(212,17,17,0.2)" : undefined }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: item.bg }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 20,
                color: item.iconColor || item.color,
                fontVariationSettings: "'FILL' 1",
              }}
            >
              {item.icon}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{item.due}</p>
          </div>
        </div>
        <span className="font-mono text-sm font-bold text-gray-900">{currency} {item.amount.toFixed(2)}</span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${item.used}%`, background: barColor }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs font-medium" style={{ color: danger && item.used > 50 ? "#d41111" : "#9CA3AF" }}>
        <span className="font-mono">{item.used}% Used</span>
        <span className="font-mono">{currency} {item.limit.toLocaleString()} Limit</span>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { TOUR_STEPS } from "../../data/mockData";

export default function TourCard({ mandatory, pageIndex, elemIndex, onNext, onDone, onClose }) {
  const [targetRect, setTargetRect] = useState(null);

  const step = TOUR_STEPS[pageIndex];
  const elem = step ? step.elements[elemIndex] : null;
  const totalPages = TOUR_STEPS.length;
  const isLastElemOnPage = step ? elemIndex === step.elements.length - 1 : false;
  const isLastPage = pageIndex === totalPages - 1;

  useEffect(() => {
    if (!elem) return;
    
    // Automatically scroll to the element so the tour always points correctly
    const initialEl = document.querySelector(elem.target);
    if (initialEl) {
      initialEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    let frame;
    const updateRect = () => {
      const el = document.querySelector(elem.target);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
      frame = requestAnimationFrame(updateRect);
    };
    frame = requestAnimationFrame(updateRect);
    return () => cancelAnimationFrame(frame);
  }, [elem?.target]);

  if (!elem || !targetRect) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999 }} />
    );
  }

  const padding = 12;
  const tooltipWidth = 300;
  let top = targetRect.bottom + padding;
  let left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);

  if (left < padding) left = padding;
  if (left + tooltipWidth > window.innerWidth - padding) left = window.innerWidth - tooltipWidth - padding;
  if (top + 200 > window.innerHeight) {
    top = targetRect.top - padding - 220;
  }

  return (
    <>
      <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9998 }}>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - 8} y={targetRect.top - 8}
              width={targetRect.width + 16} height={targetRect.height + 16}
              rx="12" fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)" />
        <rect
          x={targetRect.left - 8} y={targetRect.top - 8}
          width={targetRect.width + 16} height={targetRect.height + 16}
          rx="12" fill="none" stroke="#2bee6c" strokeWidth="2" strokeDasharray="4 4"
        />
      </svg>

      <div style={{
        position: "fixed", top, left, width: tooltipWidth,
        background: "#fff", borderRadius: 24, padding: 20,
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)", zIndex: 9999,
        animation: "fadeSlideUp 0.3s ease both"
      }}>
        {/* Close / Skip button */}
        <button
          onClick={onClose}
          aria-label="Skip Tour"
          title="Skip Tour"
          style={{
            position: "absolute", top: -10, right: -10,
            background: "#0F172A", border: "none", width: 28, height: 28,
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 16 }}>close</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 8px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
            Step {pageIndex + 1} of {totalPages}
          </p>
          <button
            onClick={onDone}
            style={{
              background: "transparent", border: "none", color: "#64748B",
              fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "2px 6px",
              textDecoration: "underline"
            }}
          >
            Skip all
          </button>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 8px" }}>{elem.title}</h3>
        <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.5 }}>{elem.description}</p>

        <div style={{ display: "flex", gap: 10 }}>
          {isLastElemOnPage && isLastPage ? (
            <button onClick={onDone} style={{
              flex: 1, padding: "12px", borderRadius: 14, background: "var(--color-brand-primary, #13ecc8)", border: "none",
              fontSize: 15, fontWeight: 700, color: "#003918", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(19, 236, 200, 0.3)"
            }}>Get Started</button>
          ) : (
            <button onClick={onNext} style={{
              flex: 1, padding: "12px", borderRadius: 14, background: "#0F172A", border: "none",
              fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer"
            }}>Next</button>
          )}
        </div>
      </div>
    </>
  );
}

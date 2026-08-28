import { useEffect, useRef } from "react";

export default function EcgCanvas({ color = "#13ecc8" }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const offsetRef = useRef(0);

  const BEAT_W = 200;

  function ecgY(x, mid) {
    const t = ((x % BEAT_W) + BEAT_W) % BEAT_W;
    const p = t / BEAT_W;

    if (p < 0.25) return mid;
    if (p < 0.30) return mid - (p - 0.25) / 0.05 * mid * 0.35;
    if (p < 0.35) return mid - (0.35 - p) / 0.05 * mid * 0.35;
    if (p < 0.42) return mid;
    if (p < 0.44) return mid + (p - 0.42) / 0.02 * mid * 0.25;
    if (p < 0.46) return mid - (p - 0.44) / 0.02 * mid * 1.5;
    if (p < 0.49) return mid + (p - 0.46) / 0.03 * mid * 0.6;
    if (p < 0.52) return mid - (0.52 - p) / 0.03 * mid * 0.6;
    if (p < 0.58) return mid;
    if (p < 0.66) {
      const tp = (p - 0.58) / 0.08;
      return mid - Math.sin(tp * Math.PI) * mid * 0.5;
    }
    return mid;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const mid = H / 2;
    const SPEED = 1.2;
    const ERASE_W = 40;

    const yBuf = new Float32Array(W).fill(mid);
    let head = 0;

    function tick() {
      const steps = Math.ceil(SPEED);
      for (let s = 0; s < steps; s++) {
        head = (head + 1) % W;
        yBuf[head] = ecgY(offsetRef.current, mid);
        offsetRef.current += 1;
      }

      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, color === "#13ecc8" ? "rgba(19,236,200,0.25)" : "rgba(186,26,26,0.2)");
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.moveTo(0, mid);
      for (let i = 0; i < W; i++) {
        const x = i;
        const bi = (head - W + 1 + i + W) % W;
        const dist = (W - i);
        if (dist < ERASE_W) continue;
        ctx.lineTo(x, yBuf[bi]);
      }
      ctx.lineTo(W, mid);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      let started = false;
      for (let i = 0; i < W; i++) {
        const x = i;
        const bi = (head - W + 1 + i + W) % W;
        const dist = W - i;
        if (dist < ERASE_W) {
          if (started) { ctx.stroke(); ctx.beginPath(); started = false; }
          continue;
        }
        const y = yBuf[bi];
        if (!started) { ctx.moveTo(x, y); started = true; }
        else ctx.lineTo(x, y);
      }
      if (started) ctx.stroke();

      const dotX = W - ERASE_W;
      const dotY = yBuf[(head - ERASE_W + W) % W];

      const r = parseInt(color.slice(1, 3), 16), g = parseInt(color.slice(3, 5), 16), b = parseInt(color.slice(5, 7), 16);
      const radialGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
      radialGrad.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
      radialGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
      ctx.fillStyle = radialGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, mid);
      ctx.lineTo(W, mid);
      ctx.stroke();
      ctx.setLineDash([]);

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={72}
      style={{
        width: "100%",
        height: 72,
        display: "block",
        filter: color === "#13ecc8"
          ? "drop-shadow(0 0 8px rgba(19,236,200,0.5))"
          : "drop-shadow(0 0 8px rgba(186,26,26,0.5))",
      }}
    />
  );
}

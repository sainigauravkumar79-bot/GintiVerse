import { useRef, useState, type PointerEvent } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
}

const RESET: TiltState = { rotateX: 0, rotateY: 0 };

export function use3DTilt<T extends HTMLElement = HTMLDivElement>(maxTilt = 8) {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState<TiltState>(RESET);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onPointerMove(e: PointerEvent<T>) {
    if (prefersReducedMotion || e.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateY: (px - 0.5) * 2 * maxTilt,
      rotateX: -(py - 0.5) * 2 * maxTilt,
    });
  }

  function onPointerLeave() {
    setTilt(RESET);
  }

  return { ref, tilt, onPointerMove, onPointerLeave };
}

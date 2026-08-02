import { useRef, useState } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
}

const RESET: TiltState = { rotateX: 0, rotateY: 0 };

/**
 * Pointer-tracking 3D tilt for card hover effects.
 * - Rotation is capped at `maxTilt` degrees so text never becomes hard to read.
 * - Disabled automatically for touch input and prefers-reduced-motion.
 */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>(maxTilt = 8) {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState<TiltState>(RESET);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onPointerMove(e: React.PointerEvent<T>) {
    if (prefersReducedMotion || e.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 - 1
    const py = (e.clientY - rect.top) / rect.height; // 0 - 1
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

import { useRef, useState, useEffect } from 'react';

export const use3DTilt = (strength: number = 6) => {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState('');

  const onPointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * strength;
    const rotateY = x * strength;
    setTilt(`rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const onPointerLeave = () => {
    setTilt('rotateX(0deg) rotateY(0deg)');
  };

  return { ref, tilt, onPointerMove, onPointerLeave };
};

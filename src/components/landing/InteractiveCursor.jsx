import React, { useState, useEffect } from 'react';

export default function InteractiveCursor({ containerRef }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isRightSide, setIsRightSide] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const mid = window.innerWidth / 2;
      setIsRightSide(e.clientX > mid);
    };

    const handleClick = (e) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY, isRight: e.clientX > window.innerWidth / 2 }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      <div
        className={`absolute w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 border-2 ${
          isRightSide ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_15px_#22c55e]' : 'border-red-500 bg-red-500/20 shadow-[0_0_15px_#ef4444]'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {ripples.map((r) => (
        <div
          key={r.id}
          className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping border ${
            r.isRight ? 'w-12 h-12 border-emerald-400 bg-emerald-400/30' : 'w-12 h-12 border-red-500 bg-red-500/30'
          }`}
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}
    </div>
  );
}

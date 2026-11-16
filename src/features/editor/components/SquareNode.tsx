import React, { useRef } from 'react';

export default function SquareNode() {
  // Element ref
  const ref = useRef<HTMLDivElement>(null);

  // Cursor point
  const pointRef = useRef({ x: 0, y: 0 });

  function handleOnPointerDown(e: React.PointerEvent) {
    if (!ref.current) return;
    ref.current.setPointerCapture(e.pointerId);

    pointRef.current.x = e.clientX;
    pointRef.current.y = e.clientY;
  }

  function handleOnPointerUp(e: React.PointerEvent) {
    if (!ref.current) return;

    if (ref.current.hasPointerCapture(e.pointerId)) {
      ref.current.releasePointerCapture(e.pointerId);
    }
  }

  function handleOnPointerMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el?.hasPointerCapture(e.pointerId)) return;

    const dx = e.clientX - pointRef.current.x;
    const dy = e.clientY - pointRef.current.y;

    const nextLeft = el.offsetLeft + dx;
    const nextTop = el.offsetTop + dy;

    el.style.left = `${nextLeft}px`;
    el.style.top = `${nextTop}px`;

    pointRef.current.x = e.clientX;
    pointRef.current.y = e.clientY;
  }

  return (
    <div
      ref={ref}
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab bg-violet-500 active:cursor-grabbing'
      style={{ width: 200, height: 200 }}
      onPointerDown={handleOnPointerDown}
      onPointerUp={handleOnPointerUp}
      onPointerMove={handleOnPointerMove}
    >
      <div className='relative h-full w-full'></div>
    </div>
  );
}

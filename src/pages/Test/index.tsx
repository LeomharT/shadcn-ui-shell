import { useEffect, useRef } from 'react';

export default function Test() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function renderImage(canvas: HTMLCanvasElement) {
    const res = await fetch('/16f01.pgm');
    const data = res.blob();
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    renderImage(canvasRef.current);
  }, []);

  return (
    <div>
      <canvas />
    </div>
  );
}

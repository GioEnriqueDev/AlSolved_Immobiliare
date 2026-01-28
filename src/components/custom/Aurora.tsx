import { useEffect, useRef } from 'react';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  className?: string;
}

const Aurora = ({
  colorStops = ["#c9902e", "#e8c978", "#dbad4a", "#a87024", "#f9f0d8"],
  amplitude = 1.0,
  blend = 0.5,
  time = 0.2,
  className = "",
}: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      const elapsed = (Date.now() - startTime) * 0.001 * time;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create aurora effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      colorStops.forEach((color, i) => {
        const offset = (i / (colorStops.length - 1) + Math.sin(elapsed + i) * 0.1) % 1;
        gradient.addColorStop(Math.max(0, Math.min(1, offset)), color);
      });

      ctx.globalAlpha = blend;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add flowing waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.5);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.5 + 
            Math.sin(x * 0.005 + elapsed + i) * amplitude * 100 +
            Math.sin(x * 0.01 + elapsed * 1.5 + i) * amplitude * 50;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        waveGradient.addColorStop(0, colorStops[i % colorStops.length] + '20');
        waveGradient.addColorStop(0.5, colorStops[(i + 1) % colorStops.length] + '30');
        waveGradient.addColorStop(1, colorStops[(i + 2) % colorStops.length] + '20');
        
        ctx.fillStyle = waveGradient;
        ctx.globalAlpha = 0.1 + (i * 0.05);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colorStops, amplitude, blend, time]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Aurora;

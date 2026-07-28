import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";

type VaporizeTextScrollProps = {
  text?: string;
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number | string;
  };
  color?: string;
  spread?: number;
  density?: number;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
};

export default function VaporizeTextScroll({
  text = "P. Gopala Sri",
  font = {
    fontFamily: "UnifrakturMaguntia, MedievalSharp, Pirata One, serif",
    fontSize: "80px",
    fontWeight: 400,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
}: VaporizeTextScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollProgressRef = useRef<number>(0);

  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return Math.min(window.devicePixelRatio * 1.5 || 1, 3);
    }
    return 1;
  }, []);

  const fontSize = useMemo(() => {
    return parseInt(font.fontSize?.replace("px", "") || "80");
  }, [font.fontSize]);

  // Handle scroll progress: 0 when at top of page, 1 when scrolled down past hero
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const heroThreshold = Math.max(windowHeight * 0.45, 300);
      const rawProgress = Math.min(Math.max(scrollY / heroThreshold, 0), 1);
      
      scrollProgressRef.current = rawProgress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize and Render Canvas Particles
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const width = wrapper.clientWidth || window.innerWidth;
    const height = wrapper.clientHeight || 160;

    if (width === 0 || height === 0) return;

    setWrapperSize({ width, height });

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * globalDpr);
    canvas.height = Math.floor(height * globalDpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const responsiveFontSize = Math.min(fontSize, Math.max(width * 0.1, 42));
    const fontStr = `${font.fontWeight ?? 400} ${responsiveFontSize * globalDpr}px ${font.fontFamily}`;

    ctx.fillStyle = color;
    ctx.font = fontStr;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textX = canvas.width / 2;
    const textY = canvas.height / 2;

    ctx.fillText(text, textX, textY);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const sampleRate = Math.max(2, Math.round(globalDpr));
    const newParticles: Particle[] = [];

    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 30) {
          const originalAlpha = (alpha / 255) * (sampleRate / globalDpr);
          const angle = Math.random() * Math.PI * 2;
          const speed = (Math.random() * 1.5 + 0.5) * spread * 5;

          newParticles.push({
            x,
            y,
            originalX: x,
            originalY: y,
            color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
            opacity: originalAlpha,
            originalAlpha,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed - Math.random() * speed * 0.8,
            angle,
            speed,
          });
        }
      }
    }

    particlesRef.current = newParticles;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [text, font, color, spread, fontSize, globalDpr]);

  // Resize listener
  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // Main Render Loop driven by Scroll Progress (Scroll Down = Vaporize, Scroll Up = Reverse)
  useEffect(() => {
    let frameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const progress = scrollProgressRef.current; // 0 (top/solid) -> 1 (scrolled down/vaporized)

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(globalDpr, globalDpr);

      const particles = particlesRef.current;
      const totalWidth = canvas.width / globalDpr;
      const vaporizeFrontX = totalWidth * (1.3 * progress);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pxScaled = p.originalX / globalDpr;

        if (progress === 0) {
          // Full solid text when at top of page
          ctx.fillStyle = p.color;
          ctx.fillRect(pxScaled, p.originalY / globalDpr, 1.2, 1.2);
        } else if (pxScaled <= vaporizeFrontX) {
          // Particle vaporizes on scroll down, reverses & reforms on scroll up
          const dist = (vaporizeFrontX - pxScaled) / (totalWidth * 0.35);
          const factor = Math.min(Math.max(dist, 0), 1) * progress;

          const currentX = (p.originalX + p.velocityX * factor * 16) / globalDpr;
          const currentY = (p.originalY + p.velocityY * factor * 12) / globalDpr;
          const currentOpacity = Math.max(0, p.originalAlpha * (1 - factor * 0.85));

          if (currentOpacity > 0.01) {
            const particleColor = p.color.replace(/[\d.]+\)$/, `${currentOpacity})`);
            ctx.fillStyle = particleColor;
            ctx.fillRect(currentX, currentY, 1.2, 1.2);
          }
        } else {
          // Particle not yet reached by vaporize front
          ctx.fillStyle = p.color;
          ctx.fillRect(pxScaled, p.originalY / globalDpr, 1.2, 1.2);
        }
      }

      ctx.restore();

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [globalDpr]);

  return (
    <div ref={wrapperRef} className="w-full flex justify-center items-center relative py-2 overflow-hidden pointer-events-none min-h-[120px] sm:min-h-[160px]">
      <canvas ref={canvasRef} className="pointer-events-none mx-auto" />
      <h1 className="sr-only">{text}</h1>
    </div>
  );
}

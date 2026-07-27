import React, { useRef, useEffect } from 'react';

export default function Magnetic({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      
      const dist = Math.hypot(dx, dy);
      
      // Pull button if mouse is within 70px of the button's center
      if (dist < 70) {
        // Stiff linear magnetic pull
        element.style.transform = `translate3d(${dx * 0.3}px, ${dy * 0.3}px, 0)`;
      } else {
        element.style.transform = `translate3d(0px, 0px, 0px)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = `translate3d(0px, 0px, 0px)`;
      element.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    };

    const handleMouseEnter = () => {
      element.style.transition = 'none';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <div ref={ref} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}

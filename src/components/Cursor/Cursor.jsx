import React, { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // Prevent rendering or attaching events on devices with no fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setIsHidden(false);
      const { clientX, clientY } = e;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.left = `${clientX}px`;
        ringRef.current.style.top = `${clientY}px`;
      }
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);
    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.magnetic-btn') || 
        target.classList.contains('hover-target') ||
        target.closest('.hover-target');
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Return empty on mobile or touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={dotRef} 
        className={`${styles.dot} ${isHidden ? styles.hidden : ''} ${isMouseDown ? styles.mouseDown : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`${styles.ring} ${isHidden ? styles.hidden : ''} ${isHovered ? styles.hovered : ''} ${isMouseDown ? styles.mouseDown : ''}`} 
      />
    </>
  );
}

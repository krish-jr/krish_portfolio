import React, { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');

    const duration = 2000; // 2 seconds duration
    const intervalTime = 16; // Approx 60fps
    const step = 100 / (duration / intervalTime);
    let currentProgress = 0;

    const timer = setInterval(() => {
      const jitter = Math.random() * 2.5;
      currentProgress += step + jitter;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            document.body.classList.remove('loading');
            onComplete();
          }, 800); // Match slide transition
        }, 300);
      } else {
        setProgress(Math.min(100, Math.floor(currentProgress)));
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.classList.remove('loading');
    };
  }, [onComplete]);

  return (
    <div className={`${styles.loaderContainer} ${isDone ? styles.fadeOut : ''}`}>
      {/* Background noise and glows */}
      <div className={styles.bgGlow}></div>
      
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <svg className={styles.logoSvg} viewBox="0 0 100 100">
            <defs>
              <linearGradient id="loaderLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="100%" stopColor="#7B61FF" />
              </linearGradient>
            </defs>
            {/* SVG circle stroke animation */}
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="url(#loaderLogoGrad)" 
              strokeWidth="2" 
              strokeDasharray="250" 
              strokeDashoffset={250 - (progress * 2.5)} 
              className={styles.circleStroke} 
            />
            {/* Initials in the center */}
            <text 
              x="50%" 
              y="55%" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="22" 
              fontFamily="'Syne', sans-serif" 
              fontWeight="800" 
              letterSpacing="1px"
              className={styles.logoText}
            >
              GS
            </text>
          </svg>
        </div>
        
        <div className={styles.progressTrack}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className={styles.percentage}>
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}

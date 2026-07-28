import React, { useEffect, useState } from 'react';
import { FiCode, FiUser, FiGlobe } from 'react-icons/fi';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');

    const duration = 2200; // 2.2 seconds duration
    const intervalTime = 16;
    const step = 100 / (duration / intervalTime);
    let currentProgress = 0;

    const timer = setInterval(() => {
      const jitter = Math.random() * 2.2;
      currentProgress += step + jitter;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            document.body.classList.remove('loading');
            onComplete();
          }, 700);
        }, 250);
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
      {/* Radial ambient background glow */}
      <div className={styles.radialGlow}></div>
      
      <div className={styles.content}>
        {/* Top 3 Circular Icon Badges */}
        <div className={styles.iconRow}>
          <div className={styles.iconBadge} aria-label="Code">
            <FiCode />
          </div>
          <div className={styles.iconBadge} aria-label="User">
            <FiUser />
          </div>
          <div className={styles.iconBadge} aria-label="Globe">
            <FiGlobe />
          </div>
        </div>

        {/* Welcome Title */}
        <div className={styles.titleWrapper}>
          <h1 className={styles.titleLine1}>Welcome to my</h1>
          <h1 className={styles.titleLine2}>Portfolio Website</h1>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle}>Creating Websites That Feel Alive.</p>

        {/* Pill Badge */}
        <div className={styles.pillBadge}>
          <span>P. GOPALA SRI</span>
          <span className={styles.cursor}>|</span>
        </div>

        {/* Horizontal Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

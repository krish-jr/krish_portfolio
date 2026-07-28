import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiUser, FiGlobe } from 'react-icons/fi';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');

    const duration = 2200; // 2.2 seconds duration
    const startTime = performance.now();

    const animateProgress = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);
      
      // Smooth progress curve
      const easeProgress = Math.floor(Math.min(100, Math.pow(rawProgress / 100, 0.85) * 100));

      setProgress(easeProgress);

      if (rawProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            document.body.classList.remove('loading');
            onComplete();
          }, 700);
        }, 200);
      }
    };

    requestAnimationFrame(animateProgress);

    return () => {
      document.body.classList.remove('loading');
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div 
          className={styles.loaderContainer}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.06,
            filter: "blur(16px)",
            transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } 
          }}
        >
          {/* Radial ambient background glow */}
          <div className={styles.radialGlow}></div>
          
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Top 3 Circular Icon Badges */}
            <div className={styles.iconRow}>
              {[
                { icon: FiCode, label: "Code", delay: 0.1 },
                { icon: FiUser, label: "User", delay: 0.2 },
                { icon: FiGlobe, label: "Globe", delay: 0.3 }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    className={styles.iconBadge} 
                    aria-label={item.label}
                    initial={{ scale: 0, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20, 
                      delay: item.delay 
                    }}
                  >
                    <Icon />
                  </motion.div>
                );
              })}
            </div>

            {/* Welcome Title */}
            <div className={styles.titleWrapper}>
              <motion.h1 
                className={styles.titleLine1}
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                Welcome to my
              </motion.h1>
              <motion.h1 
                className={styles.titleLine2}
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                Portfolio Website
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p 
              className={styles.subtitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              Creating Websites That Feel Alive.
            </motion.p>

            {/* Pill Badge */}
            <motion.div 
              className={styles.pillBadge}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <span>P. GOPALA SRI</span>
              <span className={styles.cursor}>|</span>
            </motion.div>

            {/* Horizontal Progress Bar & Percentage Counter */}
            <motion.div 
              className={styles.progressContainer}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>INITIALIZING EXPERIENCE</span>
                <span className={styles.progressValue}>{progress}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

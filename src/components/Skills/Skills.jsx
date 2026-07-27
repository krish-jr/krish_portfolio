import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const SKILLS = [
  "Python", "C", "HTML", "CSS", "JavaScript", 
  "React", "Django", "Git", "GitHub", "REST APIs", 
  "Responsive Web Design", "Advanced Web Development", 
  "VS Code", "Cursor", "Windsurf", "Trae", 
  "Canva", "Vercel", "Netlify"
];

function SkillCard({ name }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Smooth 3D tilt calculation
    const rotateX = -(y - yc) / 5; 
    const rotateY = (x - xc) / 5;
    
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    card.style.boxShadow = `0 15px 30px rgba(0, 245, 255, 0.08)`;
    card.style.borderColor = `var(--primary-glow)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';
    card.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;
    card.style.borderColor = `var(--card-border)`;
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'none';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`${styles.skillCard} glass-panel`}
    >
      <div className={styles.glowOverlay}></div>
      <span className={styles.skillName}>{name}</span>
    </div>
  );
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className={styles.skillsSection}>
      {/* Background Infinite Marquee */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {SKILLS.map((skill, idx) => (
            <span key={idx} className={styles.marqueeText}>{skill} &nbsp;•&nbsp; </span>
          ))}
          {SKILLS.map((skill, idx) => (
            <span key={`dup-${idx}`} className={styles.marqueeText}>{skill} &nbsp;•&nbsp; </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="p-8 sm:p-12 md:p-16 rounded-[36px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSub}>MY STACK</span>
              <h2 className={styles.sectionTitle}>Tools & Technologies</h2>
            </div>

            <motion.div 
              className={styles.skillsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {SKILLS.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkillCard name={skill} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

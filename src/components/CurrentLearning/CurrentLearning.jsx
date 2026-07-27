import React from 'react';
import { motion } from 'framer-motion';
import styles from './CurrentLearning.module.css';
import { FiCode, FiLayers, FiServer, FiLink, FiDatabase, FiCpu, FiCloud } from 'react-icons/fi';

const LEARNINGS = [
  {
    title: "Advanced Full Stack",
    description: "Developing end-to-end applications with secure architectures.",
    progress: 85,
    icon: FiCode,
    glowColor: "rgba(0, 245, 255, 0.4)"
  },
  {
    title: "React Ecosystem",
    description: "Mastering state flow, micro-animations, and 3D Fiber integrations.",
    progress: 90,
    icon: FiLayers,
    glowColor: "rgba(123, 97, 255, 0.4)"
  },
  {
    title: "Backend Architecture",
    description: "Structuring clean MVC files, scalable processes, and authentication.",
    progress: 75,
    icon: FiServer,
    glowColor: "rgba(74, 222, 128, 0.4)"
  },
  {
    title: "REST APIs",
    description: "Designing structured request endpoints, status codes, and JSON schemas.",
    progress: 80,
    icon: FiLink,
    glowColor: "rgba(0, 245, 255, 0.4)"
  },
  {
    title: "Database Design",
    description: "Modeling relationships, relational keys, queries, and optimizations.",
    progress: 70,
    icon: FiDatabase,
    glowColor: "rgba(123, 97, 255, 0.4)"
  },
  {
    title: "AI Integration",
    description: "Connecting OpenAI and Google Gemini APIs for intelligent outputs.",
    progress: 85,
    icon: FiCpu,
    glowColor: "rgba(74, 222, 128, 0.4)"
  },
  {
    title: "Cloud Deployment",
    description: "Hosting web configurations on Vercel, Netlify, and server instances.",
    progress: 65,
    icon: FiCloud,
    glowColor: "rgba(0, 245, 255, 0.4)"
  }
];

export default function CurrentLearning() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="learning" className={styles.learningSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSub}>UPGRADING SKILLS</span>
          <h2 className={styles.sectionTitle}>Current Focus</h2>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {LEARNINGS.map((item, idx) => {
            const Icon = item.icon;
            const strokeDasharray = 201; // 2 * PI * 32 r
            
            return (
              <motion.div 
                key={idx} 
                className={`${styles.learningCard} glass-panel`}
                variants={cardVariants}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper} style={{ boxShadow: `0 0 15px ${item.glowColor}` }}>
                    <Icon className={styles.icon} />
                  </div>
                  
                  {/* Circular progress loader */}
                  <div className={styles.progressCircle}>
                    <svg viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" className={styles.circleBg} />
                      <motion.circle 
                        cx="40" 
                        cy="40" 
                        r="32" 
                        className={styles.circleValue} 
                        strokeDasharray={strokeDasharray}
                        initial={{ strokeDashoffset: strokeDasharray }}
                        whileInView={{ strokeDashoffset: strokeDasharray - (strokeDasharray * item.progress) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
                      />
                    </svg>
                    <span className={styles.percentageText}>{item.progress}%</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

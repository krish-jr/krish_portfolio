import React from 'react';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const JOURNEY = [
  {
    period: "Phase 01 — Foundations",
    title: "Logic & Algorithm Core",
    description: "Began my coding path learning basic problem-solving logic. Explored structural syntax, pointers, memory allocation, and algorithmic design using Python and C.",
    skills: ["Python", "C", "Algorithms"]
  },
  {
    period: "Phase 02 — Frontend Core",
    title: "Modern Web Interfaces",
    description: "Transitioned to building user-facing layouts. Mastered responsive web structures, semantic layouts, and advanced DOM interactions using CSS and vanilla JavaScript.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
  {
    period: "Phase 03 — Server Engineering",
    title: "Backend Core & Databases",
    description: "Dove deep into servers, MVC patterns, databases, and secure authentication models. Engineered server routing and REST APIs using Python and Django.",
    skills: ["Django", "SQL", "REST APIs", "Git/GitHub"]
  },
  {
    period: "Phase 04 — Modern Client Architecture",
    title: "Component Systems & React",
    description: "Adopted structured components and state management paradigms. Designed reusable UI architectures and smooth transitions in the React ecosystem.",
    skills: ["React", "CSS Modules", "Vite", "JSON State"]
  },
  {
    period: "Phase 05 — Advanced AI Products",
    title: "AI Integration & Analytics",
    description: "Merged modern frontends with intelligent backends. Built CashFlow Crisis AI, analyzing cash flow patterns with customized recommendation algorithms.",
    skills: ["AI Integration", "Financial Forecasts", "Full Stack Development"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className={`${styles.expSection} bg-[#020203] border-t border-white/5 py-24`}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="p-8 sm:p-12 md:p-16 rounded-[36px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSub}>MY JOURNEY</span>
              <h2 className={styles.sectionTitle}>Learning Timeline</h2>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineLine}></div>

              {JOURNEY.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx} 
                    className={`${styles.timelineItem} ${isLeft ? styles.leftItem : styles.rightItem}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  >
                    <div className={styles.timelineDot}></div>

                    <div className={`${styles.expCard} glass-panel`}>
                      <span className={styles.period}>{item.period}</span>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDesc}>{item.description}</p>
                      <div className={styles.skillTags}>
                        {item.skills.map((skill, sIdx) => (
                          <span key={sIdx} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

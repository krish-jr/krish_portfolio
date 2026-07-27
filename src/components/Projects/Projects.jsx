import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';
import { FiExternalLink, FiGithub, FiX, FiCheck } from 'react-icons/fi';
import Magnetic from '../Magnetic/Magnetic';

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectDetails = {
    title: "CashFlow Crisis AI",
    tagline: "AI-Powered Financial Management Platform",
    description: "An intelligent platform designed to help users monitor, analyze, and improve cash flow using advanced analytical insights. CashFlow Crisis AI processes transactions to forecast future cash constraints, highlights trends, and offers proactive recommendations to maintain financial stability.",
    techStack: ["Python", "Django", "HTML", "CSS", "Git", "GitHub"],
    highlights: [
      "AI Financial Analysis (Predictive forecasting of cash flow shortages)",
      "Cash Flow Dashboard (Dynamic visual representations of metrics)",
      "Responsive UI (Optimized across mobile and desktop interfaces)",
      "Scalable Backend (Built with python and django logic)",
      "Modern Architecture (Clean MVC structure with secure api integration)"
    ],
    liveDemo: "https://github.com/gopalasri/cashflow-crisis-ai",
    github: "https://github.com/gopalasri/cashflow-crisis-ai"
  };

  return (
    <section id="projects" className={`${styles.projectsSection} bg-[#020203] border-t border-white/5 py-24`}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="p-8 sm:p-12 md:p-16 rounded-[36px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
          <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSub}>SELECTED WORK</span>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
        </div>

        <div className={styles.projectGrid}>
          {/* CashFlow Crisis AI Card */}
          <motion.div 
            className={`${styles.projectCard} glass-panel`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsModalOpen(true)}
          >
            {/* Left side: Content */}
            <div className={styles.cardContent}>
              <span className={styles.projectNumber}>01</span>
              <h3 className={styles.projectTitle}>{projectDetails.title}</h3>
              <p className={styles.projectDesc}>
                An AI-powered financial management platform designed to help users monitor, analyze, and improve cash flow using intelligent insights.
              </p>
              
              <div className={styles.cardTech}>
                {projectDetails.techStack.map((tech, idx) => (
                  <span key={idx} className={styles.techTag}>{tech}</span>
                ))}
              </div>

              <div className={styles.viewMoreBtn}>
                Explore Project
              </div>
            </div>

            {/* Right side: Mock dashboard graphics */}
            <div className={styles.cardGraphic}>
              <div className={styles.dashboardMock}>
                <div className={styles.dashHeader}>
                  <div className={styles.dashDots}><span></span><span></span><span></span></div>
                  <div className={styles.dashTitle}>AI CashFlow Insights</div>
                </div>
                <div className={styles.dashBody}>
                  <div className={styles.chartGlow}></div>
                  <div className={styles.metricsRow}>
                    <div className={styles.metricCard}>
                      <span>Balance</span>
                      <strong>$14,205.50</strong>
                    </div>
                    <div className={styles.metricCard}>
                      <span>AI Health score</span>
                      <strong style={{ color: '#4ADE80' }}>94%</strong>
                    </div>
                  </div>
                  
                  {/* Decorative chart lines */}
                  <div className={styles.chart}>
                    <svg viewBox="0 0 200 80" className={styles.chartSvg}>
                      <path 
                        d="M0 60 Q 30 20, 60 40 T 120 10 T 180 50 T 200 20" 
                        fill="none" 
                        stroke="url(#chartGrad)" 
                        strokeWidth="3" 
                        className={styles.chartLine}
                      />
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#00F5FF" />
                          <stop offset="100%" stopColor="#7B61FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`${styles.modalContent} glass-panel`}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>

              <div className={styles.modalBody}>
                <div className={styles.modalLeft}>
                  <span className={styles.modalSub}>{projectDetails.tagline}</span>
                  <h2 className={styles.modalTitle}>{projectDetails.title}</h2>
                  <p className={styles.modalDesc}>{projectDetails.description}</p>
                  
                  <h4 className={styles.sectionSubHeader}>Key Highlights</h4>
                  <ul className={styles.highlightsList}>
                    {projectDetails.highlights.map((highlight, idx) => (
                      <li key={idx}>
                        <FiCheck className={styles.checkIcon} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.modalRight}>
                  <h4 className={styles.sectionSubHeader}>Tech Stack</h4>
                  <div className={styles.modalTechGrid}>
                    {projectDetails.techStack.map((tech, idx) => (
                      <span key={idx} className={styles.modalTechTag}>{tech}</span>
                    ))}
                  </div>

                  <div className={styles.modalActions}>
                    <Magnetic>
                      <a href={projectDetails.liveDemo} target="_blank" rel="noopener noreferrer" className={`${styles.modalBtn} ${styles.primaryModalBtn}`}>
                        Live Demo <FiExternalLink />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href={projectDetails.github} target="_blank" rel="noopener noreferrer" className={`${styles.modalBtn} ${styles.secondaryModalBtn}`}>
                        View Code <FiGithub />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

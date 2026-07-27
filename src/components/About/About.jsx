import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { FiBookOpen, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

export default function About() {
  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className={`${styles.aboutSection} bg-[#020203] border-t border-white/5 py-24`}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="p-8 sm:p-12 md:p-16 rounded-[36px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
          <div className={styles.container}>
        <motion.div 
          className={styles.leftColumn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textRevealVariants}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>ABOUT ME</span>
            <h2 className={styles.sectionTitle}>Crafting Digital Spaces</h2>
          </div>
          
          <p className={styles.paragraph}>
            I'm P. Gopala Sri, an aspiring Full Stack Developer based in Tamil Nadu, India. I specialize in building responsive, modern, and AI-powered web experiences that bridge the gap between design and development.
          </p>
          <p className={styles.paragraph}>
            My journey is driven by curiosity, constant learning, and a desire to engineer solutions that make a difference. I'm fascinated by clean interfaces, smooth interactions, and robust backend architectures.
          </p>
          
          <div className={styles.careerGoal}>
            <h4 className={styles.goalTitle}>Career Vision</h4>
            <p className={styles.goalText}>
              To become an exceptional Full Stack Developer capable of building scalable, AI-driven applications with outstanding user experiences.
            </p>
          </div>
        </motion.div>
        
        <div className={styles.rightColumn}>
          {/* Contact Details Card */}
          <motion.div 
            className={`${styles.card} glass-panel`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <h3 className={styles.cardTitle}>Information</h3>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <FiMapPin className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>Tamil Nadu, India</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FiMail className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <a href="mailto:krishjr1610@gmail.com" className={styles.infoLink}>krishjr1610@gmail.com</a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FiPhone className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Phone</div>
                  <a href="tel:+917708179016" className={styles.infoLink}>+91 7708179016</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div 
            className={`${styles.card} ${styles.eduCard} glass-panel`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            transition={{ delay: 0.15 }}
          >
            <div className={styles.eduHeader}>
              <FiBookOpen className={styles.eduHeaderIcon} />
              <h3 className={styles.cardTitle}>Education</h3>
            </div>
            
            <div className={styles.eduTimeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.eduTitle}>B.Tech Biotechnology</h4>
                  <p className={styles.eduStatus}>Currently Pursuing (2nd Year)</p>
                  <p className={styles.eduDetail}>Acquiring analytical, research, and technical problem-solving skills.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.copyright}>
            © {currentYear} P. Gopala Sri. All Rights Reserved.
          </span>
          <span className={styles.tag}>
            Aspiring Full Stack Developer
          </span>
        </div>

        <div className={styles.signatureWrapper}>
          <motion.div 
            className={styles.signature}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Gopala Sri
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

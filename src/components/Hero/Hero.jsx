import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../Magnetic/Magnetic';
import styles from './Hero.module.css';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import ShaderBackground from '../Canvas3D/ShaderBackground';

import VaporizeTextScroll from './VaporizeTextScroll';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const wordRevealVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const titleText = "P. Gopala Sri";
  const taglineText = "Building Modern, Scalable & AI-Powered Web Experiences";

  return (
    <section id="hero" className={styles.heroSection}>
      {/* 3D Liquid Crimson Silk Wave Background - Home Section Only */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-95">
        <ShaderBackground />
      </div>

      <div className={styles.gridLines}></div>
      
      <motion.div 
        className={`${styles.heroContent} text-center flex flex-col items-center justify-center max-w-4xl mx-auto z-10 pt-24`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div 
          className="px-4 py-1.5 rounded-full apple-badge-crystal text-xs font-semibold text-slate-200 border border-white/10 bg-white/5 select-none inline-flex items-center gap-2 mb-3 shadow-lg"
          variants={itemVariants}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]"></span>
          <span>Available for full stack & AI roles</span>
        </motion.div>

        {/* Main Name Heading with Scroll-Driven Vaporize Particle Effect */}
        <motion.div className="w-full my-1" variants={itemVariants}>
          <VaporizeTextScroll 
            text={titleText}
            font={{
              fontFamily: "UnifrakturMaguntia, MedievalSharp, Pirata One, serif",
              fontSize: "80px",
              fontWeight: 400
            }}
            color="rgb(255, 255, 255)"
            spread={5}
            density={5}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.h2 
          className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-red-400 font-heading mb-4" 
          variants={itemVariants}
        >
          Full Stack Developer & AI Builder
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-heading mb-8" 
          variants={itemVariants}
        >
          Hi, I'm a developer dedicated to crafting modern, premium web architectures and intelligent AI integrations. From concept to production, I build fluid digital products with a focus on speed, design, and usability.
        </motion.p>

        {/* CTA Action Buttons */}
        <motion.div className="flex flex-wrap items-center justify-center gap-4" variants={itemVariants}>
          <Magnetic>
            <a 
              href="#contact" 
              className="px-8 py-3.5 bg-red-600/30 hover:bg-red-600/50 text-white text-sm font-semibold rounded-full border border-red-500/40 transition-all duration-300 shadow-[0_0_20px_rgba(255,45,85,0.3)] hover:shadow-[0_0_30px_rgba(255,45,85,0.55)] hover:scale-105"
            >
              Contact Me
            </a>
          </Magnetic>
          <Magnetic>
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:scale-105"
            >
              View Projects
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

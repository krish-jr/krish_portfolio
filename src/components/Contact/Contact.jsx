import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.css';
import { FiGithub, FiInstagram, FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Magnetic from '../Magnetic/Magnetic';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className={`${styles.contactSection} bg-[#020203] border-t border-white/5 py-24`}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="p-8 sm:p-12 md:p-16 rounded-[36px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
          <div className={styles.container}>
            {/* Left Side: Info */}
            <motion.div 
              className={styles.infoCol}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionSub}>GET IN TOUCH</span>
                <h2 className={styles.sectionTitle}>Let's Connect</h2>
              </div>
              
              <p className={styles.description}>
                Have a project in mind or want to discuss full-stack opportunities? Reach out via the form, directly by email, or connect with me on socials.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.detailItem}>
                  <FiMail className={styles.detailIcon} />
                  <div>
                    <span>Email</span>
                    <a href="mailto:krishjr1610@gmail.com">krishjr1610@gmail.com</a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <FiPhone className={styles.detailIcon} />
                  <div>
                    <span>Phone</span>
                    <a href="tel:+917708179016">+91 7708179016</a>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <FiMapPin className={styles.detailIcon} />
                  <div>
                    <span>Location</span>
                    <p>Ramanathapuram, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialRow}>
                <a href="https://github.com/krish-jr" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                  <FiGithub />
                </a>
                <a href="https://www.instagram.com/_krish.39t?igsh=MWl5eG94MnE5dmUzYQ%3D%3D" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                  <FiInstagram />
                </a>
                <a href="https://wa.me/917708179016" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </motion.div>

            {/* Right Side: Interactive Form */}
            <motion.div 
              className={`${styles.formCol} glass-panel`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form 
                    key="form"
                    className={styles.contactForm}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={styles.inputGroup}>
                      <label htmlFor="name" className={styles.label}>Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email" className={styles.label}>Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="message" className={styles.label}>Your Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4" 
                        required 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Hello, I'd like to discuss a project..."
                        className={styles.textarea}
                      ></textarea>
                    </div>

                    <Magnetic>
                      <button 
                        type="submit" 
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className={styles.loader}></span>
                        ) : (
                          <>
                            Send Message <FiSend />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className={styles.successContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FiCheckCircle className={styles.successIcon} />
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

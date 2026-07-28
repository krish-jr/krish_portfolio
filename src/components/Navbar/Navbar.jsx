import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSend } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] sm:w-[92%] max-w-5xl rounded-full border backdrop-blur-2xl ${
        scrolled 
          ? 'bg-white/[0.05] border-white/15 py-2.5 sm:py-3 shadow-[0_10px_35px_rgba(255,45,85,0.25)] border-red-500/30' 
          : 'bg-white/[0.04] border-white/10 py-3 sm:py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
      }`}
    >
      <div className="px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white font-heading hover:opacity-90 transition-opacity flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>P. Gopala Sri</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#FF2E4C] flex-shrink-0"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full shadow-[0_0_12px_#FF2E4C]"></span>
            </a>
          ))}
          
          {/* Hire Me Liquid Glass Button */}
          <a
            href="#contact"
            className="text-xs font-semibold px-5 py-2.5 bg-red-600/15 hover:bg-red-600/30 text-white rounded-full transition-all duration-300 border border-red-500/30 hover:border-red-500 shadow-[0_0_15px_rgba(255,45,85,0.2)] hover:shadow-[0_0_25px_rgba(255,45,85,0.5)] hover:scale-105 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Hire Me</span>
            <FiSend className="text-red-400 text-xs" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-full transition-colors border border-white/10 flex-shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-black/90 border border-red-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 max-h-[80vh] overflow-y-auto animate-fade-in-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-white py-2.5 px-4 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between min-h-[44px]"
            >
              <span>{link.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center text-sm font-semibold py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-lg shadow-red-500/30 min-h-[44px] flex items-center justify-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Video, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine which section is in view
      const sections = ['home', 'features', 'services', 'pricing', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 40, // Offset for navbar height
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-black relative overflow-hidden'
    }`}>
      {/* Decorative background elements - only visible when not scrolled */}
      {!scrolled && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 right-1/2 w-full bg-gradient-to-r from-blue-800 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated circles */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          </div>
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Video className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                Foxbeep
              </span>
            </div>
          </div>
          
          {/* Desktop navigation - moved to right side */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`${activeSection === 'home' ? 'text-blue-300 border-blue-500' : 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className={`${activeSection === 'features' ? 'text-blue-300 border-blue-500' : 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={`${activeSection === 'services' ? 'text-blue-300 border-blue-500' : 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className={`${activeSection === 'pricing' ? 'text-blue-300 border-blue-500' : 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors`}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`${activeSection === 'about' ? 'text-blue-300 border-blue-500' : 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors`}
            >
              About
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black rounded-md p-2 text-blue-300 hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black bg-opacity-95 backdrop-blur-lg border-t border-blue-900 border-opacity-20">
          <button
            onClick={() => scrollToSection('home')}
            className={`${activeSection === 'home' ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className={`${activeSection === 'features' ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className={`${activeSection === 'services' ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className={`${activeSection === 'pricing' ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`${activeSection === 'about' ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            About
          </button>
        </div>
      </div>
    </nav>
  );
}
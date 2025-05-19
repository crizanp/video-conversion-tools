import React, { useState, useEffect } from 'react';
import { Video, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function ToolsNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const conversionServices = [
    "MP4 to MKV",
    "MP4 to MOV",
    "MP4 to AVI",
    "MP4 to WMV",
    "MP4 to WebM"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine which section is in view
      const sections = ['features', 'formats', 'steps', 'convert'];
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

    // Close services dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (servicesOpen && !event.target.closest('.services-menu')) {
        setServicesOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesOpen]);

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

  const handleServiceSelect = (service) => {
    // You can add logic here to handle service selection
    console.log(`Selected service: ${service}`);
    setServicesOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-white relative'
    }`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" passHref className="my-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <Video className={`h-8 w-8 ${scrolled ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`ml-2 text-xl font-bold ${
                  scrolled 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500'
                }`}>
                  Foxbeep
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Services Dropdown */}
            <div className="relative services-menu">
              <div 
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`${
                  scrolled 
                    ? 'text-blue-100 hover:text-blue-300' 
                    : 'text-blue-800 hover:text-blue-600'
                } inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium cursor-pointer transition-colors`}
              >
                Services
                {servicesOpen ? 
                  <ChevronUp className="ml-1 h-4 w-4" /> : 
                  <ChevronDown className="ml-1 h-4 w-4" />
                }
              </div>
              
              {/* Dropdown menu */}
              {servicesOpen && (
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 ${
                  scrolled ? 'bg-gray-900 ring-1 ring-black ring-opacity-5' : 'bg-white ring-1 ring-black ring-opacity-5'
                }`}>
                  {conversionServices.map((service, index) => (
                    <div
                      key={index}
                      onClick={() => handleServiceSelect(service)}
                      className={`block px-4 py-2 text-sm ${
                        scrolled 
                          ? 'text-blue-100 hover:bg-gray-800' 
                          : 'text-blue-700 hover:bg-gray-100'
                      } cursor-pointer`}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div 
              onClick={() => scrollToSection('features')} 
              className={`${
                activeSection === 'features' 
                  ? (scrolled ? 'text-blue-300 border-blue-500' : 'text-blue-600 border-blue-600') 
                  : (scrolled 
                      ? 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400' 
                      : 'border-transparent text-blue-800 hover:text-blue-600 hover:border-blue-500')
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer transition-colors`}
            >
              Features
            </div>
            
            <div
              onClick={() => scrollToSection('convert')}
              className={`${scrolled ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} 
                px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer`}
            >
              Convert Now
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                scrolled 
                  ? 'bg-blue-900 bg-opacity-20 text-blue-300 hover:bg-blue-800' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              } rounded-md p-2 transition-colors`}
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
        <div className={`px-2 pt-2 pb-3 space-y-1 ${
          scrolled 
            ? 'bg-black bg-opacity-95 backdrop-blur-lg border-t border-blue-900 border-opacity-20' 
            : 'bg-white border-t border-gray-200'
        }`}>
          {/* Services section for mobile */}
          <div>
            <div
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`${
                scrolled 
                  ? 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300' 
                  : 'text-blue-800 hover:bg-blue-50 hover:text-blue-600'
              } flex justify-between items-center px-3 py-2 rounded-md text-base font-medium w-full text-left cursor-pointer`}
            >
              Services
              {servicesOpen ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </div>
            
            {/* Mobile Services dropdown items */}
            {servicesOpen && (
              <div className={`pl-4 pr-2 pb-1 space-y-1 rounded-md mt-1 ${
                scrolled ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'
              }`}>
                {conversionServices.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceSelect(service)}
                    className={`${
                      scrolled 
                        ? 'text-blue-200 hover:text-blue-300' 
                        : 'text-blue-700 hover:text-blue-800'
                    } block px-3 py-2 rounded-md text-sm w-full text-left cursor-pointer`}
                  >
                    {service}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div
            onClick={() => scrollToSection('features')}
            className={`${
              activeSection === 'features' 
                ? (scrolled ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-600 bg-blue-50') 
                : (scrolled 
                    ? 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300' 
                    : 'text-blue-800 hover:bg-blue-50 hover:text-blue-600')
            } block px-3 py-2 rounded-md text-base font-medium w-full text-left cursor-pointer`}
          >
            Features
          </div>
          
          <div
            onClick={() => scrollToSection('convert')}
            className={`${
              scrolled 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } block px-3 py-2 rounded-md text-base font-medium w-full text-center mt-2 cursor-pointer`}
          >
            Convert Now
          </div>
        </div>
      </div>
    </nav>
  );
}
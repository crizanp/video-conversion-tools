import React, { useState, useEffect } from 'react';
import { Video, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useData } from '../../contexts/DataContext'; // Adjust path as needed

export default function ConversionNavbar({ convertLink = "/tools/converter" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Get company data from context
  const { companyData, loading } = useData();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine which section is in view
      const sections = ['features', 'formats', 'steps', 'companies'];
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

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Get dynamic logos with fallback
  const blackLogoUrl = companyData?.blackLogo;
  const regularLogoUrl = companyData?.logo;
  const companyName = companyData?.companyName || 'Foxbeep';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-white relative'
      }`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className='my-auto'>
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                {/* Dynamic Logo - Black logo when not scrolled, regular logo when scrolled */}
                {!scrolled && blackLogoUrl && !loading ? (
                  <img
                    src={blackLogoUrl}
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : scrolled && regularLogoUrl && !loading ? (
                  <img
                    src={regularLogoUrl}
                    alt="Logo"
                    className="h-18 w-auto -ml-8 object-contain"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}

                {/* Fallback Icon - shown when no logo or loading */}
                <Video 
                  className={`h-8 w-8 ${scrolled ? 'text-blue-400' : 'text-blue-600'} ${
                    (!scrolled && blackLogoUrl && !loading) || (scrolled && regularLogoUrl && !loading) ? 'hidden' : 'block'
                  }`} 
                />

                {/* Company Name - shown when using fallback icon or alongside logo */}
                <span className={`ml-2 text-xl font-bold ${scrolled
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500'
                  } ${
                    (!scrolled && blackLogoUrl && !loading) || (scrolled && regularLogoUrl && !loading) ? 'hidden' : 'block'
                  }`}>
                  {companyName}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              href="#features"
              className={`${activeSection === 'features'
                  ? (scrolled ? 'text-blue-300 border-blue-500' : 'text-blue-600 border-blue-600')
                  : (scrolled
                    ? 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'
                    : 'border-transparent text-blue-800 hover:text-blue-600 hover:border-blue-500')
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
            >
              Features
            </Link>
            <Link 
              href="#formats"
              className={`${activeSection === 'formats'
                  ? (scrolled ? 'text-blue-300 border-blue-500' : 'text-blue-600 border-blue-600')
                  : (scrolled
                    ? 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'
                    : 'border-transparent text-blue-800 hover:text-blue-600 hover:border-blue-500')
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
            >
              Formats
            </Link>
            <Link 
              href="#steps"
              className={`${activeSection === 'steps'
                  ? (scrolled ? 'text-blue-300 border-blue-500' : 'text-blue-600 border-blue-600')
                  : (scrolled
                    ? 'border-transparent text-blue-100 hover:text-blue-300 hover:border-blue-400'
                    : 'border-transparent text-blue-800 hover:text-blue-600 hover:border-blue-500')
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
            >
              How To
            </Link>
            <Link 
              href={convertLink}
              className={`${scrolled ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} 
                px-4 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Convert Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled
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
        <div className={`px-2 pt-2 pb-3 space-y-1 ${scrolled
            ? 'bg-black bg-opacity-95 backdrop-blur-lg border-t border-blue-900 border-opacity-20'
            : 'bg-white border-t border-gray-200'
          }`}>
          <Link
            href="#features"
            onClick={closeMobileMenu}
            className={`${activeSection === 'features'
                ? (scrolled ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-600 bg-blue-50')
                : (scrolled
                  ? 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'
                  : 'text-blue-800 hover:bg-blue-50 hover:text-blue-600')
              } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            Features
          </Link>
          <Link
            href="#formats"
            onClick={closeMobileMenu}
            className={`${activeSection === 'formats'
                ? (scrolled ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-600 bg-blue-50')
                : (scrolled
                  ? 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'
                  : 'text-blue-800 hover:bg-blue-50 hover:text-blue-600')
              } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            Formats
          </Link>
          <Link
            href="#steps"
            onClick={closeMobileMenu}
            className={`${activeSection === 'steps'
                ? (scrolled ? 'text-blue-300 bg-blue-900 bg-opacity-20' : 'text-blue-600 bg-blue-50')
                : (scrolled
                  ? 'text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 hover:text-blue-300'
                  : 'text-blue-800 hover:bg-blue-50 hover:text-blue-600')
              } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            How To
          </Link>
          <Link
            href={convertLink}
            onClick={closeMobileMenu}
            className={`${scrolled
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              } block px-3 py-2 rounded-md text-base font-medium w-full text-center mt-2`}
          >
            Convert Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
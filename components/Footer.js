import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useData } from '../contexts/DataContext'; // Adjust path as needed
import Link from 'next/link';

export default function Footer() {
  const { companyData, loading } = useData();

  // Navigation links - you can make these dynamic too if needed
  const navigationLinks = [
    { href: "/tools/mkv-mp4", text: "MKV to MP4" },
    { href: "/tools/avi-mp4", text: "AVI to MP4" },
    { href: "/tools/webm-mp4", text: "WEBM to MP4" },
    { href: "/tools/mov-mp4", text: "MOV to MP4" }
  ];

  // Get company name with fallback
  const companyName = companyData?.companyName || "";
  
  // Get social links with fallbacks
  const socialLinks = {
    facebook: companyData?.socialLinks?.facebook || "#",
    twitter: companyData?.socialLinks?.twitter || "#",
    instagram: companyData?.socialLinks?.instagram || "#",
    linkedin: companyData?.socialLinks?.linkedin || "#"
  };

  return (
    <footer className="bg-black text-gray-300 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
            {navigationLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="hover:text-white transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-5">
            <a 
              href={socialLinks.facebook} 
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href={socialLinks.twitter} 
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a 
              href={socialLinks.instagram} 
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href={socialLinks.linkedin} 
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} <span className="font-medium text-gray-300">{companyName}</span>. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
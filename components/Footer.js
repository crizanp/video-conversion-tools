import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
            <a href="#" className="hover:text-white transition-colors">MP4 to MKV</a>
            <a href="#" className="hover:text-white transition-colors">MP4 to MOV</a>
            <a href="#" className="hover:text-white transition-colors">MP4 to AVI</a>
            <a href="#" className="hover:text-white transition-colors">MP4 to WEBM</a>
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-5">
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} <span className="font-medium text-gray-300">Foxbeep</span>. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

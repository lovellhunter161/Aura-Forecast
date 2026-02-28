import React from 'react';
import { Facebook, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-medium text-white mb-2">Aura Forecast</h2>
          <p className="text-white/50 text-sm flex items-center justify-center md:justify-start">
            Được tạo ra với <Heart className="w-4 h-4 mx-1 text-red-400" /> bởi Ngô Minh Thuận
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a 
            href="https://www.facebook.com/lovelltitussof1910" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-indigo-400 transition-colors flex items-center"
          >
            <Facebook className="w-5 h-5 mr-2" />
            <span className="text-sm">Facebook</span>
          </a>
          <a 
            href="https://www.instagram.com/ngothuanlt_bap/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-pink-400 transition-colors flex items-center"
          >
            <Instagram className="w-5 h-5 mr-2" />
            <span className="text-sm">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

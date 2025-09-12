import React from 'react';
import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react';

export default function Footer() {
  const navigationLinks = [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Jobs', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Accessibility', href: '#' },
    { label: 'Partners', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Links */}
        <div className="flex justify-center mb-8">
          <nav className="flex flex-wrap justify-center gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Telecom Inventory Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


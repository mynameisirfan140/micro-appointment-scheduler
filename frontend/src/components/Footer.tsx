import React from 'react';
import './Footer.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/features', label: 'Features' },
  { href: '/contact', label: 'Contact' }
];

export default function Footer() {
  return (
    <footer className="footer py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-4 md:space-y-0 md:space-x-8">
            <ul className="list-reset">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Micro-Appointment Scheduler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
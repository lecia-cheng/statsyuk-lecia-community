'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <div className="sidebar-logo">
          <div className="logo-circle">S</div>
        </div>
      </div>
      
      {isOpen && (
        <div className="sidebar-content">
          <div className="sidebar-brand">Stickly</div>
          <nav className="sidebar-nav">
            <Link 
              href="/leaderboard" 
              className={`nav-item ${isActive('/leaderboard') ? 'active' : ''}`}
            >
              <div className="nav-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="17" width="5" height="4" rx="0.5"/>
                  <rect x="9.5" y="15" width="5" height="6" rx="0.5"/>
                  <rect x="16" y="13" width="5" height="8" rx="0.5"/>
                </svg>
              </div>
              <span>Leaderboard</span>
            </Link>
            
            <Link 
              href="/groups" 
              className={`nav-item ${isActive('/groups') ? 'active' : ''}`}
            >
              <div className="nav-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="9" cy="7" r="2.5"/>
                  <path d="M9 12c-2.5 0-7 1.2-7 3.5V18h14v-2.5c0-2.3-4.5-3.5-7-3.5z"/>
                  <circle cx="15" cy="7" r="2.5"/>
                  <path d="M15 12c-2.5 0-7 1.2-7 3.5V18h14v-2.5c0-2.3-4.5-3.5-7-3.5z"/>
                </svg>
              </div>
              <span>Groups</span>
            </Link>
            
            <Link 
              href="/community" 
              className={`nav-item ${isActive('/community') ? 'active' : ''}`}
            >
              <div className="nav-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              </div>
              <span>Community</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;


'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import './Groups.css';

interface Club {
  id: number;
  name: string;
  description: string;
  members: number;
  location: string;
  image: string;
}

const Groups: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [joinedClubs, setJoinedClubs] = useState<Set<number>>(new Set());

  // Dummy hockey club data
  const clubs: Club[] = [
    {
      id: 1,
      name: 'Toronto Hockey Elite',
      description: 'Elite players in the Greater Toronto Area. Join us for competitive games and training sessions.',
      members: 1247,
      location: 'Toronto, ON',
      image: '🏒'
    },
    {
      id: 2,
      name: 'Montreal Ice Warriors',
      description: 'Passionate hockey players in Montreal. Weekly games and skill development workshops.',
      members: 892,
      location: 'Montreal, QC',
      image: '⛸️'
    },
    {
      id: 3,
      name: 'Vancouver Coast Hockey',
      description: 'West coast hockey community. Beach hockey in summer, ice hockey in winter.',
      members: 1563,
      location: 'Vancouver, BC',
      image: '🏔️'
    },
    {
      id: 4,
      name: 'Calgary Flames Fan Club',
      description: 'Dedicated Flames fans and players. Watch parties and pickup games.',
      members: 2105,
      location: 'Calgary, AB',
      image: '🔥'
    },
    {
      id: 5,
      name: 'Edmonton Oilers Community',
      description: 'Oilers fans and local players. Join for tournaments and community events.',
      members: 1834,
      location: 'Edmonton, AB',
      image: '🛢️'
    },
    {
      id: 6,
      name: 'Ottawa Senators Network',
      description: 'Senators supporters and recreational players. All skill levels welcome.',
      members: 756,
      location: 'Ottawa, ON',
      image: '🎯'
    },
    {
      id: 7,
      name: 'Winnipeg Jets Flyers',
      description: 'True North strong! Join our community for games, events, and hockey talk.',
      members: 1123,
      location: 'Winnipeg, MB',
      image: '✈️'
    },
    {
      id: 8,
      name: 'Halifax Maritime Hockey',
      description: 'East coast hockey culture. Traditional and modern hockey combined.',
      members: 634,
      location: 'Halifax, NS',
      image: '🌊'
    }
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || club.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const handleJoin = (clubId: number): void => {
    setJoinedClubs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clubId)) {
        newSet.delete(clubId);
      } else {
        newSet.add(clubId);
      }
      return newSet;
    });
  };

  return (
    <div className="groups-page">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <h1 className="page-title">Group</h1>
          <div className="top-bar-right">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for Club"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <button className="profile-button" onClick={() => router.push('/progress')}>
              Profile
            </button>
          </div>
        </div>

        <div className="groups-content">
          <div className="filters-section">
            <h2 className="filters-title">Filters</h2>
            <div className="filters-inputs">
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="filter-input"
              />
              <input
                type="text"
                placeholder="Filter"
                className="filter-input"
              />
            </div>
          </div>

          <div className="clubs-list">
            {filteredClubs.map(club => (
              <div 
                key={club.id} 
                className={`club-card ${joinedClubs.has(club.id) ? 'joined' : ''}`}
              >
                <div className="club-image">
                  <div className="club-image-placeholder">{club.image}</div>
                </div>
                <div className="club-info">
                  <div className="club-name">{club.name}</div>
                  <div className="club-description">{club.description}</div>
                  <div className="club-members">{club.members.toLocaleString()} Members</div>
                  <div className="club-location">{club.location}</div>
                </div>
                <button
                  className={`join-button ${joinedClubs.has(club.id) ? 'joined' : ''}`}
                  onClick={() => handleJoin(club.id)}
                >
                  {joinedClubs.has(club.id) ? 'Joined' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;


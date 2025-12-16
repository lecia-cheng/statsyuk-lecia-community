'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import './Leaderboard.css';

interface Player {
  id: number;
  name: string;
  age: number;
  yearsPlaying: number;
  position: string;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  team: string;
}

const Leaderboard: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dummy hockey player data
  const players: Player[] = [
    {
      id: 1,
      name: 'Connor McDavid',
      age: 27,
      yearsPlaying: 9,
      position: 'C',
      goals: 64,
      assists: 89,
      points: 153,
      plusMinus: 28,
      pim: 18,
      team: 'Edmonton Oilers'
    },
    {
      id: 2,
      name: 'Nathan MacKinnon',
      age: 28,
      yearsPlaying: 11,
      position: 'C',
      goals: 51,
      assists: 87,
      points: 138,
      plusMinus: 35,
      pim: 42,
      team: 'Colorado Avalanche'
    },
    {
      id: 3,
      name: 'Auston Matthews',
      age: 26,
      yearsPlaying: 8,
      position: 'C',
      goals: 69,
      assists: 38,
      points: 107,
      plusMinus: 31,
      pim: 20,
      team: 'Toronto Maple Leafs'
    },
    {
      id: 4,
      name: 'Leon Draisaitl',
      age: 28,
      yearsPlaying: 10,
      position: 'C',
      goals: 41,
      assists: 106,
      points: 147,
      plusMinus: 26,
      pim: 24,
      team: 'Edmonton Oilers'
    },
    {
      id: 5,
      name: 'Artemi Panarin',
      age: 32,
      yearsPlaying: 10,
      position: 'LW',
      goals: 49,
      assists: 71,
      points: 120,
      plusMinus: 14,
      pim: 18,
      team: 'New York Rangers'
    },
    {
      id: 6,
      name: 'David Pastrnak',
      age: 27,
      yearsPlaying: 10,
      position: 'RW',
      goals: 47,
      assists: 63,
      points: 110,
      plusMinus: 17,
      pim: 36,
      team: 'Boston Bruins'
    },
    {
      id: 7,
      name: 'Mikko Rantanen',
      age: 27,
      yearsPlaying: 9,
      position: 'RW',
      goals: 42,
      assists: 62,
      points: 104,
      plusMinus: 25,
      pim: 22,
      team: 'Colorado Avalanche'
    },
    {
      id: 8,
      name: 'Nikita Kucherov',
      age: 30,
      yearsPlaying: 11,
      position: 'RW',
      goals: 44,
      assists: 100,
      points: 144,
      plusMinus: 19,
      pim: 30,
      team: 'Tampa Bay Lightning'
    }
  ];

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredPlayers.slice(0, 3);
  const restPlayers = filteredPlayers.slice(3);

  return (
    <div className="leaderboard-page">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <h1 className="page-title">Leaderboard</h1>
          <div className="top-bar-right">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search players..."
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

        <div className="leaderboard-content">
          <div className="silver-lobby">
            <div className="lobby-header">
              <div className="lobby-title">
                <svg className="lobby-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span>Silver Lobby</span>
              </div>
              <div className="time-frame">
                <svg className="flame-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.7 1.19 1.13 2.55 1.13 4.01 0 2.65-2.15 4.83-4.34 4.83z"/>
                </svg>
                <span>30-90 days</span>
              </div>
            </div>
            <div className="top-three">
              {topThree.map((player, index) => (
                <div key={player.id} className={`top-player ${index === 0 ? 'first-place' : ''}`}>
                  {index === 0 && (
                    <div className="crown-icon">👑</div>
                  )}
                  <div className={`player-avatar ${index === 0 ? 'first-place-avatar' : ''}`}>
                    {player.name.charAt(0)}
                  </div>
                  <div className={`player-name ${index === 0 ? 'first-place-name' : ''}`}>{player.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="player-list">
            {restPlayers.map((player, index) => (
              <div key={player.id} className="player-row">
                <div className="player-rank">{index + 4}</div>
                <div className="player-info">
                  <div className="player-name-main">{player.name}</div>
                  <div className="player-details">
                    <span>Age: {player.age}</span>
                    <span>Years Playing: {player.yearsPlaying}</span>
                    <span>Position: {player.position}</span>
                    <span>Team: {player.team}</span>
                  </div>
                </div>
                <div className="player-stats">
                  <div className="stat-item">
                    <span className="stat-label">G</span>
                    <span className="stat-value">{player.goals}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">A</span>
                    <span className="stat-value">{player.assists}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">P</span>
                    <span className="stat-value">{player.points}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">+/-</span>
                    <span className="stat-value">{player.plusMinus}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">PIM</span>
                    <span className="stat-value">{player.pim}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;


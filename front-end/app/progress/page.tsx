'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './Progress.css';

interface Task {
  id: number;
  text: string;
}

interface PuckPosition {
  id: number;
  x: number;
  y: number;
}

interface ConePosition {
  x: number;
  y: number;
}

const Progress: React.FC = () => {
  const router = useRouter();
  const [selectedPuck, setSelectedPuck] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const tasksCardRef = useRef<HTMLDivElement>(null);

  // Dummy tasks for each puck
  const puckTasks: Record<number, Task[]> = {
    1: [
      { id: 1, text: 'Complete 30 minutes of stickhandling practice' },
      { id: 2, text: 'Watch 2 hockey strategy videos' },
      { id: 3, text: 'Do 50 push-ups' },
      { id: 4, text: 'Review game footage from last match' }
    ],
    2: [
      { id: 1, text: 'Practice shooting for 45 minutes' },
      { id: 2, text: 'Run 3 miles' },
      { id: 3, text: 'Study power play formations' },
      { id: 4, text: 'Stretch for 20 minutes' }
    ],
    3: [
      { id: 1, text: 'On-ice practice session (1 hour)' },
      { id: 2, text: 'Core strength workout' },
      { id: 3, text: 'Review opponent team analysis' },
      { id: 4, text: 'Practice penalty shots' }
    ],
    4: [
      { id: 1, text: 'Agility ladder drills (30 min)' },
      { id: 2, text: 'Watch NHL game highlights' },
      { id: 3, text: 'Practice face-offs' },
      { id: 4, text: 'Leg day workout' }
    ],
    5: [
      { id: 1, text: 'Skating drills on ice' },
      { id: 2, text: 'Cardio session (45 min)' },
      { id: 3, text: 'Team strategy meeting' },
      { id: 4, text: 'Practice passing accuracy' }
    ],
    6: [
      { id: 1, text: 'Puck control exercises' },
      { id: 2, text: 'Upper body strength training' },
      { id: 3, text: 'Study defensive positioning' },
      { id: 4, text: 'Practice breakaway moves' }
    ],
    7: [
      { id: 1, text: 'Full game simulation practice' },
      { id: 2, text: 'Recovery and stretching' },
      { id: 3, text: 'Mental preparation exercises' },
      { id: 4, text: 'Review personal performance metrics' }
    ]
  };

  const handlePuckClick = (puckId: number): void => {
    if (selectedPuck === puckId) {
      setSelectedPuck(null);
    } else {
      setSelectedPuck(puckId);
    }
  };

  const handleTaskToggle = (puckId: number, taskId: number): void => {
    const taskKey = `${puckId}-${taskId}`;
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskKey)) {
        newSet.delete(taskKey);
      } else {
        newSet.add(taskKey);
      }
      return newSet;
    });
  };

  // Close tasks when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (selectedPuck && tasksCardRef.current && !tasksCardRef.current.contains(event.target as Node)) {
        // Check if click is not on a puck
        const target = event.target as HTMLElement;
        if (!target.closest('.puck-group')) {
          setSelectedPuck(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedPuck]);

  // Puck positions along the path (SVG path coordinates)
  const puckPositions: PuckPosition[] = [
    { id: 1, x: 50, y: 150 },
    { id: 2, x: 150, y: 120 },
    { id: 3, x: 250, y: 140 },
    { id: 4, x: 350, y: 110 },
    { id: 5, x: 450, y: 130 },
    { id: 6, x: 550, y: 100 },
    { id: 7, x: 650, y: 120 }
  ];

  const conePositions: ConePosition[] = [
    { x: 100, y: 135 },
    { x: 200, y: 130 },
    { x: 300, y: 125 },
    { x: 500, y: 115 }
  ];

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h1 className="page-title">Viewing Own Progress</h1>
        <div className="top-bar-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <button className="profile-button" onClick={() => router.push('/leaderboard')}>
            Back
          </button>
        </div>
      </div>

      <div className="progress-content">
        <div className="progress-path-container">
          <svg className="progress-path-svg" viewBox="0 0 700 200" preserveAspectRatio="xMidYMid meet">
            {/* Path */}
            <path
              d="M 30 150 Q 100 130 150 120 T 250 140 T 350 110 T 450 130 T 550 100 T 650 120"
              fill="none"
              stroke="#333"
              strokeWidth="3"
              className="progress-path"
            />
            
            {/* Cones */}
            {conePositions.map((cone, index) => (
              <g key={index} transform={`translate(${cone.x}, ${cone.y})`}>
                <polygon
                  points="0,-15 10,5 -10,5"
                  fill="#ff9800"
                  stroke="#333"
                  strokeWidth="2"
                />
              </g>
            ))}
            
            {/* Pucks */}
            {puckPositions.map((puck) => {
              const tasksForPuck = puckTasks[puck.id] || [];
              const allTasksCompleted = tasksForPuck.length > 0 && 
                tasksForPuck.every(task => completedTasks.has(`${puck.id}-${task.id}`));
              
              return (
                <g
                  key={puck.id}
                  className={`puck-group ${selectedPuck === puck.id ? 'selected' : ''} ${allTasksCompleted ? 'completed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePuckClick(puck.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={puck.x}
                    cy={puck.y}
                    r="20"
                    fill={allTasksCompleted ? "#4caf50" : "#333"}
                    stroke="#fff"
                    strokeWidth="2"
                    className="puck"
                  />
                  <text
                    x={puck.x}
                    y={puck.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {puck.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {selectedPuck && (
          <div className="tasks-panel">
            <div className="tasks-card" ref={tasksCardRef}>
              <h2 className="tasks-title">Daily Tasks</h2>
              <div className="tasks-list">
                {puckTasks[selectedPuck].map(task => {
                  const taskKey = `${selectedPuck}-${task.id}`;
                  const isCompleted = completedTasks.has(taskKey);
                  return (
                    <div
                      key={task.id}
                      className={`task-item ${isCompleted ? 'completed' : ''}`}
                      onClick={() => handleTaskToggle(selectedPuck, task.id)}
                    >
                      <div className="task-radio">
                        {isCompleted && <div className="task-radio-fill" />}
                      </div>
                      <span className="task-text">{task.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;


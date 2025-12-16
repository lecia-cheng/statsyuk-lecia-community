# Statsyuk - Hockey Community Platform

A modern hockey community platform built with Next.js 15.2, TypeScript, and Tailwind CSS. Connect with hockey players, track your progress, join clubs, and share your achievements.

## 🏒 Features

### Leaderboard Page
View player statistics and rankings. See your friends and other players' performance metrics including goals, assists, points, plus/minus, and penalty minutes. The top three players are prominently displayed in the "Silver Lobby" section, with the first-place player highlighted with a gold badge and crown icon.

### Progress Page
Track your daily training progress through an interactive path system. Access this page by clicking the "Profile" button from any page. Each day is represented by a puck along your progress path. Click on a puck to view your daily tasks, check them off as you complete them, and watch the puck turn green when all tasks for that day are completed.

### Groups Page
Discover and join hockey community clubs. Browse different clubs based on location, find groups that match your interests, and connect with fellow players. Each club displays member count, location, and description. Join clubs to meet new people, discuss hockey strategies, and improve your game together.

### Community Page
A social media-style feed where you can share your hockey achievements, training updates, and connect with the community. Create posts with text and images, use hashtags to categorize your content, and interact with others through likes and comments. Filter posts by username or sort by most recent, popularity, or most comments.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4
- **Runtime**: Node.js 18+

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Navigate to the front-end directory:
```bash
cd front-end
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
front-end/
├── app/                    # Next.js App Router pages
│   ├── leaderboard/       # Leaderboard page
│   ├── groups/            # Groups/clubs page
│   ├── community/         # Social feed page
│   ├── progress/          # Progress tracking page
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   └── Sidebar.tsx        # Navigation sidebar
└── public/                 # Static assets
```

## 🎯 Key Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Interactive UI with instant feedback
- **Image Upload**: Attach images to your community posts
- **Task Management**: Track daily training tasks with visual progress indicators
- **Social Interaction**: Like posts, join clubs, and connect with the hockey community

## 📝 Notes

- Currently uses mock data for demonstration purposes
- All data is stored locally in component state
- No backend integration required for basic functionality

## 🤝 Contributing

This is a private project. For questions or issues, please contact the repository owner.

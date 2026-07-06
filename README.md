# LvlUp - Gamified Habit Tracker 🎮

A powerful habit tracking app with RPG mechanics inspired by anime and gaming culture. Track your daily tasks, level up, gain stats, and share your progress!

## ✨ Features

### 🎮 RPG Mechanics
- Level up system with XP gains
- Character stats (STR, VIT, AGI, etc.)
- Rank progression (E-Rank to S-Rank)
- Stat point allocation
- Anime-inspired UI with cyberpunk theme

### 📊 Habit Tracking
- Daily recurring tasks
- Task completion tracking
- 14-day analytics dashboard
- Streak counter (current & best)
- Task-stat binding (tasks boost specific stats)

### 🌐 Multi-Platform
- Web app (Vercel)
- iOS app (App Store)
- Android app (Play Store)
- PWA (installable like native app)

### 👥 Social Features
- User authentication & accounts
- Global leaderboards (top performers)
- Friend leaderboards
- Shareable day cards (PNG export)
- Social media sharing (Twitter, Instagram, etc.)

### 💾 Data Management
- Local browser storage
- Cloud sync (Firebase)
- CSV export/backup
- Account system with data privacy

## 🛠 Tech Stack

- **Frontend**: React 18, TailwindCSS, Recharts
- **Mobile**: React Native / Expo
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Deployment**: Vercel (Web), Expo (Mobile)
- **Icons**: Lucide React
- **Charts**: Recharts
- **UI**: Custom anime-inspired design

## 🚀 Quick Start

### Web App
```bash
# Clone the repository
git clone https://github.com/alabnurrrr-creator/LvlUp.git
cd LvlUp/web

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Mobile App (React Native)
```bash
cd LvlUp/mobile

# Install Expo CLI
npm install -g expo-cli

# Install dependencies
npm install

# Start Expo
expo start

# Scan QR code with Expo app or press 'i' for iOS / 'a' for Android
```

## 📁 Project Structure

```
LvlUp/
├── web/                           # React web app
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json         # PWA manifest
│   │   └── service-worker.js     # PWA service worker
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TaskPanel.jsx
│   │   │   ├── StatsPanel.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── ShareCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   ├── firebase.js       # Firebase config
│   │   │   ├── auth.js           # Auth functions
│   │   │   ├── firestore.js      # Firestore functions
│   │   │   └── storage.js        # Data storage
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useUserData.js
│   │   │   └── useLeaderboard.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── export.js
│   │   └── App.jsx
│   ├── package.json
│   └── .env.local
│
├── mobile/                        # React Native app
│   ├── app.json
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── (tabs)/
│   ├── components/
│   ├── services/
│   └── package.json
│
├── shared/                        # Shared code
│   ├── constants.js
│   ├── utils.js
│   ├── hooks/
│   │   ├── useLvlUp.js
│   │   └── useStreak.js
│   └── types.js
│
├── backend/
│   ├── firebase/
│   │   ├── functions/
│   │   │   ├── leaderboard.js
│   │   │   ├── user.js
│   │   │   └── sharing.js
│   │   ├── firestore.rules
│   │   └── storage.rules
│   └── .firebaserc
│
├── docs/
│   ├── DEPLOYMENT.md
│   ├── FIREBASE_SETUP.md
│   └── MOBILE_BUILD.md
│
└── package.json
```

## 🔐 Authentication

- Email/Password signup
- Google OAuth
- Apple Sign In (for iOS)
- Guest mode (local storage only)

## 🏆 Leaderboards

- **Global**: Top 100 players worldwide
- **Weekly**: Resets every Sunday
- **Friends**: Compare with friends
- **Personal Stats**: XP gain, streak, level

## 📤 Sharing

- Export day card as PNG
- Share to Twitter, Instagram, Reddit
- Share progress link with friends
- Leaderboard screenshots

## 🌍 Deployment

### Web (Vercel)
```bash
npm run build
vercel deploy
```

### Mobile
- **iOS**: Built with Expo, submit to App Store
- **Android**: Built with Expo, submit to Play Store

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 📋 Development Roadmap

- [x] Core habit tracker React component
- [x] RPG mechanics system
- [x] Analytics dashboard
- [x] Day card export
- [ ] User authentication (Firebase)
- [ ] Firestore integration
- [ ] Leaderboards system
- [ ] Social sharing
- [ ] PWA configuration
- [ ] React Native setup
- [ ] iOS build & App Store submission
- [ ] Android build & Play Store submission
- [ ] Friend system
- [ ] Achievements/Badges
- [ ] Custom themes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 💬 Support

Have questions or found a bug? [Create an issue](https://github.com/alabnurrrr-creator/LvlUp/issues)

---

Made with ❤️ by [alabnurrrr-creator](https://github.com/alabnurrrr-creator)

**Download on:**
- 🌐 Web: [lvlup.vercel.app](https://lvlup.vercel.app)
- 🍎 iOS: App Store (Coming Soon)
- 🤖 Android: Play Store (Coming Soon)

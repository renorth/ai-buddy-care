# AI Buddy Care 🤖💝

A gamification app that encourages PM teams to increase their AI usage through a Tamagotchi-style buddy care system. Care for your AI buddy by using AI tools daily!

## Features

### Phase 1 (Current - Solo MVP)
- 🤖 **AI Buddy System** - Your personal AI companion that grows with your AI tool usage
- 📊 **Buddy Stats** - Happiness, Health, and Energy stats that reflect your care
- ⭐ **Level Progression** - Buddy evolves through 5 stages from Spark to Oracle
- 🔥 **Streak Tracking** - Build streaks by caring for your buddy daily
- 🏆 **Achievement System** - Unlock 18+ achievements as you progress
- 📝 **Daily Check-ins** - Track AI tool usage with impact and usage type
- 📈 **Activity History** - Review your past care sessions
- 🎨 **Beautiful UI** - Smooth animations and responsive design

### Phase 2 (Coming Soon)
- 👥 **Team Leaderboards** - Compare buddy happiness with teammates
- 🏅 **Weekly Competitions** - Compete in weekly challenges
- 🌐 **Supabase Backend** - Multi-user support with real-time updates
- 🔐 **Microsoft SSO** - Secure authentication for your team

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: localStorage (Phase 1) → Supabase (Phase 2)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-gamification-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## How It Works

### Buddy Care Mechanics

1. **Daily Check-in**: Submit which AI tools you used today
2. **Select Tools**: Choose from Claude Code, Claude, GitHub Copilot, ChatGPT, or other
3. **Usage Types**: Pick what you used AI for (debugging, code generation, etc.)
4. **Impact Level**: Rate the impact (low, medium, high, critical)
5. **Care Benefits**: Your buddy gains happiness, health, and energy

### Stats & Progression

- **Happiness**: Increases when you care for your buddy regularly
- **Health**: Reflects consistent care over time
- **Energy**: Boosted by using multiple AI tools
- **Experience (XP)**: Levels up your buddy through 15 levels and 5 stages

### Streaks & Bonuses

- Maintain daily streaks to earn bonus XP and stats
- Milestones at 3, 7, 14, 30, and 100 days
- Weekend bonus for caring on weekends
- Multi-tool bonus for using multiple AI tools in one day

### Achievements

Unlock achievements by:
- Maintaining streaks
- Using diverse AI tools
- Completing care sessions
- Reaching level milestones
- Making high-impact contributions

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and get your shareable URL!

### Environment Variables (Phase 2)

For Supabase integration:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_USE_BACKEND=true
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main dashboard
│   ├── achievements/      # Achievements page
│   └── leaderboard/       # Leaderboard page
├── components/
│   ├── checkin/           # Daily check-in form
│   ├── gamification/      # Buddy, stats, achievements
│   └── dashboard/         # Dashboard components
├── lib/
│   ├── gamification/      # Core game logic
│   ├── storage/           # Storage adapters
│   ├── hooks/             # React hooks
│   └── store.ts           # Zustand store
├── types/                 # TypeScript types
└── config/                # Game configuration
```

## Customization

### Adjust Game Mechanics

Edit `src/config/gamification.ts` to tweak:
- Tool benefits (happiness, health, energy gains)
- Impact multipliers
- Streak bonuses
- Level thresholds
- Stat decay rates

### Add New Achievements

Edit `src/config/achievements.ts` to add new achievements with custom criteria.

### Customize Buddy Stages

Modify `BUDDY_STAGES` in `src/config/gamification.ts` to change:
- Stage names
- Level requirements
- Emojis
- Descriptions

## Testing Scenarios

### Solo Testing
1. Submit first care session → Should unlock "First Care" achievement
2. Care for 3 consecutive days → Should unlock "Getting Consistent"
3. Use multiple AI tools → Should get multi-tool bonus
4. Miss a day → Buddy should show as sad
5. Return after missing days → Buddy recovers

### Edge Cases
- Try checking in twice in one day (should block)
- Check streak counter on consecutive days
- Verify level-up animation triggers
- Test achievement progress tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Roadmap

### Phase 2 (Week 2)
- [ ] Supabase setup and migration
- [ ] Team leaderboards
- [ ] Real-time updates
- [ ] User profiles

### Phase 3 (Future)
- [ ] Microsoft SSO authentication
- [ ] API integrations for auto-tracking
- [ ] Team challenges
- [ ] Weekly email digests
- [ ] Mobile app

## License

MIT

## Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ to encourage AI adoption and make daily tracking fun!

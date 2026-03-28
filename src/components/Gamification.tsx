import { useState, useEffect } from 'react';
import { Flame, Trophy, Target, Zap, BookOpen, Clock, Star, Award } from 'lucide-react';
import gsap from 'gsap';

interface Achievement {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
  color: string;
}

const Gamification = () => {
  const [streak] = useState(12);
  const [totalRead] = useState(47);
  const [showAchievements, setShowAchievements] = useState(false);

  const achievements: Achievement[] = [
    { id: '1', icon: Flame, title: 'On Fire', description: '7-day reading streak', unlocked: true, color: '#ff6b35' },
    { id: '2', icon: BookOpen, title: 'Bookworm', description: 'Read 25 articles', unlocked: true, color: '#00f5ff' },
    { id: '3', icon: Target, title: 'Goal Crusher', description: 'Read 5 articles in one day', unlocked: true, color: '#a855f7' },
    { id: '4', icon: Zap, title: 'Speed Reader', description: 'Read an article in under 2 minutes', unlocked: false, color: '#ffeb3b' },
    { id: '5', icon: Star, title: 'Night Owl', description: 'Read at midnight', unlocked: false, color: '#ff00ff' },
    { id: '6', icon: Award, title: 'Master', description: 'Read 100 articles', unlocked: false, color: '#00ff88' },
  ];

  useEffect(() => {
    // Animate numbers on mount
    gsap.fromTo('.stat-number',
      { textContent: 0 },
      {
        textContent: (_index: number, target: Element) => {
          const val = target.getAttribute('data-value');
          return val ? parseInt(val) : 0;
        },
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        stagger: 0.2,
      }
    );
  }, []);

  return (
    <div className="bg-tech-surface rounded-2xl p-6 border border-tech-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-oswald text-xl font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-tech-yellow" />
          Your Progress
        </h3>
        <button
          onClick={() => setShowAchievements(!showAchievements)}
          className="text-sm text-tech-cyan hover:underline"
        >
          {showAchievements ? 'Hide' : 'View'} Achievements
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Streak */}
        <div className="text-center p-4 bg-tech-surfaceLight rounded-xl border border-tech-border">
          <div className="streak-counter inline-flex mb-2">
            <Flame className="w-5 h-5 text-tech-orange streak-flame" />
          </div>
          <p className="stat-number font-oswald text-2xl font-bold text-tech-orange" data-value={streak}>
            {streak}
          </p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>

        {/* Articles Read */}
        <div className="text-center p-4 bg-tech-surfaceLight rounded-xl border border-tech-border">
          <BookOpen className="w-5 h-5 text-tech-cyan mx-auto mb-2" />
          <p className="stat-number font-oswald text-2xl font-bold text-tech-cyan" data-value={totalRead}>
            {totalRead}
          </p>
          <p className="text-xs text-gray-500">Articles</p>
        </div>

        {/* Reading Time */}
        <div className="text-center p-4 bg-tech-surfaceLight rounded-xl border border-tech-border">
          <Clock className="w-5 h-5 text-tech-purple mx-auto mb-2" />
          <p className="font-oswald text-2xl font-bold text-tech-purple">
            12<span className="text-sm">h</span>
          </p>
          <p className="text-xs text-gray-500">Read Time</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Level 4</span>
          <span className="text-tech-cyan font-mono">47/50 XP</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '94%' }} />
        </div>
        <p className="text-xs text-gray-500 mt-2">3 more articles to reach Level 5!</p>
      </div>

      {/* Achievements */}
      {showAchievements && (
        <div className="mt-6 pt-6 border-t border-tech-border">
          <h4 className="font-inter font-semibold text-sm mb-4">Achievements</h4>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  achievement.unlocked
                    ? 'bg-tech-surfaceLight border-tech-border'
                    : 'bg-tech-bg border-tech-border opacity-50'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: achievement.unlocked
                      ? `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`
                      : '#1a1a25',
                    border: achievement.unlocked ? `1px solid ${achievement.color}40` : '1px solid #2a2a3a',
                  }}
                >
                  <achievement.icon
                    className="w-5 h-5"
                    style={{ color: achievement.unlocked ? achievement.color : '#4b5563' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {achievement.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamification;

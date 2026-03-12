import { motion } from "framer-motion";
import { getCurrentUser } from "@/lib/auth";
import { BookOpen, Trophy, Brain, Compass, Flame, Star, Award, TrendingUp, Lightbulb } from "lucide-react";

const stats = [
  { label: "Study Hours", value: "142", icon: BookOpen, color: "bg-secondary" },
  { label: "Quiz Score", value: "85%", icon: Trophy, color: "bg-accent" },
  { label: "Summaries", value: "23", icon: Brain, color: "bg-highlight" },
  { label: "Career Paths", value: "4", icon: Compass, color: "bg-rose" },
];

const badges = [
  { name: "Consistency Master", emoji: "🏅", desc: "7-day study streak" },
  { name: "AI Explorer", emoji: "🤖", desc: "Used all AI tools" },
  { name: "Coding Ninja", emoji: "🥷", desc: "90%+ in Programming" },
];

const insights = [
  { text: "You perform best in Programming — keep it up!", icon: TrendingUp },
  { text: "Your study consistency improved by 20% this week.", icon: Lightbulb },
  { text: "Focus more on Mathematics practice for a balanced profile.", icon: Brain },
];

const levels = [
  { name: "Beginner", xp: 50, unlocked: true },
  { name: "Intermediate", xp: 120, unlocked: true },
  { name: "Advanced", xp: 200, unlocked: false },
];

const DashboardHome = () => {
  const user = getCurrentUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          {greeting}, {user?.name?.split(" ")[0] || "Student"} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 hover-lift"
          >
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Gamification */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="font-display font-semibold text-lg mb-4">🎮 Your Progress</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Flame className="w-8 h-8 text-destructive" />
            <div>
              <p className="font-bold text-lg">5 Days</p>
              <p className="text-xs text-muted-foreground">Learning Streak 🔥</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Star className="w-8 h-8 text-accent-foreground" />
            <div>
              <p className="font-bold text-lg">120 XP</p>
              <p className="text-xs text-muted-foreground">Experience Points ⭐</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <p className="font-bold text-lg">3 Badges</p>
              <p className="text-xs text-muted-foreground">Achievements 🏆</p>
            </div>
          </div>
        </div>

        <h3 className="font-display font-medium text-sm mb-3 text-muted-foreground">EARNED BADGES</h3>
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <div key={b.name} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-badge/30 border border-badge/50">
              <span className="text-xl">{b.emoji}</span>
              <div>
                <p className="text-sm font-medium">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display font-semibold text-lg mb-4">🤖 AI Insights</h2>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <ins.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm">{ins.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning Journey */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display font-semibold text-lg mb-4">🗺️ Learning Journey</h2>
          <div className="space-y-4">
            {levels.map((lvl, i) => (
              <div key={lvl.name} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  lvl.unlocked ? "gradient-primary" : "bg-muted"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{lvl.name}</p>
                    <span className="text-xs text-muted-foreground">{lvl.xp} XP</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: lvl.unlocked ? "100%" : "30%" }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                </div>
                {lvl.unlocked && <span className="text-lg">✅</span>}
                {!lvl.unlocked && <span className="text-lg">🔒</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Brain,
  Zap,
  Trophy,
  Star,
  Clock,
  Eye,
  ArrowRight,
  PlayCircle,
  BarChart3,
} from "lucide-react";

interface LiveStats {
  totalProfit: number;
  winRate: number;
  activeGames: number;
  aiAccuracy: number;
  todaysPicks: number;
  liveAlerts: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  gradient: string;
  badge?: string;
}

interface LiveGame {
  id: string;
  teams: string;
  time: string;
  aiPick: string;
  confidence: number;
  status: "live" | "upcoming" | "final";
}

export const UserFriendlyDashboard: React.FC<{
  onNavigate: (page: string) => void;
}> = ({ onNavigate }) => {
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalProfit: 47230,
    winRate: 94.7,
    activeGames: 23,
    aiAccuracy: 97.3,
    todaysPicks: 12,
    liveAlerts: 8,
  });

  const [liveGames] = useState<LiveGame[]>([
    {
      id: "1",
      teams: "Lakers vs Warriors",
      time: "Live - Q3 2:47",
      aiPick: "LeBron Over 25.5 Points ✅",
      confidence: 94.7,
      status: "live",
    },
    {
      id: "2",
      teams: "Chiefs vs Bills",
      time: "Live - Q2 8:23",
      aiPick: "Mahomes Over 275.5 Yards",
      confidence: 91.2,
      status: "live",
    },
    {
      id: "3",
      teams: "Celtics vs Heat",
      time: "Tonight 8:00 PM",
      aiPick: "Tatum Over 27.5 Points",
      confidence: 89.8,
      status: "upcoming",
    },
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        totalProfit: prev.totalProfit + Math.floor(Math.random() * 500 + 100),
        winRate: Math.min(99.9, prev.winRate + (Math.random() - 0.5) * 0.1),
        aiAccuracy: Math.min(
          99.9,
          prev.aiAccuracy + (Math.random() - 0.5) * 0.05,
        ),
        activeGames: Math.max(
          15,
          prev.activeGames + Math.floor(Math.random() * 3 - 1),
        ),
        liveAlerts: Math.max(
          5,
          prev.liveAlerts + Math.floor(Math.random() * 2 - 1),
        ),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: "money-maker",
      title: "Money Maker Pro",
      description: "AI-powered profit generation with quantum enhancement",
      icon: <DollarSign className="w-8 h-8" />,
      action: "money-maker",
      gradient: "from-green-500 to-emerald-500",
      badge: "HOT",
    },
    {
      id: "prizepicks",
      title: "PrizePicks Pro",
      description: "Enhanced player prop analysis with AI recommendations",
      icon: <Trophy className="w-8 h-8" />,
      action: "prizepicks",
      gradient: "from-blue-500 to-cyan-500",
      badge: "NEW",
    },
    {
      id: "propgpt",
      title: "PropGPT Chat",
      description: "Your AI sports betting assistant for instant insights",
      icon: <Brain className="w-8 h-8" />,
      action: "propgpt",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "analytics",
      title: "Live Analytics",
      description: "Real-time data analysis and performance tracking",
      icon: <BarChart3 className="w-8 h-8" />,
      action: "analytics",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const StatCard: React.FC<{
    label: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    live?: boolean;
    color: string;
  }> = ({ label, value, icon, change, live, color }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-20`}
        >
          {icon}
        </div>
        {live && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs text-red-400 font-semibold">LIVE</span>
          </div>
        )}
      </div>

      <div
        className={`text-3xl font-bold mb-2 ${live ? "animate-pulse" : ""} text-white`}
      >
        {value}
      </div>

      <div className="text-gray-400 text-sm mb-2">{label}</div>

      {change && (
        <div className="flex items-center text-xs text-green-400">
          <TrendingUp className="w-3 h-3 mr-1" />
          {change}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-8 animate-slide-in-up">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <div className="text-8xl mb-6 animate-float">💰</div>
          <h1 className="holographic text-6xl font-black mb-6">
            A1BETTING INTELLIGENCE
          </h1>
          <div className="text-6xl font-black text-electric-500 mb-6 animate-cyber-pulse">
            $∞
          </div>
          <p className="text-2xl text-gray-300 mb-8">
            Real-time AI-powered sports analysis with quantum enhancement
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-green-400 font-semibold drop-shadow-lg">
                All Systems Online
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
              <span className="text-blue-400 font-semibold drop-shadow-lg">
                {liveStats.activeGames} Live Games
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
              <span className="text-purple-400 font-semibold drop-shadow-lg">
                Quantum Processing Active
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          label="Total Profit (Today)"
          value={`$${liveStats.totalProfit.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-green-400" />}
          change="+$1.2K (1h)"
          live={true}
          color="from-green-500 to-emerald-500"
        />

        <StatCard
          label="AI Win Rate"
          value={`${liveStats.winRate.toFixed(1)}%`}
          icon={<Target className="w-6 h-6 text-blue-400" />}
          change="+0.3% (24h)"
          live={true}
          color="from-blue-500 to-cyan-500"
        />

        <StatCard
          label="AI Accuracy"
          value={`${liveStats.aiAccuracy.toFixed(1)}%`}
          icon={<Brain className="w-6 h-6 text-purple-400" />}
          change="+0.1% (1h)"
          live={true}
          color="from-purple-500 to-pink-500"
        />

        <StatCard
          label="Live Alerts"
          value={liveStats.liveAlerts}
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          change="+3 new"
          live={true}
          color="from-yellow-500 to-orange-500"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          🎯 Choose Your Path to Profit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onNavigate(action.action)}
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 cursor-pointer transition-all overflow-hidden group"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Badge */}
              {action.badge && (
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 bg-gradient-to-r ${action.gradient} text-white text-xs font-bold rounded-full`}
                  >
                    {action.badge}
                  </div>
                </div>
              )}

              <div className="relative z-10">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${action.gradient} bg-opacity-20 mb-6`}
                >
                  {action.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {action.description}
                </p>

                <div className="flex items-center text-white font-semibold group-hover:text-cyan-400 transition-colors">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Live Games Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            🔴 Live Games & AI Picks
          </h2>
          <div className="flex items-center space-x-2 text-green-400">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Real-time Updates</span>
          </div>
        </div>

        <div className="space-y-4">
          {liveGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-6 rounded-2xl border transition-all ${
                game.status === "live"
                  ? "bg-green-500/10 border-green-500/30"
                  : game.status === "upcoming"
                    ? "bg-blue-500/10 border-blue-500/30"
                    : "bg-gray-500/10 border-gray-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      game.status === "live"
                        ? "bg-green-400 animate-pulse"
                        : game.status === "upcoming"
                          ? "bg-blue-400"
                          : "bg-gray-400"
                    }`}
                  />

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {game.teams}
                    </h3>
                    <p className="text-gray-400 text-sm">{game.time}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-cyan-400 mb-1">
                    {game.aiPick}
                  </div>
                  <div className="text-sm text-green-400">
                    {game.confidence}% AI Confidence
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("analytics")}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>View All Live Analytics</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* AI Status Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          🧠 AI Processing Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-4xl font-black text-purple-400 mb-2">47</div>
            <div className="text-white font-semibold mb-1">Neural Networks</div>
            <div className="text-sm text-green-400">All Active</div>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-4xl font-black text-cyan-400 mb-2">∞</div>
            <div className="text-white font-semibold mb-1">Quantum Qubits</div>
            <div className="text-sm text-green-400">Superposition Active</div>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-4xl font-black text-green-400 mb-2">12ms</div>
            <div className="text-white font-semibold mb-1">
              Processing Speed
            </div>
            <div className="text-sm text-green-400">Lightning Fast</div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-semibold">
              All AI systems operating at peak performance
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserFriendlyDashboard;

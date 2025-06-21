import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  DollarSign,
  Trophy,
  MessageCircle,
  BarChart3,
  Brain,
  Settings,
  User,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";

// Import user-friendly components
import UserFriendlyDashboard from "./UserFriendlyDashboard";
import MoneyMakerPro from "./MoneyMakerPro";
import PrizePicksPro from "./PrizePicksPro";
import PropGPT from "./PropGPT";
// Import advanced dashboard
import UltraAdvancedMLDashboard from "../ml/UltraAdvancedMLDashboard";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: string;
}

interface UserData {
  name: string;
  email: string;
  balance: number;
  tier: string;
  winRate: number;
  totalProfit: number;
}

export const UserFriendlyApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const [user] = useState<UserData>({
    name: "Alex Chen",
    email: "alex@a1betting.com",
    balance: 127430.5,
    tier: "Quantum Pro",
    winRate: 94.7,
    totalProfit: 47230,
  });

  const [liveStats, setLiveStats] = useState({
    liveGames: 23,
    aiAccuracy: 97.3,
    profit24h: 12847,
    activeUsers: 15429,
  });

  // Real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        liveGames: Math.max(
          15,
          prev.liveGames + Math.floor(Math.random() * 3 - 1),
        ),
        aiAccuracy: Math.min(
          99.9,
          prev.aiAccuracy + (Math.random() - 0.5) * 0.1,
        ),
        profit24h: prev.profit24h + Math.floor(Math.random() * 100 + 50),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      component: UserFriendlyDashboard,
    },
    {
      id: "money-maker",
      label: "Money Maker Pro",
      icon: <DollarSign className="w-5 h-5" />,
      component: MoneyMakerPro,
      badge: "HOT",
    },
    {
      id: "prizepicks",
      label: "PrizePicks Pro",
      icon: <Trophy className="w-5 h-5" />,
      component: PrizePicksPro,
      badge: "NEW",
    },
    {
      id: "propgpt",
      label: "PropGPT",
      icon: <MessageCircle className="w-5 h-5" />,
      component: PropGPT,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      component: UserFriendlyDashboard, // Placeholder - will show analytics view
    },
  ];

  const currentItem = navigationItems.find((item) => item.id === currentPage);
  const CurrentComponent = currentItem?.component || UserFriendlyDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Electric Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/10 to-green-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-green-500/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 rounded-xl blur-xl opacity-80 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-md opacity-60" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 via-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 border border-cyan-400/30">
                  <Brain className="w-7 h-7 text-black font-bold drop-shadow-lg" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl relative">
                  <span className="relative z-10">A1BETTING</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text text-transparent blur-sm opacity-50">
                    A1BETTING
                  </div>
                </h1>
                <p className="text-xs text-cyan-300/80 uppercase tracking-wider font-semibold">
                  Quantum Intelligence Platform
                </p>
              </div>

              {/* Live Stats */}
              <div className="hidden lg:flex items-center space-x-6 ml-8">
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-green-400 text-sm font-semibold drop-shadow-lg">
                    {liveStats.liveGames} Live Games
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
                  <span className="text-blue-400 text-sm font-semibold drop-shadow-lg">
                    {liveStats.aiAccuracy.toFixed(1)}% AI Accuracy
                  </span>
                </div>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* Balance & Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
                  <div className="text-xs text-green-300/80 uppercase font-semibold">
                    Balance
                  </div>
                  <div className="font-bold text-green-400 drop-shadow-lg">
                    ${user.balance.toLocaleString()}
                  </div>
                </div>
                <div className="text-center px-4 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
                  <div className="text-xs text-cyan-300/80 uppercase font-semibold">
                    Win Rate
                  </div>
                  <div className="font-bold text-cyan-400 drop-shadow-lg">
                    {user.winRate}%
                  </div>
                </div>
                <div className="text-center px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                  <div className="text-xs text-purple-300/80 uppercase font-semibold">
                    Tier
                  </div>
                  <div className="font-bold text-purple-400 drop-shadow-lg">
                    {user.tier}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Advanced Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                  className={`p-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                    isAdvancedMode
                      ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-500/60 text-cyan-400 shadow-2xl shadow-cyan-500/40"
                      : "bg-gray-800/30 hover:bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30"
                  }`}
                  title={
                    isAdvancedMode
                      ? "Switch to User-Friendly Mode"
                      : "Switch to Advanced Mode"
                  }
                >
                  <span className="text-lg drop-shadow-lg">🔄</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-gray-800/30 border border-gray-600/30 rounded-xl hover:bg-blue-500/20 hover:border-blue-500/40 transition-all backdrop-blur-sm group"
                >
                  <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="relative p-3 bg-gray-800/30 border border-gray-600/30 rounded-xl hover:bg-red-500/20 hover:border-red-500/40 transition-all backdrop-blur-sm group"
                >
                  <Bell className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                  <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                </motion.button>

                {/* User Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-60" />
                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-40" />
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=7c3aed&color=fff&bold=true`}
                      alt="Profile"
                      className="relative w-10 h-10 rounded-full border-2 border-purple-500 shadow-2xl shadow-purple-500/50"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="font-semibold text-white text-sm drop-shadow-lg">
                      {user.name}
                    </div>
                    <div className="text-xs text-cyan-300/80">{user.email}</div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 min-h-screen bg-black/30 backdrop-blur-2xl border-r border-cyan-500/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-green-500/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
          <div className="relative p-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 backdrop-blur-sm ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-500/60 text-cyan-400 shadow-2xl shadow-cyan-500/40"
                      : "text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 border border-transparent"
                  }`}
                >
                  <div
                    className={`${currentPage === item.id ? "text-cyan-400 drop-shadow-lg" : "text-gray-400"} transition-all`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-semibold flex-1 drop-shadow-lg">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold rounded-full shadow-lg shadow-cyan-500/50">
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* AI Status */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-green-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm relative shadow-2xl shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl" />
              <div className="relative">
                <h3 className="font-bold text-purple-400 mb-3 drop-shadow-lg flex items-center gap-2">
                  <span className="text-lg">🧠</span>
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    AI Status
                  </span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-green-300/80 font-medium">
                      Neural Networks
                    </span>
                    <span className="text-green-400 font-bold drop-shadow-lg flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      47 Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                    <span className="text-cyan-300/80 font-medium">
                      Processing Speed
                    </span>
                    <span className="text-cyan-400 font-bold drop-shadow-lg">
                      12ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <span className="text-purple-300/80 font-medium">
                      Quantum Qubits
                    </span>
                    <span className="text-purple-400 font-bold drop-shadow-lg animate-pulse">
                      ∞
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="w-80 h-full bg-slate-900 border-r border-white/10 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all ${
                        currentPage === item.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span className="font-semibold flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={isAdvancedMode ? "advanced" : currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isAdvancedMode ? (
                  <UltraAdvancedMLDashboard />
                ) : (
                  <CurrentComponent onNavigate={setCurrentPage} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold mb-1">
            A1BETTING QUANTUM INTELLIGENCE
          </div>
          © 2024 Advanced Sports Intelligence Platform • Auto-Optimizing AI •
          Real-time Analysis
        </div>
      </footer>
    </div>
  );
};

export default UserFriendlyApp;

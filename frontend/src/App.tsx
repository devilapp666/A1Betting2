import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  DollarSign,
  BarChart3,
  Brain,
  Target,
  Settings,
  User,
  Bell,
  Search,
  Command,
  Menu,
  X,
  ChevronDown,
  Plus,
  Activity,
  TrendingUp,
  Zap,
  Globe,
  Calendar,
  BookOpen,
  HelpCircle,
} from "lucide-react";

// Import providers and utilities
import { SafeThemeProvider } from "./providers/SafeThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";

// Import main page components - Using advanced versions
import EliteFeaturesOverview from "./components/dashboard/EliteFeaturesOverview";
import CyberAnalyticsHub from "./components/cyber/CyberAnalyticsHub";
import CyberUltimateMoneyMaker from "./components/cyber/CyberUltimateMoneyMaker";
import UltraAdvancedMLDashboard from "./components/ml/UltraAdvancedMLDashboard";
import EnhancedRevolutionaryInterface from "./components/revolutionary/EnhancedRevolutionaryInterface";
import UltimateSettingsPage from "./components/settings/UltimateSettingsPage";
import { UnifiedProfile } from "./components/profile/UnifiedProfile";

// Import modern UI components and advanced layout
import ModernCommandPalette from "./components/ui/ModernCommandPalette";
import ModernNotificationCenter from "./components/ui/ModernNotificationCenter";
import CyberLayout from "./components/layout/CyberLayout";
import CyberSidebar from "./components/layout/CyberSidebar";
import CyberHeader from "./components/layout/CyberHeader";

// Import styling
import "./App.css";
import "./styles/enhanced-modern-theme.css";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  shortcut?: string;
  badge?: string;
}

interface UserData {
  name: string;
  email: string;
  tier: string;
  avatar?: string;
  winRate: number;
  totalProfit: number;
  accuracy: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 600000, // Updated from cacheTime
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchInterval: false,
    },
  },
});

const mockUser: UserData = {
  name: "Alex Chen",
  email: "alex@a1betting.com",
  tier: "Pro",
  winRate: 72.4,
  totalProfit: 18000,
  accuracy: 91.5,
};

// Comprehensive Elite Sports Intelligence Platform Navigation
const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Elite Dashboard",
    icon: <Home className="w-5 h-5" />,
    component: EliteFeaturesOverview,
    shortcut: "⌘D",
    badge: "ELITE",
  },
  {
    id: "money-maker",
    label: "Money Maker",
    icon: <DollarSign className="w-5 h-5" />,
    component: CyberUltimateMoneyMaker,
    shortcut: "⌘M",
    badge: "CYBER",
  },
  {
    id: "analytics",
    label: "Analytics Hub",
    icon: <BarChart3 className="w-5 h-5" />,
    component: CyberAnalyticsHub,
    shortcut: "⌘A",
    badge: "PRO",
  },
  {
    id: "ai-predictions",
    label: "AI Predictions",
    icon: <Brain className="w-5 h-5" />,
    component: EnhancedRevolutionaryInterface,
    shortcut: "⌘P",
    badge: "ELITE",
  },
  {
    id: "arbitrage",
    label: "AI Arbitrage",
    icon: <Target className="w-5 h-5" />,
    component: CyberAnalyticsHub, // Using existing component for now
    shortcut: "⌘R",
    badge: "AI",
  },
  {
    id: "ml-center",
    label: "ML Center",
    icon: <Activity className="w-5 h-5" />,
    component: UltraAdvancedMLDashboard,
    shortcut: "⌘L",
    badge: "ML",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    component: UnifiedProfile,
    shortcut: "⌘U",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    component: UltimateSettingsPage,
    shortcut: "⌘,",
  },
];

// ============================================================================
// MODERN SIDEBAR COMPONENT
// ============================================================================

interface SidebarProps {
  activeItem: string;
  onNavigate: (itemId: string) => void;
  user: UserData;
}

const CyberModernSidebar: React.FC<SidebarProps> = ({
  activeItem,
  onNavigate,
  user,
}) => {
  return (
    <aside className="w-72 h-full bg-gradient-to-b from-gray-900/95 to-black/95 border-r border-cyan-500/20 flex flex-col backdrop-blur-xl">
      {/* Cyber Logo Section */}
      <div className="p-6 border-b border-cyan-500/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-75 animate-pulse" />
            <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-black font-bold" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              A1BETTING
            </div>
            <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">
              Quantum Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats with Glow Effects */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 rounded-lg bg-gradient-to-b from-emerald-500/20 to-green-600/20 border border-emerald-500/30"
          >
            <p className="text-xl font-bold text-emerald-400">
              {user.winRate}%
            </p>
            <p className="text-xs text-emerald-300 font-medium">Win Rate</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 rounded-lg bg-gradient-to-b from-cyan-500/20 to-blue-600/20 border border-cyan-500/30"
          >
            <p className="text-xl font-bold text-cyan-400">
              ${(user.totalProfit / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-cyan-300 font-medium">Profit</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 rounded-lg bg-gradient-to-b from-purple-500/20 to-violet-600/20 border border-purple-500/30"
          >
            <p className="text-xl font-bold text-purple-400">
              {user.accuracy}%
            </p>
            <p className="text-xs text-purple-300 font-medium">Accuracy</p>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Navigation with Feature Categories */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 px-2">
            Core Platform
          </div>
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4, scale: 1.02 }}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 group
                ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-cyan-500/10 hover:text-cyan-300 hover:border hover:border-cyan-500/30"
                }
              `}
            >
              <div
                className={`${activeItem === item.id ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"} transition-colors`}
              >
                {item.icon}
              </div>
              <span className="font-semibold text-sm flex-1">{item.label}</span>

              {item.badge && (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold rounded-full"
                >
                  {item.badge}
                </motion.span>
              )}

              {item.shortcut && (
                <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-1.5 py-0.5 rounded border border-gray-700">
                  {item.shortcut}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Additional Features from Error Screen */}
        <div className="border-t border-cyan-500/20 pt-4">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 px-2">
            Elite Features
          </div>
          <div className="space-y-1">
            {[
              { name: "Business Analysis", icon: "📊", status: "active" },
              { name: "AI Edge ML", icon: "🧠", status: "active" },
              { name: "Mega Sports", icon: "⚡", status: "pro" },
              { name: "Elite Bankroll", icon: "💰", status: "premium" },
              { name: "SQL Sports", icon: "🔍", status: "active" },
              { name: "Model Analysis", icon: "📈", status: "ai" },
              { name: "Market Connector", icon: "🔗", status: "live" },
              { name: "Real Simulator", icon: "🎮", status: "beta" },
            ].map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group"
              >
                <span className="text-sm">{feature.icon}</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 flex-1">
                  {feature.name}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    feature.status === "active"
                      ? "bg-green-400"
                      : feature.status === "pro"
                        ? "bg-purple-400"
                        : feature.status === "premium"
                          ? "bg-yellow-400"
                          : feature.status === "ai"
                            ? "bg-cyan-400"
                            : feature.status === "live"
                              ? "bg-red-400 animate-pulse"
                              : "bg-orange-400"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* Enhanced User Section */}
      <div className="p-4 border-t border-cyan-500/20">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-cyan-500/30 cursor-pointer transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs text-cyan-400 font-medium">
              {user.tier} Member
            </p>
          </div>
          <motion.div whileHover={{ rotate: 180 }}>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </aside>
  );
};

// ============================================================================
// MODERN TOP BAR COMPONENT
// ============================================================================

interface TopBarProps {
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  currentPage: string;
}

const CyberTopBar: React.FC<TopBarProps> = ({
  onOpenCommandPalette,
  onOpenNotifications,
  currentPage,
}) => {
  const currentItem = navigationItems.find((item) => item.id === currentPage);

  return (
    <header className="h-20 bg-gradient-to-r from-gray-900/95 to-black/95 border-b border-cyan-500/30 flex items-center justify-between px-8 backdrop-blur-xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 animate-pulse pointer-events-none" />
      {/* Left Section - Enhanced */}
      <div className="relative z-10 flex items-center gap-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`
              p-3 rounded-xl relative overflow-hidden
              ${
                currentPage === "dashboard"
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50"
                  : currentPage === "money-maker"
                    ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/50"
                    : currentPage === "analytics"
                      ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/50"
                      : currentPage === "predictions"
                        ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50"
                        : "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/50"
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            <div className="relative text-cyan-400">{currentItem?.icon}</div>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {currentItem?.label}
            </h1>
            <p className="text-sm text-cyan-300/80 font-medium">
              {currentPage === "dashboard" && "Ultra-Advanced ML Intelligence"}
              {currentPage === "money-maker" && "Cyber Quantum Money Generator"}
              {currentPage === "analytics" && "Elite Neural Analytics Hub"}
              {currentPage === "predictions" && "Revolutionary AI Predictions"}
              {currentPage === "settings" && "Quantum Configuration Portal"}
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-400 font-semibold">LIVE</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-semibold">
              47 Models Active
            </span>
          </div>
        </div>
      </div>

      {/* Right Section - Enhanced */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Enhanced Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-cyan-500/20 hover:to-blue-500/20 border border-gray-700/50 hover:border-cyan-500/50 rounded-xl transition-all duration-300"
        >
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300">Quantum Search...</span>
          <span className="text-xs text-cyan-400 font-mono bg-gray-800 px-2 py-1 rounded border border-gray-600">
            ⌘K
          </span>
        </motion.button>

        {/* Enhanced Action Buttons */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="p-3 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-emerald-500/20 hover:to-green-500/20 border border-gray-700/50 hover:border-emerald-500/50 rounded-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 text-gray-400 hover:text-emerald-400" />
        </motion.button>

        {/* Enhanced Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenNotifications}
          className="relative p-3 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-orange-500/20 hover:to-red-500/20 border border-gray-700/50 hover:border-orange-500/50 rounded-xl transition-all duration-300"
        >
          <Bell className="w-5 h-5 text-gray-400 hover:text-orange-400" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full border-2 border-gray-900"
          />
        </motion.button>

        {/* Enhanced Help */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          className="p-3 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-purple-500/20 hover:to-violet-500/20 border border-gray-700/50 hover:border-purple-500/50 rounded-xl transition-all duration-300"
        >
          <HelpCircle className="w-5 h-5 text-gray-400 hover:text-purple-400" />
        </motion.button>
      </div>
    </header>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const AppContent: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // App initialization
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        setIsNotificationCenterOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        setActiveNavItem("dashboard");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "m") {
        e.preventDefault();
        setActiveNavItem("money-maker");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        setActiveNavItem("analytics");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        setActiveNavItem("predictions");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ",") {
        e.preventDefault();
        setActiveNavItem("settings");
      }
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
        setIsNotificationCenterOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeComponent = navigationItems.find(
    (item) => item.id === activeNavItem,
  )?.component;
  const ActiveComponent = activeComponent || EliteFeaturesOverview;

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-12 h-12 text-black animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            A1BETTING
          </h1>
          <p className="text-cyan-400 text-lg font-semibold uppercase tracking-widest">
            Elite Sports Intelligence Platform
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-cyan-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex"
    >
      {/* Cyber Modern Sidebar */}
      <CyberModernSidebar
        activeItem={activeNavItem}
        onNavigate={setActiveNavItem}
        user={mockUser}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Cyber Top Navigation Bar */}
        <CyberTopBar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationCenterOpen(true)}
          currentPage={activeNavItem}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm relative">
          {/* Animated background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,255,165,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,255,165,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

          <ErrorBoundary>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 p-8"
            >
              <ActiveComponent />
            </motion.div>
          </ErrorBoundary>
        </main>
      </div>

      {/* Command Palette */}
      <ModernCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        navigationItems={navigationItems}
        onNavigate={setActiveNavItem}
      />

      {/* Notification Center */}
      <ModernNotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
      />
    </motion.div>
  );
};

// ============================================================================
// APP WRAPPER
// ============================================================================

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeThemeProvider>
          <AppContent />
        </SafeThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

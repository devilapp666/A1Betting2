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
import CyberAnalyticsHub from "./components/cyber/CyberAnalyticsHub";
import CyberUltimateMoneyMaker from "./components/cyber/CyberUltimateMoneyMaker";
import UltraAdvancedMLDashboard from "./components/ml/UltraAdvancedMLDashboard";
import EnhancedRevolutionaryInterface from "./components/revolutionary/EnhancedRevolutionaryInterface";
import UltimateSettingsPage from "./components/settings/UltimateSettingsPage";
import UnifiedProfile from "./components/profile/UnifiedProfile";

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

// Advanced navigation with ultra-premium components
const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "ML Dashboard",
    icon: <Brain className="w-5 h-5" />,
    component: UltraAdvancedMLDashboard,
    shortcut: "⌘D",
    badge: "ULTRA",
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
    id: "predictions",
    label: "Revolutionary AI",
    icon: <Zap className="w-5 h-5" />,
    component: EnhancedRevolutionaryInterface,
    shortcut: "⌘P",
    badge: "ELITE",
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

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
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

const ModernTopBar: React.FC<TopBarProps> = ({
  onOpenCommandPalette,
  onOpenNotifications,
  currentPage,
}) => {
  const currentItem = navigationItems.find((item) => item.id === currentPage);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`
            p-2 rounded-lg
            ${
              currentPage === "dashboard"
                ? "bg-blue-50 text-blue-600"
                : currentPage === "money-maker"
                  ? "bg-green-50 text-green-600"
                  : currentPage === "analytics"
                    ? "bg-purple-50 text-purple-600"
                    : currentPage === "predictions"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-gray-50 text-gray-600"
            }
          `}
          >
            {currentItem?.icon}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {currentItem?.label}
            </h1>
            <p className="text-sm text-gray-500">
              {currentPage === "dashboard" &&
                "Real-time insights and performance metrics"}
              {currentPage === "money-maker" &&
                "AI-powered betting opportunities"}
              {currentPage === "analytics" &&
                "Advanced data analysis and trends"}
              {currentPage === "predictions" && "Machine learning predictions"}
              {currentPage === "settings" && "Configure your preferences"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Search className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">Search...</span>
          <span className="text-xs text-gray-400 font-mono ml-auto">⌘K</span>
        </button>

        {/* Quick Actions */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Help */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>
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
  const ActiveComponent = activeComponent || ConsolidatedUniversalDashboard;

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex">
      {/* Cyber Modern Sidebar */}
      <CyberModernSidebar
        activeItem={activeNavItem}
        onNavigate={setActiveNavItem}
        user={mockUser}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <ModernTopBar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationCenterOpen(true)}
          currentPage={activeNavItem}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <ErrorBoundary>
            <ActiveComponent />
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
    </div>
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

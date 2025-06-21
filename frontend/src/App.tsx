import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  Brain,
  Target,
  Settings,
  User,
  Activity,
  TrendingUp,
  Shield,
  Bell,
  Search,
  Command,
  Menu,
  X,
} from "lucide-react";

// Import providers and utilities
import { SafeThemeProvider, useTheme } from "./providers/SafeThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { initializeMUIClickPatch } from "./utils/muiClickPatch";

// Import main page components
import ConsolidatedUniversalDashboard from "./components/dashboard/ConsolidatedUniversalDashboard";
import ConsolidatedUniversalMoneyMaker from "./components/moneymaker/ConsolidatedUniversalMoneyMaker";
import ConsolidatedUniversalAnalytics from "./components/analytics/ConsolidatedUniversalAnalytics";
import UniversalPredictions from "./components/predictions/UniversalPredictions";
import UltimateSettingsPage from "./components/settings/UltimateSettingsPage";
import ProfilePage from "./components/profile/ProfilePage";

// Import modern UI components
import ModernCommandPalette from "./components/ui/ModernCommandPalette";
import ModernNotificationCenter from "./components/ui/ModernNotificationCenter";

// Import styling
import "./App.css";
import "./styles/enhanced-modern-theme.css";
import "./styles/enhanced-cyber-theme.css";
import "./styles/cyber-theme-override.css";
import "./styles/global-cyber-theme.css";
import "./styles/cyber-theme.css";
import "./styles/prototype-override.css";
import "./styles/force-prototype.css";
import "./styles/enhanced-animations.css";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  category?: string;
  isPremium?: boolean;
  badge?: string;
}

interface UserData {
  name: string;
  email: string;
  tier: string;
  avatar?: string;
  balance: number;
  totalProfit: number;
  accuracy: number;
  winRate: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchInterval: false,
    },
  },
});

// Mock user data
const mockUser: UserData = {
  name: "Alex Chen",
  email: "alex@a1betting.com",
  tier: "Pro",
  balance: 127430.5,
  totalProfit: 47230,
  accuracy: 89.3,
  winRate: 85.6,
};

// Navigation configuration
const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BarChart3 size={20} />,
    component: ConsolidatedUniversalDashboard,
    category: "main",
  },
  {
    id: "moneymaker",
    label: "Money Maker",
    icon: <DollarSign size={20} />,
    component: ConsolidatedUniversalMoneyMaker,
    category: "main",
    isPremium: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <TrendingUp size={20} />,
    component: ConsolidatedUniversalAnalytics,
    category: "main",
    isPremium: true,
  },
  {
    id: "predictions",
    label: "Predictions",
    icon: <Brain size={20} />,
    component: UniversalPredictions,
    category: "main",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={20} />,
    component: UltimateSettingsPage,
    category: "account",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User size={20} />,
    component: ProfilePage,
    category: "account",
  },
];

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onToggle: () => void;
  user: UserData;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  currentPage,
  onNavigate,
  onToggle,
  user,
}) => {
  const mainItems = navigationItems.filter((item) => item.category === "main");
  const accountItems = navigationItems.filter(
    (item) => item.category === "account",
  );

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      className="relative h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A1</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">A1Betting</h1>
                  <p className="text-gray-400 text-xs">
                    AI Sports Intelligence
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          {isOpen && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main
            </h3>
          )}
          <div className="space-y-1">
            {mainItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all
                  ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }
                `}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between w-full"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.isPremium && (
                        <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded font-bold">
                          PRO
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>

        {/* Account Navigation */}
        <div>
          {isOpen && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Account
            </h3>
          )}
          <div className="space-y-1">
            {accountItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all
                  ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }
                `}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800/50">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {user.name}
                </p>
                <p className="text-gray-400 text-xs">{user.tier} Plan</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ============================================================================
// HEADER COMPONENT
// ============================================================================

interface HeaderProps {
  currentPage: string;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onOpenCommandPalette,
  onOpenNotifications,
}) => {
  const currentItem = navigationItems.find((item) => item.id === currentPage);

  return (
    <div className="h-16 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
      <div className="h-full flex items-center justify-between px-6">
        {/* Page Title */}
        <div className="flex items-center space-x-3">
          <div className="text-gray-400">{currentItem?.icon}</div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {currentItem?.label}
            </h1>
            <p className="text-sm text-gray-400">
              AI-Powered Sports Intelligence Platform
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg transition-all group"
          >
            <Search
              size={14}
              className="text-gray-400 group-hover:text-white"
            />
            <span className="text-sm text-gray-400 group-hover:text-white">
              Search...
            </span>
            <kbd className="px-1.5 py-0.5 bg-gray-700 text-gray-400 rounded text-xs">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <Bell size={18} className="text-gray-400 hover:text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </div>
          </button>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);

  // Global keyboard shortcuts
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
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
        setIsNotificationCenterOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const CurrentComponent =
    navigationItems.find((item) => item.id === currentPage)?.component ||
    ConsolidatedUniversalDashboard;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-gray-950 text-white flex overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          user={mockUser}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Header */}
          <Header
            currentPage={currentPage}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenNotifications={() => setIsNotificationCenterOpen(true)}
          />

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <ErrorBoundary>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CurrentComponent
                      variant="cyber"
                      layout="tabs"
                      features={{
                        realTime: true,
                        moneyMaker: true,
                        analytics: true,
                        arbitrage: true,
                        prizePicks: true,
                        espnNews: true,
                        modelPerformance: true,
                        liveOdds: true,
                        userStats: true,
                        performanceMetrics: true,
                        mlInsights: true,
                        entryTracking: true,
                        propCards: true,
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </ErrorBoundary>
            </div>
          </div>
        </div>

        {/* Modern Overlays */}
        <ModernCommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(page) => {
            handleNavigate(page);
            setIsCommandPaletteOpen(false);
          }}
        />

        <ModernNotificationCenter
          isOpen={isNotificationCenterOpen}
          onClose={() => setIsNotificationCenterOpen(false)}
          onMarkAsRead={(id) => console.log("Mark as read:", id)}
          onDelete={(id) => console.log("Delete:", id)}
          onClearAll={() => console.log("Clear all")}
        />
      </div>
    </QueryClientProvider>
  );
};

// ============================================================================
// ROOT APP COMPONENT
// ============================================================================

function App() {
  useEffect(() => {
    initializeMUIClickPatch();

    const handleGlobalError = (event: ErrorEvent) => {
      if (event.error?.message?.includes("onClick is not a function")) {
        console.warn("onClick error caught and handled:", event.error);
        event.preventDefault();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("Network Error")) {
        console.warn("Network error caught and handled:", event.reason);
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return (
    <ErrorBoundary>
      <SafeThemeProvider defaultVariant="cyber-light" enablePersistence={true}>
        <AppContent />
      </SafeThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

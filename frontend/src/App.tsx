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
  Zap,
  Eye,
  Gamepad2,
  Cpu,
  LineChart,
  Globe,
  Clock,
  Sun,
  Cloud,
  Thermometer,
  Wind,
  Database,
  Radio,
  Monitor,
  Layers,
  Filter,
  BarChart,
  PieChart,
  Calendar,
  Star,
  Trophy,
  Bookmark,
  Flame,
  FlashZolt,
  Lightning,
  Home,
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
  isSubItem?: boolean;
  parentId?: string;
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
  accuracy: 94.2,
  winRate: 72.4,
};

// ============================================================================
// COMPREHENSIVE NAVIGATION CONFIGURATION
// ============================================================================

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    component: ConsolidatedUniversalDashboard,
    category: "main",
  },
  {
    id: "money-maker",
    label: "Money Maker",
    icon: <DollarSign className="w-5 h-5" />,
    component: ConsolidatedUniversalMoneyMaker,
    category: "main",
    badge: "HOT",
  },

  // ANALYTICS SECTION
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "analytics",
  },
  {
    id: "market-analytics",
    label: "Market Analytics",
    icon: <LineChart className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "analytics",
    isSubItem: true,
    parentId: "analytics",
  },
  {
    id: "advanced-analytics",
    label: "Advanced Analytics",
    icon: <Brain className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "analytics",
    isSubItem: true,
    parentId: "analytics",
  },

  // PREDICTIONS SECTION
  {
    id: "predictions",
    label: "Predictions",
    icon: <Target className="w-5 h-5" />,
    component: UniversalPredictions,
    category: "predictions",
  },
  {
    id: "livequickpicks",
    label: "LiveQuickPicks",
    icon: <Lightning className="w-5 h-5" />,
    component: UniversalPredictions,
    category: "predictions",
    isSubItem: true,
    parentId: "predictions",
    badge: "LIVE",
  },
  {
    id: "quantum-predictions",
    label: "Quantum Predictions",
    icon: <Cpu className="w-5 h-5" />,
    component: UniversalPredictions,
    category: "predictions",
    isSubItem: true,
    parentId: "predictions",
    isPremium: true,
  },
  {
    id: "live-simulations",
    label: "Live Simulations",
    icon: <Gamepad2 className="w-5 h-5" />,
    component: UniversalPredictions,
    category: "predictions",
    isSubItem: true,
    parentId: "predictions",
  },
  {
    id: "strategy-engine",
    label: "Strategy Engine",
    icon: <Shield className="w-5 h-5" />,
    component: UniversalPredictions,
    category: "predictions",
    isSubItem: true,
    parentId: "predictions",
  },

  // MONEY MAKERS SECTION
  {
    id: "money-makers",
    label: "Money Makers",
    icon: <Star className="w-5 h-5" />,
    component: ConsolidatedUniversalMoneyMaker,
    category: "money",
    isSubItem: true,
    parentId: "money-maker",
  },
  {
    id: "advanced-spec",
    label: "Advanced/Spec",
    icon: <Zap className="w-5 h-5" />,
    component: ConsolidatedUniversalMoneyMaker,
    category: "money",
    isSubItem: true,
    parentId: "money-maker",
    isPremium: true,
  },

  // PLAYTEXT SECTION
  {
    id: "playtext",
    label: "PLAYTEXT",
    icon: <Monitor className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
  },
  {
    id: "nfl",
    label: "NFL",
    icon: <Trophy className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
    isSubItem: true,
    parentId: "playtext",
  },
  {
    id: "nba",
    label: "NBA",
    icon: <Activity className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
    isSubItem: true,
    parentId: "playtext",
  },
  {
    id: "mlb",
    label: "MLB",
    icon: <Target className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
    isSubItem: true,
    parentId: "playtext",
  },
  {
    id: "pga",
    label: "PGA",
    icon: <Flame className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
    isSubItem: true,
    parentId: "playtext",
  },
  {
    id: "soccer",
    label: "SOCCER",
    icon: <Globe className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
    isSubItem: true,
    parentId: "playtext",
  },
  {
    id: "ncaa",
    label: "NCAA",
    icon: <Bookmark className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "playtext",
    isSubItem: true,
    parentId: "playtext",
  },

  // INJURIES SECTION
  {
    id: "injuries",
    label: "INJURIES",
    icon: <Shield className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "injuries",
  },
  {
    id: "nfl-inj",
    label: "NFL",
    icon: <Trophy className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "injuries",
    isSubItem: true,
    parentId: "injuries",
  },
  {
    id: "nba-inj",
    label: "NBA",
    icon: <Activity className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "injuries",
    isSubItem: true,
    parentId: "injuries",
  },

  // WEATHER SECTION
  {
    id: "weather",
    label: "WEATHER",
    icon: <Cloud className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "weather",
  },
  {
    id: "current",
    label: "CURRENT",
    icon: <Sun className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "weather",
    isSubItem: true,
    parentId: "weather",
  },
  {
    id: "forecast",
    label: "FORECAST",
    icon: <Wind className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "weather",
    isSubItem: true,
    parentId: "weather",
  },
  {
    id: "historical",
    label: "HISTORICAL",
    icon: <Calendar className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "weather",
    isSubItem: true,
    parentId: "weather",
  },

  // REAL TIME SECTION
  {
    id: "realtime",
    label: "REAL TIME",
    icon: <Radio className="w-5 h-5" />,
    component: ConsolidatedUniversalDashboard,
    category: "realtime",
    badge: "LIVE",
  },
  {
    id: "scores",
    label: "SCORES",
    icon: <BarChart className="w-5 h-5" />,
    component: ConsolidatedUniversalDashboard,
    category: "realtime",
    isSubItem: true,
    parentId: "realtime",
  },
  {
    id: "odds",
    label: "ODDS",
    icon: <TrendingUp className="w-5 h-5" />,
    component: ConsolidatedUniversalDashboard,
    category: "realtime",
    isSubItem: true,
    parentId: "realtime",
  },
  {
    id: "lineups",
    label: "LINEUPS",
    icon: <Layers className="w-5 h-5" />,
    component: ConsolidatedUniversalDashboard,
    category: "realtime",
    isSubItem: true,
    parentId: "realtime",
  },

  // ANALYTICS DETAILED SECTION
  {
    id: "analytics-detailed",
    label: "ANALYTICS",
    icon: <PieChart className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "analytics-detailed",
  },
  {
    id: "dashboard-analytics",
    label: "DASHBOARD",
    icon: <Monitor className="w-5 h-5" />,
    component: ConsolidatedUniversalAnalytics,
    category: "analytics-detailed",
    isSubItem: true,
    parentId: "analytics-detailed",
  },

  // USER SECTION
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    component: ProfilePage,
    category: "user",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    component: UltimateSettingsPage,
    category: "user",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AppContent: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["main", "analytics", "predictions"]),
  );

  // Initialize MUI click patch
  useEffect(() => {
    initializeMUIClickPatch();
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

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = activeNavItem === item.id;
    const isExpanded = expandedCategories.has(item.id);
    const hasChildren = navigationItems.some(
      (navItem) => navItem.parentId === item.id,
    );
    const isChildVisible = item.parentId
      ? expandedCategories.has(item.parentId)
      : true;

    if (!isChildVisible) return null;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`${item.isSubItem ? "ml-6" : ""}`}
      >
        <div
          onClick={() => {
            if (hasChildren) {
              toggleCategory(item.id);
            } else {
              setActiveNavItem(item.id);
            }
          }}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
            ${
              isActive
                ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white shadow-lg shadow-purple-500/10"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }
            ${item.isSubItem ? "text-sm py-2" : ""}
          `}
        >
          <div
            className={`
            flex items-center justify-center rounded-lg transition-all duration-200
            ${isActive ? "text-purple-400" : "text-gray-400"}
            ${item.isSubItem ? "w-4 h-4" : "w-5 h-5"}
          `}
          >
            {item.icon}
          </div>

          {!isSidebarCollapsed && (
            <>
              <span
                className={`font-medium ${item.isSubItem ? "text-xs" : "text-sm"}`}
              >
                {item.label}
              </span>

              {item.badge && (
                <span
                  className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${
                    item.badge === "HOT"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : item.badge === "LIVE"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  }
                `}
                >
                  {item.badge}
                </span>
              )}

              {item.isPremium && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  PRO
                </span>
              )}

              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-auto"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Enhanced Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-gray-900/90 backdrop-blur-xl border-r border-gray-800/50 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-800/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  A1 Sports Intelligence
                </h1>
                <p className="text-xs text-gray-400">Advanced ML Predictions</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="ml-auto p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          {!isSidebarCollapsed && (
            <div className="p-4 border-b border-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {mockUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {mockUser.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {mockUser.tier} Member
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Win Rate</p>
                  <p className="text-sm font-bold text-green-400">
                    {mockUser.winRate}%
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Accuracy</p>
                  <p className="text-sm font-bold text-purple-400">
                    {mockUser.accuracy}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item) => renderNavigationItem(item))}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-800/50">
            {!isSidebarCollapsed && (
              <div className="space-y-2">
                <button
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Command className="w-4 h-4" />
                  <span className="text-sm">Command Palette</span>
                  <span className="ml-auto text-xs text-gray-500">⌘K</span>
                </button>

                <button
                  onClick={() => setIsNotificationCenterOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        <div className="min-h-screen">
          <ErrorBoundary>
            <ActiveComponent />
          </ErrorBoundary>
        </div>
      </main>

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

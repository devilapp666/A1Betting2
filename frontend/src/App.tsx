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

// Import modern UI components
import ModernCommandPalette from "./components/ui/ModernCommandPalette";
import ModernNotificationCenter from "./components/ui/ModernNotificationCenter";

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

const ModernSidebar: React.FC<SidebarProps> = ({
  activeItem,
  onNavigate,
  user,
}) => {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">A1 Sports</h1>
            <p className="text-xs text-gray-500">Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{user.winRate}%</p>
            <p className="text-xs text-gray-500">Win Rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">
              ${(user.totalProfit / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-500">Profit</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">
              {user.accuracy}%
            </p>
            <p className="text-xs text-gray-500">Accuracy</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150
                ${
                  activeItem === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <div
                className={`
                ${activeItem === item.id ? "text-blue-600" : "text-gray-500"}
              `}
              >
                {item.icon}
              </div>
              <span className="font-medium text-sm flex-1">{item.label}</span>

              {item.badge && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {item.badge}
                </span>
              )}

              {item.shortcut && (
                <span className="text-xs text-gray-400 font-mono">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.tier} Member</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
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
    <div className="h-screen bg-gray-50 flex">
      {/* Modern Sidebar */}
      <ModernSidebar
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

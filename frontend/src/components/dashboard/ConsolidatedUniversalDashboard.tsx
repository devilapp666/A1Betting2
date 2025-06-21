import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Menu,
  X,
  Brain,
  TrendingUp,
  BarChart3,
  Activity,
  Shield,
  Zap,
  Target,
  DollarSign,
  RefreshCw,
  Search,
  Bell,
  Settings,
  User,
  Home,
  Wifi,
  WifiOff,
  Eye,
  Trophy,
  Flame,
  Star,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  PlayCircle,
  AlertTriangle,
  CheckCircle,
  Filter,
  MoreHorizontal,
} from "lucide-react";

// UI Components
import { MegaButton, MegaCard, MegaInput } from "../mega/MegaUI";
import { CyberText, CyberContainer, CYBER_COLORS } from "../mega/CyberTheme";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/Skeleton";
import { Toast } from "../ui/UnifiedUI";
import { FeatureFlagIndicators } from "../ui/FeatureFlagIndicators";
import { ServiceStatusIndicators } from "../ui/ServiceStatusIndicators";
import ErrorBoundary from "../ErrorBoundary";

// Components (restored from original)
import PerformanceAnalyticsDashboard from "../analytics/PerformanceAnalyticsDashboard";
import UniversalMoneyMaker from "../moneymaker/UniversalMoneyMaker";
import UnifiedProfile from "../profile/UnifiedProfile";
import UnifiedSettingsInterface from "../settings/UnifiedSettingsInterface";
import UnifiedStrategyEngineDisplay from "../strategy/UnifiedStrategyEngineDisplay";
import PropCards from "../modern/PropCards";
import MLInsights from "../insights/MLInsights";
import UserStats from "../analytics/UserStats";
import PerformanceChart from "../charts/PerformanceChart";
import ModernDashboardEnhancement from "./ModernDashboardEnhancement";

// Import all the other dashboard components
import { DataSourcesPanel } from "./DataSourcesPanel";

// ============================================================================
// MOCK DATA & TYPES
// ============================================================================

interface LiveOpportunity {
  id: string;
  matchup: string;
  prediction: string;
  confidence: number;
  edge: number;
  odds: string;
  value: string;
  status: "hot" | "warm" | "cool";
  timeLeft: string;
  sport: string;
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  period: string;
  color: string;
}

interface AIMetric {
  id: string;
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

const mockLiveOpportunities: LiveOpportunity[] = [
  {
    id: "1",
    matchup: "Lakers vs Warriors",
    prediction: "Over 230.5 Points",
    confidence: 94,
    edge: 12.3,
    odds: "+110",
    value: "Excellent",
    status: "hot",
    timeLeft: "2h 15m",
    sport: "NBA",
  },
  {
    id: "2",
    matchup: "Celtics vs Heat",
    prediction: "Celtics -4.5",
    confidence: 87,
    edge: 8.7,
    odds: "-105",
    value: "Good",
    status: "warm",
    timeLeft: "4h 30m",
    sport: "NBA",
  },
];

const mockMetrics: MetricCard[] = [
  {
    id: "1",
    title: "Win Rate",
    value: "72.4%",
    change: "+2.3% this period",
    trend: "up",
    period: "Last 30 days",
    color: "green",
  },
  {
    id: "2",
    title: "ROI",
    value: "15.8%",
    change: "+4.1% this period",
    trend: "up",
    period: "Last 30 days",
    color: "blue",
  },
  {
    id: "3",
    title: "Profit/Loss",
    value: "$4,247.83",
    change: "+$1,247 this period",
    trend: "up",
    period: "Last 30 days",
    color: "purple",
  },
  {
    id: "4",
    title: "Active Bets",
    value: "8",
    change: "+3 this period",
    trend: "up",
    period: "Currently",
    color: "orange",
  },
];

const mockAIMetrics: AIMetric[] = [
  {
    id: "1",
    title: "Total Profit",
    value: "$12,847",
    subtext: "Total",
    icon: <DollarSign className="w-5 h-5" />,
    trend: "+$2.3k",
    color: "purple",
  },
  {
    id: "2",
    title: "Win Rate",
    value: "89.2%",
    subtext: "Total",
    icon: <Trophy className="w-5 h-5" />,
    trend: "+2.1%",
    color: "purple",
  },
  {
    id: "3",
    title: "AI Confidence",
    value: "94.7%",
    subtext: "",
    icon: <Brain className="w-5 h-5" />,
    trend: "+1.4%",
    color: "purple",
  },
  {
    id: "4",
    title: "Active Models",
    value: "47",
    subtext: "",
    icon: <Zap className="w-5 h-5" />,
    trend: "+3",
    color: "purple",
  },
];

// ============================================================================
// DASHBOARD COMPONENTS
// ============================================================================

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            AI Sports Intelligence Platform
          </h1>
          <p className="text-gray-300 text-lg mb-4">
            Real-time data • Advanced ML predictions • Live updates
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Live Data Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">AI Models Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Real-time Predictions</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-3xl font-bold text-green-400">72.4%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Profit</p>
              <p className="text-3xl font-bold text-purple-400">+$18K</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Accuracy</p>
              <p className="text-3xl font-bold text-blue-400">91.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockMetrics.map((metric) => (
        <motion.div
          key={metric.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-gray-600/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">
              {metric.title}
            </h3>
            <div
              className={`p-2 rounded-lg ${
                metric.color === "green"
                  ? "bg-green-500/10 text-green-400"
                  : metric.color === "blue"
                    ? "bg-blue-500/10 text-blue-400"
                    : metric.color === "purple"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-orange-500/10 text-orange-400"
              }`}
            >
              {metric.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
            </div>
          </div>

          <div className="mb-2">
            <p className="text-2xl font-bold text-white">{metric.value}</p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-sm ${
                metric.trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {metric.change}
            </p>
            <p className="text-xs text-gray-500">{metric.period}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const AIMetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockAIMetrics.map((metric) => (
        <motion.div
          key={metric.id}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 hover:border-purple-400/50 transition-all duration-200 overflow-hidden"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-xl"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                {metric.icon}
              </div>
              <span className="text-purple-400 text-sm font-medium">
                {metric.trend}
              </span>
            </div>

            <div className="mb-2">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              {metric.subtext && (
                <p className="text-sm text-gray-400">{metric.subtext}</p>
              )}
            </div>

            <h3 className="text-gray-300 text-sm font-medium">
              {metric.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const LiveOpportunities: React.FC = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <Flame className="w-5 h-5 text-yellow-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Live Opportunities</h2>
          <div className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
            LIVE
          </div>
        </div>
        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {mockLiveOpportunities.map((opportunity) => (
          <motion.div
            key={opportunity.id}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-lg border border-purple-500/20 p-4 hover:border-purple-400/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      opportunity.status === "hot"
                        ? "bg-red-500"
                        : opportunity.status === "warm"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    } animate-pulse`}
                  ></div>
                  <h3 className="text-white font-bold text-lg">
                    {opportunity.matchup}
                  </h3>
                  <span className="text-purple-400 font-bold">
                    +{opportunity.edge}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Our Prediction</p>
                    <p className="text-white font-medium">
                      {opportunity.prediction}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Confidence</p>
                    <p className="text-green-400 font-bold">
                      {opportunity.confidence}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Time Left</p>
                    <p className="text-orange-400 font-medium">
                      {opportunity.timeLeft}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: "1",
      type: "win",
      message: "Lakers Over 230.5 ✓",
      amount: "+$247",
      time: "5m ago",
    },
    {
      id: "2",
      type: "prediction",
      message: "New ML prediction: Celtics -4.5",
      confidence: "94%",
      time: "12m ago",
    },
    {
      id: "3",
      type: "win",
      message: "Warriors ML ✓",
      amount: "+$180",
      time: "1h ago",
    },
    {
      id: "4",
      type: "alert",
      message: "High-value opportunity detected",
      game: "Heat vs Nets",
      time: "2h ago",
    },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <button className="text-purple-400 hover:text-purple-300 text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === "win"
                  ? "bg-green-500/20 text-green-400"
                  : activity.type === "prediction"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {activity.type === "win" ? (
                <CheckCircle className="w-4 h-4" />
              ) : activity.type === "prediction" ? (
                <Brain className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-white text-sm">{activity.message}</p>
              {activity.confidence && (
                <p className="text-purple-400 text-xs">
                  Confidence: {activity.confidence}
                </p>
              )}
              {activity.game && (
                <p className="text-gray-400 text-xs">{activity.game}</p>
              )}
            </div>

            <div className="text-right">
              {activity.amount && (
                <p className="text-green-400 font-bold text-sm">
                  {activity.amount}
                </p>
              )}
              <p className="text-gray-500 text-xs">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

const ConsolidatedUniversalDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Performance Metrics */}
        <MetricCards />

        {/* AI-Powered Metrics */}
        <AIMetricCards />

        {/* Live Opportunities */}
        <LiveOpportunities />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <RecentActivity />

          {/* Service Status */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Service Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white">Live Data Feed</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white">ML Prediction Engine</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white">Risk Management</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-white">Weather Integration</span>
                </div>
                <span className="text-yellow-400 text-sm">Maintenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Money Maker Callout */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Money Maker Active</h3>
                <p className="text-green-400 text-sm">
                  3 opportunities identified
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Our AI has identified high-value betting opportunities with 94.2%
              confidence.
            </p>
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              View Opportunities
            </button>
          </div>

          {/* Feature Flags */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-white font-bold mb-4">Feature Status</h3>
            <ErrorBoundary>
              <FeatureFlagIndicators />
            </ErrorBoundary>
          </div>

          {/* Data Sources */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-white font-bold mb-4">Data Sources</h3>
            <ErrorBoundary>
              <DataSourcesPanel />
            </ErrorBoundary>
          </div>
        </div>

        {/* Enhanced Components */}
        <div className="space-y-6">
          <ErrorBoundary>
            <ModernDashboardEnhancement />
          </ErrorBoundary>

          <ErrorBoundary>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PropCards />
              <MLInsights />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <PerformanceAnalyticsDashboard />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedUniversalDashboard;

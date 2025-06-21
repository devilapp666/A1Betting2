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

// Replace lazy loaded components with direct imports to avoid undefined issues
import PerformanceAnalyticsDashboard from "../analytics/PerformanceAnalyticsDashboard";
import UniversalMoneyMaker from "../moneymaker/UniversalMoneyMaker";
import UnifiedProfile from "../profile/UnifiedProfile";
import UnifiedSettingsInterface from "../settings/UnifiedSettingsInterface";
import UnifiedStrategyEngineDisplay from "../strategy/UnifiedStrategyEngineDisplay";
import PropCards from "../modern/PropCards";
import MLInsights from "../insights/MLInsights";
import UserStats from "../analytics/UserStats";
import PerformanceChart from "../charts/PerformanceChart";

// Mock components for missing files to prevent crashes
const FallbackComponent = ({ title = "Component" }: { title?: string }) => (
  <div className="modern-card p-6 text-center">
    <h3 className="text-lg font-semibold mb-2">🚧 {title}</h3>
    <p className="text-gray-500">
      This component is currently under development.
    </p>
  </div>
);

const MarketAnalysisDashboard = () => (
  <FallbackComponent title="Market Analysis Dashboard" />
);
const ArbitrageOpportunities = () => (
  <FallbackComponent title="Arbitrage Opportunities" />
);
const PrizePicksEdgeDisplay = () => (
  <FallbackComponent title="PrizePicks Edge Display" />
);
const SmartLineupBuilder = () => (
  <FallbackComponent title="Smart Lineup Builder" />
);
const MLFactorViz = () => <FallbackComponent title="ML Factor Visualization" />;
const QuantumPredictionsInterface = () => (
  <FallbackComponent title="Quantum Predictions Interface" />
);
const BetSimulationTool = () => (
  <FallbackComponent title="Bet Simulation Tool" />
);
const LiveOddsTicker = () => <FallbackComponent title="Live Odds Ticker" />;
const ModelPerformance = () => <FallbackComponent title="Model Performance" />;
const PerformanceMetrics = () => (
  <FallbackComponent title="Performance Metrics" />
);
const ESPNHeadlinesTicker = () => (
  <FallbackComponent title="ESPN Headlines Ticker" />
);
const EntryTracking = () => <FallbackComponent title="Entry Tracking" />;

// ============================================================================
// TYPES & INTERFACES - Consolidated from all variants
// ============================================================================

interface DashboardTab {
  key: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  requiresAuth?: boolean;
  isPremium?: boolean;
  description?: string;
}

interface ActivityItem {
  id: string;
  type: "bet" | "prediction" | "analysis" | "arbitrage" | "news";
  description: string;
  amount?: number;
  odds?: number;
  timestamp: number;
  status: "success" | "pending" | "error" | "warning";
}

interface DashboardMetrics {
  winRate: number;
  roi: number;
  profitLoss: number;
  totalBets: number;
  activePredictions: number;
  bankroll: number;
  profit: number;
  dataQuality: number;
  connectedSources: number;
  totalSources: number;
  gamesCount?: number;
  playersCount?: number;
  dataReliability?: number;
}

interface ConsolidatedDashboardProps {
  variant?:
    | "standard"
    | "cyber"
    | "premium"
    | "modern"
    | "unified"
    | "features";
  layout?: "grid" | "tabs" | "sidebar" | "card-based";
  features?: {
    realTime?: boolean;
    moneyMaker?: boolean;
    analytics?: boolean;
    arbitrage?: boolean;
    prizePicks?: boolean;
    espnNews?: boolean;
    modelPerformance?: boolean;
    liveOdds?: boolean;
    userStats?: boolean;
    performanceMetrics?: boolean;
    mlInsights?: boolean;
    entryTracking?: boolean;
    propCards?: boolean;
  };
}

interface HeroSectionProps {
  connectedSources: number;
  totalSources: number;
  gamesCount: number;
  playersCount: number;
  dataQuality: number;
  dataReliability: number;
}

interface DataSourcesPanelProps {
  connectedSources: number;
  totalSources: number;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const createIcon = (emoji: string, alt: string) => (
  <span role="img" aria-label={alt}>
    {emoji}
  </span>
);

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

// ============================================================================
// HERO SECTION COMPONENT - Consolidated from all variants
// ============================================================================

const HeroSection: React.FC<HeroSectionProps> = ({
  connectedSources,
  totalSources,
  gamesCount,
  playersCount,
  dataQuality,
  dataReliability,
}) => (
  <div className="w-full glass-card rounded-3xl shadow-2xl p-8 bg-gradient-to-br from-primary-700/80 to-primary-500/80 flex flex-col md:flex-row items-center justify-between mb-6 animate-fade-in animate-scale-in">
    <div className="flex-1">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
        AI Sports Intelligence Platform
      </h1>
      <div className="text-lg text-primary-100/90 mb-4 font-medium">
        Real-time data • Advanced ML predictions • 84%+ win rates
      </div>
      <div className="flex items-center gap-4 text-sm text-primary-200/80">
        <div className="flex items-center gap-2">
          <Wifi size={16} />
          {connectedSources}/{totalSources} Sources
        </div>
        <div className="flex items-center gap-2">
          <Activity size={16} />
          {gamesCount} Live Games
        </div>
        <div className="flex items-center gap-2">
          <Target size={16} />
          {playersCount} Players Tracked
        </div>
      </div>
    </div>
    <div className="flex flex-row flex-wrap gap-6 items-center justify-end">
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-extrabold text-white">
          {formatPercentage(dataQuality * 100)}
        </span>
        <span className="text-xs text-primary-200/80">AI Accuracy</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-extrabold text-green-300">
          +$1.8K
        </span>
        <span className="text-xs text-primary-200/80">Monthly P&L</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-extrabold text-yellow-300">
          7
        </span>
        <span className="text-xs text-primary-200/80">Active Arbs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-extrabold text-blue-200">
          {formatPercentage(dataReliability * 100)}
        </span>
        <span className="text-xs text-primary-200/80">Reliability</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// DATA SOURCES PANEL - From UnifiedDashboard
// ============================================================================

const DataSourcesPanel: React.FC<DataSourcesPanelProps> = ({
  connectedSources,
  totalSources,
}) => (
  <Card className="glass-card p-6">
    <h3 className="text-lg font-bold mb-4 dark:text-white">Data Sources</h3>
    <div className="space-y-3">
      {[
        { name: "ESPN", status: "connected", latency: "45ms" },
        { name: "SportRadar", status: "connected", latency: "32ms" },
        { name: "The Odds API", status: "connected", latency: "78ms" },
        { name: "PrizePicks", status: "connected", latency: "156ms" },
        { name: "Weather API", status: "connected", latency: "23ms" },
        { name: "Injury Reports", status: "warning", latency: "234ms" },
        { name: "Social Sentiment", status: "connected", latency: "89ms" },
        { name: "News API", status: "connected", latency: "67ms" },
      ].map((source) => (
        <div key={source.name} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                source.status === "connected"
                  ? "bg-green-500"
                  : source.status === "warning"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <span className="text-sm font-medium dark:text-white">
              {source.name}
            </span>
          </div>
          <span className="text-xs text-gray-500">{source.latency}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {connectedSources} of {totalSources} sources connected
      </div>
    </div>
  </Card>
);

// ============================================================================
// SKELETON LOADER - Enhanced from all variants
// ============================================================================

const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <Skeleton className="h-32 w-full rounded-3xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  </div>
);

// ============================================================================
// MOCK DATA - Consolidated from all variants
// ============================================================================

const mockMetrics: DashboardMetrics = {
  winRate: 72.4,
  roi: 15.8,
  profitLoss: 4247.83,
  totalBets: 156,
  activePredictions: 8,
  bankroll: 10000,
  profit: 1500,
  dataQuality: 0.942,
  connectedSources: 8,
  totalSources: 10,
  gamesCount: 20,
  playersCount: 100,
  dataReliability: 0.915,
};

const mockRecentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "bet",
    description: "Lakers vs Warriors - Over 225.5",
    amount: 250,
    odds: 1.91,
    timestamp: Date.now() - 3600000,
    status: "success",
  },
  {
    id: "2",
    type: "arbitrage",
    description: "NFL Arbitrage Opportunity",
    amount: 500,
    timestamp: Date.now() - 7200000,
    status: "pending",
  },
  {
    id: "3",
    type: "prediction",
    description: "AI Model Update - NBA",
    timestamp: Date.now() - 10800000,
    status: "success",
  },
];

// ============================================================================
// MAIN CONSOLIDATED DASHBOARD COMPONENT
// ============================================================================

export const ConsolidatedUniversalDashboard: React.FC<
  ConsolidatedDashboardProps
> = ({
  variant = "unified",
  layout = "tabs",
  features = {
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
  },
}) => {
  // ========== STATE ==========
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ========== DATA FETCHING ==========
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => mockMetrics,
    staleTime: 300000, // 5 minutes
    refetchInterval: false, // Disable auto-refresh to prevent infinite loops
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ["dashboard-activity"],
    queryFn: async () => mockRecentActivity,
    staleTime: 300000, // 5 minutes
    refetchInterval: false, // Disable auto-refresh to prevent infinite loops
  });

  // ========== TAB CONFIGURATION - Consolidated from all variants ==========
  const dashboardTabs: DashboardTab[] = useMemo(
    () => [
      {
        key: "overview",
        label: "Overview",
        icon: <Home size={20} />,
        component: ({ metrics, recentActivity }) => (
          <OverviewTab
            metrics={metrics}
            recentActivity={recentActivity}
            features={features}
          />
        ),
        props: { metrics, recentActivity },
      },
      {
        key: "moneymaker",
        label: "Money Maker",
        icon: <DollarSign size={20} />,
        component: UniversalMoneyMaker,
        isPremium: true,
      },
      {
        key: "analytics",
        label: "Analytics",
        icon: <BarChart3 size={20} />,
        component: PerformanceAnalyticsDashboard,
        isPremium: true,
      },
      {
        key: "market-analysis",
        label: "Market Analysis",
        icon: <TrendingUp size={20} />,
        component: MarketAnalysisDashboard,
        isPremium: true,
      },
      {
        key: "arbitrage",
        label: "Arbitrage",
        icon: <Zap size={20} />,
        component: ArbitrageOpportunities,
        isPremium: true,
      },
      {
        key: "prizepicks",
        label: "PrizePicks",
        icon: <Target size={20} />,
        component: PrizePicksEdgeDisplay,
        isPremium: true,
      },
      {
        key: "lineup-builder",
        label: "Lineup Builder",
        icon: <Brain size={20} />,
        component: SmartLineupBuilder,
        isPremium: true,
      },
      {
        key: "predictions",
        label: "Quantum Predictions",
        icon: <Activity size={20} />,
        component: QuantumPredictionsInterface,
        isPremium: true,
      },
      {
        key: "simulation",
        label: "Bet Simulation",
        icon: <Shield size={20} />,
        component: BetSimulationTool,
        isPremium: true,
      },
      {
        key: "strategy",
        label: "Strategy Engine",
        icon: <Brain size={20} />,
        component: UnifiedStrategyEngineDisplay,
        isPremium: true,
      },
    ],
    [metrics, recentActivity, features],
  );

  // ========== HANDLERS ==========
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Implement search logic
  }, []);

  const handleNotificationClick = useCallback(() => {
    setNotifications(0);
    // Open notifications panel
  }, []);

  // ========== CURRENT TAB ==========
  const currentTab = dashboardTabs.find((tab) => tab.key === activeTab);
  const CurrentComponent = currentTab?.component;

  // ========== LOADING STATE ==========
  if (metricsLoading || activityLoading) {
    return (
      <div className="min-h-screen p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  // ========== RENDER BASED ON LAYOUT ==========
  return (
    <CyberContainer className="min-h-screen">
      {layout === "tabs" && (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:static lg:inset-0`}
          >
            <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <CyberText variant="title" className="font-bold">
                  A1Betting Dashboard
                </CyberText>
                <MegaButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X size={20} />
                </MegaButton>
              </div>

              {/* Search */}
              <div className="p-4">
                <MegaInput
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<Search size={16} />}
                />
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2 p-4">
                {dashboardTabs.map((tab) => (
                  <MegaButton
                    key={tab.key}
                    variant={activeTab === tab.key ? "primary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.label}</span>
                    {tab.isPremium && (
                      <Badge className="ml-auto bg-yellow-500 text-yellow-900">
                        Pro
                      </Badge>
                    )}
                  </MegaButton>
                ))}
              </nav>

              {/* Status Indicators */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <ServiceStatusIndicators />
                <FeatureFlagIndicators />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MegaButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden"
                  >
                    <Menu size={20} />
                  </MegaButton>
                  <CyberText variant="title" className="font-semibold">
                    {currentTab?.label || "Dashboard"}
                  </CyberText>
                </div>

                <div className="flex items-center gap-3">
                  <MegaButton
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw
                      size={16}
                      className={isRefreshing ? "animate-spin" : ""}
                    />
                  </MegaButton>

                  <MegaButton
                    variant="ghost"
                    size="sm"
                    onClick={handleNotificationClick}
                    className="relative"
                  >
                    <Bell size={16} />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                        {notifications}
                      </Badge>
                    )}
                  </MegaButton>

                  <MegaButton variant="ghost" size="sm">
                    <Settings size={16} />
                  </MegaButton>

                  <MegaButton variant="ghost" size="sm">
                    <User size={16} />
                  </MegaButton>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-6">
              <Suspense fallback={<DashboardSkeleton />}>
                {CurrentComponent && (
                  <CurrentComponent {...(currentTab?.props || {})} />
                )}
              </Suspense>
            </main>
          </div>
        </div>
      )}

      {layout === "grid" && (
        <div className="p-6 space-y-6">
          <HeroSection
            connectedSources={metrics?.connectedSources || 8}
            totalSources={metrics?.totalSources || 10}
            gamesCount={metrics?.gamesCount || 20}
            playersCount={metrics?.playersCount || 100}
            dataQuality={metrics?.dataQuality || 0.85}
            dataReliability={metrics?.dataReliability || 0.9}
          />
          <GridLayoutContent metrics={metrics} features={features} />
        </div>
      )}
    </CyberContainer>
  );
};

// ============================================================================
// OVERVIEW TAB COMPONENT - Consolidated features from all variants
// ============================================================================

const OverviewTab: React.FC<{
  metrics: DashboardMetrics;
  recentActivity: ActivityItem[];
  features: ConsolidatedDashboardProps["features"];
}> = ({ metrics, recentActivity, features }) => (
  <div className="space-y-6">
    <HeroSection
      connectedSources={metrics.connectedSources}
      totalSources={metrics.totalSources}
      gamesCount={metrics.gamesCount || 20}
      playersCount={metrics.playersCount || 100}
      dataQuality={metrics.dataQuality}
      dataReliability={metrics.dataReliability || 0.9}
    />

    {/* Key Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Win Rate"
        value={formatPercentage(metrics.winRate)}
        change={2.3}
        icon={<Target size={24} />}
        color="blue"
      />
      <MetricCard
        title="ROI"
        value={formatPercentage(metrics.roi)}
        change={5.1}
        icon={<TrendingUp size={24} />}
        color="green"
      />
      <MetricCard
        title="Profit/Loss"
        value={formatCurrency(metrics.profitLoss)}
        change={metrics.profitLoss >= 0 ? 12.4 : -8.2}
        icon={<DollarSign size={24} />}
        color={metrics.profitLoss >= 0 ? "green" : "red"}
      />
      <MetricCard
        title="Active Bets"
        value={metrics.activePredictions.toString()}
        icon={<Activity size={24} />}
        color="purple"
      />
    </div>

    {/* Feature Components Grid */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <DataSourcesPanel
        connectedSources={metrics.connectedSources}
        totalSources={metrics.totalSources}
      />

      {features?.userStats && (
        <Suspense fallback={<Skeleton className="h-64" />}>
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">User Statistics</h3>
            <ErrorBoundary
              fallback={
                <div className="text-red-500">Error loading user stats</div>
              }
            >
              <UserStats />
            </ErrorBoundary>
          </Card>
        </Suspense>
      )}
    </div>

    {/* Money Maker Callout - From features dashboard */}
    {features?.moneyMaker && (
      <div className="w-full glass-card rounded-2xl shadow-xl p-6 bg-gradient-to-br from-green-700/80 to-green-500/80 mb-6 animate-fade-in animate-scale-in">
        <h2 className="text-2xl font-bold text-green-100 mb-2 flex items-center">
          <span className="mr-2">💰</span> Let's Get Money
        </h2>
        <div className="text-green-200 text-base font-medium mb-2">
          AI finds the highest-paying 84%+ win probability lineup
        </div>
        <Suspense fallback={<Skeleton className="h-32" />}>
          <UniversalMoneyMaker />
        </Suspense>
      </div>
    )}

    {/* Additional Feature Sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {features?.entryTracking && (
        <Suspense fallback={<Skeleton className="h-64" />}>
          <EntryTracking />
        </Suspense>
      )}

      {features?.propCards && (
        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-64" />}>
            <PropCards />
          </Suspense>
        </div>
      )}

      {features?.performanceMetrics && !features?.propCards && (
        <Suspense fallback={<Skeleton className="h-64" />}>
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Performance Analytics</h3>
            <PerformanceChart />
          </Card>
        </Suspense>
      )}
    </div>

    {/* ESPN Headlines & ML Insights */}
    {(features?.espnNews || features?.mlInsights) && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features?.espnNews && (
          <Suspense fallback={<Skeleton className="h-64" />}>
            <ESPNHeadlinesTicker />
          </Suspense>
        )}

        {features?.mlInsights && (
          <Suspense fallback={<Skeleton className="h-64" />}>
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">AI/ML Insights</h3>
              <MLInsights />
            </Card>
          </Suspense>
        )}
      </div>
    )}

    {/* Live Components */}
    {(features?.liveOdds || features?.modelPerformance) && (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {features?.liveOdds && (
          <Suspense fallback={<Skeleton className="h-64" />}>
            <LiveOddsTicker />
          </Suspense>
        )}

        {features?.modelPerformance && (
          <Suspense fallback={<Skeleton className="h-64" />}>
            <ModelPerformance />
          </Suspense>
        )}
      </div>
    )}

    {/* Recent Activity */}
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.status === "success"
                    ? "bg-green-500"
                    : activity.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
              <div>
                <div className="font-medium">{activity.description}</div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            {activity.amount && (
              <div className="text-right">
                <div className="font-medium">
                  {formatCurrency(activity.amount)}
                </div>
                {activity.odds && (
                  <div className="text-sm text-gray-500">@{activity.odds}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ============================================================================
// GRID LAYOUT CONTENT - For grid layout variant
// ============================================================================

const GridLayoutContent: React.FC<{
  metrics: DashboardMetrics | undefined;
  features: ConsolidatedDashboardProps["features"];
}> = ({ metrics, features }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Quick Stats */}
    <div className="lg:col-span-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Win Rate"
          value={formatPercentage(metrics?.winRate || 0)}
          icon={<Target size={24} />}
          color="blue"
        />
        <MetricCard
          title="ROI"
          value={formatPercentage(metrics?.roi || 0)}
          icon={<TrendingUp size={24} />}
          color="green"
        />
        <MetricCard
          title="Profit/Loss"
          value={formatCurrency(metrics?.profitLoss || 0)}
          icon={<DollarSign size={24} />}
          color="green"
        />
        <MetricCard
          title="Active Bets"
          value={(metrics?.activePredictions || 0).toString()}
          icon={<Activity size={24} />}
          color="purple"
        />
      </div>
    </div>

    {/* Main Features Grid */}
    {features?.moneyMaker && (
      <div className="lg:col-span-8">
        <MegaCard className="h-full">
          <Suspense fallback={<Skeleton className="h-96" />}>
            <UniversalMoneyMaker />
          </Suspense>
        </MegaCard>
      </div>
    )}

    <div className="lg:col-span-4 space-y-6">
      {features?.analytics && (
        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Quick Analytics</h3>
          <Suspense fallback={<Skeleton className="h-32" />}>
            <PerformanceChart />
          </Suspense>
        </MegaCard>
      )}

      <DataSourcesPanel
        connectedSources={metrics?.connectedSources || 8}
        totalSources={metrics?.totalSources || 10}
      />
    </div>

    {/* Additional Features Row */}
    {(features?.arbitrage || features?.prizePicks) && (
      <div className="lg:col-span-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features?.arbitrage && (
            <MegaCard className="p-6">
              <h3 className="text-lg font-bold mb-4">
                Arbitrage Opportunities
              </h3>
              <Suspense fallback={<Skeleton className="h-48" />}>
                <ArbitrageOpportunities />
              </Suspense>
            </MegaCard>
          )}

          {features?.prizePicks && (
            <MegaCard className="p-6">
              <h3 className="text-lg font-bold mb-4">PrizePicks Edge</h3>
              <Suspense fallback={<Skeleton className="h-48" />}>
                <PrizePicksEdgeDisplay />
              </Suspense>
            </MegaCard>
          )}
        </div>
      </div>
    )}

    {/* Live Data Row */}
    {(features?.liveOdds || features?.espnNews) && (
      <div className="lg:col-span-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features?.liveOdds && (
            <MegaCard className="p-6">
              <h3 className="text-lg font-bold mb-4">Live Odds</h3>
              <Suspense fallback={<Skeleton className="h-48" />}>
                <LiveOddsTicker />
              </Suspense>
            </MegaCard>
          )}

          {features?.espnNews && (
            <MegaCard className="p-6">
              <h3 className="text-lg font-bold mb-4">ESPN Headlines</h3>
              <Suspense fallback={<Skeleton className="h-48" />}>
                <ESPNHeadlinesTicker />
              </Suspense>
            </MegaCard>
          )}
        </div>
      </div>
    )}

    {/* Advanced Features Row */}
    {(features?.mlInsights || features?.modelPerformance) && (
      <div className="lg:col-span-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features?.mlInsights && (
            <MegaCard className="p-6">
              <h3 className="text-lg font-bold mb-4">ML Insights</h3>
              <Suspense fallback={<Skeleton className="h-48" />}>
                <MLInsights />
              </Suspense>
            </MegaCard>
          )}

          {features?.modelPerformance && (
            <MegaCard className="p-6">
              <h3 className="text-lg font-bold mb-4">Model Performance</h3>
              <Suspense fallback={<Skeleton className="h-48" />}>
                <ModelPerformance />
              </Suspense>
            </MegaCard>
          )}
        </div>
      </div>
    )}
  </div>
);

// ============================================================================
// METRIC CARD COMPONENT
// ============================================================================

const MetricCard: React.FC<{
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple" | "yellow";
}> = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: "from-blue-500/20 to-purple-500/10 text-blue-600 dark:text-blue-300",
    green:
      "from-green-500/20 to-teal-500/10 text-green-600 dark:text-green-300",
    red: "from-red-500/20 to-pink-500/10 text-red-600 dark:text-red-300",
    purple:
      "from-purple-500/20 to-pink-500/10 text-purple-600 dark:text-purple-300",
    yellow:
      "from-yellow-500/20 to-orange-500/10 text-yellow-600 dark:text-yellow-300",
  };

  return (
    <Card
      className={`glass-card bg-gradient-to-br ${colorClasses[color]} border-0 shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">{title}</div>
          {icon}
        </div>
        <div className="text-3xl font-extrabold mb-2">{value}</div>
        {change !== undefined && (
          <div
            className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {change >= 0 ? "+" : ""}
            {change}% this period
          </div>
        )}
      </div>
    </Card>
  );
};

export default ConsolidatedUniversalDashboard;

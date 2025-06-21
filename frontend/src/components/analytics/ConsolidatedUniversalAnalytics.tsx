import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  Target,
  Shield,
  Zap,
  Settings,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Cpu,
} from "lucide-react";

// UI Components
import { MegaButton, MegaCard } from "../mega/MegaUI";
import { CyberText, CyberContainer } from "../mega/CyberTheme";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/Skeleton";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  trend: "up" | "down" | "stable";
  format: "currency" | "percentage" | "number" | "ratio";
  category: "performance" | "risk" | "efficiency" | "quality" | "profitability";
  importance: "critical" | "high" | "medium" | "low";
  target?: number;
  threshold?: {
    warning: number;
    critical: number;
  };
  description?: string;
  lastUpdated: Date;
  source: string;
  reliability: number;
  frequency: "realtime" | "minute" | "hourly" | "daily" | "weekly" | "monthly";
}

interface ConsolidatedAnalyticsProps {
  variant?: "standard" | "cyber" | "premium" | "advanced" | "real-time";
  features?: {
    realTime?: boolean;
    models?: boolean;
    betting?: boolean;
    system?: boolean;
    predictions?: boolean;
    risk?: boolean;
    performance?: boolean;
    comparison?: boolean;
    alerts?: boolean;
    export?: boolean;
  };
  timeRange?: "1h" | "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all";
  refreshInterval?: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockMetrics: AnalyticsMetric[] = [
  {
    id: "total-profit",
    name: "Total Profit",
    value: 24847.65,
    previousValue: 22193.42,
    change: 2654.23,
    changePercent: 11.96,
    trend: "up",
    format: "currency",
    category: "profitability",
    importance: "critical",
    target: 25000,
    description: "Total profit across all betting activities",
    lastUpdated: new Date(),
    source: "Betting Engine",
    reliability: 0.99,
    frequency: "realtime",
  },
  {
    id: "roi",
    name: "Return on Investment",
    value: 0.248,
    previousValue: 0.221,
    change: 0.027,
    changePercent: 12.22,
    trend: "up",
    format: "percentage",
    category: "performance",
    importance: "critical",
    target: 0.25,
    threshold: {
      warning: 0.15,
      critical: 0.1,
    },
    description: "Return on investment percentage",
    lastUpdated: new Date(),
    source: "Performance Engine",
    reliability: 0.98,
    frequency: "daily",
  },
  {
    id: "win-rate",
    name: "Win Rate",
    value: 0.724,
    previousValue: 0.718,
    change: 0.006,
    changePercent: 0.84,
    trend: "up",
    format: "percentage",
    category: "performance",
    importance: "high",
    target: 0.75,
    description: "Percentage of winning bets",
    lastUpdated: new Date(),
    source: "Betting Analytics",
    reliability: 0.99,
    frequency: "realtime",
  },
  {
    id: "sharpe-ratio",
    name: "Sharpe Ratio",
    value: 2.84,
    previousValue: 2.67,
    change: 0.17,
    changePercent: 6.37,
    trend: "up",
    format: "ratio",
    category: "risk",
    importance: "high",
    target: 3.0,
    description: "Risk-adjusted return measure",
    lastUpdated: new Date(),
    source: "Risk Engine",
    reliability: 0.97,
    frequency: "daily",
  },
  {
    id: "max-drawdown",
    name: "Max Drawdown",
    value: 0.083,
    previousValue: 0.091,
    change: -0.008,
    changePercent: -8.79,
    trend: "up",
    format: "percentage",
    category: "risk",
    importance: "critical",
    target: 0.05,
    threshold: {
      warning: 0.1,
      critical: 0.15,
    },
    description: "Maximum portfolio decline from peak",
    lastUpdated: new Date(),
    source: "Risk Engine",
    reliability: 0.99,
    frequency: "realtime",
  },
];

// ============================================================================
// MAIN CONSOLIDATED ANALYTICS COMPONENT
// ============================================================================

export const ConsolidatedUniversalAnalytics: React.FC<
  ConsolidatedAnalyticsProps
> = ({
  variant = "standard",
  features = {
    realTime: true,
    models: true,
    betting: true,
    system: true,
    predictions: true,
    risk: true,
    performance: true,
    comparison: true,
    alerts: true,
    export: true,
  },
  timeRange = "1w",
  refreshInterval = 30000,
}) => {
  // ========== STATE ==========
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "models"
    | "performance"
    | "risk"
    | "betting"
    | "system"
    | "real-time"
    | "comparison"
  >("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    timeRange,
    category: "all",
    importance: "all",
    source: "all",
  });

  // ========== DATA FETCHING ==========
  const {
    data: metrics,
    isLoading: metricsLoading,
    refetch: refetchMetrics,
  } = useQuery({
    queryKey: ["analytics-metrics", filters],
    queryFn: async () => mockMetrics,
    refetchInterval: refreshInterval,
  });

  // ========== HANDLERS ==========
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([refetchMetrics()]);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [refetchMetrics]);

  const handleExport = useCallback(() => {
    const data = {
      metrics,
      exportDate: new Date().toISOString(),
      timeRange: filters.timeRange,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [metrics, filters.timeRange]);

  // ========== UTILITY FUNCTIONS ==========
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      case "percentage":
        return `${(value * 100).toFixed(2)}%`;
      case "ratio":
        return value.toFixed(2);
      default:
        return value.toLocaleString();
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp size={16} />;
      case "down":
        return <TrendingDown size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical":
        return "border-red-500 bg-red-50";
      case "high":
        return "border-orange-500 bg-orange-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  // ========== TAB RENDERERS ==========
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {metrics
          ?.slice(0, 5)
          .map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              formatValue={formatValue}
              getTrendColor={getTrendColor}
              getTrendIcon={getTrendIcon}
              getImportanceColor={getImportanceColor}
            />
          ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Performance Trend</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Performance Chart</span>
          </div>
        </MegaCard>

        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Risk Distribution</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Risk Chart</span>
          </div>
        </MegaCard>
      </div>

      {/* Recent Alerts */}
      {features.alerts && (
        <MegaCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Alerts</h3>
            <Badge className="bg-yellow-100 text-yellow-800">3 Active</Badge>
          </div>

          <div className="space-y-3">
            {[
              {
                type: "warning",
                message: "Model accuracy below threshold",
                time: "2 minutes ago",
              },
              {
                type: "info",
                message: "New model deployment successful",
                time: "15 minutes ago",
              },
              {
                type: "success",
                message: "Risk limits updated",
                time: "1 hour ago",
              },
            ].map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                {alert.type === "warning" && (
                  <AlertTriangle size={16} className="text-yellow-500" />
                )}
                {alert.type === "info" && (
                  <Info size={16} className="text-blue-500" />
                )}
                {alert.type === "success" && (
                  <CheckCircle size={16} className="text-green-500" />
                )}

                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </MegaCard>
      )}
    </div>
  );

  const renderModelsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Model Analysis</h2>
        <div className="flex items-center gap-3">
          <MegaButton variant="outline" size="sm">
            <Filter size={16} />
            Filter
          </MegaButton>
          <MegaButton variant="outline" size="sm">
            <Settings size={16} />
            Configure
          </MegaButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          {
            name: "XGBoost Enhanced V4",
            accuracy: 89.2,
            status: "active",
            version: "4.2.1",
          },
          {
            name: "Neural Network Pro",
            accuracy: 87.8,
            status: "active",
            version: "2.1.0",
          },
          {
            name: "Ensemble Master",
            accuracy: 91.4,
            status: "training",
            version: "1.5.2",
          },
          {
            name: "Quantum Predictor",
            accuracy: 93.1,
            status: "testing",
            version: "0.8.1",
          },
        ].map((model, index) => (
          <MegaCard key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{model.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  v{model.version}
                </p>
              </div>

              <Badge
                className={`${
                  model.status === "active"
                    ? "bg-green-100 text-green-800"
                    : model.status === "training"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {model.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Accuracy</p>
                <p className="font-semibold text-green-600">
                  {model.accuracy}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
          </MegaCard>
        ))}
      </div>
    </div>
  );

  // ========== MAIN RENDER ==========
  return (
    <CyberContainer className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Universal Analytics
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive analytics and performance monitoring
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filters.timeRange}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, timeRange: e.target.value }))
            }
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="1d">Last Day</option>
            <option value="1w">Last Week</option>
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="all">All Time</option>
          </select>

          <MegaButton
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </MegaButton>

          {features.export && (
            <MegaButton variant="outline" size="sm" onClick={handleExport}>
              <Download size={16} />
              Export
            </MegaButton>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: BarChart3,
              enabled: true,
            },
            {
              id: "models",
              label: "Models",
              icon: Brain,
              enabled: features.models,
            },
            {
              id: "performance",
              label: "Performance",
              icon: TrendingUp,
              enabled: features.performance,
            },
            { id: "risk", label: "Risk", icon: Shield, enabled: features.risk },
            {
              id: "betting",
              label: "Betting",
              icon: Target,
              enabled: features.betting,
            },
            {
              id: "system",
              label: "System",
              icon: Cpu,
              enabled: features.system,
            },
          ]
            .filter((tab) => tab.enabled)
            .map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {metricsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <>
            {activeTab === "overview" && renderOverviewTab()}
            {activeTab === "models" && renderModelsTab()}
            {activeTab === "performance" && (
              <div className="text-center py-12">
                <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Performance Analytics
                </h3>
                <p className="text-gray-500">
                  Detailed performance metrics and analysis
                </p>
              </div>
            )}
            {activeTab === "risk" && (
              <div className="text-center py-12">
                <Shield size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Risk Analytics
                </h3>
                <p className="text-gray-500">
                  Risk assessment and monitoring tools
                </p>
              </div>
            )}
            {activeTab === "betting" && (
              <div className="text-center py-12">
                <Target size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Betting Analytics
                </h3>
                <p className="text-gray-500">
                  Comprehensive betting performance analysis
                </p>
              </div>
            )}
            {activeTab === "system" && (
              <div className="text-center py-12">
                <Cpu size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  System Analytics
                </h3>
                <p className="text-gray-500">
                  System health and performance monitoring
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </CyberContainer>
  );
};

// ============================================================================
// SUPPORTING COMPONENTS
// ============================================================================

const MetricCard: React.FC<{
  metric: AnalyticsMetric;
  formatValue: (value: number, format: string) => string;
  getTrendColor: (trend: string) => string;
  getTrendIcon: (trend: string) => React.ReactNode;
  getImportanceColor: (importance: string) => string;
}> = ({
  metric,
  formatValue,
  getTrendColor,
  getTrendIcon,
  getImportanceColor,
}) => (
  <MegaCard className={`p-6 ${getImportanceColor(metric.importance)}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {metric.name}
      </div>
      <div className={getTrendColor(metric.trend)}>
        {getTrendIcon(metric.trend)}
      </div>
    </div>

    <div className="text-2xl font-bold mb-2">
      {formatValue(metric.value, metric.format)}
    </div>

    {metric.change && (
      <div className={`text-sm ${getTrendColor(metric.trend)}`}>
        {metric.change >= 0 ? "+" : ""}
        {formatValue(Math.abs(metric.change), metric.format)}
        {metric.changePercent &&
          ` (${metric.changePercent >= 0 ? "+" : ""}${metric.changePercent.toFixed(1)}%)`}
      </div>
    )}

    {metric.target && (
      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-1">
          Target: {formatValue(metric.target, metric.format)}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full"
            style={{
              width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    )}
  </MegaCard>
);

export default ConsolidatedUniversalAnalytics;

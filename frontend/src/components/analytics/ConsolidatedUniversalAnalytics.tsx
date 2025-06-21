import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Calendar,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Award,
  Cpu,
  Database,
  Network,
  PieChart,
  LineChart,
  BarChart,
  Scatter,
  Map,
  Grid,
  List,
  Table,
  Layout,
  Maximize,
  Minimize,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// UI Components
import { MegaButton, MegaCard, MegaInput } from "../mega/MegaUI";
import { CyberText, CyberContainer } from "../mega/CyberTheme";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/Skeleton";

// Chart components (lazy loaded) - commented out to avoid import issues
// const Chart = lazy(() => import("react-chartjs-2").then(m => ({ default: m.Chart })));

// ============================================================================
// TYPES & INTERFACES - Consolidated from all analytics variants
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
  calculation?: string;
  lastUpdated: Date;
  source: string;
  reliability: number;
  frequency: "realtime" | "minute" | "hourly" | "daily" | "weekly" | "monthly";
}

export interface ModelAnalysis {
  modelId: string;
  modelName: string;
  modelType: "ml" | "statistical" | "hybrid" | "ensemble";
  version: string;
  status: "active" | "training" | "testing" | "deprecated" | "error";
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  kellyOptimal: number;
  confidence: number;
  stability: number;
  robustness: number;
  generalization: number;
  overfitting: number;
  bias: number;
  variance: number;
  noiseRatio: number;
  signalStrength: number;
  featureImportance: Record<string, number>;
  performanceHistory: Array<{
    date: Date;
    accuracy: number;
    profit: number;
    drawdown: number;
  }>;
  backtestResults: {
    period: string;
    totalReturn: number;
    annualizedReturn: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    calmarRatio: number;
    winRate: number;
    profitFactor: number;
    trades: number;
    avgWin: number;
    avgLoss: number;
    largestWin: number;
    largestLoss: number;
  };
  realTimeMetrics: {
    predictions: number;
    accuracy: number;
    latency: number;
    throughput: number;
    errorRate: number;
    uptime: number;
  };
  resourceUsage: {
    cpu: number;
    memory: number;
    gpu?: number;
    storage: number;
    network: number;
  };
  training: {
    dataset: string;
    samples: number;
    features: number;
    epochs: number;
    batchSize: number;
    learningRate: number;
    regularization: number;
    validationSplit: number;
    trainingTime: number;
    convergence: boolean;
  };
  deployment: {
    environment: string;
    version: string;
    deployedAt: Date;
    instances: number;
    loadBalancer: boolean;
    autoScaling: boolean;
    healthCheck: boolean;
  };
  monitoring: {
    alerts: Array<{
      id: string;
      type: "performance" | "accuracy" | "latency" | "error";
      severity: "low" | "medium" | "high" | "critical";
      message: string;
      timestamp: Date;
      resolved: boolean;
    }>;
    metrics: Array<{
      name: string;
      value: number;
      timestamp: Date;
    }>;
  };
  metadata: {
    tags: string[];
    description: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    notes: string;
  };
}

export interface BettingAnalysis {
  period: string;
  totalBets: number;
  totalStake: number;
  totalPayout: number;
  totalProfit: number;
  roi: number;
  winRate: number;
  lossRate: number;
  pushRate: number;
  averageStake: number;
  averageOdds: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  longestWinStreak: number;
  longestLossStreak: number;
  currentStreak: {
    type: "win" | "loss" | "none";
    count: number;
  };
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  currentDrawdown: number;
  recoveryFactor: number;
  calmarRatio: number;
  sortinoRatio: number;
  omegaRatio: number;
  kellyOptimal: number;
  bankrollGrowth: number;
  riskAdjustedReturn: number;
  volatility: number;
  beta: number;
  alpha: number;
  informationRatio: number;
  trackingError: number;
  hitRate: number;
  missRate: number;
  edgeDetection: {
    totalEdge: number;
    realizedEdge: number;
    edgeEfficiency: number;
    valueExtraction: number;
  };
  marketAnalysis: {
    favoritesBias: number;
    underdogSuccess: number;
    lineMovement: number;
    steamMoves: number;
    reverseMoves: number;
    marketEfficiency: number;
  };
  sportBreakdown: Record<
    string,
    {
      bets: number;
      profit: number;
      roi: number;
      winRate: number;
      averageOdds: number;
    }
  >;
  marketBreakdown: Record<
    string,
    {
      bets: number;
      profit: number;
      roi: number;
      winRate: number;
      averageOdds: number;
    }
  >;
  timeAnalysis: {
    hourly: Record<string, number>;
    daily: Record<string, number>;
    weekly: Record<string, number>;
    monthly: Record<string, number>;
    seasonal: Record<string, number>;
  };
  stakingAnalysis: {
    flatBetting: {
      roi: number;
      profit: number;
      maxDrawdown: number;
    };
    kellyBetting: {
      roi: number;
      profit: number;
      maxDrawdown: number;
    };
    proportionalBetting: {
      roi: number;
      profit: number;
      maxDrawdown: number;
    };
    optimization: {
      optimalStakeSize: number;
      optimalKelly: number;
      riskBudget: number;
      diversification: number;
    };
  };
  riskMetrics: {
    valueAtRisk: number;
    conditionalVaR: number;
    expectedShortfall: number;
    riskBudgetUtilization: number;
    concentrationRisk: number;
    correlationRisk: number;
    liquidityRisk: number;
    operationalRisk: number;
  };
  benchmarking: {
    marketReturn: number;
    excessReturn: number;
    relativeSharpe: number;
    informationRatio: number;
    trackingError: number;
    activeReturn: number;
    benchmarkBeaten: boolean;
    outperformancePeriods: number;
    underperformancePeriods: number;
  };
}

export interface SystemAnalytics {
  uptime: number;
  availability: number;
  reliability: number;
  performance: {
    averageLatency: number;
    p95Latency: number;
    p99Latency: number;
    throughput: number;
    requestsPerSecond: number;
    errorsPerSecond: number;
    errorRate: number;
  };
  resources: {
    cpu: {
      usage: number;
      cores: number;
      frequency: number;
      load: number;
    };
    memory: {
      usage: number;
      total: number;
      available: number;
      cached: number;
    };
    disk: {
      usage: number;
      total: number;
      available: number;
      io: {
        read: number;
        write: number;
      };
    };
    network: {
      bandwidth: number;
      latency: number;
      packetLoss: number;
      connections: number;
    };
  };
  dataQuality: {
    completeness: number;
    accuracy: number;
    timeliness: number;
    consistency: number;
    validity: number;
    uniqueness: number;
  };
  security: {
    threatLevel: "low" | "medium" | "high" | "critical";
    incidents: number;
    vulnerabilities: number;
    patches: number;
    compliance: number;
  };
  monitoring: {
    activeAlerts: number;
    resolvedAlerts: number;
    meanTimeToDetection: number;
    meanTimeToResolution: number;
    escalations: number;
  };
  integrations: Array<{
    name: string;
    status: "healthy" | "degraded" | "down";
    latency: number;
    errorRate: number;
    lastCheck: Date;
  }>;
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
// MOCK DATA - Consolidated from all variants
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

const mockModelAnalysis: ModelAnalysis[] = [
  {
    modelId: "xgb-v4",
    modelName: "XGBoost Enhanced V4",
    modelType: "ml",
    version: "4.2.1",
    status: "active",
    accuracy: 0.892,
    precision: 0.887,
    recall: 0.894,
    f1Score: 0.89,
    auc: 0.934,
    sharpeRatio: 2.84,
    maxDrawdown: 0.073,
    winRate: 0.724,
    profitFactor: 2.91,
    kellyOptimal: 0.245,
    confidence: 0.912,
    stability: 0.956,
    robustness: 0.934,
    generalization: 0.887,
    overfitting: 0.023,
    bias: 0.012,
    variance: 0.034,
    noiseRatio: 0.087,
    signalStrength: 0.913,
    featureImportance: {
      recent_form: 0.234,
      head_to_head: 0.187,
      injury_impact: 0.156,
      weather: 0.123,
      line_movement: 0.089,
      public_betting: 0.067,
      sharp_money: 0.144,
    },
    performanceHistory: [],
    backtestResults: {
      period: "2023-2024",
      totalReturn: 0.248,
      annualizedReturn: 0.267,
      volatility: 0.091,
      sharpeRatio: 2.84,
      maxDrawdown: 0.073,
      calmarRatio: 3.66,
      winRate: 0.724,
      profitFactor: 2.91,
      trades: 1247,
      avgWin: 147.8,
      avgLoss: -89.3,
      largestWin: 1834.7,
      largestLoss: -456.2,
    },
    realTimeMetrics: {
      predictions: 847,
      accuracy: 0.889,
      latency: 23,
      throughput: 1847,
      errorRate: 0.002,
      uptime: 0.9987,
    },
    resourceUsage: {
      cpu: 0.34,
      memory: 0.67,
      gpu: 0.23,
      storage: 0.12,
      network: 0.08,
    },
    training: {
      dataset: "NBA_2024_Enhanced",
      samples: 45632,
      features: 287,
      epochs: 1500,
      batchSize: 128,
      learningRate: 0.001,
      regularization: 0.01,
      validationSplit: 0.2,
      trainingTime: 1847,
      convergence: true,
    },
    deployment: {
      environment: "production",
      version: "4.2.1",
      deployedAt: new Date(),
      instances: 3,
      loadBalancer: true,
      autoScaling: true,
      healthCheck: true,
    },
    monitoring: {
      alerts: [],
      metrics: [],
    },
    metadata: {
      tags: ["nba", "ml", "gradient-boosting", "production"],
      description:
        "Enhanced XGBoost model for NBA predictions with weather and injury integration",
      author: "ML Team",
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: "Latest version with improved feature engineering",
    },
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
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<
    "cards" | "charts" | "table" | "dashboard"
  >("dashboard");
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

  const { data: modelAnalysis, isLoading: modelsLoading } = useQuery({
    queryKey: ["model-analysis"],
    queryFn: async () => mockModelAnalysis,
    refetchInterval: refreshInterval,
  });

  // ========== HANDLERS ==========
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([refetchMetrics()]);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [refetchMetrics]);

  const handleExport = useCallback(() => {
    // Export analytics data
    const data = {
      metrics,
      models: modelAnalysis,
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
  }, [metrics, modelAnalysis, filters.timeRange]);

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
          .map((metric) => <MetricCard key={metric.id} metric={metric} />)}
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

      {modelsLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {modelAnalysis?.map((model) => (
            <ModelAnalysisCard key={model.modelId} model={model} />
          ))}
        </div>
      )}
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Analytics</h2>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerformanceMetricCard
          title="Total Return"
          value="24.8%"
          change={5.2}
          icon={<TrendingUp size={24} />}
        />
        <PerformanceMetricCard
          title="Sharpe Ratio"
          value="2.84"
          change={0.17}
          icon={<Activity size={24} />}
        />
        <PerformanceMetricCard
          title="Max Drawdown"
          value="8.3%"
          change={-1.2}
          icon={<TrendingDown size={24} />}
        />
        <PerformanceMetricCard
          title="Win Rate"
          value="72.4%"
          change={2.1}
          icon={<Target size={24} />}
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Equity Curve</h3>
          <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Equity Curve Chart</span>
          </div>
        </MegaCard>

        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Drawdown Analysis</h3>
          <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Drawdown Chart</span>
          </div>
        </MegaCard>
      </div>
    </div>
  );

  const renderRiskTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Risk Analytics</h2>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskMetricCard
          title="Value at Risk (95%)"
          value="$2,847"
          severity="medium"
          icon={<Shield size={24} />}
        />
        <RiskMetricCard
          title="Expected Shortfall"
          value="$4,236"
          severity="medium"
          icon={<AlertTriangle size={24} />}
        />
        <RiskMetricCard
          title="Risk Budget Utilization"
          value="67.3%"
          severity="low"
          icon={<BarChart3 size={24} />}
        />
      </div>

      {/* Risk Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Risk Distribution</h3>
          <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Risk Distribution Chart</span>
          </div>
        </MegaCard>

        <MegaCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Correlation Matrix</h3>
          <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Correlation Heatmap</span>
          </div>
        </MegaCard>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Analytics</h2>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SystemMetricCard
          title="Uptime"
          value="99.87%"
          status="healthy"
          icon={<CheckCircle size={24} />}
        />
        <SystemMetricCard
          title="Latency"
          value="23ms"
          status="healthy"
          icon={<Zap size={24} />}
        />
        <SystemMetricCard
          title="Throughput"
          value="1,847/s"
          status="healthy"
          icon={<Activity size={24} />}
        />
        <SystemMetricCard
          title="Error Rate"
          value="0.002%"
          status="healthy"
          icon={<CheckCircle size={24} />}
        />
      </div>

      {/* Resource Usage */}
      <MegaCard className="p-6">
        <h3 className="text-lg font-bold mb-4">Resource Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ResourceChart title="CPU" value={34} unit="%" color="blue" />
          <ResourceChart title="Memory" value={67} unit="%" color="green" />
          <ResourceChart title="Disk" value={23} unit="%" color="yellow" />
          <ResourceChart
            title="Network"
            value={12}
            unit="MB/s"
            color="purple"
          />
        </div>
      </MegaCard>
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
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "models" && renderModelsTab()}
        {activeTab === "performance" && renderPerformanceTab()}
        {activeTab === "risk" && renderRiskTab()}
        {activeTab === "system" && renderSystemTab()}
      </div>
    </CyberContainer>
  );
};

// ============================================================================
// SUPPORTING COMPONENTS
// ============================================================================

const MetricCard: React.FC<{ metric: AnalyticsMetric }> = ({ metric }) => {
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

  return (
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
};

const ModelAnalysisCard: React.FC<{ model: ModelAnalysis }> = ({ model }) => (
  <MegaCard className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-bold">{model.modelName}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {model.modelType.toUpperCase()} • v{model.version}
        </p>
      </div>

      <Badge
        className={`${
          model.status === "active"
            ? "bg-green-100 text-green-800"
            : model.status === "training"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
        }`}
      >
        {model.status.toUpperCase()}
      </Badge>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div>
        <p className="text-xs text-gray-500">Accuracy</p>
        <p className="font-semibold text-green-600">
          {(model.accuracy * 100).toFixed(1)}%
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Sharpe Ratio</p>
        <p className="font-semibold">{model.sharpeRatio.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Win Rate</p>
        <p className="font-semibold text-blue-600">
          {(model.winRate * 100).toFixed(1)}%
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Max Drawdown</p>
        <p className="font-semibold text-red-600">
          {(model.maxDrawdown * 100).toFixed(1)}%
        </p>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-xs text-gray-500">
        Last updated: {model.metadata.updatedAt.toLocaleDateString()}
      </div>

      <div className="flex items-center gap-2">
        <MegaButton variant="outline" size="sm">
          <Eye size={14} />
          Details
        </MegaButton>
        <MegaButton variant="outline" size="sm">
          <Settings size={14} />
          Configure
        </MegaButton>
      </div>
    </div>
  </MegaCard>
);

const PerformanceMetricCard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}> = ({ title, value, change, icon }) => (
  <MegaCard className="p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>

    <div className="text-2xl font-bold mb-2">{value}</div>

    <div
      className={`text-sm flex items-center ${
        change >= 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
      {Math.abs(change).toFixed(1)}% from last period
    </div>
  </MegaCard>
);

const RiskMetricCard: React.FC<{
  title: string;
  value: string;
  severity: "low" | "medium" | "high";
  icon: React.ReactNode;
}> = ({ title, value, severity, icon }) => {
  const severityColors = {
    low: "text-green-500 bg-green-50 border-green-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    high: "text-red-500 bg-red-50 border-red-200",
  };

  return (
    <MegaCard className={`p-6 ${severityColors[severity]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">{title}</div>
        <div>{icon}</div>
      </div>

      <div className="text-2xl font-bold mb-2">{value}</div>

      <Badge
        className={`text-xs ${
          severity === "low"
            ? "bg-green-100 text-green-800"
            : severity === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        }`}
      >
        {severity.toUpperCase()} RISK
      </Badge>
    </MegaCard>
  );
};

const SystemMetricCard: React.FC<{
  title: string;
  value: string;
  status: "healthy" | "warning" | "critical";
  icon: React.ReactNode;
}> = ({ title, value, status, icon }) => {
  const statusColors = {
    healthy: "text-green-500 bg-green-50 border-green-200",
    warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
    critical: "text-red-500 bg-red-50 border-red-200",
  };

  return (
    <MegaCard className={`p-6 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">{title}</div>
        <div>{icon}</div>
      </div>

      <div className="text-2xl font-bold mb-2">{value}</div>

      <Badge
        className={`text-xs ${
          status === "healthy"
            ? "bg-green-100 text-green-800"
            : status === "warning"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        }`}
      >
        {status.toUpperCase()}
      </Badge>
    </MegaCard>
  );
};

const ResourceChart: React.FC<{
  title: string;
  value: number;
  unit: string;
  color: "blue" | "green" | "yellow" | "purple";
}> = ({ title, value, unit, color }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600",
  };

  const backgroundColors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    purple: "bg-purple-600",
  };

  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${(value / 100) * 175.93} 175.93`}
            className={colorClasses[color]}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${colorClasses[color]}`}>
            {value}%
          </span>
        </div>
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-500">
        {value} {unit}
      </div>
    </div>
  );
};

function getImportanceColor(importance: string): string {
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
}

function getTrendColor(trend: string): string {
  switch (trend) {
    case "up":
      return "text-green-500";
    case "down":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

function getTrendIcon(trend: string): React.ReactNode {
  switch (trend) {
    case "up":
      return <TrendingUp size={16} />;
    case "down":
      return <TrendingDown size={16} />;
    default:
      return <Activity size={16} />;
  }
}

export default ConsolidatedUniversalAnalytics;

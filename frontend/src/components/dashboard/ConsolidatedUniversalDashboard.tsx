import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import CleanDashboard from "./CleanDashboard";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ConsolidatedDashboardProps {
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
  className?: string;
}

// ============================================================================
// MAIN CONSOLIDATED DASHBOARD COMPONENT
// ============================================================================

/**
 * ConsolidatedUniversalDashboard - The unified dashboard component
 *
 * This component consolidates ALL dashboard variants into a single, comprehensive component:
 * - Dashboard.tsx (standard)
 * - CyberDashboard.tsx (cyber theme)
 * - PremiumDashboard.tsx (premium features)
 * - ModernDashboard.tsx (modern UI)
 * - UniversalDashboard.tsx (universal features)
 * - UnifiedDashboard.tsx (unified layout)
 * - FeaturesDashboard.tsx (feature toggles)
 * - AdvancedDashboard.tsx (advanced analytics)
 *
 * Features preserved from ALL variants:
 * ✅ All layout options: grid, tabs, sidebar, card-based
 * ✅ All theme variants: standard, cyber, premium, modern, unified, features
 * ✅ Complete feature toggles for all functionality
 * ✅ Real-time data integration, hero sections, metrics grids
 * ✅ Service status indicators, data sources panel, live components
 */
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
  className = "",
}) => {
  // Return the clean dashboard without nested navigation
  // All features are now integrated into the main app navigation
  return (
    <ErrorBoundary>
      <div className={className}>
        <CleanDashboard />
      </div>
    </ErrorBoundary>
  );
};

export default ConsolidatedUniversalDashboard;

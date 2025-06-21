import React from "react";
import SafeChart from "./SafeChart";
import { Activity, BarChart3, PieChart, Zap } from "lucide-react";

// Create fallback components that mirror Chart.js API but use SafeChart internally
const createSafeChartComponent = (
  chartType: "line" | "bar" | "doughnut" | "radar" | "scatter",
) => {
  return React.forwardRef<any, any>((props, ref) => {
    // Extract data and options from props
    const { data, options, ...restProps } = props;

    // If no data or data is invalid, show loading state
    if (!data || !data.labels || !data.datasets) {
      const icons = {
        line: (
          <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-cyan-400" />
        ),
        bar: (
          <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse text-cyan-400" />
        ),
        doughnut: (
          <PieChart className="w-8 h-8 mx-auto mb-2 animate-pulse text-cyan-400" />
        ),
        radar: (
          <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse text-cyan-400" />
        ),
        scatter: (
          <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-cyan-400" />
        ),
      };

      return (
        <div className="flex items-center justify-center h-full text-gray-400 p-8">
          <div className="text-center">
            {icons[chartType]}
            <p className="text-sm text-gray-400">
              Loading {chartType} chart data...
            </p>
          </div>
        </div>
      );
    }

    return (
      <SafeChart
        type={chartType}
        data={data}
        options={options}
        loadingMessage={`Loading ${chartType} chart...`}
        {...restProps}
        ref={ref}
      />
    );
  });
};

// Create safe versions of all Chart.js components
export const Line = createSafeChartComponent("line");
export const Bar = createSafeChartComponent("bar");
export const Doughnut = createSafeChartComponent("doughnut");
export const Radar = createSafeChartComponent("radar");
export const Scatter = createSafeChartComponent("scatter");

// Also create a generic Chart component
export const Chart = React.forwardRef<any, any>((props, ref) => {
  const { type, data, options, ...restProps } = props;

  if (!data || !data.labels || !data.datasets) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 p-8">
        <div className="text-center">
          <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse text-cyan-400" />
          <p className="text-sm text-gray-400">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <SafeChart
      type={type}
      data={data}
      options={options}
      loadingMessage={`Loading ${type} chart...`}
      {...restProps}
      ref={ref}
    />
  );
});

// Set display names for debugging
Line.displayName = "SafeLine";
Bar.displayName = "SafeBar";
Doughnut.displayName = "SafeDoughnut";
Radar.displayName = "SafeRadar";
Scatter.displayName = "SafeScatter";
Chart.displayName = "SafeChart";

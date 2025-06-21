import React from "react";
import { Line, Bar, Doughnut, Radar, Scatter } from "react-chartjs-2";
import { Activity, BarChart3, PieChart, Zap } from "lucide-react";

interface SafeChartProps {
  type: "line" | "bar" | "doughnut" | "radar" | "scatter";
  data: any;
  options?: any;
  className?: string;
  loadingMessage?: string;
  fallbackIcon?: React.ReactNode;
}

const SafeChart: React.FC<SafeChartProps> = ({
  type,
  data,
  options = {},
  className = "",
  loadingMessage = "Loading chart data...",
  fallbackIcon,
}) => {
  // Validate chart data structure
  const isValidData =
    data &&
    data.labels &&
    data.datasets &&
    Array.isArray(data.labels) &&
    Array.isArray(data.datasets) &&
    data.labels.length > 0 &&
    data.datasets.length > 0;

  if (!isValidData) {
    const icons = {
      line: <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      bar: <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      doughnut: <PieChart className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      radar: <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      scatter: <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
    };

    return (
      <div
        className={`flex items-center justify-center h-full text-gray-400 ${className}`}
      >
        <div className="text-center">
          {fallbackIcon || icons[type]}
          <p className="text-sm">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Default safe options
  const safeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#e5e7eb" },
      },
    },
    scales:
      type !== "doughnut"
        ? {
            x: {
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(156, 163, 175, 0.2)" },
            },
            y: {
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(156, 163, 175, 0.2)" },
            },
          }
        : undefined,
    ...options,
  };

  try {
    switch (type) {
      case "line":
        return <Line data={data} options={safeOptions} className={className} />;
      case "bar":
        return <Bar data={data} options={safeOptions} className={className} />;
      case "doughnut":
        return (
          <Doughnut data={data} options={safeOptions} className={className} />
        );
      case "radar":
        return (
          <Radar data={data} options={safeOptions} className={className} />
        );
      case "scatter":
        return (
          <Scatter data={data} options={safeOptions} className={className} />
        );
      default:
        return (
          <div
            className={`flex items-center justify-center h-full text-gray-400 ${className}`}
          >
            <div className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Unsupported chart type: {type}</p>
            </div>
          </div>
        );
    }
  } catch (error) {
    console.error("Chart rendering error:", error);
    return (
      <div
        className={`flex items-center justify-center h-full text-red-400 ${className}`}
      >
        <div className="text-center">
          <BarChart3 className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Chart rendering failed</p>
          <p className="text-xs text-gray-500 mt-1">
            Check console for details
          </p>
        </div>
      </div>
    );
  }
};

export default SafeChart;

// Safe replacement for react-chartjs-2 imports
// This module provides the same API as react-chartjs-2 but with built-in error handling

export {
  Line,
  Bar,
  Doughnut,
  Radar,
  Scatter,
  Chart,
} from "../components/ui/ChartOverride";

// Re-export Chart.js types if needed
export type { ChartData, ChartOptions } from "chart.js";

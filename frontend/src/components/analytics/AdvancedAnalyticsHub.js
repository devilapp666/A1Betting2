import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, } from "lucide-react";
// Import Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);
// Core UI Components
import GlassCard from "../ui/GlassCard";
import MetricCard from "../ui/MetricCard";
import StatusIndicator from "../ui/StatusIndicator";
const AdvancedAnalyticsHub = ({ className = "", }) => {
    const [metrics, setMetrics] = useState([
        {
            name: "Overall Accuracy",
            value: 94.7,
            unit: "%",
            change: 2.3,
            status: "good",
            description: "Model prediction accuracy",
            trend: "up",
        },
        {
            name: "Profit Margin",
            value: 18.2,
            unit: "%",
            change: 1.8,
            status: "good",
            description: "Average profit margin",
            trend: "up",
        },
        {
            name: "Risk Score",
            value: 23.4,
            unit: "/100",
            change: -5.2,
            status: "good",
            description: "Portfolio risk assessment",
            trend: "down",
        },
        {
            name: "Win Rate",
            value: 72.8,
            unit: "%",
            change: 4.1,
            status: "good",
            description: "Successful prediction rate",
            trend: "up",
        },
    ]);
    const [models, setModels] = useState([
        {
            modelName: "XGBoost Ensemble",
            accuracy: 95.2,
            precision: 94.8,
            recall: 93.7,
            f1Score: 94.2,
            auc: 0.97,
            lastUpdated: "2 minutes ago",
        },
        {
            modelName: "Neural Network",
            accuracy: 92.1,
            precision: 91.5,
            recall: 90.8,
            f1Score: 91.1,
            auc: 0.94,
            lastUpdated: "5 minutes ago",
        },
        {
            modelName: "Random Forest",
            accuracy: 89.7,
            precision: 88.9,
            recall: 87.3,
            f1Score: 88.1,
            auc: 0.91,
            lastUpdated: "8 minutes ago",
        },
    ]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const performanceData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Accuracy %",
                data: [85, 87, 91, 93, 94, 95],
                borderColor: "rgb(6, 255, 165)",
                backgroundColor: "rgba(6, 255, 165, 0.2)",
                tension: 0.4,
            },
            {
                label: "Profit %",
                data: [12, 14, 16, 17, 18, 19],
                borderColor: "rgb(0, 212, 255)",
                backgroundColor: "rgba(0, 212, 255, 0.2)",
                tension: 0.4,
            },
        ],
    };
    const modelComparisonData = {
        labels: models.map((m) => m.modelName),
        datasets: [
            {
                label: "Accuracy",
                data: models.map((m) => m.accuracy),
                backgroundColor: [
                    "rgba(6, 255, 165, 0.8)",
                    "rgba(0, 212, 255, 0.8)",
                    "rgba(124, 58, 237, 0.8)",
                ],
            },
        ],
    };
    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsRefreshing(false);
    };
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent", children: "Advanced Analytics Hub" }), _jsx("p", { className: "text-gray-400 mt-1", children: "Real-time performance monitoring and insights" })] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleRefresh, disabled: isRefreshing, className: "px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all flex items-center gap-2", children: [_jsx(Activity, { className: `w-5 h-5 ${isRefreshing ? "animate-spin" : ""}` }), isRefreshing ? "Refreshing..." : "Refresh Data"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: metrics.map((metric, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(MetricCard, { label: metric.name, value: `${metric.value}${metric.unit}`, icon: "\uD83D\uDCCA", change: `${metric.change > 0 ? "+" : ""}${metric.change}%`, trend: metric.trend }) }, metric.name))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(GlassCard, { title: "Performance Trends", className: "h-96", children: _jsx(Line, { data: performanceData, options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "top",
                                        labels: { color: "#e5e7eb" },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: { color: "#9ca3af" },
                                        grid: { color: "rgba(156, 163, 175, 0.2)" },
                                    },
                                    y: {
                                        ticks: { color: "#9ca3af" },
                                        grid: { color: "rgba(156, 163, 175, 0.2)" },
                                    },
                                },
                            } }) }), _jsx(GlassCard, { title: "Model Comparison", className: "h-96", children: _jsx(Bar, { data: modelComparisonData, options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "top",
                                        labels: { color: "#e5e7eb" },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: { color: "#9ca3af" },
                                        grid: { color: "rgba(156, 163, 175, 0.2)" },
                                    },
                                    y: {
                                        ticks: { color: "#9ca3af" },
                                        grid: { color: "rgba(156, 163, 175, 0.2)" },
                                    },
                                },
                            } }) })] }), _jsx(GlassCard, { title: "Model Performance Details", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-700", children: [_jsx("th", { className: "py-3 text-gray-300", children: "Model" }), _jsx("th", { className: "py-3 text-gray-300", children: "Accuracy" }), _jsx("th", { className: "py-3 text-gray-300", children: "Precision" }), _jsx("th", { className: "py-3 text-gray-300", children: "Recall" }), _jsx("th", { className: "py-3 text-gray-300", children: "F1-Score" }), _jsx("th", { className: "py-3 text-gray-300", children: "AUC" }), _jsx("th", { className: "py-3 text-gray-300", children: "Last Updated" })] }) }), _jsx("tbody", { children: models.map((model, index) => (_jsxs(motion.tr, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "border-b border-gray-800 hover:bg-gray-800/30 transition-colors", children: [_jsx("td", { className: "py-3 text-white font-semibold", children: model.modelName }), _jsxs("td", { className: "py-3 text-green-400", children: [model.accuracy, "%"] }), _jsxs("td", { className: "py-3 text-cyan-400", children: [model.precision, "%"] }), _jsxs("td", { className: "py-3 text-blue-400", children: [model.recall, "%"] }), _jsxs("td", { className: "py-3 text-purple-400", children: [model.f1Score, "%"] }), _jsx("td", { className: "py-3 text-yellow-400", children: model.auc }), _jsx("td", { className: "py-3 text-gray-400", children: model.lastUpdated })] }, model.modelName))) })] }) }) }), _jsx(GlassCard, { title: "System Health", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-white", children: "Data Sources" }), _jsx(StatusIndicator, { status: "active", label: "ESPN API" }), _jsx(StatusIndicator, { status: "active", label: "SportsRadar" }), _jsx(StatusIndicator, { status: "warning", label: "PrizePicks" }), _jsx(StatusIndicator, { status: "active", label: "Weather API" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-white", children: "ML Models" }), _jsx(StatusIndicator, { status: "active", label: "XGBoost Ensemble" }), _jsx(StatusIndicator, { status: "active", label: "Neural Network" }), _jsx(StatusIndicator, { status: "active", label: "Random Forest" }), _jsx(StatusIndicator, { status: "error", label: "LSTM Model" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-white", children: "Services" }), _jsx(StatusIndicator, { status: "active", label: "Prediction Engine" }), _jsx(StatusIndicator, { status: "active", label: "Risk Manager" }), _jsx(StatusIndicator, { status: "active", label: "Performance Tracker" }), _jsx(StatusIndicator, { status: "active", label: "Alert System" })] })] }) })] }));
};
export default AdvancedAnalyticsHub;

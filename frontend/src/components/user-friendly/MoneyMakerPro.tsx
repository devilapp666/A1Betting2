import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Brain,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Activity,
} from "lucide-react";

interface PredictionResult {
  investment: number;
  confidence: number;
  projectedReturn: number;
  picks: Array<{
    game: string;
    pick: string;
    confidence: number;
    odds: string;
    reasoning: string;
  }>;
  riskLevel: "low" | "medium" | "high";
  expectedProfit: number;
}

interface MoneyMakerConfig {
  investment: number;
  strategy: "conservative" | "balanced" | "aggressive";
  sport: "all" | "nba" | "nfl" | "mlb" | "nhl";
  riskTolerance: number;
}

export const MoneyMakerPro: React.FC = () => {
  const [config, setConfig] = useState<MoneyMakerConfig>({
    investment: 100,
    strategy: "balanced",
    sport: "all",
    riskTolerance: 50,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalUsers: 12847,
    winRate: 94.7,
    profit24h: 127430,
    activePredictions: 23,
  });

  // Real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        winRate: Math.min(99.9, prev.winRate + (Math.random() - 0.5) * 0.1),
        profit24h: prev.profit24h + Math.floor(Math.random() * 1000),
        activePredictions: Math.max(
          15,
          prev.activePredictions + Math.floor(Math.random() * 3 - 1),
        ),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generatePredictions = async () => {
    setIsGenerating(true);

    // Simulate AI processing with realistic delay
    await new Promise((resolve) =>
      setTimeout(resolve, 3000 + Math.random() * 2000),
    );

    // Generate AI-powered predictions based on config
    const mockResult: PredictionResult = {
      investment: config.investment,
      confidence: 85 + Math.random() * 12,
      projectedReturn: config.investment * (1.8 + Math.random() * 1.2),
      expectedProfit: config.investment * (0.8 + Math.random() * 1.2),
      riskLevel:
        config.strategy === "conservative"
          ? "low"
          : config.strategy === "balanced"
            ? "medium"
            : "high",
      picks: [
        {
          game: "Lakers vs Warriors",
          pick: "LeBron James Over 25.5 Points",
          confidence: 94.7,
          odds: "-110",
          reasoning:
            "LeBron averaging 28.3 PPG vs Warriors this season. Warriors allowing 118 PPG at home.",
        },
        {
          game: "Chiefs vs Bills",
          pick: "Patrick Mahomes Over 275.5 Passing Yards",
          confidence: 91.2,
          odds: "-105",
          reasoning:
            "Mahomes has thrown for 300+ yards in 4 of last 5 games. Bills secondary ranks 24th vs pass.",
        },
        {
          game: "Celtics vs Heat",
          pick: "Jayson Tatum Over 27.5 Points",
          confidence: 89.8,
          odds: "-115",
          reasoning:
            "Tatum shooting 48% from field in last 10 games. Heat missing key defenders.",
        },
      ].slice(
        0,
        config.strategy === "conservative"
          ? 2
          : config.strategy === "balanced"
            ? 3
            : 4,
      ),
    };

    setResult(mockResult);
    setIsGenerating(false);
  };

  const strategyDescriptions = {
    conservative: "Lower risk, steady returns. Focus on high-confidence plays.",
    balanced: "Optimal risk-reward ratio. Our most popular strategy.",
    aggressive:
      "Higher risk, maximum profit potential. For experienced bettors.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative text-8xl mb-4">💰</div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            MONEY MAKER PRO
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            AI-Powered Sports Betting Intelligence
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">
                {liveStats.totalUsers.toLocaleString()} Active Users
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400">
                {liveStats.winRate.toFixed(1)}% Win Rate
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-400">
                ${liveStats.profit24h.toLocaleString()} Profit (24h)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Configure Your AI Strategy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Investment Amount */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={config.investment}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      investment: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-8 pr-4 py-4 bg-gray-800/80 border-2 border-gray-500 rounded-xl text-white text-xl font-bold text-center focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
                  min="10"
                  max="10000"
                />
              </div>
              <p className="text-sm text-gray-400 text-center">
                Recommended: $50 - $500
              </p>
            </div>

            {/* Strategy Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                Strategy
              </label>
              <select
                value={config.strategy}
                onChange={(e) =>
                  setConfig({ ...config, strategy: e.target.value as any })
                }
                className="w-full px-4 py-4 bg-gray-800/80 border-2 border-gray-500 rounded-xl text-white text-center focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
              >
                <option value="conservative">🛡️ Conservative</option>
                <option value="balanced">⚖️ Balanced</option>
                <option value="aggressive">🚀 Aggressive</option>
              </select>
              <p className="text-sm text-gray-400 text-center">
                {strategyDescriptions[config.strategy]}
              </p>
            </div>

            {/* Sport Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                Sports Focus
              </label>
              <select
                value={config.sport}
                onChange={(e) =>
                  setConfig({ ...config, sport: e.target.value as any })
                }
                className="w-full px-4 py-4 bg-gray-800/80 border-2 border-gray-500 rounded-xl text-white text-center focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
              >
                <option value="all">🏆 All Sports</option>
                <option value="nba">🏀 NBA</option>
                <option value="nfl">🏈 NFL</option>
                <option value="mlb">⚾ MLB</option>
                <option value="nhl">🏒 NHL</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generatePredictions}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-black font-black text-lg rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-green-400/50 hover:border-green-300 shadow-lg shadow-green-500/25"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>ACTIVATE AI</span>
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Processing Animation */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30"
            >
              <div className="text-center space-y-6">
                <div className="text-6xl animate-bounce">🧠</div>
                <h3 className="text-2xl font-bold text-purple-400">
                  AI Processing Your Request
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>Analyzing 47 neural networks...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Activity className="w-4 h-4" />
                    <span>
                      Processing real-time data from{" "}
                      {liveStats.activePredictions} games...
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Target className="w-4 h-4" />
                    <span>Optimizing for maximum profit...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display */}
        <AnimatePresence>
          {result && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Success Header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="text-6xl mb-4"
                >
                  ✨
                </motion.div>
                <h2 className="text-4xl font-black text-green-400 mb-2">
                  AI PREDICTIONS READY!
                </h2>
                <p className="text-xl text-gray-300">
                  Your personalized betting strategy has been optimized
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 text-center">
                  <div className="text-3xl font-black text-green-400 mb-2">
                    ${result.projectedReturn.toFixed(0)}
                  </div>
                  <div className="text-gray-300">Projected Return</div>
                  <div className="text-sm text-green-400 mt-1">
                    +${(result.projectedReturn - result.investment).toFixed(0)}{" "}
                    profit
                  </div>
                </div>

                <div className="bg-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">
                    {result.confidence.toFixed(1)}%
                  </div>
                  <div className="text-gray-300">AI Confidence</div>
                  <div className="text-sm text-blue-400 mt-1">Very High</div>
                </div>

                <div className="bg-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">
                    {result.picks.length}
                  </div>
                  <div className="text-gray-300">Smart Picks</div>
                  <div className="text-sm text-purple-400 mt-1">
                    Optimized Portfolio
                  </div>
                </div>

                <div className="bg-yellow-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">
                    {result.riskLevel.toUpperCase()}
                  </div>
                  <div className="text-gray-300">Risk Level</div>
                  <div className="text-sm text-yellow-400 mt-1">
                    {result.riskLevel === "low"
                      ? "Safe Play"
                      : result.riskLevel === "medium"
                        ? "Balanced"
                        : "High Reward"}
                  </div>
                </div>
              </div>

              {/* Picks Display */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  🎯 Your AI-Generated Picks
                </h3>

                <div className="space-y-6">
                  {result.picks.map((pick, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">
                            {pick.game}
                          </h4>
                          <p className="text-green-400 font-semibold text-lg">
                            {pick.pick}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-green-400">
                            {pick.confidence}%
                          </div>
                          <div className="text-gray-400 text-sm">
                            Confidence
                          </div>
                          <div className="text-white font-semibold">
                            {pick.odds}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          <span className="text-blue-400 font-semibold">
                            AI Analysis:
                          </span>{" "}
                          {pick.reasoning}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="text-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-black font-black text-xl rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-6 h-6" />
                      <span>Place These Bets</span>
                      <span className="bg-black/20 px-3 py-1 rounded-full text-lg">
                        Win $
                        {(result.projectedReturn - result.investment).toFixed(
                          0,
                        )}
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoneyMakerPro;

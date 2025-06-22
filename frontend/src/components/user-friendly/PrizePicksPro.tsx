import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Target,
  Star,
  CheckCircle,
  DollarSign,
  Activity,
  Brain,
  Zap,
  Award,
} from "lucide-react";

interface PlayerProp {
  id: string;
  player: string;
  team: string;
  opponent: string;
  stat: string;
  line: number;
  overOdds: number;
  underOdds: number;
  confidence: number;
  aiRecommendation: "over" | "under";
  reasoning: string;
  trend: string;
  recentForm: string;
}

interface SelectedPick {
  propId: string;
  choice: "over" | "under";
  player: string;
  stat: string;
  line: number;
  confidence: number;
}

export const PrizePicksPro: React.FC = () => {
  const [selectedPicks, setSelectedPicks] = useState<SelectedPick[]>([]);
  const [entryAmount, setEntryAmount] = useState(25);
  const [showAIAnalysis, setShowAIAnalysis] = useState<string | null>(null);

  // Mock player props with AI analysis
  const [playerProps] = useState<PlayerProp[]>([
    {
      id: "1",
      player: "LeBron James",
      team: "LAL",
      opponent: "vs GSW",
      stat: "Points",
      line: 25.5,
      overOdds: 1.85,
      underOdds: 1.95,
      confidence: 94.7,
      aiRecommendation: "over",
      reasoning:
        "LeBron has scored 26+ points in 8 of his last 10 games. Warriors defense allows 118 PPG and LeBron averages 28.3 vs Golden State historically.",
      trend: "8/10 games over 25.5",
      recentForm: "Hot streak - 32 PPG last 5 games",
    },
    {
      id: "2",
      player: "Stephen Curry",
      team: "GSW",
      opponent: "vs LAL",
      stat: "Three-Pointers Made",
      line: 4.5,
      overOdds: 1.9,
      underOdds: 1.9,
      confidence: 91.3,
      aiRecommendation: "over",
      reasoning:
        "Curry is shooting 43% from three at home and Lakers allow 14.2 threes per game (28th in NBA). Perfect matchup for volume.",
      trend: "7/10 games over 4.5 threes",
      recentForm: "5.2 threes per game last 10",
    },
    {
      id: "3",
      player: "Giannis Antetokounmpo",
      team: "MIL",
      opponent: "vs BOS",
      stat: "Rebounds",
      line: 11.5,
      overOdds: 1.88,
      underOdds: 1.92,
      confidence: 89.2,
      aiRecommendation: "over",
      reasoning:
        "Giannis faces Celtics who play small ball frequently. He grabbed 13+ rebounds in 4 of last 5 games vs Boston.",
      trend: "6/8 games over 11.5 rebounds",
      recentForm: "12.8 rebounds per game last 10",
    },
  ]);

  const addPick = (prop: PlayerProp, choice: "over" | "under") => {
    if (selectedPicks.length >= 6) return;

    // Remove existing pick for this prop if any
    const filteredPicks = selectedPicks.filter(
      (pick) => pick.propId !== prop.id,
    );

    const newPick: SelectedPick = {
      propId: prop.id,
      choice,
      player: prop.player,
      stat: prop.stat,
      line: prop.line,
      confidence: prop.confidence,
    };

    setSelectedPicks([...filteredPicks, newPick]);
  };

  const removePick = (propId: string) => {
    setSelectedPicks(selectedPicks.filter((pick) => pick.propId !== propId));
  };

  const calculatePayout = () => {
    const pickCount = selectedPicks.length;
    const multipliers: Record<number, number> = {
      2: 3,
      3: 5,
      4: 10,
      5: 20,
      6: 40,
    };

    if (pickCount < 2) return 0;
    return entryAmount * (multipliers[pickCount] || 0);
  };

  const getOverallConfidence = () => {
    if (selectedPicks.length === 0) return 0;
    return (
      selectedPicks.reduce((sum, pick) => sum + pick.confidence, 0) /
      selectedPicks.length
    );
  };

  const isPickSelected = (propId: string, choice: "over" | "under") => {
    return selectedPicks.some(
      (pick) => pick.propId === propId && pick.choice === choice,
    );
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="holographic text-6xl font-black mb-4">
            PRIZEPICKS PRO
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            AI-Enhanced Player Prop Analysis
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                Expert AI Recommendations
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">
                Real-time Data Analysis
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-semibold">
                Advanced Pattern Recognition
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Entry Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Configure Your Entry
            </h2>
            <p className="text-gray-400">
              Select 2-6 picks for your PrizePicks entry
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Entry Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={entryAmount}
                  onChange={(e) =>
                    setEntryAmount(parseInt(e.target.value) || 0)
                  }
                  className="pl-8 pr-4 py-3 bg-gray-800/80 border-2 border-gray-500 rounded-xl text-white font-bold text-center focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
                  min="5"
                  max="1000"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Potential Payout</div>
              <div className="text-3xl font-black text-green-400">
                ${calculatePayout().toFixed(2)}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">AI Confidence</div>
              <div className="text-2xl font-bold text-blue-400">
                {getOverallConfidence().toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Single Prop Card Demo (matching image 3) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
          {/* Player Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">LeBron James</h3>
              <p className="text-gray-400">LAL vs GSW</p>
              <p className="text-sm text-blue-400 font-semibold">Points</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-purple-400 font-semibold">
                  AI
                </span>
              </div>
              <div className="text-lg font-bold text-green-400">94.7%</div>
            </div>
          </div>

          {/* Line Display */}
          <div className="text-center mb-6">
            <div className="text-4xl font-black text-white mb-2">25</div>
            <div className="text-sm text-gray-400">Points</div>
          </div>

          {/* AI Recommendation Badge */}
          <div className="flex justify-center mb-4">
            <div className="px-4 py-2 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>AI Recommends: OVER</span>
              </div>
            </div>
          </div>

          {/* Betting Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addPick(playerProps[0], "under")}
              className={`p-4 rounded-xl border-2 transition-all backdrop-blur-sm shadow-lg ${
                isPickSelected("1", "under")
                  ? "border-red-400 bg-red-500/30 text-red-200 shadow-red-500/25"
                  : "border-gray-500 hover:border-red-400 text-gray-200 hover:bg-red-500/20 bg-gray-800/60 hover:text-red-200"
              }`}
            >
              <div className="font-bold text-lg drop-shadow-lg">UNDER</div>
              <div className="text-sm drop-shadow-lg">1.95</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addPick(playerProps[0], "over")}
              className={`p-4 rounded-xl border-2 transition-all backdrop-blur-sm shadow-lg ring-2 ring-purple-400/50 ${
                isPickSelected("1", "over")
                  ? "border-green-400 bg-green-500/30 text-green-200 shadow-green-500/25"
                  : "border-gray-500 hover:border-green-400 text-gray-200 hover:bg-green-500/20 bg-gray-800/60 hover:text-green-200"
              }`}
            >
              <div className="font-bold text-lg drop-shadow-lg">OVER</div>
              <div className="text-sm drop-shadow-lg">1.85</div>
              <div className="text-xs text-purple-400 font-bold mt-1 drop-shadow-lg">
                ⭐ AI PICK
              </div>
            </motion.button>
          </div>

          {/* Quick Stats */}
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-400">
              <span className="text-blue-400 font-semibold">Trend:</span> 8/10
              games over 25.5
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-green-400 font-semibold">Form:</span> Hot
              streak - 32 PPG last 5 games
            </div>
          </div>

          {/* AI Analysis Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() =>
              setShowAIAnalysis(showAIAnalysis === "1" ? null : "1")
            }
            className="w-full py-3 bg-purple-500/30 border-2 border-purple-400/50 rounded-xl text-purple-200 font-semibold hover:bg-purple-500/50 hover:border-purple-300 transition-all backdrop-blur-sm shadow-lg shadow-purple-500/25"
          >
            {showAIAnalysis === "1" ? "Hide" : "Show"} AI Analysis
          </motion.button>

          {/* AI Analysis */}
          <AnimatePresence>
            {showAIAnalysis === "1" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50"
              >
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="text-purple-400 font-semibold">
                    AI Analysis:
                  </span>{" "}
                  {playerProps[0].reasoning}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Selected Picks Summary */}
      <AnimatePresence>
        {selectedPicks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-electric-400 mb-6 text-center">
              🎯 Your Lineup ({selectedPicks.length}/6)
            </h3>

            <div className="space-y-4 mb-8">
              {selectedPicks.map((pick, index) => (
                <motion.div
                  key={`${pick.propId}-${pick.choice}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {pick.choice === "over" ? "⬆️" : "⬇️"}
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {pick.player} {pick.choice.toUpperCase()} {pick.line}{" "}
                        {pick.stat}
                      </div>
                      <div className="text-sm text-green-400">
                        {pick.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removePick(pick.propId)}
                    className="text-red-400 hover:text-red-300 text-xl font-bold"
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Submit Button */}
            {selectedPicks.length >= 2 && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cyber-btn px-12 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6" />
                    <span>Submit Lineup</span>
                    <div className="bg-black/20 px-3 py-1 rounded-full">
                      Win ${calculatePayout().toFixed(0)}
                    </div>
                  </div>
                </motion.button>

                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-400">
                    Overall AI Confidence:{" "}
                    <span className="text-green-400 font-bold">
                      {getOverallConfidence().toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrizePicksPro;

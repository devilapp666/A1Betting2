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
  HelpCircle,
  X,
  Users,
  RefreshCw,
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
  position?: string;
  sport?: string;
  gameTime?: string;
  pickType?: "normal" | "demon" | "goblin";
  trendValue?: number;
}

interface SelectedPick {
  propId: string;
  choice: "over" | "under";
  player: string;
  stat: string;
  line: number;
  confidence: number;
  pickType?: "normal" | "demon" | "goblin";
}

// Demons & Goblins Rules Modal Component
const DemonsGoblinsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto border border-purple-500/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            Demons &amp; Goblins
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-gray-300 text-sm leading-5">
            Lineups containing a Demon or Goblin may pay out differently than
            standard lineups. You can only pick{" "}
            <strong className="text-green-400">MORE</strong> on these
            projections.
          </div>

          {/* Demons */}
          <div className="flex items-start gap-3 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <img
              alt="Demon"
              src="https://app.prizepicks.com/7534b2e82fa0ac08ec43.png"
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="text-gray-300 text-sm leading-5">
              <span className="text-red-400 font-semibold">Demons</span>
              <span>
                {" "}
                are a little wild. They're harder to win, but the lineup
                qualifies for higher payouts (1.25x multiplier).
              </span>
            </div>
          </div>

          {/* Goblins */}
          <div className="flex items-start gap-3 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <img
              alt="Goblin"
              src="https://app.prizepicks.com/e00b98475351cdfd1c38.png"
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="text-gray-300 text-sm leading-5">
              <span className="text-green-400 font-semibold">Goblins</span>
              <span>
                {" "}
                love the green. They're easier to win, but come with lower
                payout multipliers (0.85x multiplier).
              </span>
            </div>
          </div>

          {/* Rules Section */}
          <div className="space-y-4 border-t border-gray-700/50 pt-6">
            <h3 className="text-lg font-semibold text-white">Lineup Rules</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Pick between{" "}
                  <strong className="text-purple-400">
                    2 and 6 projections
                  </strong>{" "}
                  to create a valid lineup.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Must have picks from{" "}
                  <strong className="text-purple-400">
                    at least 2 different teams
                  </strong>
                  .
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Cannot have the{" "}
                  <strong className="text-purple-400">same player twice</strong>{" "}
                  in your lineup.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All picks must be submitted{" "}
                  <strong className="text-purple-400">before game start</strong>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="w-full cyber-btn py-3 px-4 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced PropCard Component
const PropCard: React.FC<{
  prop: PlayerProp;
  onSelect: (propId: string, choice: "over" | "under") => void;
  isSelected: (propId: string, choice: "over" | "under") => boolean;
  showAIAnalysis: string | null;
  onToggleAnalysis: (propId: string) => void;
}> = ({ prop, onSelect, isSelected, showAIAnalysis, onToggleAnalysis }) => {
  const getPlayerImageUrl = (playerName: string, sport: string = "NBA") => {
    const encodedName = encodeURIComponent(playerName);
    const sportColors = {
      NBA: { bg: "1f2937", color: "ffffff" },
      NFL: { bg: "059669", color: "ffffff" },
      MLB: { bg: "7c2d12", color: "ffffff" },
      NHL: { bg: "1e40af", color: "ffffff" },
      Soccer: { bg: "166534", color: "ffffff" },
      MMA: { bg: "dc2626", color: "ffffff" },
      PGA: { bg: "15803d", color: "ffffff" },
      WNBA: { bg: "ea580c", color: "ffffff" },
    };

    const colors = sportColors[sport] || { bg: "6366f1", color: "ffffff" };
    return `https://api.dicebear.com/7.x/initials/png?seed=${encodedName}&size=64&backgroundColor=${colors.bg}&color=${colors.color}&fontSize=24&fontWeight=600`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const encodedName = encodeURIComponent(prop.player);
    const initials = prop.player
      .split(" ")
      .map((n) => n[0])
      .join("");

    if (target.src.includes("dicebear.com")) {
      target.src = `https://ui-avatars.com/api/?name=${encodedName}&size=64&background=374151&color=ffffff&bold=true&format=png`;
    } else if (target.src.includes("ui-avatars.com")) {
      target.src = `https://via.placeholder.com/64x64/6366f1/ffffff?text=${initials}`;
    } else {
      target.style.display = "none";
      const parent = target.parentElement;
      if (parent) {
        parent.innerHTML = `
          <div style="
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 18px;
            border: 1px solid rgb(75, 85, 99);
          ">${initials}</div>
        `;
      }
    }
  };

  const playerImageUrl = getPlayerImageUrl(prop.player, prop.sport);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all relative"
    >
      {/* Stats Button - Top Left */}
      <button
        className="absolute top-2 left-2 bg-black/50 rounded-md p-1 text-gray-300 hover:text-white transition-colors"
        title="View player stats"
      >
        <svg
          width="16"
          height="16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.333 2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11ZM4 4.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-9ZM8.667 7.833a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V13.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.833ZM14 5.833a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V5.833Z" />
        </svg>
      </button>

      {/* Trending Indicator - Top Right */}
      <div className="absolute top-2 right-2 flex items-center">
        <img
          alt="Trending"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAAEXUlEQVR4Ae2VW2gcVRjH/+ecmZ3LXpvYrcnGJtskqG9qRSgNhZI+1D6oFIQUxT4piIiKINQLmhYvL4r0VfCCFVREiwENVaNYrIUQWtrExraxoTYXN3Gzu83uZG7n+E2KIq3NZvPkQz84zNmz832/73a+AW7Iv2S8p23n+D3Zb091GaNKKbHSuxrWIH88tWdD9fzpQ+rShR0KDMh3jzDGwpV0OBqUC307O6rD3x/n85d2MDsBbykA37ztzXp6DYEoPUzz57/RvMsdvLUL0qnBTzSj+4l9h+vpNpS6qd78Xl6a6kKyCTKegvQDSF2sSrehiDj8J7lGhpW8oqrpUIUZ/PLZod31dRsQpuRd4KQSerRc8EQKmlBwjw29VSwW02sGTTy7p+fcA12d0b4yPX0TWBnICLAERaTKYBvWQUtzhKM/ZmfeO/jMmkDTL97/ghwbOCoC52zl56GtyZaWKmslp7M20MzA9CJUxgJr0hBLB3CGv37u4sXx1oZAM6/3dbCFEwf0tjRkSuPuT4dfo3vi8Gz2LJriYGkdbAvVqjMGmaB9kkFNjViVzz98pSGQYIWXJWYZktSUGRvOme+2VSdO7ZK+96liVJ94DEqvgW/0wfM6YDOIBFA7Odg3/+vJ3KpAdFcM7k3sRpy8NOgglYRbOY+l41+9k7n36feVvwQlHEQDR4UVYFPkDAez6PfcaHLqy3cfXRWoOri/h/HZFLNotHAyqocIqRbloYOtbraznzXnSoo7kBqDpM6DCsBuoQYxGDRbQk6feJyc1eqCwvLI7TxOHtq0Yg6Y5lLBm+BpJcx/8PBDbu23jKT/QykoIheSQDJBTqUiGEcwN5adOPLJbXVBwpQ5FtehxU3oJs2xZBHSbIZa34GAADJGkJRFIHIqoBSqEIo4KgKZ1BisSlGN3X213WtHkKHHuCUgYmnEKO9+3AE3ivCm0tATNwNyAWFiEVIuQSIgiFx2V9k6RI1D0ak/O9ZcF8S5NwmDQCxDzUCRaQV6zkGyRQTTCiLnUYSUrkDRqJBQUU6oXozKwsoiGlPQbW7XBans9t+ZMwwubHDLpFSWoNxFmFYFYbu6MuYiSPT18ekZEC8kiKSlc3KQgceThWsCuPrAzmz+AVZLhcdscpRmmd0MQY0hqKOEFVIaQ6qFpMIT0VDgJhmhVHNicqpftLfyW07XBbH89pJIdX3E+AJ5TC0rCagbEJq2vKLp/c/Soyh0Sjel+HKM6gqYGzZN5nofO1YXFInR/dKrTNMmOZ+HmHMhYBCM0rgMpCWip7m81ygko0DOUJ30uIB96337/8smw3XEG3v+Dr9wdEB5QZv0qwgtB4HpIaAGCKku0qMOK9KLRfomhSZFRjk0Um+07x3a1xAoEufMFx3yz4F+6dUeke4CGaeJ4HvLHSfpwspoRjET3G4p8WSuf33vgbevZ2tF0N+ydO7jzqA8+aB0F7fKULXTtU4SaSaUfDwUxqC+cdeRdfk7S/g/yF/ZrLFK5X31mgAAAABJRU5ErkJggg=="
          className="w-4 h-4 mr-1"
        />
        <span className="text-white text-xs">
          {prop.trendValue || Math.floor(Math.random() * 10 + 1)}K
        </span>
      </div>

      {/* Player Image and Basic Info */}
      <div className="text-center mb-4">
        <button className="inline-block cursor-pointer">
          <img
            alt={prop.player}
            src={playerImageUrl}
            onError={handleImageError}
            className="w-16 h-16 rounded-lg mx-auto mb-2"
          />
        </button>

        {/* Demon/Goblin Icon */}
        {(prop.pickType === "demon" || prop.pickType === "goblin") && (
          <div className="absolute top-12 right-8">
            <button
              title={
                prop.pickType === "demon"
                  ? "Demon pick - Harder to win, higher payout (1.25x)"
                  : "Goblin pick - Easier to win, lower payout (0.85x)"
              }
              className="inline-block cursor-pointer relative group"
            >
              <img
                alt={prop.pickType === "demon" ? "Demon" : "Goblin"}
                src={
                  prop.pickType === "demon"
                    ? "https://app.prizepicks.com/7534b2e82fa0ac08ec43.png"
                    : "https://app.prizepicks.com/e00b98475351cdfd1c38.png"
                }
                className="w-8 h-8 transform rotate-12"
              />
            </button>
          </div>
        )}

        {/* Team and Position */}
        <div className="text-gray-400 text-xs">
          <span>{prop.team}</span> - <span>{prop.position || "Unknown"}</span>
        </div>
      </div>

      {/* Player Name and Game Info */}
      <div className="text-center mb-4">
        <h3 className="text-white text-sm font-medium mb-1">{prop.player}</h3>
        <div className="text-gray-400 text-xs">
          <span>vs {prop.opponent} </span>
          <span>{prop.gameTime || "Today 7:30 PM"}</span>
        </div>
      </div>

      {/* Line Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-black text-white mb-2">{prop.line}</div>
        <div className="text-sm text-gray-400">{prop.stat}</div>
      </div>

      {/* AI Recommendation Badge */}
      <div className="flex justify-center mb-4">
        <div className="px-4 py-2 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>AI Recommends: {prop.aiRecommendation.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Betting Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(prop.id, "under")}
          disabled={prop.pickType === "demon" || prop.pickType === "goblin"}
          className={`p-4 rounded-xl border-2 transition-all backdrop-blur-sm shadow-lg ${
            isSelected(prop.id, "under")
              ? "border-red-400 bg-red-500/30 text-red-200 shadow-red-500/25"
              : prop.pickType === "demon" || prop.pickType === "goblin"
                ? "border-gray-600 bg-gray-800/30 text-gray-500 cursor-not-allowed opacity-50"
                : "border-gray-500 hover:border-red-400 text-gray-200 hover:bg-red-500/20 bg-gray-800/60 hover:text-red-200"
          }`}
        >
          <div className="font-bold text-lg drop-shadow-lg">
            {prop.pickType === "demon" || prop.pickType === "goblin"
              ? "N/A"
              : "UNDER"}
          </div>
          <div className="text-sm drop-shadow-lg">
            {prop.pickType === "demon" || prop.pickType === "goblin"
              ? "-"
              : prop.underOdds}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(prop.id, "over")}
          className={`p-4 rounded-xl border-2 transition-all backdrop-blur-sm shadow-lg ${
            isSelected(prop.id, "over")
              ? "border-green-400 bg-green-500/30 text-green-200 shadow-green-500/25"
              : prop.pickType === "demon"
                ? "border-red-500 hover:border-red-400 text-red-200 hover:bg-red-500/20 bg-red-900/30"
                : prop.pickType === "goblin"
                  ? "border-green-500 hover:border-green-400 text-green-200 hover:bg-green-500/20 bg-green-900/30"
                  : "border-gray-500 hover:border-green-400 text-gray-200 hover:bg-green-500/20 bg-gray-800/60 hover:text-green-200"
          } ${prop.aiRecommendation === "over" ? "ring-2 ring-purple-400/50" : ""}`}
        >
          <div className="font-bold text-lg drop-shadow-lg">OVER</div>
          <div className="text-sm drop-shadow-lg">{prop.overOdds}</div>
          {prop.aiRecommendation === "over" && (
            <div className="text-xs text-purple-400 font-bold mt-1 drop-shadow-lg">
              ⭐ AI PICK
            </div>
          )}
          {prop.pickType === "demon" && (
            <div className="text-xs opacity-75 ml-1">1.25x</div>
          )}
          {prop.pickType === "goblin" && (
            <div className="text-xs opacity-75 ml-1">0.85x</div>
          )}
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-400">
          <span className="text-blue-400 font-semibold">Trend:</span>{" "}
          {prop.trend}
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-green-400 font-semibold">Form:</span>{" "}
          {prop.recentForm}
        </div>
      </div>

      {/* AI Analysis Toggle */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => onToggleAnalysis(prop.id)}
        className="w-full py-3 bg-purple-500/30 border-2 border-purple-400/50 rounded-xl text-purple-200 font-semibold hover:bg-purple-500/50 hover:border-purple-300 transition-all backdrop-blur-sm shadow-lg shadow-purple-500/25"
      >
        {showAIAnalysis === prop.id ? "Hide" : "Show"} AI Analysis
      </motion.button>

      {/* AI Analysis */}
      <AnimatePresence>
        {showAIAnalysis === prop.id && (
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
              {prop.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const PrizePicksPro: React.FC = () => {
  const [selectedPicks, setSelectedPicks] = useState<SelectedPick[]>([]);
  const [entryAmount, setEntryAmount] = useState(25);
  const [showAIAnalysis, setShowAIAnalysis] = useState<string | null>(null);
  const [showDemonsGoblinsModal, setShowDemonsGoblinsModal] = useState(false);

  // Enhanced mock player props with demons/goblins and tooltips
  const [playerProps] = useState<PlayerProp[]>([
    {
      id: "1",
      player: "LeBron James",
      team: "LAL",
      opponent: "GSW",
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
      position: "SF",
      sport: "NBA",
      gameTime: "Today 7:30 PM",
      pickType: "normal",
      trendValue: 8,
    },
    {
      id: "2",
      player: "Stephen Curry",
      team: "GSW",
      opponent: "LAL",
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
      position: "PG",
      sport: "NBA",
      gameTime: "Today 7:30 PM",
      pickType: "demon",
      trendValue: 12,
    },
    {
      id: "3",
      player: "Giannis Antetokounmpo",
      team: "MIL",
      opponent: "BOS",
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
      position: "PF",
      sport: "NBA",
      gameTime: "Today 8:00 PM",
      pickType: "goblin",
      trendValue: 5,
    },
    {
      id: "4",
      player: "Jayson Tatum",
      team: "BOS",
      opponent: "MIL",
      stat: "Points",
      line: 28.5,
      overOdds: 1.87,
      underOdds: 1.93,
      confidence: 87.4,
      aiRecommendation: "under",
      reasoning:
        "Tatum struggles against Milwaukee's length, averaging 24.2 points in last 6 meetings. Bucks have improved perimeter defense this season.",
      trend: "4/8 games under 28.5",
      recentForm: "Cold streak - 42% FG last 3 games",
      position: "SF",
      sport: "NBA",
      gameTime: "Today 8:00 PM",
      pickType: "normal",
      trendValue: 3,
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
      pickType: prop.pickType,
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

    let baseMultiplier = multipliers[pickCount] || 0;

    // Apply demon/goblin modifiers
    selectedPicks.forEach((pick) => {
      if (pick.pickType === "demon") {
        baseMultiplier *= 1.25;
      } else if (pick.pickType === "goblin") {
        baseMultiplier *= 0.85;
      }
    });

    return entryAmount * baseMultiplier;
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

  const validateLineup = () => {
    if (selectedPicks.length < 2)
      return { valid: false, message: "Select at least 2 picks" };
    if (selectedPicks.length > 6)
      return { valid: false, message: "Maximum 6 picks allowed" };

    // Check for at least 2 different teams
    const teams = new Set(
      selectedPicks.map((pick) => {
        const prop = playerProps.find((p) => p.id === pick.propId);
        return prop?.team;
      }),
    );

    if (teams.size < 2)
      return {
        valid: false,
        message: "Must have picks from at least 2 different teams",
      };

    return { valid: true, message: "Lineup is valid" };
  };

  const submitLineup = () => {
    const validation = validateLineup();
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    alert(
      `Lineup submitted! Entry: $${entryAmount}, Potential payout: $${calculatePayout().toFixed(2)}`,
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
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setShowDemonsGoblinsModal(true)}
                className="flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Learn about Demons & Goblins</span>
              </button>
            </div>
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

      {/* Props Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {playerProps.map((prop, index) => (
          <motion.div
            key={prop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <PropCard
              prop={prop}
              onSelect={addPick}
              isSelected={isPickSelected}
              showAIAnalysis={showAIAnalysis}
              onToggleAnalysis={(propId) =>
                setShowAIAnalysis(showAIAnalysis === propId ? null : propId)
              }
            />
          </motion.div>
        ))}
      </div>

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
                      {pick.pickType === "demon" && "😈"}
                      {pick.pickType === "goblin" && "👺"}
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {pick.player} {pick.choice.toUpperCase()} {pick.line}{" "}
                        {pick.stat}
                        {pick.pickType === "demon" && (
                          <span className="text-red-400 ml-2">
                            (Demon 1.25x)
                          </span>
                        )}
                        {pick.pickType === "goblin" && (
                          <span className="text-green-400 ml-2">
                            (Goblin 0.85x)
                          </span>
                        )}
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
                  onClick={submitLineup}
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
                  <div className="text-xs text-gray-500 mt-1">
                    {validateLineup().message}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demons & Goblins Modal */}
      <DemonsGoblinsModal
        isOpen={showDemonsGoblinsModal}
        onClose={() => setShowDemonsGoblinsModal(false)}
      />
    </div>
  );
};

export default PrizePicksPro;

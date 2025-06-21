import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Brain,
  TrendingUp,
  Target,
  DollarSign,
  Activity,
  MessageCircle,
  Sparkles,
  BarChart3,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  prompt: string;
  category: "analysis" | "picks" | "trends" | "live";
}

export const PropGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "🏀 Hey! I'm PropGPT, your AI sports betting assistant. I can analyze player props, find value bets, track line movements, and provide real-time insights across all major sports. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze tonight's NBA props",
        "Show me the best value bets",
        "What are the trending picks?",
        "Find props with 90%+ confidence",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [liveData, setLiveData] = useState({
    activeAnalyses: 247,
    liveGames: 23,
    confidencePicks: 12,
    valueBets: 8,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      icon: "📊",
      title: "Analyze Props",
      prompt:
        "Analyze tonight's player props and give me the best opportunities",
      category: "analysis",
    },
    {
      id: "2",
      icon: "💰",
      title: "Value Bets",
      prompt: "Find the best value bets with positive expected value",
      category: "picks",
    },
    {
      id: "3",
      icon: "📈",
      title: "Line Movement",
      prompt: "Show me significant line movements and what they mean",
      category: "live",
    },
    {
      id: "4",
      icon: "🔥",
      title: "Hot Trends",
      prompt: "What are the hottest betting trends and patterns right now?",
      category: "trends",
    },
    {
      id: "5",
      icon: "🎯",
      title: "High Confidence",
      prompt: "Give me your highest confidence picks for today",
      category: "picks",
    },
    {
      id: "6",
      icon: "⚡",
      title: "Live Alerts",
      prompt: "What live betting opportunities should I watch right now?",
      category: "live",
    },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        activeAnalyses: prev.activeAnalyses + Math.floor(Math.random() * 5),
        liveGames: Math.max(
          15,
          prev.liveGames + Math.floor(Math.random() * 3 - 1),
        ),
        confidencePicks: Math.max(
          8,
          prev.confidencePicks + Math.floor(Math.random() * 3 - 1),
        ),
        valueBets: Math.max(
          5,
          prev.valueBets + Math.floor(Math.random() * 2 - 1),
        ),
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (messageContent: string = input) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: messageContent.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 2000),
    );

    // Generate AI response based on message content
    const aiResponse = generateAIResponse(messageContent);

    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      type: "ai",
      content: aiResponse.content,
      timestamp: new Date(),
      suggestions: aiResponse.suggestions,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const generateAIResponse = (
    userInput: string,
  ): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();

    // Analysis requests
    if (input.includes("analyz") || input.includes("props")) {
      return {
        content: `🎯 **Tonight's Top Player Props Analysis**

**🔥 PREMIUM PICKS:**

**LeBron James Over 25.5 Points** | 94.7% Confidence
• *Analysis*: LeBron averaging 28.3 PPG vs Warriors historically
• *Edge*: Warriors defense allows 118 PPG at home
• *Trend*: 8/10 games over 25.5 this season

**Stephen Curry Over 4.5 Three-Pointers** | 91.3% Confidence  
• *Analysis*: Shooting 43% from three at home (5.2 attempts/game)
• *Edge*: Lakers allow 14.2 threes per game (28th in NBA)
• *Trend*: 7/10 games over 4.5 threes

**Giannis Over 11.5 Rebounds** | 89.2% Confidence
• *Analysis*: Celtics play small ball, creating rebounding advantage
• *Edge*: 12.8 rebounds per game in last 10
• *Trend*: 6/8 games over 11.5 vs Boston

🔍 *All picks backed by advanced AI analysis with 90%+ historical accuracy*`,
        suggestions: [
          "Show me the reasoning for LeBron's pick",
          "What about lower-confidence value plays?",
          "Analyze tomorrow's games",
          "Find contrarian betting opportunities",
        ],
      };
    }

    // Value bet requests
    if (input.includes("value") || input.includes("edge")) {
      return {
        content: `💰 **Value Betting Opportunities**

**🎯 POSITIVE EV PICKS:**

**Joel Embiid Over 28.5 Points** | +12.4% EV
• *Fair odds*: -135 | *Available*: +105
• *Reason*: Market undervaluing his dominance vs Miami

**Luka Dončić Over 8.5 Assists** | +8.7% EV  
• *Fair odds*: -180 | *Available*: -110
• *Reason*: Suns pace creates assist opportunities

**Tatum Under 5.5 Threes** | +6.2% EV
• *Fair odds*: +140 | *Available*: +165
• *Reason*: Milwaukee's perimeter defense improved

⚡ *These lines show mathematical value based on my probability models vs market pricing*`,
        suggestions: [
          "Explain expected value calculation",
          "Find more contrarian value bets",
          "Show me bankroll management tips",
          "What's the Kelly Criterion sizing?",
        ],
      };
    }

    // Line movement requests
    if (
      input.includes("line") ||
      input.includes("movement") ||
      input.includes("live")
    ) {
      return {
        content: `📈 **Significant Line Movements**

**🚨 SHARP MONEY ALERTS:**

**Lakers -3.5 → -5.5** | Heavy Sharp Action
• *Movement*: 2 points in 30 minutes
• *Money*: 78% of handle on Lakers despite 52% public bets
• *Analysis*: Professional money pushing the line

**Celtics Total 215.5 → 212.5** | Under Movement
• *Movement*: 3 points down
• *Weather*: No factor (indoor)
• *Analysis*: Sharp bettors see defensive game script

**Curry Threes 4.5 → 5.5** | Prop Adjustment  
• *Movement*: Full point increase
• *Volume*: 89% of prop bets on over
• *Analysis*: Sportsbooks adjusting to public sentiment

🔍 *Line movements often indicate where the smart money is going*`,
        suggestions: [
          "How do I interpret line movements?",
          "Show me reverse line movement opportunities",
          "What causes props to move?",
          "Find steam moves in progress",
        ],
      };
    }

    // Trend requests
    if (
      input.includes("trend") ||
      input.includes("pattern") ||
      input.includes("hot")
    ) {
      return {
        content: `🔥 **Hottest Betting Trends**

**📊 PLAYER TRENDS:**

**LeBron James Points Props**
• *Trend*: 12-3 Over last 15 games
• *Reason*: Age 39 season motivation + load management creating focused games
• *Confidence*: Continue riding the over

**Road Team Totals in NBA**
• *Trend*: Under hitting 68% last 2 weeks  
• *Reason*: Travel fatigue + tighter defense
• *Opportunity*: Target road team unders

**Player Assists in Fast-Pace Games**
• *Trend*: Overs hitting 74% in games 105+ pace
• *Reason*: More possessions = more assist opportunities
• *Strategy*: Target assist overs in up-tempo matchups

🎯 *These trends have 15+ game sample sizes with statistical significance*`,
        suggestions: [
          "Show me contrarian trends",
          "What trends are ending soon?",
          "Find team-specific patterns",
          "Analyze referee tendencies",
        ],
      };
    }

    // Confidence picks
    if (
      input.includes("confidence") ||
      input.includes("best") ||
      input.includes("sure")
    ) {
      return {
        content: `🎯 **Highest Confidence Picks (95%+ AI Rating)**

**🔒 LOCK PICKS:**

**Giannis Antetokounmpo Over 30.5 PRA** | 97.2% Confidence
• *Average*: 34.1 PRA last 10 games
• *Matchup*: Celtics fast pace benefits counting stats
• *History*: 9/10 over 30.5 vs Boston

**James Harden Over 8.5 Assists** | 96.8% Confidence
• *Role*: Primary facilitator with Embiid back
• *Pace*: Clippers playing faster lately
• *Form*: 10.3 assists per game last 8

**Anthony Davis Over 11.5 Rebounds** | 95.4% Confidence  
• *Size advantage*: Warriors play small
• *Motivation*: Bounce-back game expected
• *Trend*: 8/10 games over 11.5 at home

💎 *These picks have the highest probability of success based on my analysis*`,
        suggestions: [
          "What makes these picks so confident?",
          "Show me medium confidence value plays",
          "Explain your confidence calculation",
          "Find sleeper picks under the radar",
        ],
      };
    }

    // Default response
    const responses = [
      `🏀 I'm analyzing live data from ${liveData.liveGames} games right now. What specific sport or player would you like me to focus on?`,
      `📊 I've identified ${liveData.valueBets} value betting opportunities in the current market. Would you like me to show you the best ones?`,
      `🎯 My models are currently tracking ${liveData.confidencePicks} high-confidence plays. Want to see the top recommendations?`,
      `⚡ I'm monitoring line movements across all major sportsbooks. Is there a particular game or prop you're interested in?`,
      `🔍 I can help you with player prop analysis, value betting, line movements, or trend identification. What interests you most?`,
    ];

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "Show me tonight's best NBA props",
        "Find value bets with positive EV",
        "Analyze line movements",
        "What are the trending patterns?",
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            PropGPT
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Your AI Sports Betting Assistant
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-purple-400">
                {liveData.activeAnalyses}
              </div>
              <div className="text-xs text-gray-400">Live Analyses</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-green-400">
                {liveData.liveGames}
              </div>
              <div className="text-xs text-gray-400">Games Today</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-blue-400">
                {liveData.confidencePicks}
              </div>
              <div className="text-xs text-gray-400">High Confidence</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-yellow-400">
                {liveData.valueBets}
              </div>
              <div className="text-xs text-gray-400">Value Bets</div>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-4xl ${message.type === "user" ? "order-2" : "order-1"}`}
                  >
                    <div
                      className={`flex items-start space-x-3 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-green-500 to-blue-500"
                            : "bg-gradient-to-r from-purple-500 to-pink-500"
                        }`}
                      >
                        {message.type === "user" ? (
                          <span className="text-white font-bold">U</span>
                        ) : (
                          <Brain className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl p-4 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                            : "bg-gray-800/50 border border-gray-700/50 text-white"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>

                        {/* Timestamp */}
                        <div
                          className={`text-xs mt-2 ${
                            message.type === "user"
                              ? "text-white/70"
                              : "text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>

                        {/* AI Suggestions */}
                        {message.suggestions && message.type === "ai" && (
                          <div className="mt-4 space-y-2">
                            <div className="text-xs text-gray-400 font-semibold">
                              Quick follow-ups:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <motion.button
                                  key={index}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => sendMessage(suggestion)}
                                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 hover:bg-purple-500/30 transition-all"
                                >
                                  {suggestion}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span className="text-sm text-purple-400">
                          PropGPT is analyzing...
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(action.prompt)}
                  className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 transition-all text-center"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-xs font-semibold text-white">
                    {action.title}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage()
                }
                placeholder="Ask about props, odds, trends, or get betting advice..."
                className="flex-1 px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all text-lg"
                disabled={isTyping}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-400">
                PropGPT provides AI-powered analysis. Always gamble responsibly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropGPT;

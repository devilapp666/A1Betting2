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

export const PropOllama: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "🏀 Hey! I'm PropOllama, your AI sports betting assistant. I can analyze player props, find value bets, track line movements, and provide real-time insights across all major sports. What would you like to explore today?",
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
    <div className="space-y-6 animate-slide-in-up h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="holographic text-5xl font-black mb-4">PropOllama</h1>
          <p className="text-xl text-gray-300 mb-6">
            Your AI Sports Betting Assistant
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-purple-400">
                {liveData.activeAnalyses}
              </div>
              <div className="text-xs text-gray-400">Live Analyses</div>
            </div>
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-green-400">
                {liveData.liveGames}
              </div>
              <div className="text-xs text-gray-400">Games Today</div>
            </div>
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-blue-400">
                {liveData.confidencePicks}
              </div>
              <div className="text-xs text-gray-400">High Confidence</div>
            </div>
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-yellow-400">
                {liveData.valueBets}
              </div>
              <div className="text-xs text-gray-400">Value Bets</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 glass-card rounded-3xl border border-white/10 flex flex-col">
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
                      PropOllama is analyzing...
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
                className="p-3 glass-card rounded-xl hover:shadow-neon transition-all text-center"
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
              className="flex-1 px-6 py-4 bg-gray-800/80 border-2 border-gray-500 rounded-2xl text-white placeholder-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all text-lg backdrop-blur-sm shadow-lg"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="cyber-btn px-6 py-4 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 drop-shadow-lg" />
            </motion.button>
          </div>

          <div className="text-center mt-4">
            PropOllama provides AI-powered analysis. Always gamble responsibly.
            <p className="text-xs text-gray-400">
              PropGPT provides AI-powered analysis. Always gamble responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropGPT;

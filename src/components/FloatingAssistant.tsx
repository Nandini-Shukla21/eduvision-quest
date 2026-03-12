import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const responses = [
  "Great question! I'd recommend breaking your study sessions into 25-minute focused blocks using the Pomodoro technique. 🍅",
  "Based on your learning style, try creating visual mind maps for complex topics. It'll help you connect concepts better! 🗺️",
  "You're doing amazing! Your consistency score is up 20% this week. Keep pushing! 💪",
  "For better retention, try teaching the concept to someone else. It's called the Feynman Technique! 📚",
  "I suggest reviewing your flashcards before bed — studies show sleep consolidates memory! 😴",
  "Have you tried spaced repetition? It's scientifically proven to improve long-term memory! 🧠",
];

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm EduBot 🤖 Your AI study assistant. Ask me anything about studying!", isUser: false },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, isUser: true };
    const botMsg = { text: responses[Math.floor(Math.random() * responses.length)], isUser: false };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, botMsg]), 800);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-[420px] glass-card-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <p className="font-display font-semibold text-sm">EduBot</p>
                  <p className="text-xs opacity-70">AI Study Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-foreground/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    m.isUser ? "gradient-primary" : "bg-muted"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-border/30">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                />
                <button onClick={sendMessage} className="p-2 gradient-primary rounded-xl hover-lift">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg animate-pulse_glow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </motion.button>
    </>
  );
};

export default FloatingAssistant;

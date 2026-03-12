import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import foxyMascot from "@/assets/foxy-mascot.png";

const responses = [
  "Great question! I'd recommend breaking your study sessions into 25-minute focused blocks using the Pomodoro technique. 🍅",
  "Based on your learning style, try creating visual mind maps for complex topics! 🗺️",
  "You're doing amazing! Your consistency score is up 20% this week. Keep pushing! 💪",
  "For better retention, try teaching the concept to someone else — the Feynman Technique! 📚",
  "I suggest reviewing your flashcards before bed — studies show sleep consolidates memory! 😴",
  "Have you tried spaced repetition? It's scientifically proven to improve long-term memory! 🧠",
  "Your Programming skills improved this week! 🔥",
  "Want to review your flashcards? I can help you prep! 📖",
  "You're on a 5-day learning streak! Keep it up! 🎯",
];

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm Foxy 🦊 Your AI learning companion. Ask me anything about studying!", isUser: false },
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
                <img src={foxyMascot} alt="Foxy" className="w-8 h-8" />
                <div>
                  <p className="font-display font-semibold text-sm">Foxy</p>
                  <p className="text-xs opacity-70">AI Learning Companion</p>
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
                  {!m.isUser && <img src={foxyMascot} alt="" className="w-6 h-6 mt-1 mr-1.5 shrink-0" />}
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
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
                  placeholder="Ask Foxy anything..."
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-card border border-border/50 overflow-hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <motion.img
            src={foxyMascot}
            alt="Foxy"
            className="w-11 h-11"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
};

export default FloatingAssistant;

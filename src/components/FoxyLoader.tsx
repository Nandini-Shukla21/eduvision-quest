import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import foxyMascot from "@/assets/foxy-mascot.png";

const messages = [
  "Preparing your learning journey…",
  "Foxy is getting things ready…",
  "Loading something awesome…",
];

const FoxyLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-6"
    >
      <motion.img
        src={foxyMascot}
        alt="Loading"
        className="w-24 h-24"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="w-48 h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-sm text-muted-foreground font-medium"
        >
          {messages[msgIdx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default FoxyLoader;

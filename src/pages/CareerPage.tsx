import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import careerData from "@/data/careerData.json";
import { ChevronRight, CheckCircle, BookOpen } from "lucide-react";

type CareerKey = "data" | "engineering" | "design" | "research";

const CareerPage = () => {
  const [step, setStep] = useState<"quiz" | "skills" | "result">("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [resultKey, setResultKey] = useState<CareerKey | null>(null);

  const questions = careerData.interestQuestions;

  const selectOption = (optTags: string[]) => {
    const newTags = [...tags, ...optTags];
    setTags(newTags);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("skills");
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const getResult = () => {
    const counts: Record<string, number> = {};
    tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as CareerKey;
    setResultKey(winner);
    setStep("result");
  };

  const reset = () => { setStep("quiz"); setCurrentQ(0); setTags([]); setSelectedSkills([]); setResultKey(null); };

  if (step === "result" && resultKey) {
    const career = careerData.careers[resultKey];
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card rounded-3xl p-8">
          <div className="text-center mb-6">
            <span className="text-5xl">{career.emoji}</span>
            <h2 className="font-display text-2xl font-bold mt-3">Recommended Career</h2>
            <h3 className="font-display text-xl font-semibold text-primary mt-1">{career.title}</h3>
            <p className="text-muted-foreground text-sm mt-2">{career.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-display font-semibold text-sm mb-2 text-muted-foreground">SKILLS REQUIRED</h4>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-primary/15 text-sm font-medium">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-display font-semibold text-sm mb-3 text-muted-foreground">LEARNING PATH</h4>
            <div className="space-y-2">
              {career.learningPath.map((step, i) => (
                <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl text-sm"
                >
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                  {step}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-display font-semibold text-sm mb-2 text-muted-foreground">RECOMMENDED COURSES</h4>
            <div className="space-y-2">
              {career.courses.map((c) => (
                <div key={c} className="flex items-center gap-2 p-3 bg-accent/30 rounded-xl text-sm">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" /> {c}
                </div>
              ))}
            </div>
          </div>

          <button onClick={reset} className="w-full py-2.5 rounded-xl gradient-primary font-semibold hover-lift">Retake Quiz</button>
        </motion.div>
      </div>
    );
  }

  if (step === "skills") {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-2xl font-bold mb-2">🎯 Select Your Skills</h1>
        <p className="text-muted-foreground mb-6">Choose skills that match your strengths.</p>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {careerData.skills.map((skill) => (
              <button key={skill} onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedSkills.includes(skill) ? "gradient-primary border-transparent" : "bg-muted/50 border-border/50 hover:border-primary/30"
                }`}
              >
                {selectedSkills.includes(skill) && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                {skill}
              </button>
            ))}
          </div>
          <button onClick={getResult} disabled={selectedSkills.length === 0}
            className="w-full py-2.5 rounded-xl gradient-primary font-semibold hover-lift disabled:opacity-50"
          >
            Get Career Recommendation
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-2">🧭 Career Recommendation</h1>
      <p className="text-muted-foreground mb-6">Discover your ideal career path.</p>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Question {currentQ + 1} of {questions.length}</span>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <motion.div animate={{ width: `${(currentQ / questions.length) * 100}%` }} className="h-full gradient-primary rounded-full" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-lg font-semibold mb-4">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button key={opt.text} onClick={() => selectOption(opt.tags)}
                className="w-full text-left p-4 rounded-xl bg-muted/50 hover:bg-primary/20 border border-transparent hover:border-primary/30 transition-all flex items-center justify-between group"
              >
                <span className="text-sm">{opt.text}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CareerPage;

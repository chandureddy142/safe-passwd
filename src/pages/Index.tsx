import { useState, useCallback, useEffect, useRef, type MouseEvent } from "react";
import { Shield, Eye, EyeOff, Copy, Loader2, AlertTriangle, Sparkles, Wand2, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StrengthMeter } from "@/components/StrengthMeter";
import { CheckItem } from "@/components/CheckItem";
import { PasswordGenerator } from "@/components/PasswordGenerator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StrengthGuide } from "@/components/StrengthGuide";
import { PasswordFaq } from "@/components/PasswordFaq";
import { analyzePassword, checkPwnedApi } from "@/lib/password-analyzer";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Index = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showGenerator, setShowGenerator] = useState(false);
  const [result, setResult] = useState<{
    lengthPass: boolean; casePass: boolean; numSpecPass: boolean;
    consecutivePass: boolean; namePass: boolean; score: number; breachCount: number;
  } | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const trackPointer = (event: globalThis.MouseEvent) => {
      backgroundRef.current?.style.setProperty("--mouse-x", `${event.clientX}px`);
      backgroundRef.current?.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", trackPointer);
    return () => window.removeEventListener("mousemove", trackPointer);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!password) {
      toast({ title: "Enter a password", description: "Password field cannot be empty.", variant: "destructive" });
      return;
    }

    setAttemptCount((c) => c + 1);
    const local = analyzePassword(password, name);
    setResult({ ...local, breachCount: -1 });
    setAnalyzed(true);
    setLoading(true);

    const breachCount = await checkPwnedApi(password);
    const score = breachCount > 0 ? 0 : local.score;
    setResult({ ...local, breachCount, score });
    setLoading(false);
  }, [password, name, toast]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({ title: "Copied!", description: "Password copied to clipboard." });
  };

  const handleUseGenerated = (pw: string) => {
    setPassword(pw);
    setShowGenerator(false);
    setAnalyzed(false);
    toast({ title: "Password set!", description: "Generated password applied. Click Analyze to check it." });
  };

  const resetAnalyzer = () => {
    setName("");
    setPassword("");
    setAnalyzed(false);
    setResult(null);
    setAttemptCount(0);
    setShowGenerator(false);
  };

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden px-4 pb-12 pt-16">
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2" aria-label="Strong Passwd home">
            <Shield className="h-6 w-6 text-primary" />
            <span className="hidden text-lg font-bold sm:inline">Strong Passwd</span>
          </button>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="Main navigation">
            <a href="#analyzer" onClick={(event) => scrollToSection(event, "analyzer")} className="transition-colors hover:text-primary">Analyzer</a>
            <a href="#stats" onClick={(event) => scrollToSection(event, "stats")} className="transition-colors hover:text-primary">Strength Stats</a>
            <a href="#faq" onClick={(event) => scrollToSection(event, "faq")} className="transition-colors hover:text-primary">FAQ</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <div ref={backgroundRef} className="pointer-grid fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />

      <main className="relative z-10 mx-auto w-full max-w-4xl">
        <section id="analyzer" className="mx-auto mb-24 mt-20 w-full max-w-md scroll-mt-28 space-y-5">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 glow-primary mb-1">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Password Analyzer</h1>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Check your password strength & breach exposure in real-time
          </p>
        </div>

        {/* Form Card */}
          <div className="rounded-lg border bg-card/85 p-6 space-y-4 glow-primary backdrop-blur-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name (optional)</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-secondary/50 border-border"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAnalyzed(false); }}
                placeholder="Enter password to analyze"
                className="bg-secondary/50 border-border pr-10 font-mono"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

            <div className="flex gap-2">
            <Button onClick={handleAnalyze} className="flex-1 font-semibold" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Checking breaches…</> : "Analyze Password"}
          </Button>
            {(password || name || analyzed) && (
              <Button variant="outline" size="icon" onClick={resetAnalyzer} aria-label="Reset analyzer" title="Reset analyzer">
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            </div>
        </div>

        {/* Tired? Suggestion after 3 attempts */}
        {attemptCount >= 3 && !showGenerator && (
          <button
            type="button"
            className={cn(
              "rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-4",
              "flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer hover:bg-primary/10 transition-colors"
            )}
            onClick={() => setShowGenerator(true)}
            className={cn(
              "w-full rounded-lg border border-primary/20 bg-primary/5 p-4 text-left backdrop-blur-sm",
              "flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 hover:bg-primary/10 transition-colors"
            )}
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Tired of guessing? 😅</p>
              <p className="text-xs text-muted-foreground">Use our password generator to create a strong one instantly</p>
            </div>
            <Wand2 className="w-4 h-4 text-primary shrink-0" />
          </button>
        )}

        {/* Password Generator */}
        {showGenerator && (
          <div className="rounded-lg border bg-card/85 backdrop-blur-sm p-6 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider">Password Generator</h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowGenerator(false)}
                aria-label="Close password generator"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <PasswordGenerator onUsePassword={handleUseGenerated} />
          </div>
        )}

        {/* Results */}
        {analyzed && result && (
          <div className="rounded-lg border bg-card/85 backdrop-blur-sm p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <StrengthMeter score={result.score} breached={result.breachCount > 0} />

            <div className="space-y-2">
              <CheckItem passed={result.lengthPass} label="Minimum 12 characters" detail={`Currently ${password.length} characters`} />
              <CheckItem passed={result.casePass} label="Upper & lowercase letters" />
              <CheckItem passed={result.numSpecPass} label="Numbers & special characters" />
              <CheckItem
                passed={result.consecutivePass}
                label="No consecutive number sequences"
                detail={!result.consecutivePass ? "Sequences like 123 or 987 are easy to guess" : undefined}
              />
              <CheckItem
                passed={result.namePass}
                label="Doesn't contain your name"
                detail={!result.namePass ? "Using your name makes passwords predictable" : undefined}
              />

              {/* Breach info */}
              {loading ? (
                <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-secondary text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" /> Checking breach databases…
                </div>
              ) : result.breachCount > 0 ? (
                <div className="flex items-start gap-3 p-3 rounded-lg border border-destructive/30 bg-destructive/10">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">Found in {result.breachCount.toLocaleString()} data breaches!</p>
                    <p className="text-xs text-muted-foreground mt-0.5">This password has been exposed. Do not use it.</p>
                  </div>
                </div>
              ) : result.breachCount === 0 ? (
                <CheckItem passed label="Not found in known breaches" detail="Checked against Have I Been Pwned database" />
              ) : null}
            </div>

            {result.score >= 85 && result.breachCount === 0 && (
              <Button variant="outline" onClick={copyPassword} className="w-full border-primary/30 text-primary hover:bg-primary/10">
                <Copy className="w-4 h-4 mr-2" /> Copy Password
              </Button>
            )}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Your password never leaves your browser. Breach checks use k-anonymity.
        </p>
        </section>

        <div className="space-y-24">
          <StrengthGuide />
          <PasswordFaq />
        </div>
      </main>

      <footer className="relative z-10 mx-auto mt-24 max-w-4xl border-t border-border/60 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Built with security in mind by{" "}
          <a href="https://chandureddy.in/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">BatMan</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;

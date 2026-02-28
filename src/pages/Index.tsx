import { useState, useCallback } from "react";
import { Shield, Eye, EyeOff, Copy, Loader2, AlertTriangle, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StrengthMeter } from "@/components/StrengthMeter";
import { CheckItem } from "@/components/CheckItem";
import { PasswordGenerator } from "@/components/PasswordGenerator";
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
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-5">
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
        <div className="rounded-xl border bg-card/80 backdrop-blur-sm p-6 space-y-4 glow-primary">
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
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button onClick={handleAnalyze} className="w-full font-semibold" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Checking breaches…</> : "Analyze Password"}
          </Button>
        </div>

        {/* Tired? Suggestion after 3 attempts */}
        {attemptCount >= 3 && !showGenerator && (
          <div
            className={cn(
              "rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-4",
              "flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer hover:bg-primary/10 transition-colors"
            )}
            onClick={() => setShowGenerator(true)}
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Tired of guessing? 😅</p>
              <p className="text-xs text-muted-foreground">Use our password generator to create a strong one instantly</p>
            </div>
            <Wand2 className="w-4 h-4 text-primary shrink-0" />
          </div>
        )}

        {/* Password Generator */}
        {showGenerator && (
          <div className="rounded-xl border bg-card/80 backdrop-blur-sm p-6 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider">Password Generator</h2>
              </div>
              <button
                onClick={() => setShowGenerator(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
            <PasswordGenerator onUsePassword={handleUseGenerated} />
          </div>
        )}

        {/* Results */}
        {analyzed && result && (
          <div className="rounded-xl border bg-card/80 backdrop-blur-sm p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
      </div>
    </div>
  );
};

export default Index;

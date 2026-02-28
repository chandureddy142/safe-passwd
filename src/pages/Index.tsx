import { useState, useCallback } from "react";
import { Shield, Eye, EyeOff, Copy, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StrengthMeter } from "@/components/StrengthMeter";
import { CheckItem } from "@/components/CheckItem";
import { analyzePassword, checkPwnedApi } from "@/lib/password-analyzer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 glow-primary mb-2">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Password Analyzer</h1>
          <p className="text-sm text-muted-foreground">Check your password strength & breach exposure</p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border bg-card p-6 space-y-4 glow-primary">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name (optional)</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-secondary border-border"
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
                className="bg-secondary border-border pr-10 font-mono"
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

        {/* Results */}
        {analyzed && result && (
          <div className="rounded-xl border bg-card p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

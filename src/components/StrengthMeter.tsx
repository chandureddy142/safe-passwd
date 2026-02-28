import { cn } from "@/lib/utils";

interface StrengthMeterProps {
  score: number;
  breached: boolean;
}

export function StrengthMeter({ score, breached }: StrengthMeterProps) {
  const effectiveScore = breached ? 0 : score;
  
  const getLabel = () => {
    if (breached) return "BREACHED";
    if (effectiveScore >= 85) return "STRONG";
    if (effectiveScore >= 60) return "MODERATE";
    if (effectiveScore >= 40) return "WEAK";
    return "CRITICAL";
  };

  const getColor = () => {
    if (breached || effectiveScore < 40) return "bg-destructive";
    if (effectiveScore < 60) return "bg-warning";
    if (effectiveScore < 85) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center font-mono text-sm">
        <span className="text-muted-foreground">Strength</span>
        <span className={cn(
          "font-bold tracking-widest",
          breached || effectiveScore < 40 ? "text-destructive" :
          effectiveScore < 85 ? "text-warning" : "text-success"
        )}>
          {getLabel()} — {effectiveScore}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", getColor())}
          style={{ width: `${effectiveScore}%` }}
        />
      </div>
    </div>
  );
}

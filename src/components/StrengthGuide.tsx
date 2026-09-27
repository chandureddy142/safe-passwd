import { Shield, ShieldAlert, ShieldCheck, ShieldX, type LucideIcon } from "lucide-react";

interface StrengthExample {
  password: string;
  strength: string;
  time: string;
  tone: string;
  icon: LucideIcon;
}

const examples: StrengthExample[] = [
  { password: "batman", strength: "Very Weak", time: "Seconds", tone: "destructive", icon: ShieldX },
  { password: "Batman123", strength: "Weak", time: "Minutes to hours", tone: "warning", icon: ShieldAlert },
  { password: "B@tman_2026", strength: "Good", time: "Months to years", tone: "success", icon: Shield },
  { password: "$B@tm@n_Pr0t3cts_G0th@m!", strength: "Strong", time: "Centuries", tone: "primary", icon: ShieldCheck },
];

export function StrengthGuide() {
  return (
    <section id="stats" className="scroll-mt-24" aria-labelledby="strength-guide-title">
      <div className="mb-6">
        <p className="mb-2 font-mono text-xs font-semibold uppercase text-primary">Learn by example</p>
        <h2 id="strength-guide-title" className="text-2xl font-bold sm:text-3xl">Password Strength Table</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          See how adding complexity and length to a common word like <strong className="text-foreground">“Batman”</strong> impacts security.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card/80 backdrop-blur-sm">
        {examples.map(({ password, strength, time, tone, icon: Icon }) => (
          <div key={password} className="strength-row group relative border-b border-border/60 p-4 last:border-0 sm:flex sm:items-center sm:justify-between">
            <div className={`strength-fill strength-fill-${tone}`} aria-hidden="true" />
            <code className="relative z-10 break-all text-sm sm:text-base">{password}</code>
            <div className="relative z-10 mt-3 flex items-center justify-between gap-5 sm:mt-0 sm:justify-end">
              <div className="text-right">
                <p className={`text-xs font-bold uppercase strength-text-${tone}`}>{strength}</p>
                <p className="mt-1 text-xs text-muted-foreground">Est. crack time: {time}</p>
              </div>
              <span className={`flex h-9 w-9 items-center justify-center rounded-md bg-secondary strength-text-${tone}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
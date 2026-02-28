import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckItemProps {
  passed: boolean;
  label: string;
  detail?: string;
}

export function CheckItem({ passed, label, detail }: CheckItemProps) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border transition-colors",
      passed ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"
    )}>
      <div className={cn(
        "mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
        passed ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
      )}>
        {passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      </div>
      <div>
        <p className={cn("text-sm font-medium", passed ? "text-success" : "text-destructive")}>{label}</p>
        {detail && <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>}
      </div>
    </div>
  );
}

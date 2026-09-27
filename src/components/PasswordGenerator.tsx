import { useState } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getNonConsecutiveDigit(prev: number | null, prevPrev: number | null): string {
  let digit: number;
  do {
    digit = Math.floor(Math.random() * 10);
  } while (
    prev !== null &&
    prevPrev !== null &&
    ((digit === prev + 1 && prev === prevPrev + 1) ||
      (digit === prev - 1 && prev === prevPrev - 1))
  );
  return digit.toString();
}

function generatePassword(length: number, useSpecial: boolean, useNumbers: boolean): string {
  let pool = UPPER + LOWER;
  if (useNumbers) pool += DIGITS;
  if (useSpecial) pool += SPECIAL;

  const chars: string[] = [];
  // Guarantee at least one of each required type
  chars.push(UPPER[Math.floor(Math.random() * UPPER.length)]);
  chars.push(LOWER[Math.floor(Math.random() * LOWER.length)]);
  if (useNumbers) chars.push(DIGITS[Math.floor(Math.random() * 10)]);
  if (useSpecial) chars.push(SPECIAL[Math.floor(Math.random() * SPECIAL.length)]);

  // Track last two digits for consecutive check
  const digitHistory: number[] = [];

  for (let i = chars.length; i < length; i++) {
    const char = pool[Math.floor(Math.random() * pool.length)];
    if (/\d/.test(char)) {
      const prev = digitHistory.length >= 1 ? digitHistory[digitHistory.length - 1] : null;
      const prevPrev = digitHistory.length >= 2 ? digitHistory[digitHistory.length - 2] : null;
      const safe = getNonConsecutiveDigit(prev, prevPrev);
      chars.push(safe);
      digitHistory.push(parseInt(safe));
    } else {
      chars.push(char);
    }
  }

  // Shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

interface PasswordGeneratorProps {
  onUsePassword: (password: string) => void;
}

export function PasswordGenerator({ onUsePassword }: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [useSpecial, setUseSpecial] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [generated, setGenerated] = useState(() => generatePassword(16, true, true));
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const regenerate = () => {
    setGenerated(generatePassword(length, useSpecial, useNumbers));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    toast({ title: "Copied!", description: "Password copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Generated password display */}
      <div className="relative group">
        <div className="p-4 rounded-lg bg-secondary border border-border font-mono text-sm break-all tracking-wider text-secondary-foreground select-all min-h-[3rem] flex items-center">
          {generated}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-card border border-border hover:bg-accent/20 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>
          <button
            onClick={regenerate}
            className="p-1.5 rounded-md bg-card border border-border hover:bg-accent/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Length</span>
            <span className="text-card-foreground font-semibold">{length}</span>
          </div>
          <Slider
            value={[length]}
            onValueChange={([v]) => {
              setLength(v);
              setGenerated(generatePassword(v, useSpecial, useNumbers));
            }}
            min={12}
            max={32}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="special" className="text-xs font-mono text-muted-foreground cursor-pointer">
            Special characters
          </Label>
          <Switch
            id="special"
            checked={useSpecial}
            onCheckedChange={(v) => {
              setUseSpecial(v);
              setGenerated(generatePassword(length, v, useNumbers));
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="numbers" className="text-xs font-mono text-muted-foreground cursor-pointer">
            Numbers
          </Label>
          <Switch
            id="numbers"
            checked={useNumbers}
            onCheckedChange={(v) => {
              setUseNumbers(v);
              setGenerated(generatePassword(length, useSpecial, v));
            }}
          />
        </div>
      </div>

      <Button
        onClick={() => onUsePassword(generated)}
        className="w-full font-semibold"
      >
        Use This Password
      </Button>
    </div>
  );
}

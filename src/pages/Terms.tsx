import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Shield, ArrowLeft, FileText, Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground px-4 pb-12 pt-16">
      {/* Dark Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/10 bg-[#111827] text-white backdrop-blur-xl">
        <div className="relative flex h-full w-full items-center px-4 sm:px-6">
          <div className="absolute left-4 sm:left-6 flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
              <img src="/favicon.svg" alt="" className="h-7 w-7" aria-hidden="true" />
              <span className="hidden text-lg font-bold sm:inline text-white">Safe Passwd</span>
            </Link>
          </div>
          <div className="absolute right-4 sm:right-6 flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-white/80 hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Analyzer
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-3xl mt-12 space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <FileText className="w-3.5 h-3.5" /> Terms of Use
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: September 2026. Please read these terms carefully before using the Safe Passwd security tool.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card text-card-foreground p-6 sm:p-8 space-y-6 backdrop-blur-sm shadow-sm">
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <h2>1. Purpose of Service</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Safe Passwd is a client-side security utility designed to assist users in evaluating password strength and generating complex passwords. It is provided for informational and security awareness purposes.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Shield className="w-5 h-5 text-primary shrink-0" />
              <h2>2. Acceptable Use</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing Safe Passwd, you agree to use the tool responsibly. You must not attempt to disrupt the service, reverse-engineer proprietary functionality, or use automated systems to overwhelm third-party API dependencies (such as Have I Been Pwned).
            </p>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <AlertCircle className="w-5 h-5 text-primary shrink-0" />
              <h2>3. Security & Accuracy Disclaimer</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              While Safe Passwd uses established heuristics and the Have I Been Pwned database to estimate password security, <strong>no automated tool can guarantee absolute security</strong> against all potential cyber threats, targeted dictionary attacks, or social engineering. Users remain fully responsible for protecting their accounts and credentials.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Scale className="w-5 h-5 text-primary shrink-0" />
              <h2>4. Limitation of Liability</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To the maximum extent permitted by applicable law, Safe Passwd and its maintainers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, this application or generated credentials.
            </p>
          </section>
        </div>

        <div className="flex justify-center pt-4">
          <Button asChild className="font-semibold">
            <Link to="/">Return to Password Analyzer</Link>
          </Button>
        </div>
      </main>

      <footer className="relative z-10 mx-auto mt-24 max-w-4xl border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
          <Link to="/" className="hover:text-foreground transition-colors">Analyzer</Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms" className="font-medium text-foreground underline">Terms of Service</Link>
        </div>
        <p>Built with security in mind by <a href="https://chandureddy.in/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">BatMan</a></p>
      </footer>
    </div>
  );
}

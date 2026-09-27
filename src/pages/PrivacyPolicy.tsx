import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Shield, ArrowLeft, Lock, Eye, Server, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
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
            <Shield className="w-3.5 h-3.5" /> Privacy First
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: September 2026. Learn how Safe Passwd protects your privacy and handles security checks.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card text-card-foreground p-6 sm:p-8 space-y-6 backdrop-blur-sm shadow-sm">
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Lock className="w-5 h-5 text-primary shrink-0" />
              <h2>1. Local Password Analysis</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your security is our absolute priority. When you enter a password into Safe Passwd, all strength calculations—including length checks, character diversity, consecutive number detection, and name matching—happen <strong>entirely within your web browser</strong> using JavaScript. Your password is never submitted to or saved on any server.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Eye className="w-5 h-5 text-primary shrink-0" />
              <h2>2. Data Breach Exposure Checks (k-Anonymity)</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To check if a password has appeared in known data breaches, Safe Passwd queries the official <strong>Have I Been Pwned (HIBP) Pwned Passwords API</strong> using strict <em>k-Anonymity</em> model:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
              <li>Your browser hashes the password locally using SHA-1.</li>
              <li>Only the first <strong>5 characters</strong> of the 40-character hash prefix are sent to <code>https://api.pwnedpasswords.com/range/</code>.</li>
              <li>The API returns a list of matching hash suffixes. Your browser compares the suffixes locally.</li>
              <li>Your full password and full SHA-1 hash never leave your browser.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Cookie className="w-5 h-5 text-primary shrink-0" />
              <h2>3. Cookies and Tracking</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Safe Passwd uses <strong>zero tracking cookies</strong> and zero non-essential analytical scripts. We do not store personal profiles, display targeted advertisements, or track user browsing behavior across websites.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Server className="w-5 h-5 text-primary shrink-0" />
              <h2>4. Third-Party Services</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The only external request made by this application is the anonymized hash-prefix call to <code>api.pwnedpasswords.com</code> for data breach verification. No third-party ad networks or tracking SDKs are embedded.
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
          <Link to="/privacy" className="font-medium text-foreground underline">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
        <p>Built with security in mind by <a href="https://chandureddy.in/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">BatMan</a></p>
      </footer>
    </div>
  );
}

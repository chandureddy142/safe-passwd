import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground px-4 pb-12 pt-16 flex flex-col justify-between">
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
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-md my-auto pt-16 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 text-primary glow-primary">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground font-mono">404</h1>
          <h2 className="text-xl font-semibold text-card-foreground">Page Not Found</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div>
          <Button asChild className="font-semibold">
            <Link to="/">
              <Shield className="w-4 h-4 mr-2" /> Back to Password Analyzer
            </Link>
          </Button>
        </div>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-4xl border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
          <Link to="/" className="hover:text-foreground transition-colors">Analyzer</Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
        <p>Built with security in mind by <a href="https://chandureddy.in/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">BatMan</a></p>
      </footer>
    </div>
  );
}

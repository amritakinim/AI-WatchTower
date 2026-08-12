/*
 * AI WATCH TOWER — "Command Center Midnight"
 * 404 / not-found sector: dark console theme matching the SOC identity.
 * Beacon glyph, signal-grid texture, mono microcopy, breathing alert dot.
 */
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft, Radar } from "lucide-react";
import BeaconGlyph from "@/components/BeaconGlyph";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Textures */}
      <div className="absolute inset-0 signal-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 beacon-wash pointer-events-none" />
      <div className="absolute -left-32 -top-32 w-[30rem] h-[30rem] rounded-full bg-beacon-dim blur-3xl breathe opacity-40 pointer-events-none" />

      {/* Radar echo */}
      <div className="absolute right-[8%] bottom-[12%] hidden md:block pointer-events-none select-none">
        <svg width="300" height="300" viewBox="0 0 300 300" className="radar-sweep opacity-[0.12]">
          <circle cx="150" cy="150" r="145" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" strokeDasharray="4 10" />
          <circle cx="150" cy="150" r="95" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" strokeDasharray="2 14" />
          <circle cx="150" cy="150" r="45" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Brand strip */}
        <div className="flex items-center gap-2.5 mb-10">
          <BeaconGlyph className="h-7 w-7" />
          <span className="font-display font-bold tracking-tight text-foreground">
            AI WATCH
            <span className="ml-1 font-mono font-medium tracking-[0.22em] text-primary text-[0.68rem]">TOWER</span>
          </span>
          <span className="ml-auto font-mono text-[0.62rem] text-muted-foreground hidden sm:block">
            PERIMETER SWEEP · ACTIVE
          </span>
        </div>

        {/* Console card */}
        <div className="panel p-8 text-center bg-background/70 backdrop-blur-md">
          <div className="flex justify-center mb-6">
            <span className="relative">
              <span className="absolute inset-0 bg-destructive/15 rounded-full breathe" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-destructive/40 bg-destructive/5">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </span>
            </span>
          </div>

          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-destructive mb-3">
            Sector not found · out of bounds
          </p>
          <h1 className="font-display text-5xl font-bold text-foreground tracking-tight">404</h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            The route you requested does not exist inside the governed perimeter.
            It may have been moved, sealed, or never provisioned.
          </p>

          <div className="mt-6 pt-5 border-t border-border flex items-center justify-center gap-3 font-mono text-[0.62rem] text-muted-foreground">
            <Radar className="h-3.5 w-3.5 text-primary" />
            <span>SWEEP RESULT: 0 MATCHES</span>
            <span className="h-1.5 w-1.5 rounded-full bg-destructive breathe" />
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to the console
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[0.62rem] text-muted-foreground">
          ATWT · ALL NAVIGATION ATTEMPTS LOGGED · SESSION SECURED
        </p>
      </div>
    </div>
  );
}

/*
 * AI WATCH TOWER — "Command Center Midnight"
 * Public site header: wordmark (Space Grotesk display + mono TOWER),
 * nav links, search, language selector, login CTA.
 * Transitions from transparent to opaque dark on scroll for contrast safety.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Globe, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BeaconGlyph from "@/components/BeaconGlyph";

const NAV_LINKS = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Resources", href: "#resources" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <BeaconGlyph className="h-8 w-8" />
      <span className="font-display font-bold tracking-tight text-[1.05rem] leading-none text-foreground">
        AI WATCH
        <span className="ml-1 font-mono font-medium tracking-[0.22em] text-primary text-[0.8rem]">
          TOWER
        </span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-background/92 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Wordmark />

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => toast("Search is a placeholder in this preview.")}
          >
            <Search className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="ml-2 font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/97 backdrop-blur-md">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button className="mt-3 w-full font-medium" onClick={() => { setOpen(false); navigate("/login"); }}>
              Login
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

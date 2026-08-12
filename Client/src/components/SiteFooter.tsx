/*
 * AI WATCH TOWER — "Command Center Midnight"
 * Public footer: four link columns (Resources / Careers / Contact / Social),
 * wordmark, mono microcopy, signal-line motif.
 */
import { Link } from "wouter";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import { toast } from "sonner";
import BeaconGlyph from "@/components/BeaconGlyph";

function placeholderToast(label: string) {
  return () => toast(`${label} — placeholder in this preview.`);
}

const COLUMNS: { title: string; items: string[] }[] = [
  {
    title: "Resources",
    items: ["Documentation", "Policy Center", "Approved Services", "Security Whitepaper", "Changelog"],
  },
  {
    title: "Careers",
    items: ["Open Roles", "Engineering", "Security Research", "Life at Watch Tower"],
  },
  {
    title: "Contact",
    items: ["Sales", "Support", "Press", "Partners"],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border mt-0">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <BeaconGlyph className="h-7 w-7" />
              <span className="font-display font-bold tracking-tight text-foreground">
                AI WATCH
                <span className="ml-1 font-mono font-medium tracking-[0.22em] text-primary text-[0.72rem]">
                  TOWER
                </span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              See the risk. Secure the intelligence. AI Watch Tower governs
              employee interactions with generative AI systems across the
              enterprise.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      onClick={placeholderToast(item)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="signal-line my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 AI WATCH TOWER · SOC 2 TYPE II · ISO 27001
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "GitHub" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={placeholderToast(label)}
                aria-label={label}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

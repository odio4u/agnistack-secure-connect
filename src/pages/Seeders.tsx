import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, ShieldCheck, Lock, Copy, Check, RefreshCw, AlertTriangle, ArrowRight, Inbox } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Seeder {
  ip: string;
  fingerprint: string;
  status: string;
  maintainer: string;
  region: { country: string; flag: string };
}

interface SeederConfig {
  network: string;
  seeders: Seeder[];
}

const DATA_URL =
  "https://gist.githubusercontent.com/dipghoshraj/dbb415d4987a99ef465add5945cca071/raw/config.json";

const highlights = [
  { icon: Box, title: "Decentralized", desc: "No single point of failure" },
  { icon: ShieldCheck, title: "Community Run", desc: "Maintained by awesome people" },
  { icon: Lock, title: "Privacy First", desc: "Zero-Trust by design" },
];

const getSeederStatusMeta = (status: string) => {
  const normalizedStatus = status.trim().toLowerCase();

  if (normalizedStatus === "online") {
    return {
      label: "Online",
      badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      dotClass: "bg-emerald-400 animate-pulse",
    };
  }

  if (normalizedStatus === "offline") {
    return {
      label: "Offline",
      badgeClass: "border-rose-500/30 bg-rose-500/10 text-rose-400",
      dotClass: "bg-rose-400",
    };
  }

  return {
    label: status || "Unknown",
    badgeClass: "border-muted-foreground/30 bg-muted/40 text-muted-foreground",
    dotClass: "bg-muted-foreground",
  };
};

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="text-muted-foreground hover:text-primary transition-colors"
      aria-label="Copy"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

const SeederRow = ({ s }: { s: Seeder }) => {
  const statusMeta = getSeederStatusMeta(s.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center px-5 py-4 rounded-lg border border-border/60 bg-card/40 hover:bg-card hover:border-primary/40 hover:shadow-[0_0_30px_-12px_hsl(var(--primary)/0.4)] transition-all"
    >
      <div className="md:col-span-2 flex items-center gap-2 font-mono text-sm">
        <span>{s.ip}</span>
        <CopyButton value={s.ip} />
      </div>
      <div className="md:col-span-5 flex items-center gap-2 font-mono text-xs text-muted-foreground truncate">
        <span className="truncate">{s.fingerprint}</span>
        <CopyButton value={s.fingerprint} />
      </div>
      <div className="md:col-span-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${statusMeta.badgeClass}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClass}`} />
          {statusMeta.label}
        </span>
      </div>
      <div className="md:col-span-2 font-mono text-sm text-muted-foreground">{s.maintainer}</div>
      <div className="md:col-span-1 flex items-center gap-2 text-sm">
        <span className="text-lg leading-none">{s.region.flag}</span>
        <span className="text-muted-foreground truncate">{s.region.country}</span>
      </div>
    </motion.div>
  );
};

const Seeders = () => {
  const [data, setData] = useState<SeederConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(DATA_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const json = (await res.json()) as SeederConfig;
      setData(json);
      setUpdatedAt(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const seeders = data?.seeders ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 gradient-radial-top" />

        <div className="container relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              Available Seeders
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              AgniStack <span className="text-primary glow-text">Seeders</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Seeders are the backbone of AgniStack's decentralized network. They help in
              discovery, connection and routing within the network.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="rounded-md border border-border bg-background p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{title}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container px-6">
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-5 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight">Seeder List</h2>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Live data from the AgniStack network
                </span>
              </div>
              <button
                onClick={load}
                disabled={loading}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                {updatedAt
                  ? `Last updated: ${updatedAt.toLocaleTimeString()}`
                  : "Refresh"}
              </button>
            </div>

            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-3">
              <div className="col-span-2">IP</div>
              <div className="col-span-5">Fingerprint</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Maintainer</div>
              <div className="col-span-1">Region</div>
            </div>

            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="rounded-full border border-destructive/30 bg-destructive/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <div className="font-medium">Could not load seeders</div>
                  <div className="text-sm text-muted-foreground mt-1">{error}</div>
                </div>
                <Button variant="hero" size="sm" onClick={load} className="gap-2">
                  <RefreshCw className="h-3.5 w-3.5" /> Retry
                </Button>
              </div>
            )}

            {!loading && !error && seeders.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="rounded-full border border-border bg-muted p-3">
                  <Inbox className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">No seeders available</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Check back soon or run your own seeder.
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && seeders.length > 0 && (
              <div className="space-y-2">
                {seeders.map((s) => (
                  <SeederRow key={s.ip} s={s} />
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border border-border/60 bg-background/40 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md border border-border bg-card p-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Anyone can run a seeder and help grow the network.
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Check out the docs to set up your own seeder.
                  </div>
                </div>
              </div>
              <a
                href="https://github.com/dipghoshraj/agni-stack"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero-outline" size="sm" className="gap-2">
                  View Docs <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Seeders;

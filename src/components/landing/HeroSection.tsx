import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 gradient-radial-top" />

      <div className="container relative z-10 px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            Decentralized Connectivity Network
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Decentralized Secure{" "}
            <span className="text-primary glow-text">Connectivity</span>{" "}
            for Private Applications
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Expose private services to the internet using encrypted tunnels,
            cryptographic identity, and distributed gateways.
          </p>

          {/* Three points */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm font-mono text-muted-foreground">
            {["No open ports", "No VPNs", "No centralized relay"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="terminal-bg rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="h-3 w-3 rounded-full bg-destructive/60" />
                <span className="h-3 w-3 rounded-full bg-primary/60" />
                <span className="h-3 w-3 rounded-full bg-secondary/60" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-5 text-left font-mono text-sm leading-relaxed">
                <div className="text-muted-foreground">
                  <span className="text-primary">$</span> agnistack connect
                </div>
                <div className="mt-3 text-primary">
                  → https://api.yourdomain.com
                </div>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://github.com/odio4u/agni-tunnels/blob/main/doc/agni-agent-quickstart.md" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://github.com/odio4u/agni-tunnels" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="lg" className="gap-2">
                <Github className="h-4 w-4" /> View GitHub
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

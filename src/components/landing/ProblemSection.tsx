import { motion } from "framer-motion";
import { Shield, Globe, Network, Server, Lock } from "lucide-react";

const painPoints = [
  { icon: Shield, label: "Firewall Configuration" },
  { icon: Globe, label: "Port Exposure" },
  { icon: Network, label: "NAT Traversal" },
  { icon: Server, label: "Reverse Proxies" },
  { icon: Lock, label: "Complex TLS Setup" },
];

const ProblemSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-center" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Private Infrastructure is{" "}
            <span className="text-primary">Hard to Access</span> Securely
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional tools either expose networks, require centralized relays,
            or terminate encryption — leaving your services vulnerable.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <point.icon className="h-6 w-6 text-primary" />
              <span className="text-sm text-center font-medium text-muted-foreground">
                {point.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

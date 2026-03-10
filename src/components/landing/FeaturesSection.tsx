import { motion } from "framer-motion";
import { Key, ShieldCheck, Lock, Globe, LinkIcon, Cpu } from "lucide-react";

const features = [
  {
    icon: Key,
    title: "Cryptographic Service Identity",
    description: "Each agent has a public/private key identity used to verify services.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Encryption",
    description: "Traffic stays encrypted between client and service. No TLS termination.",
  },
  {
    icon: Lock,
    title: "mTLS Communication",
    description: "All tunnels use mutual TLS authentication for bidirectional trust.",
  },
  {
    icon: Globe,
    title: "Distributed Gateway Network",
    description: "Traffic can route through multiple gateways for resilience and locality.",
  },
  {
    icon: LinkIcon,
    title: "Custom Domains with SSL",
    description: "Expose services with your own domain and automatic SSL certificates.",
  },
  {
    icon: Cpu,
    title: "Protocol Agnostic",
    description: "Forward any TCP service — HTTP, databases, dashboards, and more.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Built for <span className="text-primary">Security</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every layer designed around cryptographic trust and zero exposure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

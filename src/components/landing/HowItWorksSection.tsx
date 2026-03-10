import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Fingerprint, Zap } from "lucide-react";

const steps = [
  {
    icon: Terminal,
    step: "1",
    title: "Run the Agent",
    description: "Install the CLI and connect your service.",
  },
  {
    icon: ShieldCheck,
    step: "2",
    title: "Establish Secure Tunnel",
    description: "Agent creates outbound encrypted tunnel using mTLS.",
  },
  {
    icon: Fingerprint,
    step: "3",
    title: "Identity Verification",
    description: "Gateways verify the service cryptographic identity.",
  },
  {
    icon: Zap,
    step: "4",
    title: "Traffic Forwarding",
    description: "Requests are securely routed to the service.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 gradient-radial-center" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center p-6"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-primary/30 bg-primary/10 mb-5">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-mono text-primary mb-2">Step {s.step}</div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

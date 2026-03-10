import { motion } from "framer-motion";

const layers = [
  { title: "Identity Layer", description: "Public/private key identity", color: "bg-primary" },
  { title: "Secure Transport", description: "mTLS encrypted tunnels", color: "bg-secondary" },
  { title: "Routing Layer", description: "Distributed gateways", color: "bg-primary/70" },
  { title: "Application Layer", description: "Services receive encrypted traffic", color: "bg-secondary/70" },
];

const ArchitectureSection = () => {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 grid-bg-fine opacity-20" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Architecture <span className="text-primary">Philosophy</span>
          </h2>
        </motion.div>

        <div className="max-w-lg mx-auto space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-4 p-5 rounded-lg border border-border bg-card"
            >
              <div className={`h-3 w-10 rounded-full ${layer.color}`} />
              <div>
                <div className="font-semibold text-sm">{layer.title}</div>
                <div className="text-xs text-muted-foreground">{layer.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

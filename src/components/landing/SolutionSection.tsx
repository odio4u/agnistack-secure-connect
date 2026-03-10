import { motion } from "framer-motion";

const diagramNodes = [
  { label: "Internet", sublabel: "Client Request", color: "text-muted-foreground" },
  { label: "AgniStack Gateway", sublabel: "Distributed Edge", color: "text-primary" },
  { label: "Encrypted Tunnel", sublabel: "mTLS", color: "text-secondary" },
  { label: "AgniStack Agent", sublabel: "Local Runtime", color: "text-primary" },
  { label: "Local Service", sublabel: "Your Application", color: "text-foreground" },
];

const SolutionSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            AgniStack{" "}
            <span className="text-primary">Secure Connectivity</span> Network
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Services connect outbound to the AgniStack network through encrypted
            tunnels. No inbound ports. No exposed infrastructure.
          </p>
        </motion.div>

        {/* Diagram */}
        <div className="max-w-xs mx-auto">
          {diagramNodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="relative flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                <div className={`h-3 w-3 rounded-full ${node.color === "text-primary" ? "bg-primary" : node.color === "text-secondary" ? "bg-secondary" : "bg-muted-foreground"}`} />
                <div>
                  <div className={`text-sm font-semibold ${node.color}`}>{node.label}</div>
                  <div className="text-xs text-muted-foreground">{node.sublabel}</div>
                </div>
              </div>
              {i < diagramNodes.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="relative h-8 w-px bg-border">
                    <div className="absolute inset-0 w-px bg-primary/50 animate-flow-down" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

import { motion } from "framer-motion";
import { Code2, ShieldCheck, Radio, LayoutDashboard } from "lucide-react";

const useCases = [
  { icon: Code2, title: "Local Development", description: "Share development servers instantly." },
  { icon: ShieldCheck, title: "Secure APIs", description: "Expose private APIs safely." },
  { icon: Radio, title: "Edge Infrastructure", description: "Connect devices behind NAT." },
  { icon: LayoutDashboard, title: "Internal Services", description: "Publish internal dashboards securely." },
];

const UseCasesSection = () => {
  return (
    <section className="py-32">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Use <span className="text-primary">Cases</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <uc.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

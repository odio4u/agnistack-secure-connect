import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 gradient-radial-top" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Secure your private services{" "}
            <span className="text-primary">without exposing infrastructure.</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Button variant="hero" size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="gap-2">
              <Github className="h-4 w-4" /> View GitHub
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

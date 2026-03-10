import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import logo from "@/components/logo/file.svg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16 px-6">
      <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 rounded-lg p-1 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "rgb(231, 230, 226)" }}
      >
          <img
            src={logo}
            alt="AgniStack"
            className="w-full h-full object-contain block"
          />
        </div>
        <span className="font-semibold text-xl text-white select-none">
          AgniStack
        </span>
      </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
          <a href="https://github.com/odio4u/agni-tunnels" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
          <a href="https://github.com/odio4u/agni-tunnels/blob/main/doc/agni-agent-quickstart.md" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="sm">Get Started</Button>
          </a>
      </div>
    </nav>
  );
};

export default Navbar;

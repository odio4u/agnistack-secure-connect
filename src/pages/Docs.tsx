import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Book,
  Rocket,
  Network,
  Shield,
  Server,
  Boxes,
  GitBranch,
  Terminal,
  Cpu,
  Globe,
  Activity,
  Eye,
  Users,
  Map,
  Github,
  ChevronRight,
  Search,
  Edit3,
  ArrowRight,
  Lock,
  Zap,
  Layers,
  Database,
  Copy,
  Check,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const sidebarSections = [
  {
    title: "Introduction",
    items: [
      { id: "what-is", label: "What is AgniStack", icon: Book },
      { id: "core-architecture", label: "How it Works", icon: Layers },
      { id: "architecture-overview", label: "Architecture Overview", icon: Network },
      { id: "components", label: "Components", icon: Boxes },
    ],
  },
  {
    title: "Getting Started",
    items: [
      { id: "installation", label: "Install agni-agent", icon: Terminal },
      { id: "configuration", label: "Configuration", icon: Database },
      { id: "cli-reference", label: "CLI Reference", icon: Rocket },
      { id: "quick-start", label: "Quick Start", icon: Zap },
    ],
  },
  {
    title: "Security & Status",
    items: [
      { id: "security", label: "Security Model", icon: Lock },
      { id: "capabilities", label: "Current Capabilities", icon: Activity },
      { id: "future", label: "Future Direction", icon: Map },
    ],
  },
  {
    title: "Community",
    items: [
      { id: "github", label: "GitHub", icon: Github, href: "https://github.com/dipghoshraj/agni-stack" },
    ],
  },
];

const onThisPage = [
  { id: "what-is", label: "What is AgniStack" },
  { id: "core-architecture", label: "How it Works" },
  { id: "installation", label: "Install agni-agent" },
  { id: "configuration", label: "Configuration" },
  { id: "cli-reference", label: "CLI Reference" },
  { id: "quick-start", label: "Quick Start" },
  { id: "architecture-overview", label: "Architecture Overview" },
  { id: "components", label: "Components" },
  { id: "security", label: "Security" },
  { id: "capabilities", label: "Current Capabilities" },
  { id: "future", label: "Future Direction" },
];

const coreComponents = [
  {
    icon: Cpu,
    name: "Agent",
    desc: "Runs on your machine and creates outbound secure tunnels to the network.",
    tag: "Outbound Tunnel",
  },
  {
    icon: GitBranch,
    name: "Gateway",
    desc: "Routes traffic between proxies and agents using secure, authenticated channels.",
    tag: "Traffic Routing",
  },
  {
    icon: Shield,
    name: "Proxy",
    desc: "Public entry point of the network. Handles incoming traffic and routes it to the right gateway.",
    tag: "Ingress",
  },
  {
    icon: Database,
    name: "Seeder",
    desc: "Helps nodes discover the network, share topology and maintain distributed consistency.",
    tag: "Discovery",
  },
];

const highlights = [
  { icon: Shield, title: "Secure Exposure", desc: "Expose applications safely to the world." },
  { icon: Network, title: "Distributed Network", desc: "No single point of failure." },
  { icon: Server, title: "Outbound-Only", desc: "Works behind NAT, firewalls & CGNAT." },
  { icon: Lock, title: "Privacy First", desc: "Zero-trust design and encryption by default." },
  { icon: Boxes, title: "Open Source", desc: "Built by the community, for the community." },
];

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const CodeBlock = ({ children, code }: { children: React.ReactNode; code: string }) => (
  <div className="terminal-bg relative rounded-lg overflow-hidden">
    <div className="flex items-center justify-between border-b border-border px-4 py-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      <CopyBtn text={code} />
    </div>
    <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground/90">
      {children}
    </pre>
  </div>
);

const Docs = () => {
  const [activeTab, setActiveTab] = useState<"linux" | "windows" | "source">("linux");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const installCommands = {
    linux: `# Download the Linux or macOS binary from GitHub Releases
# https://github.com/dipghoshraj/agni-stack/releases

chmod +x agni-agent
sudo mv agni-agent /usr/local/bin/agni-agent

agni-agent version`,
    windows: `# Download agni-agent.exe from GitHub Releases
# https://github.com/dipghoshraj/agni-stack/releases

.\\agni-agent.exe version`,
    source: `git clone https://github.com/dipghoshraj/agni-stack.git
cd agni-stack

make agent-linux      # → release/linux/agni-agent
make agent-darwin     # → release/darwin/agni-agent
make agent-windows    # → release/windows/agni-agent.exe
make agent-all        # all platforms at once

make help`,
  };

  const configExample = `version: v1

Agent:
  name: "agent-agni"
  domain: "agni.local.internal"   # SNI domain for routing
  forward: 5050                   # Local port your app listens on
  host: "localhost"               # Local host to dial
  region: "global"
  certs: "./"                     # Directory with client.pem + client-key.pem
  Seeder:
    address: "localhost:8080"
    fingureprint: "<seeder-cert-fingerprint>"`;

  const quickStartCommands = `# 1) Edit agni-config.yaml with your seeder, domain, port, and cert path

# 2) Generate certificates from Agent.domain and Agent.name
agni-agent gen-creds

# Optional: use a different config file
agni-agent gen-creds -f /path/to/agni-config.yaml

# 3) Start your local app on Agent.forward, then run the agent
agni-agent connect`;

  const cliCommands = `agni-agent connect
agni-agent gen-creds
agni-agent gen-creds -f /path/to/agni-config.yaml
agni-agent version`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="grid-bg-fine pointer-events-none fixed inset-0 opacity-40" />
      <div className="gradient-radial-top pointer-events-none fixed inset-0" />

      <div className="relative pt-16">
        <div className="container px-6">
          <div className="grid grid-cols-12 gap-8 py-10">
            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search docs..."
                    className="h-9 bg-card/60 pl-9 pr-12 text-sm"
                  />
                  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    ⌘K
                  </kbd>
                </div>

                <nav className="space-y-5 text-sm">
                  {sidebarSections.map((section) => (
                    <div key={section.title}>
                      <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-primary/80">
                        {section.title}
                      </div>
                      <ul className="space-y-0.5">
                        {section.items.map((item, idx) => {
                          const Icon = item.icon;
                          const active = section.title === "Introduction" && idx === 0;
                          return (
                            <li key={item.id}>
                              <a
                                href={"href" in item ? item.href : `#${item.id}`}
                                target={"href" in item ? "_blank" : undefined}
                                rel={"href" in item ? "noopener noreferrer" : undefined}
                                className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground ${
                                  active ? "bg-card text-foreground" : ""
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <Icon className="h-3.5 w-3.5 text-primary/70" />
                                  {item.label}
                                </span>
                                <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>

                <div className="rounded-lg border border-border bg-card/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4 text-primary" /> Need Help?
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Join our community and get help from the team.
                  </p>
                  <a
                    href="https://github.com/dipghoshraj/agni-stack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="hero-outline" size="sm" className="w-full">
                      Join Community
                    </Button>
                  </a>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border bg-card/60 px-3 py-2 text-xs">
                  <span className="text-muted-foreground">AgniStack v0.1.0</span>
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/15 border-primary/30">
                    Latest
                  </Badge>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="col-span-12 lg:col-span-9 xl:col-span-7 space-y-12">
              {/* Hero */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                id="what-is"
                className="rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-sm"
              >
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div>
                    <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary">
                      DOCUMENTATION
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                      AgniStack{" "}
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow-text">
                        Docs
                      </span>
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      Privacy-first fabric for exposing private servers to the internet.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Bring your own domain, certificates, and server. AgniStack routes raw TCP streams
                      end-to-end without TLS termination or payload inspection.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="#installation">
                        <Button variant="hero">
                          Install agni-agent <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                      <a
                        href="https://github.com/dipghoshraj/agni-stack"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="hero-outline">
                          View on GitHub <Github className="h-4 w-4" />
                        </Button>
                      </a>
                      <a href="#architecture-overview">
                        <Button variant="hero-outline">
                          <Layers className="h-4 w-4" /> Architecture
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Diagram */}
                  <div className="relative">
                    <div className="absolute inset-0 grid-bg-fine opacity-30 rounded-xl" />
                    <div className="relative flex flex-col items-center gap-2 py-4">
                      {[
                        { label: "Client", icon: Cpu },
                        { label: "agni-nova", icon: Shield },
                        { label: "agni-router", icon: GitBranch },
                        { label: "agni-agent", icon: Boxes },
                        { label: "Your App", icon: Terminal },
                      ].map((node, i) => (
                        <div key={node.label} className="flex flex-col items-center w-full">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 rounded-lg border border-primary/30 bg-card/80 px-4 py-2 text-sm font-medium glow-primary-sm"
                          >
                            <node.icon className="h-4 w-4 text-primary" />
                            {node.label}
                          </motion.div>
                          {i < 4 && (
                            <div className="relative h-6 w-px overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-transparent" />
                              <div className="absolute inset-0 animate-flow-down bg-gradient-to-b from-transparent via-primary to-transparent" />
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-2 rounded-lg border border-secondary/30 bg-card/80 px-3 py-2 text-xs">
                        <Database className="h-4 w-4 text-secondary" /> Seeder Network
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* What is AgniStack */}
              <section className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-4">What is AgniStack?</h2>
                <p className="text-muted-foreground mb-3">
                  Agnistack is a privacy-first, decentralized application deployment network designed
                  to expose private servers to the internet through distributed routing.
                </p>
                <p className="text-muted-foreground mb-6">
                  It is built for zero-trust and anonymous access, especially in restricted,
                  firewalled, or censored environments where inbound networking is difficult.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {highlights.map((h) => (
                    <div
                      key={h.title}
                      className="rounded-lg border border-border bg-background/40 p-3 transition-colors hover:border-primary/40"
                    >
                      <h.icon className="h-4 w-4 text-primary mb-2" />
                      <div className="text-xs font-semibold mb-1">{h.title}</div>
                      <div className="text-[11px] text-muted-foreground leading-snug">{h.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-3 rounded-lg border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm">
                  <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    AgniStack is also the foundational layer for our future zero-trust and
                    privacy-first communication systems.
                  </span>
                </div>
              </section>

              {/* Core Architecture */}
              <section id="core-architecture" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-2">Core Architecture</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  External client traffic flows through agni-nova, agni-router, and agni-agent before reaching your application.
                </p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {coreComponents.map((c) => (
                    <motion.div
                      key={c.name}
                      whileHover={{ y: -4 }}
                      className="rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/40"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                        <c.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1.5">{c.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
                      <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/10 text-[10px]">
                        {c.tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <a
                  href="#architecture-overview"
                  className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Learn more about the architecture <ArrowRight className="h-3 w-3" />
                </a>
              </section>

              {/* Installation */}
              <section id="installation" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-2">Install agni-agent</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  agni-agent runs alongside your private application and opens a persistent gRPC
                  tunnel to agni-router, so services that are not directly exposed to the internet
                  can still receive external traffic.
                </p>

                <div className="mb-4 flex gap-1 border-b border-border">
                  {(["linux", "windows", "source"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`relative px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        activeTab === t
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t === "linux" ? "Linux / macOS" : t === "source" ? "Build from Source" : "Windows"}
                      {activeTab === t && (
                        <motion.div
                          layoutId="tab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <CodeBlock code={installCommands[activeTab]}>
                  <code className="text-foreground/90">{installCommands[activeTab]}</code>
                </CodeBlock>

                <div className="mt-5 overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-background/60 text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Platform</th>
                        <th className="px-4 py-3 font-medium">Release file</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="px-4 py-3">Linux (amd64)</td>
                        <td className="px-4 py-3 font-mono text-foreground/90">agni-agent</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">macOS (amd64)</td>
                        <td className="px-4 py-3 font-mono text-foreground/90">agni-agent</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Windows (amd64)</td>
                        <td className="px-4 py-3 font-mono text-foreground/90">agni-agent.exe</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <a
                  href="https://github.com/dipghoshraj/agni-stack/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Download from GitHub Releases <ArrowRight className="h-3 w-3" />
                </a>
              </section>

              {/* Configuration */}
              <section id="configuration" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-2">Configuration</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Place an agni-config.yaml file in the directory where you run the agent. The
                  values tell agni-agent which domain to register, which local service to dial, and
                  which seeder to trust.
                </p>

                <CodeBlock code={configExample}>
                  <code>{configExample}</code>
                </CodeBlock>

                <div className="mt-5 grid gap-3 text-sm">
                  {[
                    ["domain", "SNI domain the router uses to route traffic to this agent."],
                    ["forward", "TCP port of your local application."],
                    ["host", "Hostname or IP address agni-agent dials locally."],
                    ["certs", "Path containing client.pem and client-key.pem."],
                    ["Seeder.address", "Address of the seeder/discovery service."],
                    ["Seeder.fingureprint", "SHA-256 fingerprint of the seeder TLS certificate."],
                  ].map(([field, desc]) => (
                    <div key={field} className="rounded-lg border border-border bg-background/40 p-4">
                      <div className="font-mono text-xs text-primary mb-1">{field}</div>
                      <div className="text-muted-foreground text-xs">{desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CLI Reference */}
              <section id="cli-reference" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-2">CLI Reference</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Use these commands after installing agni-agent and creating agni-config.yaml.
                </p>

                <CodeBlock code={cliCommands}>
                  <code>{cliCommands}</code>
                </CodeBlock>

                <div className="mt-5 grid gap-3 text-sm">
                  {[
                    ["connect", "Registers with the seeder and opens a persistent tunnel."],
                    ["gen-creds", "Generates self-signed TLS certificates using Agent.domain and Agent.name from agni-config.yaml."],
                    ["gen-creds -f", "Generates credentials with a specific config file path."],
                    ["version", "Prints the current agni-agent version."],
                  ].map(([command, desc]) => (
                    <div key={command} className="flex gap-3 rounded-lg border border-border bg-background/40 p-4">
                      <Terminal className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="font-mono text-xs text-foreground mb-1">agni-agent {command}</div>
                        <div className="text-muted-foreground text-xs">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-2">Quick Start</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Configure agni-agent, generate credentials, start your app, and connect the tunnel.
                </p>

                <CodeBlock code={quickStartCommands}>
                  <code className="text-foreground/90">{quickStartCommands}</code>
                </CodeBlock>

                <div className="mt-5 grid gap-3 text-sm">
                  {[
                    ["Edit agni-config.yaml", "Set your seeder address, domain, local forward port, and certificate directory."],
                    ["Generate certificates", "Run agni-agent gen-creds to create client.pem and client-key.pem."],
                    ["Start your app", "Run your private service on the host and port declared in Agent.host and Agent.forward."],
                    ["Connect", "Run agni-agent connect to register and open the persistent tunnel."],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-3 rounded-lg border border-border bg-background/40 p-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">{title}</div>
                        <div className="text-muted-foreground text-xs">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Architecture Overview */}
              <section id="architecture-overview" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-3">Architecture Overview</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  External client → agni-nova (front-door TCP proxy) → agni-router → agni-agent →
                  your application. There is no TLS termination at any hop. Your certificates stay
                  yours.
                </p>
                <CodeBlock
                  code={`External Client
      │
      ▼
 agni-nova          ← Entry point: peeks SNI, routes to correct router
      │
      ▼
 agni-router        ← Receives TCP stream; maps SNI → agent session
      │  (gRPC bidirectional stream)
      ▼
 agni-agent         ← Runs on your private server; forwards to your app
      │
      ▼
 Your Application   ← PrivateIP:<port>`}
                >
                  <code>{`External Client
      │
      ▼
 agni-nova          ← Entry point: peeks SNI, routes to correct router
      │
      ▼
 agni-router        ← Receives TCP stream; maps SNI → agent session
      │  (gRPC bidirectional stream)
      ▼
 agni-agent         ← Runs on your private server; forwards to your app
      │
      ▼
 Your Application   ← PrivateIP:<port>`}</code>
                </CodeBlock>
              </section>

              {/* Seeder Network */}
              <section id="components" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-3">Components</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Agnistack includes agni-nova (front door), agni-router (SNI to session mapping), agni-seeder (registry), and agni-agent (private server connector).
                </p>
                <CodeBlock code={`agni-agent scan`}>
                  <code>agni-agent scan</code>
                </CodeBlock>
                <p className="mt-4 text-sm text-muted-foreground">
                  Prints a table of available seeders with their address, region, and fingerprint.
                </p>
                <Link
                  to="/seeders"
                  className="mt-5 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View live Seeder Network <ArrowRight className="h-3 w-3" />
                </Link>
              </section>

              {/* Security */}
              <section id="security" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-3">Security Model</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  AgniStack uses a zero-trust-inspired model with no dependency on certificate
                  authorities.
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    ["Outbound-only connections", "The agent always initiates. No inbound ports are opened on your server."],
                    ["Certificate fingerprint identity", "Each agent generates a self-signed TLS certificate. The SHA-256 fingerprint is the agent's identity."],
                    ["TLS 1.3 only", "All gRPC connections enforce MinVersion: tls.VersionTLS13."],
                    ["No CA chain", "No certificate authority to trust, rotate, or compromise."],
                    ["No payload inspection", "Traffic is forwarded as raw bytes — AgniStack has no visibility into connection content."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-3 rounded-lg border border-border bg-background/40 p-4">
                      <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="font-medium mb-1">{t}</div>
                        <div className="text-muted-foreground text-xs">{d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>


              <section id="capabilities" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-3">Current Capabilities</h2>
                <ul className="grid gap-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Secure application exposure through outbound-only tunnels</li>
                  <li>SNI-based distributed ingress routing</li>
                  <li>Persistent gRPC bidirectional streams between agent and router</li>
                  <li>Certificate fingerprint identity with no CA chain</li>
                  <li>TLS 1.3 enforcement across all connections</li>
                  <li>Decentralized seeder discovery and self-hostable full stack</li>
                </ul>
              </section>

              <section id="future" className="rounded-2xl border border-border bg-card/40 p-8">
                <h2 className="text-2xl font-bold mb-3">Future Direction</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  AgniStack is intended as foundational infrastructure for privacy-first distributed systems.
                </p>
                <ul className="grid gap-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Global routing optimization and multi-region failover</li>
                  <li>Observability and tunnel health metrics</li>
                  <li>Access control and policy enforcement</li>
                  <li>Community-backed anonymous networking</li>
                </ul>
              </section>

                            {/* Footer CTA */}
              <section className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/40 to-secondary/10 p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
                      <Boxes className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Built for developers. Designed for a decentralized future.</div>
                      <div className="text-sm text-muted-foreground">
                        AgniStack gives you the freedom to run, expose and connect — on your terms.
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://github.com/dipghoshraj/agni-stack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="hero-outline">
                      View on GitHub <Github className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </section>
            </main>

            {/* On this page */}
            <aside className="hidden xl:block xl:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div>
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-primary/80">
                    On This Page
                  </div>
                  <ul className="space-y-1.5 text-sm border-l border-border">
                    {onThisPage.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="-ml-px block border-l-2 border-transparent pl-3 py-0.5 text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-card/60 p-4">
                  <div className="font-medium text-sm mb-1">Edit this page</div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Improve this document on GitHub.
                  </p>
                  <a
                    href="https://github.com/dipghoshraj/agni-stack/blob/master/doc/agnistack.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit on GitHub
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Docs;

import logo from "@/assets/agnistack-icon.png";

const footerLinks = [
  { label: "Documentation", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Community", href: "#" },
  { label: "Security", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="AgniStack"
              className="h-7 w-7 object-contain block"
            />

            <span className="font-semibold tracking-tight">AgniStack</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          AgniStack — Distributed Secure Connectivity for Applications
        </div>
      </div>
    </footer>
  );
};

export default Footer;

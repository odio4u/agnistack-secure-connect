import logo from "../logo/file.svg";

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
            <div
              className="h-6 w-6 rounded-md p-0.5 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "rgb(231, 230, 226)" }}
            >
              <img
                src={logo}
                alt="AgniStack"
                className="w-full h-full object-contain block"
              />
            </div>
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
          AgniStack — Decentralized Secure Connectivity for Applications
        </div>
      </div>
    </footer>
  );
};

export default Footer;

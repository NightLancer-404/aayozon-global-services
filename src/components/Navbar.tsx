import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT_DETAILS, formatTelLink, formatWhatsAppLink } from "@/lib/contact";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Treatments", to: "/treatments" },
  { label: "Packages", to: "/packages" },
  { label: "Travel Assistance", to: "/travel-assistance" },
  { label: "Hotels & Stay", to: "/hotels" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const telLink = formatTelLink(CONTACT_DETAILS.phone);
  const whatsappLink = formatWhatsAppLink(CONTACT_DETAILS.whatsapp);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-primary font-body text-primary-foreground">
        <div className="container-main flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-4">
            <a href={telLink} className="flex items-center gap-1 transition-opacity hover:opacity-80">
              <Phone className="h-3 w-3" /> {CONTACT_DETAILS.phone}
            </a>
            <span className="hidden md:inline">|</span>
            <a href={`mailto:${CONTACT_DETAILS.email}`} className="hidden transition-opacity hover:opacity-80 md:inline">{CONTACT_DETAILS.email}</a>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-opacity hover:opacity-80">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Emergency WhatsApp
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 shadow-lg backdrop-blur-md" : "bg-card"}`}>
        <div className="container-main flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Aayozon Global Services" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-foreground">Aayozon</span>
              <span className="block text-xs text-muted-foreground">Global Services Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors ${location.pathname === link.to ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted hover:text-primary"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary-medical ml-2 text-sm">
              Get Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted lg:hidden">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-fade-in border-t border-border bg-card px-4 pb-4 lg:hidden">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`block rounded-lg px-4 py-3 font-body text-sm font-medium transition-colors ${location.pathname === link.to ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary-medical mt-2 w-full text-center text-sm">
              Get Consultation
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

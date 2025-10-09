import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logowhite from "@/assets/logowhite.png"; // 

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/portfolio", label: t("portfolio") },
    { to: "/services", label: t("services") },
    { to: "/about", label: t("about") },
    { to: "/contact", label: t("contact") },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-bbDark text-bbSoftGold border-t border-bbSoftGold/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12 text-center md:text-left">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            {/* ✅ Logo only, linked to homepage */}
            <Link to="/" aria-label="Beyond Basic Home">
              <img
                src={logowhite}
                alt="Beyond Basic Logo"
                className="w-28 h-auto mb-4"
              />
            </Link>

            {/* Optional Tagline */}
            <p className="text-bbSoftGold/70 text-sm max-w-sm mx-auto md:mx-0">
              {t("footerTagline")}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-bbOlive transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-full border border-bbSoftGold/20 flex items-center justify-center transition-all duration-300 hover:border-bbOlive hover:bg-bbOlive/10"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 text-bbSoftGold hover:text-bbOlive transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-10 pt-6 border-t border-bbSoftGold/10 text-center text-sm text-bbSoftGold/50">
          © {new Date().getFullYear()} BEYOND BASIC — {t("rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

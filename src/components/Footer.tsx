import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import logowhite from "@/assets/logowhite.png";
import { useState } from "react";

const Footer = () => {
  const { t } = useLanguage();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/portfolio", label: t("portfolio") },
    { to: "/services", label: t("services") },
    { to: "/about", label: t("about") },
    { to: "/contact", label: t("contact") },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "/",
      label: "Facebook",
      tooltip: "Visit our Homepage",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/beyondbasic_kw?igsh=MTMwY2UxdjQ3bGwycQ%3D%3D&utm_source=qr",
      label: "Instagram",
      tooltip: "Follow us on Instagram",
    },
    {
      icon: SiTiktok,
      href: "https://www.tiktok.com/@beyondbasic_kw?_t=ZS-90Qn4PjMmmo&_r=1",
      label: "TikTok",
      tooltip: "Follow us on TikTok",
    },
  ];

  return (
    <footer className="bg-bbDark text-bbSoftGold border-t border-bbSoftGold/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12 text-center md:text-left">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" aria-label="Beyond Basic Home">
              <img
                src={logowhite}
                alt="Beyond Basic Logo"
                className="w-28 h-auto mb-4 transition-transform duration-500 hover:scale-105"
              />
            </Link>

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

          {/* Social Media Icons (Touch + Hover Friendly) */}
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <div
                className="relative group"
                key={social.label}
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === social.label ? null : social.label
                  )
                }
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 md:w-9 md:h-9 rounded-full border border-bbSoftGold/30 flex items-center justify-center transition-all duration-300 hover:border-bbOlive hover:bg-bbOlive/10 hover:scale-110"
                >
                  <social.icon className="h-5 w-5 text-bbSoftGold hover:text-bbOlive transition-colors" />
                </a>

                {/* Tooltip for both hover & tap */}
                <span
                  className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-xs bg-bbSoftGold/90 text-bbDark px-2 py-1 rounded-md shadow-md transition-all duration-300 whitespace-nowrap ${
                    activeTooltip === social.label
                      ? "opacity-100 visible"
                      : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  }`}
                >
                  {social.tooltip}
                </span>
              </div>
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

import { useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png"; // ✅ Import logo

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bbSoftGold/80 backdrop-blur-md border-b border-bbOlive">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        
        {/* ✅ Logo Section */}
        <Link to="/" onClick={closeMenu} aria-label="Beyond Basic Home">
          <img
            src={logo}
            alt="Beyond Basic Logo"
            className="w-28 md:w-32 h-auto hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-bbDark">
          <Link to="/" className="text-sm font-medium hover:text-bbOlive transition-colors">
            {t("home")}
          </Link>
          <Link to="/portfolio" className="text-sm font-medium hover:text-bbOlive transition-colors">
            {t("portfolio")}
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-bbOlive transition-colors">
            {t("about")}
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-bbOlive transition-colors">
            {t("services")}
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-bbOlive transition-colors">
            {t("contact")}
          </Link>
        </div>

        {/* Language Toggle + Menu Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-bbDark hover:text-bbOlive"
          >
            <Languages className="h-4 w-4" />
            <span className="text-sm font-medium">
              {language === "en" ? "عربي" : "EN"}
            </span>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-bbDark hover:text-bbOlive transition-colors"
            onClick={toggleMenu}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-bbSoftGold/95 backdrop-blur-md border-t border-bbOlive animate-fade-in">
          <div className="flex flex-col items-start gap-4 px-6 py-4 text-bbDark">
            <Link to="/" onClick={closeMenu} className="text-base font-medium hover:text-bbOlive transition-colors">
              {t("home")}
            </Link>
            <Link to="/portfolio" onClick={closeMenu} className="text-base font-medium hover:text-bbOlive transition-colors">
              {t("portfolio")}
            </Link>
            <Link to="/about" onClick={closeMenu} className="text-base font-medium hover:text-bbOlive transition-colors">
              {t("about")}
            </Link>
            <Link to="/services" onClick={closeMenu} className="text-base font-medium hover:text-bbOlive transition-colors">
              {t("services")}
            </Link>
            <Link to="/contact" onClick={closeMenu} className="text-base font-medium hover:text-bbOlive transition-colors">
              {t("contact")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

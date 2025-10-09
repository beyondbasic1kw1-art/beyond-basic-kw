import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105 hover:scale-110"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-bbDark/50 md:bg-bbDark/40" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 px-6 md:px-10 lg:px-20 py-32 animate-fade-in max-w-4xl mx-auto ${
          language === "ar" ? "text-right" : "text-center"
        }`}
      >
        {/* Brand Name */}
        <h1
          className={`${
            language === "ar" ? "font-iwan" : "font-mollies"
          } text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg`}
        >
          {t("brandName")}
        </h1>

        {/* Tagline */}
        <p
          className={`${
            language === "ar" ? "font-iwan" : "font-mollies"
          } text-white/90 text-base sm:text-lg md:text-xl mb-4 tracking-[0.05em]`}
        >
          {t("tagline")}
        </p>

        {/* Subtitle */}
        <p
          className={`${
            language === "ar" ? "font-iwan" : "font-inter"
          } text-white/80 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed`}
        >
          {t("heroSubtitle")}
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToProjects}
          size="lg"
          className="bg-bbOlive text-white hover:bg-bbGray transition-all duration-300 px-8 py-5 rounded-full text-base md:text-lg shadow-md hover:shadow-lg"
        >
          {t("viewProjects")}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-all duration-300"
        aria-label="Scroll to projects"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;

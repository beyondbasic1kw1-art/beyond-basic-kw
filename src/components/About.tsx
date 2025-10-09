import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="about"
      className="bg-bbSoftGold py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-bbDark"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
            language === "ar" ? "md:direction-rtl" : ""
          }`}
        >
          {/* Left: Image / Brand Visual */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-bbGray/20 to-bbOlive/10 flex items-center justify-center animate-fade-in">
            <span className="font-playfair text-7xl md:text-8xl font-bold text-bbDark/10 select-none">
              BB
            </span>
          </div>

          {/* Right: Text Content */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t("aboutTitle")}
            </h2>

            <p className="text-bbGray leading-relaxed text-base sm:text-lg mb-8 max-w-xl">
              {t("aboutText")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-bbOlive/30">
              <div className="text-center md:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-semibold text-bbOlive mb-1">
                  10+
                </div>
                <div className="text-sm sm:text-base text-bbGray tracking-wide">
                  {t("yearsExperience")}
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-semibold text-bbOlive mb-1">
                  100+
                </div>
                <div className="text-sm sm:text-base text-bbGray tracking-wide">
                  {t("projectsCompleted")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

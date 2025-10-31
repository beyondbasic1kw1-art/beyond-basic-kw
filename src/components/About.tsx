import { useLanguage } from "@/contexts/LanguageContext";
import LogoDark from "@/assets/logo-dark.png"; // your actual logo

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
          {/* Left: Logo inside gradient box */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-[#e8e6e3]/60 to-[#f4f0ec]/70 flex items-center justify-center animate-fade-in">
            <img
              src={LogoDark}
              alt="Beyond Basic Logo"
              className="w-4/5 md:w-3/4 lg:w-2/3 opacity-80 hover:opacity-100 transition-all duration-700 ease-out transform hover:scale-105 object-contain"
              draggable={false}
            />
          </div>

          {/* Right: Text Content */}
          <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t("aboutTitle")}
            </h2>

            <p className="text-bbGray leading-relaxed text-base sm:text-lg mb-8 max-w-xl">
              {t("aboutText")}
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-bbOlive/30">
              <div className="text-center md:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-semibold text-bbOlive mb-1">
                  4+
                </div>
                <div className="text-sm sm:text-base text-bbGray tracking-wide">
                  {t("yearsExperience")}
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-semibold text-bbOlive mb-1">
                  800+
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

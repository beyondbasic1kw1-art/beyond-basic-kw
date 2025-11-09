import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import LogoDark from "@/assets/logo-dark.png";

const About = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="about"
      className="bg-bbSoftGold py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-bbDark"
    >
      {/* ✅ SEO Helmet (for /about page or when shared) */}
      <Helmet>
        <title>About Beyond Basic KW — Luxury Interior Design Kuwait</title>
        <meta
          name="description"
          content="Beyond Basic KW is Kuwait’s leading interior design and architecture studio, creating luxury spaces for residential and commercial clients."
        />
        <meta
          name="keywords"
          content="Beyond Basic KW, interior design Kuwait, architecture Kuwait, luxury design Kuwait, bespoke interiors, modern architecture, design studio"
        />
        <meta property="og:title" content="About Beyond Basic KW" />
        <meta
          property="og:description"
          content="Learn about Beyond Basic KW — Kuwait’s premier interior design and architecture studio, crafting timeless spaces with a modern touch."
        />
        <meta
          property="og:image"
          content="https://beyondbasickw.com/images/og-image.jpg"
        />
        <meta property="og:url" content="https://beyondbasickw.com/about" />
      </Helmet>

      {/* ✅ JSON-LD Schema for Business info */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Beyond Basic KW",
          url: "https://beyondbasickw.com",
          logo: "https://beyondbasickw.com/images/logo.png",
          description:
            "Beyond Basic KW is a luxury interior design and architecture firm in Kuwait specializing in high-end residential and commercial spaces.",
          sameAs: [
            "https://www.instagram.com/beyondbasickw/",
            "https://www.facebook.com/beyondbasickw/",
          ],
        })}
      </script>

      {/* ✅ About Layout */}
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
              alt="Beyond Basic KW - Luxury Interior Design Kuwait"
              className="w-4/5 md:w-3/4 lg:w-2/3 opacity-80 hover:opacity-100 transition-all duration-700 ease-out transform hover:scale-105 object-contain"
              draggable={false}
            />
          </div>

          {/* Right: Text Content */}
          <article
            className="animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t("aboutTitle")}
            </h2>

            <p className="text-bbGray leading-relaxed text-base sm:text-lg mb-8 max-w-xl">
              {t("aboutText") ||
                "Beyond Basic KW is Kuwait’s premier interior design and architecture studio. We craft luxurious, timeless spaces that blend elegance, innovation, and cultural sophistication — delivering residential and commercial interiors that redefine modern living."}
            </p>

            {/* ✅ Optional SEO paragraph (English only for crawlers) */}
            {language === "en" && (
              <p className="text-bbGray text-sm italic mb-6">
                Our expert designers specialize in bespoke furniture layouts,
                3D visualization, detailed execution plans, and high-end project
                management across Kuwait and the GCC.
              </p>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-bbOlive/30">
              <div className="text-center md:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-semibold text-bbOlive mb-1">
                  4+
                </div>
                <div className="text-sm sm:text-base text-bbGray tracking-wide">
                  {t("yearsExperience") || "Years of Experience"}
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-semibold text-bbOlive mb-1">
                  800+
                </div>
                <div className="text-sm sm:text-base text-bbGray tracking-wide">
                  {t("projectsCompleted") || "Projects Completed"}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;

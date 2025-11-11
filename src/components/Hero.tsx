import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface HeroData {
  en_title: string;
  ar_title: string;
  en_tagline: string;
  ar_tagline: string;
  en_subtitle: string;
  ar_subtitle: string;
  hero_image: string;
}

const Hero = () => {
  const { t, language } = useLanguage();
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch hero data from Supabase
  const fetchHero = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("❌ Error loading hero:", error.message);
      setHero(null);
    } else if (data) {
      // 🖼️ Ensure proper image URL
      if (data.hero_image) {
        if (data.hero_image.startsWith("http")) {
          // Already a public URL from AdminHeroUpload
          data.hero_image = `${data.hero_image}?v=${Date.now()}`;
        } else {
          // Build from Supabase storage if only path stored
          const {
            data: { publicUrl },
          } = supabase.storage.from("hero-images").getPublicUrl(data.hero_image);
          data.hero_image = `${publicUrl}?v=${Date.now()}`;
        }
      }
      setHero(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bbDark text-white">
        <p>Loading hero section...</p>
      </section>
    );
  }

  if (!hero) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bbDark text-white">
        <p>No hero data found.</p>
      </section>
    );
  }

  // 🌐 Language-based content
  const title = language === "ar" ? hero.ar_title : hero.en_title;
  const tagline = language === "ar" ? hero.ar_tagline : hero.en_tagline;
  const subtitle = language === "ar" ? hero.ar_subtitle : hero.en_subtitle;

  // 🖼️ Final background image with fallback
  const image =
    hero.hero_image && hero.hero_image.startsWith("http")
      ? hero.hero_image
      : "/default-hero.jpg";

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* ✅ Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105 hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-bbDark/50 md:bg-bbDark/40" />
      </div>

      {/* ✅ Content */}
      <div
        className={`relative z-10 px-6 md:px-10 lg:px-20 py-32 animate-fade-in max-w-4xl mx-auto ${
          language === "ar" ? "text-right" : "text-center"
        }`}
      >
        <h1
          className={`${
            language === "ar" ? "font-iwan" : "font-mollies"
          } text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg`}
        >
          {title || t("brandName")}
        </h1>

        <p
          className={`${
            language === "ar" ? "font-iwan" : "font-mollies"
          } text-white/90 text-base sm:text-lg md:text-xl mb-4 tracking-[0.05em]`}
        >
          {tagline || t("tagline")}
        </p>

        <p
          className={`${
            language === "ar" ? "font-iwan" : "font-inter"
          } text-white/80 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed`}
        >
          {subtitle || t("heroSubtitle")}
        </p>

        <Button
          onClick={scrollToProjects}
          size="lg"
          className="bg-bbOlive text-white hover:bg-bbGray transition-all duration-300 px-8 py-5 rounded-full text-base md:text-lg shadow-md hover:shadow-lg"
        >
          {t("viewProjects")}
        </Button>
      </div>

      {/* ⬇️ Scroll Indicator */}
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

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabaseClient";
import { Helmet } from "react-helmet-async";

interface AboutSection {
  id: number;
  section_key: string;
  en_heading: string;
  en_text: string;
  ar_heading: string;
  ar_text: string;
}

const About = () => {
  const { language } = useLanguage();
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch About content from Supabase
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("❌ Error fetching About content:", error.message);
      } else {
        setSections(data || []);
      }

      setLoading(false);
    };

    fetchContent();
  }, []);

  const pageTitle =
    language === "ar"
      ? "من نحن — بيوند بيسك | التصميم الداخلي والمعماري في الكويت"
      : "About Beyond Basic KW | Interior Design Kuwait";

  const pageDescription =
    language === "ar"
      ? "اكتشف بيوند بيسك — شركة التصميم الداخلي والمعماري الفاخر في الكويت. نقدم حلولاً شاملة للمساحات السكنية والتجارية بأعلى مستويات الجودة والإبداع."
      : "Discover Beyond Basic KW — Kuwait’s premier luxury interior design and architecture studio, crafting timeless spaces with precision and innovation.";

  const canonicalUrl = "https://beyondbasickw.com/about";
  const ogImage = "https://beyondbasickw.com/images/og-about.jpg";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-bbGray font-inter">
        Loading About Page...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter ${
        language === "ar" ? "direction-rtl text-right" : ""
      }`}
    >
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Beyond Basic KW, interior design Kuwait, luxury architecture Kuwait, design studio Kuwait, home interiors, modern design Kuwait"
        />
        <meta name="author" content="Beyond Basic KW" />
        <link rel="canonical" href={canonicalUrl} />

        {/* ✅ Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Beyond Basic KW" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* ✅ Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Beyond Basic KW",
            url: "https://beyondbasickw.com",
            logo: "https://beyondbasickw.com/images/logo.png",
            sameAs: [
              "https://www.instagram.com/beyondbasickw",
              "https://www.facebook.com/beyondbasickw",
            ],
            description: pageDescription,
            address: {
              "@type": "PostalAddress",
              addressCountry: "Kuwait",
            },
          })}
        </script>
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Page Title */}
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-center mb-12 animate-fade-in">
            {language === "ar" ? "من نحن" : "About Beyond Basic"}
          </h1>

          {/* Content Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h2 className="font-playfair text-2xl md:text-3xl mb-4 text-bbOlive">
                  {language === "ar" ? section.ar_heading : section.en_heading}
                </h2>
                <p className="text-bbGray text-lg leading-relaxed whitespace-pre-line">
                  {language === "ar" ? section.ar_text : section.en_text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
{/* 
      Footer */}
      <Footer />
    </div>
  );
};

export default About;

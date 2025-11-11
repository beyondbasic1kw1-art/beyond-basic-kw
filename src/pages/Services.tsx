import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";

interface Service {
  id: number;
  slug: string;
  en_title: string;
  ar_title: string;
  en_description: string;
  ar_description: string;
  image_url: string;
}

const Services = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch services dynamically from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching services:", error.message);
      } else {
        setServices(data || []);
      }

      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Our Services — Beyond Basic KW | Interior Design Kuwait</title>
        <meta
          name="description"
          content="Explore Beyond Basic KW’s interior design and architecture services — from residential interiors to detailed ceiling and lighting plans in Kuwait."
        />
        <meta
          name="keywords"
          content="Beyond Basic KW, interior design Kuwait, architecture Kuwait, ceiling plans, lighting design, luxury interiors, VR design, bespoke furniture"
        />
        <meta name="author" content="Beyond Basic KW" />
        <link rel="canonical" href="https://beyondbasickw.com/services" />

        {/* ✅ Open Graph */}
        <meta property="og:title" content="Beyond Basic KW | Our Services" />
        <meta
          property="og:description"
          content="Discover our range of interior design and architecture services in Kuwait — crafted by Beyond Basic KW."
        />
        <meta
          property="og:image"
          content="https://beyondbasickw.com/images/og-image.jpg"
        />
        <meta
          property="og:url"
          content="https://beyondbasickw.com/services"
        />
        <meta property="og:type" content="website" />

        {/* ✅ Schema JSON-LD for Services */}
        {services.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Interior Design & Architecture Services",
              provider: {
                "@type": "Organization",
                name: "Beyond Basic KW",
                url: "https://beyondbasickw.com",
              },
              areaServed: {
                "@type": "Place",
                name: "Kuwait",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Beyond Basic KW Services",
                itemListElement: services.map((service) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: service.en_title,
                    description: service.en_description,
                    image: service.image_url,
                  },
                })),
              },
            })}
          </script>
        )}
      </Helmet>

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32 bg-white">
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-bbDark">
          <div className="container mx-auto max-w-7xl text-center">
            {/* Section Title */}
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 animate-fade-in">
              {language === "ar" ? "خدماتنا" : "Our Services"}
            </h1>

            {/* Loading or Empty States */}
            {loading ? (
              <p className="text-bbGray text-center">Loading services...</p>
            ) : services.length === 0 ? (
              <p className="text-bbGray text-center">No services found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {services.map((service, index) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-700"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`${service.en_title} - Beyond Basic KW`}
                  >
                    <img
                      src={service.image_url}
                      alt={`${service.en_title} - Beyond Basic KW`}
                      className="object-cover w-full h-[400px] group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-700 flex flex-col items-center justify-center text-center px-4">
                      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 font-playfair leading-snug">
                        {language === "ar"
                          ? service.ar_title
                          : service.en_title}
                      </h3>
                      <p className="text-bbSoftGold text-sm md:text-base">
                        {language === "ar"
                          ? service.en_title
                          : service.ar_title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabaseClient";

interface ServiceDetailData {
  id: number;
  slug: string;
  en_title: string;
  ar_title: string;
  en_description: string;
  ar_description: string;
  image_url: string;
}

const ServiceDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  const [service, setService] = useState<ServiceDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("service_details")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("❌ Error fetching service detail:", error.message);
        setService(null);
      } else {
        setService(data);
      }

      setLoading(false);
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bbSoftGold text-bbDark">
        <p>{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bbSoftGold text-bbDark">
        <h1 className="text-3xl font-bold mb-4">
          {language === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}
        </h1>
        <Link to="/services" className="text-bbOlive underline">
          {language === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
        </Link>
      </div>
    );
  }

  const title = language === "ar" ? service.ar_title : service.en_title;
  const description =
    language === "ar" ? service.ar_description : service.en_description;

  const canonicalUrl = `https://beyondbasickw.com/services/${service.slug}`;
  const pageTitle = `${title} — Beyond Basic KW | Interior Design Kuwait`;
  const pageDescription =
    description.length > 150 ? description.slice(0, 150) + "..." : description;
  const imageUrl = service.image_url;

  return (
    <div className="min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${title}, Beyond Basic KW, interior design Kuwait, architecture Kuwait, ${title} Kuwait, luxury design Kuwait`}
        />
        <meta name="author" content="Beyond Basic KW" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Beyond Basic KW" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            description,
            provider: {
              "@type": "Organization",
              name: "Beyond Basic KW",
              url: "https://beyondbasickw.com",
              logo: "https://beyondbasickw.com/images/logo.png",
            },
            areaServed: { "@type": "Place", name: "Kuwait" },
            image: imageUrl,
            url: canonicalUrl,
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1 container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div
          className={`max-w-5xl mx-auto ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <img
            src={imageUrl}
            alt={`${title} — Beyond Basic KW`}
            className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-md"
            loading="lazy"
          />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-bbGray mb-10">
            {description}
          </p>

          <Link
            to="/services"
            className="inline-block bg-bbOlive text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {language === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;

import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import ServicesPreview from "@/components/ServicesPreview"; // ✅ Use lightweight preview version
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FaWhatsapp } from "react-icons/fa";

const Index = () => {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        {/* Primary Meta */}
        <title>Beyond Basic KW — Luxury Interior Design in Kuwait</title>
        <meta
          name="description"
          content="Beyond Basic KW is a leading luxury interior design and architecture studio in Kuwait, specializing in bespoke residential and commercial projects."
        />
        <meta
          name="keywords"
          content="Beyond Basic KW, interior design Kuwait, architecture Kuwait, luxury design Kuwait, residential design, commercial interiors, Beyond Basic"
        />
        <meta name="author" content="Beyond Basic KW" />
        <link rel="canonical" href="https://beyondbasickw.com/" />

        {/* Open Graph (Facebook, Instagram, etc.) */}
        <meta
          property="og:title"
          content="Beyond Basic KW — Luxury Interior Design in Kuwait"
        />
        <meta
          property="og:description"
          content="Luxury interior design, architecture, and execution services in Kuwait. Explore Beyond Basic KW’s portfolio of sophisticated residential and commercial spaces."
        />
        <meta
          property="og:image"
          content="https://beyondbasickw.com/images/og-image.jpg"
        />
        <meta property="og:url" content="https://beyondbasickw.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Beyond Basic KW" />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Beyond Basic KW — Luxury Interior Design in Kuwait"
        />
        <meta
          name="twitter:description"
          content="Discover luxury interior design and architecture by Beyond Basic KW — where elegance meets innovation in Kuwait."
        />
        <meta
          name="twitter:image"
          content="https://beyondbasickw.com/images/og-image.jpg"
        />

        {/* ✅ Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="T2Z6aqauGoXUBFyAGLw8jUXEOC571BnK-fVHKTMEyM0"
        />

        {/* Schema Markup for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Beyond Basic KW",
            url: "https://beyondbasickw.com",
            logo: "https://beyondbasickw.com/images/logo.png",
            description:
              "Beyond Basic KW is Kuwait’s top luxury interior design and architecture studio, offering bespoke design and execution services.",
            sameAs: [
              "https://www.instagram.com/beyondbasickw/",
              "https://www.facebook.com/beyondbasickw/",
            ],
          })}
        </script>
      </Helmet>

      {/* ✅ Page Content */}
      <div className="min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter relative">
        <Navbar />

        <main className="flex-1 pt-20 md:pt-24">
          {/* ✅ Hero Section */}
          <Hero />

          {/* ✅ Auto Scroll Gallery */}
          <AutoScrollGallery />

          {/* ✅ Services Section (Preview Only) */}
          <ServicesPreview limit={6} />

          {/* ✅ About Section */}
          <section className="container mx-auto px-4 md:px-8 py-12 md:py-20">
            <About />
          </section>

          {/* ✅ Contact Section */}
          <section className="bg-bbOlive text-white py-12 md:py-20 px-4 md:px-8">
            <Contact />
          </section>

          {/* ✅ Footer — now only once, at the very end */}
          <Footer />
        </main>

        {/* ✅ Floating WhatsApp Button */}
        <a
          href="https://wa.me/96555850881"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
        >
          <FaWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
        </a>
      </div>
    </>
  );
};

export default Index;

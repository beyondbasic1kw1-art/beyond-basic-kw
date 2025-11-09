import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabaseClient";
import { Helmet } from "react-helmet-async";

const Portfolio = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  // ✅ Fetch images from Supabase
  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("project-images")
        .list("", {
          limit: 1000,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) {
        console.error("Error loading images:", error.message);
        setImages([]);
        return;
      }

      const urls =
        data
          ?.map(
            (file) =>
              supabase.storage.from("project-images").getPublicUrl(file.name)
                .data.publicUrl
          )
          .filter(Boolean) || [];

      // ✅ Prevent browser caching
      const cacheBustedUrls = urls.map((url) => `${url}?t=${Date.now()}`);
      setImages(cacheBustedUrls);
    } catch (err) {
      console.error("Unexpected error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Real-time update when portfolio table changes
  useEffect(() => {
    fetchImages();
    const channel = supabase
      .channel("portfolio-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio" },
        () => {
          console.log("🔁 Portfolio updated — refreshing images...");
          fetchImages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Portfolio — Beyond Basic KW | Luxury Interior Design Kuwait</title>
        <meta
          name="description"
          content="Explore Beyond Basic KW’s portfolio of luxury interior design and architecture projects across Kuwait — where creativity meets sophistication."
        />
        <meta
          name="keywords"
          content="Beyond Basic KW portfolio, interior design Kuwait, architecture Kuwait, luxury design Kuwait, commercial interiors, residential interiors"
        />
        <meta name="author" content="Beyond Basic KW" />

        {/* ✅ Open Graph */}
        <meta property="og:title" content="Beyond Basic KW | Portfolio" />
        <meta
          property="og:description"
          content="Discover luxury interior and architectural design projects by Beyond Basic KW, Kuwait’s leading design studio."
        />
        <meta
          property="og:image"
          content="https://beyondbasickw.com/images/og-image.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beyondbasickw.com/portfolio" />

        {/* ✅ Schema JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Beyond Basic KW Portfolio",
            description:
              "Luxury interior and architectural design portfolio from Beyond Basic KW in Kuwait.",
            url: "https://beyondbasickw.com/portfolio",
            creator: {
              "@type": "Organization",
              name: "Beyond Basic KW",
              url: "https://beyondbasickw.com",
            },
            image: images.map((src) => src),
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-mollies text-5xl md:text-6xl font-bold text-center mb-8">
            {t("portfolio")}
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-16">
            {t("Explore our collection of luxury interior design projects") ||
              "Explore our collection of luxury interior design projects"}
          </p>

          {/* ✅ Loading / Empty States */}
          {loading ? (
            <p className="text-center text-bbGray">Loading portfolio...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-bbGray">No images uploaded yet.</p>
          ) : (
            <>
              {/* ✅ Responsive Grid Layout */}
              <div
                className="
                  grid 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-3 
                  xl:grid-cols-4 
                  gap-6 
                  place-items-center
                "
              >
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="
                      group 
                      w-full 
                      overflow-hidden 
                      rounded-2xl 
                      shadow-md 
                      bg-white 
                      transition-all 
                      duration-300 
                      hover:shadow-2xl 
                      cursor-pointer 
                      max-w-[420px]
                    "
                    onClick={() => setIndex(i)}
                  >
                    <img
                      src={src}
                      alt={`Beyond Basic KW project ${i + 1} — luxury interior design Kuwait`}
                      className="
                        w-full 
                        h-[350px] 
                        object-cover 
                        transform 
                        opacity-0 
                        group-hover:scale-[1.05] 
                        transition-all 
                        duration-500 
                        ease-out
                      "
                      loading="lazy"
                      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                      onError={(e) => {
                        console.warn("🧹 Broken image removed:", src);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* ✅ Lightbox Viewer */}
              <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={images.map((src) => ({ src }))}
                plugins={[Thumbnails, Zoom]}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;

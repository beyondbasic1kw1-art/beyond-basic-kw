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

const Portfolio = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  // ✅ Fetch images from Supabase Storage
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
        setLoading(false);
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

      // ✅ Add cache-busting parameter
      const cacheBustedUrls = urls.map((url) => `${url}?t=${Date.now()}`);
      setImages(cacheBustedUrls);
    } catch (err) {
      console.error("Unexpected error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Realtime updates: refresh when portfolio table changes
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
      <Navbar />

      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-mollies text-5xl md:text-6xl font-bold text-center mb-8">
            {t("portfolio")}
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-16">
            {t("portfolioSubtitle") ||
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
                      alt={`Project ${i + 1}`}
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

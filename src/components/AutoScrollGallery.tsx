import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { supabase } from "@/lib/supabaseClient";

const AutoScrollGallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all gallery images from Supabase
  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("autoscroll-gallery")
        .list("", { limit: 100, sortBy: { column: "name", order: "asc" } });

      if (error) throw error;

      const urls =
        data?.map(
          (file) =>
            supabase.storage
              .from("autoscroll-gallery")
              .getPublicUrl(file.name).data.publicUrl
        ) || [];

      setImages(urls);
    } catch (err) {
      console.error("Error loading gallery images:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ On mount: fetch images and listen for real-time updates
  useEffect(() => {
    fetchImages();

    // Supabase Realtime — listen for storage changes
    const channel = supabase
      .channel("autoscroll-gallery-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "autoscroll_gallery" },
        (payload) => {
          console.log("📡 Realtime update detected:", payload);
          fetchImages(); // Refresh gallery
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <section className="py-16 bg-bbSoftGold/30 text-center">
        <p className="text-bbGray">Loading gallery...</p>
      </section>
    );
  }

  // ✅ Empty state
  if (!images.length) {
    return (
      <section className="py-16 bg-bbSoftGold/30 text-center">
        <h2 className="font-mollies text-3xl md:text-4xl tracking-wide text-bbDark mb-3">
          Our Latest Projects
        </h2>
        <p className="text-bbGray text-sm md:text-base">
          No images found in the gallery yet.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-bbSoftGold/30 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="font-mollies text-3xl md:text-4xl tracking-wide text-bbDark mb-3">
          Our Latest Projects
        </h2>
        <p className="text-bbGray text-sm md:text-base">
          A glimpse into our most recent luxury interiors
        </p>
      </div>

      {/* ✅ If only one image → show static */}
      {images.length === 1 ? (
        <div className="flex justify-center">
          <img
            src={images[0]}
            alt="Gallery Image"
            className="h-80 w-auto rounded-2xl shadow-md object-cover"
            draggable={false}
          />
        </div>
      ) : (
        <Marquee gradient={false} speed={40} pauseOnHover loop={0}>
          {images.concat(images.length > 1 ? images : []).map((img, i) => (
            <div key={i} className="mx-4 flex items-center">
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="h-80 w-auto rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 ease-out object-cover"
                draggable={false}
              />
            </div>
          ))}
        </Marquee>
      )}
    </section>
  );
};

export default AutoScrollGallery;

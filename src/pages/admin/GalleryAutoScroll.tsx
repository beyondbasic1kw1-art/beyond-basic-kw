import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const GalleryAutoScroll = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Fetch all images from Supabase Storage
  const fetchImages = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.storage
        .from("autoscroll-gallery") // 👈 your homepage gallery bucket
        .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } });

      if (error) throw error;

      const urls =
        data?.map(
          (file) =>
            supabase.storage
              .from("autoscroll-gallery")
              .getPublicUrl(file.name).data.publicUrl
        ) || [];

      setImages(urls);
    } catch (err: any) {
      console.error("Error loading gallery images:", err.message);
      setMessage("❌ Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete an image by its file name
  const handleDelete = async (publicUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      // Extract filename from public URL
      const path = publicUrl.split("/").pop();
      if (!path) return;

      const { error } = await supabase.storage
        .from("autoscroll-gallery")
        .remove([path]);

      if (error) throw error;

      setImages((prev) => prev.filter((img) => img !== publicUrl));
      setMessage("✅ Image deleted successfully.");
    } catch (err: any) {
      console.error("Delete failed:", err.message);
      setMessage("❌ Failed to delete image.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Manage Homepage Gallery
      </h1>

      {loading ? (
        <p className="text-center text-bbGray">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center text-bbGray">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={() => handleDelete(src)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm opacity-80 hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {message && <p className="mt-6 text-center text-bbGray">{message}</p>}
    </div>
  );
};

export default GalleryAutoScroll;

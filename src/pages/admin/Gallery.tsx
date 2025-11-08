import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface PortfolioItem {
  id: string;
  image_url: string;
}

const AdminGallery = () => {
  const [images, setImages] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ Fetch all images from Supabase table
  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio")
      .select("id, image_url")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading gallery:", error.message);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  // ✅ Delete image from Supabase (S3 + table)
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setDeletingId(id); // mark image as deleting

    try {
      // 🧠 Extract file path after "project-images/"
      const parts = imageUrl.split("/project-images/");
      if (parts.length < 2) throw new Error("Invalid image URL");

      const filePath = decodeURIComponent(parts[1]);
      console.log("🗑 Deleting file from bucket:", filePath);

      // 1️⃣ Delete file from Supabase Storage (S3)
      const { error: storageError } = await supabase.storage
        .from("project-images")
        .remove([filePath]);

      if (storageError) throw storageError;

      // 2️⃣ Delete record from DB
      const { error: dbError } = await supabase
        .from("portfolio")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // ✅ Update UI immediately
      setImages((prev) => prev.filter((img) => img.id !== id));

      alert("✅ Deleted successfully!");
    } catch (err: any) {
      console.error("Delete failed:", err.message);
      alert("❌ Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-bbSoftGold text-bbDark p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        ADMIN PORTFOLIO GALLERY
      </h1>

      {loading ? (
        <p className="text-center">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={img.image_url}
                alt="Portfolio"
                className={`object-cover w-full h-64 transition-opacity duration-300 ${
                  deletingId === img.id ? "opacity-40 blur-sm" : "opacity-100"
                }`}
              />

              <button
                onClick={() => handleDelete(img.id, img.image_url)}
                disabled={deletingId === img.id}
                className={`absolute top-2 right-2 px-3 py-1 text-sm rounded text-white transition ${
                  deletingId === img.id
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100"
                }`}
              >
                {deletingId === img.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;

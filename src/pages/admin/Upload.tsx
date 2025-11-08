import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

const AdminUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file first");
    setUploading(true);
    setProgress(0);

    try {
      // ✅ Step 1: Compress image before upload
      const options = {
        maxSizeMB: 0.5, // Target size (0.5 MB)
        maxWidthOrHeight: 1920, // Resize if larger
        useWebWorker: true,
        initialQuality: 0.7,
        onProgress: (p: number) => setProgress(Math.round(p)),
      };

      console.log("Original size:", (file.size / 1024 / 1024).toFixed(2), "MB");

      const compressedFile = await imageCompression(file, options);

      console.log(
        "Compressed size:",
        (compressedFile.size / 1024 / 1024).toFixed(2),
        "MB"
      );

      // ✅ Step 2: Upload compressed file to Supabase
      const fileName = `${Date.now()}-${compressedFile.name}`;
      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(fileName, compressedFile);

      if (error) throw error;

      // ✅ Step 3: Get actual public URL from Supabase (avoid manual URL issues)
      const { data: publicData } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      const imageUrl = publicData.publicUrl;

      // ✅ Step 4: Save URL reference in Supabase table
      const { error: insertError } = await supabase
        .from("portfolio")
        .insert([{ image_url: imageUrl }]);

      if (insertError) throw insertError;

      alert("✅ Upload successful!");
      setFile(null);
    } catch (err: any) {
      console.error("Upload failed:", err.message);
      alert("❌ Upload failed: " + err.message);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bbSoftGold text-bbDark">
      <h1 className="text-3xl font-bold mb-6">Upload Portfolio Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {progress !== null && (
        <div className="w-64 bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-bbOlive h-2 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`px-6 py-3 rounded-lg text-white transition ${
          uploading
            ? "bg-bbGray cursor-not-allowed"
            : "bg-bbOlive hover:bg-bbDark"
        }`}
      >
        {uploading
          ? progress !== null
            ? `Uploading (${progress}%)...`
            : "Uploading..."
          : "Upload"}
      </button>
    </div>
  );
};

export default AdminUpload;

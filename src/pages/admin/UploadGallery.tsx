import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

const UploadGallery = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      alert("Please select one or more images first.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setMessage("");

    try {
      let uploadedCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: 0.7,
          onProgress: (p: number) => setProgress(Math.round(p)),
        };

        console.log(`Compressing ${file.name}...`);
        const compressedFile = await imageCompression(file, options);
        const fileName = `${Date.now()}-${file.name}`;

        console.log("Uploading:", fileName);
        const { error } = await supabase.storage
          .from("autoscroll-gallery") // ✅ your bucket name
          .upload(fileName, compressedFile);

        if (error) throw error;

        uploadedCount++;
        setMessage(`Uploaded ${uploadedCount} of ${files.length} images`);
      }

      setMessage("✅ Upload complete! Refresh the homepage to see updates.");
    } catch (err: any) {
      console.error("Upload failed:", err.message);
      setMessage("❌ Upload failed: " + err.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bbSoftGold text-bbDark">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upload AutoScroll Gallery Images
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-lg text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="mb-4"
        />

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-bbOlive h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-6 py-3 rounded-lg text-white transition w-full ${
            uploading
              ? "bg-bbGray cursor-not-allowed"
              : "bg-bbOlive hover:bg-bbDark"
          }`}
        >
          {uploading
            ? progress > 0
              ? `Uploading (${progress}%)...`
              : "Uploading..."
            : "Upload Images"}
        </button>

        {message && <p className="mt-4 text-sm text-bbGray">{message}</p>}
      </div>
    </div>
  );
};

export default UploadGallery;

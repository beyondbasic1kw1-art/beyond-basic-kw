import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

const AdminServiceDetailsUpload = () => {
  const [formData, setFormData] = useState({
    slug: "",
    en_title: "",
    ar_title: "",
    en_description: "",
    ar_description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  // ✅ Handle text field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle upload
  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");
    if (!formData.slug.trim()) return alert("Please enter a slug.");

    setUploading(true);
    setProgress(0);

    try {
      // ✅ Compress image before upload
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (p: number) => setProgress(Math.round(p)),
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `details/${Date.now()}-${compressedFile.name}`;

      // ✅ Upload to Supabase storage (services-images bucket)
      const { error: uploadError } = await supabase.storage
        .from("services-images")
        .upload(fileName, compressedFile, { upsert: true });

      if (uploadError) throw uploadError;

      // ✅ Get public URL
      const { data: publicData } = supabase.storage
        .from("services-images")
        .getPublicUrl(fileName);

      const image_url = publicData.publicUrl;

      // ✅ Insert into service_details table
      const { error: insertError } = await supabase
        .from("service_details")
        .insert([{ ...formData, image_url }]);

      if (insertError) throw insertError;

      alert("✅ Service detail added successfully!");
      setFormData({
        slug: "",
        en_title: "",
        ar_title: "",
        en_description: "",
        ar_description: "",
      });
      setFile(null);
    } catch (err: any) {
      console.error(err);
      alert("❌ Upload failed: " + err.message);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Add New Service Detail</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="slug"
          placeholder="Slug (e.g., ceiling-plans)"
          value={formData.slug}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        />
        <input
          name="en_title"
          placeholder="English Title"
          value={formData.en_title}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        />
        <input
          name="ar_title"
          placeholder="Arabic Title"
          value={formData.ar_title}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full text-right"
        />
      </div>

      <textarea
        name="en_description"
        placeholder="English Description"
        value={formData.en_description}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full mt-4"
        rows={4}
      />
      <textarea
        name="ar_description"
        placeholder="Arabic Description"
        value={formData.ar_description}
        onChange={handleChange}
        className="border p-2 rounded-lg w-full mt-4 text-right"
        rows={4}
      />

      <div className="mt-4">
        <label className="font-semibold text-sm text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block mt-2"
        />
        {file && (
          <p className="text-sm text-gray-500 mt-1">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {progress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-bbOlive h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`mt-6 px-6 py-3 rounded-lg text-white ${
          uploading
            ? "bg-bbGray cursor-not-allowed"
            : "bg-bbOlive hover:bg-bbDark"
        }`}
      >
        {uploading ? "Uploading..." : "Add Service Detail"}
      </button>
    </div>
  );
};

export default AdminServiceDetailsUpload;

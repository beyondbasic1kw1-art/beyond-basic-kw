import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AdminServicesUpload = () => {
  const [form, setForm] = useState({
    en_title: "",
    ar_title: "",
    en_description: "",
    ar_description: "",
    slug: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.en_title || !form.ar_title || !file) {
      alert("⚠️ Please fill in all required fields and upload an image");
      return;
    }

    setLoading(true);

    try {
      // ✅ Upload image to Supabase Storage
      const fileName = `services/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase
        .storage
        .from("project-images")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // ✅ Insert into Supabase table
      const { error: insertError } = await supabase.from("services").insert([
        {
          slug:
            form.slug ||
            form.en_title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
          en_title: form.en_title,
          ar_title: form.ar_title,
          en_description: form.en_description,
          ar_description: form.ar_description,
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("✅ Service added successfully!");
      setForm({ en_title: "", ar_title: "", en_description: "", ar_description: "", slug: "" });
      setFile(null);
    } catch (err: any) {
      console.error("Upload error:", err.message);
      alert("❌ Failed to add service: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="en_title"
          value={form.en_title}
          onChange={handleChange}
          placeholder="English Title"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <input
          name="ar_title"
          value={form.ar_title}
          onChange={handleChange}
          placeholder="Arabic Title"
          dir="rtl"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <textarea
          name="en_description"
          value={form.en_description}
          onChange={handleChange}
          placeholder="English Description"
          className="w-full border rounded-lg px-4 py-2"
          rows={3}
        />
        <textarea
          name="ar_description"
          value={form.ar_description}
          onChange={handleChange}
          placeholder="Arabic Description"
          dir="rtl"
          className="w-full border rounded-lg px-4 py-2"
          rows={3}
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug (optional, auto-generated if left empty)"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white transition ${
            loading ? "bg-bbGray cursor-not-allowed" : "bg-bbOlive hover:bg-bbDark"
          }`}
        >
          {loading ? "Uploading..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AdminServicesUpload;

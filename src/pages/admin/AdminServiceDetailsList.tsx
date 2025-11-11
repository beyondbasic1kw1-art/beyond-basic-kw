import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ServiceDetail {
  id: number;
  slug: string;
  en_title: string;
  ar_title: string;
  en_description: string;
  ar_description: string;
  image_url: string;
}

const AdminServiceDetailsList = () => {
  const [details, setDetails] = useState<ServiceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // ✅ Fetch all service details
  const fetchServiceDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_details")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error loading service details:", error.message);
    } else {
      setDetails(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  // ✅ Handle image upload (using services-images bucket)
  const handleImageUpload = async (file: File) => {
    const fileName = `details/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("services-images")
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error("Error uploading image:", error.message);
      alert("❌ Failed to upload image");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("services-images")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  // ✅ Save changes to Supabase
  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    let imageUrl = editing.image_url;

    if (file) {
      const uploadedUrl = await handleImageUpload(file);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const { error } = await supabase
      .from("service_details")
      .update({
        en_title: editing.en_title,
        ar_title: editing.ar_title,
        en_description: editing.en_description,
        ar_description: editing.ar_description,
        image_url: imageUrl,
        updated_at: new Date(),
      })
      .eq("id", editing.id);

    if (error) {
      console.error("Error saving service detail:", error.message);
      alert("❌ Failed to save changes");
    } else {
      alert("✅ Service detail updated successfully!");
      setEditing(null);
      setFile(null);
      fetchServiceDetails();
    }

    setSaving(false);
  };

  if (loading)
    return (
      <div className="text-center text-bbGray py-20">
        Loading service details...
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage Service Details</h2>

      {/* Service Details list */}
      {details.map((detail) => (
        <div
          key={detail.id}
          className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm hover:shadow-md transition"
        >
          <img
            src={detail.image_url}
            alt={detail.en_title}
            className="w-32 h-32 object-cover rounded-lg"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {detail.en_title} / {detail.ar_title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {detail.en_description || "No description provided"}
            </p>
          </div>

          <button
            onClick={() => setEditing(detail)}
            className="bg-bbOlive text-white px-4 py-2 rounded-lg hover:bg-bbDark transition"
          >
            Edit
          </button>
        </div>
      ))}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6">
              Edit Detail: {editing.en_title}
            </h3>

            <div className="space-y-4">
              <label className="block">
                <span className="font-semibold text-sm text-gray-600">
                  English Title
                </span>
                <input
                  value={editing.en_title}
                  onChange={(e) =>
                    setEditing({ ...editing, en_title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
              </label>

              <label className="block">
                <span className="font-semibold text-sm text-gray-600">
                  Arabic Title
                </span>
                <input
                  value={editing.ar_title}
                  onChange={(e) =>
                    setEditing({ ...editing, ar_title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md text-right"
                />
              </label>

              <label className="block">
                <span className="font-semibold text-sm text-gray-600">
                  English Description
                </span>
                <textarea
                  value={editing.en_description}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      en_description: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                  rows={3}
                />
              </label>

              <label className="block">
                <span className="font-semibold text-sm text-gray-600">
                  Arabic Description
                </span>
                <textarea
                  value={editing.ar_description}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      ar_description: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md text-right"
                  rows={3}
                />
              </label>

              <div>
                <span className="font-semibold text-sm text-gray-600">
                  Image
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={file ? URL.createObjectURL(file) : editing.image_url}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-4">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-4 py-2 rounded-md text-white ${
                    saving
                      ? "bg-bbGray cursor-not-allowed"
                      : "bg-bbOlive hover:bg-bbDark"
                  }`}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServiceDetailsList;

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ContactContent {
  id?: number;
  en_title: string;
  ar_title: string;
  en_description: string;
  ar_description: string;
  phone: string;
  email: string;
  address_en: string;
  address_ar: string;
  map_embed?: string | null;
}

const AdminContact = () => {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch contact content
  const fetchContent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_content")
      .select("*")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("❌ Error loading contact content:", error.message);
      alert("❌ Failed to load contact content");
    } else {
      setContent(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // ✅ Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!content) return;
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  // ✅ Save updates (update if exists, otherwise insert)
  const handleSave = async () => {
    if (!content) return;
    setSaving(true);

    // Fetch existing record (if any)
    const { data: existing, error: fetchError } = await supabase
      .from("contact_content")
      .select("id")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Fetch before update failed:", fetchError.message);
      alert("❌ Failed to fetch existing contact record");
      setSaving(false);
      return;
    }

    const recordId = existing?.id;

    let updateError;

    if (recordId) {
      // ✅ Update existing record
      const { error } = await supabase
        .from("contact_content")
        .update({
          en_title: content.en_title,
          ar_title: content.ar_title,
          en_description: content.en_description,
          ar_description: content.ar_description,
          phone: content.phone,
          email: content.email,
          address_en: content.address_en,
          address_ar: content.address_ar,
          map_embed: content.map_embed,
          updated_at: new Date(),
        })
        .eq("id", recordId);

      updateError = error;
    } else {
      // ✅ If no record exists, insert a new one
      const { error } = await supabase.from("contact_content").insert([
        {
          en_title: content.en_title,
          ar_title: content.ar_title,
          en_description: content.en_description,
          ar_description: content.ar_description,
          phone: content.phone,
          email: content.email,
          address_en: content.address_en,
          address_ar: content.address_ar,
          map_embed: content.map_embed,
          updated_at: new Date(),
        },
      ]);

      updateError = error;
    }

    if (updateError) {
      console.error("❌ Save failed:", updateError.message);
      alert("❌ Failed to save contact info");
    } else {
      alert("✅ Contact info saved successfully!");
      await fetchContent(); // refresh after save
    }

    setSaving(false);
  };

  if (loading)
    return (
      <div className="text-center text-bbGray py-20">
        Loading contact info...
      </div>
    );

  if (!content)
    return (
      <div className="text-center text-bbGray py-20">
        No contact record found in database.
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage Contact Page</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* English Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            English Title
          </label>
          <input
            name="en_title"
            value={content.en_title || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Arabic Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Arabic Title
          </label>
          <input
            name="ar_title"
            value={content.ar_title || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-right"
          />
        </div>

        {/* English Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            English Description
          </label>
          <textarea
            name="en_description"
            value={content.en_description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Arabic Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Arabic Description
          </label>
          <textarea
            name="ar_description"
            value={content.ar_description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded-md text-right"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone
          </label>
          <input
            name="phone"
            value={content.phone || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={content.email || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* English Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            English Address
          </label>
          <input
            name="address_en"
            value={content.address_en || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Arabic Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Arabic Address
          </label>
          <input
            name="address_ar"
            value={content.address_ar || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-right"
          />
        </div>

        {/* Map Embed (optional) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Google Map Embed (optional)
          </label>
          <textarea
            name="map_embed"
            value={content.map_embed || ""}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded-md font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Paste your iframe code from Google Maps here.
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={fetchContent}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Refresh
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-md text-white ${
            saving
              ? "bg-bbGray cursor-not-allowed"
              : "bg-bbOlive hover:bg-bbDark"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AdminContact;

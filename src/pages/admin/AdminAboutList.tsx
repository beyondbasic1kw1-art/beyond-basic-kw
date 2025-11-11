import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface AboutSection {
  id: number;
  section_key: string;
  en_heading: string;
  en_text: string;
  ar_heading: string;
  ar_text: string;
}

const AdminAboutList = () => {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [editing, setEditing] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error("❌ Error fetching about sections:", error.message);
    else setSections(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const { error } = await supabase
      .from("about_content")
      .update({
        en_heading: editing.en_heading,
        en_text: editing.en_text,
        ar_heading: editing.ar_heading,
        ar_text: editing.ar_text,
        updated_at: new Date(),
      })
      .eq("id", editing.id);

    if (error) {
      alert("❌ Failed to save: " + error.message);
    } else {
      alert("✅ Updated successfully!");
      setEditing(null);
      fetchSections();
    }
    setSaving(false);
  };

  if (loading)
    return <p className="text-center text-bbGray py-10">Loading about content...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage About Page Content</h2>

      {sections.map((s) => (
        <div
          key={s.id}
          className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg mb-2">
            {s.en_heading} / {s.ar_heading}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {s.en_text.slice(0, 120)}...
          </p>
          <button
            onClick={() => setEditing(s)}
            className="mt-3 bg-bbOlive text-white px-4 py-2 rounded-lg hover:bg-bbDark transition"
          >
            Edit
          </button>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl relative">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6">Edit: {editing.section_key}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-sm text-gray-600">English Heading</label>
                <input
                  value={editing.en_heading}
                  onChange={(e) => setEditing({ ...editing, en_heading: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="font-semibold text-sm text-gray-600">Arabic Heading</label>
                <input
                  value={editing.ar_heading}
                  onChange={(e) => setEditing({ ...editing, ar_heading: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md text-right"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-sm text-gray-600">English Text</label>
                <textarea
                  value={editing.en_text}
                  onChange={(e) => setEditing({ ...editing, en_text: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md"
                  rows={3}
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-sm text-gray-600">Arabic Text</label>
                <textarea
                  value={editing.ar_text}
                  onChange={(e) => setEditing({ ...editing, ar_text: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md text-right"
                  rows={3}
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
      )}
    </div>
  );
};

export default AdminAboutList;

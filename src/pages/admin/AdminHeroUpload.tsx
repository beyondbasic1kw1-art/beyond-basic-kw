import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const AdminHeroUpload = () => {
  const [hero, setHero] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [oldImagePath, setOldImagePath] = useState<string | null>(null);

  // ✅ Fetch existing hero content from Supabase
  const fetchHero = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      alert("❌ Failed to load hero data");
      console.error(error);
    } else {
      setHero(data);
      if (data?.hero_image) {
        setImagePreview(data.hero_image);
        const pathMatch = data.hero_image.match(/hero-images\/(.+)$/);
        if (pathMatch) setOldImagePath(pathMatch[1]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHero();
  }, []);

  // 🧾 Handle text inputs
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHero((prev: any) => ({ ...prev, [name]: value }));
  };

  // 🖼️ Upload Hero Image
  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const bucketName = "hero-images";
      const fileName = `hero-${Date.now()}-${file.name}`;

      // ✅ Upload image to bucket
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // ✅ Delete old image if exists
      if (oldImagePath) {
        await supabase.storage.from(bucketName).remove([oldImagePath]);
      }

      // ✅ Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        alert("❌ Could not retrieve public URL. Check bucket permissions.");
        return;
      }

      // ✅ Update hero state
      setHero((prev: any) => ({ ...prev, hero_image: urlData.publicUrl }));
      setImagePreview(urlData.publicUrl);
      setOldImagePath(fileName);

      alert("✅ Image uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("❌ Image upload failed. Please check console for details.");
    } finally {
      setUploading(false);
    }
  };

  // 💾 Save hero content to database
  const handleSave = async () => {
    if (!hero) return;
    setSaving(true);

    const { data: existing } = await supabase
      .from("hero_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    const payload = {
      en_title: hero.en_title,
      ar_title: hero.ar_title,
      en_tagline: hero.en_tagline,
      ar_tagline: hero.ar_tagline,
      en_subtitle: hero.en_subtitle,
      ar_subtitle: hero.ar_subtitle,
      hero_image: hero.hero_image,
      updated_at: new Date(),
    };

    const { error } = existing
      ? await supabase.from("hero_content").update(payload).eq("id", existing.id)
      : await supabase.from("hero_content").insert(payload);

    if (error) {
      alert("❌ Failed to save hero content");
      console.error(error);
    } else {
      alert("✅ Hero content updated successfully!");
    }

    setSaving(false);
  };

  if (loading)
    return (
      <p className="text-center py-6 text-lg text-bbDark/80">
        Loading hero data...
      </p>
    );

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-4 text-bbOlive">
        Manage Hero Section
      </h2>

      {/* 📝 Editable Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* English Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">English Title</label>
          <input
            name="en_title"
            value={hero?.en_title || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Arabic Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Arabic Title</label>
          <input
            name="ar_title"
            value={hero?.ar_title || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-right"
          />
        </div>

        {/* English Tagline */}
        <div>
          <label className="block text-sm font-semibold mb-1">English Tagline</label>
          <input
            name="en_tagline"
            value={hero?.en_tagline || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Arabic Tagline */}
        <div>
          <label className="block text-sm font-semibold mb-1">Arabic Tagline</label>
          <input
            name="ar_tagline"
            value={hero?.ar_tagline || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-right"
          />
        </div>

        {/* English Subtitle */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">English Subtitle</label>
          <textarea
            name="en_subtitle"
            value={hero?.en_subtitle || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Arabic Subtitle */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Arabic Subtitle</label>
          <textarea
            name="ar_subtitle"
            value={hero?.ar_subtitle || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-right"
          />
        </div>

        {/* 🖼️ Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Hero Image</label>
          {imagePreview && (
            <div className="mb-3">
              <img
                src={imagePreview}
                alt="Hero Preview"
                className="w-full max-h-64 object-cover rounded-lg shadow"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full border px-3 py-2 rounded-md"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={fetchHero}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Refresh
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-md text-white ${
            saving ? "bg-gray-400" : "bg-bbOlive hover:bg-bbDark"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* 🧠 Live Preview */}
      <div className="mt-16 space-y-12">
        <h3 className="text-xl font-bold mb-4 text-bbOlive">Live Preview</h3>
        <AnimatePresence>
          {/* English Preview */}
          <motion.div
            key="en"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-bbDark rounded-2xl overflow-hidden text-center text-white min-h-[60vh] flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${hero?.hero_image || ""})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 p-8 max-w-3xl mx-auto">
              <motion.h1
                layout
                className="font-mollies text-5xl md:text-7xl mb-4 leading-tight"
              >
                {hero?.en_title || "Beyond Basic"}
              </motion.h1>
              <motion.p layout className="text-lg md:text-xl mb-3 text-white/90">
                {hero?.en_tagline || "Luxury Interior Design & Architecture"}
              </motion.p>
              <motion.p
                layout
                className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed"
              >
                {hero?.en_subtitle ||
                  "Transforming your vision into timeless spaces with creativity and precision."}
              </motion.p>
              <Button className="bg-bbOlive text-white hover:bg-bbGray rounded-full px-8 py-4">
                View Projects
              </Button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </div>
            </div>
          </motion.div>

          {/* Arabic Preview */}
          <motion.div
            key="ar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-bbDark rounded-2xl overflow-hidden text-right text-white min-h-[60vh] flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${hero?.hero_image || ""})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 p-8 max-w-3xl mx-auto">
              <motion.h1
                layout
                className="font-iwan text-5xl md:text-7xl mb-4 leading-tight"
              >
                {hero?.ar_title || "بيوند بيسك"}
              </motion.h1>
              <motion.p layout className="text-lg md:text-xl mb-3 text-white/90">
                {hero?.ar_tagline || "تصميم داخلي فاخر وهندسة معمارية"}
              </motion.p>
              <motion.p
                layout
                className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed"
              >
                {hero?.ar_subtitle ||
                  "نحوّل رؤيتك إلى مساحات خالدة بالأناقة والدقة والإبداع."}
              </motion.p>
              <Button className="bg-bbOlive text-white hover:bg-bbGray rounded-full px-8 py-4">
                عرض المشاريع
              </Button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminHeroUpload;

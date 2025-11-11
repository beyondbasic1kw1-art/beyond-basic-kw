import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedHeroContent() {
  const heroData = {
    en_title: "Beyond Basic",
    ar_title: "بيوند بيسك",
    en_tagline: "Luxury Interior Design, Architecture & Execution",
    ar_tagline: "تصميم داخلي فاخر، هندسة وتنفيذ",
    en_subtitle:
      "Transforming your vision into timeless spaces with elegance, precision, and creativity.",
    ar_subtitle:
      "نحوّل رؤيتك إلى مساحات خالدة بالأناقة والدقة والإبداع.",
    hero_image:
      "https://kfzznlmnodymhyiczauu.supabase.co/storage/v1/object/public/services-images/hero-bg.jpg", // your hero image in services-images bucket
  };

  const { error } = await supabase.from("hero_content").insert(heroData);

  if (error) console.error("❌ Error seeding hero content:", error.message);
  else console.log("✅ Hero content seeded successfully!");
}

seedHeroContent();

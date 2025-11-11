import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ContactData {
  id: number;
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

const Contact = () => {
  const { language, t } = useLanguage();
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch contact data from Supabase
  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_content")
        .select("*")
        .order("id", { ascending: false }) // ✅ Always get the latest record
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("❌ Error loading contact content:", error.message);
      } else if (data) {
        setData(data);
      }
      setLoading(false);
    };

    fetchContact();
  }, []);

  // 🕓 Loading state
  if (loading) {
    return (
      <section className="bg-bbDark text-bbSoftGold py-24 text-center">
        <p>Loading contact info...</p>
      </section>
    );
  }

  // ⚠️ No data fallback
  if (!data) {
    return (
      <section className="bg-bbDark text-bbSoftGold py-24 text-center">
        <p>No contact information available.</p>
      </section>
    );
  }

  // 🌐 Language-based content
  const title = language === "ar" ? data.ar_title : data.en_title;
  const description =
    language === "ar" ? data.ar_description : data.en_description;
  const address = language === "ar" ? data.address_ar : data.address_en;

  // 📞 Contact info array
  const contactInfo = [
    {
      icon: Mail,
      label: t("email") || (language === "ar" ? "البريد الإلكتروني" : "Email"),
      value: data.email,
      href: `mailto:${data.email}`,
    },
    {
      icon: Phone,
      label: t("phone") || (language === "ar" ? "الهاتف" : "Phone"),
      value: data.phone,
      href: `tel:${data.phone}`,
    },
    {
      icon: MapPin,
      label: t("location") || (language === "ar" ? "العنوان" : "Address"),
      value: address,
      href: "#",
    },
  ];

  // 🧱 Layout
  return (
    <section
      id="contact"
      className={`bg-bbDark text-bbSoftGold py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${
        language === "ar" ? "direction-rtl text-right" : "text-center"
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        {/* 🏷️ Section Title */}
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-bbSoftGold">
          {title}
        </h2>

        {/* 📝 Description */}
        <p className="text-bbSoftGold/80 text-lg mb-12 animate-fade-in max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* 📞 Contact Info */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 ${
            language === "ar" ? "md:text-right" : ""
          }`}
        >
          {contactInfo.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="group animate-fade-in hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-bbOlive/20 group-hover:bg-bbOlive/30 transition-all duration-300">
                  <item.icon className="h-6 w-6 text-bbOlive" />
                </div>
                <div className="text-sm text-bbSoftGold/70 mb-1">
                  {item.label}
                </div>
                <div className="text-base text-bbSoftGold font-medium group-hover:text-bbOlive transition-colors duration-300">
                  {item.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 🗺️ Optional Google Map Embed */}
        {data.map_embed && (
          <div
            className="mt-16 w-full rounded-xl overflow-hidden shadow-lg animate-fade-in"
            dangerouslySetInnerHTML={{ __html: data.map_embed }}
          />
        )}
      </div>
    </section>
  );
};

export default Contact;

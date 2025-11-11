import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
  id: number;
  slug: string;
  en_title: string;
  ar_title: string;
  image_url: string;
}

const ServicesPreview = ({ limit = 6 }: { limit?: number }) => {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("id, slug, en_title, ar_title, image_url")
        .order("id", { ascending: true })
        .limit(limit);

      if (!error && data) setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, [limit]);

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-bbDark">
      <div className="container mx-auto max-w-7xl text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16">
          {language === "ar" ? "خدماتنا" : "Our Services"}
        </h2>

        {loading ? (
          <p className="text-bbGray">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-bbGray">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-700"
              >
                <img
                  src={service.image_url}
                  alt={service.en_title}
                  className="object-cover w-full h-[400px] group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-700 flex flex-col items-center justify-center text-center px-4">
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 font-playfair leading-snug">
                    {language === "ar" ? service.ar_title : service.en_title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPreview;

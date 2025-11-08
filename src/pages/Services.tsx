import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Services = () => {
  const { language } = useLanguage();

  const services = [
    { id: 1, image: "/images/1.png", ar: "تصميم الواجهة", en: "Interface Design" },
    { id: 2, image: "/images/2.png", ar: "تصميم خارجي", en: "External Design" },
    { id: 3, image: "/images/3.png", ar: "تصميم داخلي سكني وتجاري", en: "Residential and Commercial Interior Design" },
    { id: 4, image: "/images/4.png", ar: "مخططات الأسقف", en: "Ceiling Plans" },
    { id: 5, image: "/images/5.png", ar: "الواقع الافتراضي (VR)", en: "Virtual Reality (VR)" },
    { id: 6, image: "/images/6.png", ar: "مخططات الكهرباء", en: "Electricity Plans" },
    { id: 7, image: "/images/7.png", ar: "مخططات الإضاءة", en: "Lighting Diagrams" },
    { id: 8, image: "/images/8.png", ar: "مخططات توزيع الأثاث", en: "Furniture Layout Plans" },
    { id: 9, image: "/images/9.png", ar: "رفع القياسات بالمخطط المعماري", en: "Take Measurements with an Architectural Plan" },
    { id: 10, image: "/images/10.png", ar: "تصميم الأكشاك والطاولات", en: "Booth Design or Hospitality Tables" },
    { id: 11, image: "/images/11.png", ar: "فيديوهات بجودة 4K", en: "4K Quality Videos" },
    { id: 12, image: "/images/12.png", ar: "مخططات تنفيذية تفصيلية", en: "Detailed Implementation Plans" },
    { id: 13, image: "/images/13.png", ar: "مخططات الحوائط", en: "Wall Plans" },
    { id: 14, image: "/images/14.png", ar: "مخططات الأرضيات", en: "Floor Plans" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32 bg-white">
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-bbDark">
          <div className="container mx-auto max-w-7xl text-center">
            {/* Section Title */}
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 animate-fade-in">
              {language === "ar" ? "خدماتنا" : "Our Services"}
            </h2>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  to={`/services/${service.en.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-700"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={service.image}
                    alt={service.en}
                    className="object-cover w-full h-[400px] group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-700 flex flex-col items-center justify-center text-center px-4">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 font-playfair leading-snug">
                      {language === "ar" ? service.ar : service.en}
                    </h3>
                    <p className="text-bbSoftGold text-sm md:text-base">
                      {language === "ar" ? service.en : service.ar}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;

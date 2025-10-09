import { useLanguage } from "@/contexts/LanguageContext";
import { Paintbrush, Building2, Hammer } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Paintbrush,
      title: t("interiorDesign"),
      description: t("interiorDesignDesc"),
    },
    {
      icon: Building2,
      title: t("architecture"),
      description: t("architectureDesc"),
    },
    {
      icon: Hammer,
      title: t("execution"),
      description: t("executionDesc"),
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-bbDark">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Section Title */}
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 animate-fade-in">
          {t("servicesTitle")}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col items-center text-center p-8 bg-bbSoftGold/50 rounded-2xl hover:bg-bbSoftGold transition-all duration-500 shadow-sm hover:shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-bbOlive/10 group-hover:bg-bbOlive/20 transition-colors duration-300">
                <service.icon className="h-8 w-8 text-bbOlive group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-bbGray leading-relaxed max-w-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: t("email"),
      value: "info@beyondbasic.kw",
      href: "mailto:info@beyondbasic.kw",
    },
    {
      icon: Phone,
      label: t("phone"),
      value: "+965 xxxx xxxx",
      href: "tel:+965xxxxxxxx",
    },
    {
      icon: MapPin,
      label: t("location"),
      value: t("kuwaitCity"),
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="bg-bbDark text-bbSoftGold py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-5xl text-center">
        {/* Section Title */}
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 animate-fade-in">
          {t("getInTouch")}
        </h2>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
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
      </div>
    </section>
  );
};

export default Contact;

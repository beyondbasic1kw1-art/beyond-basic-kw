import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    portfolio: "Portfolio",
    about: "About",
    services: "Services",
    contact: "Contact",

    // Hero
    brandName: "BEYOND BASIC",
    tagline: "Interior Design - Architecture - Execution",
    heroSubtitle: "Transforming spaces into timeless luxury environments",
    viewProjects: "View Projects",

    // Services
    servicesTitle: "Our Services",
    interiorDesign: "Interior Design",
    interiorDesignDesc:
      "Creating sophisticated spaces that reflect your unique style and elevate everyday living.",
    architecture: "Architecture",
    architectureDesc:
      "Innovative architectural solutions that blend functionality with aesthetic excellence.",
    execution: "Project Execution",
    executionDesc:
      "Seamless implementation from concept to completion with meticulous attention to detail.",

    // About
    aboutTitle: "About BEYOND BASIC",
    aboutText:
      "We are a luxury interior design firm based in Kuwait, specializing in creating timeless, sophisticated spaces that go beyond the ordinary. Our team of expert designers combines international expertise with local cultural understanding to deliver exceptional results.",

    // Projects
    projectsTitle: "Featured Projects",
    viewProject: "View Project",

    // Contact
    getInTouch: "Get In Touch",
    email: "Email",
    phone: "Phone",
    location: "Location",
    kuwaitCity: "Kuwait , Hawalli",
    followUs: "Follow Us",

    // Footer
    footerTagline:
      "Luxury Interior Design, Architecture & Execution in Kuwait",
    rights: "All rights reserved.",
  },

  ar: {
    // Navigation
    home: "الرئيسية",
    portfolio: "المشاريع",
    about: "من نحن",
    services: "الخدمات",
    contact: "اتصل بنا",

    // Hero
    brandName: "بيوند بيسيك",
    tagline: "تصميم داخلي - معماري - تنفيذ",
    heroSubtitle: "نحول المساحات إلى بيئات فاخرة خالدة",
    viewProjects: "عرض المشاريع",

    // Services
    servicesTitle: "خدماتنا",
    interiorDesign: "التصميم الداخلي",
    interiorDesignDesc:
      "إنشاء مساحات راقية تعكس أسلوبك الفريد وترتقي بالحياة اليومية.",
    architecture: "الهندسة المعمارية",
    architectureDesc:
      "حلول معمارية مبتكرة تجمع بين الوظائف والتميز الجمالي.",
    execution: "تنفيذ المشاريع",
    executionDesc:
      "تنفيذ سلس من المفهوم إلى الاكتمال مع اهتمام دقيق بالتفاصيل.",

    // About
    aboutTitle: "عن بيوند بيسيك",
    aboutText:
      "نحن شركة تصميم داخلي فاخرة مقرها الكويت، متخصصة في إنشاء مساحات خالدة ومتطورة تتجاوز المألوف. يجمع فريقنا من المصممين الخبراء بين الخبرة الدولية والفهم الثقافي المحلي لتقديم نتائج استثنائية.",

    // Projects
    projectsTitle: "مشاريع مميزة",
    viewProject: "عرض المشروع",

    // Contact
    getInTouch: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    kuwaitCity: "مدينة الكويت، الكويت",
    followUs: "تابعنا",

    // Footer
    footerTagline: "تصميم داخلي فاخر، هندسة معمارية، وتنفيذ في الكويت",
    rights: "جميع الحقوق محفوظة.",
  },
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // ✅ Load from localStorage if available
    return (localStorage.getItem("language") as Language) || "en";
  });

  useEffect(() => {
    // ✅ Set document direction and lang attribute
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;

    // ✅ Save user preference persistently
    localStorage.setItem("language", language);

    // ✅ Dynamically adjust body font based on language
    if (language === "ar") {
      document.body.style.fontFamily = "'Iwan Zaza', serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }

    // ✅ Optional: Set document title with brand context
    document.title =
      language === "ar"
        ? "بيوند بيسيك | تصميم داخلي فاخر في الكويت"
        : "BEYOND BASIC | Luxury Interior Design Kuwait";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

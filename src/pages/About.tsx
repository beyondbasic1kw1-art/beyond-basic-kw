import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About Beyond Basic",
      sections: [
        {
          heading: "Crafting Timeless Luxury Spaces",
          text: `Beyond Basic is a luxury interior design and architecture firm specializing in delivering comprehensive solutions for both interior and exterior spaces. Registered and licensed by the Ministry of Commerce, the company operates with a commitment to regulatory compliance, innovation, and exceptional craftsmanship. Each project reflects the highest standards of design quality, precision, and creativity, blending modern aesthetics with timeless sophistication.`,
        },
        {
          heading: "Design Philosophy",
          text: `Beyond Basic approaches every space with a deep understanding of functionality, style, and human experience. The company designs a wide range of environments—residential, commercial, and retail spaces—through intelligent spatial planning, the selection of premium materials, and meticulous coordination of color, texture, and lighting. Its design philosophy balances visual appeal with functional elegance, ensuring every project serves both beauty and purpose.`,
        },
        {
          heading: "Comprehensive Services",
          text: `Beyond Basic provides complete design and implementation services—from concept creation and 3D visualization to on-site supervision and project execution. Its integrated process guarantees precision in every detail, meeting client expectations while adhering to strict timelines and budget frameworks. Whether designing private residences, corporate offices, or public institutions, Beyond Basic transforms creative visions into tangible realities that elevate the way people live and work.`,
        },
        {
          heading: "Expert Team & Vision",
          text: `The company’s success is driven by a talented team of engineers, architects, and designers who combine global innovation with local cultural insight. By integrating the latest design technologies and international trends, Beyond Basic continues to deliver spaces that inspire and endure. The firm maintains a strong focus on client satisfaction, transparency, and long-term relationships, positioning itself as one of Kuwait’s most trusted names in luxury interior design and architecture.`,
        },
      ],
    },

    ar: {
      title: "من نحن",
      sections: [
        {
          heading: "تصميم مساحات فاخرة خالدة",
          text: `بيوند بيسك هي شركة متخصصة في التصميم الداخلي والمعماري الفاخر، تقدم حلولًا شاملة للمساحات الداخلية والخارجية. الشركة مسجلة ومرخصة من وزارة التجارة، وتعمل وفق أعلى معايير الجودة والابتكار والامتثال التنظيمي. كل مشروع يعكس التزام بيوند بيسك بالدقة والإبداع والجمال الرفيع.`,
        },
        {
          heading: "فلسفة التصميم",
          text: `تعتمد بيوند بيسك في أعمالها على فهم عميق لوظائف المساحة وأسلوب الحياة وتجربة المستخدم. تقوم بتصميم مجموعة واسعة من المشاريع السكنية والتجارية من خلال تخطيط ذكي للمساحات، واختيار المواد الراقية، وتنسيق الألوان والإضاءة بشكل متقن لتحقيق توازن بين الجمال والوظيفة.`,
        },
        {
          heading: "الخدمات المتكاملة",
          text: `تقدم بيوند بيسك خدمات تصميم وتنفيذ متكاملة، بدءًا من وضع المفهوم والرؤية ثلاثية الأبعاد وحتى الإشراف الميداني الكامل على التنفيذ. وتضمن الدقة في كل التفاصيل والالتزام بالمواعيد والميزانية، مع تحويل الرؤى الإبداعية إلى واقع ملموس يضيف قيمة وجمالًا إلى كل مشروع.`,
        },
        {
          heading: "فريق الخبراء والرؤية",
          text: `تعتمد الشركة على فريق من المهندسين والمصممين ذوي الخبرة الذين يجمعون بين الابتكار العالمي والفهم الثقافي المحلي. من خلال دمج أحدث التقنيات والاتجاهات العالمية، تقدم بيوند بيسك تصاميم ملهمة تدوم طويلاً مع التركيز على رضا العملاء والشفافية في التواصل، مما يجعلها من أبرز شركات التصميم الداخلي والمعماري الفاخر في الكويت.`,
        },
      ],
    },
  };

  const data = language === "ar" ? content.ar : content.en;

  return (
    <div
      className={`min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter ${
        language === "ar" ? "direction-rtl text-right" : ""
      }`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Page Title */}
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-center mb-12 animate-fade-in">
            {data.title}
          </h1>

          {/* Content Sections */}
          <div className="space-y-16">
            {data.sections.map((section, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h2 className="font-playfair text-2xl md:text-3xl mb-4 text-bbOlive">
                  {section.heading}
                </h2>
                <p className="text-bbGray text-lg leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;

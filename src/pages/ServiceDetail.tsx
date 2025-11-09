import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

const serviceDetails = {
  "interface-design": {
    en: {
      title: "Interface Design",
      description:
        "Our Interface Design service focuses on crafting seamless, visually engaging, and functional user experiences. We bring creativity and structure together to create spaces that are both elegant and efficient.",
    },
    ar: {
      title: "تصميم الواجهة",
      description:
        "تُركّز خدمة تصميم الواجهة لدينا على إنشاء تجارب مستخدم سلسة وجذّابة بصريًا وعملية. ندمج الإبداع مع التنظيم لابتكار مساحات أنيقة وفعّالة في الوقت نفسه.",
    },
    image: "/images/1.png",
  },
  "external-design": {
    en: {
      title: "External Design",
      description:
        "Our external design services emphasize timeless architecture and visual balance, merging modern aesthetics with structural harmony and natural integration.",
    },
    ar: {
      title: "التصميم الخارجي",
      description:
        "تركّز خدمات التصميم الخارجي لدينا على إبراز جمالية العمارة الخالدة والتوازن البصري من خلال الدمج بين الطابع الحديث والتناغم البنيوي والتكامل مع البيئة المحيطة.",
    },
    image: "/images/2.png",
  },
  "residential-and-commercial-interior-design": {
    en: {
      title: "Residential and Commercial Interior Design",
      description:
        "We deliver luxurious and functional interior spaces designed to inspire and adapt to the lifestyles of our clients, balancing comfort, elegance, and innovation.",
    },
    ar: {
      title: "التصميم الداخلي السكني والتجاري",
      description:
        "نقدّم تصاميم داخلية فاخرة وعملية مستوحاة من أسلوب حياة عملائنا، تجمع بين الراحة والأناقة والابتكار لتجربة استثنائية في كل تفصيل.",
    },
    image: "/images/3.png",
  },
  "ceiling-plans": {
    en: {
      title: "Ceiling Plans",
      description:
        "Our ceiling plans are crafted to enhance lighting, acoustics, and spatial atmosphere, merging creativity with technical precision for outstanding results.",
    },
    ar: {
      title: "مخططات الأسقف",
      description:
        "نصمّم مخططات الأسقف بدقّة لتعزيز الإضاءة والصوتيات وجمال المساحات، مع مزيج من الإبداع والدقّة التقنية للحصول على نتائج متميّزة.",
    },
    image: "/images/4.png",
  },
  "virtual-reality-vr": {
    en: {
      title: "Virtual Reality (VR)",
      description:
        "Step inside your dream design before it’s built. Our VR experiences allow clients to explore interiors and exteriors in fully immersive, realistic 3D environments.",
    },
    ar: {
      title: "الواقع الافتراضي (VR)",
      description:
        "استكشف تصميم أحلامك قبل تنفيذه من خلال تجربة الواقع الافتراضي، التي تتيح لك التجوّل داخل المساحات الداخلية والخارجية بتجربة ثلاثية الأبعاد واقعية بالكامل.",
    },
    image: "/images/5.png",
  },
  "electricity-plans": {
    en: {
      title: "Electricity Plans",
      description:
        "We design intelligent electrical layouts that ensure safety, efficiency, and seamless integration within your space’s aesthetic and functional framework.",
    },
    ar: {
      title: "مخططات الكهرباء",
      description:
        "نُصمّم مخططات كهربائية ذكية تضمن الأمان والكفاءة، مع دمج مثالي بين الجمال والوظيفة داخل كل مساحة.",
    },
    image: "/images/6.png",
  },
  "lighting-diagrams": {
    en: {
      title: "Lighting Diagrams",
      description:
        "Our lighting diagrams strategically enhance mood and emphasize architectural beauty, balancing illumination, texture, and ambiance.",
    },
    ar: {
      title: "مخططات الإضاءة",
      description:
        "نُقدّم مخططات إضاءة مدروسة تُبرز جمال التصميم وتوازن بين الإضاءة والملمس والأجواء لتحقيق تجربة بصرية فريدة.",
    },
    image: "/images/7.png",
  },
  "furniture-layout-plans": {
    en: {
      title: "Furniture Layout Plans",
      description:
        "We create smart furniture layout plans that maximize comfort, flow, and function — perfectly tailored to your lifestyle or commercial needs.",
    },
    ar: {
      title: "مخططات توزيع الأثاث",
      description:
        "نُعدّ مخططات توزيع الأثاث بطريقة ذكية تضمن الراحة وسلاسة الحركة والوظيفية المثالية، لتناسب احتياجات السكن أو الأعمال.",
    },
    image: "/images/8.png",
  },
  "take-measurements-with-an-architectural-plan": {
    en: {
      title: "Take Measurements with an Architectural Plan",
      description:
        "We offer professional architectural measurement services to ensure precise, accurate implementation of your vision from blueprint to reality.",
    },
    ar: {
      title: "رفع القياسات بالمخطط المعماري",
      description:
        "نوفّر خدمات قياس معمارية احترافية تضمن الدقّة في التنفيذ وتحويل المخططات إلى واقع ملموس بأعلى جودة.",
    },
    image: "/images/9.png",
  },
  "booth-design-or-hospitality-tables": {
    en: {
      title: "Booth Design or Hospitality Tables",
      description:
        "Our booth and hospitality designs are crafted for impact and elegance, reflecting your brand identity through aesthetic precision and function.",
    },
    ar: {
      title: "تصميم الأكشاك أو طاولات الضيافة",
      description:
        "نصمّم الأكشاك وطاولات الضيافة بأسلوب راقٍ يجمع بين الأناقة والوظيفية، ويعكس هوية علامتك التجارية بطريقة مبتكرة.",
    },
    image: "/images/10.png",
  },
  "4k-quality-videos": {
    en: {
      title: "4K Quality Videos",
      description:
        "Bring your designs to life with cinematic 4K video renderings that capture every fine detail and atmosphere of your project.",
    },
    ar: {
      title: "فيديوهات بجودة 4K",
      description:
        "حوّل تصاميمك إلى تجربة واقعية نابضة بالحياة من خلال فيديوهات بجودة 4K تُبرز كل التفاصيل والأجواء بدقّة سينمائية.",
    },
    image: "/images/11.png",
  },
  "detailed-implementation-plans": {
    en: {
      title: "Detailed Implementation Plans",
      description:
        "We deliver clear, detailed implementation drawings that translate your concept into precise execution, ensuring quality and accuracy.",
    },
    ar: {
      title: "مخططات تنفيذية تفصيلية",
      description:
        "نُقدّم مخططات تنفيذية تفصيلية تُحوّل المفهوم إلى تطبيق دقيق على أرض الواقع، لضمان الجودة والدقّة في التنفيذ.",
    },
    image: "/images/12.png",
  },
  "wall-plans": {
    en: {
      title: "Wall Plans",
      description:
        "Our wall plans focus on structure, materials, and finishes — creating a perfect harmony between form and function.",
    },
    ar: {
      title: "مخططات الحوائط",
      description:
        "نركّز في مخططات الحوائط على البنية والمواد والتشطيبات لتحقيق التوازن المثالي بين الشكل والوظيفة.",
    },
    image: "/images/13.png",
  },
  "floor-plans": {
    en: {
      title: "Floor Plans",
      description:
        "We develop efficient floor plans that enhance flow, comfort, and practicality, combining spatial logic with design excellence.",
    },
    ar: {
      title: "مخططات الأرضيات",
      description:
        "نصمّم مخططات أرضيات تُعزّز الانسيابية والراحة والوظيفية، مع مزيج من الإبداع والدقّة الهندسية.",
    },
    image: "/images/14.png",
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const service = serviceDetails[slug as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bbSoftGold text-bbDark">
        <h1 className="text-3xl font-bold mb-4">
          {language === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}
        </h1>
        <Link to="/services" className="text-bbOlive underline">
          {language === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
        </Link>
      </div>
    );
  }

  const { title, description } = service[language];
  const canonicalUrl = `https://beyondbasickw.com/services/${slug}`;
  const pageTitle = `${title} — Beyond Basic KW | Interior Design Kuwait`;
  const pageDescription =
    description.length > 150 ? description.slice(0, 150) + "..." : description;
  const imageUrl = `https://beyondbasickw.com${service.image}`;

  return (
    <div className="min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${title}, Beyond Basic KW, interior design Kuwait, architecture Kuwait, ${title} Kuwait, luxury design Kuwait`}
        />
        <meta name="author" content="Beyond Basic KW" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Beyond Basic KW" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            description,
            provider: {
              "@type": "Organization",
              name: "Beyond Basic KW",
              url: "https://beyondbasickw.com",
              logo: "https://beyondbasickw.com/images/logo.png",
            },
            areaServed: { "@type": "Place", name: "Kuwait" },
            image: imageUrl,
            url: canonicalUrl,
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1 container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div
          className={`max-w-5xl mx-auto ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <img
            src={service.image}
            alt={`${title} — Beyond Basic KW`}
            className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-md"
            loading="lazy"
          />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-bbGray mb-10">
            {description}
          </p>

          <Link
            to="/services"
            className="inline-block bg-bbOlive text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {language === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;

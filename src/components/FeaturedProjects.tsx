import { useLanguage } from "@/contexts/LanguageContext";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    id: 1,
    image: project1,
    titleEn: "Modern Bedroom Retreat",
    titleAr: "غرفة نوم عصرية",
  },
  {
    id: 2,
    image: project2,
    titleEn: "Luxury Kitchen Design",
    titleAr: "تصميم مطبخ فاخر",
  },
  {
    id: 3,
    image: project3,
    titleEn: "Elegant Dining Space",
    titleAr: "مساحة طعام أنيقة",
  },
];

const FeaturedProjects = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-16 md:py-24 bg-bbSoftGold text-bbDark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 animate-fade-in">
          {t("projectsTitle")}
        </h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={language === "en" ? project.titleEn : project.titleAr}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-bbDark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="font-playfair text-xl sm:text-2xl font-semibold mb-2">
                    {language === "en" ? project.titleEn : project.titleAr}
                  </h3>
                  <p className="text-xs sm:text-sm font-light tracking-wide">
                    {t("viewProject")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

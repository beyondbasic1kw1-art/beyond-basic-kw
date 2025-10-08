import { useLanguage } from '@/contexts/LanguageContext';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const projects = [
  {
    id: 1,
    image: project1,
    titleEn: 'Modern Bedroom Retreat',
    titleAr: 'غرفة نوم عصرية',
  },
  {
    id: 2,
    image: project2,
    titleEn: 'Luxury Kitchen Design',
    titleAr: 'تصميم مطبخ فاخر',
  },
  {
    id: 3,
    image: project3,
    titleEn: 'Elegant Dining Space',
    titleAr: 'مساحة طعام أنيقة',
  },
];

const FeaturedProjects = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
          {t('projectsTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden aspect-square rounded-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={project.image}
                alt={language === 'en' ? project.titleEn : project.titleAr}
                className="w-full h-full object-cover elegant-transition group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 elegant-transition flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">
                    {language === 'en' ? project.titleEn : project.titleAr}
                  </h3>
                  <p className="text-sm font-light">{t('viewProject')}</p>
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

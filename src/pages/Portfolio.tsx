import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-center mb-8 animate-fade-in">
            {t('portfolio')}
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-16 animate-fade-in">
            Explore our collection of luxury interior design projects
          </p>
          
          <div className="text-center text-muted-foreground py-20">
            Portfolio gallery coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

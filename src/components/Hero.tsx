import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-32 animate-fade-in">
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight text-shadow-soft">
          BEYOND BASIC
        </h1>
        
        <p className="text-white/90 text-lg md:text-xl mb-4 font-light tracking-wide">
          {t('tagline')}
        </p>
        
        <p className="text-white/80 text-sm md:text-base mb-12 max-w-2xl mx-auto font-light">
          {t('heroSubtitle')}
        </p>

        <Button 
          onClick={scrollToProjects}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 elegant-transition px-8 py-6 text-base"
        >
          {t('viewProjects')}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white smooth-transition"
        aria-label="Scroll to projects"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;

import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-muted rounded-sm overflow-hidden animate-fade-in">
            <div className="w-full h-full flex items-center justify-center luxury-gradient">
              <span className="font-playfair text-6xl font-bold text-white opacity-20">
                BB
              </span>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              {t('aboutTitle')}
            </h2>
            
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {t('aboutText')}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <div className="font-playfair text-4xl font-bold text-secondary mb-2">
                  10+
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="font-playfair text-4xl font-bold text-secondary mb-2">
                  100+
                </div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

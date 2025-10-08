import { useLanguage } from '@/contexts/LanguageContext';
import { Paintbrush, Building2, Hammer } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Paintbrush,
      title: t('interiorDesign'),
      description: t('interiorDesignDesc'),
    },
    {
      icon: Building2,
      title: t('architecture'),
      description: t('architectureDesc'),
    },
    {
      icon: Hammer,
      title: t('execution'),
      description: t('executionDesc'),
    },
  ];

  return (
    <section className="py-24 px-6 bg-muted">
      <div className="container mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16">
          {t('servicesTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-secondary/10">
                <service.icon className="h-8 w-8 text-secondary" />
              </div>
              
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
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

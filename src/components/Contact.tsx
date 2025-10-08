import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'info@beyondbasic.kw',
      href: 'mailto:info@beyondbasic.kw',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+965 xxxx xxxx',
      href: 'tel:+965xxxxxxxx',
    },
    {
      icon: MapPin,
      label: t('location'),
      value: t('kuwaitCity'),
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section className="py-24 px-6 bg-charcoal text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-16 animate-fade-in">
          {t('getInTouch')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {contactInfo.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="group animate-fade-in smooth-transition hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-secondary/20 group-hover:bg-secondary/30 elegant-transition">
                <item.icon className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-sm text-white/60 mb-1">{item.label}</div>
              <div className="text-white group-hover:text-secondary elegant-transition">
                {item.value}
              </div>
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12">
          <p className="text-white/60 mb-6">{t('followUs')}</p>
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center smooth-transition hover:border-secondary hover:bg-secondary/10"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-white/40 text-sm">{t('rights')}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

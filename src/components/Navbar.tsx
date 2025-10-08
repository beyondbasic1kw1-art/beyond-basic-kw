import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-playfair text-2xl font-bold tracking-tight">
            BEYOND BASIC
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium smooth-transition hover:text-secondary">
              {t('home')}
            </Link>
            <Link to="/portfolio" className="text-sm font-medium smooth-transition hover:text-secondary">
              {t('portfolio')}
            </Link>
            <Link to="/about" className="text-sm font-medium smooth-transition hover:text-secondary">
              {t('about')}
            </Link>
            <Link to="/services" className="text-sm font-medium smooth-transition hover:text-secondary">
              {t('services')}
            </Link>
            <Link to="/contact" className="text-sm font-medium smooth-transition hover:text-secondary">
              {t('contact')}
            </Link>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            <span className="text-sm font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

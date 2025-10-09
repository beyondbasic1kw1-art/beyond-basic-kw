import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-center mb-8 animate-fade-in">
            {t("portfolio")}
          </h1>

          <p className="text-center text-muted-foreground text-lg mb-16 animate-fade-in">
            Explore our collection of luxury interior design projects
          </p>

          <div className="text-center text-muted-foreground py-20 border border-dashed border-muted rounded-md">
            Portfolio gallery coming soon...
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;

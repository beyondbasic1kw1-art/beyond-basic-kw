import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32">
        <div className="container mx-auto px-6 md:px-8">
          <Services />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;

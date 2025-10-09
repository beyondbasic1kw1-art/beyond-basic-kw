import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 pt-20 md:pt-24">
        {/* Hero Section */}
        <Hero />

        {/* Featured Projects */}
        <section className="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <FeaturedProjects />
        </section>

        {/* Services */}
        <section className="bg-white py-12 md:py-20 px-4 md:px-8">
          <Services />
        </section>

        {/* About */}
        <section className="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <About />
        </section>

        {/* Contact */}
        <section className="bg-bbOlive text-white py-12 md:py-20 px-4 md:px-8">
          <Contact />
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Index;

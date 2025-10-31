import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FaWhatsapp } from "react-icons/fa"; // ✅ WhatsApp icon

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bbSoftGold text-bbDark font-inter relative">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        <Hero />

        {/* ✅ Auto-Scrolling Gallery */}
        <AutoScrollGallery />

        {/* ✅ Services */}
        <section className="bg-white py-12 md:py-20 px-4 md:px-8">
          <Services />
        </section>

        {/* ✅ About */}
        <section className="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <About />
        </section>

        {/* ✅ Contact */}
        <section className="bg-bbOlive text-white py-12 md:py-20 px-4 md:px-8">
          <Contact />
        </section>
      </main>

      {/* ✅ Floating WhatsApp Icon */}
      <a
        href="https://wa.me/96555850881"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      >
        <FaWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
      </a>

      <Footer />
    </div>
  );
};

export default Index;

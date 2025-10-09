import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-28 md:pt-32">
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;

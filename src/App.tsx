import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ServiceDetail from "@/pages/ServiceDetail";
// import AdminUpload from "@/pages/admin/Upload";
// import AdminGallery from "@/pages/admin/Gallery";
import AdminDashboard from "@/pages/admin/Dashboard";


// Create React Query client
const queryClient = new QueryClient();

// Wrapper for RTL/LTR support
const AppLayout = () => {
  const { language } = useLanguage();

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col font-inter bg-bbSoftGold text-bbDark"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} /> 
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/admin-upload" element={<AdminUpload />} />
          <Route path="/admin-gallery" element={<AdminGallery />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// Root App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <AppLayout />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

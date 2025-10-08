import Navbar from '@/components/Navbar';
import Services from '@/components/Services';

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Services />
      </div>
    </div>
  );
};

export default ServicesPage;

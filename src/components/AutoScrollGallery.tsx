import Marquee from "react-fast-marquee";

// ✅ Import your project images
import project1 from "@/assets/portfolio/project1.jpg";
import project2 from "@/assets/portfolio/project2.jpg";
import project3 from "@/assets/portfolio/project3.jpg";
import project4 from "@/assets/portfolio/project4.jpg";
import project5 from "@/assets/portfolio/project5.jpg";

const AutoScrollGallery = () => {
  const images = [project1, project2, project3, project4, project5];

  return (
    <section className="py-16 bg-bbSoftGold/30 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="font-mollies text-3xl md:text-4xl tracking-wide text-bbDark mb-3">
          Our Latest Projects
        </h2>
        <p className="text-bbGray text-sm md:text-base">
          A glimpse into our most recent luxury interiors
        </p>
      </div>

      {/* Continuous Auto-Scrolling Gallery */}
      <Marquee
        gradient={false} // ❌ Disable gradient to prevent fade gaps
        speed={40} // Adjust smoothness
        pauseOnHover={true}
        loop={0} // Infinite loop
        className="overflow-hidden"
      >
        {/* ✅ Duplicate images for seamless looping */}
        {[...images, ...images].map((img, i) => (
          <div key={i} className="mx-4 flex items-center">
            <img
              src={img}
              alt={`Project ${i + 1}`}
              className="h-80 w-auto rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 ease-out"
              draggable={false}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default AutoScrollGallery;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ✅ Automatically import all images from portfolio folder
const images = Object.values(
  import.meta.glob("/src/assets/portfolio/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" })
);

const Portfolio = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(-1);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-mollies text-5xl md:text-6xl font-bold text-center mb-8">
            {t("portfolio")}
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-16">
            Explore our collection of luxury interior design projects
          </p>

          {/* Masonry Gallery */}
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex gap-4"
            columnClassName="bg-clip-padding"
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Project ${i + 1}`}
                className="rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
                onClick={() => setIndex(i)}
              />
            ))}
          </Masonry>

          {/* Lightbox */}
          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={images.map((src) => ({ src }))}
            plugins={[Thumbnails, Zoom]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;

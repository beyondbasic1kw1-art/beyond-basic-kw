import { useState } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const importAll = (r: any) => r.keys().map(r);
const projectImages = importAll(
  import.meta.glob("@/assets/projects/*.{jpg,png,jpeg,webp}", { eager: true })
);

const PortfolioGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="py-12">
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {projectImages.map((img: any, i: number) => (
          <img
            key={i}
            src={img.default}
            alt={`Project ${i + 1}`}
            loading="lazy"
            onClick={() => openLightbox(i)}
            className="rounded-2xl cursor-pointer hover:opacity-80 transition-all duration-300 shadow-md"
          />
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          mainSrc={projectImages[photoIndex].default}
          nextSrc={projectImages[(photoIndex + 1) % projectImages.length].default}
          prevSrc={
            projectImages[
              (photoIndex + projectImages.length - 1) % projectImages.length
            ].default
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + projectImages.length - 1) % projectImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % projectImages.length)
          }
        />
      )}
    </div>
  );
};

export default PortfolioGallery;

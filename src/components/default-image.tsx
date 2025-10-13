import { type FC, useState } from "react";
import { Loader2Icon } from "lucide-react";

interface DefaultImageProps {
  src?: string;
  className?: string;
  isZoom?: boolean;
}

const DefaultImage: FC<DefaultImageProps> = ({
  src = "/storage/images/test.png",
  className = "",
  isZoom = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(false);

  return (
    <>
      {!loaded && (
        <div className={`${className} flex items-center justify-center w-full h-full bg-gray-300 rounded`}>
          <Loader2Icon className="w-10 h-10 animate-spin" />
        </div>
      )}

      <img
        src={src}
        alt="Imagen"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onClick={() => isZoom && setZoom(true)}
        className={`${className} transition-all duration-500 ${loaded ? "blur-0" : "blur-md scale-105 grayscale"}`}
      />

      {zoom && isZoom && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <img src={src} alt="Vista ampliada" className="w-full h-full object-contain cursor-zoom-out" />
        </div>
      )}
    </>
  );
};

export default DefaultImage;

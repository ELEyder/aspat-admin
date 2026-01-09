import { Input } from "@/components/ui/input";
import type { WebsiteImage } from "../hooks/useImages";

interface SectionRowProps {
  image: WebsiteImage;
  onUpdate: (newImage: WebsiteImage) => void;
}

export function ImageRow({ image, onUpdate }: SectionRowProps) {
  const handleOnChange = (
    value: string | File | null,
    type: "title" | "description" | "button_text" | "button_url" | "image"
  ) => {
    if (!value) return;
    let newSection: WebsiteImage;
    if (value instanceof File) {
      const tempUrl = URL.createObjectURL(value);
      newSection = {
        ...image,
        image: value,
        image_url: tempUrl,
      };
    } else {
      newSection = {
        ...image,
        [type]: value,
      };
    }
    onUpdate(newSection);
  };

  return (
     <div className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden">
      <p className="w-full font-bold p-4 bg-gray-100">{image.image_key}</p>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">
          Imagen
          <span className="text-gray-400 ml-2">
            (Se recomienda una imagen 1280 × 720 formato .webp)
          </span>
        </p>
        <div className="aspect-video grid place-items-center">
          {image.image_url === null ? (
            <p className="m-auto text-center">Sin imagen</p>
          ) : (
            <img src={image.image_url} className="h-full m-auto" />
          )}
        </div>
        <Input
          type="file"
          onChange={(event) =>
            handleOnChange(
              event.target.files ? event.target.files[0] : null,
              "image"
            )
          }
        />
      </div>
    </div>
  );
}

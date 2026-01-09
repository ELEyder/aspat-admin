import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CassetteTape,
  Eye,
  Languages,
} from "lucide-react";
import Loading from "@/components/loading";
import { useImages, type WebsiteImage } from "../hooks/useImages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageRow } from "../components/ImageRow";
import { useUpdateImages } from "../hooks/useUpdateImages";

export default function ImagesPage() {
  const { data } = useImages();
  const [languageLocal, setLanguageLocal] = useState("es");
  const { mutateAsync: updateContents, isPending } = useUpdateImages();

  const [images, setImages] = useState<WebsiteImage[] | null>(null);
  const [sectionCategory, setSectionCategory] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!data) return;
    setImages(data);
  }, [data]);

  const handleUpdate = (newSection: WebsiteImage) => {
    setImages((prev) => {
      if (!prev) return prev;
      return prev.map((s) => (s.id === newSection.id ? newSection : s));
    });
  };

  const handleClick = async () => {
    await updateContents(images ?? []);
    iframeRef.current?.contentWindow?.postMessage("reload", "*");
  };

  const handleClickLanguage = () => {
    setLanguageLocal((prev) => (prev === "es" ? "en" : "es"));
  };


  if (!images) {
    return <Loading />;
  }

  const categories = Array.from(
    new Set(images.map((c) => c.section_category).filter(Boolean))
  );

  const visibleImages = images.filter((c) => {
    if (c.locale !== languageLocal) return false;
    if (c.section_category !== sectionCategory) return false;

    return true;
  });

  return (
    <div className="flex flex-col h-dvh">
      <div className="sticky top-0 p-6 flex space-x-4 z-10 w-full bg-gray-100">
        <Button
          className="flex-1"
          disabled={isPending}
          onClick={handleClick}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <CassetteTape />}{" "}
          Actualizar secciones
        </Button>
        <Button
          className="flex-1"
          variant={"outline"}
          disabled={isPending}
          onClick={handleClickLanguage}
        >
          <Languages />
          Cambiar idioma ({languageLocal.toUpperCase()})
        </Button>
      </div>
      <div className="flex space-x-4 space-y-4 flex-row flex-1 min-h-0">
        <div className="flex flex-col space-y-2 overflow-y-scroll flex-1 m-0">
          <div className="top-0 sticky bg-gray-50 p-6 m-0 w-full space-y-2 z-2">
            <p className="w-max font-bold">Buscar Categoría</p>
            <Select value={sectionCategory} onValueChange={setSectionCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4 p-6">
            {visibleImages.map((image) => (
              <>
                <ImageRow
                  key={image.id}
                  image={image}
                  onUpdate={handleUpdate}
                />
              </>
            ))}
          </div>
        </div>
        <div className="w-full flex-col space-y-4 flex-1 hidden xl:flex p-6">
          <iframe
            ref={iframeRef}
            src={
              import.meta.env.PROD
                ? "https://aspatperu.org.pe"
                : "http://localhost:5173"
            }
            className="h-full"
          />
        </div>
        <div className="w-full items-center justify-center flex-1 xl:hidden flex">
          <a
            href={
              import.meta.env.PROD
                ? "https://aspatperu.org.pe"
                : "http://localhost:5173"
            }
            target="_blank"
            className="flex underline decoration-3"
          >
            <Eye className="mr-2" /> Vista previa
          </a>
        </div>
      </div>
    </div>
  );
}

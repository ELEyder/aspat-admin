import { Input } from "@/components/ui/input";
import type { PageSection } from "../hooks/useSections";
import MDEditor from "@uiw/react-md-editor";

interface SectionRowProps {
  section: PageSection;
  onUpdate: (newSection: PageSection) => void;
}

export function SectionRow({ section, onUpdate }: SectionRowProps) {
  const handleOnChange = (
    value: string | File | null,
    type: "title" | "description" | "button_text" | "button_url" | "image"
  ) => {
    if (!value) return;
    let newSection: PageSection;
    if (value instanceof File) {
      const tempUrl = URL.createObjectURL(value);
      newSection = {
        ...section,
        image: value,
        image_url: tempUrl,
      };
    } else {
      newSection = {
        ...section,
        [type]: value,
      };
    }
    onUpdate(newSection);
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden">
      <p className="w-full font-bold p-4 bg-gray-100">{section.section_key}</p>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">
          Imagen
          <span className="text-gray-400 ml-2">
            (Se recomienda una imagen 1280 × 720 formato .webp)
          </span>
        </p>
        <div className="aspect-video grid place-items-center">
          {section.image_url === null ? (
            <p className="m-auto text-center">Sin imagen</p>
          ) : (
            <img src={section.image_url} className="h-full m-auto" />
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
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">Título</p>
        <Input
          value={section.title ?? ""}
          onChange={(e: any) => handleOnChange(e.target.value, "title")}
        />
      </div>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">Descripción</p>
        <MDEditor
          value={section.description ?? ""}
          onChange={(value) => handleOnChange(value ?? "", "description")}
        />
      </div>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">Texto del botón</p>
        <Input
          value={section.button_text ?? ""}
          onChange={(e: any) => handleOnChange(e.target.value, "button_text")}
        />
      </div>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">
          Url del botón
          <span className="text-gray-400 ml-2">
            (Dejar vacío si no se quiere mostrar un botón)
          </span>
        </p>
        <Input
          placeholder="https://aspatperu.org.pe/(colocar esta ruta)"
          value={section.button_url ?? ""}
          onChange={(e: any) => handleOnChange(e.target.value, "button_url")}
        />
      </div>
    </div>
   
  );
}

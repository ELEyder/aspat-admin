import { Input } from "@/components/ui/input";
import type { Card } from "../hooks/useCards";
import { useState } from "react";

interface CardRowProps {
  card: Card;
  onUpdate: (newCard: Card) => void;
}

export function CardRow({ card, onUpdate }: CardRowProps) {
  const [newCard, setNewCard] = useState<Card>(card);

  const handleOnChange = (
    value: string | File | null,
    type: "title" | "description" | "button_text" | "button_url" | "image",
  ) => {
    if (!value) return;
    if (value instanceof File) {
      const tempUrl = URL.createObjectURL(value);
      setNewCard((prev) => ({
        ...prev,
        image: value,
        image_url: tempUrl,
      }));
    } else {
      setNewCard((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
    onUpdate(newCard);
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden">
      <p className="w-full font-bold p-4 bg-gray-100">{newCard.section_key}</p>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">
          Imagen
          <span className="text-gray-400 ml-2">
            (Se recomienda una imagen 1:1 .webp)
          </span>
        </p>
        <div className="aspect-video grid place-items-center">
          {newCard.image_url === null ? (
            <p className="m-auto text-center">Sin imagen</p>
          ) : (
            <img src={newCard.image_url} className="h-full m-auto p-7" />
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
          value={newCard.title ?? ""}
          onChange={(e: any) => handleOnChange(e.target.value, "title")}
        />
      </div>
      <div data-color-mode="light" className="p-4 space-y-2">
        <p className="w-max font-bold">Descripción</p>
        <Input
          value={newCard.description ?? ""}
          onChange={(e: any) => handleOnChange(e.target.value, "description")}
        />
      </div>
    </div>
  );
}

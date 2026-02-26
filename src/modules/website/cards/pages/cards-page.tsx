import { useEffect, useRef, useState, type FC } from "react";
import { useCards, type Card } from "../hooks/useCards";
import { Button } from "@/components/ui/button";
import { CassetteTape, Eye, Languages, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardRow } from "../components/CardRow";
import LoadingPage from "@/pages/loading-page";
import { useUpdateCards } from "../hooks/useUpdateCards";

const CardsPage: FC = () => {
  const { data } = useCards();
  const [cards, setCards] = useState<Card[] | null>(null);
  const [languageLocal, setLanguageLocal] = useState("es");
  const [reload, setReload] = useState(0);
  const updateCards = useUpdateCards();
  const [sectionCategory, setSectionCategory] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!data) return;
    setCards(data);
  }, [data, reload]);

  if (!cards) return <LoadingPage />;

  const categories = Array.from(
    new Set(cards.map((c) => c.section_key).filter(Boolean)),
  );

  const visibleContents = cards.filter((c) => {
    if (c.locale !== languageLocal) return false;
    if (c.section_key !== sectionCategory) return false;

    return c.section_key.toLowerCase() || c.section_key.toLowerCase();
  });

  const handleUpdate = (newCard: Card) => {
    setCards((prev) => {
      if (!prev) return prev;

      return prev.map((c) => (c.id === newCard.id ? newCard : c));
    });
  };

  const handleClick = async () => {
    await updateCards.mutateAsync(cards ?? []);
    setReload((prev) => prev + 1);

    iframeRef.current?.contentWindow?.postMessage("reload", "*");
  };

  const handleClickLanguage = () => {
    setLanguageLocal((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <div className="flex flex-col h-dvh">
      <div className="sticky top-0 p-6 flex space-x-4 z-10 w-full bg-gray-100">
        <Button className="flex-1" disabled={false} onClick={handleClick}>
          {false ? <Loader2 className="animate-spin" /> : <CassetteTape />}
          Actualizar secciones
        </Button>
        <Button
          className="flex-1"
          variant={"outline"}
          disabled={false}
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
            {visibleContents.map((card) => (
              <CardRow key={card.id} card={card} onUpdate={handleUpdate} />
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
};

export default CardsPage;

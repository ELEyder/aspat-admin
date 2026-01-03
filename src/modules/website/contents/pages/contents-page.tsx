import { useState, useEffect } from "react";
import { ContentRow } from "../components/ContentRow";
import { Button } from "@/components/ui/button";
import { useUpdateContents } from "../hooks/useUpdateContents";
import {
  Loader2,
  CassetteTape,
  TimerReset,
  Eye,
  Languages,
} from "lucide-react";
import { useResetContents } from "../hooks/useResetContents";
import Loading from "@/components/loading";
import { useContents, type Content } from "../hooks/useContents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContentsPage() {
  const { data } = useContents();
  const [languageLocal, setLanguageLocal] = useState("es");
  const { mutateAsync: updateContents, isPending } = useUpdateContents();
  const { mutateAsync: resetContents, isPending: isResetting } =
    useResetContents();
  const [contents, setContents] = useState<Content[] | null>(null);
  const [reload, setReload] = useState(0);
  const [sectionCategory, setSectionCategory] = useState("");

  useEffect(() => {
    if (!data) return;
    setContents(data);
  }, [data]);

  const handleUpdate = (id: string, newValue: string) => {
    setContents((prev) => {
      if (!prev) return prev;

      return prev.map((c) =>
        c.id === id ? { ...c, content_value: newValue } : c
      );
    });
  };

  const handleClick = async () => {
    await updateContents(contents ?? []);
    setReload((prev) => prev + 1);
  };

  const handleClickLanguage = () => {
    setLanguageLocal((prev) => (prev === "es" ? "en" : "es"));
  };

  const handleClickReset = async () => {
    await resetContents();
    setReload((prev) => prev + 1);
  };

  if (!contents) {
    return <Loading />;
  }

  const categories = Array.from(
    new Set(contents.map((c) => c.section_category).filter(Boolean))
  );

  const visibleContents = contents.filter((c) => {
    if (c.locale !== languageLocal) return false;
    if (c.section_category !== sectionCategory) return false;

    return c.content_key.toLowerCase() || c.content_value.toLowerCase();
  });

  return (
    <div className="flex flex-col h-dvh">
      <div className="sticky top-0 p-6 flex space-x-4 z-10 w-full bg-gray-100">
        <Button
          className="flex-1"
          disabled={isPending || isResetting}
          onClick={handleClick}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <CassetteTape />}{" "}
          Actualizar contenido
        </Button>
        <Button
          className="flex-1"
          variant={"outline"}
          disabled={isResetting || isPending}
          onClick={handleClickLanguage}
        >
          {isResetting ? <Loader2 className="animate-spin" /> : <Languages />}
          Cambiar idioma ({languageLocal.toUpperCase()})
        </Button>
        <Button
          className="flex-1"
          variant={"destructive"}
          disabled={isResetting || isPending}
          onClick={handleClickReset}
        >
          {isResetting ? <Loader2 className="animate-spin" /> : <TimerReset />}
          Reiniciar contenido
        </Button>
      </div>
      <div className="flex space-x-4 space-y-4 flex-row p-6 flex-1 min-h-0">
        <div className="flex flex-col space-y-2 overflow-y-scroll flex-1">
          <div className="top-0 sticky bg-gray-50 p-2 w-full space-y-2 rounded-md z-100">
            <p className="w-max font-bold">Buscar Contenido</p>
            <Select value={sectionCategory} onValueChange={setSectionCategory}>
              <SelectTrigger>
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

          {visibleContents.map((content) => (
            <ContentRow
              key={content.id}
              content={content}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
        <div className="w-full flex-col space-y-4 flex-1 hidden xl:flex">
          <iframe
            key={reload}
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

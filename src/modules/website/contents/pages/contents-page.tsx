import { useState, useEffect } from "react";
import { ContentRow } from "../components/ContentRow";
import { Button } from "@/components/ui/button";
import { useUpdateContents } from "../hooks/useUpdateContents";
import {
  Loader2,
  CassetteTape,
  Eye,
  Languages,
  Settings,
  TimerReset,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        c.id === id ? { ...c, content_value: newValue } : c,
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
    new Set(contents.map((c) => c.section_category).filter(Boolean)),
  );

  const visibleContents = contents.filter((c) => {
    if (c.locale !== languageLocal) return false;
    if (c.section_category !== sectionCategory) return false;

    return c.content_key.toLowerCase() || c.content_value.toLowerCase();
  });

  return (
    <div className="flex flex-col h-dvh">
      <div className="sticky top-0 p-6 flex z-10 w-full bg-neutral-900 justify-between flex-col xl:flex-row gap-4">
        <div className="flex items-center space-x-4 ">
          <Settings className="animate-spin [animation-duration:20s]" />{" "}
          <h1 className=" text-2xl font-bold"> Configuración de contenido</h1>
        </div>
        <div className="flex space-x-4 justify-end">
          <Tooltip>
            <TooltipTrigger asChild className="xl:hidden block">
              <a
                href={
                  import.meta.env.PROD
                    ? "https://aspatperu.org.pe"
                    : "http://localhost:5173"
                }
                target="_blank"
              >
                <Button className="flex-1" variant={"outline"}>
                  <Eye /> <p className="hidden sm:block">Vista Previa</p>
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden block">
              <p>Vista Previa</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"destructive"}
                disabled={isResetting || isPending}
                onClick={handleClickReset}
              >
                {isResetting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <TimerReset />
                )}
                <p className="hidden sm:block">Reiniciar contenido</p>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden block">
              <p>Reiniciar contenido</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                disabled={isResetting || isPending}
                onClick={handleClickLanguage}
              >
                {isResetting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Languages />
                )}
                <p className="hidden sm:block">Cambiar idioma ({languageLocal.toUpperCase()})</p>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden block">
              <p>Cambiar idioma ({languageLocal.toUpperCase()})</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={isPending || isResetting} onClick={handleClick}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CassetteTape />
                )}
                <p className="hidden sm:block">Actualizar Colores</p>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden block">
              <p>Actualizar colores</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex space-x-4 space-y-4 flex-row flex-1 min-h-0">
        <div className="flex flex-col space-y-2 overflow-y-scroll flex-1 m-0">
          <div className="top-0 sticky bg-neutral-950 p-6 m-0 w-full space-y-2 z-2">
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
          <div className="flex flex-col gap-4 p-6">
            {visibleContents.map((content) => (
              <ContentRow
                key={content.id}
                content={content}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
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
        
      </div>
    </div>
  );
}

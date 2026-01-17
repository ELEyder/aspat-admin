import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CassetteTape,
  Eye,
  Languages,
} from "lucide-react";
import Loading from "@/components/loading";
import { useSections, type PageSection } from "../hooks/useSections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResetButton from "../../images/components/ResetButton";
import { SectionRow } from "../components/SectionRow";
import { useUpdateSections } from "../hooks/useUpdateSections";
import { useResetSections } from "../hooks/useResetSections";

export default function SectionsPage() {
  const { data } = useSections();
  const [languageLocal, setLanguageLocal] = useState("es");
  const { mutateAsync: updateContents, isPending } = useUpdateSections();
  const { mutateAsync: resetSections, isPending: isResetting } =
    useResetSections();
  const [sections, setSections] = useState<PageSection[] | null>(null);
  const [sectionCategory, setSectionCategory] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!data) return;
    setSections(data);
  }, [data]);

  const handleUpdate = (newSection: PageSection) => {
    setSections((prev) => {
      if (!prev) return prev;
      return prev.map((s) => (s.id === newSection.id ? newSection : s));
    });
  };

  const handleClick = async () => {
    await updateContents(sections ?? []);
    iframeRef.current?.contentWindow?.postMessage("reload", "*");
  };

  const handleClickLanguage = () => {
    setLanguageLocal((prev) => (prev === "es" ? "en" : "es"));
  };

  const handleClickReset = async () => {
    await resetSections();
    iframeRef.current?.contentWindow?.postMessage("reload", "*");
  };

  if (!sections) {
    return <Loading />;
  }

  const categories = Array.from(
    new Set(sections.map((c) => c.page_key).filter(Boolean))
  );

  const visibleSections = sections.filter((c) => {
    if (c.locale !== languageLocal) return false;
    if (c.page_key !== sectionCategory) return false;

    return true;
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
          Actualizar secciones
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
        <ResetButton disabled={isResetting || isPending} onClick={handleClickReset} isResetting={isResetting} />
      </div>
      <div className="flex space-x-4 space-y-4 flex-row flex-1 min-h-0">
        <div className="flex flex-col space-y-2 overflow-y-scroll flex-1 m-0">
          <div className="top-0 sticky bg-gray-50 p-6 m-0 w-full space-y-2 z-2">
            <p className="w-max font-bold">Buscar Página</p>
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
            {visibleSections.map((sections) => (
                <SectionRow
                  key={sections.id}
                  section={sections}
                  onUpdate={handleUpdate}
                />
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

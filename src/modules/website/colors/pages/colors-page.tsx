import { useColors } from "@/modules/website/colors/hooks/useColors";
import { useState, useEffect } from "react";
import { ColorRow } from "../components/ColorRow";
import { Button } from "@/components/ui/button";
import { useUpdateColors } from "../hooks/useUpdateColors";
import { Loader2, CassetteTape, TimerReset, Eye } from "lucide-react";
import { useResetColors } from "../hooks/useResetColors";
import Loading from "@/components/loading";

export default function ColorsPage() {
  const { data } = useColors();
  const { mutateAsync: updateColors, isPending } = useUpdateColors();
  const { mutateAsync: resetColors, isPending: isResetting } = useResetColors();
  const [colors, setColors] = useState(data);
  const [defaultColors, setDefaultColors] = useState(data);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setDefaultColors(data);
    setColors(data);
  }, [data]);

  const handleUpdate = (id: string, newValue: string) => {
    setColors((prev) =>
      prev?.map((c) => (c.id === id ? { ...c, value: newValue } : c))
    );
  };

  const handleClick = async () => {
    await updateColors(colors ?? []);
    setReload((prev) => prev + 1);
  };

  const handleClickReset = async () => {
    await resetColors();
    setReload((prev) => prev + 1);
  };

  if (!colors) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-dvh">
      <div className="sticky top-0 p-6 flex space-x-4 z-10 w-full bg-gray-100">
        <Button
          className="flex-1"
          disabled={isPending || isResetting}
          onClick={handleClick}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <CassetteTape />}{" "}
          Actualizar Colores
        </Button>
        <Button
          className="flex-1"
          variant={"destructive"}
          disabled={isResetting || isPending}
          onClick={handleClickReset}
        >
          {isResetting ? <Loader2 className="animate-spin" /> : <TimerReset />}
          Reiniciar colores
        </Button>
      </div>
      <div className="flex space-x-4 space-y-4 flex-row p-6 flex-1 min-h-0">
        <div className="flex flex-col space-y-4 overflow-y-scroll">
          {colors?.map((color, index) => (
            <ColorRow
              key={color.id}
              defaultColor={defaultColors?.[index]?.value}
              color={color}
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

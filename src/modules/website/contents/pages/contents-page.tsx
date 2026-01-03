import { useColors } from "@/modules/website/colors/hooks/useColors";
import { useState, useEffect } from "react";
import { ColorRow } from "../components/ColorRow";
import { Button } from "@/components/ui/button";
import { useUpdateColors } from "../hooks/useUpdateColors";
import { Loader2, CassetteTape, TimerReset } from "lucide-react";
import { useResetColors } from "../hooks/useResetColors";
import Loading from "@/components/loading";

export default function ContentsPage() {
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
    <div className="p-8 flex space-x-4 flex-1 max-h-screen">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold mb-4 w-max">Colores</h1>
        <div className="flex flex-col space-y-4 overflow-y-scroll h-full">
          {colors?.map((color, index) => (
            <ColorRow key={color.id} defaultColor={defaultColors?.[index]?.value} color={color} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4">
        <Button disabled={isPending || isResetting} onClick={handleClick}>
          {isPending ? <Loader2 className="animate-spin" /> : <CassetteTape />}{" "}
          Actualizar Colores
        </Button>
        <Button variant={"destructive"} disabled={isResetting || isPending} onClick={handleClickReset}>
          {isResetting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <TimerReset />
          )}
          Reiniciar colores
        </Button>
        <iframe
          key={reload}
          src={
            import.meta.env.PROD
              ? "https://aspatperu.org.pe"
              : "http://localhost:5173"
          }
          className="aspect-video"
        />
      </div>
    </div>
  );
}

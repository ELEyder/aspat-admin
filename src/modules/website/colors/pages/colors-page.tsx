import { useColors } from "@/modules/website/colors/hooks/useColors";
import { useState, useEffect } from "react";
import { ColorRow } from "../components/ColorRow";
import { Button } from "@/components/ui/button";
import { useUpdateColors } from "../hooks/useUpdateColors";
import { Loader2, CassetteTape, TimerReset, Eye, Settings } from "lucide-react";
import { useResetColors } from "../hooks/useResetColors";
import Loading from "@/components/loading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      prev?.map((c) => (c.id === id ? { ...c, value: newValue } : c)),
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
      <div className="sticky top-0 p-6 flex z-10 w-full bg-gray-100 justify-between flex-col xl:flex-row gap-4">
        <div className="flex items-center space-x-4 ">
          <Settings className="animate-spin [animation-duration:20s]" />{" "}
          <h1 className=" text-2xl font-bold"> Configuración de colores</h1>
        </div>
        <div className="flex space-x-4 justify-end">
          <Tooltip>
            <TooltipTrigger className="xl:hidden block">
              <a
                href={
                  import.meta.env.PROD
                    ? "https://aspatperu.org.pe"
                    : "http://localhost:5173"
                }
                target="_blank"
              >
                <Button
                  className="flex-1"
                  variant={"outline"}
                  onClick={handleClickReset}
                >
                  <Eye /> <p className="hidden sm:block">Vista Previa</p>
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden block">
              <p>Vista Previa</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>

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
            <p className="hidden sm:block">Reiniciar colores</p>
          </Button>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden block">
              <p>Reiniciar colores</p>
            </TooltipContent>
            </Tooltip>
            <Tooltip>
            <TooltipTrigger>

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
        <div className="flex flex-col overflow-y-scroll w-full xl:w-fit m-0 ">
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
      </div>
    </div>
  );
}

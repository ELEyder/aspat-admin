import DefaultModal from "@/components/default-modal";
import { Button } from "@/components/ui/button";
import { Check, Loader2, TimerReset, X } from "lucide-react";
import { useState, type FC } from "react";

interface ResetButtonProps {
  disabled: boolean;
  isResetting: boolean;
  onClick: () => void;
}

const ResetButton: FC<ResetButtonProps> = ({
  disabled,
  isResetting,
  onClick,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={"destructive"}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <TimerReset /> Reiniciar contenido
      </Button>
      <DefaultModal open={open} setOpen={setOpen}>
        <h1 className="text-xl font-bold">
          ¿Realmente quieres reestablecer los valores predeterminados?
        </h1>
        <p>Se perderán todos los cambios que se hayan hecho</p>
        <div className="w-full flex justify-end gap-4">
          <Button
            variant="destructive"
            disabled={isResetting}
            onClick={async () => {
              await onClick();
              setOpen(false);
            }}
          >
            {isResetting ? <Loader2 className="animate-spin" /> : <Check />}
            Aceptar
          </Button>
          <Button onClick={() => setOpen(false)}>
            <X /> Cancelar
          </Button>
        </div>
      </DefaultModal>
    </>
  );
};

export default ResetButton;

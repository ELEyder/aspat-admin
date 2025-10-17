import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import type { CourseModule } from "../types/Course";

interface ModuleDeleteModalProps {
  module: CourseModule;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete : (id: number) => void;
}
const ModuleDeleteModal: FC<ModuleDeleteModalProps> = ({
  module,
  open,
  setOpen,
  onDelete
}) => {

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará el módulo{" "}
            <strong>{module.translations[0].title}</strong> de la base de datos.
            Esta acción es irreversible, pruebe <strong>desactivar</strong> el
            módulo en su lugar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <Button>Desactivar</Button>
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={() => onDelete(module.id)}
          >
            { "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModuleDeleteModal;

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
import type { Course } from "../types/Course";
import type { CourseModule } from "../../course-modules/types/CourseModule";

interface ModuleDeleteModalProps {
  module: CourseModule;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  deleteModule: any;
}
const ModuleDeleteModal: FC<ModuleDeleteModalProps> = ({
  module,
  open,
  setOpen,
  setCourse,
  deleteModule,
}) => {
  const handleDeleteModule = async (id: number) => {
    await deleteModule.mutateAsync(id);

    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: prev.modules.filter((m) => m.id !== id),
      };
    });
  };

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
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={() => handleDeleteModule(module.id)}
            disabled={deleteModule.isPending}
          >
            {"Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModuleDeleteModal;

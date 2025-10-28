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
import type { CourseContent } from "../types/CourseContent";

interface CourseContentDeleteModalProps {
  content: CourseContent;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setContents: React.Dispatch<React.SetStateAction<CourseContent[] | null>>;
  deleteContent: any;
}
const CourseContentDeleteModal: FC<CourseContentDeleteModalProps> = ({
  content,
  open,
  setOpen,
  setContents,
  deleteContent,
}) => {
  const handleDeleteModule = async (id: number) => {
    await deleteContent.mutateAsync(id);

    setContents((prev) => {
      if (!prev) return prev;
      return prev.filter((m) => m.id !== id);
    });
    
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará el contenido
            <strong>{content.translations[0].title}</strong> de la base de
            datos. Esta acción es irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={() => handleDeleteModule(content.id)}
            disabled={deleteContent.isPending}
          >
            {"Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseContentDeleteModal;

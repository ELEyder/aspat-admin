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
import type { Course } from "../types/Course";
import { Button } from "@/components/ui/button";
import { useDeleteCourse } from "../hooks/useDeleteCourse";

interface CourseDeleteModalProps {
  course: Course;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CourseDeleteModal: FC<CourseDeleteModalProps> = ({
  course,
  open,
  setOpen,
}) => {
  const deleteMutation = useDeleteCourse();

  const handleClick = async () => {
    await deleteMutation.mutateAsync(course.id.toString());
    setOpen(false)
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará el curso{" "}
            <strong>{course.translations[0].title}</strong> de la base de datos.
            Esta acción es irreversible, pruebe <strong>deshabilitar</strong> el
            curso en su lugar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleClick}
            disabled={deleteMutation.isPending}
          >
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseDeleteModal;

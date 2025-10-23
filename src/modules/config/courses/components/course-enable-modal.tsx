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
import { useEnableCourse } from "../hooks/useEnableCourse";

interface CourseDeleteModalProps {
  course: Course;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CourseEnableModal: FC<CourseDeleteModalProps> = ({
  course,
  open,
  setOpen,
}) => {
  const enableMutation = useEnableCourse();

  const handleEnableClick = async () => {
    await enableMutation.mutateAsync(course.id.toString());
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se habilitará el curso{" "}
            <strong>{course.translations[0].title}</strong> a los usuarios.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={handleEnableClick}
            disabled={enableMutation.isPending}
          >
            Habilitar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseEnableModal;

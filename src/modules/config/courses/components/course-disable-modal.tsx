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
import { useDisableCourse } from "../hooks/useDisableCourse";

interface CourseDeleteModalProps {
  course: Course;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CourseDisableModal: FC<CourseDeleteModalProps> = ({
  course,
  open,
  setOpen,
}) => {
  const disableCourse = useDisableCourse();

  const handleEnableClick = async () => {
    await disableCourse.mutateAsync(course.id.toString());
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se deshabilitará el curso{" "}
            <strong>{course.translations[0].title}</strong> a los usuarios.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={handleEnableClick}
            disabled={disableCourse.isPending}
          >
            Deshabilitar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseDisableModal;

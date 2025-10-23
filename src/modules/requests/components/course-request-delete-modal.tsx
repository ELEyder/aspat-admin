import type { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import type { CourseRequest } from "../types/CourseRequest";
import { Button } from "@/components/ui/button";
import { useDeleteCourseRequest } from "../hooks/useDeleteCourseRequest";

interface CourseRequestDeleteProps {
  request: CourseRequest;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CourseRequestDeleteModal: FC<CourseRequestDeleteProps> = ({
  request,
  open,
  setOpen,
}) => {
  
  const deleteCourseCourse = useDeleteCourseRequest();

  const handleClick = async () => {
    await deleteCourseCourse.mutateAsync(request.id);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas eliminar esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente la solicitud del curso.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
          variant={"destructive"}
            onClick={handleClick}
            disabled={deleteCourseCourse.isPending}
          >
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseRequestDeleteModal;

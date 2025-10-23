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
import { useConfirmCourseRequest } from "../hooks/useConfirmCourseRequest";

interface CourseRequestConfirmProps {
  request: CourseRequest;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CourseRequestConfirmModal: FC<CourseRequestConfirmProps> = ({
  request,
  open,
  setOpen,
}) => {
  const confirmCourseRequest = useConfirmCourseRequest();

  const handleClick = async () => {
    await confirmCourseRequest.mutateAsync(request.id);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas confirmar esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción dará acceso a {request.course.translations[0].title} al usuario {request.user.first_name} {request.user.last_name}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            onClick={handleClick}
            disabled={confirmCourseRequest.isPending}
          >
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseRequestConfirmModal;

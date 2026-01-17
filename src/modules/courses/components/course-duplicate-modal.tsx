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
import { useDuplicateCourse } from "../hooks/useDuplicateCourse";
import { Button } from "@/components/ui/button";

interface CourseDuplicateModalProps {
  course: Course;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CourseDuplicateModal: FC<CourseDuplicateModalProps> = ({
  course,
  open,
  setOpen,
}) => {

  const useMutation = useDuplicateCourse();
  const handleClick = async () => {
    await useMutation.mutateAsync(course.id.toString())
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se duplicará el curso{" "}
            <strong>{course.translations[0].title}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <Button className="cursor-pointer" onClick={handleClick} disabled={useMutation.isPending}>
            Duplicar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseDuplicateModal;

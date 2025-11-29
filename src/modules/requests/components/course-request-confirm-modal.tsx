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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGroups } from "../hooks/useGroups";

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
  const { data : groups, isLoading } = useGroups(request.course_id);
  const [formData, setFormData] = useState({
    course_id: request.course_id || "",
    group_id: "",
    user_id: request.user_id || "",
  });

  const handleClick = async () => {
    await confirmCourseRequest.mutateAsync(formData);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas confirmar esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 mt-3">
            <div className="space-y-2 hidden">
              <Label htmlFor="course_id">Course ID</Label>
              <Input
                id="course_id"
                type="number"
                name="course_id"
                value={formData.course_id}
              />
            </div>

            <div className="space-y-2 hidden">
              <Label htmlFor="user_id">User ID</Label>
              <Input
                id="user_id"
                type="number"
                name="user_id"
                value={formData.user_id}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="group_id">Grupo ID</Label>

              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, group_id: value }))
                }
                value={formData.group_id}
              >
                <SelectTrigger id="group_id">
                  <SelectValue placeholder="Seleccionar grupo" />
                </SelectTrigger>

                <SelectContent>
                  {isLoading && (
                    <SelectItem value="loading" disabled>
                      Cargando grupos...
                    </SelectItem>
                  )}

                  {groups?.length === 0 && !isLoading && (
                    <SelectItem value="no-groups" disabled>
                      No hay grupos disponibles
                    </SelectItem>
                  )}

                  {groups?.map((group) => (
                    <SelectItem key={group.id} value={String(group.id)}>
                      {group.name} - {group.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

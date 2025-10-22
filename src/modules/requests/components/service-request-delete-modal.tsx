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
import type { ServiceRequest } from "../types/ServiceRequest";
import { Button } from "@/components/ui/button";
import { useDeleteServiceRequest } from "../hooks/useDeleteServiceRequest";

interface ServiceRequestDeleteProps {
  request: ServiceRequest;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ServiceRequestDeleteModal: FC<ServiceRequestDeleteProps> = ({
  request,
  open,
  setOpen,
}) => {
  const deleteServiceCourse = useDeleteServiceRequest();

  const handleClick = async () => {
    await deleteServiceCourse.mutateAsync(request.id);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas eliminar esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente la solicitud de servicio.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
          variant={"destructive"}
            onClick={handleClick}
            disabled={deleteServiceCourse.isPending}
          >
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ServiceRequestDeleteModal;

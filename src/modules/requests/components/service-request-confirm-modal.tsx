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
import { useConfirmServiceRequest } from "../hooks/useConfirmCourseRequest";
import type { ServiceRequest } from "../types/ServiceRequest";
import { Button } from "@/components/ui/button";

interface ServiceRequestConfirmProps {
  request: ServiceRequest;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ServiceRequestConfirmModal: FC<ServiceRequestConfirmProps> = ({ request, open, setOpen }) => {
  const confirmServiceRequest = useConfirmServiceRequest();

  const handleClick = async () => {
    await confirmServiceRequest.mutateAsync(request.id)
    setOpen(false);
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas confirmar esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará como resuelta la solicitud de servicio.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={handleClick} disabled={confirmServiceRequest.isPending}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ServiceRequestConfirmModal;

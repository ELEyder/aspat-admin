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
import { useConfirmServiceRequest } from "../hooks/useConfirmServiceRequest";

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
          <AlertDialogTitle>¿Deseas {request.status.id === 1 ? "marcar en proceso" : "confirmar"} esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará como <strong>{request.status.id === 1 ? "en proceso" : "confirmar"}</strong> la solicitud de servicio.
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

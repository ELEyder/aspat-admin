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
import { Button } from "@/components/ui/button";
import type { Donation } from "../types/Donation";
import { useDeleteDonation } from "../hooks/useDeleteDonation";

interface DonationDeleteProps {
  donation: Donation;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DonationDeleteModal: FC<DonationDeleteProps> = ({
  donation,
  open,
  setOpen,
}) => {
  const deleteDonation = useDeleteDonation();

  const handleClick = async () => {
    await deleteDonation.mutateAsync(donation.id.toString());
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas eliminar esta solicitud?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente la solicitud del servicio.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
          variant={"destructive"}
            onClick={handleClick}
            disabled={deleteDonation.isPending}
          >
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DonationDeleteModal;

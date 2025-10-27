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
import { useConfirmDonation } from "../hooks/useConfirmDonation";

interface DonationConfirmModalProps {
  donation: Donation;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DonationConfirmModal: FC<DonationConfirmModalProps> = ({ donation, open, setOpen }) => {
  const confirmDonation = useConfirmDonation();

  const handleClick = async () => {
    await confirmDonation.mutateAsync(donation.id.toString())
    setOpen(false);
  }
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas {donation.status.id === 1 ? "marcar en proceso" : "confirmar"} esta donación?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará como <strong>{donation.status.id === 1 ? "en proceso" : "confirmar"}</strong> la donación de servicio.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={handleClick} disabled={confirmDonation.isPending}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DonationConfirmModal;

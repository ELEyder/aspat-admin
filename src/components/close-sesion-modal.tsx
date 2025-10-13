import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLogin } from "@/modules/auth/hooks/use-login";
import type { FC } from "react";
import { toast } from "sonner";

interface CloseSesionModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CloseSesionModal: FC<CloseSesionModalProps> = ({ open, setOpen }) => {
  const { logout } = useLogin();

  const handleClick = async () => {
    try {
      const response = await logout();
      if (response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Error cerrando sesión. Se forzó el logout.");
    } finally {
      setTimeout(() => {
        window.location.href = import.meta.env.PROD
          ? "https://platform.aspatperu.org.pe"
          : "http://localhost:5174";
      }, 1000);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se cerrará sesión en tu cuenta actual.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CloseSesionModal;

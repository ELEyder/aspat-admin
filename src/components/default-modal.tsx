import { useState, type FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";

interface DefaultModalProps {
  children?: React.ReactNode;
  open: boolean;
  isWarning?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  centered?: boolean;
  width?: string;
  title?: string;
  onInteractOutside?: (event: Event) => void;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

const DefaultModal: FC<DefaultModalProps> = ({
  open,
  setOpen,
  onInteractOutside,
  children,
  title,
  isWarning = false,
  size = 4,
}) => {
  const [openWarning, setOpenWarning] = useState(false);
  const sizeMap = {
    1: "!max-w-md",
    2: "!max-w-2xl",
    3: "!max-w-3xl",
    4: "!max-w-4xl",
    5: "!max-w-5xl",
    6: "!max-w-6xl",
  };

  const handleOutsideClick = (e: Event) => {
    onInteractOutside?.(e);
    if (!isWarning) return null;
    else {
      e.preventDefault();
      setOpenWarning(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={handleOutsideClick}
          className={`${sizeMap[size]} !w-full !p-8 max-h-[95vh] overflow-y-auto`}
          aria-describedby={undefined}
        >
          {title ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <VisuallyHidden>
              <DialogTitle>Título invisible para accesibilidad</DialogTitle>
            </VisuallyHidden>
          )}
          {children}
        </DialogContent>
      </Dialog>
      <Dialog open={openWarning} onOpenChange={setOpenWarning}>
        <DialogContent className="!p-8" aria-describedby={undefined}>
          <VisuallyHidden>
            <DialogTitle>Do you want to close this modal?</DialogTitle>
          </VisuallyHidden>
          <form className="flex flex-col gap-4 items-center">
            <h3>Do you want to close this modal?</h3>
            <p>
              Are you sure you want to close this modal? Any unsaved changes
              will be lost.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setOpenWarning(false)}>
                Continue
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setOpenWarning(false);
                }}
              >
                Close Modal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DefaultModal;

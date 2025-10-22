import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ServiceRequest } from "../types/ServiceRequest";

interface Props {
  request: ServiceRequest;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ServiceRequestViewModal({ request, open, setOpen }: Props) {
  if (!request) return null;

  const serviceTitle = request.service?.translations?.[0]?.title ?? "Sin título";
  const serviceDescription = request.service?.translations?.[0]?.description ?? "Sin descripción";
  const statusName = request.status?.translations?.[0]?.name ?? "Desconocido";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Solicitud #{request.id}
          </DialogTitle>
          <DialogDescription>
            Detalles completos de la solicitud de servicio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2 text-sm">
          <div className="grid grid-cols-2 gap-x-3">
            <p className="font-medium text-gray-600">Nombres:</p>
            <p>{request.first_name}</p>

            <p className="font-medium text-gray-600">Apellidos:</p>
            <p>{request.last_name}</p>

            <p className="font-medium text-gray-600">DNI:</p>
            <p>{request.dni}</p>

            <p className="font-medium text-gray-600">Teléfono:</p>
            <p>{request.phone}</p>

            <p className="font-medium text-gray-600">Email:</p>
            <p>{request.email}</p>

            <p className="font-medium text-gray-600">Servicio:</p>
            <p>{serviceTitle}</p>

            <p className="font-medium text-gray-600">Estado:</p>
            <span
              className="px-2 py-1 rounded-md text-xs font-semibold"
              style={{
                backgroundColor: request.status.bg_color?.startsWith("#")
                  ? request.status.bg_color
                  : "#f3f4f6",
                color: request.status.text_color?.startsWith("#")
                  ? request.status.text_color
                  : "#000",
              }}
            >
              {statusName}
            </span>
          </div>

          {serviceDescription && (
            <div className="pt-4 border-t">
              <p className="font-medium text-gray-600 mb-1">Descripción del servicio:</p>
              <p className="text-gray-800 text-sm whitespace-pre-line">{serviceDescription}</p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

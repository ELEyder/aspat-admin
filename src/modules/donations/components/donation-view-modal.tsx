import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  User,
  Phone,
  CreditCard,
  Calendar,
  Gift,
} from "lucide-react";
import type { Donation } from "../types/Donation";

interface Props {
  donation: Donation;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DonationViewModal({ donation, open, setOpen }: Props) {
  if (!donation) return null;

  const status = donation.status;
  const statusName = status?.translations?.[0]?.name ?? "Sin estado";
  const bgColor = status?.bg_color?.startsWith("#") ? status.bg_color : "#f3f4f6";
  const textColor = status?.text_color?.startsWith("#") ? status.text_color : "#111827";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Detalles de la Donación
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Revisa la información completa del donante y su tipo de contribución.
          </DialogDescription>
        </DialogHeader>

        <Card className="shadow-none border border-gray-200 mt-3">
          <CardContent className="space-y-5 py-6">
            {/* Usuario */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <User size={18} />
                <span>Donante</span>
              </div>
              <p className="text-gray-900">
                {`${donation.first_name ?? ""} ${donation.last_name ?? ""}`.trim() || "No especificado"}
              </p>

              {donation.email && (
                <p className="text-gray-500 flex items-center gap-1">
                  <Mail size={16} className="text-gray-400" /> {donation.email}
                </p>
              )}

              {donation.phone && (
                <p className="text-gray-500 flex items-center gap-1">
                  <Phone size={16} className="text-gray-400" /> {donation.phone}
                </p>
              )}
            </div>

            <Separator />

            {/* Tipo de donación */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Gift size={18} />
                <span>Tipo de Donación</span>
              </div>
              <p className="text-gray-900 capitalize">
                {donation.donation_type === "money"
                  ? "Dinero"
                  : donation.donation_type === "goods"
                  ? "Bienes"
                  : donation.donation_type || "No especificado"}
              </p>
            </div>

            <Separator />

            {/* Estado */}
            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Estado</p>
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full border-0"
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                {statusName}
              </Badge>
            </div>

            <Separator />

            {/* Información adicional */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <CreditCard size={18} />
                <span>DNI</span>
              </div>
              <p className="text-gray-900">{donation.dni ?? "No especificado"}</p>
            </div>

            <Separator />

            {/* Fechas */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Calendar size={18} />
                <span>Fecha de Registro</span>
              </div>
              <p className="text-gray-900">
                {new Date(donation.created_at).toLocaleString("es-PE")}
              </p>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

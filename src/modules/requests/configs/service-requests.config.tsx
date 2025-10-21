import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone } from "lucide-react";
import type { ServiceRequest } from "../types/ServiceRequest";
import { RiWhatsappLine } from "@remixicon/react";
import ServiceRequestConfirmModal from "../components/service-request-confirm-modal";
import { useState } from "react";

const handleWhatsappClick = (phone: string, service: string) => {
  if (phone.length === 9) phone = "51" + phone;
  const message = `Hola, te contacto desde el sistema para responder tu solicitud de servicio de ${service}.`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
};

const handleCallClick = (phone: string) => {
  if (phone.length === 9) phone = "51" + phone;
  const telUrl = `tel:${phone}`;
  window.open(telUrl, "_self");
};

const handleMailClick = (mail: string) => {
  const mailUrl = `mailto:${mail}`;
  window.open(mailUrl, "_self");
};

export const columns: ColumnDef<ServiceRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "dni",
    header: "DNI",
  },
  {
    accessorKey: "first_name",
    header: "Nombres",
  },
  {
    accessorKey: "last_name",
    header: "Apellidos",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "service.translations.0.title",
    header: "Teléfono",
  },
  {
    accessorFn: (row) => row.status?.translations?.[0]?.name,
    id: "statusName",
    header: "Estado",
    cell: ({ row }) => {
      const request = row.original;
      const ServiceRequest = row.original;
      const status = ServiceRequest.status.translations?.[0]?.name;
      const bgColor = request.status.bg_color;
      const textColor = request.status.text_color;

      return (
        <div
          className={`text-center px-2 py-1 rounded-md font-medium`}
          style={{
            backgroundColor: bgColor.startsWith("#") ? bgColor : undefined,
            color: textColor.startsWith("#") ? textColor : undefined,
          }}
        >
          {status ?? "Desconocido"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const request = row.original;
      const [open, setOpen] = useState(false);
      return (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleCallClick(request.phone)}>
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleWhatsappClick(
                request.phone,
                request.service.translations[0].title.toString()
              )
            }
            className="bg-[#25D366] hover:bg-[#1ebe57] transition-colors"
          >
            <RiWhatsappLine className="h-5 w-5 text-white" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleMailClick(request.email)}
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpen(true)}
            className="bg-blue-700 hover:bg-blue-900"
          >
            <Check className="h-4 w-4" />
          </Button>
          <ServiceRequestConfirmModal
            request={request}
            open={open}
            setOpen={setOpen}
          />
        </div>
      );
    },
  },
];

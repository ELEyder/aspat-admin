import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Check, Eye, Mail, MoreVertical, Phone, Trash2 } from "lucide-react";
import type { ServiceRequest } from "../types/ServiceRequest";
import ServiceRequestDeleteModal from "../components/service-request-delete-modal";
import { useState } from "react";
import ServiceRequestConfirmModal from "../components/service-request-confirm-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RiWhatsappLine } from "@remixicon/react";
import ServiceRequestViewModal from "../components/service-request-view-modal";

export const columns: ColumnDef<ServiceRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "dni",
    accessorKey: "dni",
    header: "DNI",
  },
  {
    id: "first_name",
    accessorKey: "first_name",
    header: "Nombres",
  },
  {
    id: "last_name",
    accessorKey: "last_name",
    header: "Apellidos",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    id: "service",
    accessorKey: "service.translations.0.title",
    header: "Servicio",
  },
  {
    accessorFn: (row) => row.status?.translations?.[0]?.name,
    id: "status",
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
    header: "Opciones",
    cell: ({ row }) => {
      const request = row.original;
      const [open, setOpen] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);
      const [openView, setOpenView] = useState(false);

      const phone =
        request.phone.length === 9 ? "51" + request.phone : request.phone;

      return (
        <>
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setOpenView(true)}>
                  <Eye className="mr-2 h-4 w-4" /> Ver solicitud
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    window.open(`https://wa.me/${phone}`, "_blank")
                  }
                >
                  <RiWhatsappLine className="mr-2 h-4 w-4" /> WhatsApp
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => window.open(`tel:${phone}`, "_self")}
                >
                  <Phone className="mr-2 h-4 w-4" /> Llamar
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    window.open(`mailto:${request.email}`, "_self")
                  }
                >
                  <Mail className="mr-2 h-4 w-4" /> Correo
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                  className="text-green-600 bg-green-50"
                  disabled={request.status_id === 3}
                >
                  <Check className="mr-2 h-4 w-4" />{" "}
                  {request.status_id === 1
                    ? "En proceso"
                    : request.status_id === 2
                    ? "Confirmar"
                    : "Confirmado"}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenDelete(true)}
                  className="text-red-600 bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ServiceRequestViewModal
            request={request}
            open={openView}
            setOpen={setOpenView}
          />
          <ServiceRequestConfirmModal
            request={request}
            open={open}
            setOpen={setOpen}
          />
          <ServiceRequestDeleteModal
            request={request}
            open={openDelete}
            setOpen={setOpenDelete}
          />
        </>
      );
    },
  },
];

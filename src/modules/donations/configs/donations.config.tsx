import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Eye,
  Mail,
  MoreVertical,
  Phone,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Donation } from "../types/Donation";
import { RiWhatsappLine } from "@remixicon/react";
import DonationConfirmModal from "../components/donation-confirm-modal";
import DonationDeleteModal from "../components/donation-delete-modal";
import DonationViewModal from "../components/donation-view-modal";

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "Nombre",
  },
  {
    accessorKey: "last_name",
    header: "Apellidos",
  },
  {
    accessorKey: "dni",
    header: "DNI",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "donation_type",
    header: "Tipo de Donación",
    cell: ({ row }) => {
      const type = row.original.donation_type;
      const label =
        type === "money" ? "Dinero" : type === "goods" ? "Bienes" : type;
      return <span className="font-medium">{label}</span>;
    },
  },
  {
    id: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      const name = status?.translations?.[0]?.name ?? "Desconocido";
      const bg = status?.bg_color ?? "#e5e7eb";
      const color = status?.text_color ?? "#111827";

      return (
        <div
          className="text-center px-2 py-1 rounded-md font-medium"
          style={{ backgroundColor: bg, color }}
        >
          {name}
        </div>
      );
    },
  },
  {
    header: "Opciones",
    cell: ({ row }) => {
      const donation = row.original;
      const [openView, setOpenView] = useState(false);
      const [openConfirm, setOpenConfirm] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);

      return (
        <>
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => setOpenView(true)}>
                  <Eye className="mr-2 h-4 w-4" /> Ver detalle
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    window.open(`https://wa.me/${row.original.phone}`, "_blank")
                  }
                >
                  <RiWhatsappLine className="mr-2 h-4 w-4" /> WhatsApp
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    window.open(`tel:${row.original.phone}`, "_self")
                  }
                >
                  <Phone className="mr-2 h-4 w-4" /> Llamar
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    window.open(`mailto:${row.original.email}`, "_self")
                  }
                >
                  <Mail className="mr-2 h-4 w-4" /> Correo
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenConfirm(true)}
                  className="text-green-600 bg-green-50"
                  disabled={donation.status_id === 3}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />{" "}
                  {donation.status_id === 1
                    ? "Marcar en proceso"
                    : donation.status_id === 2
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
          <DonationViewModal 
            open={openView}
            setOpen={setOpenView}
            donation={donation}
          />
          <DonationConfirmModal
            open={openConfirm}
            setOpen={setOpenConfirm}
            donation={donation}
          />
          <DonationDeleteModal
            open={openDelete}
            setOpen={setOpenDelete}
            donation={donation}
          />
        </>
      );
    },
  },
];

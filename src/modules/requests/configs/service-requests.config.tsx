import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { ServiceRequest } from "../types/ServiceRequest";

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
      const id = row.getValue("statusId") as number | undefined;
      const status = row.getValue("statusName") as string | undefined;

      const colors: Record<number, string> = {
        1: "text-yellow-500",
        2: "text-green-600",
        3: "text-red-600",
      };

      return (
        <span className={colors[id ?? 0] ?? "text-gray-500"}>
          {status ?? "Desconocido"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log("Editar", request.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => console.log("Eliminar", request.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

import { type ColumnDef } from "@tanstack/react-table";
import type { CourseRequest } from "../types/CourseRequest";
import { Button } from "@/components/ui/button";
import { Pencil, Phone, Trash2 } from "lucide-react";

export const columns: ColumnDef<CourseRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "course.translations.0.title",
    header: "Curso",
  },
  {
    accessorKey: "user.first_name",
    header: "Nombres del usuario",
  },
  {
    accessorKey: "user.last_name",
    header: "Apellidos del usuario",
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
            <Phone className="h-4 w-4" />
          </Button>
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

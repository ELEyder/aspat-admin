import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Copy, Trash2 } from "lucide-react";
import type { Course } from "../types/Course";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "translations.0.title",
    header: "Curso",
  },
  {
    accessorKey: "translations.0.summary",
    header: "Descripción",
  },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const request = row.original;
      const navigate = useNavigate();
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/config/courses/" + request.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/config/courses/" + request.id)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => navigate("Eliminar " + request.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

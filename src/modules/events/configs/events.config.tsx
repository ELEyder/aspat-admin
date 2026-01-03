import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Event } from "../types/Event";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "translations.0.title",
    header: "Nombre",
  },
  {
    accessorKey: "translations.0.modality",
    header: "Modalidad",
  },
  {
    header: "Fecha",
    accessorKey: "datetime",
    cell: ({ row }) => {
      const value = row.original.datetime;
      return dayjs(value).format("DD/MM/YYYY");
    },
  },
  {
    header: "Hora",
    accessorKey: "datetime",
    cell: ({ row }) => {
      const value = row.original.datetime;
      return dayjs(value).format("hh:mm A");
    },
  },
  {
    accessorKey: "organizer",
    header: "Organizador",
  },
  {
    header: "Opciones",
    cell: ({ row }) => {
      const navigate = useNavigate();
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
                <DropdownMenuItem onClick={() => navigate("/events/" + row.original.id)}>
                  <Eye className="mr-2 h-4 w-4" /> Ver Solicitudes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];

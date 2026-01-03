import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {  Eye, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ContributorRequest } from "../types/ContributorRequest";
export const columns: ColumnDef<ContributorRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "courseTitle",
    accessorKey: "course.translations.0.title",
    header: "Curso",
  },
  {
    id: "firstName",
    accessorKey: "user.first_name",
    header: "Nombres del usuario",
  },
  {
    id: "lastName",
    accessorKey: "user.last_name",
    header: "Apellidos del usuario",
  },
  {
    header: "Opciones",
    cell: () => {

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
                <DropdownMenuItem onClick={() => console.log(true)}>
                  <Eye className="mr-2 h-4 w-4" /> Ver solicitud
                </DropdownMenuItem>

                
                <DropdownMenuItem
                  onClick={() => console.log(true)}
                  className="text-red-600 bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </>
      );
    },
  },
];

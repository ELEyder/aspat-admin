import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Copy,
  Trash2,
  Badge,
  CheckCircle,
  XCircle,
  MoreVertical,
} from "lucide-react";
import type { Course } from "../types/Course";
import { useNavigate } from "react-router-dom";
import CourseDeleteModal from "../components/course-delete-modal";
import { useState } from "react";
import CourseDuplicateModal from "../components/course-duplicate-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "title",
    accessorKey: "translations.0.title",
    header: "Curso",
  },
  {
    id: "slug",
    accessorKey: "slug",
    header: "Identificador de URL",
  },
  {
    id: "is_active",
    accessorKey: "is_active",
    header: "Activado",
    cell: ({ row }) => {
      const request = row.original;
      const isActive = request.is_active == true;
      return (
        <div className="space-y-1">
          {isActive ? (
            <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
              <CheckCircle /> Sí
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-600 flex items-center gap-1">
              <XCircle /> No
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    header: "Opciones",
    cell: ({ row }) => {
      const request = row.original;
      const navigate = useNavigate();
      const [openDelete, setOpenDelete] = useState(false);
      const [openDuplicate, setOpenDuplicate] = useState(false);
      return (
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => navigate("/courses/" + request.id)}
              >
                <Pencil className="h-4 w-4" /> Editar
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenDuplicate(true)}>
                <Copy className="h-4 w-4" /> Duplicar
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenDelete(true)}
                className="text-red-600 bg-red-50"
              >
                <Trash2 className="h-4 w-4" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CourseDuplicateModal
            course={request}
            open={openDuplicate}
            setOpen={setOpenDuplicate}
          />
          <CourseDeleteModal
            course={request}
            open={openDelete}
            setOpen={setOpenDelete}
          />
        </div>
      );
    },
  },
];

import { type ColumnDef } from "@tanstack/react-table";
import type { CourseRequest } from "../types/CourseRequest";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CourseRequestDeleteModal from "../components/course-request-delete-modal";
import CourseRequestConfirmModal from "../components/course-request-confirm-modal";
import CourseRequestViewModal from "../components/course-request-view-modal";
export const columns: ColumnDef<CourseRequest>[] = [
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
      const [openConfirm, setOpenConfirm] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);
      const [openView, setOpenView] = useState(false);

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
                  onClick={() => setOpenConfirm(true)}
                  className="text-green-600 bg-green-50"
                  disabled={request.status.id === 3}
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Aceptar
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

          <CourseRequestViewModal
            request={request}
            open={openView}
            setOpen={setOpenView}
          />
          <CourseRequestDeleteModal
            request={request}
            open={openDelete}
            setOpen={setOpenDelete}
          />

          <CourseRequestConfirmModal
            request={request}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
        </>
      );
    },
  },
];

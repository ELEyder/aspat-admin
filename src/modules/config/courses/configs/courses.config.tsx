import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Copy, Trash2, Check, Cross, X } from "lucide-react";
import type { Course } from "../types/Course";
import { useNavigate } from "react-router-dom";
import CourseDeleteModal from "../components/course-delete-modal";
import { useState } from "react";
import CourseDuplicateModal from "../components/course-duplicate-modal";
import { Checkbox } from "@/components/ui/checkbox";

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
    id: "slug",
    accessorKey: "slug",
    header: "Identificador de URL",
  },
  {
    id: "title",
    accessorKey: "translations.0.title",
    header: "Curso",
  },
  {
    id: "is_active",
    accessorKey: "is_active",
    header: "Activado",
    cell: ({ row }) => {
      row.original.is_active ? <Check /> : <X />;
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
          <Button
            size="sm"
            onClick={() => navigate("/config/courses/" + request.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenDuplicate(true)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpenDelete(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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

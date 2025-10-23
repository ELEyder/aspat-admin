import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Copy,
  Trash2,
  Badge,
  CheckCircle,
  XCircle,
  Check,
} from "lucide-react";
import type { Course } from "../types/Course";
import { useNavigate } from "react-router-dom";
import CourseDeleteModal from "../components/course-delete-modal";
import { useState } from "react";
import CourseDuplicateModal from "../components/course-duplicate-modal";
import CourseEnableModal from "../components/course-enable-modal";
import CourseDisableModal from "../components/course-disable-modal";

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
      const [openEnable, setOpenEnable] = useState(false);
      const [openDisable, setOpenDisable] = useState(false);
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
            variant="outline"
            onClick={() => request.is_active ? setOpenDisable(true) : setOpenEnable(true)}
            className={!request.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
          >
            {!request.is_active ? <Check /> : <XCircle />}
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

          <CourseEnableModal
            course={request}
            open={openEnable}
            setOpen={setOpenEnable}
          />

          <CourseDisableModal
            course={request}
            open={openDisable}
            setOpen={setOpenDisable}
          />
        </div>
      );
    },
  },
];

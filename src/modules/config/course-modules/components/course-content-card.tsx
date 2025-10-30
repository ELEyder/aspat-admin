import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon, Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import type { CourseContent } from "../../course-contents/types/CourseContent";
import CourseContentDeleteModal from "./course-content-delete-modal";
import { useDeleteCourseContent } from "../hooks/useDeleteCourseContent";
import { useState } from "react";

interface CourseContentCard {
  content: CourseContent;
  index: number;
  setContents: React.Dispatch<React.SetStateAction<any>>;
}

export function CourseContentCard({
  content,
  index,
  setContents,
}: CourseContentCard) {
  const navigate = useNavigate();
  const deleteContent = useDeleteCourseContent();
  const [openDelete, setOpenDelete] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: content.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors gap-4"
    >
      <Button className="cursor-ns-resize" variant={"outline"} {...listeners}>
        <ChevronsUpDownIcon />
      </Button>
      <div className="flex items-center gap-3 w-full">
        <div className="hidden w-10 h-10 sm:flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
          {index + 1}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {content.translations[0].title}
          </p>
          <p>Tipo: {content.type}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => navigate(`/config/course-contents/${content.id}`)}
            >
              <Edit /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDelete(true)}
              className="bg-red-50 focus:text-red-600 text-red-600"
            >
              <Trash className="text-red-600" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CourseContentDeleteModal
        deleteContent={deleteContent}
        content={content}
        open={openDelete}
        setOpen={setOpenDelete}
        setContents={setContents}
      />
    </li>
  );
}

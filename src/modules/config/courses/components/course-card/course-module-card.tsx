import { useSortable } from "@dnd-kit/sortable";
import type { Course } from "../../types/Course";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon, Edit, Trash } from "lucide-react";
import ModuleDeleteModal from "../module-delete-modal";
import { useState } from "react";

interface SortableModuleProps {
  module: Course["modules"][0];
  index: number;
  onDelete: (id: number) => void;
}

export function CourseModuleCard({
  module,
  index,
  onDelete,
}: SortableModuleProps) {

  const [open, setOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: module.id });
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
        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
          {index + 1}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {module.translations[0].title}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button>
          <Edit />
        </Button>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <Trash />
        </Button>
      </div>
      <ModuleDeleteModal open={open} setOpen={setOpen} onDelete={onDelete} module={module}/>
    </li>
  );
}

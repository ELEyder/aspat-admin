import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2, Plus } from "lucide-react";
import { type Dispatch, type FC } from "react";
import type { Course } from "../../types/Course";
import { SortableModule } from "./sortable-module";
import { toast } from "sonner";

interface CourseModulesCardProps {
  course: Course;
  setCourse: Dispatch<React.SetStateAction<Course | null>>;
}

const CourseModulesCard: FC<CourseModulesCardProps> = ({
  course,
  setCourse,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = course.modules.findIndex((m) => m.id === active.id);
    const newIndex = course.modules.findIndex((m) => m.id === over.id);

    setCourse((prev) => {
      if (!prev) return prev; // por si prev es null
      return {
        ...prev,
        modules: arrayMove(prev.modules, oldIndex, newIndex),
      };
    });
  };
  const addModule = () => {
    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: [
          ...prev.modules,
          {
            contents: [],
            course_id: prev.id ?? 0,
            created_at: "",
            updated_at: "",
            order: prev.modules.length + 1,
            id: prev.modules.length + 1,
            translations: [
              {
                title: "(Sin título)",
                description: "(Sin descripción)",
                locale: "es",
                summary: "(Sin resumen)",
                created_at: "",
                updated_at: "",
                course_module_id: prev.modules.length + 1,
                id: prev.modules.length + 1,
              },
            ],
          },
        ],
      };
    });
  };

  const deleteModule = (id: number) => {
    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: prev.modules.filter((m) => m.id !== id),
      };
    });
    toast("Se borró" + course.modules);
  };

  return (
    <Card className="shadow-lg border border-gray-200 rounded-xl">
      <CardHeader className="border-b bg-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Módulos del curso
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 bg-white flex flex-col gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={course.modules.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-3">
              {course.modules.map((module, index) => (
                <SortableModule
                  key={module.id}
                  module={module}
                  index={index}
                  onDelete={() => deleteModule(module.id)}
                />
              ))}
              <li className="w-full">
                <Button
                  className="w-full"
                  variant={"secondary"}
                  onClick={addModule}
                >
                  Agregar módulo <Plus />
                </Button>
              </li>
            </ul>
          </SortableContext>
        </DndContext>
        <Button onClick={() => {}} className="w-full">
          {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {false ? "Cargando..." : "Guardar Cambios"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseModulesCard;

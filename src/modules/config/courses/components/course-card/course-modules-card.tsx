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
import type { UseMutationResult } from "@tanstack/react-query";
import type { UpdateOrderModulesValues } from "../../hooks/useUpdateOrderModules";
import { useAddModule } from "../../hooks/useAddModule";

interface CourseModulesCardProps {
  course: Course;
  setCourse: Dispatch<React.SetStateAction<Course | null>>;
  updateOrderCourse: UseMutationResult<
    any,
    Error,
    {
      id: string;
      data: UpdateOrderModulesValues;
    },
    unknown
  >;
}

const CourseModulesCard: FC<CourseModulesCardProps> = ({
  course,
  setCourse,
  updateOrderCourse,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const addModule = useAddModule();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = course.modules.findIndex((m) => m.id === active.id);
    const newIndex = course.modules.findIndex((m) => m.id === over.id);

    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: arrayMove(prev.modules, oldIndex, newIndex),
      };
    });
  };
  const handleAddModule = async () => {
    const newModule = {
      contents: [],
      course_id: course.id,
      created_at: "",
      updated_at: "",
      order: course.modules.length + 1,
      id: course.modules.length + 1,
      translations: [
        {
          title: "(Sin título)",
          description: "(Sin descripción)",
          locale: "es",
          summary: "(Sin resumen)",
          created_at: "",
          updated_at: "",
          course_module_id: course.modules.length + 1,
          id: course.modules.length + 1,
        },
      ],
    };

    await addModule.mutateAsync({ id: course.id, data: newModule });

    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: [...prev.modules, newModule],
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

  const handleSubmit = () => {
    updateOrderCourse.mutate({
      id: course.id.toString(),
      data: {
        modules: course.modules.map((module, index) => {
          return {
            id: module.id,
            order: index + 1,
          };
        }),
      },
    });
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
                  onClick={handleAddModule}
                  disabled={addModule.isPending}
                >
                  {updateOrderCourse.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Agregar módulo <Plus />
                    </>
                  )}
                </Button>
              </li>
            </ul>
          </SortableContext>
        </DndContext>
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={updateOrderCourse.isPending}
        >
          {updateOrderCourse.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseModulesCard;

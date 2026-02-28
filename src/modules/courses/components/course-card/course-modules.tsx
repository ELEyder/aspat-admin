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
import { CassetteTape, Loader2, Plus } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Dispatch,
} from "react";
import type { Course } from "../../types/Course";
import { CourseModuleCard } from "./course-module-card";
import type { UseMutationResult } from "@tanstack/react-query";
import type { UpdateCourseModulesOrderValues } from "../../hooks/useUpdateCourseModulesOrder";
import { useAddModule } from "../../hooks/useAddModule";
import { useDeleteModule } from "../../hooks/useDeleteModule";

interface CourseModulesCardProps {
  course: Course;
  setCourse: Dispatch<React.SetStateAction<Course | null>>;
  onDirtyChange: (dirty: boolean) => void;
  updateOrderCourse: UseMutationResult<
    any,
    Error,
    {
      id: string;
      data: UpdateCourseModulesOrderValues;
    },
    unknown
  >;
}

const CourseModules = forwardRef(function CourseModulesCard(
  {
    course,
    setCourse,
    onDirtyChange,
    updateOrderCourse,
  }: CourseModulesCardProps,
  ref
) {
  const sensors = useSensors(useSensor(PointerSensor));
  const addModule = useAddModule();
  const deleteModule = useDeleteModule();
  const [hasChanges, setHasChanges] = useState(false);

  const initialOrderRef = useRef(course.modules.map((m) => m.id));

  useEffect(() => {
    onDirtyChange?.(hasChanges);
  }, [hasChanges]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = course.modules.findIndex((m) => m.id === active.id);
    const newIndex = course.modules.findIndex((m) => m.id === over.id);

    setCourse((prev) => {
      if (!prev) return prev;
      const newModules = arrayMove(prev.modules, oldIndex, newIndex);
      return {
        ...prev,
        modules: newModules,
      };
    });

    const isChanged =
      JSON.stringify(
        arrayMove(course?.modules ?? [], oldIndex, newIndex).map((m) => m.id)
      ) !== JSON.stringify(initialOrderRef.current);

    setHasChanges(isChanged);
  };

  const handleAddModule = async () => {
    const newModule = {
      contents: [],
      course_id: course.id,
      created_at: "",
      updated_at: "",
      order: course.modules.length + 1,
      id: Date.now(),
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

    const res = await addModule.mutateAsync({ id: course.id, data: newModule });

    setCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: [...prev.modules, res.module],
      };
    });
  };

  const handleSubmit = async () => {
    if (!hasChanges) return;
    await updateOrderCourse.mutateAsync({
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

    initialOrderRef.current = course.modules.map((m) => m.id);
    setHasChanges(false);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <Card className="shadow-lg border border-gray-800 rounded-xl">
      <CardHeader className="border-b rounded-t-xl">
        <CardTitle className="text-lg font-semibold text-gray-200">
          Módulos del curso
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 flex flex-col gap-4">
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
                <CourseModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  setCourse={setCourse}
                  deleteModule={deleteModule}
                />
              ))}
              <li className="w-full">
                <Button
                  className="w-full"
                  variant={"secondary"}
                  onClick={handleAddModule}
                  disabled={updateOrderCourse.isPending || addModule.isPending}
                >
                  {addModule.isPending ? (
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
          disabled={updateOrderCourse.isPending || !hasChanges}
        >
          {updateOrderCourse.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <CassetteTape className="h-4 w-4 mr-2" />
              Guardar Cambios{" "}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
});

export default CourseModules;

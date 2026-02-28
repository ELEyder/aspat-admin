import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { useCourseMoule } from "../hooks/useCourseModule";
import LoadingPage from "@/pages/loading-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Loader2, CassetteTape } from "lucide-react";
import {
  CourseModuleForm,
  type CourseModuleFormValues,
} from "../components/course-module-form";
import { useUpdateCourseModule } from "../hooks/useUpdateCourseModule";
import { CourseContentCard } from "../components/course-content-card";
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
import type { CourseContent } from "../../course-contents/types/CourseContent";
import { useAddCourseContent } from "../hooks/useAddCourseContent";
import { useUpdateCourseContentsOrder } from "../hooks/useUpdateCourseContentsOrder";

const CourseModuleConfigPage: FC = () => {
  const { id } = useParams();
  const { data: module, isLoading } = useCourseMoule(id ?? "");
  const [contents, setContents] = useState<CourseContent[]>([]);
  const updateModule = useUpdateCourseModule();
  const updateContentsOrder = useUpdateCourseContentsOrder();
  const sensors = useSensors(useSensor(PointerSensor));
  const addContent = useAddCourseContent();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const translations = module?.translations ?? [];

  useEffect(() => {
    setContents(module?.contents ?? []);
  }, [module]);

  if (isLoading || !module) return <LoadingPage />;

  const handleSubmit = async (data: CourseModuleFormValues) => {
    await updateModule.mutateAsync({ id: module.id.toString(), data });
  };

  const handleSaveOrder = async () => {
    await updateContentsOrder.mutateAsync({ id: module.id.toString(), data: {
        contents: contents.map((module, index) => {
          return {
            id: module.id,
            order: index + 1,
          };
        }),
      }, });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = contents.findIndex((c) => c.id === active.id);
      const newIndex = contents.findIndex((c) => c.id === over.id);
      const newContents = arrayMove(contents, oldIndex, newIndex);
      setContents(newContents);
      setIsDirty(true);
    }
  };

  const handleAddContent = async () => {
    const newContent: CourseContent = {
      course_module_id: module.id,
      created_at: "",
      order: contents.length + 1,
      type: "default",
      url: "",
      id: 0,
      updated_at: "",
      translations: [
        {
          course_content_id: 0,
          id: 0,
          title: "(Sin título)",
          content: "(Sin descripción)",
          locale: "es",
          created_at: "",
          updated_at: "",
        },
      ],
    };

    const res = await addContent.mutateAsync({
      id: module.id,
      data: newContent,
    });

    setContents([...contents, res.content]);
  };

  return (
    <div className="absolute w-full min-h-screen bg-black">
      <div className="sticky w-full top-0 z-40 bg-black backdrop-blur-md border-b p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft /> Volver
          </Button>
          <h2 className="font-semibold text-lg">{translations[0]?.title}</h2>
          <Button
            onClick={() => console.log(module)}
            className="w-36 lg:w-auto"
            disabled={updateModule.isPending || !isDirty}
          >
            {updateModule.isPending ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
                <CassetteTape className="h-4 w-4 mr-2" />
            )}
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Traducciones</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseModuleForm
              courseModule={module}
              onSubmit={handleSubmit}
              onDirtyChange={() => {}}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Contenidos del módulo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={contents.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-3">
                  {contents.map((content, index) => (
                    <CourseContentCard
                      key={content.id}
                      index={index}
                      content={content}
                      setContents={setContents}
                    />
                  ))}
                  <Button
                    className="w-full"
                    onClick={handleAddContent}
                    disabled={addContent.isPending}
                    variant="outline"
                  >
                    {addContent.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Plus />
                    )}
                    Agregar contenido
                  </Button>

                  <Button className="w-full" onClick={handleSaveOrder} disabled={updateContentsOrder.isPending}>
                    {updateContentsOrder.isPending ? <Loader2 className="animate-spin"/> : <CassetteTape />} Guardar cambios
                  </Button>
                </ul>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseModuleConfigPage;

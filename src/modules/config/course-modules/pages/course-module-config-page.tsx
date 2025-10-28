import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { useCourseMoule } from "../hooks/useCourseModule";
import LoadingPage from "@/pages/loading-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ArrowLeft, Loader2 } from "lucide-react";
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
import type { CourseContent } from "../types/CourseContent";
import { useAddCourseContent } from "../hooks/useAddCourseContent";

const CourseModuleConfigPage: FC = () => {
  const { id } = useParams();
  const { data: module, isLoading } = useCourseMoule(id ?? "");
  const updateModule = useUpdateCourseModule();
  const sensors = useSensors(useSensor(PointerSensor));
  const addContent = useAddCourseContent();
  const [contents, setContents] = useState<CourseContent[]>([]);
  const translations = module?.translations ?? [];

  useEffect(() => {
    setContents(module?.contents ?? []);
  }, [module]);

  if (isLoading || !module) return <LoadingPage />;

  const handleSubmit = async (data: CourseModuleFormValues) => {
    await updateModule.mutateAsync({ id: module.id.toString(), data });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = contents.findIndex((c) => c.id === active.id);
      const newIndex = contents.findIndex((c) => c.id === over.id);
      const newContents = arrayMove(contents, oldIndex, newIndex);
      setContents(newContents);
    }
  };

  const handleAddContent = async () => {
    const newContent: CourseContent = {
      course_module_id: module.id,
      created_at: "",
      order: contents.length + 1,
      type: "page",
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
    <div className="absolute w-full min-h-screen bg-gray-50">
      <div className="sticky w-full top-0 z-40 bg-gray-50/90 backdrop-blur-md border-b border-gray-200 px-6 py-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft /> Volver
          </Button>
          <h2 className="font-semibold text-lg">{translations[0]?.title}</h2>
          <Button
            onClick={() => console.log(module)}
            className="w-36 lg:w-auto"
            disabled={updateModule.isPending}
          >
            {updateModule.isPending ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Datos del módulo</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Orden</label>
              <Input type="number" value={module.order} readOnly />
            </div>
            <div>
              <label className="font-medium">Creado el</label>
              <Input
                type="text"
                value={new Date(module.created_at).toLocaleString()}
                readOnly
              />
            </div>
          </CardContent>
        </Card>

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
            <Button size="sm" onClick={handleAddContent}>
              <Plus className="h-4 w-4 mr-2" /> Agregar contenido
            </Button>
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
                    />
                  ))}
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

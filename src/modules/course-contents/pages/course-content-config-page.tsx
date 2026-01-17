import { type FC } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "@/pages/loading-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, CassetteTape } from "lucide-react";

import { useCourseContent } from "../hooks/useCourseContent";
import {
  CourseContentForm,
  type CourseContentFormValues,
} from "../components/course-content-form";
import { useUpdateCourseContent } from "../hooks/useUpdateCourseContent";

const CourseContentConfigPage: FC = () => {
  const { id } = useParams();
  const { data: content, isLoading } = useCourseContent(id ?? "");
  const updateContent = useUpdateCourseContent();
  const translations = content?.translations ?? [];

  if (isLoading || !content) return <LoadingPage />;

  const handleSubmit = async (data: CourseContentFormValues) => {
    await updateContent.mutateAsync({ id: content.id.toString(), data });
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
            onClick={() => console.log(content)}
            className="w-36 lg:w-auto invisible"
            disabled={updateContent.isPending}
>
            {updateContent.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CassetteTape />
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
            <CourseContentForm
              courseContent={content}
              onSubmit={handleSubmit}
              onDirtyChange={() => {}}
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default CourseContentConfigPage;

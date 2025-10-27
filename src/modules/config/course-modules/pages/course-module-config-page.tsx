import type { FC } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseMoule } from "../hooks/useCourseModule";
import LoadingPage from "@/pages/loading-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash, ArrowLeft, Loader2 } from "lucide-react";

const CourseModuleConfigPage: FC = () => {
  const { id } = useParams();
  const { data: module, isLoading } = useCourseMoule(id ?? "");

  const [selectedLocale, setSelectedLocale] = useState("es");

  if (isLoading || !module) return <LoadingPage />;

  const translations = module.translations;

  return (
    <div className="absolute w-full min-h-screen">
      <div className="sticky w-full top-0 z-40 bg-gray-50/90 backdrop-blur-md border-b border-gray-200 px-6 py-2">
        <div className="relative py-3 px-1 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft />
              Volver
            </Button>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {translations[0]?.title}
          </div>
          <Button
            // onClick={handleSubmit}
            // disabled={
            //   !(formDirty || modulesDirty) ||
            //   updateCourse.isPending ||
            //   updateOrderCourse.isPending
            // }
            className="w-35 absolute lg:relative right-0 mr-1 lg:mr-0"
          >
            {false ? <Loader2 className="animate-spin" /> : "Guardar cambios"}
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-5xl m-auto">
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
            {translations.map((t) => (
              <div key={t.locale} className="space-y-3 mt-4">
                <div>
                  <label className="font-medium">Título</label>
                  <Input defaultValue={t.title ?? ""} />
                </div>
                <div>
                  <label className="font-medium">Resumen</label>
                  <Textarea defaultValue={t.summary ?? ""} />
                </div>
                <div>
                  <label className="font-medium">Descripción</label>
                  <Textarea defaultValue={t.description ?? ""} />
                </div>
                <Button className="mt-2">Guardar cambios</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Contenidos del módulo</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar contenido
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {module.contents.length === 0 && (
              <p className="text-gray-500">No hay contenidos en este módulo.</p>
            )}

            {module.contents.map((content) => (
              <div
                key={content.id}
                className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold">
                    {content.translations[0]?.title ?? "(Sin título)"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Tipo: {content.type.toUpperCase()} | Orden: {content.order}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseModuleConfigPage;

import type { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfigCoursesDetails } from "../hooks/useConfigCoursesDetails";
import { useParams, useSearchParams } from "react-router-dom";
import type { CourseModule } from "../types/Course";
import ReactMarkdown from "react-markdown";
import CourseContentCard from "../components/course-content-card";
import Loading from "@/components/loading";
import DefaultImage from "@/components/default-image";

const ConfigCourseDetailsPage: FC = () => {
  const { id } = useParams();
  const { data, loading } = useConfigCoursesDetails(id ?? "");
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? data?.modules[0].id.toString();

  const handleTabChange = (tab: string) => {
    window.scrollTo({ top: 0 });
    setSearchParams({ tab });
  };

  if (loading) return <Loading />
  if (!data) return <p>No se encontró el curso</p>
  
  return (
    <div className="absolute min-h-screen flex flex-col w-full bg-gray-50 ">
      <Tabs defaultValue={tab} className="gap-0 flex-1 w-full">
        <div className="sticky top-0 z-2">
          <div className="px-5 pt-5 flex flex-col items-center justify-center gap-1 bg-[oklch(0.945_0_0)]">
          </div>
          <TabsList className="flex flex-wrap gap-2 p-5 h-min w-full bg-[oklch(0.945_0_0)]">
            {data.modules.map((module: CourseModule) => (
              <TabsTrigger
                key={module.id}
                value={module.id.toString()}
                className="cursor-pointer"
                onClick={() => handleTabChange(module.id.toString())}
              >
                {module.translations[0]?.title ?? `Módulo ${module.order}`}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 flex flex-col">
          {data.modules.map((module: CourseModule) => (
            <TabsContent
              className="p-5"
              key={module.id}
              value={module.id.toString()}
            >
              <div className="grid gap-8">
                <div className="p-4 rounded-xl bg-white shadow-md flex items-end relative overflow-hidden aspect-[21/7] w-full">
                  <DefaultImage
                    className="absolute top-0 left-0 -z-0 w-full h-full object-cover"
                    src={data.image_url}
                  />
                  <h2 className="font-semibold mb-2 z-0 bg-white py-1 px-3 rounded">
                    {module.translations[0]?.title ?? `Módulo ${module.order}`}
                  </h2>
                </div>
                <div className="p-4 rounded-xl bg-white shadow-md">
                  <div className="text-black flex flex-col space-y-3 [&_img]:rounded-xl [&_img]:shadow-md [&_img]:w-full [&_img]:h-auto">
                    <ReactMarkdown>
                      {module.translations[0]?.description ?? "Sin descripción"}
                    </ReactMarkdown>
                  </div>
                </div>

                {module.contents.length > 0 && (
                  <div className="mt-3 grid gap-3">
                    {module.contents.map((content) => (
                      <CourseContentCard key={content.id} content={content} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ConfigCourseDetailsPage;

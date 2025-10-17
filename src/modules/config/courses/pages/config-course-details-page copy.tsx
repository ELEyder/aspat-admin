import { useEffect, useState, type FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseDetails } from "../hooks/useCourseDetails";
import { useParams, useSearchParams } from "react-router-dom";
import type { Course, CourseModule } from "../types/Course";
import CourseContentCard from "../components/course-content-card";
import Loading from "@/components/loading";
import DefaultImage from "@/components/default-image";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

const ConfigCourseDetailsPage: FC = () => {
  const { id } = useParams();
  const { data, loading } = useCourseDetails(id ?? "");
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? data?.modules[0].id.toString();

  const [course, setCourse] = useState<Course | null>(data ?? null);

  const updateCourseField = (updater: (draft: Course) => void) => {
    setCourse((prev) => {
      if (!prev) return prev;
      const updated = structuredClone(prev);
      updater(updated);
      return updated;
    });
  };

  const handleTabChange = (tab: string) => {
    window.scrollTo({ top: 0 });
    setSearchParams({ tab });
  };

  useEffect(() => {
    if (data) setCourse(data);
  }, [loading]);
  if (loading) return <Loading />;
  if (!data || !course) return <p>No se encontró el curso</p>;

  return (
    <div className="absolute min-h-screen flex flex-col w-full bg-gray-50 ">
      <Tabs defaultValue={tab} className="gap-0 flex-1 w-full">
        <div className="sticky top-0 z-2">
          <div className="px-5 pt-5 flex flex-col items-center justify-center gap-1 bg-[oklch(0.945_0_0)]"></div>
          <TabsList className="flex flex-wrap gap-2 p-5 h-min w-full bg-[oklch(0.945_0_0)]">
            {course.modules.map((module: CourseModule) => (
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
          {course.modules.map((module: CourseModule, i: number) => (
            <TabsContent
              className="p-5"
              key={module.id}
              value={module.id.toString()}
            >
              <div className="grid gap-8">
                <div className="p-4 rounded-xl bg-white shadow-md flex flex-col items-start justify-end relative overflow-hidden aspect-[21/7] w-full">
                  <DefaultImage
                    className="absolute top-0 left-0 -z-0 w-full h-full object-cover"
                    src={course.image_url}
                  />
                  <h2 className="font-semibold mb-2 z-0 bg-white py-1 px-3 rounded">
                    {module.translations[0]?.title ?? `Módulo ${module.order}`}
                  </h2>
                  <div className="z-0 rounded  w-full">
                    <Input
                      className="bg-white  w-full"
                      value={
                        module.translations[0]?.title ??
                        `Módulo ${module.order}`
                      }
                      onChange={(e) =>
                        updateCourseField((draft) => {
                          draft.modules[i].translations[0].title =
                            e.target.value;
                        })
                      }
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white shadow-md">
                  <div className="text-black flex flex-col space-y-3 [&_img]:rounded-xl [&_img]:shadow-md [&_img]:w-full [&_img]:h-auto">
                    <ReactMarkdown>
                      {course?.modules[i]?.translations[0]?.description ??
                        ""}
                    </ReactMarkdown>
                  </div>
                </div>

                {module.contents.length > 0 && (
                  <div className="mt-3 grid gap-3">
                    {module.contents.map((content, j) => (
                      <CourseContentCard
                        key={content.id}
                        content={content}
                        onChangeContent={(value) =>
                          updateCourseField((draft) => {
                            draft.modules[i].contents[
                              j
                            ].translations[0].content = value ?? "";
                          })
                        }
                      />
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

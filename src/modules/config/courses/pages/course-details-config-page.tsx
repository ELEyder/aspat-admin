import { useEffect, useRef, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { useCourseDetails } from "../hooks/useCourseDetails";
import type { Course } from "../types/Course";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

import CourseCard from "../components/course-card/course-card";
import CourseModulesCard from "../components/course-card/course-modules-card";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
import { useUpdateOrderModules } from "../hooks/useUpdateOrderModules";

const CourseDetailsConfigPage: FC = () => {
  const { id } = useParams();
  const { data, loading } = useCourseDetails(id);
  const [course, setCourse] = useState<Course | null>(data ?? null);
  const [formDirty, setFormDirty] = useState(false);
const [modulesDirty, setModulesDirty] = useState(false);
  const formRef = useRef<{ submit: () => Promise<void> }>(
    null
  );
  const modulesRef = useRef<{
    submit: () => Promise<void>
  }>(null);
  const updateCourse = useUpdateCourse();
  const updateOrderCourse = useUpdateOrderModules();

  useEffect(() => {
    if (data) {
      setCourse(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    await modulesRef.current?.submit();
    await formRef.current?.submit();
  };

  if (loading) return <Loading />;
  if (!data || !course)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        No se encontró el curso
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-md border-b border-gray-200 py-3 px-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!(formDirty || modulesDirty) || updateCourse.isPending || updateOrderCourse.isPending}
            className="w-35"
          >
            {updateCourse.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <CourseCard
            course={course}
            formRef={formRef}
            updateCourse={updateCourse}
            onDirtyChange={setFormDirty}
          />

          <CourseModulesCard
            course={course}
            setCourse={setCourse}
            updateOrderCourse={updateOrderCourse}
            ref={modulesRef}
            onDirtyChange={setModulesDirty}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsConfigPage;

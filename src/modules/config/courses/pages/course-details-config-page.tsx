import { useEffect, useRef, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import type { Course } from "../types/Course";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CassetteTape, Loader2 } from "lucide-react";

import CourseCard from "../components/course-card/course-card";
import CourseModules from "../components/course-card/course-modules";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
import { useUpdateCourseModulesOrder } from "../hooks/useUpdateCourseModulesOrder";
import { useCourseDetails } from "@/modules/config/courses/hooks/useCourseDetails";

const CourseDetailsConfigPage: FC = () => {
  const { id } = useParams();
  const { data, loading } = useCourseDetails(id);
  const [course, setCourse] = useState<Course | null>(null);
  const [formDirty, setFormDirty] = useState(false);
  const [modulesDirty, setModulesDirty] = useState(false);
  const formRef = useRef<{ submit: () => Promise<void> }>(null);
  const modulesRef = useRef<{
    submit: () => Promise<void>;
  }>(null);
  const updateCourse = useUpdateCourse();
  const updateOrderCourse = useUpdateCourseModulesOrder();

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
            {course.translations[0]?.title}
            {course.is_active ? (
              <div
                className={`text-center px-2 py-1 rounded-md font-medium text-green-700`}
              >
                (Activado)
              </div>
            ) : (
              <div
                className={`text-center px-2 py-1 rounded-md font-medium text-red-600`}
              >
                (Desactivado)
              </div>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={
              !(formDirty || modulesDirty) ||
              updateCourse.isPending ||
              updateOrderCourse.isPending
            }
            className="absolute lg:relative right-0 mr-1 lg:mr-0"
          >
            {updateCourse.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <><CassetteTape className="h-4 w-4 mr-2" />Guardar Cambios </>
            )}
          </Button>
        </div>
      </div>

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 ">
          <div className="flex flex-col gap-6">
            <CourseCard
              course={course}
              formRef={formRef}
              updateCourse={updateCourse}
              onDirtyChange={setFormDirty}
            />

            <CourseModules
              course={course}
              setCourse={setCourse}
              updateOrderCourse={updateOrderCourse}
              ref={modulesRef}
              onDirtyChange={setModulesDirty}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsConfigPage;

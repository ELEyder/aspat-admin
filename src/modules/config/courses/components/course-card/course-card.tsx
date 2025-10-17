import type { FC, RefObject } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseForm, type CourseFormValues } from "../course-form";
import type { Course } from "../../types/Course";
import { ReceiptTextIcon } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";

interface CourseCardProps {
  course: Course;
  formRef: RefObject<{
    submit: () => void;
  } | null>;
  updateCourse: UseMutationResult<
    any,
    Error,
    {
      id: string;
      data: CourseFormValues;
    },
    unknown
  >;
}

const CourseCard: FC<CourseCardProps> = ({ course, formRef, updateCourse }) => {
  
  const handleSubmit = async (formData: CourseFormValues) => {
    updateCourse.mutate({ id: course.id.toString() ?? "", data: formData });
  };

  return (
    <Card className="shadow-lg border border-gray-200 rounded-xl">
      <CardHeader className="border-b bg-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold text-gray-800 flex gap-2">
          <ReceiptTextIcon /> Detalles del curso
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 bg-white">
        <CourseForm ref={formRef} course={course} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
};

export default CourseCard;

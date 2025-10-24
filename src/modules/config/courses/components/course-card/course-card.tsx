import type { FC, RefObject } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseForm, type CourseFormValues } from "../course-form";
import type { Course } from "../../types/Course";
import { ReceiptTextIcon } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";

interface CourseCardProps {
  course: Course;
  onDirtyChange: (dirty: boolean) => void;
  formRef: RefObject<{
    submit: () => void;
  } | null>;
  updateCourse: UseMutationResult<
    any,
    Error,
    {
      id: string;
      data: FormData;
    },
    unknown
  >;
}

const CourseCard: FC<CourseCardProps> = ({
  course,
  formRef,
  updateCourse,
  onDirtyChange,
}) => {
  const handleSubmit = async (data: CourseFormValues) => {
    const formData = new FormData();

    formData.append("slug", data.slug);
    formData.append("is_active", data.is_active ? "1" : "0"); // Si en Zod lo transformaste a boolean

    data.translations.forEach((translation, index) => {
      formData.append(`translations[${index}][title]`, translation.title);
      formData.append(`translations[${index}][summary]`, translation.summary);
      formData.append(`translations[${index}][description]`, translation.description);
    });

    // Manejo de la imagen
    if (data.image_url instanceof File) {
      formData.append("image_file", data.image_url); // 'image_file' es el nombre que tu backend esperaría para el archivo
    } 

    await updateCourse.mutateAsync({
      id: course.id.toString() ?? "",
      data: formData,
    });
  };

  return (
    <Card className="shadow-lg border border-gray-200 rounded-xl">
      <CardHeader className="border-b bg-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold text-gray-800 flex gap-2">
          <ReceiptTextIcon /> Detalles del curso
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 bg-white">
        <CourseForm
          ref={formRef}
          course={course}
          onSubmit={handleSubmit}
          onDirtyChange={onDirtyChange}
        />
      </CardContent>
    </Card>
  );
};

export default CourseCard;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Course } from "../types/Course";
import MDEditor from "@uiw/react-md-editor";

const schema = z.object({
  slug: z.string().min(1, "El slug no puede estar vacío"),
  translations: z
    .array(
      z.object({
        title: z.string().min(1, "El título del módulo es obligatorio"),
        summary: z.string().min(1, "El título del módulo es obligatorio"),
        description: z.string().min(1, "La duración es obligatoria"),
      })
    )
    .min(1, "Debe haber al menos una traducción"),
});

export type CourseFormValues = z.infer<typeof schema>;

export const CourseForm = forwardRef(function CourseForm(
  {
    course,
    onSubmit,
    onDirtyChange
  }: {
    onSubmit: (data: CourseFormValues) => Promise<void> | void;
    course: Course;
    onDirtyChange : (dirty: boolean) => void;
  },
  ref
) {
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      slug: course.slug,
      translations: course.translations,
    },
  });

  useEffect(() => {
    setIsDirty(form.formState.isDirty);
  }, [form.formState.isDirty]);

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty]);
  
  const handleSubmit = async (data: CourseFormValues) => {
    if (!isDirty) return;
    try {
      setLoading(true);
      await onSubmit(data);
      form.reset(data);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: form.handleSubmit(handleSubmit),
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificador de URL</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="translations.0.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="translations.0.summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumen</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="translations.0.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <div data-color-mode="light">
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={300}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !isDirty}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
});

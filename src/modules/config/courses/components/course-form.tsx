import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Ban, CheckCircle2, Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const schema = z.object({
  slug: z.string().min(1, "El slug no puede estar vacío"),
  is_active: z.string(),
  image_url: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true;
      if (!(file instanceof File)) return false;
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
        "image/svg+xml",
      ];
      return allowedTypes.includes(file.type);
    }, "Debe ser una imagen válida (png, jpg, jpeg, webp, gif)"),
  translations: z
    .array(
      z.object({
        title: z.string().min(1, "El título del módulo es obligatorio"),
        summary: z.string().min(1, "El resumen es obligatorio"),
        description: z.string().min(1, "La descripción es obligatoria"),
      })
    )
    .min(1, "Debe haber al menos una traducción"),
});

export type CourseFormValues = z.infer<typeof schema>;

export const CourseForm = forwardRef(function CourseForm(
  {
    course,
    onSubmit,
    onDirtyChange,
  }: {
    onSubmit: (data: CourseFormValues) => Promise<void> | void;
    course: Course;
    onDirtyChange: (dirty: boolean) => void;
  },
  ref
) {
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    course.image_url || null
  );

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      image_url: null,
      slug: course.slug,
      is_active: course.is_active.toString(),
      translations: course.translations,
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast.error("Por favor, corrige los errores en el formulario.");
    }
  }, [form.formState.errors]);

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    form.setValue("image_url", file);
    form.trigger("image_url");
    setIsDirty(true);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="image_url"
          render={() => (
            <FormItem>
              <FormLabel>Imagen del curso</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="aspect-video object-cover rounded-lg border"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">
                        <CheckCircle2 className="text-green-600" /> Activado
                      </SelectItem>
                      <SelectItem value="0">
                        <Ban className="text-red-600" /> Desactivado
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading || !isDirty}>
          {loading ? <Loader2 className="animate-spin" /> : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
});

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CassetteTape, Loader2 } from "lucide-react";

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
import MDEditor from "@uiw/react-md-editor";

import { toast } from "sonner";
import type { CourseModule } from "../types/CourseModule";

const schema = z.object({
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

export type CourseModuleFormValues = z.infer<typeof schema>;

export const CourseModuleForm = forwardRef(function CourseForm(
  {
    courseModule,
    onSubmit,
    onDirtyChange,
  }: {
    onSubmit: (data: CourseModuleFormValues) => Promise<void> | void;
    courseModule: CourseModule;
    onDirtyChange: (dirty: boolean) => void;
  },
  ref
) {
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<CourseModuleFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      translations: courseModule.translations,
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

  const handleSubmit = async (data: CourseModuleFormValues) => {
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

        <Button type="submit" className="w-full" disabled={loading || !isDirty}>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <CassetteTape />
          )}
          Guardar Cambios
        </Button>
      </form>
    </Form>
  );
});

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CassetteTape, Loader2, Search } from "lucide-react";

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
import type { CourseContent } from "../types/CourseContent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ReactPlayer from "react-player";
import PptxViewer from "@/components/pptx-viewer";

const schema = z.object({
  translations: z
    .array(
      z.object({
        title: z.string().min(1, "El título del módulo es obligatorio"),
        content: z.string().min(1, "El contenido es obligatorio"),
      })
    )
    .min(1, "Debe haber al menos una traducción"),
  type: z.string(),
  url: z.string(),
  file: z.instanceof(File).nullable(),
});

export type CourseContentFormValues = z.infer<typeof schema>;

export const CourseContentForm = forwardRef(function CourseForm(
  {
    courseContent,
    onSubmit,
    onDirtyChange,
  }: {
    onSubmit: (data: CourseContentFormValues) => Promise<void> | void;
    courseContent: CourseContent;
    onDirtyChange: (dirty: boolean) => void;
  },
  ref
) {
  const [urlContent, setUrlContent] = useState<string>(courseContent.url ?? "");
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<CourseContentFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      translations: courseContent.translations,
      type: courseContent.type,
      file: null,
      url: courseContent.url ?? "",
    },
  });

  const type = form.watch("type");

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

  const handleSubmit = async (data: CourseContentFormValues) => {
    if (!isDirty) return;
    try {
      setLoading(true);
      await onSubmit(data);
      form.reset(data);
    } finally {
      setLoading(false);
    }
  };

  const searchVideo = () => {
    setUrlContent(form.getValues("url"));
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
          name="translations.0.content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setUrlContent("");
                  form.setValue("url", "");
                  if (value === courseContent.type) {
                    setUrlContent(courseContent.url);
                    form.setValue("url", courseContent.url ?? "");
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Por Defecto</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="ppt">PPT</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="forum">Foro</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === "video" && (
          <>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Por favor, ingresa la url del video de youtube"
                        value={field.value ?? ""}
                      />
                      <Button onClick={searchVideo} type="button">
                        <Search />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {urlContent && (
              <div className="w-full aspect-video">
                <ReactPlayer
                  src={urlContent}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}
          </>
        )}
        {type === "pdf" && (
          <>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.type !== "application/pdf") {
                          toast.error("Solo se permiten archivos PDF (.pdf)");
                          e.target.value = "";
                          return;
                        }

                        field.onChange(file);
                        const previewUrl = URL.createObjectURL(file);
                        setUrlContent(previewUrl);
                        setIsDirty(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {urlContent && (
              <div className="w-full aspect-video">
                <iframe src={urlContent} width="100%" height="100%" />
              </div>
            )}
          </>
        )}
        {type === "ppt" && (
          <>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Archivo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".ppt, .pptx"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const validExtensions = [
                            "application/vnd.ms-powerpoint",
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                          ];
                          if (!validExtensions.includes(file.type)) {
                            toast.error(
                              "Solo se permiten archivos .ppt o .pptx"
                            );
                            e.target.value = "";
                            return;
                          }

                          field.onChange(file);
                          const previewUrl = URL.createObjectURL(file);
                          setUrlContent(previewUrl);
                          setIsDirty(true);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {urlContent.includes("https") ? (
                    <div className="w-full aspect-video">
                      <PptxViewer signedUrl={urlContent} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50">
                      <p className="text-gray-600 text-sm mb-2">
                        No es posible previsualizar un archivo PPT local. Se
                        podrá visualizar una vez esté subida al servidor
                      </p>
                      <p className="text-gray-800 font-medium">
                        {field.value?.name}
                      </p>
                    </div>
                  )}
                </>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full" disabled={loading || !isDirty}>
          {loading ? <Loader2 className="animate-spin" /> : <CassetteTape />}
          Guardar Cambios
        </Button>
      </form>
    </Form>
  );
});

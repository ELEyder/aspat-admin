import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import QuizModal from "./quiz-modal/quiz-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PptxViewer from "@/components/pptx-viewer";
import type { CourseContent } from "../../course-contents/types/CourseContent";

interface RenderContentProps {
  content: CourseContent;
  openPoints: boolean;
  setOpenPoints: React.Dispatch<React.SetStateAction<boolean>>;
  onFileUpload?: (file: File) => Promise<void>;
}

export function RenderContent({ content, onFileUpload }: RenderContentProps) {
  const navigate = useNavigate();
  const [openQuiz, setOpenQuiz] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState(content.type);

  const title = content.translations[0]?.title ?? "Contenido";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onFileUpload) return;
    try {
      setUploading(true);
      await onFileUpload(file);
      toast.success("Archivo subido correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  const getAcceptType = () => {
    switch (content.type) {
      case "video":
        return "video/*";
      case "pdf":
        return "application/pdf";
      case "ppt":
        return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
      default:
        return "*/*";
    }
  };

  const renderUploadButton = () => (
    <div className="flex flex-col gap-3 mt-3">
      <label className="block">
        <input
          type="file"
          accept={getAcceptType()}
          className="hidden"
          id={`file-${content.id}`}
          onChange={handleFileChange}
        />
        <Button asChild disabled={uploading} className="cursor-pointer">
          <label htmlFor={`file-${content.id}`}>
            {uploading ? "Subiendo..." : "Subir nuevo archivo"}
          </label>
        </Button>
      </label>
    </div>
  );

  const renderTypeSelector = () => (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-medium text-sm text-bold">Tipo de contenido:</span>
      <Select value={type} onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Por Defecto</SelectItem>
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="ppt">PPT</SelectItem>
          <SelectItem value="quiz">Quiz</SelectItem>
          <SelectItem value="forum">Foro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const renderByType = () => {
    switch (type) {
      case "video": {
        if (!content.url) return renderUploadButton();

        const youtubeMatch = content.url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
        );

        return (
          <div className="flex flex-col items-center gap-3">
            {youtubeMatch ? (
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg border"
                />
              </div>
            ) : (
              <video
                controls
                className="w-full max-w-3xl mx-auto rounded-lg border"
                src={content.url}
              />
            )}
            {renderUploadButton()}
          </div>
        );
      }

      case "pdf":
        return (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
            {content.url ? (
              <>
                <iframe
                  src={content.url}
                  className="w-full aspect-[1.414] rounded-lg border"
                  title={title}
                />
                <a href={content.url} download={title + ".pdf"}>
                  <Button className="w-full">Descargar PDF</Button>
                </a>
              </>
            ) : (
              <p>No se pudo cargar el PDF.</p>
            )}
            {renderUploadButton()}
          </div>
        );

      case "ppt":
        const isProd = import.meta.env.PROD;
        return (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
            {content.url ? (
              <PptxViewer
                signedUrl={
                  isProd
                    ? content.url
                    : "https://www.nutrient.io/downloads/slides.pptx"
                }
              />
            ) : (
              <p>No se pudo cargar la presentación.</p>
            )}
            {renderUploadButton()}
          </div>
        );

      case "quiz":
        return content.quiz ? (
          <>
            <Button
              className="w-full"
              onClick={() =>
                content.quiz?.user_attempts === content.quiz?.max_attempts
                  ? toast.warning("Se alcanzó el límite de respuestas")
                  : setOpenQuiz(true)
              }
            >
              Iniciar Quiz
            </Button>
            <QuizModal
              open={openQuiz}
              setOpen={setOpenQuiz}
              quiz={content.quiz}
            />
          </>
        ) : (
          <p>No hay quiz disponible.</p>
        );

      case "forum":
        return content.forum ? (
          <Button
            className="w-full"
            onClick={() => navigate(`/forums/${content.forum?.slug}`)}
          >
            Ir al foro
          </Button>
        ) : (
          <p>No hay foro disponible.</p>
        );

      case "default":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {renderTypeSelector()}
      {renderByType()}
    </div>
  );
}

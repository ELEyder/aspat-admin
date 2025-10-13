import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QuizModal from "../components/quiz-modal/quiz-modal";
import ScoresModal from "../components/scores-modal/scores-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PptxViewer from "@/components/pptx-viewer";
import type { CourseContent } from "../types/Course";

interface RenderContentProps {
  content: CourseContent;
  openScore: boolean;
  setOpenScore: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RenderContent({
  content,
  openScore,
  setOpenScore,
}: RenderContentProps) {
  const navigate = useNavigate();
  const [openQuiz, setOpenQuiz] = useState(false);
  const title = content.translations[0]?.title ?? "Contenido";

  switch (content.type) {
    case "video": {
      if (!content.url) return null;

      const youtubeMatch = content.url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );

      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        return (
          <div className="relative aspect-video w-full max-w-3xl mx-auto">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg border"
            />
          </div>
        );
      }

      return (
        <div className="relative aspect-video w-full max-w-3xl mx-auto">
          <video
            controls
            className="w-full rounded-lg border"
            src={content.url}
          >
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      );
    }

    case "pdf":
      return (
        <div className="w-full max-w-3xl mx-auto">
          {content.url ? (
            <>
              <iframe
                src={content.url}
                className="w-full aspect-[1.414] rounded-lg border"
                title={title}
              />
              <div className="mt-3">
                <a href={content.url} download={title + ".pdf"}>
                  <Button className="w-full">Descargar PDF</Button>
                </a>
              </div>
            </>
          ) : (
            <p>No se pudo cargar el PDF.</p>
          )}
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
          <ScoresModal
            open={openScore}
            setOpen={setOpenScore}
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

    case "ppt":
      const isProd = import.meta.env.PROD; 
      return (
        <div className="w-full max-w-3xl mx-auto aspect-video">
          <PptxViewer signedUrl={ isProd ? content.url : "https://www.nutrient.io/downloads/slides.pptx"} />
        </div>
      );

    default:
      return null;
  }
}

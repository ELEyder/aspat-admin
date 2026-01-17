import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { renderIcon } from "../libs/render-icon";
import { toast } from "sonner";
import { RenderContent } from "./render-content";
import MDEditor from "@uiw/react-md-editor";
import type { CourseContent } from "../../course-contents/types/CourseContent";

interface CourseContentCardProps {
  content: CourseContent;
  onChangeContent?: (value: string | undefined) => void;
}

const CourseContentCard: FC<CourseContentCardProps> = ({
  content,
  onChangeContent,
}) => {
  const [openPoints, setOpenPoints] = useState(false);

  useEffect(() => {
    if ((content.type !== "pdf" && content.type !== "ppt") || !content.url)
      return;

    let objectUrl: string | null = null;

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [content.url, content.type]);

  return (
    <div className="p-4 rounded-xl bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex gap-2 items-center">
          {renderIcon(content.type)}
          {content.translations[0]?.title}
        </h2>
        {content.quiz && (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                content.quiz?.attempts.length === 0
                  ? toast.warning(
                      "No se encontraron calificaciones disponibles"
                    )
                  : setOpenPoints(true)
              }
            >
              Ver calificaciones
            </Button>
            <div className="py-2 px-4">
              {content.quiz.user_attempts} / {content.quiz.max_attempts}
            </div>
          </div>
        )}
      </div>
      <div className="text-black flex flex-col space-y-3 [&_img]:rounded-xl [&_img]:shadow-md [&_img]:w-full [&_img]:h-auto [&_img]:max-w-[600px] [&_img]:mx-auto">
        <MDEditor
          height={200}
          value={content.translations[0]?.content ?? ""}
          onChange={onChangeContent}
        />
      </div>
      <div className="mt-4">
        <RenderContent
          content={content}
          openPoints={openPoints}
          setOpenPoints={setOpenPoints}
        />
      </div>
    </div>
  );
};

export default CourseContentCard;

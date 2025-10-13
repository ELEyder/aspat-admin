import type { FC } from "react";
import type { Quiz } from "../../types/Quiz";

interface ScoreHeaderProps {
  quiz: Quiz;
  hasPassed: boolean;
}

const ScoreHeader: FC<ScoreHeaderProps> = ({ quiz, hasPassed }) => {
  const icon = hasPassed ? "🏆" : "📚";
  const titleColor = hasPassed ? "text-green-600" : "text-indigo-600";

  return (
    <div className="text-center space-y-2 border-b pb-4">
      <div className="flex justify-center items-center mb-2">
        <span className="text-4xl p-2 rounded-full bg-gray-100 shadow-inner">
          {icon}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-800">
        Resultados de:{" "}
        <span className={titleColor}>
          {quiz.translations?.[0]?.title ?? "Cuestionario"}
        </span>
      </h1>
      <p className="text-gray-500 text-sm italic">
        {quiz.translations?.[0]?.description ?? "Historial de intentos."}
      </p>
    </div>
  );
};

export default ScoreHeader;
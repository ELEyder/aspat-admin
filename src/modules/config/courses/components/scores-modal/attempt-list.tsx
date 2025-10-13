import type { FC } from "react";
import type { QuizAttempt } from "../../types/QuizAttempt";

interface AttemptListProps {
  attempts: QuizAttempt[];
}

const AttemptList: FC<AttemptListProps> = ({ attempts }) => {
  if (attempts.length === 0) {
    return (
      <p className="text-center p-6 text-gray-500 bg-gray-100 rounded-lg">
        Aún no tienes intentos registrados para este cuestionario. ¡Es hora de empezar!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 pr-2 flex-1 overflow-y-auto">
      {attempts
        .sort((a, b) => b.attempt_number - a.attempt_number)
        .map((attempt, index) => {
          const passed = attempt.is_passed === 1;
          const statusText = passed ? "Aprobado" : "Fallido";
          const statusIcon = passed ? "✅" : "❌";
          
          const statusClasses = passed
            ? "border-green-400 bg-green-50 hover:shadow-lg"
            : "border-red-400 bg-red-50 hover:shadow-lg";

          return (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-md border-l-4 transition-all duration-200 ease-in-out flex justify-between items-center ${statusClasses}`}
            >
              <div className="flex flex-col items-start">
                <p className="font-bold text-gray-800">
                  {statusIcon} Intento {attempt.attempt_number}
                </p>
                <p className={`text-xs font-semibold mt-1 ${passed ? "text-green-600" : "text-red-600"}`}>
                  Estatus: {statusText}
                </p>
              </div>

              <div className="text-right">
                <span className={`text-2xl font-extrabold ${passed ? "text-green-700" : "text-red-700"}`}>
                  {attempt.score}
                </span>
                <span className="text-sm font-semibold text-gray-500"> / 20 puntos</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AttemptList;
import type { Dispatch, FC, SetStateAction } from "react";
import QuestionItem from "./question-item";
import type { Quiz } from "../../types/Quiz";

interface QuizContentProps {
  quiz: Quiz;
  answers: Record<number, number | number[]>;
  setAnswers: Dispatch<SetStateAction<Record<number, number | number[]>>>;
}

const QuizContent: FC<QuizContentProps> = ({
  quiz,
  answers,
  setAnswers,
}) => {

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <p className="text-center p-8 text-gray-500">
        No hay preguntas disponibles para este cuestionario. 😢
      </p>
    );
  }

  const handleSelectSingle = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleToggleMultiple = (questionId: number, optionId: number) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as number[]) || [];
      if (current.includes(optionId)) {
        return {
          ...prev,
          [questionId]: current.filter((id) => id !== optionId),
        };
      } else {
        return { ...prev, [questionId]: [...current, optionId] };
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        {quiz.questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            question={question}
            questionNumber={index + 1}
            answers={answers}
            handleSelectSingle={handleSelectSingle}
            handleToggleMultiple={handleToggleMultiple}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizContent;

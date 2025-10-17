import type { FC } from "react";
import type { QuizOption, QuizQuestion } from "../../types/Quiz";

interface QuestionItemProps {
  question: QuizQuestion;
  questionNumber: number;
  answers: Record<number, number | number[]>;
  handleSelectSingle: (questionId: number, optionId: number) => void;
  handleToggleMultiple: (questionId: number, optionId: number) => void;
}

const QuestionItem: FC<QuestionItemProps> = ({
  question,
  questionNumber,
  answers,
  handleSelectSingle,
  handleToggleMultiple,
}) => {
  const isMultiple = question.type === "multiple_choice";
  const selectedAnswers = answers[question.id];

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
      <p className="font-bold text-lg text-gray-800 mb-3">
        {questionNumber}. {question.translations[0]?.text ?? "Pregunta sin texto"}
        {isMultiple && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Selección Múltiple)
          </span>
        )}
      </p>

      <div className="flex flex-col gap-3">
        {question.options?.map((option: QuizOption , index : number) => {
          const isSelected = isMultiple
            ? ((selectedAnswers as number[]) || []).includes(option.id)
            : selectedAnswers === option.id;

          const buttonClass = isSelected
            ? "bg-indigo-100 border-indigo-500 text-indigo-800 ring-2 ring-indigo-300"
            : "bg-white border-gray-300 hover:bg-gray-100";

          const clickHandler = isMultiple
            ? () => handleToggleMultiple(question.id, option.id)
            : () => handleSelectSingle(question.id, option.id);

          const Icon = String.fromCharCode(97 + index) + ")";

          return (
            <button
              key={option.id}
              onClick={clickHandler}
              className={`flex items-center w-full p-3 border-2 rounded-lg cursor-pointer text-left transition duration-150 ease-in-out ${buttonClass}`}
            >
              <span className="mr-3 text-xl">{Icon}</span>
              <span className="flex-1">
                {option.translations?.[0]?.text ?? "Opción sin texto"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionItem;
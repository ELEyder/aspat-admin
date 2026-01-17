import {
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import QuizContent from "./quiz-content";
import type { Quiz } from "../../types/Quiz";
import DefaultModal from "@/components/default-modal";

interface QuizModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  quiz: Quiz | null;
}

const QuizModal: FC<QuizModalProps> = ({ open, setOpen, quiz }) => {
  if (!quiz) return null;

  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});

  return (
    <>
      <DefaultModal open={open} setOpen={setOpen}>
        <div className="p-4 sm:p-6">

          <div className="mb-6 border-b pb-4">
            <h1 className="font-extrabold text-3xl text-gray-800">
              {quiz.translations?.[0]?.title ?? "Cuestionario"}
            </h1>
            <p className="text-gray-600 mt-1">
              {quiz.translations?.[0]?.description ??
                "Responde las siguientes preguntas."}
            </p>
          </div>

          <QuizContent
            quiz={quiz}
            answers={answers}
            setAnswers={setAnswers}
          />
        </div>
      </DefaultModal>
    </>
  );
};

export default QuizModal;

import { type Dispatch, type FC, type SetStateAction } from "react";
import ScoreHeader from "./scores-header";
import AttemptList from "./attempt-list";
import type { Quiz } from "../../types/Quiz";
import DefaultModal from "@/components/default-modal";

interface ScoresProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  quiz: Quiz | null;
}

const ScoresModal: FC<ScoresProps> = ({ open, setOpen, quiz }) => {
  if (!quiz) return null;

  const hasPassed = quiz.attempts.some(attempt => attempt.is_passed === 1);

  return (
    <DefaultModal open={open} setOpen={setOpen}>
      <div className="p-4 sm:p-6 space-y-6 flex flex-col h-[80vh]">
        <ScoreHeader quiz={quiz} hasPassed={hasPassed} />
        <AttemptList attempts={quiz.attempts} />
      </div>
    </DefaultModal>
  );
};

export default ScoresModal;
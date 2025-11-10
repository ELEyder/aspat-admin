import { type Dispatch, type FC, type SetStateAction } from "react";
import PointsHeader from "./pointss-header";
import AttemptList from "./attempt-list";
import type { Quiz } from "../../types/Quiz";
import DefaultModal from "@/components/default-modal";

interface PointssProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  quiz: Quiz | null;
}

const PointssModal: FC<PointssProps> = ({ open, setOpen, quiz }) => {
  if (!quiz) return null;

  const hasPassed = quiz.attempts.some(attempt => attempt.is_passed === 1);

  return (
    <DefaultModal open={open} setOpen={setOpen}>
      <div className="p-4 sm:p-6 space-y-6 flex flex-col h-[80vh]">
        <PointsHeader quiz={quiz} hasPassed={hasPassed} />
        <AttemptList attempts={quiz.attempts} />
      </div>
    </DefaultModal>
  );
};

export default PointssModal;
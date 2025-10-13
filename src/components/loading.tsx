import type { FC } from 'react';
import { LoaderCircle } from 'lucide-react';

interface LoadingProps {

}

const Loading: FC<LoadingProps> = ({ }) => {
  return (
    <div className="flex justify-center items-center col-span-full py-10">
        <LoaderCircle className="animate-spin" />
      </div>
  );
};

export default Loading;
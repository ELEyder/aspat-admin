import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Github } from "lucide-react";

interface CommitsCardProps {
  title : string;
  commmits: any[];
}

const CommitsCard: FC<CommitsCardProps> = ({ commmits, title }) => {
  return (
    <Card className="rounded-2xl shadow-sm flex-1">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-gray-600" /> {title}
        </h2>
        <ul className="space-y-3 text-gray-700">
          {commmits?.map((commit, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2 last:border-none"
            >
              <div>
                <p className="font-medium">{commit.message}</p>
                <p className="text-xs text-gray-400">
                  {commit.author} • {new Date(commit.date!).toLocaleString()}
                </p>
              </div>
              <Github className="h-5 w-5 text-gray-500" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CommitsCard;

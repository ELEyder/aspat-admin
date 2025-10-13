import { FileText, Video, File, HelpCircle } from "lucide-react";

export const renderIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="w-6 h-6 text-blue-500" />;
    case "welcome":
      return <FileText className="w-6 h-6 text-green-500" />;
    case "pdf":
      return <File className="w-6 h-6 text-red-500" />;
    case "quiz":
      return <HelpCircle className="w-6 h-6 text-purple-500" />;
    default:
      return <FileText className="w-6 h-6 text-gray-400" />;
  }
};


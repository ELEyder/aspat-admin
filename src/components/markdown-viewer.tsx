import type { FC } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownViewerProps {
  source: string;
}

const MarkdownViewer: FC<MarkdownViewerProps> = ({ source }) => {
  return (
    <div
      data-color-mode="light"
      className="text-black flex flex-col space-y-3 [&_img]:rounded-xl! [&_img]:shadow-md! [&_img]:block! [&_img]:max-w-[600px]! [&_img]:mx-auto!"
    >
      <MDEditor.Markdown rehypePlugins={[rehypeSanitize]} source={source} />
    </div>
  );
};

export default MarkdownViewer;

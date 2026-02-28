import type { Content } from "../hooks/useContents";
import MDEditor from "@uiw/react-md-editor";

interface ContentRowProps {
  content: Content;
  onUpdate: (id: string, newValue: string) => void;
}

export function ContentRow({ content, onUpdate }: ContentRowProps) {
  return (
    <div className="flex flex-col bg-gray-950 rounded-2xl overflow-hidden">
      <div data-color-mode="dark" className="p-4 space-y-2">
        <p className="w-max font-bold">{content.content_key}</p>
        <MDEditor
          value={content.content_value}
          onChange={(e) => onUpdate(content.id, e ?? "")}
        />
      </div>
    </div>
  );
}

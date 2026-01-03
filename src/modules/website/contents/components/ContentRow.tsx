import type { Content } from "../hooks/useContents";
import MDEditor from "@uiw/react-md-editor";

interface ContentRowProps {
  content: Content;
  onUpdate: (id: string, newValue: string) => void;
}

export function ContentRow({ content, onUpdate }: ContentRowProps) {
  return (
    <div className="flex flex-col space-y-2 p-2">
      <p className="w-max font-bold">{content.content_key}</p>
      <div data-color-mode="light">
        <MDEditor
          value={content.content_value}
          onChange={(e) => onUpdate(content.id, e ?? "")}
        />
      </div>
    </div>
  );
}

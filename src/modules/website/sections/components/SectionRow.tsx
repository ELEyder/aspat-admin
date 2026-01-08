import { Input } from "@/components/ui/input";
import type { PageSection } from "../hooks/useSections";
import MDEditor from "@uiw/react-md-editor";

interface SectionRowProps {
  section: PageSection;
  onUpdate: (newSection: PageSection) => void;
}

export function SectionRow({ section, onUpdate }: SectionRowProps) {

  const handleOnChange  = (value : string, type : "title" | "description") => {
    const newSection : PageSection = {
      ...section,
      [type] : value
    }
    
    onUpdate(newSection)
  }

  return (
    <div className="flex flex-col space-y-2 p-2">
      <p className="w-max font-bold">{section.section_key} - Título</p>
      <div data-color-mode="light">
        <Input
          value={section.title}
          onChange={(e : any) => handleOnChange(e.target.value, "title")}
        />

      </div>
       <p className="w-max font-bold">{section.section_key} - Descripción</p>
      <div data-color-mode="light">
        <MDEditor
          value={section.description ?? ""}
          onChange={(value) => handleOnChange(value ?? "", "description")}
        />
      
      </div>
    </div>
  );
}

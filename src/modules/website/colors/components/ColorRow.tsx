import type { Color } from "@/modules/website/colors/hooks/useColors";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface ColorRowProps {
  color: Color;
  defaultColor?: string;
  onUpdate: (id: string, newValue: string) => void;
}

export function ColorRow({
  color,
  onUpdate,
  defaultColor = "",
}: ColorRowProps) {
  const [localValue, setLocalValue] = useState(color.value);

  return (
    <div className="flex gap-4 sm:items-center p-6 flex-col-reverse sm:flex-row">
      <div className="flex space-x-4">
        <div
          className="w-16 h-16 rounded border"
          style={{ backgroundColor: defaultColor }}
        ></div>
        <ArrowRight className="self-center" />
        <input
          type="color"
          className="w-16 h-16 rounded"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={() => onUpdate(color.id, localValue)}
        />
      </div>
      <div>
        <p className="w-max text-xl font-bold">{color.title}</p>
        <p className="w-max">{color.description}</p>
      </div>
    </div>
  );
}

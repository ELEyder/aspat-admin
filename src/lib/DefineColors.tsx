import { useColors, type Color } from "@/modules/website/colors/hooks/useColors";

export default function DefineColors() {
  const { data } = useColors();

  data?.map((color: Color) => {
    document.documentElement.style.setProperty(`--${color.key}`, color.value);
  });
  
  return null;
}

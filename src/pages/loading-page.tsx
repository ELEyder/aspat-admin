import { type FC } from "react";
import { LoaderCircle } from "lucide-react";

const LoadingPage: FC = () => {
  return (
    <section
      className="w-full h-screen flex items-center justify-center"
      aria-busy="true"
      aria-label="Cargando contenido"
    >
      <div>
        <LoaderCircle className="animate-spin"/>
      </div>
    </section>
  );
};

export default LoadingPage;

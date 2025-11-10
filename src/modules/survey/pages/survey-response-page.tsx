import { type FC } from "react";
// import { useParams } from "react-router-dom";
import Loading from "@/components/loading";
import { useSurveyResponses } from "../hooks/useSurveyResponses";

// TEST - Detalles de la encuesta respondida (Por mejorar)
const SurveyResponsesPage: FC = () => {
  // const { surveyId } = useParams<{ surveyId: string }>();
  const { data: survey, isLoading, isError } = useSurveyResponses("1");

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error al cargar las respuestas.
      </p>
    );

  if (!survey)
    return <p className="text-center mt-10">No hay respuestas aún.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {survey.translations[0].title} - Respuestas
      </h1>

      {survey.questions.map((q: any) => (
        <div key={q.id} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{q.translations[0].question}</h2>

          {q.responses.length === 0 ? (
            <p className="text-gray-500">No hay respuestas para esta pregunta.</p>
          ) : (
            <div className="grid gap-4">
              {q.responses.map((r: any) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <p className="font-medium">
                    <span className="text-gray-600">Usuario: </span>
                    {r.user?.name ?? `ID ${r.user_id}`}
                  </p>
                  <p>
                    <span className="text-gray-600">Valoración: </span>
                    {r.rating ?? "-"}
                  </p>
                  <p>
                    <span className="text-gray-600">Respuesta: </span>
                    {r.text_response ?? "-"}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(r.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SurveyResponsesPage;

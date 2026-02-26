import type { FC } from 'react';
import { useSurveys } from '../hooks/useSurveys';
import Loading from '@/components/loading';

const SurveysPage: FC = () => {
  const { data, loading } = useSurveys();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <div>
      <h1>Encuestas de Satisfación</h1>
    </div>
      {data.map(survey => (
        <p key={survey.id}>{survey.translations[0].title}</p>
      ))}
    </>
  );
};

export default SurveysPage;
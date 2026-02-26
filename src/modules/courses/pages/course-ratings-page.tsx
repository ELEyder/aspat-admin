import type { FC } from 'react';
import { useCourseRatings } from '../hooks/useCourseRatings';
import { useParams } from 'react-router-dom';

interface CourseRatingsPageProps {
  
}

const CourseRatingsPage: FC<CourseRatingsPageProps> = ({ }) => {
  const { id } = useParams();
  const { data } = useCourseRatings(id);

  if (!data) {
    return <div>No ratings found.</div>;
  }
  
  return (
    <div>
      {data.map(rating => (
        <p key={rating.id}>{rating.id}</p>
      ))}
      <h1>CourseRatingsPage works!</h1>
    </div>
  );
};

export default CourseRatingsPage;
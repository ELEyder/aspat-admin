import { DataTable } from "../../../components/data-table";
import { columns } from "../configs/course-requests.config";
import { useCoursesRequests } from "../hooks/use-course-requests";

export default function CourseRequestsPage() {
  const { data } = useCoursesRequests(1, 20);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Cursos Solicitados</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

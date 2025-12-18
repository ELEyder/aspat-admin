import { DataTable } from "../../../components/data-table";
import { columns } from "../configs/course-requests.config";
import { useContributorRequests } from "../hooks/useContributorRequest";

export default function ContributorRequestsPage() {
  const { data } = useContributorRequests(1, 20);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Contribuyentes Solicitados</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

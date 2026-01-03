import { columns } from "../configs/service-requests.config";
import { useServiceRequest } from "../hooks/useServiceRequest";
import { DataTable } from "../../../components/data-table";

export default function ServiceRequestsPage() {
  const { data, loading  } = useServiceRequest(1,10);
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Servicios Solicitados</h1>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}

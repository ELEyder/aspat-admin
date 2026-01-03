import { DataTable } from "../../../components/data-table";
import { columns } from "../configs/events.config";
import { useEvents } from "../hooks/useEvents";

export default function EventsPage() {
  const { data } = useEvents();
  
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Eventos</h1>
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  )
}

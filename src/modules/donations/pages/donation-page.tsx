import { DataTable } from "../../../components/data-table";
import { columns } from "../configs/donations.config";
import { useDontations } from "../hooks/useDontations";

export default function DonationsPage() {
  const { data } = useDontations(1,10);
  console.log(data)
  
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Donaciones</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

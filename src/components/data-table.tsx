import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>(
    columns[0]?.id || ""
  );
  const [filterValue, setFilterValue] = useState("");

  const colHeader = columns.find(col => col.id === selectedColumn)?.header ?? "";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: (filters) => setColumnFilters(filters),
    state: { columnFilters },
  });

  const handleFilterChange = (value: string) => {

    setFilterValue(value);
    if (!selectedColumn) return;

    table.getAllColumns().forEach((col) => col.setFilterValue(undefined));

    table.getColumn(selectedColumn)?.setFilterValue(value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Select
          value={selectedColumn}
          onValueChange={(value) => setSelectedColumn(value)}
        >
          <SelectTrigger className="border rounded px-2 py-1">
            <SelectValue placeholder="Selecciona una columna" />
          </SelectTrigger>
          <SelectContent>
            {columns
              .filter((col) => col.id)
              .map((col) => {
                return (
                <SelectItem key={col.id} value={col.id ?? "id"}>
                  {col.header as string}
                </SelectItem>
              )
              })}
          </SelectContent>
        </Select>

        <Input
          placeholder={selectedColumn ? `Filtrar por "${colHeader}"` : "Selecciona una columna"}
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="max-w-sm"
          disabled={selectedColumn ? false : true}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas a mostrar <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.columnDef.header as string}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

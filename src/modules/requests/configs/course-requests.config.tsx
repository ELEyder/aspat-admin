
import { type ColumnDef } from "@tanstack/react-table"
import type { CourseRequest } from "../types/CourseRequest"

export const columns: ColumnDef<CourseRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "xd",
    header: "XD",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
]

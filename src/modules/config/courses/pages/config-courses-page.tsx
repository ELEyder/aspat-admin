import type { FC } from "react";
import { useConfigCourses } from "../hooks/useConfigCourses";
import Loading from "@/components/loading";
import { DataTable } from "@/components/data-table";
import { columns } from "../configs/config-courses.config";

const ConfigCoursesPage: FC = () => {
  const { data, loading } = useConfigCourses();

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default ConfigCoursesPage;

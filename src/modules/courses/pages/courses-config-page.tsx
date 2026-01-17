import type { FC } from "react";
import { useCourses } from "../hooks/useCourses";
import Loading from "@/components/loading";
import { DataTable } from "@/components/data-table";
import { columns } from "../configs/courses.config";

const CoursesConfigPage: FC = () => {
  const { data, loading } = useCourses();

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursesConfigPage;

import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, BookOpen, Settings } from "lucide-react";
import { useCommits } from "../hooks/useCommits";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { data } = useCommits();

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex flex-col items-center">
            <Users className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-500">Usuarios</p>
            <p className="text-xl font-bold">1,245</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-500">Cursos</p>
            <p className="text-xl font-bold">37</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex flex-col items-center">
            <BarChart3 className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-gray-500">Visitas</p>
            <p className="text-xl font-bold">12,430</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex flex-col items-center">
            <Settings className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-500">Configuración</p>
            <p className="text-xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
          <ul className="space-y-3 text-gray-700">
              {data?.map((commit) => (
              <li>• {commit.message}</li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;

import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, BookOpen, Settings, Bell, Activity, Github } from "lucide-react";
import { useCommits } from "../hooks/useCommits";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { data } = useCommits();

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center">
            <Users className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-500">Usuarios</p>
            <p className="text-xl font-bold">1,245</p>
            <span className="text-xs text-green-500 mt-1">+12% desde el mes pasado</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-500">Cursos</p>
            <p className="text-xl font-bold">37</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center">
            <BarChart3 className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-gray-500">Visitas</p>
            <p className="text-xl font-bold">12,430</p>
            <span className="text-xs text-red-500 mt-1">-5% desde ayer</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center">
            <Settings className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-500">Configuración</p>
            <p className="text-xl font-bold">5</p>
            <span className="text-xs text-gray-400 mt-1">Pendientes</span>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-600" /> Actividad Reciente
          </h2>
          <ul className="space-y-3 text-gray-700">
            {data?.map((commit, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2 last:border-none">
                <div>
                  <p className="font-medium">{commit.message}</p>
                  <p className="text-xs text-gray-400">
                    {commit.author} • {new Date(commit.date!).toLocaleString()}
                  </p>
                </div>
                <Github className="h-5 w-5 text-gray-500" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-4">
            <Bell className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Notificaciones</p>
              <p className="font-bold">8 pendientes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-4">
            <Github className="h-6 w-6 text-gray-700" />
            <div>
              <p className="text-sm text-gray-500">Commits recientes</p>
              <p className="font-bold">{data?.length || 0}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-4">
            <Settings className="h-6 w-6 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Configuración rápida</p>
              <p className="font-bold">3 cambios</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

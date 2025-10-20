import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings,
  Bell,
  Activity,
  Github,
  Users,
  BookOpen,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useCommits } from "../hooks/useCommits";
import { useStats } from "../hooks/useStats";
import Loading from "@/components/loading";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { data } = useCommits();
  const { data: stats } = useStats();

  const iconMap = {
    users: Users,
    book: BookOpen,
    "bar-chart": BarChart3,
    settings: Settings,
  };

  if (!stats) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const subtitleColor = stat.subtitle.startsWith("+")
            ? "text-green-500"
            : "text-red-500";
          const Icon = iconMap[stat.icon];
          return (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col items-center">
                <Icon className={`h-8 w-8 ${stat.color} mb-2`} />
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <span className={`text-xs mt-1 ${subtitleColor}`}>
                  {stat.subtitle}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-600" /> Actividad Reciente
          </h2>
          <ul className="space-y-3 text-gray-700">
            {data?.map((commit, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2 last:border-none"
              >
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
              <p className="font-bold">En proceso</p>
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
              <p className="font-bold">En porceso</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

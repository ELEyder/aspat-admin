import type { FC } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Users, BookOpen, BarChart3 } from "lucide-react";
import { useCommits } from "../hooks/useCommits";
import { useStats } from "../hooks/useStats";
import Loading from "@/components/loading";
import CommitsCard from "../components/commits-card";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const { data } = useCommits();
  const { data: stats } = useStats();
  const navigate = useNavigate();

  const iconMap = {
    users: Users,
    book: BookOpen,
    "bar-chart": BarChart3,
    settings: Settings,
  };

  if (!stats || !data) return <Loading />;

  return (
    <div
      className="p-6 space-y-10 min-h-screen
    bg-linear-to-br
    from-blue-50 via-white to-indigo-100
    dark:from-zinc-900 dark:via-zinc-950 dark:to-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Panel de Control ASPAT PERÚ
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Revisa la actividad reciente y métricas de los proyectos en un solo
          lugar
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const subtitleColor = stat.subtitle.startsWith("+")
            ? "text-green-500"
            : "text-red-500";
          const Icon = iconMap[stat.icon];
          const colors = [
            "from-blue-500 to-indigo-500",
            "from-purple-500 to-pink-500",
            "from-green-500 to-emerald-400",
            "from-orange-400 to-amber-500",
          ];
          const bgGradient = colors[index % colors.length];
          const links = ["/users", "/courses", "/stats", "/settings"];
          return (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Card
                className="cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-black backdrop-blur-md border border-gray-900"
                onClick={() => navigate(links[index])}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className={`bg-linear-to-br ${bgGradient} p-3 rounded-full shadow-md mb-3`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-200 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-200 mt-1">
                    {stat.value}
                  </p>
                  <span className={`text-xs mt-1 ${subtitleColor}`}>
                    {stat.subtitle}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="space-y-6">
        {Object.entries({
          "Actividad Reciente de ASPAT PERÚ": data.aspat,
          "Actividad Reciente de ASPAT BACKEND": data["aspat-backend"],
          "Actividad Reciente de ASPAT PLATFORM": data["aspat-platform"],
          "Actividad Reciente de ASPAT ADMIN": data["aspat-admin"],
        }).map(([title, commits], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <CommitsCard commmits={commits} title={title} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

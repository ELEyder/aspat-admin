import {
  ChevronDown,
  ChevronUp,
  Home,
  IdCard,
  Inbox,
  LogOut,
  Settings,
  StoreIcon,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Link, useLocation } from "react-router-dom";
import { useLogin } from "@/modules/auth/hooks/use-login";
import { toast } from "sonner";

export function AppSidebar() {
  const location = useLocation();
  const { logout } = useLogin();

  const items = [
    {
      title: "Inicio",
      url: "/",
      icon: Home,
    },
    {
      title: "Solicitudes",
      icon: Inbox,
      children: [
        { title: "Servicios", url: "/requests/services" },
        { title: "Cursos", url: "/requests/courses" },
      ],
    },
    {
      title: "Configuración",
      icon: Settings,
      children: [
        { title: "Cursos", url: "/config/courses" },
        { title: "Usuarios", url: "/configuracion/usuarios" },
        { title: "Roles", url: "/configuracion/roles" },
        { title: "Permisos", url: "/configuracion/permisos" },
      ],
    },
    {
      title: "Cerrar Sesión",
      onClick: async () => {
        try {
          const response = await logout();
          if (response.message) {
            toast.success(response.message);
          }
        } catch (error) {
          toast.error("Error cerrando sesión. Se forzó el logout.");
        } finally {
          setTimeout(() => {
            window.location.href = import.meta.env.PROD
              ? "https://platform.aspatperu.org.pe"
              : "http://localhost:5174";
          }, 1000);
        }
      },
      icon: LogOut,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrador</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isParentActive =
                  item.children?.some((sub) => location.pathname === sub.url) ??
                  false;
                return item.children ? (
                  <SidebarMenuItem key={item.title}>
                    <Collapsible
                      className="group/collapsible"
                      defaultOpen={isParentActive}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={
                            isParentActive
                              ? "bg-muted text-primary font-medium"
                              : ""
                          }
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenu className="pl-6">
                          {item.children.map((sub) => {
                            const active = location.pathname === sub.url;
                            return (
                              <SidebarMenuItem key={sub.title}>
                                <SidebarMenuButton
                                  asChild
                                  className={
                                    active
                                      ? "bg-muted text-primary font-medium"
                                      : ""
                                  }
                                >
                                  <Link to={sub.url}>{sub.title}</Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        location.pathname === item.url
                          ? "bg-muted text-primary font-medium"
                          : ""
                      }
                    >
                      {item.onClick ? (
                        <button
                          onClick={item.onClick}
                          className="flex items-center cursor-pointer"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <Link to={item.url} className="flex items-center">
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <img
                    src="/images/avatar.jpg"
                    className="w-7 border rounded-full overflow-hidden"
                  />
                  Admin
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <User2 /> <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IdCard /> <span>Métodos de Pago</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StoreIcon /> <span>Mi Pedido</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

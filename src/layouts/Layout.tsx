import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider className="w-screen min-h-screen flex">
      <AppSidebar />
      <main className="flex-1 max-h-screen overflow-auto relative">
        <div className="md:hidden fixed bottom-5 right-5 w-10 h-10 rounded-full shadow-lg shadow-black/50 flex items-center justify-center z-20 bg-white">
          <SidebarTrigger />
        </div>
        <div className="min-h-full space-y-12 relative flex flex-col overflow-x-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

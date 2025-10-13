import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="md:hidden fixed bottom-5 right-5 w-10 h-10 rounded-full shadow-lg shadow-black/50 flex items-center justify-center z-2 bg-white">
          <SidebarTrigger />
        </div>
        <main className="w-full min-h-full space-y-12 relative flex flex-col">
          <Outlet />
        </main>
      </main>
    </SidebarProvider>
  );
}

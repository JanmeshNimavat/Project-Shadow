import { Sidebar } from "../../components/Sidebar";
import { Topnav } from "../../components/Topnav";
import { Chatbot } from "../../components/Chatbot";
import { BottomNav } from "../../components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-primary-900 text-foreground selection:bg-accent-purple/30">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden relative pb-16 md:pb-0">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-accent-blue/10 blur-[100px] -z-10 pointer-events-none" />
        <Topnav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 z-10 relative">
          {children}
        </main>
      </div>
      <BottomNav />
      <Chatbot />
    </div>
  );
}

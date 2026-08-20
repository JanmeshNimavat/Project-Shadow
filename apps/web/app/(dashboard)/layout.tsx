import { Sidebar } from "../../components/Sidebar";
import { Topnav } from "../../components/Topnav";
import { Chatbot } from "../../components/Chatbot";

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
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-accent-blue/10 blur-[100px] -z-10 pointer-events-none" />
        <div className="flex items-center justify-between md:hidden p-4 border-b border-border bg-primary-800">
          <div className="font-display font-bold text-white flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Aegis Mobile
          </div>
          <span className="text-xs text-gray-500">Rotate to landscape or use PC</span>
        </div>
        <div className="hidden md:block">
          <Topnav />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 z-10 relative">
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}

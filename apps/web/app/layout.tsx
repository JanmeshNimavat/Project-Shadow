import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "../components/Sidebar";
import { Topnav } from "../components/Topnav";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShadowWatch | Cyber Intelligence Portal",
  description: "Cyber Crime Reporting & Evidence Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen overflow-hidden bg-primary-900 text-foreground selection:bg-accent-purple/30">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-[300px] bg-accent-blue/10 blur-[100px] -z-10 pointer-events-none" />
              <Topnav />
              <main className="flex-1 overflow-y-auto p-8 z-10">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

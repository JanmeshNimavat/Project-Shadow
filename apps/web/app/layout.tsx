import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Roboto, Rubik, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ["latin"], variable: '--font-sans' });
const rubik = Rubik({ subsets: ["latin"], variable: '--font-display' });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const viewport: Viewport = {
  themeColor: "#0A0A0C", // Darker premium theme color
}

export const metadata: Metadata = {
  title: "Aegis | Cyber Intelligence Portal",
  description: "Cyber Crime Reporting & Evidence Management System",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`\${roboto.variable} \${rubik.variable} \${jetBrainsMono.variable} font-sans bg-[#0A0A0C] text-white selection:bg-accent-blue/30 selection:text-accent-blue antialiased`}>
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-800/40 via-[#0A0A0C] to-[#0A0A0C]"></div>
          {children}
          <Toaster theme="dark" position="bottom-right" toastOptions={{
            style: { background: '#111213', border: '1px solid #2C2F33', color: '#F4F5F7' }
          }} />
        </body>
      </html>
    </ClerkProvider>
  );
}

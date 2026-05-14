import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "ProfeCheck",
  description: "Sistema escolar de asistencia"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen text-brand-50 antialiased">
        <AnimatedBackground />
        <main className="relative z-10 mx-auto min-h-screen max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}

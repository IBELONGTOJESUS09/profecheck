import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProfeCheck",
  description: "Sistema escolar de asistencia"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}

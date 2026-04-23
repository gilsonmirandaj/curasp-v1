import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CuraSP",
  description: "Agenda curada de shows e eventos em São Paulo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Randevu & Shop", template: "%s | Randevu & Shop" },
  description: "Online randevu ve alışveriş deneyimi",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body><AuthProvider>{children}</AuthProvider></body></html>;
}

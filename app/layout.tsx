import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plot UI — A kit for internal tools",
  description:
    "Dark editorial UI kit extracted from the Plot design language. Drop into any internal Next.js tool.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

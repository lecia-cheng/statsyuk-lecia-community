import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Statsyuk - Hockey Community Platform",
  description: "A hockey community platform for players and fans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


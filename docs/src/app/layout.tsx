import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Potter Labs API Documentation",
  description: "API concepts and guides for Potter Labs AI services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientBody className={inter.className}>
        {children}
      </ClientBody>
    </html>
  );
}

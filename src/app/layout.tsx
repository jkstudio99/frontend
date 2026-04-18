import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevPortal",
  description: "Medicine Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

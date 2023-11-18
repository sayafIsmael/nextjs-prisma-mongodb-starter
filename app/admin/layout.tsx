import type { Metadata } from "next";
import AuthProvider from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Your admin panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}

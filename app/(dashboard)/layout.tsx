import Nnavbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nnavbar />
      <div className="grid lg:grid-cols-6 h-screen">
        <Sidebar className="lg:block" />
        <div className="col-span-3 lg:col-span-5 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </>
  );
}

import { MainNav } from "@/components/main-nav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toogle";
import { UserNav } from "@/components/user-nav";

const Nnavbar = async () => {
  return (
    <div className="border-b">
      <div className="flex items-center h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-6">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Nnavbar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbSection } from "react-icons/tb";
import { ImBlogger2 } from "react-icons/im";
import { MdDashboard, MdCleaningServices, MdCategory } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { IoPricetagsSharp } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  interface route {
    icon: React.ReactNode;
    href: string;
    label: string;
    active: boolean;
  }

  interface SidebarRoute {
    name: string;
    routes: route[];
  }

  const routeIconClass = "mr-2 h-4 w-4";

  const SidebarRoutes: SidebarRoute[] = [
    {
      name: "Overview",
      routes: [
        {
          icon: <MdDashboard className={routeIconClass} />,
          href: `/`,
          label: "Dashboard",
          active: pathname === `/`,
        },
      ],
    },
    {
      name: "Blog",
      routes: [
        {
          icon: <MdCategory className={routeIconClass} />,
          href: `/blog/category`,
          label: "Category",
          active: pathname === `/blog/category`,
        },
        {
          icon: <IoPricetagsSharp className={routeIconClass} />,
          href: `/blog/tags`,
          label: "Tags",
          active: pathname === `/blog/tags`,
        },
        {
          icon: <ImBlogger2 className={routeIconClass} />,
          href: `/blog`,
          label: "Blogs",
          active: pathname === `/blog`,
        },
      ],
    },
    {
      name: "Contents",
      routes: [
        {
          icon: <MdCleaningServices className={routeIconClass} />,
          href: `/services`,
          label: "services",
          active: pathname === `/services`,
        },
        {
          icon: <GrProjects className={routeIconClass} />,
          href: `/projects`,
          label: "Projects",
          active: pathname === `/projects`,
        },
      ],
    },
    {
      name: "User Interface",
      routes: [
        {
          icon: <TbSection className={routeIconClass} />,
          href: `/sections`,
          label: "Sections",
          active: pathname === `/sections`,
        },
        {
          icon: <RiPagesFill className={routeIconClass} />,
          href: `/pages`,
          label: "Pages",
          active: pathname === `/pages`,
        },
      ],
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {SidebarRoutes?.map(({ name, routes }, index) => (
          <div className="px-3 py-2" key={index}>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {name}
            </h2>
            {routes?.map(({ icon, href, label, active }, index) => (
              <div className="space-y-1">
                <Link href={href} key={index}>
                  <Button
                    variant={active ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {icon}
                    {label}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

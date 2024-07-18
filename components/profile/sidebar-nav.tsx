"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { deleteCookieAsync } from "@/lib/cookies/cookies";
import { useAuth } from "../common/AuthWrapper";
import { toast } from "sonner";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col justify-between px-4 lg:px-0",
        className
      )}
      {...props}
    >
      <div className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent ",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <Button
        onClick={() => {
          deleteCookieAsync("token");
          setIsAuthenticated(false);
          toast.success("We will miss you");
          router.refresh();
        }}
        variant={"ghost"}
        className=" justify-start mt-20"
      >
        Logout
      </Button>
    </nav>
  );
}

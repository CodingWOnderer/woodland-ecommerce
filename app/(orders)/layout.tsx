import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/profile/sidebar-nav";
import ProfileNav from "@/components/profile/profile-nav";
import FramerTransition from "@/components/common/FramerTransition";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Orders",
    href: "/orders",
  },
];

const CollectionLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <FramerTransition>
      <ContentLayout>
        <main className="flex md:container min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  p-4 md:gap-8 md:p-10">
          <div>
            <ProfileNav />
            <Separator />
            <div className="flex mt-8  flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-screen-2xl">{children}</div>
            </div>
          </div>
        </main>
      </ContentLayout>
    </FramerTransition>
  );
};

export default CollectionLayout;

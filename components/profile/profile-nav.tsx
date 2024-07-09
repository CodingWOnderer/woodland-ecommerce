"use client";
import { usePathname } from "next/navigation";

const ProfileNav = () => {
  const pathname = usePathname();
  return (
    <div className="mx-auto grid w-full pb-10 gap-2">
      <h1 className="text-3xl font-semibold">
        {pathname.split("/")[1][0].toLocaleUpperCase() +
          pathname.split("/")[1].slice(1)}
      </h1>
    </div>
  );
};

export default ProfileNav;

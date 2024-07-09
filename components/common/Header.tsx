"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { NavbarItems, WomenNavbarItems } from "@/lib/model/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import useWoodlandStoreData from "@/lib/store/store";

const NavItem = ({ item }: { item: CategoryProps }) => (
  <div className={cn("w-full h-fit shadow-none", item.extraStyle)}>
    <header className="pb-2 pt-0">
      <h2 className="text-primary pt-0 font-bold border-b border-primary pb-2">
        {item.heading}
      </h2>
    </header>
    <main>
      <ul>
        {item.subHeadings.map((subItem, ind) => (
          <li key={ind} className="text-[14px] font-semibold">
            <Link href={subItem.href}>
              <h3>{subItem.name}</h3>
            </Link>
            {subItem.nestedItem && subItem.nestedItem.length > 0 && (
              <div className="flex flex-col font-normal ml-10">
                {subItem.nestedItem.map((nestedItem, nestedInd) => (
                  <Link href={nestedItem.href} key={nestedInd}>
                    {nestedItem.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  </div>
);

const NavSection = ({
  label,
  items,
}: {
  label: string;
  items: CategoryProps[];
}) => (
  <li>
    <Popover>
      <PopoverTrigger className="text-primary transition font-bold hover:text-primary/75">
        {label}
      </PopoverTrigger>
      <PopoverContent className="mt-4 hidden lg:block overflow-hidden border-none pb-0 w-screen">
        <div className="container h-[750px] gap-6 grid grid-cols-5 auto-rows-max">
          {items.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </li>
);

const Header = () => {
  const { toggleSidebar, sidebar, toggleSearchSheet } = useWoodlandStoreData();
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, ease: "easeIn" }}
      className="bg-white"
    >
      <div className="flex bg-background h-16 container mx-auto gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block" href="/">
          <Image height={20} width={80} alt="woodland" src="/headerlogo.png" />
        </Link>

        <div className="flex flex-1 items-center justify-end lg:justify-between">
          <nav aria-label="Global" className="hidden lg:block">
            <ul className="flex items-center justify-center gap-6 text-sm">
              <NavSection label="Men" items={NavbarItems} />
              <NavSection label="Women" items={WomenNavbarItems} />
              <li>
                <Popover>
                  <PopoverTrigger className="text-primary transition font-bold hover:text-primary/75">
                    Brands
                  </PopoverTrigger>
                  <PopoverContent className="mt-4 hidden lg:block border-none w-screen">
                    <div className="container grid grid-cols-3 gap-3 mx-auto">
                      {[
                        { img: "woods.png", link: "woods" },
                        { img: "woodsport.png", link: "woodsports" },
                        { link: "askatingmonk", img: "askatingmonk.png" },
                      ].map((src, index) => (
                        <Link
                          key={index}
                          href={`/collections?brand=${src.link}`}
                        >
                          <Image
                            src={`/${src.img}`}
                            className="rounded"
                            height={450}
                            width={500}
                            alt="loading.."
                          />
                        </Link>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
              {["About Us", "Labs", "Sale"].map((label, index) => (
                <li key={index}>
                  <Link
                    className="text-primary transition font-bold hover:text-primary/75"
                    href={`/${label
                      .split(" ")[0]
                      .toLowerCase()
                      .replace(/\s/g, "")}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Button
                variant="ghost"
                onClick={() => toggleSearchSheet(true)}
                className="text-primary justify-start border-primary/60 space-x-2 border w-[150px]"
              >
                <Search size={16} />
                <span>Search</span>
              </Button>
            </div>

            <button
              onClick={() => toggleSidebar(!sidebar)}
              className="block rounded p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

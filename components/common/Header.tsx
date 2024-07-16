"use client";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GenderMenCategory from "@/components/common/GenderMenCategory";
import GenderWomenCategory from "@/components/common/GenderWomenCategory";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useWoodlandStoreData from "@/lib/store/store";
import { motion } from "framer-motion";

const NavigationMenuDemo = () => {
  const { toggleSidebar, sidebar, toggleSearchSheet } = useWoodlandStoreData();
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-full">
      <NavigationMenu.List className="m-0 flex w-[97vw] justify-between overflow-hidden list-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ delay: 1, ease: "easeInOut" }}
          className="flex justify-between w-full max-w-screen-2xl lg:px-20 md:px-10 mx-auto"
        >
          <div className="items-center flex">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className=" block select-none rounded-[4px] px-3 text-[15px] font-medium leading-none no-underline outline-none "
                href={"/"}
              >
                <Image
                  height={20}
                  width={80}
                  alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                  src="/headerlogo.png"
                />
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <nav className=" mt-3.5 hidden lg:flex">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className=" group relative after:content-[''] after:h-[1.5px] after:bg-primary after:bottom-0 after:left-0 after:absolute after:w-0 after:data-[state='open']:w-full after:data-[state='open']:transition-all after:transition-all flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[14px] font-bold text-primary leading-none outline-none ">
                  Men
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft  data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-screen">
                  <GenderMenCategory />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className=" group relative after:content-[''] after:h-[1.5px] after:bg-primary after:bottom-0 after:left-0 after:absolute  after:w-0 after:data-[state='open']:w-full after:data-[state='open']:transition-all after:transition-all flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[14px] font-bold text-primary leading-none outline-none ">
                  Women
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft  data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-screen border-b bg-white">
                  <GenderWomenCategory />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className=" group flex relative after:content-[''] after:h-[1.5px] after:bg-primary after:bottom-0 after:left-0 after:absolute  after:w-0 after:data-[state='open']:w-full after:data-[state='open']:transition-all after:transition-all select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[14px] font-bold text-primary leading-none outline-none ">
                  Brands
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute list-none top-0 left-0 w-screen border-b bg-white">
                  <div className="max-w-screen-xl mx-auto  grid grid-cols-3  ">
                    {[
                      { img: "woods.png", link: "woods" },
                      { img: "woodsport.png", link: "woodsports" },
                      { link: "askatingmonk", img: "askatingmonk.png" },
                    ].map((src, index) => (
                      <ListItem
                        key={index}
                        href={`/collections?brand=${src.link}`}
                      >
                        <Image
                          src={`/${src.img}`}
                          className="rounded"
                          height={450}
                          width={500}
                          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                        />
                      </ListItem>
                    ))}
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <div className="flex"></div>
              {["About Us", "Labs", "Sale"].map((label, index) => (
                <NavigationMenu.Item key={index}>
                  <NavigationMenu.Link
                    className=" group relative after:content-[''] after:h-[1.5px] after:bg-primary after:bottom-0 after:left-0 after:absolute hover:after:w-full after:w-0 hover:after:transition-all transition-all flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[14px] font-bold text-primary leading-none outline-none "
                    href={`/${label
                      .split(" ")[0]
                      .toLowerCase()
                      .replace(/\s/g, "")}`}
                  >
                    {label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </nav>
          </div>
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
        </motion.div>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 right-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative rounded-none h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden  bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default NavigationMenuDemo;

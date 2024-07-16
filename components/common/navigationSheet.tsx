"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { IoMdClose } from "react-icons/io";
import { NavbarItems, WomenNavbarItems } from "@/lib/model/data";
import Link from "next/link";
import useWoodlandStoreData from "@/lib/store/store";
import { cn } from "@/lib/utils";

const brand = [
  { img: "Woods", link: "/collections?brand=woods" },
  { img: "Woodsport.", link: "/collections?brand=woodsports" },
  { link: "/collections?brand=askatingmonk", img: "A Skating Monk" },
];

const renderAccordionItems = (
  items: CategoryProps[],
  toggle: (value: boolean) => void,
  sidebar: boolean
) => (
  <Accordion type="single" collapsible>
    {items.map((item, index) => (
      <AccordionItem
        key={`${item.heading}-${index}`}
        value={`${item.heading}-${index}`}
        className={items.length - 1 === index ? "border-none" : " "}
      >
        <AccordionTrigger className="hover:no-underline px-4">
          {item.heading}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="px-4">
            {item.subHeadings.length > 0 &&
              item.subHeadings.map((subItem, ind) => (
                <li
                  onClick={() => toggle(!sidebar)}
                  key={ind}
                  className={cn(
                    "px-2 py-4",
                    ind === item.subHeadings.length - 1 ? "" : "border-b"
                  )}
                >
                  <Link href={subItem.href}>{subItem.name}</Link>
                </li>
              ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const NavigationSheet = () => {
  const { toggleSidebar, sidebar } = useWoodlandStoreData();

  return (
    <Sheet open={sidebar} onOpenChange={toggleSidebar}>
      <SheetContent className="sm:min-w-[500px] min-w-[100vw]">
        <SheetHeader className="space-y-0 flex justify-between flex-row">
          <SheetTitle className="text-xl">
            <a className="block" href="/">
              <Image
                height={20}
                width={80}
                alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                src="/headerlogo.png"
              />
            </a>
          </SheetTitle>
          <SheetClose>
            <IoMdClose size={26} />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="[&>div>div[style]]:!block h-[90vh]">
          <div className="flex flex-col">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                  Men
                </AccordionTrigger>
                <AccordionContent>
                  {renderAccordionItems(NavbarItems, toggleSidebar, sidebar)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline">
                  Women
                </AccordionTrigger>
                <AccordionContent>
                  {renderAccordionItems(
                    WomenNavbarItems,
                    toggleSidebar,
                    sidebar
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:no-underline">
                  Brand
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion
                    type="single"
                    className="flex flex-col"
                    collapsible
                  >
                    {brand.map((item, index) => (
                      <Link
                        className={cn(
                          "  py-4 px-2 font-medium",
                          index == brand.length - 1 ? "" : "border-b"
                        )}
                        key={index}
                        href={item.link}
                      >
                        {item.img}
                      </Link>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <ul>
              {["About Us", "Labs", "Sale"].map((label, ind) => (
                <li key={ind} className=" py-4 border-b">
                  <Link
                    onClick={() => toggleSidebar(!sidebar)}
                    className="text-sm font-medium"
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
          </div>
        </ScrollArea>
        <Separator className="mt-6" />
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;

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
import useWoodlandStoreData from "@/lib/store/store";
import { Separator } from "@radix-ui/react-separator";
import { IoMdClose } from "react-icons/io";
import { NavbarItems, WomenNavbarItems } from "@/lib/model/data";
import Link from "next/link";

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
                  className="px-2 py-4 border-b"
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
      <SheetContent className="min-w-[500px]">
        <SheetHeader className="space-y-0 flex justify-between flex-row">
          <SheetTitle className="text-xl">
            <a className="block" href="/">
              <Image
                height={20}
                width={80}
                alt="woodland"
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
            </Accordion>
            <ul>
              {["About Us", "Labs", "Sale"].map((label, ind) => (
                <li key={ind} className=" py-4 border-b">
                  <Link
                    onClick={() => toggleSidebar(!sidebar)}
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

"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdClose } from "react-icons/io";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useWoodlandStoreData from "@/lib/store/store";

interface PriceRange {
  label: string;
  min: string;
  max: string;
}

const PRICE_RANGES: PriceRange[] = [
  { label: "Less than 1,000", min: "0", max: "1000" },
  { label: "1,000 - 3,000", min: "1000", max: "3000" },
  { label: "3,000 - 5,000", min: "3000", max: "5000" },
  { label: "5,000 - 7,000", min: "5000", max: "7000" },
  { label: "7,000 - 9,000", min: "7000", max: "9000" },
  { label: "more than 9,000", min: "9000", max: "40000" },
];

const FilterSheet: React.FC = () => {
  const {
    colorFilter,
    setColorFilter,
    sizeFilter,
    setSizeFilter,
    priceFilter,
    setPriceFilter,
    filterSheet,
    setFilterSheet,
  } = useWoodlandStoreData();

  const toggleSelection =
    <T extends { selected: boolean }>(
      filter: T[],
      setFilter: (value: T[]) => void,
      key: keyof T
    ) =>
    (item: T) => {
      setFilter(
        filter.map((f) =>
          f[key] === item[key] ? { ...f, selected: !f.selected } : f
        )
      );
    };

  return (
    <Sheet open={filterSheet} onOpenChange={(e) => setFilterSheet(e)}>
      <SheetContent side="left">
        <SheetHeader className="flex flex-row w-full items-center justify-between">
          <SheetTitle className="text-xl">Product Filters</SheetTitle>
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="h-[80vh] my-5">
          <Accordion type="multiple">
            <AccordionItem value="price">
              <AccordionTrigger className="hover:no-underline">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={priceFilter}
                  className="space-y-3 p-3"
                  onValueChange={setPriceFilter}
                >
                  {PRICE_RANGES.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={`minPrice=${item.min}&maxPrice=${item.max}`}
                        id={`price${index}`}
                      />
                      <Label htmlFor={`price${index}`}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="size">
              <AccordionTrigger className="hover:no-underline">
                Size
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-4 p-4">
                  {sizeFilter.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-10 transition-all text-center cursor-pointer border flex justify-center items-center w-16 border-primary text-xs rounded",
                        item.selected
                          ? "bg-primary text-primary-foreground"
                          : ""
                      )}
                      onClick={() =>
                        toggleSelection(sizeFilter, setSizeFilter, "size")(item)
                      }
                    >
                      {item.size}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color">
              <AccordionTrigger className="hover:no-underline">
                Color
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 p-4">
                  {colorFilter.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        toggleSelection(
                          colorFilter,
                          setColorFilter,
                          "code"
                        )(item)
                      }
                    >
                      <div
                        style={{ backgroundColor: item.code }}
                        className={cn(
                          "h-8 transition-all cursor-pointer border w-8 rounded-full",
                          item.selected
                            ? "border-2 outline-primary outline border-white"
                            : ""
                        )}
                      ></div>
                      <span className="my-1 text-xs lowercase">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
        <SheetFooter>
          <Button
            onClick={() => setFilterSheet(false)}
            className="w-full rounded-none cursor-pointer"
          >
            SHOW PRODUCTS
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;

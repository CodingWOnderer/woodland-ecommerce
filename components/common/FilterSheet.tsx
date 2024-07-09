"use client";
import React, { useState, useEffect } from "react";
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

interface Color {
  name: string;
  code: string;
  selected: boolean;
}

interface Size {
  size: string;
  selected: boolean;
}

interface PriceRange {
  label: string;
  min: string;
  max: string;
}

const COLORS: Color[] = [
  { name: "WHITE", code: "#FFFFFF", selected: false },
  { name: "BLUE", code: "#0000FF", selected: false },
  { name: "MAROON", code: "#800000", selected: false },
  { name: "CAMOUFLAGE", code: "#78866B", selected: false },
  { name: "OLIVE", code: "#808000", selected: false },
  { name: "BLACK", code: "#000000", selected: false },
  { name: "PURPLE", code: "#800080", selected: false },
  { name: "BROWN", code: "#A52A2A", selected: false },
  { name: "GREEN", code: "#008000", selected: false },
  { name: "GREY", code: "#808080", selected: false },
  { name: "PINK", code: "#FFC0CB", selected: false },
  { name: "ORANGE", code: "#FFA500", selected: false },
  { name: "YELLOW", code: "#FFFF00", selected: false },
  { name: "NAVY", code: "#000080", selected: false },
  { name: "TAN", code: "#D2B48C", selected: false },
  { name: "RED", code: "#FF0000", selected: false },
];

const SIZES: Size[] = [
  "26", "28", "30", "32", "33", "34", "35", "36", "37", "38", "39",
  "40", "41", "42", "43", "44", "45", "46", "47", "XS", "S", "M", 
  "L", "XL", "XXL", "2X",
].map(size => ({ size, selected: false }));

const PRICE_RANGES: PriceRange[] = [
  { label: "Less than 1,000", min: "0", max: "1000" },
  { label: "1,000 - 3,000", min: "1000", max: "3000" },
  { label: "3,000 - 5,000", min: "3000", max: "5000" },
  { label: "5,000 - 7,000", min: "5000", max: "7000" },
  { label: "7,000 - 9,000", min: "7000", max: "9000" },
  { label: "more than 9,000", min: "9000", max: "40000" },
];

const FilterSheet: React.FC = () => {
   const { colorFilter, setColorFilter, sizeFilter, setSizeFilter, priceFilter, setPriceFilter,filterSheet,setFilterSheet } = useWoodlandStoreData();
 

  const toggleSelection = <T extends { selected: boolean }>(
    filter: T[],
    setFilter:  (value: T[]) => void,
    key: keyof T
  ) => (item: T) => {
    setFilter(filter.map(f => f[key] === item[key] ? { ...f, selected: !f.selected } : f));
  };

  const generateURLParams = () => {
    const params: Record<string, string[]> = { color: [], size: [] };

    colorFilter.forEach(item => {
      if (item.selected) {
        params.color.push(item.code);
      }
    });

    sizeFilter.forEach(item => {
      if (item.selected) {
        params.size.push(item.size);
      }
    });

    if (priceFilter) {
      const [min, max] = priceFilter.split("&").map(param => param.split("=")[1]);
      params.minPrice = [min];
      params.maxPrice = [max];
    }

    const urlSearchParams = new URLSearchParams();
    for (const [key, values] of Object.entries(params)) {
      values.forEach(value => {
        urlSearchParams.append(key, value);
      });
    }
    console.log(params)

    return urlSearchParams.toString();
  };

  useEffect(() => {
    console.log(generateURLParams());
  }, [colorFilter, sizeFilter, priceFilter]);

  return (
    <Sheet open={filterSheet} onOpenChange={(e) => setFilterSheet(e)}>
      <SheetContent side="left">
        <SheetHeader className="flex items-center justify-between">
          <SheetTitle className="text-xl">Product Filters</SheetTitle>
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="h-[80vh] my-5">
          <Accordion type="multiple">
            <AccordionItem value="price">
              <AccordionTrigger className="hover:no-underline">Price</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={priceFilter} onValueChange={setPriceFilter}>
                  {PRICE_RANGES.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={`minPrice=${item.min}&maxPrice=${item.max}`} id={`price${index}`} />
                      <Label htmlFor={`price${index}`}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="size">
              <AccordionTrigger className="hover:no-underline">Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-4 p-4">
                  {sizeFilter.map((item, index) => (
                    <div
                      key={index}
                      className={cn("h-8 transition-all text-center cursor-pointer border flex justify-center items-center w-8 rounded", 
                        item.selected ? "bg-primary text-primary-foreground" : "")}
                      onClick={() => toggleSelection(sizeFilter, setSizeFilter, "size")(item)}
                    >
                      {item.size}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color">
              <AccordionTrigger className="hover:no-underline">Color</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 p-4">
                  {colorFilter.map((item, index) => (
                    <div key={index} onClick={() => toggleSelection(colorFilter, setColorFilter, "code")(item)}>
                      <div
                        style={{ backgroundColor: item.code }}
                        className={cn("h-8 transition-all cursor-pointer border w-8 rounded-full", 
                          item.selected ? "border-2 outline-primary outline border-white" : "")}
                      ></div>
                      <span className="my-1 text-xs">{item.name}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
        <SheetFooter>
          <Button onClick={() => setFilterSheet(false)} className="w-full rounded-none cursor-pointer">
            SHOW PRODUCTS
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import useWoodlandStoreData from "@/lib/store/store";

const FilterHeader = () => {
    const {setFilterSheet,filterSheet,sortFilter,setSortFilter} = useWoodlandStoreData();

  return (
    <div className="flex justify-between items-center py-4">
      <Button onClick={()=>setFilterSheet(!filterSheet)} variant={"outline"} className="space-x-2 text-primary border border-primary rounded-none">
        <span className="text-primary">FILTERS</span>
        <SlidersHorizontal />
      </Button>
      <Select value={sortFilter} onValueChange={(e)=>setSortFilter(e)}>
        <SelectTrigger className="space-x-2 text-primary border w-[180px] border-primary rounded-none">
          <SelectValue className="text-primary font-semibold" placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="discounthigh" className="focus:bg-primary focus:text-primary-foreground">Discount high to low</SelectItem>
          <SelectItem value="pricehigh" className="focus:bg-primary focus:text-primary-foreground">Price high to low</SelectItem>
          <SelectItem value="pricelow" className="focus:bg-primary focus:text-primary-foreground">Price low to high</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterHeader;

"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./table-filter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TabledataStructure } from "./columns";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TabledataStructure[];
}

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col md:flex-row flex-1 items-center space-y-2 md:space-y-0 md:space-x-2">
        {table.getColumn("state") && (
          <DataTableFacetedFilter
            column={table.getColumn("state")}
            title="State"
            options={[...new Set(data.map((item) => item?.state))]}
          />
        )}

        {table.getColumn("city") && (
          <DataTableFacetedFilter
            column={table.getColumn("city")}
            title="city"
            options={[...new Set(data.map((item) => item?.city))]}
          />
        )}

        <Input
          placeholder="Filter Pincode..."
          value={(table.getColumn("pincode")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("pincode")?.setFilterValue(event.target.value)
          }
          className="h-8 md:w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2  lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";

const tableObjSchema = z.object({
  address: z.string(),
  city: z.string(),
  contactNo: z.string(),
  id: z.string(),
  location: z.string(),
  name: z.string(),
  pincode: z.string(),
  state: z.string(),
  zone: z.string(),
});

export type TabledataStructure = z.infer<typeof tableObjSchema>;

export const columns: ColumnDef<TabledataStructure>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium whitespace-nowrap leading-6 text-sm">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <span className="text-base">Address</span>,
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("address")}
      </div>
    ),
  },
  {
    accessorKey: "pincode",
    header: "Pincode",
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("pincode")}
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("state")}
      </div>
    ),
  },
  {
    accessorKey: "contactNo",
    header: "Phone no",
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("contactNo")}
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("city")}
      </div>
    ),
  },

  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => (
      <div className="font-medium leading-6 text-sm">
        {row.getValue("zone")}
      </div>
    ),
  },
];

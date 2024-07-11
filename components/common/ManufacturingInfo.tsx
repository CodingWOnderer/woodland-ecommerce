import { IManufacturingInfo } from "@/lib/store/types";
import React from "react";


const headerHeight = "100px";

const ManufacturingIndo = ({
  productCode,
  articalCode,
  division,
  color,
  Measurement,
  Mrp,
  MaterialUsed,
  DesignedFor,
  PackagingQty,
  OriginCountry,
  MarketedBy,
}:Partial<IManufacturingInfo>) => {
  const ImportProduct = [
    {
      title: "Product Code",
      details: `${productCode} (Art No : ${articalCode})`,
    },
    {
      title: "Product Description",
      details: `Type : ${division}`,
    },
    {
      title: "Color",
      details: `${color}`,
    },
    {
      title: "Measurement",
      details: `${Measurement ? Measurement : " No size selected"}`,
    },
    {
      title: "MRP",
      details: `₹ ${Mrp} (Maximum retail price inclusive of all taxes)`,
    },
    {
      title: "Material Used",
      details: `${MaterialUsed}`,
    },
    {
      title: "Designed For",
      details: `${DesignedFor}`,
    },
    {
      title: "Packaging Quantity",
      details: `${PackagingQty}`,
    },
    {
      title: "Origin Country",
      details: `${OriginCountry}`,
    },
    {
      title: "Marketed By",
      details: `${MarketedBy}`,
    },
    {
      title: "Care Email ",
      details: "care@woodlandworldwide.com",
    },
  ];

  return (
    <div
      className="flex justify-between items-center"
      style={{ height: headerHeight }}
    >
      <div className="flex-1 overflow-y-auto">
        {ImportProduct.map((val, idx) => (
          <div
            key={idx}
            className="p-1 flex sm:flex-row flex-col items-center border border-gray-300"
          >
            <p className="text-sm font-normal text-black sm:w-1/3 w-full">
              {val.title}
            </p>
            <p className="text-sm font-semibold text-black mt-1 sm:mt-0 sm:w-2/3 w-full">
              {val.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManufacturingIndo;

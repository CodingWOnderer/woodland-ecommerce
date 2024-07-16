import { cn } from "@/lib/utils";
import React from "react";

const gendertitle =
  "text-base font-semibold leading-6 text-primary font-semibold";

function SizeGuidsBottoms() {
  const womenFootwear = [
    {
      head: "UK SIZE",
      size: ["S", "M", "L", "XL", "XXL"],
    },
    {
      head: "EURO SIZE",
      size: ["34-35", "36-37", "38-39", "40-41", "42-44"],
    },
    {
      head: "SIZE IN CM",
      size: ["86-89", "91-94", "96-99", "101-104", "106-111"],
    },
  ];
  const menbottom = [
    {
      head: "UK SIZE",
      size: [5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      head: "EURO SIZE",
      size: [39, 40, 41, 42, 43, 44, 45, 46],
    },
    {
      head: "SIZE IN CM",
      size: [24, 25, 26, 27, 28, 29, 30, 31],
    },
  ];

  return (
    <div>
      <div className="mt-2">
        <h3 className={` ${gendertitle}`}>MEN’S FOOTWEAR SIZE</h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-[#ededed]">
                    <th
                      scope="col"
                      className="py-3 pl-4  pr-3 text-left text-xs fontbold uppercase tracking-wide text-gray-950 sm:pl-0"
                    >
                      {menbottom[0].head}
                    </th>
                    {menbottom[0].size.map((size, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {menbottom.map((val, idx) => (
                    <tr key={idx} className={" even:bg-[#ededed]"}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-bold text-gray-900 sm:pl-0">
                        {val.head}
                      </td>
                      {val.size.map((v, i) => (
                        <td
                          key={i}
                          className="whitespace-nowrap px-3 py-4 text-xs text-gray-500 text-center"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className={` ${gendertitle}`}>WOMEN’S FOOTWEAR SIZE</h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className={" bg-[#ededed]"}>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wide text-gray-950 sm:pl-0"
                    >
                      {womenFootwear[0].head}
                    </th>
                    {womenFootwear[0].size.map((size, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {womenFootwear.map((val, idx) => (
                    <tr key={idx} className={" even:bg-[#ededed]"}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-bold text-gray-900 sm:pl-0">
                        {val.head}
                      </td>
                      {val.size.map((v, i) => (
                        <td
                          key={i}
                          className="whitespace-nowrap px-3 py-4 text-xs text-gray-500 text-center"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeGuidsBottoms;

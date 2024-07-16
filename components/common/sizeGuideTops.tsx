import React from "react";
import { cn } from "@/lib/utils";

const gendertitle = "text-base font-semibold leading-6 text-primary";

function SizeGuidTop() {
  const womentop = [
    {
      head: "SIZE",
      size: ["S", "M", "L", "XL", "XXL"],
    },
    {
      head: "CHEST",
      measure: "(IN INCHES)",
      size: ["34-35", "36-37", "38-39", "40-41", "42-44"],
    },
    {
      head: "CHEST",
      measure: "(IN CM)",
      size: ["86-89", "91-94", "96-99", "101-104", "106-111"],
    },
  ];

  const womenbottom = [
    {
      head: "SIZE",
      size: ["S", "M", "L", "XL", "XXL"],
    },
    {
      head: "WAIST",
      measure: "(IN INCHES)",
      size: ["26-27", "28-29", "30-31", "33-35", "36-38"],
    },
    {
      head: "WAIST",
      measure: "(IN CM)",
      size: ["66-68", "71-73", "76-79", "83-88", "91-96"],
    },
  ];

  const mentop = [
    {
      head: "SIZE",
      size: ["S", "M", "L", "XL", "XXL"],
    },
    {
      head: "CHEST",
      measure: "(IN INCHES)",
      size: ["36-38", "38-40", "40-42", "42-44", "44-46"],
    },
    {
      head: "CHEST",
      measure: "(IN CM)",
      size: ["91-96", "97-101", "102-106", "107-111", "112-116"],
    },
  ];

  const menbottom = [
    {
      head: "SIZE",
      size: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      head: "WAIST",
      measure: "(IN INCHES)",
      size: ["28", "29-30", "31-32", "33-34", "36", "40"],
    },
    {
      head: "WAIST",
      measure: "(IN CM)",
      size: ["71", "74-76", "79-81", "84-86", "91", "96"],
    },
  ];

  return (
    <div className="pb-20">
      <div className="mt-2">
        <h3 className={`${gendertitle}`}>MEN’S TOP</h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-[#ededed]">
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wide text-gray-950 sm:pl-0"
                    >
                      {mentop[0].head}
                    </th>
                    {mentop[0].size.map((size, idx) => (
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
                  {mentop.map((val, idx) => (
                    <tr key={idx} className={"even:bg-[#ededed]"}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-bold text-gray-900 sm:pl-0">
                        {val.head}
                        <br />
                        <span className="text-gray-500 text-sm">
                          {val?.measure}
                        </span>
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
        <h3 className={`${gendertitle}`}>MEN’S BOTTOM</h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-[#ededed]">
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wide text-gray-950 sm:pl-0"
                    >
                      {menbottom[0].head}
                    </th>
                    {menbottom[0].size.map((size, idx) => (
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
                  {menbottom.map((val, idx) => (
                    <tr key={idx} className={"even:bg-[#ededed]"}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-bold text-gray-900 sm:pl-0">
                        {val.head}
                        <br />
                        <span className="text-gray-500 text-sm">
                          {val?.measure}
                        </span>
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
        <h3 className={`${gendertitle}`}>WOMEN’S TOP</h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-[#ededed]">
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wide text-gray-950 sm:pl-0"
                    >
                      {womentop[0].head}
                    </th>
                    {womentop[0].size.map((size, idx) => (
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
                  {womentop.map((val, idx) => (
                    <tr key={idx} className={"even:bg-[#ededed]"}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-bold text-gray-900 sm:pl-0">
                        {val.head}
                        <br />
                        <span className="text-gray-500 text-sm">
                          {val?.measure}
                        </span>
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
        <h3 className={`${gendertitle}`}>WOMEN’S BOTTOM</h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-[#ededed]">
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wide text-gray-950 sm:pl-0"
                    >
                      {womenbottom[0].head}
                    </th>
                    {womenbottom[0].size.map((size, idx) => (
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
                  {womenbottom.map((val, idx) => (
                    <tr key={idx} className={"even:bg-[#ededed]"}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-bold text-gray-900 sm:pl-0">
                        {val.head}
                        <br />
                        <span className="text-gray-500 text-sm">
                          {val?.measure}
                        </span>
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

export default SizeGuidTop;

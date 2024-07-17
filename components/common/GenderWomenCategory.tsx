import { women } from "@/lib";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const headingStyle =
  "font-bold text-base border-b border-gray-300  cursor-pointer text-primary";
const subDivisionStyle =
  "font-bold text-[13px] text-black hover:underline cursor-pointer";
const extraSubdivision =
  "ml-5 text-[13px] font-medium  hover:underline antialiased text-black cursor-pointer";

const GenderWomenCategory: FC = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-col  container mx-auto md:flex-row">
      <div className="md:w-1/5 p-4 pt-1">
        <div className={headingStyle}>Woods</div>
        <div className="font-bold text-[13px] text-black cursor-pointer">
          <Link href="/collections/Footwear?brand=woods&gender=WOMEN">
            Footwear
          </Link>
        </div>
        <div
          className={cn(
            subDivisionStyle,
            pathname === "/collections/Garment" ? "text-primary" : ""
          )}
        >
          <Link href="/collections/Garment?brand=woods&gender=WOMEN">
            Apparels
          </Link>
        </div>
        <div
          className={cn(
            subDivisionStyle,
            pathname === "/collections/Accessories" ? "text-primary" : ""
          )}
        >
          <Link href="/collections/Accessories?brand=woods&gender=WOMEN">
            Accessories
          </Link>
        </div>
        <div className={headingStyle}>
          <Link href={"/collections?brand=woodsports"}>Woodsports</Link>
        </div>
        <div className={headingStyle}>StreetWear</div>
        <div
          className={cn(
            subDivisionStyle,
            pathname === "/collections/Footwear" ? "text-primary" : ""
          )}
        >
          <Link href="/collections/Footwear?brand=askatingmonk&gender=WOMEN">
            Footwear
          </Link>
        </div>
        <div
          className={cn(
            subDivisionStyle,
            pathname === "/collections/GARMENT" ? "text-primary" : ""
          )}
        >
          <Link href="/collections/GARMENT?brand=askatingmonk&gender=WOMEN">
            Apparels
          </Link>
        </div>
        <div
          className={cn(
            subDivisionStyle,
            pathname === "/collections/Accessories" ? "text-primary" : ""
          )}
        >
          <Link href="/collections/Accessories?brand=askatingmonk&gender=WOMEN">
            Accessories
          </Link>
        </div>
      </div>
      <div className="md:w-4/5 p-4 pt-1">
        <div className="flex flex-wrap">
          {women.map((val, idx) => (
            <div key={idx} className="md:w-1/4 p-2">
              <div className="ml-3">
                <div className={headingStyle}>{val.division}</div>
                {val.category.map((category, idx) => (
                  <div key={idx}>
                    <div
                      className={cn(
                        subDivisionStyle,
                        pathname === category.target ? "text-primary" : ""
                      )}
                    >
                      <Link href={category.target}>{category.name}</Link>
                    </div>
                    {category.haschild &&
                      category.subCategory.map((sub, subIdx) => (
                        <div
                          key={subIdx}
                          className={cn(
                            extraSubdivision,
                            pathname === sub.target ? "text-primary" : ""
                          )}
                        >
                          <Link href={sub.target}>{sub.name}</Link>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              {val.extradivision?.map((extra, extraIdx) => (
                <div key={extraIdx} className="ml-3">
                  <div className={headingStyle}>{extra.division}</div>
                  {extra.category.map((category, idx) => (
                    <div key={idx}>
                      <div
                        className={cn(
                          subDivisionStyle,
                          pathname === category.target ? "text-primary" : ""
                        )}
                      >
                        <Link href={category.target}>{category.name}</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {val.extradivisionone?.map((extra, extraIdx) => (
                <div key={extraIdx} className="ml-3">
                  <div className={headingStyle}>{extra.division}</div>
                  {extra.category.map((category, idx) => (
                    <div key={idx}>
                      <div
                        className={cn(
                          subDivisionStyle,
                          pathname === category.target ? "text-primary" : ""
                        )}
                      >
                        <Link href={category.target}>{category.name}</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenderWomenCategory;

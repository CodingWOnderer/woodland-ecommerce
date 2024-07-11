import { FC } from "react";
import Link from "next/link";
import { men } from "@/lib";

const headingStyle = "font-bold text-base border-b border-gray-300 mt-2 cursor-pointer text-primary"
const subDivisionStyle = "font-bold text-[13px] text-black hover:text-gray-800 cursor-pointer"
const extraSubdivision = "ml-5 text-[13px] font-medium hover:text-gray-400 antialiased text-black cursor-pointer"

const GenderMenCategory: FC = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className={headingStyle}>Woods</h3>
          <ul>
            <li className={subDivisionStyle}>
              <Link href="/collections/Footwear?brand=woods&gender=MEN">
                Footwear
              </Link>
            </li>
            <li className={subDivisionStyle}>
              <Link href="/collections/Garment?brand=woods&gender=MEN">
                Apparels
              </Link>
            </li>
            <li className={subDivisionStyle}>
              <Link href="/collections/Accessories?brand=woods&gender=MEN">
                Accessories
              </Link>
            </li>
          </ul>
          <h3 className={headingStyle}>
            <Link href={"/collections?brand=woodsports"}>Woodsports</Link>
          </h3>
          <h3 className={headingStyle}>StreetWear</h3>
          <ul>
            <li className={subDivisionStyle}>
              <Link href="/collections/Footwear?brand=askatingmonk&gender=MEN">
                Footwear
              </Link>
            </li>
            <li className={subDivisionStyle}>
              <Link href="/collections/Garment?brand=askatingmonk&gender=MEN">
                Apparels
              </Link>
            </li>
            <li className={subDivisionStyle}>
              <Link href="/collections/Accessories?brand=askatingmonk&gender=MEN">
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-10">
          <div className="grid grid-cols-4 gap-4">
            {men.map((val, idx) => (
              <div key={idx}>
                <h3  className={headingStyle}>{val.division}</h3>
                {val.category.map((category, idx) => (
                  <div key={idx} >
                    <h4 className={subDivisionStyle}>
                      <Link href={category.target}>{category.name}</Link>
                    </h4>
                    {category.haschild &&
                      category.subCategory.map((sub, subIdx) => (
                        <div key={subIdx} className={extraSubdivision}>
                          <Link href={sub.target}>{sub.name}</Link>
                        </div>
                      ))}
                  </div>
                ))}
                {val.extradivision?.map((val, idx) => (
                  <div key={idx}>
                    <h3 className={headingStyle}>{val.division}</h3>
                    {val.category.map((category, idx) => (
                      <div key={idx} >
                        <h4 className={subDivisionStyle}>
                          <Link href={category.target}>{category.name}</Link>
                        </h4>
                      </div>
                    ))}
                  </div>
                ))}
                {val.extradivisionone?.map((val, idx) => (
                  <div key={idx} className="mt-4">
                    <h3 className={headingStyle}>{val.division}</h3>
                    {val.category.map((category, idx) => (
                      <div key={idx} >
                        <h4 className={subDivisionStyle}>
                          <Link href={category.target}>{category.name}</Link>
                        </h4>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderMenCategory;

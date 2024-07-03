"use client";
import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { salefemale, salemale } from "@/lib/model/data";
import { motion } from "framer-motion";

const SalePage = () => {
  return (
    <ContentLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", delay: 1, staggerChildren: 0.5 }}
        className="relative w-full aspect-[1902/335]"
      >
        <Image
          src="https://assets.woodlandworldwide.app/woodland-images/may2024/sale_men_banner.png"
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          quality={100}
          fill
          style={{ objectFit: "contain", verticalAlign: "bottom" }}
        />
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", delay: 1.5 }}
      >
        <div className="mx-auto container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {salemale.map((maleItem, index) => (
              <li key={index}>
                <Link
                  href={maleItem.link}
                  className="group block overflow-hidden"
                >
                  <Image
                    src={maleItem.img}
                    alt={maleItem.title}
                    width={450}
                    height={450}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative flex flex-col bg-white pt-3">
                    <h3 className="text-lg font-bold text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {maleItem.title}
                    </h3>

                    <span className="tracking-wider text-xs text-red-500 font-extrabold">
                      {maleItem.offer}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
      <div className="relative w-full aspect-[1902/335]">
        <Image
          src="https://assets.woodlandworldwide.app/woodland-images/may2024/sale_women_banner.png"
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          quality={100}
          fill
          style={{ objectFit: "contain", verticalAlign: "bottom" }}
        />
      </div>

      <section>
        <div className="mx-auto container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {salefemale.map((femaleItem, index) => (
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={index}
              >
                <Link
                  href={femaleItem.link}
                  className="group block overflow-hidden"
                >
                  <Image
                    src={femaleItem.img}
                    alt={femaleItem.title}
                    width={450}
                    height={450}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative flex flex-col bg-white pt-3">
                    <h3 className="text-lg font-bold text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {femaleItem.title}
                    </h3>

                    <span className="tracking-wider text-xs text-red-500 font-extrabold">
                      {femaleItem.offer}
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </ContentLayout>
  );
};

export default SalePage;

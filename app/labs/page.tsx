"use client";
import ContentLayout from "@/components/layout/ContentLayout";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FramerTransition from "@/components/common/FramerTransition";

const LabsPage = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <FramerTransition>
      <ContentLayout>
        <div className="relative w-full aspect-[1902/335]">
          <Image
            src={"/labs/Labbanner.png"}
            alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
            quality={100}
            fill
            style={{ objectFit: "contain", verticalAlign: "bottom" }}
          />
        </div>
        <div className="container">
          <div className="my-10 space-y-20">
            {/**section 1 */}
            <div className="grid lg:grid-cols-2">
              <motion.div
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
                transition={{ delay: 3 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
                className="flex  lg:p-4  justify-center  flex-col"
              >
                <motion.h4
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  className="scroll-m-20  text-primary text-3xl font-bold tracking-tight"
                >
                  CREATE
                </motion.h4>
                <motion.p
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  className="leading-7 text-primary font-semibold [&:not(:first-child)]:mt-6"
                >
                  Take your ideas to the next level with people who make you
                  want to be the best.
                </motion.p>
              </motion.div>
              <div className="relative  mt-4 lg:mt-0 grid grid-cols-3 gap-2 gap-x-[2px]">
                <div className="relative  border ">
                  <Image
                    src="/labs/lab-1.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover  w-full sm:object-contain"
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/labs/lab-1-1.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover w-full sm:object-contain"
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/labs/lab-1-2.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover w-full sm:object-contain"
                  />
                </div>
              </div>
            </div>
            {/**section 2 */}
            <div className="grid lg:grid-cols-2">
              <div className="relative order-2 mt-4 lg:mt-0 lg:order-1 grid grid-cols-3 gap-2 gap-x-[2px]  ">
                <div className="relative  border ">
                  <Image
                    src="/labs/lab-2.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover  w-full sm:object-contain"
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/labs/lab-2-1.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover w-full sm:object-contain"
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/labs/lab-2-2.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover w-full sm:object-contain"
                  />
                </div>
              </div>
              <div className="flex order-1 lg:p-4 lg:order-2 justify-center  flex-col">
                <h4 className="scroll-m-20  text-primary text-3xl font-bold tracking-tight">
                  TAKE RISKS
                </h4>
                <p className="leading-7 text-primary font-semibold [&:not(:first-child)]:mt-6">
                  Because you have to take risks if you want to build the next
                  big idea. Evolve and Innovate.
                </p>
              </div>
            </div>
            {/** section 3 */}

            <div className="grid lg:grid-cols-2">
              <div className="flex  lg:p-4  justify-center  flex-col">
                <h4 className="scroll-m-20  text-primary text-3xl font-bold tracking-tight">
                  CHAMPION OUR MISSION
                </h4>
                <p className="leading-7 text-primary font-semibold [&:not(:first-child)]:mt-6">
                  Woodland is an equal opportunity employer. New-age ideas,
                  ability to exploit available resources to best use, positive
                  attitude and clean work ethic are the only requirements to
                  succeed here.
                </p>
              </div>
              <div className="relative  mt-4 lg:mt-0 grid grid-cols-3 gap-2 gap-x-[2px]">
                <div className="relative  border ">
                  <Image
                    src="/labs/lab-3.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover  w-full sm:object-contain"
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/labs/lab-3-1.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover w-full sm:object-contain"
                  />
                </div>
                <div className="relative ">
                  <Image
                    src="/labs/lab-3-2.png"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                    height={200}
                    width={200}
                    className=" object-cover w-full sm:object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </FramerTransition>
  );
};

export default LabsPage;

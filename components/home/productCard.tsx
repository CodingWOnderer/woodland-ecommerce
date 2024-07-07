"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

type Props = {
  src: string;
  href: string;
  title: string;
};

const ProductCard = (props: Props) => {
  return (
    <motion.a
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      href={props.href}
      viewport={{ once: true }}
      style={{ aspectRatio: 500 / 600 }}
      className="relative border  block rounded"
    >
      <div className="relative h-full">
        <Image
          src={props.src}
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          style={{ objectFit: "cover" }}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-center justify-end p-6"
      >
        <h3 className="sm:text-2xl text-xl font-bold text-white">
          {props.title}
        </h3>

        <Button
          variant={"outline"}
          size={"lg"}
          className="rounded-none mt-1 sm:mt-0 h-8 px-6 sm:h-10 sm:px-8 text-xs sm:text-base bg-transparent text-white border-2 transition-colors font-semibold"
        >
          Shop Now
        </Button>
      </motion.div>
    </motion.a>
  );
};

export default ProductCard;

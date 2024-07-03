"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
          sizes="(max-width: 640px) 100vw, 50vw" // Replace with appropriate sizes
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end p-6"
      >
        <h3 className="text-2xl font-bold text-white">{props.title}</h3>

        <button className="mt-3 hover:bg-white hover:text-black origin-bottom-left transition-all inline-block border-[3px] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
          Shop Now
        </button>
      </motion.div>
    </motion.a>
  );
};

export default ProductCard;

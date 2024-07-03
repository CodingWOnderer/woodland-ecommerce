"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import useWoodlandStoreData from "@/lib/store/store";
import { motion } from "framer-motion";

const NavHeader = () => {
  const { toggleStore, storeSheet } = useWoodlandStoreData();
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, ease: "easeIn" }}
      className="bg-primary px-4 py-3 text-primary-foreground  sm:px-6 lg:px-8"
    >
      <div className="container mx-auto sm:flex sm:items-center sm:justify-between">
        <p className="text-center font-medium sm:text-left"></p>
        <div className="flex divide-x-2">
          <motion.div
            onClick={() => toggleStore(!storeSheet)}
            className="text-sm px-2 cursor-pointer flex items-center space-x-1 font-medium leading-none"
          >
            <ShoppingCart size={20} /> <span>Cart</span>
          </motion.div>
          <Link
            href={""}
            className="text-sm px-2 flex justify-center items-center font-medium leading-none"
          >
            <span> Find Store</span>
          </Link>
          <Link
            href={""}
            className="text-sm px-2 flex justify-center items-center font-medium leading-none"
          >
            <span> Sign In</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NavHeader;

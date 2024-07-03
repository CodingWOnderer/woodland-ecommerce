"use client";
import React from "react";
import NavHeader from "../common/NavHeader";
import Header from "../common/Header";
import { motion } from "framer-motion";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavHeader />
      <Header />
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {children}
      </motion.main>
    </>
  );
};

export default ContentLayout;

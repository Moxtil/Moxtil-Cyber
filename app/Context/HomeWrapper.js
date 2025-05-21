"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

export default function HomeWrapper({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <div className="loader"></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.0,
        ease: [0.33, 1, 0.68, 1], // smooth, custom bezier
      }}
    >
      {children}
    </motion.div>
  );
}

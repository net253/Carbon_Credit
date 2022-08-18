import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContentWarpper({ content: Content }) {
  const motionVariant = {
    hidden: {
      opacity: 0,
      y: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <>
      <Box px={2} bgColor="#f9feff">
        <Nav />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            variants={motionVariant}
            initial="hidden"
            animate="visible"
          >
            <Content />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </Box>
    </>
  );
}

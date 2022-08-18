import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import axios from "axios";
import { authPath } from "../UrlPath";
import { useNavigate, useLocation } from "react-router-dom";

const motionVariant = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ContentWarp({ content: Content }) {
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    axios.get(authPath).then(({ data: { state } }) => {
      if (!state) {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      if (location.pathname != "/") {
        checkAuth();
      }
    }, 0);

    const timer6s = setInterval(() => {
      if (location.pathname != "/") {
        checkAuth();
      }
    }, 6000);

    return () => {
      clearTimeout(initPage);
      clearInterval(timer6s);
    };
  }, []);

  return (
    <>
      <Box p={2} bgColor="#f5f5f5" minH="100vh">
        <Nav />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            variants={motionVariant}
            initial="hidden"
            animate="visible"
          >
            <Box minH="90vh" py={1}>
              <Content />
            </Box>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </Box>
    </>
  );
}

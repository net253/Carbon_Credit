import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Icon,
  Image,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FaLeaf, FaFileExport } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { MdFullscreen } from "react-icons/md";
import logo from "../img/logo.png";
import { ZoneSelect, Search } from "../button";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

export default function Nav() {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const variant = useBreakpointValue({
    lg: false,
    base: true,
  });

  const motionVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const ExportButton = ({ w, my }) => (
    <Button
      variant="ghost"
      rounded="full"
      w={w}
      my={my}
      onClick={() => navigate("/export")}
    >
      <Icon as={FaFileExport} mr={2} />
      Export
    </Button>
  );

  const RegisterButton = ({ w, mb }) => (
    <Button
      variant="ghost"
      rounded="full"
      w={w}
      mb={mb}
      onClick={() => navigate("/register")}
    >
      <Icon as={RiPlantFill} mr={1} />
      Register
    </Button>
  );

  useEffect(() => {
    const initPage = setTimeout(() => {
      setNavbar(variant);
      if (isOpen) {
        onClose();
      }
    }, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [variant]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1}
      >
        {/* Logo */}
        <Box onClick={() => navigate("/snc-layout")} pointerEvents="stroke">
          <Image
            h="3vh"
            srcSet={logo}
            fallbackSrc="https://rct-dev.com/iccs/assets/logo.63ae820a.png"
          />
          <Box color="green" display="flex" alignItems="center">
            <Text fontWeight="bold">iCarbon Credit System</Text>
            <Icon as={FaLeaf} ml={1} />
          </Box>
        </Box>

        {navbar ? (
          <Box mr={3}>
            <Icon as={GiHamburgerMenu} h="3vh" onClick={onOpen} />
          </Box>
        ) : (
          <motion.div
            variants={motionVariant}
            initial="hidden"
            animate="visible"
          >
            <Box display="flex" gap={5} mr={2} alignItems="center">
              {/* {window.location.pathname == "https://rct-dev.com/iccs/snc-layout" && ( */}
              <Search w="35%" />
              {/* )} */}
              <ExportButton w="30%" />
              <RegisterButton w="30%" />
              <Icon as={MdFullscreen} onClick={toggleFullScreen} />
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Sidebar */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody pt={14}>
            <ExportButton w="100%" my={6} />
            <RegisterButton w="100%" mb={6} />
            {window.location.pathname == "/snc-layout" && <Search w="100%" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

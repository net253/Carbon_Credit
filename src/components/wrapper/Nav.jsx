import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Icon,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Center,
  Stack,
} from "@chakra-ui/react";
import { FaLeaf, FaFileExport, FaMap } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdFullscreen,
  MdLogout,
  MdOutlineAppRegistration,
  MdSettings,
} from "react-icons/md";
import logo from "../image/logo.png";
import Swal from "sweetalert2";

import axios from "axios";
import { logoutPath } from "../UrlPath";
import { useNavigate } from "react-router-dom";

import { Buttons } from "../element";

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

export default function Nav() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    onClose();

    Swal.fire({
      icon: "warning",
      title: `Do you want to Sign out`,
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(logoutPath).then(({ data }) => {
          if (data.state) {
            navigate("/login");
          } else {
            Swal.fire({
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  const buttonText = [
    { text: "Overview", icon: FaMap, func: () => navigate("/") },
    { text: "Export", icon: FaFileExport, func: () => navigate("/export") },
    {
      text: "Register Tree",
      icon: MdOutlineAppRegistration,
      func: () => navigate("/register"),
    },
    {
      text: "Equation Config",
      icon: MdSettings,
      func: () => navigate("/setting"),
    },
    {
      text: "Fullscreen",
      icon: MdFullscreen,
      func: () => toggleFullScreen(),
    },
    {
      text: location.pathname != "/" ? "Sign Out" : "Sign In",
      icon: MdLogout,
      func: () => {
        location.pathname != "/" ? handleLogout() : navigate("/login");
      },
    },
  ];

  return (
    <>
      <Center justifyContent="space-between" alignItems="center">
        {/* LOGO SNC */}
        <Box onClick={() => navigate("/")} cursor="pointer">
          <Image
            h="3vh"
            // src={logo}
            fallbackSrc="./assets/logo.63ae820a.png"
          />
          <Box color="green" display="flex" alignItems="center">
            <Text fontWeight="bold">iCarbon Credit System</Text>
            <Icon as={FaLeaf} ml={1} />
          </Box>
        </Box>

        {/* Button  */}
        <Buttons onClick={onOpen} fontsize="md">
          <Icon as={GiHamburgerMenu} />
        </Buttons>
      </Center>

      {/* Sidebar */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody py={20} bgColor="#f5f5f5">
            <Stack alignItems="start" gap={6}>
              {buttonText.map((info) => (
                <Buttons onClick={info.func} key={`button-${info.text}`}>
                  <Icon as={info.icon} mr={5} />
                  {info.text}
                </Buttons>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

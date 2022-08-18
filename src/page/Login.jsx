import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Center,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { FaUnlock, FaUserAlt, FaLeaf } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import logo from "../components/image/logo.png";
import { loginPath } from "../components/UrlPath";

const font = {
  base: "md",
  md: "lg",
};

export default function Login() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: username,
    password: password,
  });
  const [checked, setChecked] = useState(false);

  const handleSubmit = () => {
    if (checked) {
      localStorage.setItem("username", login.username);
      localStorage.setItem("password", login.password);
    }

    if (login.username && login.password) {
      axios
        .post(loginPath, {
          username: login.username,
          password: login.password,
        })
        .then(({ data }) => {
          if (data.state) {
            Swal.fire({
              icon: "success",
              title: "Login success.",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => navigate("/export"));
          } else {
            Swal.fire({
              icon: "error",
              title: data.message,
              showConfirmButton: false,
              timer: 4000,
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please check your username and password.",
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };

  return (
    <>
      <Box className="bg-login" h="100vh" position="relative" pb="40">
        {/* Logo */}
        <Image
          // src={logo}
          w={{ base: "30vw", sm: "14vw" }}
          fallbackSrc="./assets/logo.63ae820a.png"
        />

        <Center
          flexDirection="column"
          shadow="lg"
          w={{ base: "80vw", md: "50vw", xl: "30vw" }}
          rounded="3xl"
          bgColor="white"
          px={10}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={5}
            color="green"
          >
            <Text fontSize={font} fontWeight="bold">
              iCarbon Credit System
            </Text>
            <Icon as={FaLeaf} ml={1} />
          </Box>

          <Text fontSize="smaller" mb={2}>
            Sign in to start your session
          </Text>

          {/* Input */}
          <FormControl
            mb={5}
            onKeyPress={({ key }) => {
              if (key === "Enter") {
                handleSubmit();
              }
            }}
          >
            <FormLabel fontSize={font}>ชื่อผู้ใช้ (Username)</FormLabel>
            <InputGroup>
              <Input
                id="username"
                type="text"
                variant="filled"
                placeholder="Type your username."
                defaultValue={username}
                onChange={({ target: { value: username } }) =>
                  setLogin({ ...login, username })
                }
              />
              <InputLeftElement children={<FaUserAlt color="gray" />} />
            </InputGroup>

            <FormLabel fontSize={font} mt={5}>
              รหัสผ่าน (Password)
            </FormLabel>
            <InputGroup mb={8}>
              <Input
                id="password"
                type="password"
                variant="filled"
                placeholder="Type your password."
                defaultValue={password}
                onChange={({ target: { value: password } }) =>
                  setLogin({ ...login, password })
                }
              />
              <InputLeftElement children={<FaUnlock color="gray" />} />
            </InputGroup>

            <Button
              variant="ghost"
              rounded="full"
              w="50%"
              onClick={() => navigate("/")}
            >
              <Icon as={BsArrowLeft} mr={2} />
              <Text fontWeight="bold" fontSize="sm" color="green">
                Home Page
              </Text>
            </Button>

            <Button
              w="50%"
              rounded="full"
              colorScheme="messenger"
              onClick={() => handleSubmit()}
            >
              Sign in
            </Button>
          </FormControl>

          {/* Remember Me */}
          <Box
            textAlign="left"
            mb={5}
            w="100%"
            onChange={(e) => setChecked(e.target.checked)}
          >
            <Checkbox mb={3}>
              <Box fontSize={{ base: "x-small", md: "smaller" }}>
                <Text>จดจำฉัน (Remember Me)</Text>
              </Box>
            </Checkbox>
          </Box>
        </Center>
      </Box>
    </>
  );
}

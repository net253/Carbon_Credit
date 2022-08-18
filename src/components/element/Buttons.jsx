import React from "react";
import { Button } from "@chakra-ui/react";

export default function Buttons({
  bgColor,
  children,
  onClick,
  variant,
  fontsize,
  my,
}) {
  return (
    <Button
      rounded="full"
      bgColor={bgColor}
      onClick={onClick}
      mx={1}
      variant={variant ? variant : "ghost"}
      fontSize={fontsize ? fontsize : "2xl"}
      my={my}
    >
      {children}
    </Button>
  );
}

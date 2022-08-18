import React from "react";
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Box
        display="flex"
        alignItems="end"
        justifyContent="space-between"
        fontSize="x-small"
        pt={1}
      >
        <Box display="flex" alignItems="center">
          <Text>Copyright</Text>
          <Icon as={FaRegCopyright} color="gray.600" mx={1} />
          <Text fontWeight="semibold">SNC Pyongsan Evolution Co., LTD.</Text>
        </Box>
        <Text>IIoT-center</Text>
      </Box>
    </>
  );
}

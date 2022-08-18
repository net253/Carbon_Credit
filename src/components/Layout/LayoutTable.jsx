import React from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  TableContainer,
  useDisclosure,
  Button,
  Icon,
} from "@chakra-ui/react";
import { TreeModal } from "../modal";

const tableHead = [
  { thai: "ลำดับที่", eng: "No.", w: "10%", textAlign: "center" },
  { thai: "รหัสต้นไม้", eng: "Tree Code.", w: "15%", textAlign: "center" },
  { thai: "ชื่อต้นไม้", eng: "Tree Name.", w: "", textAlign: "left " },
  {
    thai: "อายุต้นไม้ (ปี)",
    eng: "Tree Age (Year).",
    w: "15%",
    textAlign: "center",
  },
  {
    thai: "คาร์บอนเครดิต / วัน",
    eng: "Carbon Credit / Day ",
    w: "20%",
    textAlign: "center",
  },
];
export default function LayoutTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead
            bg="gray.100"
            sx={{
              position: "sticky",
              top: "0",
            }}
          >
            <Tr>
              {tableHead.map((info, i) => (
                <Th key={i} w={info.w} textAlign={info.textAlign}>
                  <Text>{info.thai}</Text>
                  <Text fontSize="x-small">
                    {info.eng}
                    {i == 5 && (
                      <React.Fragment>
                        (KGCO<sub>2</sub>)
                      </React.Fragment>
                    )}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array(50)
              .fill(0)
              .map((_, i) => (
                <Tr
                  key={i}
                  _hover={{ bgColor: "gray.100" }}
                  _active={{ bgColor: "gray.200" }}
                  onClick={onOpen}
                >
                  <Td isNumeric pr={8}>
                    {i + 1}
                  </Td>
                  <Td textAlign="center">X XX XX</Td>
                  <Td>XXXXXXXXXXXXXXXXXXX</Td>
                  <Td textAlign="center">XX</Td>
                  <Td textAlign="center">XXXXX</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      <TreeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

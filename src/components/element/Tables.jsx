import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";

export default function Tables({ data, head }) {
  const [keyData, setKeyData] = useState([]);

  const getKey = () => {
    if (data != "") {
      setKeyData(Object.keys(data[0]));
    }
  };

  useEffect(() => {
    getKey();
  }, [data]);

  return (
    <TableContainer>
      <Table size="sm">
        <Thead bgColor="gray.200">
          <Tr>
            {head.map((info, j) => (
              <Th textAlign={j > 0 ? "left" : "center"} key={j}>
                <Text>{info.thai}</Text>
                <Text fontSize="x-small">{info.eng}</Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((table, k) => (
            <Tr
              key={k}
              _hover={{ bgColor: "#f5f5f5" }}
              _active={{ bgColor: "#eee" }}
            >
              <Td textAlign="center">{k + 1}</Td>
              {keyData.map((keys, i) => (
                <Td textAlign="left" key={i}>
                  {table[keys] ? table[keys] : "-"}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

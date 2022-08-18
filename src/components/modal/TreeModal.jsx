import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Divider,
  Icon,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import tree from "../image/tree.jpg";
import TreeInformation from "./TreeInformation";

import axios from "axios";
import { treePath } from "../UrlPath";
import Swal from "sweetalert2";

export default function TreeModal({ isOpen, onClose, info, getOverview }) {
  const initialValue = {
    id: "",
    circumference: "",
    height: "",
    treeCode: "",
    latitude: "",
    longitude: "",
    treeAge: "",
    carbonCredit: 0,
    image: "",
    zone: "",
    treeName: "",
    scientificName: "",
    plantNumber: "",
    plantDate: new Date(),
    type: "",
    other: "",
    area: 0,
  };
  const [fillValue, setFillValue] = useState(initialValue);
  const [edit, setEdit] = useState(true);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = date.getDay().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return year + "-" + month + "-" + day;
  };

  const handleEdit = () => {
    const formatAxios = {
      ...fillValue,
      plantDate: formatDate(fillValue.plantDate),
      carbonCredit: "",
    };

    if (!edit) {
      console.log(formatAxios);
      axios
        .put(`${treePath}?id=${info.properties.id}`, { ...formatAxios })
        .then(({ data }) => {
          if (data.state) {
            Swal.fire({
              icon: "success",
              title: "Save Edit",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => getOverview());
          } else {
            console.log(data);
            Swal.fire({
              icon: "error",
              title: "Error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    }
    setEdit(!edit);
  };

  useEffect(() => {
    setFillValue({
      ...fillValue,
      circumference: info?.properties?.d,
      height: info?.properties?.h,
      treeCode: info?.properties?.code,
      latitude: info?.geometry?.coordinates[1],
      longitude: info?.geometry?.coordinates[0],
      carbonCredit: info?.properties?.carbon,
      zone: info?.properties?.zone,
      treeName: info?.properties?.description,
      scientificName: info?.properties?.sciName,
      other: info?.other,
      type: info?.properties?.treeType,
    });
  }, [info]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setEdit(true);
          onClose();
        }}
        isCentered
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>รายละเอียดต้นไม้</Text>
            <Text fontSize="sm">Tree Information</Text>
            <Divider border="1px" mt={3} />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody textAlign="center">
            <Grid templateColumns={{ xl: "repeat(3,1fr)" }} gap={4}>
              <GridItem>
                <Image
                  // src={tree}
                  w="100%"
                  rounded="xl"
                  shadow="md"
                  fallbackSrc="./assets/tree.71f7f4d8.jpg"
                />
              </GridItem>

              <GridItem w="100%" colSpan={{ xl: 2 }}>
                <TreeInformation
                  fillValue={fillValue}
                  setFillValue={setFillValue}
                  edit={edit}
                />
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={edit ? "yellow" : "green"}
              fontWeight="bold"
              rounded="full"
              size="sm"
              onClick={handleEdit}
            >
              <Icon as={FaEdit} mr={1} />
              {edit ? "แก้ไขข้อมูล (Edit)" : "ยืนยัน (Save)"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

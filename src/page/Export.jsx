import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Icon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Tables, Filter } from "../components/element";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TreeModal } from "../components/modal";

import { useSelector } from "react-redux";
import axios from "axios";
import { overviewPath, treePath } from "../components/UrlPath";
import Swal from "sweetalert2";

const tableHead = [
  { thai: "ลำดับที่", eng: "No." },
  { thai: "รหัสต้นไม้", eng: "Tree Code." },
  { thai: "ชื่อต้นไม้", eng: "Tree Name." },
  { thai: "ชื่อวิทยาศาสตร์", eng: "Scientific Name." },
  { thai: "เส้นผ่านศูนย์กลาง (ซม.)", eng: "Tree Diameter (cm.)." },
  { thai: "ความสูงต้นไม้ (ม.)", eng: "Tree Height (m.)." },
  {
    thai: "คาร์บอนเครดิต / วัน (กก.คาร์บอน)",
    eng: "Carbon Credit / Day (kgCO2)",
  },
  {
    thai: "",
    eng: "",
  },
];

const initialFilter = {
  zone: "",
  type: "",
  startAge: "",
  endAge: "",
  startDate: "",
  endDate: "",
};

export default function Export() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const treeType = useSelector((state) => state.overviewInfo.treeType);

  const [filters, setFilters] = useState(initialFilter);
  const [data, setData] = useState([]);
  const [allTreeInfo, setAllTreeInfo] = useState([]);
  const [modalInfo, setModalInfo] = useState("");

  const handleModal = (info) => {
    setModalInfo(info);
    onOpen();
  };
  const handleDel = (id) => {
    Swal.fire({
      title: "ลบข้อมูลต้นไม้ใช่หรือไม่?",
      text: "Do you want to delete this tree information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${treePath}?id=${id}`).then(({ data }) => {
          if (data.state) {
            Swal.fire({
              title: "ดำเนินการลบเสร็จสิ้น",
              text: "Delete completed",
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => getOverview());
          } else {
            Swal.fire({
              title: data.message,
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  };

  // * FORMAT DATA FUNCTION * //
  const setDataTable = (arr) => {
    const information = arr.map((info) => {
      const { properties } = info;
      return {
        code: properties.code,
        name: properties.description,
        sciName: properties.sciName,
        d: properties.d?.toFixed(2),
        h: properties.h?.toFixed(2),
        co2: properties.carbon,
        button: (
          <React.Fragment>
            <Button
              size="xs"
              colorScheme="blackAlpha"
              onClick={() => handleModal(info)}
              mr={2}
            >
              <Icon as={HiOutlineInformationCircle} mr={1} />
              Detail
            </Button>

            <Button
              size="xs"
              colorScheme="red"
              onClick={() => handleDel(properties.id)}
            >
              <Icon as={RiDeleteBack2Fill} mr={1} />
              Delete
            </Button>
          </React.Fragment>
        ),
      };
    });

    setData(information);
  };

  // ! GET TREE INFORMATION ! //
  const getOverview = () => {
    axios.get(overviewPath).then(({ data: { results } }) => {
      const { overview } = results;
      const mapInfo = overview.map((value, i) => {
        return {
          type: "Feature",
          properties: {
            id: value.TREES_ID,
            code: value.TREES_CODE,
            description: value.TREES_NAME,
            sciName: value.SCIENTIFIC_NAME,
            treeType: value.TYPE,
            d: Number(value.CIRCUMFERENCE),
            h: Number(value.HEIGHT),
            zone: value.ZONE,
            carbon: Number(value.C_ZONE).toFixed(5),
            other: value.OTHER,
          },
          geometry: {
            type: "Point",
            coordinates: [Number(value.LONGITUDE), Number(value.LATITUDE)],
          },
        };
      });
      setAllTreeInfo(mapInfo);
    });
  };
  useEffect(() => {
    const initPage = setTimeout(() => getOverview(), 0);
    return () => {
      clearTimeout(initPage);
    };
  }, []);

  // ! FORMAT INFORMATION FOR TABLE ! //
  const dataTable = () => {
    setDataTable(allTreeInfo.slice(0, 500));
  };
  useEffect(() => {
    const initPage = setTimeout(() => dataTable());

    return () => {
      clearTimeout(initPage);
    };
  }, [allTreeInfo]);

  // * SEARCH AND CLEAR FUNCTION * //
  const handleSearch = () => {
    if (filters.zone.value == "" && filters.type.value == "") {
      dataTable();
    } else if (filters.zone.value && filters.type.value) {
      const datas = allTreeInfo.filter(
        (info) =>
          info.properties.zone == filters.zone.value &&
          info.properties.description == filters.type.value
      );
      setDataTable(datas);
    } else if (filters.zone.value != "" || filters.type.value != "") {
      const datas = allTreeInfo.filter(
        (info) =>
          info.properties.zone == filters.zone.value ||
          info.properties.description == filters.type.value
      );

      setDataTable(datas);
    }
  };
  const handleClear = () => {
    dataTable();
    setFilters({
      zone: "",
      type: "",
      startAge: "",
      endAge: "",
      startDate: "",
      endDate: "",
    });
  };

  if (!treeType) {
    return (
      <Center h="90vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <>
      <Box h="90vh" p={3} bgColor="white" rounded="xl" overflowY="auto">
        <Filter
          treeType={treeType}
          filter={filters}
          setFilter={setFilters}
          handleSearch={handleSearch}
          handleClear={handleClear}
          data={data}
        />
        <Box my={4}>
          <Tables head={tableHead} data={data} />
        </Box>
      </Box>

      <TreeModal
        isOpen={isOpen}
        onClose={onClose}
        info={modalInfo}
        getOverview={getOverview}
      />
    </>
  );
}

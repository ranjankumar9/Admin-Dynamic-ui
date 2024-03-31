

import React, { useEffect, useRef, useState } from "react";

// Chakra imports
import {

  Box,
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Button,
  Avatar,
  Tooltip,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";

// Data
import { tablesProjectData, tablesTableData } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getAuthors } from "Redux-Toolkit/authortableSlice";
import { getProjectdata } from "Redux-Toolkit/projecttableSlice";
import { ProjectConfigurator } from "components/Configurator/ProjectConfigurator";
import TablesQrCode from "components/Tables/TablesQrCode";
import Cookies from "js-cookie";



function QrCode() {
  const dispatch = useDispatch();
  const [projectdata, setProjectData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userType = Cookies.get('userType')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const btnRef = useRef();
  const editRef = useRef()
  const [dataType, setDataType] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(projectdata.length / itemsPerPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const ProjectTables = () => {
    setLoading(true)
    setMsg("Api is Requesting...")
    dispatch(getProjectdata()).then((res) => {
      if (res?.payload?.msg === "Project data!") {
        console.log(res.payload)
        setProjectData(res?.payload?.data)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAdd = () => {
    onOpen()
    setDataType("ADD")
  }

  console.log(dataType)

  useEffect(() => {
    ProjectTables()
  }, [])

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(projectdata);
    } else {
      const filteredData = projectdata.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [searchQuery, projectdata]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <Flex direction='column' pt={{ base: "70px", md: "55px" }}>
      {/* Projects Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex alignItems='center' justifyContent='space-between' width='100%'>
            <Flex direction='column'>
              <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
                Project Qr Table
              </Text>

              <Flex align='center'>

                <Icon
                  as={AiFillCheckCircle}
                  color='green.500'
                  w='15px'
                  h='15px'
                  me='5px'
                />

                <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                  <Text fontWeight='bold' as='span' color='gray.400'>
                    +30%
                  </Text>{" "}
                  this month
                </Text>
              </Flex>
            </Flex>

            <Flex>
              <InputGroup m="1rem">
                <Input
                  placeholder="Search by company name"
                  color={'whiteAlpha.600'}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <InputRightElement pointerEvents="none">
                  <Icon as={SearchIcon} color="gray.300" />
                </InputRightElement>
              </InputGroup>
            </Flex>
            {userType === "admin" || userType === "superadmin" ? (
              <Tooltip hasArrow label='Add Project' bg='gray.300' color='black'>
                <Text mb='.5rem' fontSize='30px' color='blue.200' fontWeight='bold' cursor={"pointer"}>
                  <IoIosAddCircleOutline ref={btnRef} colorScheme="teal" onClick={handleAdd} />
                </Text>
              </Tooltip>
            ) : (
              <Text></Text>
            )}
            <ProjectConfigurator btnRef={btnRef} isOpen={isOpen} onClose={onClose} ProjectTables={ProjectTables} dataType={dataType} />
          </Flex>
        </CardHeader>
        <CardBody display="grid" gridTemplateRows="auto 1fr auto">

          {loading ? (
            <Flex flexDirection='column' color='white' alignItems='center' justifyContent='center' width='100%'>
              <Avatar src="https://i.pinimg.com/originals/13/ed/b3/13edb3ccfceecfb23a77f74418232244.gif" width='200px' height='200px' />
              <Text mt={5}>{msg}</Text>
            </Flex>
          ) : (
            <>
              <Table variant='simple' color='#fff'>
                <Thead>
                  <Tr my='.8rem' ps='0px'>
                    <Th
                      ps='0px'
                      color='gray.400'
                      fontFamily='Plus Jakarta Display'
                      borderBottomColor='#56577A'>
                      Companies
                    </Th>
                    <Th
                      color='gray.400'
                      fontFamily='Plus Jakarta Display'
                      borderBottomColor='#56577A'>
                      Budget
                    </Th>
                    <Th
                      color='gray.400'
                      fontFamily='Plus Jakarta Display'
                      borderBottomColor='#56577A'>
                      Status
                    </Th>
                    <Th
                      color='gray.400'
                      fontFamily='Plus Jakarta Display'
                      borderBottomColor='#56577A'>
                      Completion
                    </Th>
                    {userType === 'admin' || userType === 'superadmin' && <Th borderBottomColor='#56577A'>Actions</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedData?.map((row, index, arr) => {
                    return (
                      <TablesQrCode
                        key={index}
                        id={row._id}
                        name={row.name}
                        logo={row.logo}
                        status={row.status}
                        budget={row.budget}
                        progression={row.completion}
                        lastItem={index === arr.length - 1 ? true : false}
                        ProjectTables={ProjectTables}
                        editRef={editRef}
                      />
                    );
                  })}
                </Tbody>
              </Table>
              <Flex justifyContent="center" mb="10px" alignItems="center">
                <Button colorScheme='whiteAlpha' variant='outline' onClick={goToPrevPage} disabled={currentPage === 1} mr="5px" borderRadius={'5px'} >
                  Previous
                </Button>
                <Button colorScheme='whiteAlpha' variant='outline' fontSize="lg" fontWeight="bold" mr={2}>{currentPage}</Button>
                <Button colorScheme='whiteAlpha' variant='outline' onClick={goToNextPage} disabled={currentPage === totalPages} borderRadius={'5px'}>
                  Next
                </Button>
              </Flex>
            </>
          )}


        </CardBody>
      </Card>
    </Flex>
  );
}

export default QrCode;

import React, { useEffect, useRef, useState } from "react";
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
  Avatar,
  Button,
  Tooltip,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import { useDispatch } from "react-redux";
import { getAuthors } from "Redux-Toolkit/authortableSlice";
import { AuthorConfigurator } from "components/Configurator/AuthorConfigurator";
import Cookies from "js-cookie";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SearchIcon } from "@chakra-ui/icons";

function Tables() {
  const dispatch = useDispatch();
  const [authorData, setAuthorData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteid, setDeleteid] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const btnRef = useRef();
  const userType = Cookies.get("userType");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(authorData.length / itemsPerPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const AuthorTables = () => {
    setLoading(true);
    setMsg("Api is Requesting...");
    dispatch(getAuthors())
      .then((res) => {
        if (res?.payload?.msg === "Table data!") {
          setAuthorData(res?.payload?.data);
          setDeleteid(res?.payload?.data?._id);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    AuthorTables();
  }, []);

  useEffect(() => {
    const filtered = authorData.filter((author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, authorData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <Flex alignItems={"center"} w={'100%'} justifyContent={"space-between"}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              Author Table
            </Text>
          </CardHeader>

          <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
            <Flex>
              <InputGroup>
                <InputRightElement pointerEvents='none'>
                  <SearchIcon color='gray.300' cursor={'pointer'}  />
                </InputRightElement>
                <Input type='text' color={'whiteAlpha.600'} placeholder='Search by author name' onChange={handleSearchInputChange} />
              </InputGroup>
            </Flex>

            <Flex>
              {userType === "superadmin" ? (
                <CardHeader p="6px 0px 22px 0px">
                  <Tooltip hasArrow label='Add Author' bg='gray.300' color='black'>
                    <Text fontSize="30px" color="blue.200" fontWeight="bold" cursor={"pointer"}>
                      <IoIosAddCircleOutline ref={btnRef} colorScheme="teal" onClick={onOpen} />
                    </Text>
                  </Tooltip>

                  <AuthorConfigurator btnRef={btnRef} isOpen={isOpen} onClose={onClose} AuthorTables={AuthorTables} />
                </CardHeader>
              ) : (
                <Box></Box>
              )}
            </Flex>
          </Flex>
        </Flex>

        <CardBody display="grid" gridTemplateRows="auto 1fr auto">
          {loading ? (
            <Flex flexDirection="column" color="white" alignItems="center" justifyContent="center" width="100%">
              <Avatar src="https://i.pinimg.com/originals/13/ed/b3/13edb3ccfceecfb23a77f74418232244.gif" width="200px" height="200px" />
              <Text mt={5}>{msg}</Text>
            </Flex>
          ) : (
            <>
              <Table variant="simple" color="#fff" mt={5}>
                <Thead>
                  <Tr my=".8rem" ps="0px" color="gray.400">
                    <Th ps="0px" color="gray.400" fontFamily="Plus Jakarta Display" borderBottomColor="#56577A">
                      Author
                    </Th>
                    <Th color="gray.400" fontFamily="Plus Jakarta Display" borderBottomColor="#56577A">
                      Function
                    </Th>
                    <Th color="gray.400" fontFamily="Plus Jakarta Display" borderBottomColor="#56577A">
                      Status
                    </Th>
                    <Th color="gray.400" fontFamily="Plus Jakarta Display" borderBottomColor="#56577A">
                      Employed
                    </Th>
                    {userType === "superadmin" && <Th borderBottomColor="#56577A">Actions</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedData?.map((row, index, arr) => {
                    return (
                      <TablesTableRow
                        key={row._id}
                        id={row._id}
                        name={row.name}
                        logo={row.logo}
                        email={row.email}
                        subdomain={row.subdomain}
                        domain={row.domain}
                        status={row.status}
                        date={row.date}
                        lastItem={index === arr.length - 1 ? true : false}
                        AuthorTables={AuthorTables}
                        openModal={onOpen}
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

export default Tables;

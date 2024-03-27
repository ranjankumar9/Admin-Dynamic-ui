

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
  Avatar,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesProjectData, tablesTableData } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getAuthors } from "Redux-Toolkit/authortableSlice";
import { AuthorConfigurator } from "components/Configurator/AuthorConfigurator";
import { deleteAuthorSuccess } from "Redux-Toolkit/authortableSlice";
import DeleteConfigurator from "components/Configurator/DeleteConfigurator";
import { deleteAuthor } from "Redux-Toolkit/authortableSlice";


function Tables() {
  const dispatch = useDispatch();
  const [authorData, setAuthorData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteid, setDeleteid] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("")
  const btnRef = useRef();
  const userType = localStorage.getItem("userType")

  const AuthorTables = () => {
    setLoading(true)
    setMsg("Api is Requesting...")
    dispatch(getAuthors()).then((res) => {
      if(res?.payload?.msg === "Table data!"){
        setAuthorData(res?.payload?.data)
        console.log(res?.payload)
        setDeleteid(res?.payload?.data?._id)
        setTimeout(() => {
          setLoading(false)
        },2000)
      }

    })
      .catch((err) => {
        console.log(err)
      })
  }


 

  // console.log(authorData)

  useEffect(() => {
    AuthorTables()
  }, [])


  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>

      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <CardHeader p='6px 0px 22px 0px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Authors Table
            </Text>
          </CardHeader>
         {userType == "superadmin" ? (
           <CardHeader p='6px 0px 22px 0px'>
           <Text fontSize='30px' color='blue.200' fontWeight='bold' cursor={"pointer"}>
             <IoIosAddCircleOutline ref={btnRef} colorScheme="teal" onClick={onOpen} />
           </Text>
           <AuthorConfigurator btnRef={btnRef} isOpen={isOpen} onClose={onClose} AuthorTables={AuthorTables} />
         </CardHeader>
         ):(<div></div>)}
        </Box>
        <CardBody>
          {loading ? (
             <Flex flexDirection='column' color='white' alignItems= 'center' justifyContent='center' width= '100%'>
             <Avatar src="https://i.pinimg.com/originals/13/ed/b3/13edb3ccfceecfb23a77f74418232244.gif" width='200px' height='200px' />
             <Text mt={5}>{msg}</Text>
           </Flex>
          ):(
            <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px' color='gray.400'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Author
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Function
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
                  Employed
                </Th>
               {userType=== "superadmin" &&  <Th borderBottomColor='#56577A'>Actions</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {authorData?.map((row, index, arr) => {
                return (
                  <TablesTableRow
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
                    openModal = {onOpen}
                  />
                );
              })}
            </Tbody>
          </Table>
          )}
        </CardBody>
      </Card>
            
    </Flex>
  );
}

export default Tables;

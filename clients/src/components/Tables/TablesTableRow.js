

import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import React, { useState } from "react";
import DeleteConfigurator from "components/Configurator/DeleteConfigurator";
import { useDispatch } from "react-redux";
import { deleteAuthor } from "Redux-Toolkit/authortableSlice";
import { AuthorConfigurator } from "components/Configurator/AuthorConfigurator";
import { EditAuthorConfigurator } from "components/Configurator/EditAuthorConfigurator";
import Cookies from "js-cookie";


function TablesTableRow(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteid, setDeleteid] = useState("")
  const dispatch = useDispatch();
  const [editData, setEditData] = useState([]);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();



  const {
    id,
    logo,
    name,
    email,
    subdomain,
    domain,
    status,
    date,
    lastItem,
    index,
    AuthorTables, openModal
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const userType = Cookies.get("userType")


  const handleDeleteTableRow = (id) => {
    onDeleteOpen();
    setDeleteid(id)
  }

  const handleDelete = () => {
    dispatch(deleteAuthor(deleteid))
      .then(() => {
        AuthorTables()
        onClose();
      })
      .catch((error) => {
        console.log(error);
        // Handle error if needed
      });
  }

  const handleEditTableRow = (props) => {
    onEditOpen()
    setEditData(props)
  }


  return (
    <Tr key={index}>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'>
        <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Avatar
            src={logo}
            w='50px'
            borderRadius='12px'
            me='18px'
            border='none'
          />
          <Flex direction='column'>
            <Text
              fontSize='sm'
              color='#fff'
              fontWeight='normal'
              minWidth='100%'>
              {name}
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='normal'>
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'
        minW='150px'>
        <Flex direction='column'>
          <Text fontSize='sm' color='#fff' fontWeight='normal'>
            {domain}
          </Text>
          <Text fontSize='sm' color='gray.400' fontWeight='normal'>
            {subdomain}
          </Text>
        </Flex>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Badge
          bg={status === "online" ? "green.400" : "transparent"}
          color={status === "online" ? "white" : colorStatus}
          fontSize='sm'
          p='3px 10px'
          borderRadius='8px'
          border={status === "online" ? "none" : "1px solid #fff"}
          fontWeight='normal'>
          {status}
        </Badge>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Text fontSize='sm' color='#fff' fontWeight='normal'>
          {date}
        </Text>
      </Td>
      {userType === "superadmin" && <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Tooltip hasArrow label='Edit' bg='gray.300' color='black'>
          <Button p='0px' bg='transparent' variant='no-hover'>
            <Text
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              cursor='pointer'>

              <MdEdit onClick={() => handleEditTableRow(props)} />

            </Text>
          </Button>
        </Tooltip>
        <EditAuthorConfigurator isOpen={isEditOpen} onClose={onEditClose} editData={editData} AuthorTables={AuthorTables} />
        <Tooltip hasArrow label='Delete' bg='gray.300' color='black'>
          <Button p='0px' bg='transparent' variant='no-hover'>
            <Text
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              cursor='pointer'>
              <MdDelete onClick={() => handleDeleteTableRow(id)} />
            </Text>
          </Button>
        </Tooltip>
        <DeleteConfigurator isOpen={isDeleteOpen} onClose={onDeleteClose} deleteid={deleteid} handleDelete={handleDelete} />
      </Td>}
    </Tr>
  );
}

export default TablesTableRow;

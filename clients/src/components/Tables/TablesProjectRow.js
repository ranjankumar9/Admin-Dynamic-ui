

import React, { useState } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
  Avatar,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteProject } from "Redux-Toolkit/projecttableSlice";
import { useDispatch } from "react-redux";
import DeleteConfigurator from "components/Configurator/DeleteConfigurator";
import { EditProjectConfigurator } from "components/Configurator/EditProjectConfigurator";
import Cookies from "js-cookie";

function DashboardTableRow(props) {
  const { id, logo, name, status, budget, progression, lastItem, isOpenModal, ProjectTables, editRef } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [deleteid, setDeleteid] = useState("");
  const [type, setType] = useState(null);
  const [editData, setEditData] = useState([])
  const userType = Cookies.get("userType")
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const handleDeleteTableRow = (id) => {
    onDeleteOpen();
    setDeleteid(id)
  }

  const handleDelete = () => {
    dispatch(deleteProject(deleteid))
      .then(() => {
        onDeleteClose()
        ProjectTables()
      })
      .catch((error) => {
        console.log(error);
        // Handle error if needed
      });
  }

  const handleEditRow = (props) => {
    onEditOpen();
    setEditData(props)
  }
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Avatar src={logo} h={"20px"} w={"20px"} me='18px' />
          <Text fontSize='sm' color='#fff' minWidth='100%'>
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          $ {budget}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {status}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Flex direction='column'>
          <Text
            fontSize='sm'
            color='#fff'
            fontWeight='bold'
            pb='.2rem'>{`${progression}%`}</Text>
          <Progress
            colorScheme='brand'
            maxW='125px'
            h='3px'
            bg='#2D2E5F'
            value={progression}
            borderRadius='15px'
          />
        </Flex>
      </Td>
      {userType === "admin" || userType === "superadmin" &&
        <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
          <Tooltip hasArrow label='Edit' bg='gray.300' color='black'>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                color='gray.400'
                fontWeight='bold'
                cursor='pointer'>
                <MdEdit ref={editRef} onClick={() => handleEditRow(props)} />
              </Text>
            </Button>
          </Tooltip>
          <EditProjectConfigurator isOpen={isEditOpen} onClose={onEditClose} editData={editData} ProjectTables={ProjectTables} />
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

export default DashboardTableRow;

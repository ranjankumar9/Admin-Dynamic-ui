import React from "react";
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
} from '@chakra-ui/react'
import { Separator } from 'components/Separator/Separator';
import { useDispatch } from "react-redux";
import { deleteAuthor } from "Redux-Toolkit/authortableSlice";
import { getAuthors } from "Redux-Toolkit/authortableSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteAuthorSuccess } from "Redux-Toolkit/authortableSlice";

function DeleteConfigurator({ deleteid, isOpen, onClose, handleDelete }) {
    const dispatch = useDispatch();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)



    return (
        <>
        <ToastContainer />
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent bg='blue.900'
                    backdropFilter='blur(42px)'>
                    <ModalHeader color='white'>Delete Modal</ModalHeader>
                    <Separator></Separator>
                    <ModalCloseButton color='white' />
                    <ModalBody pb={6} mt={5}>
                        <Text fontSize='18px' color='white'>Are You Sure You Want to Delete ?</Text>


                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteConfigurator;
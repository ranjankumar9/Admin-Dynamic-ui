import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Box,
  Avatar,
  Text,
  Stack,
} from "@chakra-ui/react";
import { PiCookieThin } from "react-icons/pi";
import { BiSolidCookie } from "react-icons/bi";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MdBuild } from "react-icons/md";
import Cookies from "js-cookie";


function CookiesModal() {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);

  const Acceptcookies = () => {
    Cookies.set("accept-Cookies", "Successfully_Accepted")
    onClose()
  }

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        // onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(6, 11, 38, 0.94) 100%)' backdropFilter='blur(42px)' > {/* Set the background color here */}
          <ModalBody p={6} border={'0.5px solid gray'} borderRadius={'5px'}>
            <BiSolidCookie color="blue" fontSize={96} />
            <Text mt={5} color={"white"} fontFamily={'body'} fontWeight={'thin'}>
              By clicking “Accept all cookies”, you agree Stack Exchange can store cookies on your device and disclose information in accordance with our Cookie Policy.
            </Text>
            <Stack mt={5} direction={{ base: 'column', sm: 'column', md: 'row' }} w={'100%'}>
              <Button colorScheme='whiteAlpha' variant='outline' mr={3} onClick={Acceptcookies} rightIcon={<MdBuild />} borderRadius='4px'>
                Accept All Cookies
              </Button>
              <Button colorScheme='whiteAlpha' variant='outline' onClick={Acceptcookies} mt={10} rightIcon={<ArrowForwardIcon />} borderRadius='4px'>
                Necessary Cookies Only
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CookiesModal;

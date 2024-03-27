
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'>
      <Text
        fontSize='sm'
        color='white'
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        &copy; {1900 + new Date().getYear()}
        <Text as='span'>
          {document.documentElement.dir === "rtl"
            ? "Copy"
            : "Copy"}
        </Text>
        <Link href='#' target='_blank'>
          {document.documentElement.dir === "rtl"
            ? "Dashboard"
            : "Right"}
        </Link>
        
        {/* <Link href='#' target='_blank'>
          {document.documentElement.dir === "rtl" ? "" : " Creative Tim"}
        </Link> */}
        {document.documentElement.dir === "rtl"
          ? "Reserved"
          : "Reserved"}
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='white' fontSize='sm' href='/admin/dashboard'>
            {document.documentElement.dir === "rtl"
              ? "Dashboard"
              : "Dashboard"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='white' fontSize='sm' href='#'>
            {document.documentElement.dir === "rtl" ? "Table" : "Table"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            color='white'
            fontSize='sm'
            href='#'>
            {document.documentElement.dir === "rtl" ? "Blog" : "Blog"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color='white'
            fontSize='sm'
            href='#'>
            {document.documentElement.dir === "rtl" ? "Profile" : "Profile"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}



import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function AuthFooter(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
      }}
      alignItems={{
        base: "center",
      }}
      justifyContent='space-between'
      pb='20px'
      fontSize='sm'>
      <Text
        color='white'
        textAlign={{
          base: "center",
        }}
        mb={{ base: "20px" }}>
        &copy; {1900 + new Date().getYear()}
 
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link color='white' fontSize='sm' href='#'>
            {document.documentElement.dir === "rtl"
              ? "Dashboard"
              : "Dashboard"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link color='white' fontSize='sm' href='#'>
            {document.documentElement.dir === "rtl" ? "Table" : "Table"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link
            color='white'
            fontSize='sm'
            // href='#blog'
            href='#'>
            {document.documentElement.dir === "rtl" ? "Blog" : "Blog"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color='white'
            // href='#license'
            href='#'>
            {document.documentElement.dir === "rtl" ? "Profile" : "Profile"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}

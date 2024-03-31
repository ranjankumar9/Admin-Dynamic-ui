import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Switch,
  Text,
  Icon,
  DarkMode,
  Select,
} from "@chakra-ui/react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import AuthFooter from "components/Footer/AuthFooter";
import GradientBorder from "components/GradientBorder/GradientBorder";
import signUpImage from "assets/img/signUpImage.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupUser } from "Redux-Toolkit/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("admin")
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const titleColor = "white";
  const textColor = "gray.400";

  const handleSignup = async () => {
    if (name === "" || email === "" || password === "") {
      toast.warning("Name, Email and password are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }

    var passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.warning("Password must be at least 6 characters long and contain at least one special character, one alphabetical character, and one numerical character");
      return;
    }

    try {
      const res = await dispatch(signupUser(name, email, password, type));
      console.log(res);
      if (res.msg === "Signup Successfully!") {
        toast.success(res.msg);
        setTimeout(() => {
          history.push('/auth/signin')
        }, 3000)
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }

    setName("")
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPassword(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPassword]);



  return (
    <Flex position='relative' overflow={{ lg: "hidden" }}>
      <Flex
        flexDirection='column'
        h={{ sm: "initial", md: "unset" }}
        w={{ base: "90%" }}
        maxW='1044px'
        mx='auto'
        alignItems={"center"}
        justifyContent='center'
        pt={{ sm: "100px", md: "0px" }}
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          flexDirection='column'
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mt={{ lg: "100px" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <ToastContainer />
          <GradientBorder p='2px' me={{ base: "none", lg: "30px", xl: "none" }}>
            <Flex
              background='transparent'
              borderRadius='30px'
              direction='column'
              p='30px'
              minW={{ base: "unset", md: "430px", xl: "450px" }}
              w='100%'
              mx={{ base: "0px" }}
              bg={{
                base: "rgb(19,21,56)",
              }}>
              <Text
                fontSize='xl'
                color={textColor}
                fontWeight='bold'
                textAlign='center'
                mb='22px'>
                Register With
              </Text>

              <FormControl>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Name
                </FormLabel>

                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='text'
                    placeholder='Your name'
                    value={name}
                    onChange={(obj) => setName(obj.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Type
                </FormLabel>

                <Select
                  color={titleColor}
                  bg={{
                    base: "rgb(19,21,54)",
                  }}
                  border='2px solid white'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  h='46px'
                  variant="outline"
                  value={type}
                  onChange={(ev) => setType(ev.target.value)}
                >
                  <option style={{ color: 'blue' }} value='admin'>Admin</option>
                  <option style={{ color: 'blue' }} value='superadmin'>Super Admin</option>
                  <option style={{ color: 'blue' }} value='adminViewer'>Spectator</option>
                </Select>
                <FormLabel
                  mt={7}
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Email
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='email'
                    placeholder='Your email address'
                    value={email}
                    onChange={(obj) => setEmail(obj.target.value)}
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Password
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='password'
                    placeholder='Your password'
                    value={password}
                    onChange={(obj) => setPassword(obj.target.value)}
                  />
                </GradientBorder>
                <FormControl display='flex' alignItems='center' mb='24px'>
                  <DarkMode>
                    <Switch id='remember-login' colorScheme='brand' me='10px' isChecked={showPassword}
                      onChange={() => setShowPassword(!showPassword)} />
                  </DarkMode>

                  <FormLabel
                    color={titleColor}
                    htmlFor='remember-login'
                    mb='0'
                    fontWeight='normal'>
                    show password
                  </FormLabel>
                </FormControl>
                <Button
                  variant='brand'
                  fontSize='10px'
                  type='submit'
                  w='100%'
                  maxW='350px'
                  h='45'
                  mb='20px'
                  mt='20px'
                  onClick={handleSignup}
                >
                  SIGN UP
                </Button>
              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
                <Text color={textColor} fontWeight='medium'>
                  Already have an account?
                  <Link
                    color={titleColor}
                    as='span'
                    ms='5px'
                    href='#'
                    fontWeight='bold' onClick={() => history.push("/auth/signin")}>
                    Sign In
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </GradientBorder>
        </Flex>


      </Flex>
    </Flex>
  );
}

export default SignUp;

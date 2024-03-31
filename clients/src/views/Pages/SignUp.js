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
  Tooltip,
  Avatar,
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
import { HiOutlineInformationCircle } from "react-icons/hi2";

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
      if (error.response) {
        console.error("Server API error:", error.response.data);
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.error("Network error:", error.request);
        toast.error("Network error. Please check your internet connection and try again.");
      } else {
        console.error("Error:", error.message);
        toast.error("Server Error. Please try again later.");
      }
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
      alignItems={'center'}
        h={{ sm: "initial", md: "unset" }}
        w={{ base: "90%" }}
        maxW='1044px'
        mx='auto'
        pt={{ sm: "100px", md: "0px" }}
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Flex mt={20} display={{base:'none', md:'none', lg:'block'}}>
          <Avatar src="https://i.pinimg.com/originals/0e/53/94/0e53948c0d24283e7cdd42f9bb0bda4e.jpg" borderRadius={'10px'} mixBlendMode={'color-burn'} width={'80%'} height={'70%'} />
        </Flex>
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
                <Flex alignItems={'center'} gap={2}>
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
                  </FormControl>
                  <Tooltip hasArrow label='Enter Your Full Name' bg='gray.300' color='black'>
                    <Text>
                      <HiOutlineInformationCircle fontSize={25} color="yellow" cursor={'pointer'} />
                    </Text>

                  </Tooltip>
                </Flex>

                <Flex alignItems={'center'} gap={2}>
                  <FormControl>
                    <FormLabel
                      color={titleColor}
                      ms='4px'
                      fontSize='sm'
                      fontWeight='normal'>
                      Type
                    </FormLabel>

                    <GradientBorder mb='24px'
                      h='50px'
                      w={{ base: "100%", lg: "fit-content" }}
                      borderRadius='20px'>
                      <Select
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

                        value={type}
                        onChange={(ev) => setType(ev.target.value)}
                      >
                        <option style={{ color: 'blue' }} value='admin'>Admin</option>
                        <option style={{ color: 'blue' }} value='superadmin'>Super Admin</option>
                        <option style={{ color: 'blue' }} value='adminViewer'>Spectator</option>
                      </Select>
                    </GradientBorder>
                  </FormControl>
                  <Tooltip hasArrow label='Please specify your user type.' bg='gray.300' color='black'>
                    <Text>
                      <HiOutlineInformationCircle fontSize={25} color="yellow" cursor={'pointer'} />
                    </Text>
                  </Tooltip>
                </Flex>

                <Flex alignItems={'center'} gap={2}>
                  <FormControl>
                    <FormLabel
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
                  </FormControl>
                  <Tooltip hasArrow label='your email address follows the standard email format. It should include the "@" symbol separating the username and the domain, followed by a valid domain extension (e.g., ".com", ".org").' bg='gray.300' color='black'>
                    <Text>
                      <HiOutlineInformationCircle fontSize={25} color="yellow" cursor={'pointer'} />
                    </Text>
                  </Tooltip>
                </Flex>

                <Flex alignItems={'center'} gap={2}>
                  <FormControl>
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
                        type={showPassword ? "text" : "password"}
                        placeholder='Your password'
                        value={password}
                        onChange={(obj) => setPassword(obj.target.value)}
                      />
                    </GradientBorder>
                  </FormControl>
                  <Tooltip hasArrow label='Your password must be at least 6 characters long.
                        It should contain at least one special character such as !@#$%^&*
              Include at least one alphabetical character (a-z or A-Z).
                      Include at least one numerical character (0-9).' bg='gray.300' color='black'>
                    <Text>
                      <HiOutlineInformationCircle fontSize={25} color="yellow" cursor={'pointer'} />
                    </Text>
                  </Tooltip>
                </Flex>

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

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  DarkMode,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import signInImage from "assets/img/signInImage.png";
import AuthFooter from "components/Footer/AuthFooter";
import Cookies from 'js-cookie';
import GradientBorder from "components/GradientBorder/GradientBorder";
import { useDispatch } from "react-redux";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { loginUser } from "Redux-Toolkit/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const titleColor = "white";
  const textColor = "gray.400";

  const handleSignin = async () => {
    if (email === "" || password === "") {
      toast.warning("Email and password are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }
    var passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.warning("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await dispatch(loginUser(email, password));
      console.log(res);
      if (res.msg === "Login Successful") {
        toast.success(res.msg);
        setTimeout(() => {
          history.push('/admin/dashboard')
        }, 1000)

        Cookies.set("Token", res.token);
        Cookies.set("User", res?.userDetails?.user);
        Cookies.set("Email", res?.userDetails?.email);
        Cookies.set("userType", res?.userDetails?.type);
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
    <Flex position='relative'>
      <Flex
        alignItems={'center'}
        minH='100vh'
        h={{ base: "120vh", lg: "fit-content" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        pt={{ sm: "100px", md: "0px" }}
        me={{ base: "auto", lg: "50px", xl: "auto" }}>

        <Flex mt={20} display={{base:'none', md:'none', lg:'block'}}>
          <Avatar src="https://i.pinimg.com/originals/0e/53/94/0e53948c0d24283e7cdd42f9bb0bda4e.jpg" borderRadius={'10px'} mixBlendMode={'color-burn'} width={'80%'} height={'70%'} />
        </Flex>
        <Flex
          alignItems='center'
          justifyContent='center'
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px='50px'>

          <Flex
            direction='column'
            w='100%'
            background='transparent'
            mt={{ base: "30px", md: "150px", lg: "140px", xl: "150px" }}
            mb={{ base: "30px", lg: "95px" }}>
            <ToastContainer />
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Nice to see you!
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Enter your email and password to sign in
            </Text>
            <Flex alignItems={'center'} gap={2}>
              <FormControl>
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'
                  color='white'>
                  Email
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                    type="email"
                    color='white'
                    bg='rgb(19,21,54)'
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    placeholder='Your email adress'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'
                  color='white'>
                  Password
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                    color='white'
                    bg='rgb(19,21,54)'
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    type={showPassword ? "text" : "password"}
                    placeholder='Your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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



            <FormControl display='flex' alignItems='center'>
              <DarkMode>
                <Switch id='remember-login' colorScheme='brand' me='10px' isChecked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} />
              </DarkMode>
              <FormLabel
                htmlFor='remember-login'
                mb='0'
                ms='1'
                fontWeight='normal'
                color='white'>
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
              mt='20px' onClick={handleSignin}>
              SIGN IN
            </Button>

            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link onClick={() => history.push("/auth/signup")} color={titleColor} fontWeight='bold' textDecoration={'underline'} ml={1}>Sign Up</Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;

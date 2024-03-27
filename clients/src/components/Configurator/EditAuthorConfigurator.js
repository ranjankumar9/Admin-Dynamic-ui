import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Text,
    FormControl,
    FormLabel,
    Select,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { getAuthors } from 'Redux-Toolkit/authortableSlice';
import { updateAuthor } from 'Redux-Toolkit/authortableSlice';
import { addAuthor } from 'Redux-Toolkit/authortableSlice';
import { Separator } from 'components/Separator/Separator';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export function EditAuthorConfigurator({ btnRef, isOpen, onClose, AuthorTables, editData, type }) {
    const [logo, setLogo] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("");
    const dispatch = useDispatch();
    const firstField = React.useRef();
    const [alertmsg, setAlertmsg] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertstatus, setAlertStatus] = useState("");
    // console.log(editdata,type)

    const handleSaveForm = () => {
        const isLogoValid = isValidURL(logo);
        if (!isLogoValid) {
            setAlert(true)
            setAlertStatus("warning")
            setTimeout(() => {
                setAlert(false)
            }, 2000)
            setAlertmsg("Please enter a valid URL for the logo");
            return;
        }
        if (name.length < 3) {
            setAlert(true)
            setAlertStatus("warning")
            setTimeout(() => {
                setAlert(false)
            }, 2000)
            setAlertmsg("Name should be at least 3 characters long");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setAlert(true)
            setAlertStatus("warning")
            setTimeout(() => {
                setAlert(false)
            }, 2000)
            setAlertmsg("Please enter a valid email address");
            return;
        }
        if (domain.length < 5) {
            setAlert(true)
            setAlertStatus("warning")
            setTimeout(() => {
                setAlert(false)
            }, 2000)
            setAlertmsg("Domain should be at least 5 characters long");
            return;
        }
        if (subdomain.length < 5) {
            setAlert(true)
            setAlertStatus("warning")
            setTimeout(() => {
                setAlert(false)
            }, 2000)
            setAlertmsg("Subdomain should be at least 5 characters long");
            return;
        }
        if (!logo || !name || !email || !domain || !subdomain || !status || !date) {
            setAlert(true)
            setAlertStatus("warning")
            setTimeout(() => {
                setAlert(false)
            }, 2000)
            setAlertmsg("Please fill in all fields");
            return;
        }

        const payload = { logo, name, email, domain, subdomain, status, date };
        // console.log(payload);
        dispatch(updateAuthor({ authorId: editData.id, authorData: payload }))
            .then((res) => {
                setAlert(true)
                setAlertStatus("success")
                setTimeout(() => {
                    setAlert(false)
                }, 2000)
                setAlertmsg(res.payload.msg)
                AuthorTables()
            })
            .catch((err) => {
                setAlert(true)
                setAlertStatus("error")
                setTimeout(() => {
                    setAlert(false)
                }, 2000)
                // setAlertmsg(res.payload.msg)
            })





        setTimeout(() => {
            onClose();
        }, 3000)

        setLogo("");
        setName("");
        setEmail("");
        setDate("");
        setStatus("");
        setDomain("");
        setSubdomain("");
    };

    // Function to check if a string is a valid URL
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };



    let alertColor;

    if (alertstatus === 'success') {
        alertColor = 'success';
    } else if (alertstatus === 'warning') {
        alertColor = 'warning';
    } else {
        alertColor = 'error';
    }


    const handleReset = () => {
        setLogo("");
        setName("");
        setEmail("");
        setDate("");
        setStatus("");
        setDomain("");
        setSubdomain("");
        setTimeout(() => {
            onClose()
        }, 1000)
    }

    const setEditData = () => {
        setLogo(editData.logo);
        setName(editData.name);
        setEmail(editData.email);
        setDate(editData.date);
        setStatus(editData.status);
        setDomain(editData.domain);
        setSubdomain(editData.subdomain);
    }
    useEffect(() => {
        setEditData()
    }, [editData])


    return (
        <>

            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)' backdropFilter='blur(42px)'>
                    <DrawerHeader pt='24px' px='24px'>
                        <DrawerCloseButton color='white' />

                        <Text color='white' fontSize='xl' fontWeight='bold' mt='16px'>
                            Dynamic UI Configurator
                        </Text>
                        <Text color='white' fontSize='md' mb='16px'>
                            See your dashboard options.
                        </Text>
                        {alert && (
                            <Alert status={alertColor} fontSize='12px'>
                                <AlertIcon />
                                {alertmsg}
                            </Alert>
                        )}
                        <Separator />
                    </DrawerHeader>

                    <DrawerBody>
                        <FormControl isRequired>
                            <FormLabel htmlFor='username' color='#fff'>Logo </FormLabel>
                            <Input
                                type="url"
                                color='white'
                                ref={firstField}
                                id='Enter url...'
                                placeholder='Enter image url...'
                                value={logo}
                                onChange={(obj) => setLogo(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>Name </FormLabel>
                            <Input
                                color='white'
                                id='Name...'
                                placeholder='Name...'
                                value={name}
                                onChange={(obj) => setName(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>Email </FormLabel>
                            <Input
                                color='white'
                                id='username'
                                placeholder='email...'
                                value={email}
                                onChange={(obj) => setEmail(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>domain </FormLabel>
                            <Input
                                color='white'
                                id='username'
                                placeholder='domain...'
                                value={domain}
                                onChange={(obj) => setDomain(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>sub-domain </FormLabel>
                            <Input
                                color='white'
                                id='username'
                                placeholder='subdomain'
                                value={subdomain}
                                onChange={(obj) => setSubdomain(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>status </FormLabel>
                            <Select placeholder='Select option' bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)' color='blue.500'
                                value={status}
                                onChange={(obj) => setStatus(obj.target.value)}>
                                <option value='online' color='black'>online</option>
                                <option value='offline' color='black'>offline</option>
                            </Select>
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>date </FormLabel>
                            <Input
                                color='white'
                                type="date"
                                id='username'
                                placeholder='Enter date...'
                                value={date}
                                onChange={(obj) => setDate(obj.target.value)}
                            />
                        </FormControl >
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='red' mr={3} onClick={handleReset}>
                            Reset
                        </Button>
                        <Button colorScheme='blue' onClick={handleSaveForm}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
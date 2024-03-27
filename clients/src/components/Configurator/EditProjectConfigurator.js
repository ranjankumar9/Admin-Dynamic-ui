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
import { updateProject } from 'Redux-Toolkit/projecttableSlice';

import { addProjectdata } from 'Redux-Toolkit/projecttableSlice';
import { Separator } from 'components/Separator/Separator';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export function EditProjectConfigurator({ isOpen, onClose, ProjectTables, editData }) {
    const [logo, setLogo] = useState("");
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");
    const [status, setStatus] = useState("")
    const [completion, setCompletion] = useState("");
    const dispatch = useDispatch();
    const firstField = React.useRef();
    const [alertmsg, setAlertmsg] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertstatus, setAlertStatus] = useState("");


    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSaveForm = () => {
        if (!logo || !name || !budget || !status || !completion) {
            setAlert(true);
            setAlertStatus("warning");
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            setAlertmsg("Please fill in all fields");
            return;
        }
        const isLogoValid = isValidURL(logo);
        if (!isLogoValid) {
            setAlert(true);
            setAlertStatus("warning");
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            setAlertmsg("Please enter a valid URL for the logo");
            return;
        }
        if (name.length < 3) {
            setAlert(true);
            setAlertStatus("warning");
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            setAlertmsg("Name should be at least 3 characters long");
            return;
        }
        if (completion < 10 || completion > 100) {
            setAlert(true);
            setAlertStatus("warning");
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            setAlertmsg("Completion should be between 10 and 100");
            return;
        }

        console.log(editData.id);

        const params = { logo, name, budget, status, completion };
        console.log(params);
        dispatch(updateProject({ projectId: editData.id, projectData: params }))
            .then((res) => {
                setAlert(true)
                setAlertStatus("success")
                setTimeout(() => {
                    setAlert(false)
                }, 2000)
                setAlertmsg(res.payload.msg)
                ProjectTables()
                // console.log(res);
            })
            .catch((error) => {
                setAlertmsg(res.payload.msg)
                console.log(error)
            });

        setTimeout(() => {
            onClose();
        }, 5000);
        setLogo("");
        setName("");
        setBudget("");
        setStatus("");
        setCompletion("");
    };


    const handleReset = () => {
        setLogo("")
        setName("")
        setBudget("")
        setStatus("")
        setCompletion("")
        setTimeout(() => {
            onClose()
        }, 2000)
    }
    let alertColor;

    if (alertstatus === 'success') {
        alertColor = 'success';
    } else if (alertstatus === 'warning') {
        alertColor = 'warning';
    } else {
        alertColor = 'error';
    }

    // console.log(editData)

    const SetInputData = () => {
        setLogo(editData.logo)
        setName(editData.name)
        setBudget(editData.budget)
        setStatus(editData.status)
        setCompletion(editData.progression)
    }
    useEffect(() => {
        SetInputData()
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
                                placeholder='Enter Project logo url...'
                                value={logo}
                                onChange={(obj) => setLogo(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>Company Name </FormLabel>
                            <Input
                                color='white'
                                id='Name...'
                                placeholder='Name...'
                                value={name}
                                onChange={(obj) => setName(obj.target.value)}
                            />
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>Project Budget</FormLabel>
                            <Input
                                color='white'
                                id='Name...'
                                placeholder='Enter Your Brdget...'
                                type='number'
                                value={budget}
                                onChange={(obj) => setBudget(obj.target.value)}
                            />
                        </FormControl >

                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>status</FormLabel>
                            <Select placeholder='Select option' bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)' color='blue.500'
                                value={status}
                                onChange={(obj) => setStatus(obj.target.value)}>
                                <option value='working' color='black'>Working</option>
                                <option value='done' color='black'>Done</option>
                                <option value='canceled' color='black'>Canceled</option>
                            </Select>
                        </FormControl >
                        <FormControl mt='15px' isRequired>
                            <FormLabel htmlFor='username' color='#fff'>Completion</FormLabel>
                            <Input
                                color='white'
                                type="number"
                                id='username'
                                placeholder='Project completion Percentage...'
                                value={completion}
                                onChange={(obj) => setCompletion(obj.target.value)}
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
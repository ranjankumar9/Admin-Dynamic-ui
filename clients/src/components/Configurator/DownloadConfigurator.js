import React, { useRef } from "react";
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
import { QRCode } from "react-qrcode-logo";
import { IoMdDownload } from "react-icons/io";
import qrlogo from '../../assets/img/projectlogo.png'


function DownloadConfigurator({ deleteid, isOpen, onClose, handleDelete, qrdata }) {
    const dispatch = useDispatch();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
        const canvas = qrCodeRef.current.querySelector('canvas');
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <ToastContainer />
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            // maxW="xs"
            >
                <ModalOverlay />
                <ModalContent bg='grey'
                    backdropFilter='blur(50px)' maxW="280px" maxH={'330px'}>
                    {/* <ModalHeader color='white'>Qr Code</ModalHeader>
                    <Separator></Separator>
                    <ModalCloseButton color='white' /> */}
                    <ModalBody pb={6} mt={5} display='flex' flexDirection={'column'} alignItems='center' justifyContent='center'>
                        <div ref={qrCodeRef} style={{ display: 'none' }}>
                            <QRCode
                                value={`name: ${qrdata.name}\nstatus: ${qrdata.status}\ndata: ${qrdata.logo}`}
                                size={250}
                                qrStyle='dots'
                                fgColor="#000000"
                                bgColor="#FFFFFF"
                                level="L"
                                renderAs="canvas"
                                eyeRadius={[
                                    [20, 20, 0, 20], // top/left eye
                                    [20, 20, 20, 0], // top/right eye
                                    [20, 0, 20, 20], // bottom/left
                                ]}
                            />
                        </div>
                        <QRCode

                            size={250}
                            value={`name: ${qrdata.name}\nstatus: ${qrdata.status}\nbudget: ${qrdata.budget}$`}
                            qrStyle='dots'
                            logoWidth={50}
                            eyeRadius={[
                                [20, 20, 0, 20], // top/left eye
                                [20, 20, 20, 0], // top/right eye
                                [20, 0, 20, 20], // bottom/left
                            ]}
                            removeQrCodeBehindLogo={true}
                            logoPaddingStyle={"square"}
                            logoPadding={1}
                            bgColor="transparent"
                            renderAs="canvas"
                        />
                        <IoMdDownload onClick={downloadQRCode} cursor={'pointer'} color="skyblue" fontSize={'30px'}/>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DownloadConfigurator;
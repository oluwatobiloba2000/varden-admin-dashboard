import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { isTokenExpired } from "../../utils/auth";
import socket from "../../utils/socketConnection";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from "@chakra-ui/react"


const SocketComponent = () => {
    let pathname = "";
    const cancelRef = React.useRef()
    const location = useLocation();
    const [showModal, setModalState] = useState(false);
    const [audio, setAudio] = useState();
    const [msg, setMessage] = useState("You have a new order. Go to order page?");

    useEffect(() => {
        if (!audio) {
           setAudio(new Audio("notification.mp3"));
        }
        socket.on("newOrder", handleNotificationFromSocket);
        return () => socket.off("newOrder", handleNotificationFromSocket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function notifyUser() {
        if (window) {
            pathname = window.location.pathname;
        } else {
            pathname = location.pathname;
        }

        try {
            await audio.play();
        } catch (error) {
            console.log(error);
        }

        if (pathname !== "/orders") {
            setMessage("You have a new order. Go to order page?");
            setModalState(true);
            return;
        }

        setMessage("You have a new order. Reload order page?");
        setModalState(true);
    }

    function handleNotificationFromSocket(data) {
        // console.log(data);
        try {
            if (isTokenExpired()) {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        if (!data) {
            return false;
        }

        notifyUser();
    }

    return (

        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={() => setModalState(false)}
            isOpen={showModal}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>New Order Received</AlertDialogHeader>
                <AlertDialogCloseButton/>
                <AlertDialogBody>
                    {msg}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={()=> setModalState(false)}>
                        Stay Here
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={
                        () => {
                            if (pathname !== "/orders") {
                                if (window) {
                                    window.location.replace("/orders");
                                } else {
                                    location.push("/orders");
                                }
                            } else {
                                if (window) {
                                    window.location.reload();
                                } else {
                                    location.reload();
                                }
                            }
                            setModalState(false);
                        }
                    }>
                        View Order
            </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SocketComponent;
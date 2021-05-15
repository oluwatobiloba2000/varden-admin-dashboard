import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/modal';
import React, { useEffect } from 'react';
import './index.css';

function SuccessModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

        useEffect(()=>{
            if(props.success){
                onOpen()
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.success])
    
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader color={props.success ? "#1b753d" : "red"}>{props.success ? "Successful" : "Failed"}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    <div id="success_tic">
                        <div className="page-body">
                            <h4
                                style={{
                                    textAlign: "center",
                                    color: props.success ? "green" : "#1ab394",
                                }}
                            >
                                {props.success && (
                                    <div className="checkmark-circle">
                                        <div className="background"></div>
                                        <div className="checkmark draw"></div>
                                    </div>
                                )}
                                <Text marginTop="15px" className="lead">{props.messageBody}</Text>
                            </h4>
                        </div>
                    </div>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} _hover={{
                        backgroundColor: 'green',
                        color: 'white'
                    }} variant="solid" backgroundColor="green" color="white" onClick={onClose}>
                        Okay
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default SuccessModal

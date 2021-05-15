import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { edit_order_api } from '../../api/orderApi';
import { edit_order } from '../../app/slice/orderSlice/order';
import HandleError from '../../component/HandleError';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';


function UpdateOrderComponent({ setOpen, IsOpen, order}) {
    const [currentUpdateOrderStatus, setCurrentUpdateOrderStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const dispatch = useDispatch();
    const toast = useToast()

    useEffect(() => {
        if (IsOpen) {
            onOpen();
        } else {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsOpen]);

    const updateOrderFn = async () => {
        if (currentUpdateOrderStatus) {
            setLoading(true);
            setError('');

            const data = await edit_order_api(order.id, { status: currentUpdateOrderStatus });
            if(data.success){
                setLoading(false);
                dispatch(edit_order({
                    order_number: order.order_number,
                    order_status: currentUpdateOrderStatus
                }))
                setOpen(false);
                toast({
                    title: "Order status updated success",
                    description: `Order status has been changed to ${currentUpdateOrderStatus}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setCurrentUpdateOrderStatus('')
            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return  handleRedirectBeforeLogout(history)
                  }
                  setLoading(false)
                  setError(data.error)
            }
        }
    }


    return (
        <Modal closeOnOverlayClick={false} onClose={() => {
            setOpen(false);
            onClose()
        }} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <HandleError error={error} />
                    <Text m="10px 0" fontSize="1.28571429em" fontWeight="bold">Order Number : {order && order.order_number}</Text>
                    <Text fontSize="1.28571429em" marginBottom="5px" fontWeight="normal">Status :</Text>
                    <Select value={currentUpdateOrderStatus} onChange={(event) => {
                        setCurrentUpdateOrderStatus(event.target.value)
                    }
                    } placeholder="Select option">
                        <option value="completed">completed</option>
                        <option value="processing">processing</option>
                        <option value="pending">pending</option>
                        <option value="failed">failed</option>
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button isLoading={loading} colorScheme="blue" mr={3} onClick={() => updateOrderFn()}>
                        Update
                    </Button>
                    <Button onClick={() => {
                        setOpen(false)
                        onClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UpdateOrderComponent;

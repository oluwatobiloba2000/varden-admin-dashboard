import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { update_payment_api } from '../../api/orderApi';
import { edit_order } from '../../app/slice/orderSlice/order';
import HandleError from '../../component/HandleError';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';

function UpdatePayment({ setOpen, IsOpen, order}) {
    const [currentUpdatePaymentStatus, setCurrentUpdatePaymentStatus] = useState();
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

    const updateOrderPaymentFn = async () => {
        if (currentUpdatePaymentStatus) {
            setLoading(true);
            setError('');

            const data = await update_payment_api(order.id, { payment_status: currentUpdatePaymentStatus, order_status: order.order_status });
            if(data.success){
                setLoading(false);
                dispatch(edit_order({
                    order_number: order.order_number,
                    payment_status: currentUpdatePaymentStatus
                }))
                setOpen(false);
                toast({
                    title: "Order status updated success",
                    description: `Order Payment status has been changed to ${currentUpdatePaymentStatus}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setCurrentUpdatePaymentStatus('')
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
        <Modal closeOnOverlayClick={false} onClose={()=> {
            setOpen(false)
            onClose()
            }} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <HandleError error={error} />
                    <Text m="10px 0" fontSize="1.28571429em" fontWeight="bold">Order Number : {order && order.order_number}</Text>
                    <Text marginBottom="5px" fontSize="1.28571429em" fontWeight="normal">Status :</Text>
                    <Select placeholder="Select option" value={currentUpdatePaymentStatus} onChange={(event) => {
                        setCurrentUpdatePaymentStatus(event.target.value)
                    }
                    }>
                        <option value="pending">pending</option>
                        <option value="Paid">paid</option>
                        <option value="confirmed">confirmed</option>
                        <option value="refunded">refunded</option>
                        <option value="cancelled">cancelled</option>
                        <option value="expired">expired</option>
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button isLoading={loading} colorScheme="blue" onClick={()=> updateOrderPaymentFn()} mr={3}>
                        Update
                    </Button>
                    <Button onClick={() => {
                        setOpen(false);
                        onClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UpdatePayment;

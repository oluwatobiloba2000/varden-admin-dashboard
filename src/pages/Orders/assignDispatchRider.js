import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getDispatchers } from '../../api/dispatchers';
import { assignDispatchRiderApi } from '../../api/orderApi';
import { edit_order } from '../../app/slice/orderSlice/order';
import HandleError from '../../component/HandleError';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';

function AssignDispatchRider({ setOpen, IsOpen, order}) {
    const [currentDispatcher, setCurrentDispatcher] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dispatchers, setDispatchers] = useState([]);
    const [loadingDispatchers, setLoadingDispatchers] = useState(false);
    const [dispatchersError, setDispatchersError] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const dispatch = useDispatch();
    const toast = useToast()

    useEffect(() => {
        if (IsOpen) {
            fetchDispatchers()
            onOpen();
        } else {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsOpen]);

    const fetchDispatchers = async () => {
        // if (!dispatchers.length) {
            setLoadingDispatchers(true);
            setDispatchers([]);
            setDispatchersError('');
            setCurrentDispatcher('');
            setError('')

            const data = await getDispatchers();
            if(data.success){
                setLoadingDispatchers(false);
               setDispatchers(data.data);
            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return  handleRedirectBeforeLogout(history)
                  }
                  setLoadingDispatchers(false);
                  setDispatchersError(data.error)
            }
        // }
    }

    const assignDispatchRider = async () =>{
        if (currentDispatcher) {
            setLoading(true);
            setError('');

            const data = await assignDispatchRiderApi(currentDispatcher.id, order.id);
            if(data.success){
                setLoading(false);
                dispatch(edit_order({
                    order_number: order.order_number,
                    dispatcher_name: currentDispatcher.dispatcher_name
                }))
                setOpen(false);
                toast({
                    title: "Dispatcher Assigned success",
                    description: `${currentDispatcher.dispatcher_name} has been assigned to order`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setCurrentDispatcher('')
            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return history.push('/login');
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
                <ModalHeader>Assign Dispatcher Rider</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <HandleError error={error} />
                    <Text m="10px 0" fontSize="1.28571429em" fontWeight="bold">Order Number : {order && order.order_name}</Text>
                    <Text marginBottom="5px" fontSize="1.28571429em" fontWeight="normal">Status :</Text>
                    {loadingDispatchers 
                    ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner size="xs" marginRight="5px"  /> Loading dispatchers ..</div> 
                    : (dispatchers 
                        && dispatchers.length > 0
                      )
                    ? <Select placeholder="Select option" value={currentDispatcher.id} onChange={(event) => {setCurrentDispatcher({id: event.target.value,  dispatcher_name: event.target.options[event.target.selectedIndex].text})}}>
                      {dispatchers 
                       && dispatchers.length > 0 
                       && dispatchers.map((dispatcher)=>  <option key={dispatcher.id} id={dispatcher.id} value={dispatcher.id}>{dispatcher.name}</option>)}
                      </Select> 
                    : <div style={{display: 'flex', justifyContent: 'center'}}>
                        <HandleError error={dispatchersError || "No dispatchers at the moment"}/>
                        <Button variant="solid" onClick={()=> fetchDispatchers()}
                          height="36px"
                           backgroundColor="#dd6b20" color="white">Retry</Button>
                    </div> 
                }
                </ModalBody>

                <ModalFooter>
                   {loadingDispatchers 
                   ? <Spinner size="xs" marginRight="21px" /> 
                   : dispatchersError 
                   ? "" 
                   : <Button onClick={()=> assignDispatchRider()} isLoading={loading} colorScheme="blue" mr={3}>Update</Button>}
                    <Button onClick={() => {
                        setOpen(false)
                        onClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AssignDispatchRider;

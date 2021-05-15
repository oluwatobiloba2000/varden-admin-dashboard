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
import { fetchAllDistributionCenters } from '../../api/distributionCenterApi';
import { assignDistributionCenterApi } from '../../api/orderApi';
import { edit_order } from '../../app/slice/orderSlice/order';
import HandleError from '../../component/HandleError';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';

function AssignDistributionCenter({ setOpen, IsOpen, order}) {
    const [currentDistributionCenter, setcurrentDistributionCenter] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [distributionCenters, setdistributionCenters] = useState([]);
    const [loadingdistributionCenters, setLoadingdistributionCenters] = useState(false);
    const [distributionCentersError, setdistributionCentersError] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const dispatch = useDispatch();
    const toast = useToast()

    useEffect(() => {
        if (IsOpen) {
            fetchdistributionCenters()
            onOpen();
        }else{
            onClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsOpen]);

    const fetchdistributionCenters = async () => {
        // if (!distributionCenters.length) {
            setLoadingdistributionCenters(true);
            setdistributionCenters([]);
            setdistributionCentersError('');
            setcurrentDistributionCenter('');
            setError('')

            const data = await fetchAllDistributionCenters();
            if(data.success){
                setLoadingdistributionCenters(false);
               setdistributionCenters(data.data);
            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return  handleRedirectBeforeLogout(history)
                  }
                  setLoadingdistributionCenters(false);
                  setdistributionCentersError(data.error)
            }
        // }
    }

    const AssignDistributionCenter = async () =>{
        if (currentDistributionCenter) {
            setLoading(true);
            setError('');

            const data = await assignDistributionCenterApi(currentDistributionCenter.id, order.id);
            if(data.success){
                setLoading(false);
                dispatch(edit_order({
                    order_number: order.order_number,
                    dcs_name: currentDistributionCenter.dcs_name
                }))
                setOpen(false);
                toast({
                    title: "Distribution center Assigned success",
                    description: `${currentDistributionCenter.dcs_name} has been assigned to order`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setcurrentDistributionCenter('')
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
            setOpen(false);
            onClose()
            }} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Assign Distribution Center</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <HandleError error={error} />
                    <Text m="10px 0" fontSize="1.28571429em" fontWeight="bold">Order Number : {order && order.order_number}</Text>
                    <Text marginBottom="5px" fontSize="1.28571429em" fontWeight="normal">Status :</Text>
                    {loadingdistributionCenters 
                    ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner size="xs" marginRight="5px"  /> Loading Distribution Centers ..</div> 
                    : (distributionCenters 
                        && distributionCenters.length > 0
                      )
                    ? <Select placeholder="Select option" value={currentDistributionCenter.id} onChange={(event) => {setcurrentDistributionCenter({id: event.target.value,  dcs_name: event.target.options[event.target.selectedIndex].text})}}>
                      {distributionCenters 
                       && distributionCenters.length > 0 
                       && distributionCenters.map((center)=>  <option key={center.id}  value={center.id}>{center.dc_name}</option>)}
                      </Select> 
                    : <div style={{display: 'flex', justifyContent: 'center'}}>
                        <HandleError error={distributionCentersError || "No distribution centers at the moment"}/>
                        <Button variant="solid" onClick={()=> fetchdistributionCenters()}
                          height="36px"
                           backgroundColor="#dd6b20" color="white">Retry</Button>
                    </div> 
                }
                </ModalBody>

                <ModalFooter>
                   {loadingdistributionCenters 
                   ? <Spinner size="xs" marginRight="21px" /> 
                   : distributionCentersError 
                   ? "" 
                   : <Button onClick={()=> AssignDistributionCenter()} isLoading={loading} colorScheme="blue" mr={3}>Update</Button>}
                    <Button onClick={() => {
                       setOpen(false)
                        onClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AssignDistributionCenter;

import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getAdminDetailsAsync } from '../../app/slice/adminSlice/admin';
import Loader from '../../component/Loader';
import { isTokenExpired } from '../../utils/auth';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { FiCloudOff } from "react-icons/fi";
import useCustomTransition from '../../customHook/useCustomTransition';
import './index.css';
import { getDispatcherById } from '../../api/dispatchers';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';

function DispatchRiderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dispatchRider, setDispatcherRider] = useState('');
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token'){
            if(id){
                fetchDispatchers();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchDispatchers = async () => {
        setLoading(true);
        setError('')

        const data = await getDispatcherById(id);
        if (data.success) {
            setLoading(false);
            setDispatcherRider(data.data);
        } else {
            if (data.error && data.error === 'Request failed with status code 401') {
                return handleRedirectBeforeLogout(history)
            }
            setLoading(false);
            setError(data.error)
        }
    }


    return (

        <Box marginTop="5px" className={transitionClass}>
            {loading ? <Loader /> :
                error ? <>
                    <Box w="100%" display="flex">
                        <Alert w="85%" h="37px" fontSize="12px" margin="0 5px 10px 0" status="warning">
                            <Icon fontSize="18px" marginRight="15px" color="#dd6b20" as={FiCloudOff} />
                            {error}
                        </Alert>
                        <Button width="124px" height="37px" borderRadius="36px" onClick={() => dispatch(getAdminDetailsAsync(history, fetchDispatchers(id)))} leftIcon={<BsArrowCounterclockwise />} colorScheme="orange" variant="solid">
                            Retry
                         </Button>
                    </Box>
                </> : dispatchRider ? <form style={{ margin: " 30px 0px 0px 0px" }}>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input readOnly defaultValue={dispatchRider && dispatchRider.name} />
                    </FormControl>

                    <FormControl marginTop="10px" id="email">
                        <FormLabel>Email</FormLabel>
                        <Input readOnly defaultValue={dispatchRider && dispatchRider.user.email} />
                    </FormControl>

                    {(dispatchRider && dispatchRider.order.map(({ order_number, quantity, delivery_status, order_status, delivery_address }) => (
                        <Box className="box-group" >
                            <div className="list-group-item box-list-header"><b>order:</b> {order_number}</div>
                            <div className="list-group-item"><b>quantity:</b> {quantity}</div>
                            <div className="list-group-item"><b>Delivery Status:</b> {delivery_status}</div>
                            <div className="list-group-item"><b>Order Status:</b> {order_status}</div>
                            <div className="list-group-item"><b>Delivery Address:</b> {delivery_address}</div>
                        </Box>
                    )))}
                </form> : !loading && !dispatchRider && <Alert status="error">
                             <AlertIcon />
                        Dispatch Rider not found
                    </Alert>
            }
        </Box>
    )
}

export default DispatchRiderDetails;

import { Alert } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getAdminDetailsAsync } from '../../app/slice/adminSlice/admin';
import Loader from '../../component/Loader';
import { isTokenExpired } from '../../utils/auth';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { FiCloudOff } from "react-icons/fi";
import useCustomTransition from '../../customHook/useCustomTransition';

function AdminDetails() {
    const { adminId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const adminDetailsState = useSelector(state => state.admins);
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();
     
        if (!TokenExpired || TokenExpired !== 'empty token' || (adminDetailsState.adminDetails && adminDetailsState.adminDetails.id !== adminId)) {
            if(adminDetailsState.adminDetails && (adminDetailsState.adminDetails.id !== parseInt(adminId))){
                dispatch(getAdminDetailsAsync(history, adminId))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        
        <Box marginTop="5px" className={transitionClass}>
            {adminDetailsState.adminDetailsLoading ? <Loader /> :
                adminDetailsState.adminDetailsError ? <>
                    <Box w="100%" display="flex">
                        <Alert w="85%" h="37px" fontSize="12px" margin="0 5px 10px 0" status="warning">
                            <Icon fontSize="18px" marginRight="15px" color="#dd6b20" as={FiCloudOff} />
                                          {adminDetailsState.adminDetailsError}
                                        </Alert>
                        <Button width="124px" height="37px" borderRadius="36px" onClick={() => dispatch(getAdminDetailsAsync(history, adminId))} leftIcon={<BsArrowCounterclockwise />} colorScheme="orange" variant="solid">
                            Retry
                         </Button>
                    </Box>
                </> : adminDetailsState.adminDetails ? <form style={{margin:" 30px 0px 0px 0px"}}>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input readOnly defaultValue={adminDetailsState.adminDetails.name} />
                    </FormControl>

                    <FormControl marginTop="10px" id="email">
                        <FormLabel>Email</FormLabel>
                        <Input readOnly defaultValue={adminDetailsState.adminDetails.email} />
                    </FormControl>

                    <FormControl marginTop="10px" id="employeeId">
                        <FormLabel>Employee Id</FormLabel>
                        <Input readOnly defaultValue={adminDetailsState.adminDetails.employee_id} />
                    </FormControl>

                    <FormControl marginTop="10px" id="phone number">
                        <FormLabel>Phone Number</FormLabel>
                        <Input readOnly placeholder="Enter phone number" />
                    </FormControl>
                </form> : <div>Admin not found</div>}
        </Box>
    )
}

export default AdminDetails;

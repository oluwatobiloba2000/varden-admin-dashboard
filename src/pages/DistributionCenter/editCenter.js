import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import Loader from '../../component/Loader';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import HandleError from '../../component/HandleError';
import { Button } from '@chakra-ui/button';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@chakra-ui/toast';
import { fetchSingleCenterDetails, updateDistributionCenter } from '../../api/distributionCenterApi';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';

const schema = yup.object().shape({
    dc_name: yup.string().required(),
    dc_email: yup.string().required(),
    dc_address: yup.string().required(),
    dc_phone_number: yup.string().min(11).required()
});


function EditCenterdetails() {
    const { id } = useParams();
    // const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    // const productState = useSelector(state => state.products);
    const [transitionClass] = useCustomTransition();

    const [loading, setLoading] = useState(false);
    const [centerDetails, setCenterDetails] = useState();
    const [error, setError] = useState();

    // const [updateError, setUpdateError] = useState();

    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            fetchDistributionCenterDetails()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const fetchDistributionCenterDetails = async () =>{
        setLoading(true);
        setError('');
 
        const dataFromApi = await fetchSingleCenterDetails(id);
        if(dataFromApi.success){
            setLoading(false);
            setCenterDetails(dataFromApi.data)
            setValue('dc_name', dataFromApi.data.dc_name)
            setValue('dc_email', dataFromApi.data.dc_email)
            setValue('dc_address', dataFromApi.data.dc_address)
            setValue('dc_phone_number', dataFromApi.data.dc_phone_number)
            }else{
            if(dataFromApi.error && dataFromApi.error === 'Request failed with status code 401'){
                return  handleRedirectBeforeLogout(history)
              }
              setLoading(false);
              setError(dataFromApi.error)
        }
    }

    const handleEditProduct = async (data) => {
        setEditLoading(true);
        // setUpdateError('');
 
        const dataFromApi = await updateDistributionCenter(id, data);
        if(dataFromApi.success){
            setEditLoading(false);
            toast({
                title: 'Distribution center has been updated',
                status: 'success'
            })
            }else{
            if(dataFromApi.error && dataFromApi.error === 'Request failed with status code 401'){
                return  handleRedirectBeforeLogout(history)
              }
              setEditLoading(false);
            //   setUpdateError(dataFromApi.error)
        }
    }

    return (

        <Box marginTop="5px" className={transitionClass}>
            <HandleError error={error} isAsyncFn={true} retryFn={() => fetchDistributionCenterDetails(history)} />
            {loading ? <Loader /> :
                (centerDetails) &&
                <form onSubmit={handleSubmit(handleEditProduct)} style={{ margin: " 30px 0px 0px 0px" }}>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input isInvalid={errors.dc_name && errors.dc_name.message ? true : false} {...register("dc_name")} placeholder="Enter Name" type="text" />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.dc_name && errors.dc_name.message}</Text>
                    </FormControl>

                    <FormControl marginTop="10px" id="email">
                        <FormLabel>Email</FormLabel>
                        <Input isInvalid={errors.dc_email && errors.dc_email.message ? true : false} {...register("dc_email")} placeholder="Enter Email" type="email" />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.dc_email && errors.dc_email.message}</Text>
                    </FormControl>


                    <FormControl marginTop="10px">
                        <FormLabel>Address</FormLabel>
                        <InputGroup>
                            <Input
                                pr="4.5rem"
                                type="text"
                                isInvalid={errors.dc_address && errors.dc_address.message ? true : false} {...register("dc_address")}
                                placeholder="Enter Address"
                            />
                        </InputGroup>

                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.dc_address && errors.dc_address.message}</Text>
                    </FormControl>

                    <FormControl marginTop="10px">
                        <FormLabel>Phone Number</FormLabel>
                        <InputGroup>
                            <Input
                                pr="4.5rem"
                                type="text"
                                isInvalid={errors.dc_phone_number && errors.dc_phone_number.message ? true : false} {...register("dc_phone_number")}
                                placeholder="Enter Phone number"
                            />
                        </InputGroup>

                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.dc_phone_number && errors.dc_phone_number.message}</Text>
                    </FormControl>


                    <Flex marginTop="10px" w="300px" justifyContent="space-between">
                        <Button _hover={{
                            backgroundColor: 'green',
                            color: 'white'
                        }} loadingText="updating..." isLoading={editLoading} color="white" backgroundColor="#21ba45" variant="solid" type="submit">
                            Update
                        </Button>
                    </Flex>
                </form>

            }
        </Box>
    )
}

export default EditCenterdetails;

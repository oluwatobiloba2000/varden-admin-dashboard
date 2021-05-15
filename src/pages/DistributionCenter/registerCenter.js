import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { FiCloudOff } from "react-icons/fi";
import useCustomTransition from '../../customHook/useCustomTransition';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Collapse, useToast } from "@chakra-ui/react";
import { registerDispatcherApi } from '../../api/distributionCenterApi';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().min(4).required(),
    phone_number: yup.string().min(11).required(),
});


function RegisterDistribututionCenter() {
    const history = useHistory();
    const toast = useToast();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [transitionClass] = useCustomTransition();

    const handleSubmitAddDispatcher = async (data) => {
       setLoading(true);
       setError('');

       const dataFromApi = await registerDispatcherApi(data);
       if(dataFromApi.success){
           setLoading(false);
           toast({
               title: "Distribution Center Created Successfully",
               status: 'success',
               isClosable: true
           })
           reset()
           history.push('/dsc');
       }else{
           if(data.error && data.error === 'Request failed with status code 401'){
               return  handleRedirectBeforeLogout(history)
             }
             setLoading(false);
             setError(data.error)
       }
    }

    return (

        <Box className={transitionClass}>
            <Collapse in={error ? true: false} animateOpacity>
                <Box w="100%" marginTop="15px" display="flex">
                    <Alert w="85%" h="37px" fontSize="12px" margin="0 5px 10px 0" status="warning">
                       {error === 'Network Error' ? <Icon fontSize="18px" marginRight="15px" color="#dd6b20" as={FiCloudOff} /> : <AlertIcon/>}
                        {error}
                    </Alert>
                    <Button width="124px" height="37px" borderRadius="36px" onClick={handleSubmit(handleSubmitAddDispatcher)} leftIcon={<BsArrowCounterclockwise />} colorScheme="orange" variant="solid">
                        Retry
                    </Button>
                </Box>
            </Collapse>

            <form onSubmit={handleSubmit(handleSubmitAddDispatcher)} style={{ margin: "10px 0px 0px 0px" }}>
                <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input isInvalid={errors.name && errors.name.message ? true : false} {...register("name")} placeholder="Enter Name" type="text" />
                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.name && errors.name.message}</Text>
                </FormControl>

                <FormControl marginTop="10px" id="email">
                    <FormLabel>Email</FormLabel>
                    <Input isInvalid={errors.email && errors.email.message ? true : false} {...register("email")} placeholder="Enter Email" type="email" />
                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.email && errors.email.message}</Text>
                </FormControl>


                <FormControl marginTop="10px">
                    <FormLabel>Address</FormLabel>
                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            type="text"
                            isInvalid={errors.address && errors.address.message ? true : false} {...register("address")}
                            placeholder="Enter Address"
                        />
                    </InputGroup>

                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.address && errors.address.message}</Text>
                </FormControl>

                <FormControl marginTop="10px">
                    <FormLabel>Phone Number</FormLabel>
                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            type="text"
                            isInvalid={errors.phone_number && errors.phone_number.message ? true : false} {...register("phone_number")}
                            placeholder="Enter Phone number"
                        />
                    </InputGroup>

                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.phone_number && errors.phone_number.message}</Text>
                </FormControl>

                <Button variant="solid"
                    _active={{
                        transform: "scale(0.98)",
                        backgroundColor: "#098626f5"
                    }}
                    _hover={{
                        backgroundColor: "#19a53a"
                    }}
                    backgroundColor="#21ba45" isLoading={loading} loadingText="creating....." color="white" marginTop="10px" type="submit">Submit</Button>
            </form>
        </Box>
    )
}

export default RegisterDistribututionCenter;

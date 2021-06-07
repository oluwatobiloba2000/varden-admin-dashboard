import React from 'react'
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { FiCloudOff } from "react-icons/fi";
import useCustomTransition from '../../customHook/useCustomTransition';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Collapse, useToast } from "@chakra-ui/react"
import { addNewAdminAsync } from '../../app/slice/adminSlice/admin';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    employee_id: yup.string().required(),
    phone_number: yup.string().min(11).required(),
    password: yup.string().min(4).required(),
});


function CreateAdmin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const [showPasswordVisibility, setShow] = React.useState(false)

    const adminState = useSelector(state => state.admins);
    const [transitionClass] = useCustomTransition();

    const handleClickTogglePasswordVisibility = () => setShow(!showPasswordVisibility)
    const handleSubmitAddAdmin = (data) => {
        dispatch(addNewAdminAsync(history, data, toast, reset))
    }

    return (

        <Box className={transitionClass}>
            <Collapse in={adminState.newAdminError ? true: false} animateOpacity>
                <Box w="100%" marginTop="15px" display="flex">
                    <Alert w="85%" h="37px" fontSize="12px" margin="0 5px 10px 0" status="warning">
                       {adminState.newAdminError === 'Network Error' ? <Icon fontSize="18px" marginRight="15px" color="#dd6b20" as={FiCloudOff} /> : <AlertIcon/>}
                        {adminState.newAdminError}
                    </Alert>
                    <Button width="124px" height="37px" borderRadius="36px" onClick={handleSubmit(handleSubmitAddAdmin)} leftIcon={<BsArrowCounterclockwise />} colorScheme="orange" variant="solid">
                        Retry
                    </Button>
                </Box>
            </Collapse>

            <form onSubmit={handleSubmit(handleSubmitAddAdmin)} style={{ margin: "10px 0px 0px 0px" }}>
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

                <FormControl marginTop="10px" id="employeeId">
                    <FormLabel>Employee Id</FormLabel>
                    <Input isInvalid={errors.employee_id && errors.employee_id.message ? true : false} {...register('employee_id')} placeholder="Enter Phone number" type="tel" />
                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.employee_id && errors.employee_id.message}</Text>
                </FormControl>

                <FormControl marginTop="10px" id="phone number">
                    <FormLabel>Phone Number</FormLabel>
                    <Input isInvalid={errors.phone_number && errors.phone_number.message ? true : false} {...register("phone_number")} placeholder="Enter phone number" type="tel" />
                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.phone_number && errors.phone_number.message}</Text>
                </FormControl>

                <FormControl marginTop="10px">
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            type={showPasswordVisibility ? "text" : "password"}
                            isInvalid={errors.password && errors.password.message ? true : false} {...register("password")}
                            placeholder="Enter password"

                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClickTogglePasswordVisibility}>
                                {showPasswordVisibility ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                        marginLeft="4px"
                        color="#E53E3E"
                    >{errors.password && errors.password.message}</Text>
                </FormControl>

                <Button variant="solid"
                    _active={{
                        transform: "scale(0.98)",
                        backgroundColor: "#098626f5"
                    }}
                    _hover={{
                        backgroundColor: "#19a53a"
                    }}
                    backgroundColor="#21ba45" isLoading={adminState.newAdminLoading} loadingText="creating....." color="white" marginTop="10px" type="submit">Submit</Button>
            </form>
        </Box>
    )
}

export default CreateAdmin;

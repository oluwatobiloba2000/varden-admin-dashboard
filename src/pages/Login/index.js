import React from 'react';
import { Box, Container, Text } from '@chakra-ui/layout';
import Logo from '../../component/Logo/logo';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiCloudOff } from "react-icons/fi";
import * as yup from "yup";
import './index.css';
import { login } from '../../app/slice/authSlice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/alert';
import Icon from '@chakra-ui/icon';
import { useHistory } from 'react-router';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Helmet } from 'react-helmet';
import { useQuery } from '../../customHook/useQuery';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
});


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const state = useSelector(state => state.loggedinadmin);
    const history = useHistory();
    const dispatch = useDispatch();
    const query = useQuery();
    const [transitionClass] = useCustomTransition();
    const submitForm = (data) => {
        dispatch(login(data, history, query))
    }

    return (
        <Container color="black" display="flex" backgroundColor="#f9f9f9" h="100vh" justifyContent="center" alignItems="center" maxW="100%">
            <Helmet>
                <title>Login || varden Admin Dashboard</title>
            </Helmet>
            <Box className={`login_form ${transitionClass}`} w="300px" backgroundColor="white" minH="500px">
                {state.authError && <Alert status={state.authError === 'Network Error' ? 'warning' : 'error'}>
                    {state.authError === 'Network Error' ? <Icon fontSize="25px"
                        marginRight="15px"
                        color="gray" as={FiCloudOff} /> : <AlertIcon />}
                    <AlertDescription color="gray">{state.authError}</AlertDescription>
                </Alert>}
                <Logo style={{ width: '200px', margin: 'auto', height: '174px' }} />
                <Text textAlign="center" fontWeight="500" fontSize="1.7rem">Welcome Back</Text>
                <form onSubmit={handleSubmit(submitForm)} style={{ margin: '25px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input isInvalid={errors.email && errors.email.message ? true : false} {...register('email')} fontSize="12px" placeholder="Enter Email Address" marginBottom="15px" type="email" />
                        <Text fontSize="13px" marginTop="-13px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E">
                            {errors.email && errors.email.message}</Text>
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input isInvalid={errors.password && errors.password.message ? true : false} {...register("password")} fontSize="12px" type="password" placeholder="Enter Password" />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.password && errors.password.message}</Text>
                    </FormControl>

                    <Button
                        backgroundColor="#21ba45"
                        color="white"
                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                        _hover={{
                            backgroundColor: '#21ba45',
                            color: 'white',
                            transform: "scale(0.98)",
                        }}
                        type="submit"
                        width="100%"
                        marginTop="25px"
                        isLoading={state.authLoading}
                        loadingText="Login..."
                        colorScheme="teal"
                        variant="outline">
                        Login
                     </Button>
                </form>
            </Box>
        </Container>
    )
}

export default Login;

import React from 'react';
import { Box, Container, Text } from '@chakra-ui/layout';
import Logo from '../../component/Logo/logo';
import './index.css';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

function Login() {
    return (
        <Container color="black" display="flex" backgroundColor="#f9f9f9" h="100vh" justifyContent="center" alignItems="center" maxW="100%">
            <Box className="login_form" w="300px" backgroundColor="white" h="500px">
                <Logo style={{ width: '200px', margin: 'auto', height: '174px' }} />
                <Text textAlign="center" fontWeight="500" fontSize="1.7rem">Welcome Back</Text>
                <form onSubmit={(e)=> e.preventDefault()} style={{ margin: '25px 28px',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input fontSize="12px" marginBottom="15px" type="email" />
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
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

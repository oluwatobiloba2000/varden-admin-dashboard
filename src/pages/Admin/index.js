import { Box, Container } from '@chakra-ui/layout'
import React from 'react'
import Header from '../../component/Header'
import Sidebar from '../../component/Sidebar'

function Admin() {
    return (
        <Container h="100vh" maxW="100%" padding="0" width="100%">
            <Box display="flex" h="100%">
               <Sidebar />
                <Box>
                    <Header />
                </Box>

            </Box>
        </Container>
    )
}

export default Admin

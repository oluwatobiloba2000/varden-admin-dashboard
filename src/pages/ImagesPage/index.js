import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import './index.css';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/SideBar/Sidebar';
import { useLocation } from 'react-router';
import useCustomTransition from '../../customHook/useCustomTransition';
import {Helmet} from 'react-helmet';

function Images() {
    const location = useLocation();
    const text = useColorModeValue('light', 'dark');
    const [transitionClass]= useCustomTransition();

    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
            <Helmet>
                <title>Images || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                   
                <div className={transitionClass}>
                    <h1 className="title_head">
                        Image Gallery
                            </h1>
                    <Box w="100%" className="admin_table_container">
                        <div className="create_button_container">
                            <button className="create_button_style">Upload Image</button>
                        </div>

                        <Tabs variant="soft-rounded" colorScheme="green">
                            <TabList>
                                <Tab className="image_gallery_tab">Products</Tab>
                                <Tab className="image_gallery_tab">Promos</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <p>Products Gallery</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </div>
            </Box>
        </Box>
        </Container>
    )
}

export default Images;

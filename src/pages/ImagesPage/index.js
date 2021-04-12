import React from 'react'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import './index.css';

function Images() {

    return (
        <div>
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
    )
}

export default Images;

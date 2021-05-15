import React, { useState } from 'react'
import {
    Box, Drawer, List, ListIcon, ListItem, Stack,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useMediaQuery,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiCartAlt, BiDoorOpen, BiImages, BiShoppingBag, BiUser } from "react-icons/bi";
import { useColorModeValue } from '@chakra-ui/react';
import { clearTokenInLocalStorage } from '../../utils/auth';
import { FaBiking, FaSatelliteDish } from 'react-icons/fa';
import { useHistory } from 'react-router';
import './Sidebar.css';

function Sidebar(props) {
    const text = useColorModeValue('light', 'dark');
    const history = useHistory();
    const [sideNavCloseModal, setSidenavCloseModal] = useState(false);
    const [isSmallerThan650] = useMediaQuery("(max-width: 650px)")

    const sidebarContent = () => (
        <Stack marginTop="60px" spacing={4} direction="column">
            <Link to="/admin" >
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/admin' && 'side_nav_active'}`}
                        color="primary.100">
                        <ListIcon as={BiUser} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Admin</span>
                    </ListItem>
                </List>
            </Link>

            <Link to="/customers" >
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/customers' && 'side_nav_active'}`} color="primary.100">
                        <ListIcon as={BiUser} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Customers</span>
                    </ListItem>
                </List>
            </Link>

            <Link to="/products">
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/products' && 'side_nav_active'}`} color="primary.100">
                        <ListIcon as={BiShoppingBag} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Products</span>
                    </ListItem>
                </List>
            </Link>

            <Link to="/images">
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/images' && 'side_nav_active'}`} color="primary.100">
                        <ListIcon as={BiImages} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Images</span>
                    </ListItem>
                </List>
            </Link>

            <Link to="/orders">
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/orders' && 'side_nav_active'}`} color="primary.100">
                        <ListIcon as={BiCartAlt} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Orders</span>
                    </ListItem>
                </List>
            </Link>

            <Link to="/dispatchers">
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/dispatchers' && 'side_nav_active'}`} color="primary.100">
                        <ListIcon as={FaBiking} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Dispatch Riders</span>
                    </ListItem>
                </List>
            </Link>


            <Link to="/dsc">
                <List spacing={3}>
                    <ListItem className={`sidenav_list_item ${props.active === '/dsc' && 'side_nav_active'}`} color="primary.100">
                        <ListIcon as={FaSatelliteDish} w="20px" h="20px" color="primary.100" />
                        <span style={{
                            marginLeft: '10px',
                            marginTop: '3px'
                        }}>Distribution Centers</span>
                    </ListItem>
                </List>
            </Link>
        </Stack>
    )



    return (
        <>
            {
                isSmallerThan650 ?
                    <>
                        <div onClick={() => setSidenavCloseModal(true)} className=" toggle-icon">
                            <span className=" bar"></span>
                            <span className=" bar"></span>
                            <span className=" bar"></span>
                        </div>
                        <Drawer size="xs" placement={'left'} onClose={setSidenavCloseModal} isOpen={sideNavCloseModal}>
                            <DrawerOverlay className="sidenav_overlay">
                                <DrawerContent width="250px">
                                    <img
                                        style={{
                                            width: '230px',
                                            height: '150px',
                                            position: 'absolute',
                                            left: 0,
                                            top: '-52px',
                                            zIndex: '-1'
                                        }}
                                        src={'http://appetite-dashboard-staging.herokuapp.com/appetite_logo.png'}
                                        alt="logo"
                                    />
                                    <DrawerCloseButton />

                                    <DrawerBody padding="0" marginTop="10px" cursor="auto">
                                        {sidebarContent()}
                                        <ListItem display="flex"
                                            fontWeight="500"
                                            height="40px"
                                            fontSize="14px"
                                            cursor="pointer"
                                            alignItems="center"
                                            marginTop='26px'
                                            backgroundColor="rgb(196, 65, 47)"
                                            onClick={()=>{
                                                  clearTokenInLocalStorage()
                                                  history.push('/login')
                                            }}
                                            paddingLeft="12px" color="primary.100">
                                            <ListIcon as={BiDoorOpen} w="20px" h="20px" color="white" />
                                            <span style={{
                                                marginLeft: '10px',
                                                marginTop: '3px',
                                                color: 'white',
                                                fontWeight: 400
                                            }}>Logout</span>
                                        </ListItem>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerOverlay>
                        </Drawer>
                    </>
                    :
                    <Box w="270px" h="100%" flexDirection="column" backgroundColor={text === 'light' ? 'white' : "#0C0B10"} justifyContent="space-between" borderRight="1px solid #80808059">
                        {sidebarContent()}
                    </Box>


            }
        </>
    )
}

export default Sidebar;

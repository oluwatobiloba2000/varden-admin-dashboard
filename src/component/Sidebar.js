import { Box, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/layout';
import React from 'react'
import { Link } from 'react-router-dom';
import { BiCartAlt, BiChevronDown, BiChevronUp, BiImages, BiShoppingBag, BiUser } from "react-icons/bi";
import { Image } from '@chakra-ui/image';
import profile_img from '../img/avatar-blank.jpg';
import { Tooltip } from '@chakra-ui/tooltip';
import { FaBiking, FaSatelliteDish } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';

function Sidebar() {
    return (
        <Box w="250px" h="100%" borderRight="1px solid #80808059">
            <Box display="flex" h="97%" flexDirection="column" justifyContent="space-between">
                <Stack direction="column">
                    <Link to="/live-chat">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={BiUser} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Admin</span>
                            </ListItem>
                        </List>
                    </Link>

                    <Link to="/settings">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={BiUser} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Customers</span>
                            </ListItem>
                        </List>
                    </Link>

                    <Link to="/login">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={BiShoppingBag} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Products</span>
                            </ListItem>
                        </List>
                    </Link>

                    <Link to="/live-chat">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={BiImages} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Images</span>
                            </ListItem>
                        </List>
                    </Link>

                    <Link to="/live-chat">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={BiCartAlt} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Orders</span>
                            </ListItem>
                        </List>
                    </Link>

                    <Link to="/live-chat">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={FaBiking} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Dispatch Riders</span>
                            </ListItem>
                        </List>
                    </Link>


                    <Link to="/live-chat">
                        <List spacing={3}>
                            <ListItem display="flex"
                                fontWeight="500"
                                height="40px"
                                fontSize="14px"
                                alignItems="center"
                                borderRadius="25px"
                                marginTop="7px"
                                _hover={{
                                    backgroundColor: "#EBF5FF",
                                    transition: ".5s ease"
                                }}
                                paddingLeft="12px" color="primary.100">
                                <ListIcon as={FaSatelliteDish} w="20px" h="20px" color="primary.100" />
                                <span style={{
                                    marginLeft: '10px',
                                    marginTop: '3px'
                                }}>Distribution Centers</span>
                            </ListItem>
                        </List>
                    </Link>
                </Stack>

                {/* current user profile*/}
                <Stack display="flex" padding="3px 3px"
                    marginRight="10px"
                    borderRadius="38px"
                    position="relative"
                    cursor="pointer"
                    _hover={{
                        border: "1px solid",
                        padding: "2px 2px",
                        transition: ".3s ease"
                    }} alignItems="center" marginLeft="8px" marginBottom="10px" direction="row">
                    <Image
                        marginRight="5px"
                        borderRadius="40px"
                        boxSize="50px"
                        objectFit="cover"
                        src={profile_img}
                        alt="toob compant"
                    />

                    {/* Admin profile starts */}
                    <Box display="flex" flexDirection="column">
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton display="flex">
                                            <Text cursor="pointer"
                                                fontSize="14px" fontWeight="600" color="primary.100">Super Admin</Text>
                                            <Tooltip label="tech@appetite.com.ng" placement="top" openDelay={300}>
                                                <Text whiteSpace="nowrap"
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                    maxWidth="158px" fontSize="11px" color="primary.100">tech@appetite.com.ng</Text>
                                            </Tooltip>
                                        {isOpen ? <Icon position="absolute" right="0" as={BiChevronUp} /> : <Icon position="absolute" right="0" as={BiChevronDown} />}
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem color="red.100" onClick={() => alert("Logout user")}>Logout</MenuItem>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default Sidebar;

import React from 'react';
import { Box, List, ListIcon, ListItem, Stack, Text, Icon, useMediaQuery } from '@chakra-ui/react';
import { BiChevronDown } from "react-icons/bi";
import profile_img from '../../img/avatar-blank.jpg';
import { BiDoorOpen } from "react-icons/bi";
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useColorModeValue } from '@chakra-ui/react';
import './header.css';
import Logo from '../Logo/logo';

const Header = React.memo(() => {
    const text = useColorModeValue('light', 'dark');
    const [isSmallerThan650] = useMediaQuery("(max-width: 650px)")

    return (
        <Box zIndex="1" backgroundColor={text === "dark" ? "#0C0B10" : "rgb(196, 65, 47)"} position="fixed" top="0" display="flex" justifyContent="flex-end" width="100%" height="50px" color="white">
           {isSmallerThan650 ? '':  <Logo style={{
                    width: '230px',
                    height: '150px',
                    position: 'absolute',
                    left: 0,
                    top: '-52px'
                }}/>}

            {/* current user profile*/}
            <Stack className="header_email" display="flex" padding="3px 10px"
                marginRight="10px"
                position="relative"
                cursor="pointer"
                alignItems="center" marginLeft="8px" direction="row">
                <img
                    style={{
                        marginRight: "5px",
                        borderRadius: "40px",
                        width: "36px",
                        height: "36px",
                    }}
                    src={profile_img}
                    alt="profile pics"
                />


                {/* Admin profile starts */}
                <Box display="flex">
                    {/* <Text cursor="pointer"
                        fontSize="14px" fontWeight="600" color="primary.100">Super Admin</Text> */}
                    {/* <Tooltip label="tech@appetite.com.ng" placement="top" openDelay={300}> */}
                    <Text whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxWidth="158px" fontSize="11px" color="primary.100">tech@appetite.com.ng</Text>
                    {/* </Tooltip> */}
                    <Icon marginLeft="12px" className="header_email_dropdown_icon" as={BiChevronDown} />
                    <div className="header_email_dropdown_content">
                        <List spacing={3}>
                            <ListItem padding="0px 5px" className="email_header_li">
                                {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
                                <ColorModeSwitcher />
                            </ListItem>
                            <ListItem padding="0px 5px" className="email_header_li logout_header_li">
                                <ListIcon as={BiDoorOpen} color="red.500" />
                                <span style={{ color: 'red', fontSize: '14px' }}>Logout</span>
                            </ListItem>
                        </List>
                    </div>
                </Box>

            </Stack>

        </Box>
    )
})

export default Header;

import React from 'react';
import { Box } from '@chakra-ui/layout';
import { ColorModeSwitcher } from '../ColorModeSwitcher';


function Header() {
    return (
        <Box border="1px solid red">
            Header
            <ColorModeSwitcher Switcher justifySelf="flex-end" /> 
        </Box>
    )
}

export default Header;

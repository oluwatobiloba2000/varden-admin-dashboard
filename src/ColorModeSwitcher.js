import React from 'react';
import { useColorMode, useColorModeValue, IconButton, Text } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <span style={{display: 'flex',
      alignItems: 'center'}} onClick={toggleColorMode}>
    <IconButton
      size="sm"
      fontSize="sm"
      minWidth="14px"
      marginRight="11px"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="black"
      icon={<SwitchIcon />}
      {...props}
    />
     <Text color="black" marginTop="-2px" fontSize="14px">switch to {text}</Text> 
    </span>
  );
};

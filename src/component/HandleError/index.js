import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon'
import { Box } from '@chakra-ui/layout'
import { Collapse } from '@chakra-ui/transition'
import React from 'react';
import { FiCloudOff } from "react-icons/fi";
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

function HandleError({error, retryFn}) {
    const dispatch = useDispatch();

    return (
        <Collapse in={error ? true: false} animateOpacity>
        <Box w="100%" display="flex">
            <Alert w={retryFn ? "85%" : "100%"} h="37px" fontSize="12px" margin="0 5px 10px 0" status="warning">
               {error === 'Network Error'? <Icon fontSize="18px" marginRight="15px" color="#dd6b20" as={FiCloudOff} />
                     :  <AlertIcon fontSize="18px" marginRight="15px" />}
                      {error === 'Network Error' ? 'Could fetch data, Internet Connection Lost' : error}
                    </Alert>
            {retryFn && <Button width="124px" height="37px" borderRadius="36px" onClick={() => dispatch(retryFn())} leftIcon={<BsArrowCounterclockwise />} colorScheme="orange" variant="solid">
                Retry
            </Button>}
        </Box>
     </Collapse>
    )
}

export default HandleError;

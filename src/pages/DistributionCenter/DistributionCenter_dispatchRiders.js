import React, { useEffect, useState } from 'react'
import './index.css';
import { useHistory, useParams } from 'react-router';
import useCustomTransition from '../../customHook/useCustomTransition';
import './index.css';
import TableComponent from '../../component/Table/Table';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';
import { fetchDistributionCenterDispatchers, assignDispatchRider, removeDispatcherApi } from '../../api/distributionCenterApi';
import { MdCancel } from 'react-icons/md';
import { Button, IconButton } from '@chakra-ui/button';
import { Tooltip } from '@chakra-ui/tooltip';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import HandleError from '../../component/HandleError';
import { Select } from '@chakra-ui/select';
import { useDisclosure } from '@chakra-ui/hooks';
import { getDispatchers } from '../../api/dispatchers';
import { Box } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';

function DistributionCenterDispatchRiders() {
    const { id } = useParams();
    const history = useHistory()
    const toast = useToast();
    const [dispatchers, setDispatchers] = useState();
    const [dispatchersError, setDispatchersError] = useState();
    const [dispatchersLoading, setDispatchersLoading] = useState();
    const [transitionClass] = useCustomTransition();

    const [dispatchRidersToAssign, setDispatchersToAssign] = useState();
    const [dispatchRidersToAssignError, setDispatchersToAssignError] = useState();
    const [dispatchRidersToAssignLoading, setDispatchersToAssignLoading] = useState();

    const [currentSelectedDispatcherToAssign ,setCurrentSelectedDispatcherToAssign] = useState();

    const [assignDispatchRiderError, setAssignDispatcherRiderError] = useState();
    const [assignDispatcherLoading, setAssignDispatcherRiderLoading] = useState(false);

    const { isOpen: isOpenAssignModal, onOpen: onOpenAssignModal, onClose: onCloseAssignModal } = useDisclosure()
    
    const [isOpenDeleteDispatcherModal, setIsOpenDeleteDispatcherModal] = React.useState(false)
    const onCloseDeleteDispatcherModal = () => setIsOpenDeleteDispatcherModal(false)
    const [deleteDispatcherLoading,setDeleteDispatcherLoading] = useState(false);
    const [deleteDispatcherError,setDeleteDispatcherError] = useState(false);
    const [currentDispatcherToDelete, setCurrentDispatcherToDelete]= useState({});

    const cancelRef = React.useRef()

    useEffect(() => {
        fetchDistributionCenterDispatcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchDistributionCenterDispatcher = async () => {
        setDispatchersLoading(true);
        setDispatchersError('')
        const data = await fetchDistributionCenterDispatchers(id);
        if (data.success) {
            setDispatchersLoading(false);
            setDispatchers(data.data);
        } else {
            if (data.error && data.error === 'Request failed with status code 401') {
                return handleRedirectBeforeLogout(history)
            }
            setDispatchersLoading(false);
            setDispatchersError(data.error)
        }
    }

    const fetchDispatchRiders = async () => {
            setDispatchersToAssignLoading(true);
            setDispatchersToAssign([]);
            setDispatchersToAssignError('');
            setCurrentSelectedDispatcherToAssign('');
    
            const data = await getDispatchers();
            if(data.success){
                setDispatchersToAssignLoading(false);
               setDispatchersToAssign(data.data);
            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return  handleRedirectBeforeLogout(history)
                  }
                  setDispatchersToAssignLoading(false);
                  setDispatchersToAssignError(data.error)
            }
    }

    const assignDispatcher = async () =>{
        setAssignDispatcherRiderLoading(true);
        setAssignDispatcherRiderError('');

        const data = await assignDispatchRider(id, currentSelectedDispatcherToAssign);
        if(data.success){
            setAssignDispatcherRiderLoading(false);
            onCloseAssignModal();
            setDispatchers([...dispatchers, {
                id: currentSelectedDispatcherToAssign.dispatcherId,
                name: currentSelectedDispatcherToAssign.name
            }])
        }else{
            if(data.error && data.error === 'Request failed with status code 401'){
                return  handleRedirectBeforeLogout(history)
              }
              setAssignDispatcherRiderLoading(false);
              setAssignDispatcherRiderError(data.error)
        }
    }

    const removeDispatcher = async ()=>{
        setDeleteDispatcherLoading(true);
        setDeleteDispatcherError('');

        const data = await removeDispatcherApi(id, currentDispatcherToDelete.id);
        if(data.success){
            setDeleteDispatcherLoading(false);
            onCloseDeleteDispatcherModal();
            setDispatchers(dispatchers.filter((dispatcher)=> dispatcher.id !== currentDispatcherToDelete.id));
            toast({
                title: 'Dispatcher removed successfully',
                status: 'success',
                isClosable: true
            })
        }else{
            if(data.error && data.error === 'Request failed with status code 401'){
                return  handleRedirectBeforeLogout(history)
              }
              setDeleteDispatcherLoading(false);
              setDeleteDispatcherError(data.error)
        }
    }


    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Action",
                accessor: "id",
                style: {width: '100px'},
                Cell: (props) => (
                    <div style={{
                        display: 'flex',
                    }}>
                        <Tooltip placement="top" label="Delete" aria-label="delete tooltip" >

                            <IconButton
                                variant="solid"
                                backgroundColor="red"
                                height="25px"
                                fontSize="13px"
                                width="10px"
                                marginLeft="8px"
                                color="white"
                                borderRadius="23px"
                                minWidth="25px"
                                icon={MdCancel()}
                                _hover={{
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}
                                onClick={() => {
                                    setIsOpenDeleteDispatcherModal(true)
                                    setCurrentDispatcherToDelete({
                                        id: props.row.original.id,
                                        name: props.row.original.name,
                                    });
                                }}
                            />
                        </Tooltip>

                    </div>
                )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )


    return (
        <div className={transitionClass}>
            <div className="create_button_container">
                <button onClick={()=> {onOpenAssignModal()
                fetchDispatchRiders()
                }} style={{ width: '190px' }} className="create_button_style">Assign Dispatcher</button>
            </div>
            <TableComponent error={dispatchersError} isLoading={dispatchersLoading} columns={columns} data={dispatchers || []} />

            {/* Assign Dispatcher modal */}
            <Modal closeOnOverlayClick={false} onClose={onCloseAssignModal} isOpen={isOpenAssignModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assign Dispatcher</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    {assignDispatchRiderError && <HandleError error={assignDispatchRiderError} />}
                        {dispatchRidersToAssignError && <HandleError error={dispatchRidersToAssignError} isAsyncFn={true} retryFn={() => fetchDispatchRiders()} />}
                        {dispatchRidersToAssignLoading
                            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spinner size="xs" marginRight="5px" /> Loading dispatchers ..</div>
                            : (dispatchRidersToAssign
                                && dispatchRidersToAssign.length > 0
                            )
                                ?
                                <>

                                    <Select placeholder="Select option" value={dispatchRidersToAssign.id} onChange={(event) => { setCurrentSelectedDispatcherToAssign({ dispatcherId: event.target.value, name: event.target.options[event.target.selectedIndex].text}) }}>
                                        {dispatchRidersToAssign
                                            && dispatchRidersToAssign.length > 0
                                            && dispatchRidersToAssign.map((dispatcher) => <option key={dispatcher.id} id={dispatcher.id} value={dispatcher.id}>{dispatcher.name}</option>)}
                                    </Select>
                                 
                                </>
                                : <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <HandleError error={dispatchRidersToAssign || "No dispatchers at the moment"} />
                                    <Button variant="solid" onClick={() => assignDispatcher()}
                                        height="36px"
                                        backgroundColor="#dd6b20" color="white">Retry</Button>
                                </div>
                        }
                    </ModalBody>

                    <ModalFooter>
                        {dispatchRidersToAssignLoading
                            ? <Spinner size="xs" marginRight="21px" />
                            : !dispatchRidersToAssign
                                ? ""
                                : <Button
                                    onClick={() => assignDispatcher()}
                                    isLoading={assignDispatcherLoading} colorScheme="blue" mr={3}>Update</Button>}
                        <Button onClick={onCloseAssignModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


    {/* delete Dispatcher modal */}
    <AlertDialog
                isOpen={isOpenDeleteDispatcherModal}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDeleteDispatcherModal}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Dispatcher
                        </AlertDialogHeader>

                        <Box padding="5px">
                            <HandleError error={deleteDispatcherError} isAsyncFn={true} retryFn={()=> removeDispatcher()}/>    
                        </Box>

                        <AlertDialogBody>
                            Are you sure you want to remove <b>{currentDispatcherToDelete.name}</b>? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDeleteDispatcherModal}>
                                Cancel
                            </Button>
                            <Button isLoading={deleteDispatcherLoading} colorScheme="red" onClick={()=> removeDispatcher()} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    )
}

export default DistributionCenterDispatchRiders;
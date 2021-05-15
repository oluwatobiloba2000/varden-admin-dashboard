import React, { useEffect, useState } from 'react'
import './index.css';
import { useHistory, useParams } from 'react-router';
import useCustomTransition from '../../customHook/useCustomTransition';
import './index.css';
import TableComponent from '../../component/Table/Table';
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';
import { fetchDistributionCenterAttendants, registerDistributionCenterAttendant } from '../../api/distributionCenterApi';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from '@chakra-ui/toast';


const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().min(11).required(),
    password: yup.string().min(4).required(),
});


function DistributionCenterAttendants() {
    const { id } = useParams();
    const history = useHistory()
    const [attendants, setAttendants] = useState();
    const [attendantsError, setAttendantsError] = useState();
    const [attendantsLoading, setAttendantsLoading] = useState();
    const [transitionClass] = useCustomTransition();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [registerAttendantLoading, setRegisterAttendantLoading] = useState(false);
    // const [registerAttendantError, setRegisterAttendantError] = useState();

    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const toast = useToast();

    useEffect(() => {
        fetchAttendants();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchAttendants = async () => {
        setAttendantsLoading(true);
        setAttendantsError('')
        const data = await fetchDistributionCenterAttendants(id);
        if (data.success) {
            setAttendantsLoading(false);
            setAttendants(data.data);
        } else {
            if (data.error && data.error === 'Request failed with status code 401') {
                return handleRedirectBeforeLogout(history)
            }
            setAttendantsLoading(false);
            setAttendantsError(data.error)
        }
    }

    const submitAttendant = async (data) => {
        setRegisterAttendantLoading(true);
        // setRegisterAttendantError('')
        const dataFromApi = await registerDistributionCenterAttendant(id, data);
        if (dataFromApi.success) {
            setRegisterAttendantLoading(false);
            setAttendants([...attendants, dataFromApi.data]);
            // setRegisterAttendantError('')
            reset()
            onClose()
            toast({
                title: 'Attendant created',
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            if (dataFromApi.error && dataFromApi.error === 'Request failed with status code 401') {
                return handleRedirectBeforeLogout(history)
            }
            setRegisterAttendantLoading(false);
            // setRegisterAttendantError(dataFromApi.error)
        }
    }
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Email",
                accessor: "user.email",
            },
            {
                Header: "Phone Number",
                accessor: "phone_number"
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )


    return (
        <div className={transitionClass}>
            <div className="create_button_container">
                <button style={{ width: '190px' }} onClick={onOpen} className="create_button_style">Register Attendants</button>
            </div>
            <TableComponent error={attendantsError} retryFn={fetchAttendants} isAsyncFn={true} isLoading={attendantsLoading} columns={columns} data={attendants || []} />

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                closeOnOverlayClick={false}
                scrollBehavior="inside"
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register Attendant</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit(submitAttendant)}>
                            <FormControl marginTop="15px" id="name">
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} isInvalid={errors.name && errors.name.message ? true : false} {...register("name")} type="text" name="name" placeholder="Enter Assistant Name" />
                                <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                                    marginLeft="4px"
                                    color="#E53E3E"
                                >{errors.name && errors.name.message}</Text>
                            </FormControl>

                            <FormControl marginTop="15px" id="email">
                                <FormLabel>Email</FormLabel>
                                <Input isInvalid={errors.email && errors.email.message ? true : false} {...register("email")} type="email" name="email" placeholder="Enter Assistant Email" />
                                <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                                    marginLeft="4px"
                                    color="#E53E3E"
                                >{errors.email && errors.email.message}</Text>
                            </FormControl>

                            <FormControl marginTop="15px" id="phonenumber">
                                <FormLabel>Phone Number</FormLabel>
                                <Input isInvalid={errors.phone_number && errors.phone_number.message ? true : false} {...register("phone_number")} type="text" name="phone_number" placeholder="Enter Assistant Phone Number" />
                                <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                                    marginLeft="4px"
                                    color="#E53E3E"
                                >{errors.phone_number && errors.phone_number.message}</Text>
                            </FormControl>

                            <FormControl marginTop="15px" id="password">
                                <FormLabel>Password</FormLabel>
                                <Input isInvalid={errors.password && errors.password.message ? true : false} {...register("password")} type="password" name="password" placeholder="Enter Assistant Password" />
                                <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                                    marginLeft="4px"
                                    color="#E53E3E"
                                >{errors.password && errors.password.message}</Text>
                            </FormControl>

                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={registerAttendantLoading} type="submit"onClick={handleSubmit(submitAttendant)} colorScheme="blue" mr={3}>
                            Submit
                        </Button>
                        <Button  onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DistributionCenterAttendants;


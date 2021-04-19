import React, { useEffect, useState } from 'react'
import { Box, Container, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaCartPlus } from 'react-icons/fa';
import { AiOutlineRead } from "react-icons/ai";
import './customer.css';
import AnimatedButton from '../../component/AnimatedButton';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/SideBar/Sidebar';
import { isTokenExpired } from '../../utils/auth';
import { addCustomerOrdersAsync, getCustomerAsync } from '../../app/slice/customerSlice/customer';
import { useDispatch, useSelector } from 'react-redux';
import useCustomTransition from '../../customHook/useCustomTransition';
import Loader from '../../component/Loader';
import HandleError from '../../component/HandleError';
import {Helmet} from "react-helmet";

function Customers() {
    const location = useLocation();
    const text = useColorModeValue('light', 'dark');
    const history = useHistory();
    const dispatch = useDispatch();
    const customerState = useSelector(state => state.customers);
    const [transitionClass] = useCustomTransition();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isAddressModalOpen, onOpen: onAddressModalOpen, onClose: onAddressModalClose } = useDisclosure()
    const [currentCustomerAddress, setCurrentCustomerAddress] = useState('');

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            dispatch(getCustomerAsync(history))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFetchCustomersOrder = (id) => {
        onOpen();
        dispatch(addCustomerOrdersAsync(history, id))
    }

    const handleFetchCustomersAddress = (address) => {
        onAddressModalOpen();
        if (address) {
            setCurrentCustomerAddress(address);
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Phone Number",
                accessor: "phone_number",
                Cell: ({ value }) => (
                    <span>
                        {value || 'N/A'}
                    </span>
                )
            },
            {
                Header: "Reg Date",
                accessor: "created_at",
                Cell: ({ value }) => (
                    <Tooltip label={dayjs(value).format('D MMM YYYY [at] h[:]mm a')} placement="top" hasArrow>
                        <span style={{ cursor: 'pointer' }}>
                            {value}
                        </span>
                    </Tooltip>
                )
            },
            {
                Header: 'Orders',
                accessor: 'id',
                Cell: ({ value }) => (
                    <AnimatedButton onClick={() => handleFetchCustomersOrder(value)} visibleIcon={<Icon as={FaCartPlus} className="cart arrow down icon mx-4"></Icon>} hiddenText="view orders" />
                )
            },
            {
                Header: 'Address',
                accessor: 'address[0].id',
                Cell: (props) => (
                    <AnimatedButton onClick={() => handleFetchCustomersAddress(props.row.original.address)} visibleIcon={<Icon as={AiOutlineRead} className="cart arrow down icon mx-4"></Icon>} hiddenText="view address" />
                )
            },
        ],
         // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
              <Helmet>
                <title>Customers || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                    <div className={transitionClass}>
                        <h1 className="title_head">
                            Customers
                            </h1>
                        <Box w="100%" className="admin_table_container">

                            <TableComponent error={customerState.error} retryFn={() => getCustomerAsync(history)} isLoading={customerState.loading} columns={columns} data={customerState.data} />
                        </Box>
                    </div>
                </Box>
            </Box>

            <Modal scrollBehavior="inside" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="#77be43">Orders</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {customerState.orders_loading ?
                            <Box w="100%" h="100px">
                                <Loader />
                            </Box>
                            : customerState.orders_error ? <HandleError error={customerState.orders_error} /> :
                                customerState.orders.length <= 0 ? <Text textAlign="center" color="gray" fontWeight="bold" fontSize="20px">No orders yet</Text> :
                                    (customerState.orders.map(({ order_number, quantity, delivery_status, order_status, delivery_address }) => (
                                        <Box className="box-group" >
                                            <div className="list-group-item box-list-header"><b>order:</b> {order_number}</div>
                                            <div className="list-group-item"><b>quantity:</b> {quantity}</div>
                                            <div className="list-group-item"><b>Delivery Status:</b> {delivery_status}</div>
                                            <div className="list-group-item"><b>Order Status:</b> {order_status}</div>
                                            <div className="list-group-item"><b>Delivery Address:</b> {delivery_address}</div>
                                        </Box>
                                    )))
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal scrollBehavior="inside" closeOnOverlayClick={false} isOpen={isAddressModalOpen} onClose={onAddressModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="#77be43">Orders</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {currentCustomerAddress && currentCustomerAddress[0] ?
                            <Box className="box-group" >
                                {console.log({currentCustomerAddress : currentCustomerAddress[0]})}
                                <div className="list-group-item box-list-header"><b>Address:</b> {currentCustomerAddress[0].address}</div>
                                <div className="list-group-item"><b>City:</b> {currentCustomerAddress[0].city}</div>
                                <div className="list-group-item"><b>Country:</b> {currentCustomerAddress[0].country}</div>
                            </Box>: <Text textAlign="center" color="gray" fontWeight="bold" fontSize="20px">User has not added an address</Text>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default Customers;

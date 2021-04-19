import React, { useEffect } from 'react'
import { Box, Button, Container, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye, FaHome } from 'react-icons/fa';
import { RiMotorbikeLine } from "react-icons/ri";
import dayjs from 'dayjs';
import Sidebar from '../../component/SideBar/Sidebar';
import Header from '../../component/Header/Header';
import { useHistory, useLocation } from 'react-router';
import { getOrdersAsync } from '../../app/slice/orderSlice/order';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Helmet } from 'react-helmet';

function Products() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.orders);
    const text = useColorModeValue('light', 'dark');
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            dispatch(getOrdersAsync(history))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: "Order Number",
                accessor: "order_number",
            },
            {
                Header: "Order Status",
                accessor: "order_status",
                Cell: ({ value }) =>
                    value === 'processing' ? <div className="yellow-tag">
                        {value}
                    </div> :
                        <div className="green-tag">{value}</div>

            },
            {
                Header: "Payment Status",
                accessor: "payment_status",
                Cell: ({ value }) =>
                    value === 'paid' ? <div className="green-tag">
                        {value}
                    </div> : <div className="yellow-tag">{value}</div>

            },
            {
                Header: "Delivery Status",
                accessor: "delivery_status",
                Cell: ({ value }) =>
                    value === 'pending' ? <div className="yellow-tag">
                        {value}
                    </div>
                        : <div className="green-tag">{value}</div>

            },
            {
                Header: "Total Cost",
                accessor: "total_cost"
            }, {
                Header: "Customer",
                accessor: "customer_name"
            }, {
                Header: "Dispatcher",
                accessor: "dispatcher",
                Cell: ({ value }) => (
                    <span>
                        {value || 'N/A'}
                    </span>
                )
            }, {
                Header: "DSC",
                accessor: "dsc",
                Cell: ({ value }) => (
                    <span>
                        {value || 'N/A'}
                    </span>

                )
            }, {
                Header: "Time",
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
                Header: 'Actions',
                Cell: (props) =>
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>


                            <Tooltip label="View Order" placement="top" hasArrow openDelay={100}>
                                <IconButton
                                    variant="outline"
                                    colorScheme="teal"
                                    className="action_icon_btn"
                                    aria-label="Call Sage"
                                    fontSize="20px"
                                    icon={FaEye()}
                                    onClick={() => (console.log(props.row.original.dispatcher_id))}
                                />
                            </Tooltip>

                            <Tooltip label="Assign Distribution Center" placement="top" hasArrow openDelay={100}>
                                <IconButton
                                    variant="outline"
                                    colorScheme="teal"
                                    aria-label="Call Sage"
                                    className="action_icon_btn"
                                    backgroundColor="#2185d0"
                                    color="white"
                                    _hover={{
                                        backgroundColor: "#2185d0",
                                        color: "white"
                                    }}
                                    fontSize="20px"
                                    icon={FaHome()}
                                    onClick={() => (console.log(props))}
                                />
                            </Tooltip>

                            <Tooltip label="Assign Dispatcher Rider" placement="top" hasArrow openDelay={100}>
                                <IconButton
                                    variant="outline"
                                    colorScheme="teal"
                                    aria-label="Call Sage"
                                    className="action_icon_btn"
                                    fontSize="20px"
                                    backgroundColor="#21ba45"
                                    color="white"
                                    _hover={{
                                        backgroundColor: "#21ba45",
                                        color: 'white'
                                    }}
                                    icon={RiMotorbikeLine()}
                                    onClick={() => (console.log(props))}
                                />
                            </Tooltip>
                        </div>
                        <div style={{
                            marginTop: '7px',
                            height: '55px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around'
                        }}>
                            <Button className="action_update_order_btn" backgroundColor="#2185d0" color="white" size="xs">Update Order</Button>
                            <Button className="action_update_payment_btn" backgroundColor="black" color="white" size="xs">Update Payment</Button>
                        </div>
                    </>

            },
        ],
        [],
    )


    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
            <Helmet>
                <title>Orders || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                    <div className={transitionClass}>
                        <h1 className="title_head">
                            Orders
                            </h1>
                        <Box w="100%" className="admin_table_container">

                            <TableComponent error={orderState.error} isLoading={orderState.loading} retryFn={() => getOrdersAsync(history)} columns={columns} data={orderState.data} />
                        </Box>
                    </div>

                </Box>
            </Box>
        </Container>
    )
}

export default Products;

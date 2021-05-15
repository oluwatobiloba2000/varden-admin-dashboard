import React, { useEffect, useState } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, Button, Container, Icon, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye, FaHome } from 'react-icons/fa';
import { RiMotorbikeLine } from "react-icons/ri";
import dayjs from 'dayjs';
import Sidebar from '../../component/SideBar/Sidebar';
import Header from '../../component/Header/Header';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router';
import { getOrdersAsync } from '../../app/slice/orderSlice/order';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import OrderDetails from './OrderDetails';
import UpdateOrder from './updateOrder';
import UpdatePayment from './updatePayment';
import AssignDispatchRider from './assignDispatchRider';
import AssignDistributionCenter from './assignDistributionCenter';

function Products() {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.orders);
    const text = useColorModeValue('light', 'dark');
    const [transitionClass] = useCustomTransition();
    const { path } = useRouteMatch();
    const [isDispatchCenterOpen, setIsDispatchcenterOpen] = useState(false);
    const [isDispatchRiderOpen, setIsDispatchRiderOpen] = useState(false);
    const [isUpdateOrderOpen, setIsUpdateOrderOpen] = useState(false);
    const [isUpdatePaymentOpen, setIsUpdatePaymentOpen] = useState(false);
    const [currentSelectedOrder, setCurrentSelectedOrder] = useState();

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
                    value === 'completed' ? <div className="green-tag">{value}</div> 
                       : value === 'failed' ? <div style={{ backgroundColor: 'red', color: 'white' }}>{value}</div> 
                       : <div className="yellow-tag">
                        {value}
                    </div>

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
                accessor: "dispatcher_name",
                Cell: ({ value }) => (
                    <span>
                        {value || 'N/A'}
                    </span>
                )
            }, {
                Header: "DSC",
                accessor: "dcs_name",
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
                                    onClick={() => history.push(`/orders/${props.row.original.id}`)}
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
                                          
                                        onClick={() =>{ 
                                            setCurrentSelectedOrder(props.row.original);
                                            setIsDispatchcenterOpen(true);
                                            }}
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
                                    onClick={() => {
                                        setCurrentSelectedOrder(props.row.original);
                                        setIsDispatchRiderOpen(true);
                                    }}
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


                            <Button onClick={() => {
                                setCurrentSelectedOrder(props.row.original);
                                setIsUpdateOrderOpen(true)
                            }} className="action_update_order_btn" backgroundColor="#2185d0" color="white" size="xs">Update Order</Button>


                            <Button onClick={() =>{
                                setIsUpdatePaymentOpen(true);
                                setCurrentSelectedOrder(props.row.original);
                            }} className="action_update_payment_btn" backgroundColor="black" color="white" size="xs">Update Payment</Button>


                        </div>
                    </>

            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <Box id="popover_overlay" zIndex="2" display="none" backgroundColor="hsl(0deg 0% 13% / 29%)" width="100%" position="absolute" height="100%"></Box>
                        <h1 className="title_head">
                            Orders
                            </h1>
                        <Box w="100%" className="admin_table_container">


                            <Switch>
                                <Route exact path={path}>
                                 
                                    <TableComponent error={orderState.error} isLoading={orderState.loading} retryFn={() => getOrdersAsync(history)} columns={columns} data={orderState.data} />
                                </Route>


                                <Route path={`${path}/edit/:orderId`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/products">Orders</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Edit Orders</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    {/* <EditProductDetails /> */}
                                </Route>

                                <Route path={`${path}/:orderId`}>

                                    <OrderDetails />
                                </Route>

                            </Switch>
                        </Box>
                    </div>

                    <AssignDistributionCenter order={currentSelectedOrder}  setOpen={setIsDispatchcenterOpen} IsOpen={isDispatchCenterOpen} />
                    <AssignDispatchRider order={currentSelectedOrder}  setOpen={setIsDispatchRiderOpen} IsOpen={isDispatchRiderOpen}/>
                    <UpdateOrder order={currentSelectedOrder}  setOpen={setIsUpdateOrderOpen} IsOpen={isUpdateOrderOpen} />
                    <UpdatePayment order={currentSelectedOrder}  setOpen={setIsUpdatePaymentOpen} IsOpen={isUpdatePaymentOpen} />
                </Box>
            </Box>
        </Container>
    )
}

export default Products;

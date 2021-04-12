import React from 'react'
import { Box, Button, IconButton, Tooltip } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye, FaHome } from 'react-icons/fa';
import { RiMotorbikeLine } from "react-icons/ri";
import dayjs from 'dayjs';
function Products() {


    const data = React.useMemo(
        () => [
            {
                order_id: 'ORD36e788',
                order_status: "processing",
                total_cost: "3000",
                customer: 'Adeoye',
                createdat: '2021-03-08 14:27:18'
            },
            {
                order_id: 'ORD36e788',
                order_status: "processing",
                total_cost: "3000",
                customer: 'Adeoye',
                createdat: '2021-03-08 14:27:18'
            },
            {
                order_id: 'ORD36e788',
                order_status: "processing",
                total_cost: "3000",
                customer: 'Olakunmbi',
                createdat: '2021-03-08 14:27:18'
            },
            {
                order_id: 'ORD36e788',
                order_status: "processing",
                total_cost: "3000",
                customer: 'Olakunmbi',
                createdat: '2021-03-08 14:27:18'
            },
        ],
        [],
    )

    const columns = React.useMemo(
        () => [
            {
                Header: "Order Number",
                accessor: "order_id",
            },
            {
                Header: "Order Status",
                accessor: "order_status",
                Cell: ({ value }) => (
                    <div className="yellow-tag">
                        Processing
                    </div>
                )
            },
            {
                Header: "Payment Status",
                accessor: "payment_status",
                Cell: ({ value }) => (
                    <div className="green-tag">
                        Paid
                    </div>
                )
            },
            {
                Header: "Delivery Status",
                accessor: "delivery_status",
                Cell: ({ value }) => (
                    <div className="yellow-tag">
                        Pending
                    </div>
                )
            },
            {
                Header: "Total Cost",
                accessor: "total_cost"
            }, {
                Header: "Customer",
                accessor: "customer"
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
                accessor: "createdat",
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
                accessor: 'id',
                Cell: ({ value }) => (
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
                                    onClick={() => (console.log(value))}
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
                                        backgroundColor:"#2185d0",
                                        color:"white"
                                    }}
                                    fontSize="20px"
                                    icon={FaHome()}
                                    onClick={() => (console.log(value))}
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
                                        backgroundColor:"#21ba45",
                                        color: 'white'
                                    }}
                                    icon={RiMotorbikeLine()}
                                    onClick={() => (console.log(value))}
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
                )
            },
        ],
        [],
    )


    return (
        <div>
         <h1 className="title_head">
                        Orders
                    </h1>
                    <Box w="100%" className="admin_table_container">

                        <TableComponent columns={columns} data={data} />
                    </Box>
            </div>
    )
}

export default Products;

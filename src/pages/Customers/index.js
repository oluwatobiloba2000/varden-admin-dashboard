import React from 'react'
import { Box, Icon, Tooltip } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaCartPlus } from 'react-icons/fa';
import { AiOutlineRead } from "react-icons/ai";
import './customer.css';
import AnimatedButton from '../../component/AnimatedButton';
import dayjs from 'dayjs';

function Customers() {
    const data = React.useMemo(
        () => [
            {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                order_id: 'bfvfvfvhff',
                phonenumber: "08109263085",
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            }, {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            }, {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            }, {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                order_id: 'bfvfvfvhff',
                regdate: "2021-03-08 15:52:53"
            },

        ],
        [],
    )

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Phone Number",
                accessor: "phonenumber"
            },
            {
                Header: "Reg Date",
                accessor: "regdate",
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
                    <AnimatedButton visibleIcon={<Icon as={FaCartPlus} className="cart arrow down icon mx-4"></Icon>} hiddenText="view orders" />
                )
            },
            {
                Header: 'Address',
                accessor: 'order_id',
                Cell: ({ value }) => (
                    <AnimatedButton visibleIcon={<Icon as={AiOutlineRead} className="cart arrow down icon mx-4"></Icon>} hiddenText="view address" />
                )
            },
        ],
        [],
    )

    return (
        <div>
            <h1 className="title_head">
                Customers
                    </h1>
            <Box w="100%" className="admin_table_container">

                <TableComponent columns={columns} data={data} />
            </Box>
        </div>
    )
}

export default Customers;

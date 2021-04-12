import React from 'react'
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import './admin.css';
import { FaEye } from 'react-icons/fa';
import TableComponent from '../../component/Table/Table';


function Admin() {
    
    const data = React.useMemo(
        () => [
            {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
                regdate: "2021-03-08 15:52:53"
            }, {
                id: '2ubgdbgdhe3',
                name: "Anani Oluwatobiloba",
                phonenumber: "08109263085",
                regdate: "2021-03-08 15:52:53"
            },
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                phonenumber: "08109263085",
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
                accessor: "regdate"
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({ value }) => (
                    <Tooltip label="View" hasArrow placement="top">
                        <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            icon={FaEye()}
                            onClick={() => (console.log(value))}
                        />
                    </Tooltip>
                )
            },
        ],
        [],
    )



    return (
        <div>
            <h1 className="title_head">Admins</h1>
            <Box w="100%" className="admin_table_container">
                <div className="create_button_container">
                    <button className="create_button_style">Create Admins</button>
                </div>

                <TableComponent columns={columns} data={data} />
            </Box>

        </div>
    )
}

export default Admin;

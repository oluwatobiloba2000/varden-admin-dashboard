import React from 'react'
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { AiFillEdit } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';

function DistributionCenter() {
    const data = React.useMemo(
        () => [
            {
                name: 'Mr Biggs',
                email: "admin@biggs.com",
                phone_number: "08035399531",
                address: 'Suite 10a, 2nd Floor, Lagos City Mall, Onikan, Lagos.'
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
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Phone Number",
                accessor: "phone_number"
            },
            {
                Header: "Address",
                accessor: "address"
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ value }) => (
                    <div style={{
                        width: '70px',
                        display: 'flex'
                    }}>

                        <Tooltip label="View" hasArrow placement="top">
                            <IconButton
                                variant="outline"
                                colorScheme="teal"
                                aria-label="Call Sage"
                                fontSize="20px"
                                marginRight="10px"
                                icon={FaEye()}
                                onClick={() => (console.log(value))}
                            />
                        </Tooltip>

                        <Tooltip label="Edit" placement="top" hasArrow >
                            <IconButton
                                variant="outline"
                                colorScheme="teal"
                                aria-label="Call Sage"
                                fontSize="20px"
                                icon={AiFillEdit()}
                                onClick={() => (console.log(value))}
                            />
                        </Tooltip>

                    </div>
                )
            },
        ],
        [],
    )
    return (
        <div>
            <h1 className="title_head">
                Distribution Center
                    </h1>
            <Box w="100%" className="admin_table_container">
                <div className="create_button_container">
                    <button className="create_button_style">Register Center</button>
                </div>

                <TableComponent columns={columns} data={data} />
            </Box>
        </div>
    )
}

export default DistributionCenter;

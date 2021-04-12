import React from 'react'
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye } from 'react-icons/fa';
import dayjs from 'dayjs';

function DispatchRiders() {

    const data = React.useMemo(
        () => [
            {
                id: '2ubgdbgdhe3',
                name: "Paul Oluwatobiloba",
                // phonenumber: "08109263085",
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
                accessor: "phonenumber",
                Cell: ({ value }) => (
                    <span>
                        {value || 'N/A'}
                    </span>

                )
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
                Header: 'Action',
                accessor: 'id',
                Cell: ({ value }) => (
                    <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={FaEye()}
                        onClick={() => (console.log(value))}
                    />
                )
            },
        ],
        [],
    )



    return (
        <div>
            <h1 className="title_head">
                Dispatchers
                    </h1>
            <Box w="100%" className="admin_table_container">
                <div className="create_button_container">
                    <button style={{ width: '190px' }} className="create_button_style">Create Dispatchers Riders</button>
                </div>

                <TableComponent columns={columns} data={data} />
            </Box>
        </div>
    )
}

export default DispatchRiders;

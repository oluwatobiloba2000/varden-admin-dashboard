import React from 'react'
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";

function Products() {


    const data = React.useMemo(
        () => [
            {
                id: '2ubgdbgdhe3',
                title: "Water Melon",
                price: "3000",
                count: '0',
                ispublished: true
            },
            {
                id: '2ubgdbgdhe3',
                title: "Water Melon",
                price: "3000",
                count: '0',
                ispublished: true
            },
            {
                id: '2ubgdbgdhe3',
                title: "Water Melon",
                price: "3000",
                count: '0',
                ispublished: true
            },
        ],
        [],
    )

    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Price",
                accessor: "price"
            },
            {
                Header: "Count",
                accessor: "count"
            },
            {
                Header: "Published",
                accessor: "ispublished",
                Cell: ({ value }) => (
                    <div className="green-tag">
                        yes
                    </div>
                )
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
                Products
                    </h1>
            <Box w="100%" className="admin_table_container">
                <div className="create_button_container">
                    <button className="create_button_style">Create Products</button>
                </div>

                <TableComponent columns={columns} data={data} />
            </Box>
        </div>
    )
}

export default Products;

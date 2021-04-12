import React from 'react';
import { Input, Select, Text, Tooltip } from '@chakra-ui/react';
import {
    useTable,
    usePagination,
} from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import './Table.css';

function TableComponent({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )


    return (
        <>
            <div style={{overflow: 'auto'}}>
                            <Table {...getTableProps()}>
                                <Thead>
                                    {headerGroups.map((headerGroup) => (
                                        <Tr className="table_tr" {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <Th
                                                    className="table_th"
                                                >
                                                    {column.render("Header")}
                                                </Th>
                                            ))}
                                        </Tr>
                                    ))}
                                </Thead>
                                <Tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <Tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <Td zIndex="1" className="table_td" {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                                        {cell.render("Cell")}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </div>

                        <div className="pagination">
                            <div style={{ marginBottom: '2px', paddingBottom: '5px' }}>
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </div>

                            <div className="navigation_container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="zoom_btns">
                                    <Tooltip hasArrow label="zoom to first page" placement="top">
                                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={`${!canPreviousPage && 'btn-disabled'}`}>
                                            {'<<'}
                                        </button>
                                    </Tooltip>

                                    <Tooltip hasArrow label="Previous" placement="top">
                                        <button className={`next_zoom_btn ${!canPreviousPage && 'btn-disabled-bg'}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                                            {'<'}
                                        </button>
                                    </Tooltip>
                                    <Tooltip hasArrow label="Next" placement="top">
                                        <button className={`next_zoom_btn ${!canNextPage && 'btn-disabled-bg'}`} onClick={() => nextPage()} disabled={!canNextPage} >
                                            {'>'}
                                        </button>
                                    </Tooltip>

                                    <Tooltip hasArrow label="zoom to last page" placement="top">
                                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={!canNextPage && 'btn-disabled'}>
                                            {'>>'}
                                        </button>
                                    </Tooltip>
                                </span>

                                <span className="go_to_page_input_container" style={{ position: 'relative' }}>
                                    <Text mb="8px" position="absolute"
                                        transform="translate(11px, -1px)"
                                        fontSize="11px"
                                        color="green"
                                        fontWeight="bolder">Go to page</Text>
                                    <Input
                                        height="38px"
                                        paddingTop="9px"
                                        fontSize="11px"
                                        borderColor="green"
                                        border="1px solid green"
                                        borderRadius="6px"
                                        w="100px"
                                        type="number"
                                        defaultValue={pageIndex + 1}
                                        onChange={e => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                            gotoPage(page)
                                        }}

                                        size="sm"
                                    />
                                </span>

                                <Select className="show_page_input" width="110px" borderColor="green" variant="outline" value={pageSize}
                                    fontSize="12px"
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}>
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
        </>
    )
}

export default TableComponent;

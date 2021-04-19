import React, { useEffect } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, Container, Icon, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import Sidebar from '../../component/SideBar/Sidebar';
import Header from '../../component/Header/Header';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../../utils/auth';
import { BiChevronRight } from 'react-icons/bi';
import { getProductAsync } from '../../app/slice/productSlice/product';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import EditProductDetails from './EditProductDetails';
import {Helmet} from 'react-helmet';

function Products() {
    let location = useLocation();
    const text = useColorModeValue('light', 'dark');
    const history = useHistory()
    const dispatch = useDispatch();
    const productState = useSelector(state => state.products);
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            dispatch(getProductAsync(history))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { path, url } = useRouteMatch();

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
                accessor: "published",
                Cell: ({ value }) =>
                    value === true ?
                        <div className="green-tag">
                            yes
                    </div> :
                        <div className="yellow-tag">
                            No
                    </div>
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
                                onClick={() => (history.push(`${url}/${value}`))}
                            />
                        </Tooltip>

                        <Tooltip label="Edit" placement="top" hasArrow >
                            <IconButton
                                variant="outline"
                                colorScheme="teal"
                                aria-label="Call Sage"
                                fontSize="20px"
                                icon={AiFillEdit()}
                                onClick={() => (history.push(`${url}/edit/${value}`))}
                            />
                        </Tooltip>

                    </div>
                )
            },
        ],
         // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )


    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
            <Helmet>
                <title>Products || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                    <div className={transitionClass}>
                        <h1 className="title_head">
                            Products
                    </h1>
                        <Box w="100%" className="admin_table_container">

                            <Switch>
                                <Route exact path={path}>
                                    <div className="create_button_container">
                                        <Link to={`${url}/create`}>
                                            <button className="create_button_style">Create Products</button>
                                        </Link>
                                    </div>

                                    <TableComponent error={productState.error} columns={columns} isLoading={productState.loading} retryFn={() => getProductAsync(history)} data={productState.data} />
                                </Route>

                                <Route path={`${path}/create`}>
                                    <Breadcrumb marginTop="0px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/products">Products</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Create product</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    {/* <CreateAdmin/> */}
                                </Route>

                                <Route path={`${path}/edit/:productId`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/products">Products</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Edit Product</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    <EditProductDetails />
                                </Route>

                                <Route path={`${path}/:productId`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/products">Products</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Product details</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    <ProductDetails />
                                </Route>

                            </Switch>
                        </Box>


                    </div>
                </Box>
            </Box>
        </Container>
    )
}

export default Products;

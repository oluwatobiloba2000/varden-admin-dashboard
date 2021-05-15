import React, { useEffect } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, Container, Icon, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { FaEye } from 'react-icons/fa';
import dayjs from 'dayjs';
import Sidebar from '../../component/SideBar/Sidebar';
import Header from '../../component/Header/Header';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../../utils/auth';
import { getDispatcherAsync } from '../../app/slice/dispatcherSlice/dispatcher';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import DispatchRiderDetails from './dispatcherRiderDetails';
import CreateDispatcherRider from './createDispatcherRider';

function DispatchRiders() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const text = useColorModeValue('light', 'dark');
    const { path, url } = useRouteMatch();
    const dispatchersState = useSelector(state => state.dispatchers);
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            dispatch(getDispatcherAsync(history))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                Header: 'Action',
                accessor: 'id',
                Cell: ({ value }) => (
                    <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={FaEye()}
                        onClick={() => history.push(`${url}/${value}`)}
                    />
                )
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )



    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
            <Helmet>
                <title>Dispatch riders || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                    <div className={transitionClass}>
                        <h1 className="title_head">
                            Dispatchers
                            </h1>
                        <Box w="100%" className="admin_table_container">

                            <Switch>
                                <Route exact path={path}>
                                    <div className="create_button_container">
                                        <Link to="/dispatchers/create">
                                           <button style={{ width: '190px' }} className="create_button_style">Create Dispatchers Riders</button>
                                        </Link>
                                    </div>

                                    <TableComponent columns={columns} data={dispatchersState.data} isLoading={dispatchersState.loading} retryFn={() => getDispatcherAsync(history)} error={dispatchersState.error} />
                                </Route>

                                <Route path={`${path}/create`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/dispatchers">Dispatch Riders</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>create</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                   <CreateDispatcherRider/>
                                </Route>


                                <Route path={`${path}/:id`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/dispatchers">Dispatch Riders</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Details</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                   <DispatchRiderDetails/>
                                </Route>

                            </Switch>


                        </Box>
                    </div>
                </Box>
            </Box>
        </Container>
    )
}

export default DispatchRiders;

import React, {useEffect} from 'react'
import { Box, Breadcrumb, BreadcrumbItem, Container, Icon, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import './admin.css';
import { FaEye } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux'
import TableComponent from '../../component/Table/Table';
import Sidebar from '../../component/SideBar/Sidebar';
import Header from '../../component/Header/Header';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router'
import { isTokenExpired } from '../../utils/auth';
import { useLocation } from 'react-router';
import { getAdminAsync } from '../../app/slice/adminSlice/admin';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import AdminDetails from './adminDetails';
import CreateAdmin from './createAdmin';
import dayjs from 'dayjs';
import {Helmet} from "react-helmet";

function Admin() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const adminsState = useSelector(state => state.admins);
    const text = useColorModeValue('light', 'dark');
    const [transitionClass] = useCustomTransition();
    const {path, url} = useRouteMatch();

    useEffect(() => {
        const TokenExpired = isTokenExpired();
        
        if(!TokenExpired || TokenExpired !== 'empty token'){
            dispatch(getAdminAsync(history))
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
                accessor: "employee_id"
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
                    <Tooltip label="View" hasArrow placement="top">
                        <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            icon={FaEye()}
                            onClick={() =>  history.push(`${url}/${value}`)}
                        />
                    </Tooltip>
                )
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )



    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
            <Helmet>
                <title>Admins || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                <div className={transitionClass}>
                    <h1 className="title_head">Admins</h1>
                    <Box w="100%" className="admin_table_container">

                        <Switch>
                                <Route exact path={path}>
                                        <div className="create_button_container">
                                            <Link to={`${url}/create`}>
                                              <button className="create_button_style">Create Admins</button>
                                            </Link>
                                        </div>
                                    <TableComponent error={adminsState.error} retryFn={(history)=> getAdminAsync(history)} isLoading={adminsState.loading} columns={columns} data={adminsState.data} />
                                </Route>
                               
                                <Route path={`${path}/create`}>
                                  <Breadcrumb marginTop="0px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{color: '#007eff'}} to="/admin">Admin</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>create</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    <CreateAdmin/>
                                </Route>

                                <Route path={`${path}/:adminId`}>
                                  <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{color: '#007eff'}} to="/admin">Admin</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Admin details</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    <AdminDetails/>
                                </Route>

                            </Switch>
                    </Box>

                </div>
            </Box>
        </Box>
        </Container>
    )
}

export default Admin;

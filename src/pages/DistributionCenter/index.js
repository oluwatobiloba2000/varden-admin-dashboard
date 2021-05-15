import React, { useEffect, useState } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, Container, Icon, IconButton, Spinner, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import TableComponent from '../../component/Table/Table';
import { AiFillEdit } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import Sidebar from '../../component/SideBar/Sidebar';
import Header from '../../component/Header/Header';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDscAsync } from '../../app/slice/distributionCenterSlice/distributionCenter';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Helmet } from 'react-helmet';
import DistributionCenterDetails from './DistributionCenter__details';
import RegisterDistribututionCenter from './registerCenter';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
// import EditProductDetails from '../Products/EditProductDetails';
import EditCenterdetails from './editCenter';

function DistributionCenter() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const text = useColorModeValue('light', 'dark');
    const distributionCenterState = useSelector(state => state.distributionCenters);
    const [currentSelectedDscCenter, setCurrentSelectedDscCenter] = useState();
    const [transitionClass] = useCustomTransition();
    const { path, url } = useRouteMatch();


    
    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (location.pathname === '/dsc') {
            setCurrentSelectedDscCenter('')
            if(!TokenExpired || TokenExpired !== 'empty token'){
                dispatch(getDscAsync(history))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])


    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "dc_name",
            },
            {
                Header: "Email",
                accessor: "dc_email"
            },
            {
                Header: "Phone Number",
                accessor: "dc_phone_number"
            },
            {
                Header: "Address",
                accessor: "dc_address"
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: (props, { value }) => (
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
                                onClick={() => {
                                    history.push(`${url}/${props.row.original.id}`)
                                }}
                            />
                        </Tooltip>

                        <Tooltip label="Edit" placement="top" hasArrow >
                            <IconButton
                                variant="outline"
                                colorScheme="teal"
                                aria-label="Call Sage"
                                fontSize="20px"
                                icon={AiFillEdit()}
                                onClick={() =>  history.push(`${url}/edit/${props.row.original.id}`)}
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
                <title>Distribution Center || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>
                    <div className={transitionClass}>
                        <h1 className="title_head">
                            Distribution Center  <Text style={{ color: 'gray', fontWeight: 'bold', marginLeft: '3px' }}>{distributionCenterState.loading ? <Spinner size="xs" /> : currentSelectedDscCenter ? `: ${currentSelectedDscCenter}` : ''}</Text>

                        </h1>
                        <Box w="100%" className="admin_table_container">
                            <Switch>
                                <Route exact path={path}>
                                    <div className="create_button_container">
                                      <Link to={`/dsc/create`} ><button className="create_button_style">Register Center</button></Link> 
                                    </div>
                                    <TableComponent columns={columns} data={distributionCenterState.data} isLoading={distributionCenterState.loading} error={distributionCenterState.error} retryFn={() => getDscAsync(history)} />
                                </Route>

                                <Route path={`${path}/create`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/dsc">Distribution Centers</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Create Distribution Center</span>
                                        </BreadcrumbItem>

                                    </Breadcrumb>
                                    <RegisterDistribututionCenter />
                                </Route>

                                <Route path={`${path}/edit/:id`}>
                                    <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                                        <BreadcrumbItem>
                                            <Link style={{ color: '#007eff' }} to="/dsc">Distribution Centers</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem color="gray" isCurrentPage>
                                            <span>Edit Distribution Center</span>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    <EditCenterdetails />
                                </Route>

                                <Route path={`${path}/:id`}>
                                    <DistributionCenterDetails setCurrentSelectedDscCenter={setCurrentSelectedDscCenter} />
                                </Route>
                            </Switch>

                        </Box>
                    </div>
                </Box>
            </Box>
        </Container>
    )
}

export default DistributionCenter;

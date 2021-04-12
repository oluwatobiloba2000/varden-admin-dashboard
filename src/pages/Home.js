import React from 'react'
import {
    Box,
    Container,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import Admin from './Admin';
import Customers from './Customers';
import Products from './Products';
import Images from './ImagesPage';
import Orders from './Orders';
import DispatchRiders from './DispatchRiders';
import DistributionCenter from './DistributionCenter';
import Header from '../component/Header/Header';
import Sidebar from '../component/SideBar/Sidebar';
import { Redirect, Route, useLocation } from 'react-router-dom';
import "../index.css";

// fade({
//     name: 'fade-transition'
// })
const routes = [{
    path: '/admin',
    Component: Admin
}, {
    path: '/customers',
    Component: Customers
},
{
    path: '/images',
    Component: Images
}, {
    path: '/products',
    Component: Products
},{
    path: '/orders',
    Component: Orders
},
{
    path: '/dispatchers',
    Component: DispatchRiders
}, {
    path: '/dsc',
    Component: DistributionCenter
}]



function Home() {
    const text = useColorModeValue('light', 'dark');
    let location = useLocation();

    return (
        <div>
            <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
                <Header />
                <Box display="flex" height="93%"
                    width="100%" marginTop="50px" h="93%">
                    <Sidebar active={location.pathname} />
                    <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>

                        <TransitionGroup>
                            <Redirect from="/" to="/admin"/>
                                {routes.map(({ path, Component }) => (
                                    <Route key={path} exact path={path}>
                                        {({ match }) => (
                                            <CSSTransition
                                                in={match != null}
                                                timeout={300}
                                                classNames="fade"
                                                unmountOnExit
                                            >
                                                <Component />
                                            </CSSTransition>
                                        )}
                                    </Route>
                                ))}
                        </TransitionGroup>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home

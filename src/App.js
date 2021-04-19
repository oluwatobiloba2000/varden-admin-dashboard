import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import DispatchRiders from './pages/DispatchRiders';
import DistributionCenter from './pages/DistributionCenter';
import Images from './pages/ImagesPage';
import ProtectedRoute from './HOC/ProtectedRoute';
axios.defaults.baseURL = 'https://appetite-api-stage.herokuapp.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function App() {
  

  return (
    <ChakraProvider theme={theme}>
      <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <ProtectedRoute path="/admin">
              <Admin />
            </ProtectedRoute>
            <ProtectedRoute path="/customers">
              <Customers/>
            </ProtectedRoute>
            <ProtectedRoute path="/products">
              <Products/>
            </ProtectedRoute>
            <ProtectedRoute path="/images">
              <Images />
            </ProtectedRoute>
            <ProtectedRoute path="/orders" >
              <Orders />
            </ProtectedRoute>
            <ProtectedRoute path="/dispatchers">
              <DispatchRiders />
            </ProtectedRoute>
            <ProtectedRoute path="/dsc">
              <DistributionCenter />
            </ProtectedRoute>
            <Redirect from="/" to="/orders"/>
          </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
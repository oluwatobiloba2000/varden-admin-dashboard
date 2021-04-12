import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {


  return (
    <ChakraProvider theme={theme}>
      <Router>
          <Switch>
            <Route path="/login" exact>
                  <Login/>
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
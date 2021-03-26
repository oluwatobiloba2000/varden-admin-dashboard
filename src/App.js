import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Admin from './pages/Admin';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
         <Switch>
           <Route path="/admin" component={Admin} exact={true}/>
         </Switch>
       </Router>
    </ChakraProvider>
  );
}

export default App;

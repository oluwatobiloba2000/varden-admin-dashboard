import React, { useState } from 'react'
import { Redirect, Route } from 'react-router';
import { clearTokenInLocalStorage, isTokenExpired } from '../utils/auth';

function ProtectedRoute({children, ...rest}) {
    const [tokenIsExpired] = useState(isTokenExpired());

    return (
        <>{
            <Route 
             {...rest}
             render={({ location })=>
            (tokenIsExpired || tokenIsExpired ==='empty token') ? 
           <>
           {clearTokenInLocalStorage()}
             <Redirect to={{
                 pathname: '/login',
                 state: {from: location}
             }}/></> : (children)
            }
            />
        }</>
    )
}

export default ProtectedRoute;

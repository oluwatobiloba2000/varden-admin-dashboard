import React from 'react';

function Logo(props) {
    return (
        <img
        {...props}
        src={'http://appetite-dashboard-staging.herokuapp.com/appetite_logo.png'}
        alt="logo"
    />
    )
}

export default Logo

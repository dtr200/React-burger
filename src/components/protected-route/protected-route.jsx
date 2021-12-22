import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {

    const { isLoggedIn } = useSelector(store => store.access.user);

    return (
        <Route
            {...rest}
            render={({location}) => isLoggedIn ? (
                children 
                ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }} />
                )
            }
        />
    );
}

export default ProtectedRoute;
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { updateToken } from '../../services/actions/thunks';

const ProtectedRoute = ({ children, ...rest }) => {

    const dispatch = useDispatch();

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;
    const isRefreshTokenExist = 
        localStorage['refreshToken'] !== undefined;

    if(!isAccessTokenExist && isRefreshTokenExist)
        dispatch(updateToken());

    console.log(isAccessTokenExist, isRefreshTokenExist)

    return (
        <Route
            {...rest}
            render={({location}) => isAccessTokenExist ? (
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
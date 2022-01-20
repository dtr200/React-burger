import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { updateToken } from '../../services/actions/thunks';

const ProtectedRoute: FunctionComponent = ({ children, ...rest }) => {
    const dispatch = useDispatch();

    const isAccessTokenExist: boolean = 
        document.cookie.indexOf('accessToken=') !== -1;
    const isRefreshTokenExist: boolean = 
        localStorage['refreshToken'] !== undefined;

    if(!isAccessTokenExist && isRefreshTokenExist)
        dispatch(updateToken());

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
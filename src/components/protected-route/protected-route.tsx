import React, { FunctionComponent } from "react";
import { useDispatch } from "../../services/types/hooks";
import { Route, Redirect } from 'react-router-dom';
import { updateToken } from '../../services/thunks/access';

type TProtectedRouteProps = {
    path: string;
    exact?: boolean;
};

const ProtectedRoute: FunctionComponent<TProtectedRouteProps> = ({ children, ...rest }) => {
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
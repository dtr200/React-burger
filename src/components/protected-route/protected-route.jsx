import React from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { updateToken } from '../../services/actions/thunks';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;
    const isRefreshTokenExist = 
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

const routeShapeTypes = PropTypes.shape({
    path: PropTypes.object.isRequired, 
    location: PropTypes.object.isRequired, 
    computedMatch: PropTypes.object.isRequired
})

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    rest: routeShapeTypes
}

export default ProtectedRoute;
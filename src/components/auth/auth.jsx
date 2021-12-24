import React from "react";
import NavButton from "../nav-button/nav-button";
import PropTypes from 'prop-types';

import styles from './auth.module.css';

const Auth = (props) => {
    return (
        <NavButton {...props} />
    )
}

const authShapeTypes = PropTypes.shape({
    title: PropTypes.string.isRequired, 
    logo: PropTypes.string.isRequired
});

Auth.propTypes = authShapeTypes.isRequired;

export default Auth;
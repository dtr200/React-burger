import React from "react";
import NavButton from "../nav-button/nav-button";
import PropTypes from 'prop-types';

import styles from './auth.module.css';

const Auth = (props) => {
    return (
        <NavButton {...props} />
    )
}

const authShapeProps = PropTypes.shape({
    title: PropTypes.string.isRequired, 
    logo: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    view: PropTypes.bool.isRequired 
});

Auth.propTypes = authShapeProps.isRequired;

export default Auth;
import React, { FunctionComponent } from "react";
import NavButton from "../nav-button/nav-button";
import { THeaderButtonsData } from '../../utils/types';

import styles from './auth.module.css';

const Auth: FunctionComponent<THeaderButtonsData> = (props) => {
    return (
        <NavButton {...props} />
    )
}

export default Auth;
import React, { useEffect, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from '../services/action-constants/ws';

import Spinner from '../components/spinner/spinner';
import styles from 'page.module.css';

const FeedPage: FunctionComponent = () => {
    const dispatch = useDispatch();

    const orders = useSelector((store: any) => store.ws.orders)

    console.log(orders)
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, [])
    
    return (
         <div>Feed Page</div>
    )
}

export default FeedPage;
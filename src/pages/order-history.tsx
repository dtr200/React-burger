import React, { useEffect, FunctionComponent } from 'react';
import FullFeed from '../components/full-feed/full-feed';

import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from '../services/action-constants/ws';

import styles from './profile.module.css';

const OrderHistoryPage: FunctionComponent = () => {

    return (        
        <FullFeed />
  );
}

export default OrderHistoryPage;
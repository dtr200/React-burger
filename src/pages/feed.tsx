import React, { useEffect, FunctionComponent } from "react";
import FullFeed from "../components/full-feed/full-feed";

import styles from './page.module.css';

const FeedPage: FunctionComponent = () => {
    
    return (
        <main className={styles.feed}>
            <div className={`text text_type_main-large mb-5`}>Лента заказов</div>
            <FullFeed />
        </main>
    )
}

export default FeedPage;
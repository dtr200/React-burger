import React, { useEffect, FunctionComponent } from "react";
import FullFeed from "../components/full-feed/full-feed";
import Stats from '../components/stats/stats';

import styles from './page.module.css';

const FeedPage: FunctionComponent = () => {
    
    return (
        <main className={styles.feed}>
            <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1>
            <article className={styles.content}>
                <FullFeed />
                <Stats />
            </article>            
        </main>
    )
}

export default FeedPage;
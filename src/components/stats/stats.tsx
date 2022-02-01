import React, { FunctionComponent } from "react";

import styles from './fullfeed.module.css';

type TStatsProps = {
    
}

const Stats: FunctionComponent<TStatsProps> = () => {

    return (
        <article className={styles.stats}>
            <section className={styles.works}>
                <div className={styles.done}>
                    <p></p>
                    <ul>

                    </ul>
                </div>
                <div className={styles.inProgress}>
                    <p></p>
                    <ul>
                        
                    </ul>
                </div>
            </section>
            <section className={styles.ready}>
                <p className={``}></p>
                <p className={``}></p>
            </section>
            <section className={styles.ready}>
                <p className={``}></p>
                <p className={``}></p>
            </section>
        </article>
    )
}

export default Stats;
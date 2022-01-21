import React, { FunctionComponent } from 'react';

import styles from './profile.module.css';

const NotFound404: FunctionComponent = () => {
    return (        
            <section className={`${styles.container} text`}>
                Ошибка 404
            </section>
  );
}

export default NotFound404;
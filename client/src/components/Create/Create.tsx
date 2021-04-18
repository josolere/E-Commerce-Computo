import React from 'react';
import CProduct from '../CreateCategory/CreateCategory';
import CCategory from '../CreateProduct/CreateProduct';
import styles from './UniCode.module.scss'

const UniCreate = () => {

    return (
        <React.Fragment>
            <div className={styles.UniContainer}>
                <div className={styles.UniEach}>
                    <CCategory />
                </div>
                <div className={styles.UniEach} >
                    <CProduct />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UniCreate
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AlertDetails.module.scss'
import { faExclamationTriangle, faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlertLogin = () => {

    return (
        <React.Fragment>
                <div className={styles.audunwarn}>
                    <FontAwesomeIcon icon={faExclamationTriangle} className={styles.iconsAlert} aria-hidden={true} />
                    <p className={styles.iconsAlert} >Necesitas estar logueado para dejar un review </p>
                    <Link to='/Login' className={styles.iconsLAlert} >
                        <p>Click Aquí</p>
                        <FontAwesomeIcon icon={faHandPointUp} aria-hidden={true} />
                    </Link>
                </div>
        </React.Fragment>
    )
}

export default AlertLogin
import React from 'react'
import { AiFillLinkedin } from "react-icons/ai";
import { Link } from 'react-router-dom';
import styles from './Contact.module.scss'

export default function Contact(){

    return (
        <div className={styles.container}>
            <div className={styles.contact}>

            <h2> CompuHenry </h2>
            <p>
                Proyecto Académico realizado en equipo de 7 personas
                utilizando metodologías agiles de trabajo (SCRUM) con 
                sprints de una semana, presentando ante un Product Owner
                encargado de seguir nuestro progreso
            </p>
            </div>
            <div className={styles.devsContainer}>
            <h2> Contáctenos </h2>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/juanigromero/' target='blank'>
                <span>Juan Ignacio Romero</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/andres-luis-logares-522595172/' target='blank'>
                <span>Andres Logares</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/juancordoba75/' target='blank'>
                <span>Juan Córdoba</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/santiago-julian-rosales-peiretti-814728196/' target='blank'>
                <span>Santiago Rosales</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/crissoria/' target='blank'>
                <span>Cristian Soria</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/it-emanuel-acosta/' target='blank'>
                <span>Emanuel Acosta</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            <div className={styles.devs}>
                <a href='https://www.linkedin.com/in/jose-soler-e/' target='blank'>
                <span>Jose Soler</span>
                <AiFillLinkedin className={styles.iconlink}/>
                </a>
            </div>
            </div>
            <div className={styles.techs}>
            <h2> Tecnologías </h2>
            <h5>Implementadas</h5>
            <ul>

            <li>• Typescript</li>
            <li>• React</li>
            <li>• Redux</li>
            <li>• GraphQl</li>
            <li>• Apollo</li>
            <li>• Express</li>
            <li>• PostgressQL</li>
            <li>• Sequelize</li>
            </ul>
            </div>
        </div>
    )
}
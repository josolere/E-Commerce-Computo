import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import navBar from './NavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const NavBar = (): JSX.Element => {
    return (
        <>
            <div className={navBar.container}>
                <div className={navBar.containerNav}>
                    <div className={navBar.containerTitle}>
                        <h1>CompuHenry</h1>
                    </div>
                    <div className={navBar.containeCarrito}>
                        <div className={navBar.containerRedes}>
                            <p>redes</p>
                        </div>
                        <div className={navBar.containerLogin}>
                            <Link className={navBar.login} to='/login'>Iniciar Sesion</Link>
                        </div>
                        <div className={navBar.containerIconProducts}>
                            <div className={navBar.containerIcon}>
                                <Link to='/cart'>
                                    <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} />
                                </Link>
                            </div>
                            <div className={navBar.containerProducts}>
                                <p className={navBar.pProducts}>2 <span>productos</span></p>
                                <p className={navBar.pPrice}>$1300</p>
                            </div>
                        </div>
                    </div>
                    <div className={navBar.ContainerSearch}>
                        <SearchBar />
                    </div>
                </div>
                <div className={navBar.containerRutas}>
                    <Link to='/home' className={navBar.linkInicio}>Inicio</Link>
                    <p>productos</p>
                    <p>cuenta</p>
                    <p>otros</p>
                </div>
            </div>
        </>
    )
}

export default NavBar

import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import navBar from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Login from "../login/Login";

export interface PropsLogin {
  handleClose: () => void
}


const NavBar = (): JSX.Element => {

  const [login, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(true)
  }

  const handleClose = () => {
    setLogin(false)
  }

  return (
    <>
      <div className={navBar.container}>
        <h1 className={navBar.titleNav}>CompuHenry</h1>
        <SearchBar />
        <Link className={navBar.linksNav} to="/cart">
          <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} />$1300</Link>
        {/* <a className={navBar.linksNava} onClick={handleLogin}> Iniciar Sesion</a> */}         
        <Link className={navBar.linksNava} onClick={handleLogin} to ='/login'> Iniciar Sesion</Link>     
        <Link to="/home" className={navBar.linksNav}> Inicio </Link>
        <Link to="/productos" className={navBar.linksNav}>Productos</Link>
        <Link to="/cuenta" className={navBar.linksNav}>Mi Cuenta</Link>
      </div>

      <div className={navBar.containerModalLogin}>
        {
          login === true ? <Login handleClose={handleClose} /> : undefined
        }
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;

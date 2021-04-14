import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import navBar from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setFilter } from '../../redux/actions';

const NavBar = (): JSX.Element => {

  const dispatch = useDispatch()

  return (
    <>
      <div className={navBar.container}>
        <Link to='/'className={navBar.linksNav} > <h1 className={navBar.titleNav} >CompuHenry</h1> </Link>
        <SearchBar />
        <Link className={navBar.linksNav} to="/cart">
        <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} /></Link>
        <Link className={navBar.linksNav} to="/login"> Iniciar Sesion</Link>
        <Link onClick={() => {dispatch(setFilter(""))}} to="/Home" className = {navBar.linksNav}>Productos</Link>  
        <Link to="/cuenta" className = {navBar.linksNav}>Mi Cuenta</Link>  
              
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;

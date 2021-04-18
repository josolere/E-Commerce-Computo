import React from "react";
import { useSelector } from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import navBar from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppState } from '../../redux/reducers';


const NavBar = (): JSX.Element => {
  const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)
  return (
    <>
      <div className={navBar.container}>
        <Link to='/' className={navBar.linksNav} > <h1 className={navBar.titleNav} >CompuHenry</h1> </Link>
        <SearchBar />
        <Link className={navBar.linksNav} to="/Carrodecompras">         
          <FontAwesomeIcon className={navBar.iconCart}  icon={faShoppingCart} />
          <p>{quantity}</p>
          ${idsProducts}</Link>
        <Link className={navBar.linksNav} to="/login"> Iniciar Sesion</Link>
        <Link to="/Home" className={navBar.linksNav}>Productos</Link>
        <Link to="/cuenta" className={navBar.linksNav}>Mi Cuenta</Link>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;

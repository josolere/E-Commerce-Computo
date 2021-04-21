import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import navBar from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppState } from '../../redux/reducers';
import { setFilter } from '../../redux/actions';
import { Cookies, CookiesProvider, useCookies } from "react-cookie";
import NavBarItem from "./NavBarItem";
import DropdownMenu from "./Dropdown";


const NavBar = (): JSX.Element => {
  const dispatch = useDispatch()

  const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [showadmin, setShowadmin] = useState(false)

  const [cookiess, setCookies ] = useState<any>()
 
  const cookie = new Cookies


  useEffect (() => {
    setCookies(cookie.get('User'))
  }, [])

  return (
    <>
      <div className={navBar.container}>
        <Link to='/' className={navBar.linksNav} > <h1 className={navBar.titleNav} >CH</h1> </Link>
        <SearchBar />

        <Link className={navBar.linkCart} to="/Carrodecompras">
        <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} />
          <p>{quantity}</p>
         {/*  <span>${new Intl.NumberFormat().format(idsProducts)}</span> */}

        </Link>
        
        <div className={navBar.containerLinks}>
        
        {true ? <Link onClick={() => { dispatch(setFilter("")) }} to="/Home" className={navBar.linksNav}><p>Productos</p></Link> : false}
        <div>

          {cookiess ? false : <Link className={navBar.linksNav} to="/login"><p>Iniciar Sesion</p></Link>}
         
        </div>
        <div>
          <p>{cookiess &&
          <NavBarItem info= "Mi Cuenta"></NavBarItem>}</p>
        </div>
        </div>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;

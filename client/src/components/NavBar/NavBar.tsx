<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> front_roto
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import navBar from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppState } from '../../redux/reducers';
import { setFilter } from '../../redux/actions';
<<<<<<< HEAD
=======
import { Cookies, CookiesProvider, useCookies } from "react-cookie";
import NavBarItem from "./NavBarItem";
import DropdownMenu from "./Dropdown";
>>>>>>> front_roto


const NavBar = (): JSX.Element => {
  const dispatch = useDispatch()

  const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [showadmin, setShowadmin] = useState(false)

<<<<<<< HEAD

  const opciones = ['Crear Producto', 'Crear Categoria']
=======
  const [cookiess, setCookies ] = useState<any>()
 
  const cookie = new Cookies


  useEffect(() => {
    setCookies(cookie.get('User'))
  }, [])
>>>>>>> front_roto

  return (
    <>
      <div className={navBar.container}>
<<<<<<< HEAD
        <Link to='/' className={navBar.linksNav} > <h1 className={navBar.titleNav} >CH</h1> </Link>
        <SearchBar />
        <Link className={navBar.linkCart} to="/Carrodecompras">
          <p>{quantity}</p>
          <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} />
          <p>Total: ${new Intl.NumberFormat().format(idsProducts)}</p>

        </Link>
        {true ? <Link onClick={() => { dispatch(setFilter("")) }} to="/Home" className={navBar.linksNav}>Productos</Link> : false}
        <div>
          <Link className={navBar.linksNav} to="/login"> Iniciar Sesion</Link>
          {false ? <Link to="/cuenta" className={navBar.linksNav}>Mi Cuenta</Link> : false}
        </div>
        <div>
{/*           <button className={navBar.linksNav} onClick={() => setShowadmin(!showadmin)} >✓</button>
          {showadmin ? */} <Link className={navBar.linksNav} to='/Crear'><p>Crear</p></Link>{/*  : null} */}
=======
        <Link to='/' > <h1 className={navBar.titleNav} >CH</h1> </Link>
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
        
          <p>{cookiess && <NavBarItem info= "Mi Cuenta"></NavBarItem>  }</p>
        
>>>>>>> front_roto
        </div>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;

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


const NavBar = (): JSX.Element => {
  const dispatch = useDispatch()

  const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [showadmin, setShowadmin] = useState(false)

  const [cookiess, setCookies] = useState<any>()

  const opciones = ['Crear Producto', 'Crear Categoria']

  const cookie = new Cookies


  useEffect(() => {
    setCookies(cookie.get('User'))
  }, [])

  return (
    <>
      <div className={navBar.container}>
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
          <p>{cookiess && cookiess}</p>
          <Link className={navBar.linksNav} to='/Crear'><p>Crear</p></Link>{/*  : null} */}
        </div>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;
